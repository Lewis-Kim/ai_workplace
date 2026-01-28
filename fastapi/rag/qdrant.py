from qdrant_client import QdrantClient
from qdrant_client.models import PointStruct
import uuid


QDRANT_URL = "http://qdrant:6333"
COLLECTION_NAME = "sangsang_story_documents_openai_large_v2"

def get_qdrant_client():
    return QdrantClient(url=QDRANT_URL)


def insert_custom_documents(collection, embeddings, docs):
    """
    docs = [
        {
          "content": "...",
          "metadata": {...}
        }
    ]
    """
    points = []

    for doc in docs:
        vector = embeddings.embed_query(doc["content"])

        points.append(
            PointStruct(
                id=str(uuid.uuid4()),
                vector=vector,
                payload={
                    "content": doc["content"],
                    "metadata": doc["metadata"]
                }
            )
        )

    collection.upsert(
        collection_name=COLLECTION_NAME, 
        points=points
    )