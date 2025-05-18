# nlp/compare_docs.py
import sys, json
from sentence_transformers import SentenceTransformer, util

def main():
    text1 = sys.argv[1]
    text2 = sys.argv[2]
    model = SentenceTransformer('paraphrase-MiniLM-L6-v2')
    embedding1 = model.encode(text1, convert_to_tensor=True)
    embedding2 = model.encode(text2, convert_to_tensor=True)
    similarity = util.pytorch_cos_sim(embedding1, embedding2).item()
    print(json.dumps({"similarity": similarity}))

if __name__ == '__main__':
    main()
