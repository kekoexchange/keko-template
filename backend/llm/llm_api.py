import ollama

LLM_MODEL_NAME = "keko-template-model"

def send_to_llm(messages):

    all_messages = ([
        {
            'role': message["role"],
            'content': message["content"]
        } for message in messages
    ])

    result = ollama.chat(
        model=LLM_MODEL_NAME,
        messages=all_messages
    )

    return result["message"]