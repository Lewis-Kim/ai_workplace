import itertools
from langchain_community.document_loaders import PyMuPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_core.documents import Document

content_id_counter = itertools.count(start=10000)
doc_id_counter = itertools.count(start=1)

def load_and_split_pdf(file_path: str, filename: str, folder_name="AI-GOV", source="watcher"):
    loader = PyMuPDFLoader(file_path)
    docs = loader.load()

    splitter = RecursiveCharacterTextSplitter(
        chunk_size=800,
        chunk_overlap=100
    )
    split_docs = splitter.split_documents(docs)

    doc_id = next(doc_id_counter)
    final_docs = []

    for chunk_no, doc in enumerate(split_docs, start=1):
        content_id = next(content_id_counter)
        final_docs.append(
            Document(
                page_content=doc.page_content,
                metadata={
                    "content_id": content_id,
                    "doc_id": doc_id,
                    "page_no": doc.metadata.get("page", 0) + 1,
                    "chunk_no": chunk_no,
                    "model_key": "openai_large",
                    "folder_name": folder_name,
                    "title": filename,
                    "file_type": "pdf",
                    "source": source
                }
            )
        )

    return final_docs, doc_id
