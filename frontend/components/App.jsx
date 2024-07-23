import React, { useState, useEffect } from 'react';

function App() {
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState([]);

  useEffect(() => { 
    eel.get_all_messages()((messages) => {
      setMessagesList(messages);
    });
  }, []);

  const handleChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setMessagesList(prevMessageList => [...prevMessageList, {"role": "user", "content": message } ]);
    setMessage('');
    
    eel.send_message(message)((newMessage) => {
      setMessagesList(prevMessageList => [...prevMessageList, newMessage]);
    });
    
  };

  return (
    <div className="container">
      <section className="section hero is-primary">
        <div className="hero-body">
          <p className="title">Keko Template</p>
          <p className="subtitle">Template to get you started: React + Sqlite + Llama3 LLM</p>
        </div>
      </section>
      <section className="section messageArea">
        {messagesList.map((message, index) => {
            if (message.role === "user") {
              return (
                <div className="columns mb-2" key={index}>
                  <div className="column is-2">
                    <h1 className='is-size-4 has-text-primary'>{message.role}</h1>
                  </div>
                  <div className='column is-10'>
                    <pre className="mb-2"><code>{message.content}</code></pre>
                  </div>
                </div>
              );
            }
            else {
              return (
                <div className="columns mb-2" key={index}>
                  <div className="column is-10">
                    <pre className="mb-2" key={index}><code>{message.content}</code></pre>
                  </div>
                  <div className='column is-2 has-text-right'>
                    <h1 className='is-size-4 has-text-primary'>{message.role}</h1>
                  </div>
                </div>
              );
            }
          }
        )}
      </section>
      <section className="section messageForm">
        <form onSubmit={handleSubmit}>
          <div className="field"> 
            <label className="label">Message</label>
            <div className="control">
              <textarea className="textarea" name="message" value={message} onChange={handleChange} />
            </div>
          </div>
          <div className="field">
            <div className="control">
            <button className="button is-pulled-right" type="submit">Submit</button>
            </div>
          </div>
        </form>
      </section>
      <footer class="footer">
        <div class="content has-text-centered">
          <p>
            <strong>Keko-Template made</strong> by <a href="https://www.linkedin.com/in/kayashaolu/" target="_blank">Kay Ashaolu</a> for the community <a href="https://kekoexchange.com" target="_blank">Kekoexchange</a>.
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;