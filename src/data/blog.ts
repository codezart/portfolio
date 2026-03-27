export type ContentNode =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; level: 2 | 3; text: string }
  | { type: 'code'; language: string; code: string }
  | { type: 'list'; items: string[] }
  | { type: 'callout'; text: string };

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readTime: string;
  category: string;
  tags: string[];
  excerpt: string;
  content: ContentNode[];
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'rag-under-the-hood',
    title: 'From Embeddings to Answers: How RAG Works Under the Hood',
    date: '2026-03-20',
    readTime: '8 min read',
    category: 'Generative AI',
    tags: ['RAG', 'LLMs', 'Vector Databases', 'Embeddings', 'NLP'],
    excerpt:
      "Retrieval-Augmented Generation has become the go-to architecture for building LLM applications that need to answer questions about specific data. Here's a deep dive into how it actually works — and where it breaks down.",
    content: [
      {
        type: 'paragraph',
        text: "Large language models are remarkable — they can write code, summarize documents, and hold coherent conversations. But they have a critical limitation: their knowledge is frozen at training time. Ask a model about something that happened last month, or about your company's internal documentation, and it will either hallucinate or admit ignorance.",
      },
      {
        type: 'paragraph',
        text: 'Retrieval-Augmented Generation (RAG) solves this by giving the model a retrieval mechanism — essentially a long-term memory that can be queried at inference time. Let\'s break down how it works from the ground up.',
      },
      { type: 'heading', level: 2, text: 'The Core Idea' },
      {
        type: 'paragraph',
        text: 'At its heart, RAG is a two-step process: retrieve then generate. Instead of relying solely on what the model memorized during training, we first retrieve relevant documents from an external knowledge base, then pass those documents as context to the LLM so it can generate a grounded answer.',
      },
      {
        type: 'callout',
        text: 'RAG = Retriever + Generator. The retriever finds relevant context; the generator produces the answer conditioned on that context.',
      },
      { type: 'heading', level: 2, text: 'Step 1: Building the Vector Store' },
      {
        type: 'paragraph',
        text: "Before you can retrieve anything, you need to index your knowledge base. This is where embeddings come in. An embedding model converts text into a dense vector — a list of floating-point numbers that encodes the semantic meaning of the text. Semantically similar texts will have vectors that are geometrically close together in the embedding space.",
      },
      {
        type: 'code',
        language: 'python',
        code: `from openai import OpenAI
from typing import List

client = OpenAI()

def embed_text(text: str) -> List[float]:
    response = client.embeddings.create(
        input=text,
        model="text-embedding-3-small"
    )
    return response.data[0].embedding

def index_documents(documents: List[str], vector_store) -> None:
    for doc in documents:
        # Split into overlapping chunks to avoid cutting context
        chunks = chunk_text(doc, chunk_size=512, overlap=50)
        for chunk in chunks:
            embedding = embed_text(chunk)
            vector_store.upsert(text=chunk, vector=embedding)`,
      },
      { type: 'heading', level: 3, text: 'Chunking Strategy Matters' },
      {
        type: 'paragraph',
        text: 'How you split documents dramatically affects retrieval quality. A few strategies worth knowing:',
      },
      {
        type: 'list',
        items: [
          'Fixed-size chunks (e.g., 512 tokens): Simple but can split sentences mid-thought',
          'Semantic chunking: Split at sentence/paragraph boundaries, preserving meaning',
          'Recursive character splitting: Tries paragraphs → sentences → words as fallback',
          'Document-aware chunking: Respects structure like headings and sections',
        ],
      },
      { type: 'heading', level: 2, text: 'Step 2: Retrieval via Similarity Search' },
      {
        type: 'paragraph',
        text: "At query time, the user's question is also converted to an embedding using the same model. We then search the vector store for the k most similar chunks using approximate nearest neighbor (ANN) search — finding chunks whose meaning is closest to the question.",
      },
      {
        type: 'code',
        language: 'python',
        code: `def retrieve(query: str, vector_store, k: int = 5) -> List[str]:
    query_embedding = embed_text(query)

    # Find k most similar chunks via cosine similarity
    results = vector_store.query(
        vector=query_embedding,
        top_k=k,
        include_metadata=True
    )

    return [match.metadata["text"] for match in results.matches]`,
      },
      {
        type: 'paragraph',
        text: 'Vector databases like Pinecone, Weaviate, Qdrant, or ChromaDB are optimized for this kind of similarity search at scale. For local/smaller use cases, FAISS works well as an in-memory index.',
      },
      { type: 'heading', level: 2, text: 'Step 3: Generation with Grounded Context' },
      {
        type: 'paragraph',
        text: "Once you have the relevant chunks, you inject them into the LLM's context window along with the question. The prompt design here has an outsized effect on answer quality:",
      },
      {
        type: 'code',
        language: 'python',
        code: `def answer_with_rag(query: str, vector_store) -> str:
    context_chunks = retrieve(query, vector_store, k=5)
    context = "\\n\\n---\\n\\n".join(context_chunks)

    prompt = f"""Answer the question using ONLY the context below.
If the context does not contain enough information, say so explicitly.

Context:
{context}

Question: {query}

Answer:"""

    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        temperature=0.1,  # Lower = more factual, less creative
    )

    return response.choices[0].message.content`,
      },
      { type: 'heading', level: 2, text: 'Where RAG Breaks Down' },
      {
        type: 'paragraph',
        text: 'RAG is powerful but not magic. These are the most common failure modes I\'ve encountered in production:',
      },
      {
        type: 'list',
        items: [
          "Bad retrieval: If the wrong chunks are retrieved, even the best LLM can't produce a good answer. Fix: use hybrid search (keyword + semantic) and reranking models like Cohere Rerank.",
          "Lost in the middle: LLMs tend to focus on content at the beginning and end of the context window, ignoring what's in the middle. Fix: put the most relevant chunks first.",
          'Chunk boundary splits: Your answer might span two chunks that were split apart. Fix: use overlap in your chunking strategy.',
          'Hallucination despite context: The model may blend training knowledge with retrieved context. Fix: explicit grounding instructions and citation requirements.',
        ],
      },
      {
        type: 'callout',
        text: 'In my experience building a production RAG system on Azure, a well-tuned reranker had a bigger impact on answer quality than the choice of base LLM.',
      },
      { type: 'heading', level: 2, text: 'Advanced Patterns Worth Knowing' },
      {
        type: 'paragraph',
        text: 'Once the basic pipeline works, these techniques can push quality further:',
      },
      {
        type: 'list',
        items: [
          'HyDE (Hypothetical Document Embeddings): Generate a hypothetical answer first, embed that, then use it for retrieval. Often outperforms direct query embedding.',
          'Multi-query retrieval: Generate multiple reformulations of the question and merge results — captures different angles of the same intent.',
          'Agentic RAG: Let the LLM decide when to retrieve, what to search for, and whether to retrieve again if the first result was insufficient.',
          'Parent-child chunking: Index small chunks for precise retrieval but return the parent chunk for full context to the LLM.',
        ],
      },
      { type: 'heading', level: 2, text: 'Putting It All Together' },
      {
        type: 'paragraph',
        text: 'RAG is now the standard architecture for building knowledge-grounded LLM applications — from internal documentation assistants to customer support bots. The basic pipeline is straightforward to implement, but squeezing production-grade performance out of it requires careful attention to chunking strategy, embedding model selection, retrieval quality, and prompt engineering.',
      },
      {
        type: 'paragraph',
        text: 'The landscape is evolving fast — context windows keep growing and new retrieval architectures are emerging. But for use cases with large, frequently-updated knowledge bases, RAG remains the most practical and cost-effective approach. Getting the fundamentals right is the most valuable thing you can do.',
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
