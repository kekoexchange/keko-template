import sqlite3

DB_NAME = './backend/db/db.sqlite'
DB_CONN = sqlite3.connect(DB_NAME)
DB_CONN.row_factory = sqlite3.Row
DB_CURSOR = DB_CONN.cursor()

DB_CURSOR.execute('''
    CREATE TABLE IF NOT EXISTS messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        role TEXT,
        content TEXT
    )
''')

# Function to insert a single message into the "messages" table
def create_message(role, content):
    DB_CURSOR.execute('INSERT INTO messages (role, content) VALUES (?, ?)', (role, content))
    DB_CONN.commit()

# Function to retrieve all messages from the "messages" table
def get_message(message_id=None):

    if message_id:
        DB_CURSOR.execute('SELECT role, content FROM messages WHERE id = ?', (message_id,))
    else:
        DB_CURSOR.execute('SELECT role, content FROM messages')

    return DB_CURSOR.fetchall()


def update_message(message_id, role, content):
    DB_CURSOR.execute('UPDATE messages SET role = ?, content = ? WHERE id = ?', (role, content, message_id))
    DB_CONN.commit()

def delete_message(message_id=None):

    if message_id:
        DB_CURSOR.execute('DELETE FROM messages WHERE id = ?', (message_id,))
    else:
        DB_CURSOR.execute('DELETE FROM messages')
        
    DB_CONN.commit()