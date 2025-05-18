import PyPDF2
from sentence_transformers import SentenceTransformer, util
import nltk
from nltk.tokenize import sent_tokenize

# Download NLTK punkt tokenizer if not already present
nltk.download('punkt')

# Load the pre-trained model
model = SentenceTransformer('all-MiniLM-L6-v2')

def extract_text_from_pdf(file_path):
    """
    Extracts text from the given PDF file.
    Returns the extracted text or an empty string if extraction fails.
    """
    try:
        reader = PyPDF2.PdfReader(file_path)
        text = ''
        for page in reader.pages:
            text += page.extract_text() or ''
        return text.strip()
    except Exception as e:
        print(f"Error extracting text from PDF: {e}")
        return ""

def summarize_text(text, max_sentences=5):
    """
    Summarizes the input text by selecting the most informative sentences.
    The sentences are ranked based on cosine similarity to the rest of the document.
    """
    # Tokenize the text into sentences
    sentences = sent_tokenize(text)
    
    if len(sentences) <= max_sentences:
        return ' '.join(sentences)  # Return all sentences if fewer than max_sentences

    # Compute sentence embeddings
    embeddings = model.encode(sentences)
    
    # Calculate cosine similarity between each sentence's embedding and the rest of the document
    scores = []
    for i, embedding in enumerate(embeddings):
        sim_score = sum(util.pytorch_cos_sim(embedding, embeddings).numpy()[0])
        scores.append(sim_score)
    
    # Get the indices of the top N sentences based on similarity score
    top_idx = sorted(range(len(scores)), key=lambda i: scores[i], reverse=True)[:max_sentences]
    return ' '.join([sentences[i] for i in sorted(top_idx)])

def answer_question(question, text):
    """
    Answers the question based on the provided text using cosine similarity.
    Returns the sentence that is most relevant to the question.
    """
    # Tokenize the text into sentences (chunks)
    chunks = sent_tokenize(text)

    # Compute embeddings for the question and the chunks
    chunk_embeddings = model.encode(chunks)
    question_embedding = model.encode(question)

    # Calculate cosine similarity between the question and each chunk
    scores = util.pytorch_cos_sim(question_embedding, chunk_embeddings)[0]

    # Get the index of the chunk with the highest score (most relevant)
    best_idx = scores.argmax()

    return chunks[best_idx]

