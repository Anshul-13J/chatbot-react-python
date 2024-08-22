import React, { useState, useEffect } from 'react';

function App() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const sendMessage = () => {
        if (!input.trim()) return;

        setMessages([...messages, { sender: 'user', text: input }]);
        window.electron.sendMessage(input);
        setInput('');
    };

    useEffect(() => {
        window.electron.onReply((response) => {
            setMessages((prevMessages) => [...prevMessages, { sender: 'bot', text: response }]);
        });
    }, []);

    return (
        <div style={styles.container}>
            <div style={styles.chatBox}>
                {messages.map((message, index) => (
                    <div key={index} style={styles[message.sender]}>
                        {message.text}
                    </div>
                ))}
            </div>
            <div style={styles.inputBox}>
                <input
                    style={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type a message..."
                    onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
                />
                <button style={styles.button} onClick={sendMessage}>
                    Send
                </button>
            </div>
        </div>
    );
}

const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        justifyContent: 'space-between',
        fontFamily: 'Arial, sans-serif',
    },
    chatBox: {
        flex: 1,
        padding: '10px',
        overflowY: 'scroll',
        display: 'flex',
        flexDirection: 'column',
    },
    inputBox: {
        display: 'flex',
        padding: '10px',
        borderTop: '1px solid #ccc',
    },
    input: {
        flex: 1,
        padding: '10px',
        fontSize: '16px',
    },
    button: {
        marginLeft: '10px',
        padding: '10px 20px',
        backgroundColor: '#007bff',
        color: '#fff',
        border: 'none',
        cursor: 'pointer',
    },
    user: {
        alignSelf: 'flex-end',
        backgroundColor: '#007bff',
        color: 'white',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '10px',
    },
    bot: {
        alignSelf: 'flex-start',
        backgroundColor: '#eee',
        padding: '10px',
        borderRadius: '10px',
        marginBottom: '10px',
    },
};

export default App;
