import os
from langchain_openai import OpenAIEmbeddings


def get_embeddings():
    return OpenAIEmbeddings(
        model="text-embedding-3-large",
        api_key=os.getenv("OPENAI_API_KEY")
    )
