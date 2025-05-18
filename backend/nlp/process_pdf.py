import os
import sys
import json

# ─── Disable HuggingFace symlink warnings on Windows ──────────────────────────
os.environ['HF_HUB_DISABLE_SYMLINKS_WARNING'] = '1'

# ─── NLTK setup ───────────────────────────────────────────────────────────────
import nltk
nltk.download('punkt')  # Ensure tokenizer models are available
from nltk.tokenize import sent_tokenize

# ─── Transformers pipelines ───────────────────────────────────────────────────
from transformers import pipeline
from sentence_transformers import SentenceTransformer, util

# Explicitly specify models
summarizer = pipeline(
    "summarization",
    model="sshleifer/distilbart-cnn-12-6",
    device=-1  # CPU
)
qa_model = pipeline(
    "question-answering",
    model="distilbert/distilbert-base-cased-distilled-squad",
    device=-1  # CPU
)

# ─── Sentence-BERT embedder for embeddings/comparison ──────────────────────────
embedder = SentenceTransformer('all-MiniLM-L6-v2', device='cpu')

def extract_text_from_pdf(pdf_path):
    import fitz  # PyMuPDF
    try:
        doc = fitz.open(pdf_path)
        text = ""
        for page in doc:
            text += page.get_text()
        return text
    except Exception as e:
        return f"Error extracting text: {e}"

def summarize_text(text):
    # Dynamically choose max_length no more than half input length, at most 150
    approx_tokens = len(text.split())
    max_len = min(150, max(20, approx_tokens // 2))
    summary = summarizer(text, max_length=max_len, min_length=10, do_sample=False)
    return summary[0]['summary_text']

def answer_question(text, question):
    result = qa_model(question=question, context=text)
    return result.get('answer', '')

def generate_embeddings(text):
    sentences = sent_tokenize(text)
    if not sentences:
        return []
    embeddings = embedder.encode(sentences, convert_to_tensor=True)
    return embeddings.cpu().numpy().tolist()

if __name__ == '__main__':
    # Check if correct number of arguments are passed
    if len(sys.argv) < 3:
        print(json.dumps({'error': 'Insufficient arguments. Please provide pdf_path and task.'}))
        sys.exit(1)

    pdf_path = sys.argv[1]
    task = sys.argv[2] if len(sys.argv) > 2 else 'extract'
    question = sys.argv[3] if len(sys.argv) > 3 else None

    # Initialize the result dictionary
    result = {}

    try:
        # Extract text from PDF
        text = extract_text_from_pdf(pdf_path)

        if task == 'extract':
            result = {'text': text}

        elif task == 'summarize':
            result = {'summary': summarize_text(text)}

        elif task == 'qa' and question:
            result = {'answer': answer_question(text, question)}

        elif task == 'embed':
            result = {'embeddings': generate_embeddings(text)}

        else:
            result = {'error': 'Invalid task or missing question'}

    except Exception as e:
        result = {'error': f"An error occurred: {str(e)}"}

    # Print the result as JSON
    print(json.dumps(result))
