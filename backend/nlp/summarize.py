# nlp/summarize.py
import sys, json
from transformers import pipeline

def main():
    input_data = sys.stdin.read()
    summarizer = pipeline("summarization", model="facebook/bart-large-cnn")
    summary = summarizer(input_data, max_length=130, min_length=30, do_sample=False)
    print(json.dumps(summary[0]))

if __name__ == '__main__':
    main()
