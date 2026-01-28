from langchain_qdrant import QdrantVectorStore
from rag.qdrant import get_qdrant_client, COLLECTION_NAME
from rag.embeddings import get_embeddings

def get_retriever(folder_name=None):
    client = get_qdrant_client()
    embeddings = get_embeddings()

    vectorstore = QdrantVectorStore(
        client=client,
        collection_name=COLLECTION_NAME,
        embedding=embeddings
    )

    search_kwargs = {"k": 4}

    if folder_name:
        search_kwargs["filter"] = {
            "must": [
                {"key": "folder_name", "match": {"value": folder_name}}
            ]
        }

    return vectorstore.as_retriever(search_kwargs=search_kwargs)
