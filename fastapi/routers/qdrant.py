from fastapi import APIRouter
from qdrant_client import QdrantClient
from qdrant_client.models import VectorParams, Distance

router = APIRouter(tags=["Qdrant"])

@router.get("/create_vector_store")
def create_vector_store():
    client = QdrantClient(host="qdrant", port=6333)
    client.create_collection(
        collection_name="documents",
        vectors_config=VectorParams(size=768, distance=Distance.COSINE)
    )
    return {"message": "create success!"}


@router.get("/create_vector_store_sangsang")
def create_vector_store():
    client = QdrantClient(host="qdrant", port=6333)
    client.create_collection(
        collection_name="sangsang_story_documents_openai_large_v2",
        vectors_config=VectorParams(size=3072, distance=Distance.COSINE)
    )
    return {"message": "create success!"}