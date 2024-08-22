import sys
import json

def chatbot_response(prompt):
    # Simple echo response for demonstration
    return f"Chatbot says: {prompt}"

if __name__ == "__main__":
    prompt = sys.argv[1]
    response = chatbot_response(prompt)
    print(json.dumps({"response": response}))
