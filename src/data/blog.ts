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
    slug: 'fine-tuning-vs-rag',
    title: 'Fine-Tuning vs RAG: Choosing the Right Architecture for Your LLM Application',
    date: '2026-03-29',
    readTime: '7 min read',
    category: 'Generative AI',
    tags: ['Fine-Tuning', 'RAG', 'LLMs', 'Architecture', 'MLOps'],
    excerpt:
      "The two most powerful ways to customize LLM behavior are fine-tuning and RAG — but they solve fundamentally different problems. Here's a practical framework for choosing the right one (and when to use both).",
    content: [
      {
        type: 'paragraph',
        text: "Every team building an LLM application eventually hits the same fork in the road: the base model doesn't know enough about our domain. Should we fine-tune it? Or build a RAG pipeline? Both can dramatically improve output quality — but they work in entirely different ways and are optimized for different failure modes.",
      },
      {
        type: 'paragraph',
        text: "Picking the wrong one is expensive. Fine-tuning a model takes time, compute, and labeled data. Building a RAG system takes infra, indexing pipelines, and ongoing maintenance. Getting the architecture wrong early means rebuilding later. Let's make that decision correctly the first time.",
      },
      { type: 'heading', level: 2, text: 'What Each Approach Actually Does' },
      {
        type: 'paragraph',
        text: "Fine-tuning modifies the model's weights. You take a pretrained LLM and continue training it on a curated dataset of examples from your domain. The result is a model that has internalized new behavior — it responds differently by default, even with no extra context provided at inference time.",
      },
      {
        type: 'paragraph',
        text: "RAG leaves the model's weights untouched. Instead, at inference time you retrieve relevant documents from an external knowledge base and inject them into the prompt as context. The model's behavior changes not because it learned something new, but because you're telling it something new every request.",
      },
      {
        type: 'callout',
        text: 'Fine-tuning = changing what the model knows. RAG = changing what the model is told at runtime. These are orthogonal levers.',
      },
      { type: 'heading', level: 2, text: 'When RAG Wins' },
      {
        type: 'paragraph',
        text: "RAG is the right default for most applications. Choose it when:",
      },
      {
        type: 'list',
        items: [
          'Your knowledge base changes frequently — product docs, support tickets, news, internal wikis. You can re-index without touching the model.',
          'You need source attribution. RAG can return the exact chunks it used, so users (and auditors) can verify the answer.',
          "Your corpus is large. Trying to fine-tune a model on 10M support tickets is impractical; a vector store handles it natively.",
          "You're working with sensitive or proprietary data that can't leave your infrastructure to be used in a training run.",
          "You need to update the knowledge base in real time — RAG pipelines can ingest new documents in seconds.",
        ],
      },
      {
        type: 'paragraph',
        text: "RAG also fails gracefully. When it can't find relevant context, a well-prompted model will say so. Fine-tuned models are more prone to confident hallucination on out-of-distribution inputs because the training process taught them to always produce an answer.",
      },
      { type: 'heading', level: 2, text: 'When Fine-Tuning Wins' },
      {
        type: 'paragraph',
        text: "Fine-tuning shines when the problem is about *style, format, or task behavior* rather than *knowledge*. It's the right choice when:",
      },
      {
        type: 'list',
        items: [
          'You need consistent output format. If your app requires JSON with a specific schema on every response, fine-tuning to enforce this is far more reliable than prompting.',
          "You're doing classification, extraction, or structured generation at scale — fine-tuned models are faster and cheaper at inference than large general-purpose models with long system prompts.",
          'The task requires domain-specific reasoning patterns. Medical coding, legal clause extraction, or semiconductor design rules are hard to express in prompts but learnable from examples.',
          "You want to reduce prompt length. Moving instructions from the context window into model weights means shorter prompts, lower latency, and lower cost per call.",
          "Your base model's default personality or safety configuration is misaligned with your use case (e.g., you need a terse, technical responder, not a verbose helpful assistant).",
        ],
      },
      {
        type: 'callout',
        text: "A common mistake: trying to fine-tune in factual knowledge. If you train a model that \"Paris is the capital of Germany\", it may learn that — but it may also degrade on adjacent facts. Knowledge belongs in a retrieval system, not in weights.",
      },
      { type: 'heading', level: 2, text: 'The Hybrid Architecture' },
      {
        type: 'paragraph',
        text: "The best production systems often combine both. A fine-tuned model handles format, tone, and reasoning style — while RAG supplies the factual grounding. Think of it as: fine-tuning makes the model a domain expert in *how* to think; RAG gives it fresh *facts* to think about.",
      },
      {
        type: 'code',
        language: 'python',
        code: `# Hybrid approach: fine-tuned model + RAG retrieval
from openai import OpenAI

client = OpenAI()

def answer(query: str, vector_store) -> str:
    # RAG: retrieve fresh, factual context
    chunks = vector_store.similarity_search(query, k=5)
    context = "\\n\\n".join(c.page_content for c in chunks)

    # Fine-tuned model: applies learned domain reasoning style
    response = client.chat.completions.create(
        model="ft:gpt-4o-mini:your-org:domain-expert:abc123",  # fine-tuned
        messages=[
            {
                "role": "system",
                "content": "You are a precise technical assistant. Use only the provided context.",
            },
            {
                "role": "user",
                "content": f"Context:\\n{context}\\n\\nQuestion: {query}",
            },
        ],
    )
    return response.choices[0].message.content`,
      },
      { type: 'heading', level: 2, text: 'A Practical Decision Framework' },
      {
        type: 'paragraph',
        text: "Here's the mental model I use when advising teams:",
      },
      {
        type: 'list',
        items: [
          'Start with RAG. It\'s faster to build, easier to debug, and handles 80% of "the model doesn\'t know our stuff" problems.',
          'Add fine-tuning only when you have a clear behavioral gap that prompting can\'t close — inconsistent format, wrong tone, poor task reasoning.',
          'Never fine-tune to memorize facts. Use RAG for knowledge, fine-tuning for skill.',
          'Measure before you commit. Run evals on your current pipeline first — fine-tuning has a high setup cost and you want to be sure it\'s the actual bottleneck.',
          'Budget for ongoing fine-tuning. A fine-tuned model trained today will drift as your domain evolves. Plan for periodic retraining or continuous fine-tuning.',
        ],
      },
      { type: 'heading', level: 2, text: 'The Cost Reality' },
      {
        type: 'paragraph',
        text: "Fine-tuning is not a one-time cost. Beyond the initial training run, you pay for: curating and labeling training data (often the hardest part), compute for training and validation, hosting a custom model endpoint (significantly more expensive than a shared API), and retraining cycles as your domain or requirements evolve.",
      },
      {
        type: 'paragraph',
        text: "RAG's costs are more predictable: storage for your vector index, embedding API calls during ingestion, and slightly longer prompts at inference. For most teams, RAG is cheaper to operate until you hit very high inference volume — at which point the shorter prompts from a fine-tuned model start to pay off.",
      },
      {
        type: 'callout',
        text: 'Rule of thumb: if you\'re doing fewer than ~1M requests/day, RAG\'s infrastructure costs are almost certainly lower than maintaining a fine-tuned model endpoint. Optimize for iteration speed first.',
      },
      { type: 'heading', level: 2, text: 'Closing Thoughts' },
      {
        type: 'paragraph',
        text: "The RAG vs fine-tuning debate is a false dichotomy. They're tools that solve different problems and compose well together. Start with the simplest thing that could work — usually RAG — instrument it, find the actual failure mode, and then decide whether fine-tuning is the right fix.",
      },
      {
        type: 'paragraph',
        text: "The teams I've seen get into trouble are the ones that reach for fine-tuning too early because it feels more 'real' or impressive. A RAG system with great chunking, hybrid retrieval, and a solid eval framework will outperform a carelessly fine-tuned model every time.",
      },
    ],
  },
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
  {
    slug: 'scaling-rag-foundations',
    title: 'Scaling RAG Part 1: Foundations — When Naive RAG Breaks',
    date: '2026-03-22',
    readTime: '9 min read',
    category: 'Generative AI',
    tags: ['RAG', 'Scalability', 'Vector Databases', 'Embeddings', 'MLOps'],
    excerpt:
      'Naive RAG works great in a notebook. Then you hit 10 million documents and everything falls apart. Here\'s a systematic look at why — and the foundational patterns that fix it.',
    content: [
      {
        type: 'paragraph',
        text: 'Most RAG tutorials show you a pipeline that works beautifully on a few hundred documents. You embed them, store them in a vector DB, retrieve the top-5, and get great answers. Then you take that same pipeline to production with millions of documents and a few hundred concurrent users, and it falls apart in three different ways at once.',
      },
      {
        type: 'paragraph',
        text: 'This post covers the first four scaling concerns: diagnosing where naive RAG breaks, fixing the ingestion pipeline, optimizing embeddings, and architecting your vector store for scale.',
      },
      { type: 'heading', level: 2, text: '1. Why Naive RAG Breaks at Scale' },
      {
        type: 'paragraph',
        text: 'The failure modes are predictable once you know what to look for. They fall into three categories: latency, cost, and quality degradation.',
      },
      {
        type: 'list',
        items: [
          'Latency: Embedding every query synchronously + ANN search over millions of vectors + LLM generation adds up fast. P99 latency balloons under load.',
          'Cost: Calling a hosted embedding API for every document re-index and every query gets expensive quickly. At 1M documents, re-indexing from scratch can cost hundreds of dollars.',
          'Quality degradation: With more documents, retrieval precision drops. The top-5 chunks are now competing against far more noise, and the LLM gets handed irrelevant context.',
        ],
      },
      {
        type: 'callout',
        text: 'The hard truth: retrieval quality often gets worse as your corpus grows, unless you actively invest in better chunking, filtering, and reranking.',
      },
      {
        type: 'paragraph',
        text: 'The fix is not a single change — it\'s a set of architectural upgrades applied at each stage of the pipeline. Let\'s go through them.',
      },
      { type: 'heading', level: 2, text: '2. Chunking at Scale — Async Ingestion Pipelines' },
      {
        type: 'paragraph',
        text: 'In a naive setup, indexing is synchronous: a document comes in, you chunk it, embed it, and write it to the vector store — all in one blocking call. This breaks down when you need to index thousands of documents per hour.',
      },
      {
        type: 'paragraph',
        text: 'The solution is an async ingestion pipeline. Documents get enqueued, workers process them in parallel, and the vector store gets populated in the background.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Async ingestion with a task queue (e.g. Celery + Redis)
from celery import Celery
from typing import List

app = Celery("ingestion", broker="redis://localhost:6379/0")

@app.task(bind=True, max_retries=3)
def index_document(self, doc_id: str, text: str):
    try:
        chunks = chunk_text(text, chunk_size=512, overlap=50)
        # Deduplicate: skip chunks already indexed
        new_chunks = [c for c in chunks if not vector_store.exists(hash(c))]
        if not new_chunks:
            return {"doc_id": doc_id, "status": "skipped (duplicate)"}
        embeddings = embed_batch(new_chunks)  # batch call, not one-by-one
        vector_store.upsert_batch(new_chunks, embeddings, metadata={"doc_id": doc_id})
        return {"doc_id": doc_id, "chunks_indexed": len(new_chunks)}
    except Exception as exc:
        raise self.retry(exc=exc, countdown=2 ** self.request.retries)`,
      },
      {
        type: 'paragraph',
        text: 'Two practices that matter here: batching embedding calls (send 100 chunks in one API request instead of 100 separate requests — most providers support this and it\'s dramatically faster), and deduplication via content hashing to avoid re-indexing identical documents.',
      },
      {
        type: 'list',
        items: [
          'Use a content hash (e.g. SHA-256 of chunk text) as the vector ID — natural deduplication',
          'Track document versions so you only re-embed changed chunks, not the whole document',
          'Use upsert (not insert) so re-indexing is idempotent',
          'Build a dead-letter queue for failed documents so nothing silently disappears',
        ],
      },
      { type: 'heading', level: 2, text: '3. Embedding Optimization' },
      {
        type: 'paragraph',
        text: 'Embeddings are often the biggest cost and latency driver in a scaled RAG system. There are three levers to pull.',
      },
      { type: 'heading', level: 3, text: 'Batch Everything' },
      {
        type: 'paragraph',
        text: 'Never embed one chunk at a time. Most embedding APIs (OpenAI, Cohere, etc.) accept arrays of inputs and process them far more efficiently than individual calls.',
      },
      {
        type: 'code',
        language: 'python',
        code: `def embed_batch(texts: List[str], batch_size: int = 100) -> List[List[float]]:
    all_embeddings = []
    for i in range(0, len(texts), batch_size):
        batch = texts[i : i + batch_size]
        response = client.embeddings.create(
            input=batch,
            model="text-embedding-3-small"
        )
        all_embeddings.extend([r.embedding for r in response.data])
    return all_embeddings`,
      },
      { type: 'heading', level: 3, text: 'Cache Query Embeddings' },
      {
        type: 'paragraph',
        text: 'Users tend to ask similar questions. Caching the embedding of a query (keyed on the query string) avoids redundant embedding API calls for repeated or near-identical queries.',
      },
      {
        type: 'code',
        language: 'python',
        code: `import hashlib, json
import redis

cache = redis.Redis()

def embed_query_cached(query: str) -> List[float]:
    key = "emb:" + hashlib.sha256(query.encode()).hexdigest()
    cached = cache.get(key)
    if cached:
        return json.loads(cached)
    embedding = embed_text(query)
    cache.setex(key, 3600, json.dumps(embedding))  # TTL: 1 hour
    return embedding`,
      },
      { type: 'heading', level: 3, text: 'Right-Size Your Embedding Model' },
      {
        type: 'paragraph',
        text: 'Bigger embedding models are not always better for your use case. text-embedding-3-small is 5x cheaper than text-embedding-3-large and within a few percentage points on most retrieval benchmarks. For domain-specific corpora, fine-tuning a smaller open-source model (like BGE-small or E5-small) can outperform a larger general-purpose model.',
      },
      { type: 'heading', level: 2, text: '4. Vector DB Architecture for Scale' },
      {
        type: 'paragraph',
        text: 'Not all vector stores are created equal when it comes to scale. Here are the architectural decisions that matter most.',
      },
      { type: 'heading', level: 3, text: 'Namespaces and Tenants' },
      {
        type: 'paragraph',
        text: 'If you\'re building a multi-tenant application (e.g. each customer has their own document corpus), you need logical isolation between tenants. Most production-grade vector DBs support this natively.',
      },
      {
        type: 'list',
        items: [
          'Pinecone: namespaces within an index — fast, no cross-namespace queries',
          'Weaviate: multi-tenancy mode with per-tenant data isolation',
          'Qdrant: collections per tenant, or payload filtering with tenant_id field',
          'Never mix tenants in the same namespace — you\'ll bleed context across customers',
        ],
      },
      { type: 'heading', level: 3, text: 'Metadata Filtering' },
      {
        type: 'paragraph',
        text: 'At scale you rarely want to search your entire corpus. Use metadata filters to pre-scope the search space — by date, source, department, language, etc. This improves both retrieval precision and query latency.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# Filter by metadata BEFORE similarity search — not after
results = vector_store.query(
    vector=query_embedding,
    top_k=10,
    filter={
        "source": {"$in": ["internal_docs", "confluence"]},
        "language": {"$eq": "en"},
        "updated_at": {"$gte": "2025-01-01"},
    }
)`,
      },
      { type: 'heading', level: 3, text: 'Index Tuning' },
      {
        type: 'paragraph',
        text: 'ANN indices have tunable parameters that trade off speed vs. recall. For production, benchmark your specific data to find the right operating point — don\'t just use defaults.',
      },
      {
        type: 'list',
        items: [
          'HNSW (used by Qdrant, Weaviate): tune ef_construction and m parameters — higher values = better recall, slower indexing',
          'IVF (FAISS): tune nlist (number of clusters) and nprobe (clusters searched at query time)',
          'Aim for >95% recall@10 — measure with a held-out ground truth set',
          'Re-benchmark after your corpus grows significantly (10x document count often shifts the optimal parameters)',
        ],
      },
      {
        type: 'callout',
        text: 'Scaling RAG is mostly an engineering problem, not a model problem. Getting the ingestion, caching, and index architecture right will take you further than swapping in a fancier LLM.',
      },
      { type: 'heading', level: 2, text: 'What\'s Next' },
      {
        type: 'paragraph',
        text: 'In Part 2, we\'ll cover the retrieval-side improvements: hybrid search (dense + sparse), cross-encoder reranking, and semantic caching — the techniques that directly improve answer quality at scale.',
      },
    ],
  },
  {
    slug: 'scaling-rag-retrieval',
    title: 'Scaling RAG Part 2: Smarter Retrieval — Hybrid Search, Reranking & Caching',
    date: '2026-03-23',
    readTime: '8 min read',
    category: 'Generative AI',
    tags: ['RAG', 'Hybrid Search', 'Reranking', 'Semantic Cache', 'BM25'],
    excerpt:
      'Semantic search alone leaves a lot on the table. Combining dense and sparse retrieval, adding a cross-encoder reranker, and caching frequent answers can dramatically improve both quality and throughput.',
    content: [
      {
        type: 'paragraph',
        text: 'Part 1 covered the infrastructure foundations: async ingestion, embedding optimization, and vector DB architecture. With those in place, the bottleneck shifts to retrieval quality. This post is about making the retrieval step itself smarter.',
      },
      { type: 'heading', level: 2, text: '5. Hybrid Search — Dense + Sparse Retrieval' },
      {
        type: 'paragraph',
        text: 'Pure semantic (dense) search is powerful but has a blind spot: it can miss exact keyword matches. If a user asks about "GDPR Article 17", a semantic search might return tangentially related privacy documents instead of the one that literally contains "Article 17". This is where sparse retrieval (BM25/keyword search) complements dense retrieval.',
      },
      {
        type: 'list',
        items: [
          'Dense retrieval (embeddings): good at semantic similarity, paraphrase matching, concept-level relevance',
          'Sparse retrieval (BM25/TF-IDF): good at exact keyword matching, product codes, names, IDs',
          'Hybrid: union of both result sets, fused into a single ranked list',
        ],
      },
      { type: 'heading', level: 3, text: 'Reciprocal Rank Fusion (RRF)' },
      {
        type: 'paragraph',
        text: 'The standard way to merge two ranked lists is Reciprocal Rank Fusion. It\'s simple, parameter-light, and works well in practice:',
      },
      {
        type: 'code',
        language: 'python',
        code: `from collections import defaultdict

def reciprocal_rank_fusion(
    dense_results: List[str],
    sparse_results: List[str],
    k: int = 60,
) -> List[str]:
    scores: dict[str, float] = defaultdict(float)

    for rank, doc_id in enumerate(dense_results, start=1):
        scores[doc_id] += 1.0 / (k + rank)

    for rank, doc_id in enumerate(sparse_results, start=1):
        scores[doc_id] += 1.0 / (k + rank)

    return sorted(scores, key=scores.__getitem__, reverse=True)


def hybrid_retrieve(query: str, vector_store, bm25_index, top_k: int = 10) -> List[str]:
    dense_ids = retrieve_dense(query, vector_store, k=top_k)
    sparse_ids = retrieve_sparse(query, bm25_index, k=top_k)
    fused_ids = reciprocal_rank_fusion(dense_ids, sparse_ids)
    return fused_ids[:top_k]`,
      },
      {
        type: 'paragraph',
        text: 'Many hosted vector DBs now support hybrid search natively (Weaviate\'s hybrid search, Elasticsearch\'s kNN + BM25, Azure AI Search\'s semantic hybrid mode). Using native support avoids the overhead of calling two separate systems.',
      },
      {
        type: 'callout',
        text: 'In benchmarks on domain-specific corpora, hybrid search consistently outperforms pure dense retrieval by 5–15% on NDCG@10. The gains are especially large for queries containing proper nouns, IDs, or technical terms.',
      },
      { type: 'heading', level: 2, text: '6. Reranking as a Quality Gate' },
      {
        type: 'paragraph',
        text: 'Retrieval gives you a candidate set of chunks. Reranking re-scores that candidate set with a more expensive but more accurate model before passing it to the LLM. Think of retrieval as a fast, approximate filter and reranking as a slow, precise scorer.',
      },
      {
        type: 'paragraph',
        text: 'The key difference: embedding-based retrieval encodes query and document independently. A cross-encoder reranker sees the query and document together — it can model the interaction between them, which is far more expressive.',
      },
      {
        type: 'code',
        language: 'python',
        code: `import cohere

co = cohere.Client("your-api-key")

def rerank(query: str, candidate_chunks: List[str], top_n: int = 5) -> List[str]:
    response = co.rerank(
        model="rerank-english-v3.0",
        query=query,
        documents=candidate_chunks,
        top_n=top_n,
    )
    # Return chunks sorted by reranker relevance score
    return [candidate_chunks[r.index] for r in response.results]


def retrieve_and_rerank(query: str, vector_store, top_k: int = 5) -> List[str]:
    # Retrieve a larger candidate set first
    candidates = hybrid_retrieve(query, vector_store, top_k=20)
    # Then rerank down to what the LLM will actually see
    return rerank(query, candidates, top_n=top_k)`,
      },
      {
        type: 'paragraph',
        text: 'The pattern is always: retrieve more candidates than you need (e.g. top-20), then rerank down to the final set (e.g. top-5) that goes into the LLM prompt. The retrieval step is cheap enough to cast a wide net; the reranker is accurate enough to trim the noise.',
      },
      {
        type: 'list',
        items: [
          'Cohere Rerank: hosted API, low-latency, easy to integrate',
          'BGE Reranker (open source): run locally or on your own infra, no API cost',
          'ColBERT: token-level late interaction model — excellent quality, more compute',
          'Typical latency add: 50–150ms for a rerank over 20 candidates — worth it for the quality gain',
        ],
      },
      { type: 'heading', level: 2, text: '7. Semantic Caching' },
      {
        type: 'paragraph',
        text: 'LLM generation is the most expensive step in the pipeline. If two users ask semantically equivalent questions — "What\'s the refund policy?" vs "How do I get a refund?" — there\'s no reason to run the full pipeline twice.',
      },
      {
        type: 'paragraph',
        text: 'Semantic caching stores (query_embedding → answer) pairs and, for new queries, checks if there\'s a cached answer whose embedding is close enough to reuse.',
      },
      {
        type: 'code',
        language: 'python',
        code: `import numpy as np
from dataclasses import dataclass
from typing import Optional

@dataclass
class CacheEntry:
    query: str
    embedding: List[float]
    answer: str

class SemanticCache:
    def __init__(self, similarity_threshold: float = 0.95):
        self.entries: List[CacheEntry] = []
        self.threshold = similarity_threshold

    def cosine_similarity(self, a: List[float], b: List[float]) -> float:
        a, b = np.array(a), np.array(b)
        return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

    def get(self, query_embedding: List[float]) -> Optional[str]:
        for entry in self.entries:
            if self.cosine_similarity(query_embedding, entry.embedding) >= self.threshold:
                return entry.answer
        return None

    def set(self, query: str, embedding: List[float], answer: str) -> None:
        self.entries.append(CacheEntry(query, embedding, answer))


# In your main pipeline:
cache = SemanticCache(similarity_threshold=0.95)

def answer_cached(query: str, vector_store) -> str:
    query_embedding = embed_query_cached(query)
    cached_answer = cache.get(query_embedding)
    if cached_answer:
        return cached_answer  # Skip retrieval + LLM entirely
    answer = answer_with_rag(query, vector_store)
    cache.set(query, query_embedding, answer)
    return answer`,
      },
      {
        type: 'paragraph',
        text: 'At scale, move this cache to a vector store (Redis with vector search, or a dedicated cache like GPTCache) rather than in-memory. You\'ll also want a TTL strategy — cached answers go stale when the underlying documents change.',
      },
      {
        type: 'list',
        items: [
          'Start with a high similarity threshold (0.95+) and lower it only if you\'re comfortable with the semantic fuzziness',
          'Cache at the answer level, not the retrieval level — avoids running the LLM, which is the expensive part',
          'Invalidate cache entries when source documents are updated or deleted',
          'Track cache hit rate — even 20–30% hit rate translates to significant cost and latency savings',
        ],
      },
      {
        type: 'callout',
        text: 'Hybrid search + reranking + semantic caching is a high-ROI combination. In production systems I\'ve worked on, this trio reduced P95 latency by ~40% and LLM costs by ~35% compared to naive RAG.',
      },
      { type: 'heading', level: 2, text: 'What\'s Next' },
      {
        type: 'paragraph',
        text: 'In Part 3, we cover the operational layer: streaming responses, async retrieval patterns, observability for RAG pipelines, and how to benchmark and evaluate your system so you know if your changes are actually helping.',
      },
    ],
  },
  {
    slug: 'scaling-rag-operations',
    title: 'Scaling RAG Part 3: Operations — Streaming, Observability & Evaluation',
    date: '2026-03-24',
    readTime: '9 min read',
    category: 'Generative AI',
    tags: ['RAG', 'Observability', 'Streaming', 'Evaluation', 'RAGAS', 'MLOps'],
    excerpt:
      'The final piece of a production RAG system: streaming responses for perceived speed, tracing and monitoring for operational visibility, and a rigorous evaluation framework so you know when your system is actually improving.',
    content: [
      {
        type: 'paragraph',
        text: 'Parts 1 and 2 covered infrastructure and retrieval quality. This post closes out the series with the operational concerns that separate a demo from a production system: async streaming, observability, and evaluation.',
      },
      { type: 'heading', level: 2, text: '8. Async & Streaming Responses' },
      {
        type: 'paragraph',
        text: 'LLM generation can take 3–10 seconds for a long response. Waiting for the full response before showing anything to the user feels terrible. Streaming tokens as they\'re generated dramatically improves perceived responsiveness.',
      },
      { type: 'heading', level: 3, text: 'Server-Sent Events (SSE) Pattern' },
      {
        type: 'paragraph',
        text: 'The standard pattern is to stream tokens from the LLM over a Server-Sent Events (SSE) connection. The retrieval step happens up front (synchronously), then the generation streams token-by-token.',
      },
      {
        type: 'code',
        language: 'python',
        code: `# FastAPI streaming endpoint
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

async def rag_stream(query: str, vector_store):
    # Retrieval is synchronous — do it first
    context_chunks = retrieve_and_rerank(query, vector_store)
    context = "\\n\\n---\\n\\n".join(context_chunks)

    prompt = f"""Answer using ONLY the context below.

Context:
{context}

Question: {query}
Answer:"""

    # Stream tokens as they arrive
    stream = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}],
        stream=True,
    )
    for chunk in stream:
        delta = chunk.choices[0].delta.content
        if delta:
            yield f"data: {delta}\\n\\n"
    yield "data: [DONE]\\n\\n"


@app.get("/ask")
async def ask(query: str):
    return StreamingResponse(
        rag_stream(query, vector_store),
        media_type="text/event-stream",
    )`,
      },
      { type: 'heading', level: 3, text: 'Async Retrieval' },
      {
        type: 'paragraph',
        text: 'If you\'re running multiple retrieval strategies in parallel (e.g. dense + sparse + a metadata lookup), run them concurrently rather than sequentially:',
      },
      {
        type: 'code',
        language: 'python',
        code: `import asyncio

async def parallel_retrieve(query: str, vector_store, bm25_index) -> List[str]:
    dense_task = asyncio.create_task(retrieve_dense_async(query, vector_store))
    sparse_task = asyncio.create_task(retrieve_sparse_async(query, bm25_index))

    dense_results, sparse_results = await asyncio.gather(dense_task, sparse_task)
    return reciprocal_rank_fusion(dense_results, sparse_results)`,
      },
      { type: 'heading', level: 2, text: '9. Observability' },
      {
        type: 'paragraph',
        text: 'RAG pipelines have multiple failure points that are invisible without instrumentation: bad retrieval, context truncation, LLM hallucination, slow embeddings. You need per-step tracing, not just end-to-end latency.',
      },
      { type: 'heading', level: 3, text: 'What to Trace' },
      {
        type: 'list',
        items: [
          'Retrieval: number of chunks retrieved, similarity scores of top results, whether metadata filters reduced the search space significantly',
          'Reranking: score distribution before/after rerank, how much the order changed',
          'Generation: prompt token count, completion token count, latency, finish reason (stop vs. length truncation)',
          'End-to-end: total latency broken down by stage, cache hit/miss, user feedback (thumbs up/down)',
        ],
      },
      {
        type: 'code',
        language: 'python',
        code: `import time
from dataclasses import dataclass, field

@dataclass
class RAGTrace:
    query: str
    cache_hit: bool = False
    retrieval_ms: float = 0
    rerank_ms: float = 0
    generation_ms: float = 0
    chunks_retrieved: int = 0
    top_similarity_score: float = 0
    prompt_tokens: int = 0
    completion_tokens: int = 0

def answer_with_tracing(query: str, vector_store) -> tuple[str, RAGTrace]:
    trace = RAGTrace(query=query)

    t0 = time.perf_counter()
    candidates = hybrid_retrieve(query, vector_store, top_k=20)
    trace.retrieval_ms = (time.perf_counter() - t0) * 1000
    trace.chunks_retrieved = len(candidates)

    t1 = time.perf_counter()
    context_chunks = rerank(query, candidates, top_n=5)
    trace.rerank_ms = (time.perf_counter() - t1) * 1000

    t2 = time.perf_counter()
    answer, usage = generate(query, context_chunks)
    trace.generation_ms = (time.perf_counter() - t2) * 1000
    trace.prompt_tokens = usage.prompt_tokens
    trace.completion_tokens = usage.completion_tokens

    # Emit to your observability platform (Datadog, Langfuse, etc.)
    emit_trace(trace)
    return answer, trace`,
      },
      {
        type: 'paragraph',
        text: 'Purpose-built RAG observability tools like Langfuse, Arize Phoenix, and TruLens are worth evaluating — they give you dashboards over retrieval quality and hallucination rates without having to build it yourself.',
      },
      { type: 'heading', level: 2, text: '10. Evaluation & Benchmarking' },
      {
        type: 'paragraph',
        text: 'Without a way to measure quality, you\'re flying blind. "It feels better" is not a feedback loop. You need a reproducible eval that tells you objectively whether a change improved the system.',
      },
      { type: 'heading', level: 3, text: 'The RAGAS Framework' },
      {
        type: 'paragraph',
        text: 'RAGAS (Retrieval Augmented Generation Assessment) provides four metrics that cover the key quality dimensions:',
      },
      {
        type: 'list',
        items: [
          'Faithfulness: does the answer contain only claims supported by the retrieved context? (hallucination detector)',
          'Answer Relevancy: is the answer actually responsive to the question asked?',
          'Context Precision: are the retrieved chunks relevant to the question? (retrieval quality)',
          'Context Recall: did retrieval capture all the information needed to answer? (retrieval completeness)',
        ],
      },
      {
        type: 'code',
        language: 'python',
        code: `from ragas import evaluate
from ragas.metrics import faithfulness, answer_relevancy, context_precision, context_recall
from datasets import Dataset

# Build an evaluation dataset: questions + ground truth answers + your pipeline's outputs
eval_data = {
    "question": ["What is the refund window?", "How do I reset my password?"],
    "answer": [pipeline_answer(q) for q in questions],          # your RAG output
    "contexts": [pipeline_contexts(q) for q in questions],      # retrieved chunks
    "ground_truth": ["30 days from purchase.", "Go to settings > security."],
}

dataset = Dataset.from_dict(eval_data)
result = evaluate(
    dataset,
    metrics=[faithfulness, answer_relevancy, context_precision, context_recall],
)
print(result)
# {'faithfulness': 0.91, 'answer_relevancy': 0.87,
#  'context_precision': 0.83, 'context_recall': 0.79}`,
      },
      { type: 'heading', level: 3, text: 'Building a Regression Suite' },
      {
        type: 'paragraph',
        text: 'Run RAGAS scores as part of your CI pipeline. Before merging any change to chunking strategy, retrieval parameters, or prompts, verify that the scores don\'t regress.',
      },
      {
        type: 'list',
        items: [
          'Start with 50–100 representative questions covering your main use cases',
          'Include adversarial questions (things your system should say "I don\'t know" to)',
          'Track scores over time — a score that slowly drifts down as the corpus grows is a signal worth catching early',
          'Separate your eval set from your development set — never tune your system on the same questions you evaluate on',
        ],
      },
      {
        type: 'callout',
        text: 'Evaluation is the highest-leverage investment in a RAG system. Teams that set up RAGAS early ship improvements faster because they can validate changes in minutes instead of relying on manual spot-checks.',
      },
      { type: 'heading', level: 2, text: 'Wrapping Up the Series' },
      {
        type: 'paragraph',
        text: 'Across these three posts, we\'ve gone from a naive notebook RAG prototype to a production-grade system: async ingestion with deduplication, optimized embeddings, a properly architected vector store, hybrid search with RRF fusion, cross-encoder reranking, semantic caching, streaming responses, per-step observability, and a repeatable evaluation framework.',
      },
      {
        type: 'paragraph',
        text: 'No single change makes the difference. Scaling RAG is a compounding set of improvements, each making the next one more impactful. Pick the one that addresses your current bottleneck, measure the gain, and iterate.',
      },
    ],
  },
  {
    slug: 'building-your-first-ai-agent',
    title: 'Building Your First AI Agent',
    date: '2026-03-29',
    readTime: '8 min read',
    category: 'AI Agents',
    tags: ['AI Agents', 'Claude', 'Anthropic', 'LLMs', 'TypeScript'],
    excerpt:
      'AI agents are LLMs that can take actions — calling tools, making decisions, and looping until a goal is complete. Here\'s how to build one from scratch using the Anthropic SDK.',
    content: [
      {
        type: 'paragraph',
        text: "Everyone is talking about AI agents, but most explanations skip straight to the magic without explaining the mechanics. An agent is not a special kind of model — it's a pattern. A loop where an LLM decides what to do, does it, observes the result, and decides what to do next. That's it.",
      },
      {
        type: 'paragraph',
        text: "In this post we'll build a real agent from scratch using the Anthropic SDK and TypeScript. No frameworks, no abstractions — just the raw loop so you can see exactly how it works. By the end you'll have an agent that can read files, run searches, and reason its way to an answer.",
      },
      { type: 'heading', level: 2, text: 'What Makes Something an Agent?' },
      {
        type: 'paragraph',
        text: "A plain LLM call is stateless and single-turn: you send a prompt, you get a response. An agent is different in two ways. First, it has tools — functions it can call to interact with the world. Second, it runs in a loop — the model's output feeds back as input until it decides it's done.",
      },
      {
        type: 'callout',
        text: 'Agent = LLM + tools + a loop. The model decides which tool to call, you execute it, and you feed the result back. Repeat until done.',
      },
      {
        type: 'paragraph',
        text: "The key insight is that the LLM is the decision-maker — it reasons about what to do next based on everything it has seen so far. Your code is just the executor — it runs whatever the model asks for and hands the result back.",
      },
      { type: 'heading', level: 2, text: 'Setting Up' },
      {
        type: 'paragraph',
        text: "Install the Anthropic SDK and set your API key. We'll write this in TypeScript.",
      },
      {
        type: 'code',
        language: 'bash',
        code: 'npm install @anthropic-ai/sdk\nexport ANTHROPIC_API_KEY=your_key_here',
      },
      { type: 'heading', level: 2, text: 'Defining Tools' },
      {
        type: 'paragraph',
        text: "Tools are functions your agent can call. You describe them in JSON schema — the model reads the description and decides when to use them. Let's define two simple tools: one to read a file and one to list directory contents.",
      },
      {
        type: 'code',
        language: 'typescript',
        code: `import Anthropic from '@anthropic-ai/sdk';
import * as fs from 'fs';
import * as path from 'path';

const client = new Anthropic();

const tools: Anthropic.Tool[] = [
  {
    name: 'read_file',
    description: 'Read the contents of a file at the given path.',
    input_schema: {
      type: 'object',
      properties: {
        file_path: {
          type: 'string',
          description: 'The path to the file to read.',
        },
      },
      required: ['file_path'],
    },
  },
  {
    name: 'list_directory',
    description: 'List the files and folders in a directory.',
    input_schema: {
      type: 'object',
      properties: {
        dir_path: {
          type: 'string',
          description: 'The path to the directory.',
        },
      },
      required: ['dir_path'],
    },
  },
];`,
      },
      { type: 'heading', level: 2, text: 'Executing Tool Calls' },
      {
        type: 'paragraph',
        text: "When the model decides to use a tool, it returns a response with stop_reason: 'tool_use'. Your job is to find the tool call, run the actual function, and return the result. Here's a simple dispatcher:",
      },
      {
        type: 'code',
        language: 'typescript',
        code: `function executeTool(name: string, input: Record<string, string>): string {
  if (name === 'read_file') {
    try {
      return fs.readFileSync(input.file_path, 'utf-8');
    } catch (e) {
      return \`Error reading file: \${e}\`;
    }
  }

  if (name === 'list_directory') {
    try {
      const entries = fs.readdirSync(input.dir_path);
      return entries.join('\\n');
    } catch (e) {
      return \`Error listing directory: \${e}\`;
    }
  }

  return \`Unknown tool: \${name}\`;
}`,
      },
      { type: 'heading', level: 2, text: 'The Agent Loop' },
      {
        type: 'paragraph',
        text: "This is the core of the agent. We keep calling the model, and if it wants to use a tool we execute it and add the result to the message history. We stop when the model returns stop_reason: 'end_turn' — meaning it has finished reasoning and has a final answer.",
      },
      {
        type: 'code',
        language: 'typescript',
        code: `async function runAgent(userMessage: string): Promise<string> {
  const messages: Anthropic.MessageParam[] = [
    { role: 'user', content: userMessage },
  ];

  while (true) {
    const response = await client.messages.create({
      model: 'claude-opus-4-6',
      max_tokens: 4096,
      tools,
      messages,
    });

    // Add the assistant's response to history
    messages.push({ role: 'assistant', content: response.content });

    // Done — return the final text response
    if (response.stop_reason === 'end_turn') {
      const textBlock = response.content.find((b) => b.type === 'text');
      return textBlock ? textBlock.text : '';
    }

    // The model wants to use tools — execute each one and collect results
    if (response.stop_reason === 'tool_use') {
      const toolResults: Anthropic.ToolResultBlockParam[] = [];

      for (const block of response.content) {
        if (block.type === 'tool_use') {
          const result = executeTool(block.name, block.input as Record<string, string>);
          toolResults.push({
            type: 'tool_result',
            tool_use_id: block.id,
            content: result,
          });
        }
      }

      // Feed the results back to the model
      messages.push({ role: 'user', content: toolResults });
    }
  }
}`,
      },
      { type: 'heading', level: 2, text: 'Running It' },
      {
        type: 'paragraph',
        text: "Now let's give the agent a task that requires it to explore the filesystem and reason about what it finds:",
      },
      {
        type: 'code',
        language: 'typescript',
        code: `const answer = await runAgent(
  'Look at the src directory and tell me what this project does based on the file structure.'
);

console.log(answer);`,
      },
      {
        type: 'paragraph',
        text: "The agent will call list_directory to see the files, possibly call read_file on a few key ones, and then synthesize an answer. You didn't tell it which files to read — it figured that out itself.",
      },
      { type: 'heading', level: 2, text: 'What to Add Next' },
      {
        type: 'paragraph',
        text: "This loop is the foundation. From here, every capability is just a new tool or a smarter system prompt. A few directions worth exploring:",
      },
      {
        type: 'list',
        items: [
          'Web search tool — let the agent fetch URLs or query a search API to get live information',
          'Memory — persist a summary of past runs so the agent can build on previous work',
          'Sub-agents — have one agent spawn another for specialized subtasks, then collect and merge results',
          'Structured output — use tool calls with strict schemas to force the agent to return machine-readable data instead of prose',
          'Streaming — stream the response token by token so users see progress while the agent thinks',
        ],
      },
      { type: 'heading', level: 2, text: 'Where Agents Break Down' },
      {
        type: 'paragraph',
        text: "Agents are powerful but they fail in predictable ways. The most common problems:",
      },
      {
        type: 'list',
        items: [
          'Looping — the model gets stuck calling the same tool repeatedly because it misinterprets the result. Always set a max iteration limit.',
          'Hallucinated tool calls — the model invents arguments that don\'t match your schema. Validate inputs before executing.',
          'Context overflow — long tool results eat through your context window fast. Truncate or summarize large outputs before adding them to history.',
          'Compounding errors — a wrong assumption early in the loop cascades into a confidently wrong final answer. Log every step so you can trace back.',
        ],
      },
      {
        type: 'callout',
        text: 'Always add a max_iterations guard to your agent loop. An agent with no exit condition and a bug in its tool can run indefinitely — and rack up API costs doing it.',
      },
      { type: 'heading', level: 2, text: 'The Loop Is the Architecture' },
      {
        type: 'paragraph',
        text: "The pattern we built here — messages, tools, loop until done — is the same pattern under every agent framework out there. LangChain, LlamaIndex, CrewAI, the Anthropic Agent SDK: they all implement this loop with different abstractions layered on top.",
      },
      {
        type: 'paragraph',
        text: "Understanding the raw loop means you can debug any agent, adapt any framework, and know exactly what's happening when something goes wrong. Start here, then reach for abstractions only when the complexity earns them.",
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}
