from langchain_text_splitters import RecursiveCharacterTextSplitter
from fastapi import APIRouter, HTTPException, UploadFile, File, BackgroundTasks
# import tempfile, os
import pdfplumber

from langchain_qdrant import QdrantVectorStore
from rag.qdrant import get_qdrant_client, insert_custom_documents, COLLECTION_NAME
from rag.embeddings import get_embeddings
# from rag.loaders import load_and_split_pdf


router = APIRouter()

@router.post("/upload/pdf")
# async def upload_pdf(file: UploadFile = File(...)):
#     if not file.filename.endswith(".pdf"):
#         return {"error": "Only PDF allowed"}
    
#     if file.size > 50 * 1024 * 1024:
#         raise HTTPException(413, "파일이 너무 큽니다 (50MB 제한)")

#     with tempfile.NamedTemporaryFile(delete=False, suffix=".pdf") as tmp:
#         tmp.write(await file.read())
#         tmp_path = tmp.name

#     # PDF → Document 구조 변환
#     documents, doc_id = load_and_split_pdf(tmp_path, file.filename)

#     # Qdrant 적재
#     client = get_qdrant_client()
#     embeddings = get_embeddings()

#     vectorstore = QdrantVectorStore(
#         client=client,
#         collection_name=COLLECTION_NAME,
#         embedding=embeddings
#     )
#     vectorstore.add_documents(documents)

#     os.remove(tmp_path)

#     return {
#         "status": "success",
#         "doc_id": doc_id,
#         "chunks": len(documents)
#     }
async def upload_pdf(file: UploadFile, bg: BackgroundTasks):
    if not file.filename.endswith(".pdf"):
        return {"error": "Only PDF allowed"}
    
    if file.size > 50 * 1024 * 1024:
        raise HTTPException(413, "파일이 너무 큽니다 (50MB 제한)")
    
    path = f"/tmp/{file.filename}"
    with open(path, "wb") as f:
        f.write(await file.read())

    # bg.add_task(process_pdf_and_store, path, file.filename)
    return process_pdf_and_store(path, file.filename)

    ## return {"status": "processing"}


def process_pdf_and_store(path, filename):
    docs = []
    content_id = 1
    doc_id = 1

    with pdfplumber.open(path) as pdf:
        for page_no, page in enumerate(pdf.pages, start=1):
            text = page.extract_text() or ""
            chunks = split_text(text)

            for chunk_no, chunk in enumerate(chunks, start=1):
                docs.append({
                    "content": chunk,
                    "metadata": {
                        "content_id": content_id,
                        "doc_id": doc_id,
                        "page_no": page_no,
                        "chunk_no": chunk_no,
                        "model_key": "openai_large",
                        # "folder_name": "AI-GOV",
                        "title": filename,
                        "file_type": "pdf",
                        "source": "chatbot"
                    }
                })
                content_id += 1

    embeddings = get_embeddings()
    qdrant = get_qdrant_client()

    insert_custom_documents(qdrant, embeddings, docs)

    return {"status": "ok", "chunks": len(docs)}


def split_text(text: str):
    splitter = RecursiveCharacterTextSplitter(
        chunk_size=1000,
        chunk_overlap=200
    )
    return splitter.split_text(text)


def save_chunks_to_qdrant(chunks):
    embeddings = get_embeddings()
    client = get_qdrant_client()

    insert_custom_documents(
        collection=client,
        embeddings=embeddings,
        docs=chunks
    )