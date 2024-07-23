import eel
import logging
from db import db_api
from llm import llm_api

logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

@eel.expose
def get_all_messages():
    all_messages = db_api.get_message()
    return [ { "role": message["role"], "content": message["content"] } for message in all_messages ]

@eel.expose
def send_message(message):
    logger.info(f"Received message: {message}")
    db_api.create_message("user", message)  # Save the message in the database with the role "user"
    all_messages = db_api.get_message()

    result = llm_api.send_to_llm(all_messages)

    db_api.create_message(result["role"], result["content"])  # Save the response in the database with the role "bot"
    return {"role": result["role"], "content": result["content"]}   

if __name__ == "__main__":
    eel.init("dist")
    eel.start("index.html")
