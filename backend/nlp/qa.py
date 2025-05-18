# nlp/qa.py
import sys, json
from transformers import pipeline

def main():
    input_data = json.loads(sys.stdin.read())  # Expecting JSON from Node.js
    question = input_data["question"]
    context = input_data["context"]

    qa = pipeline("question-answering")
    answer = qa(question=question, context=context)
    print(json.dumps(answer))

if __name__ == '__main__':
    main()
