import React from 'react';
import io from 'socket.io-client';

// const allMessages = document.getElementById("all-messages");
// const newMessage = document.getElementById("new-message");

class Chat extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            users: []
        }

        // this.socket = io('http://localhost:3001/');
        this.socket = io('https://socket-server.mh-jsramverk.me');
        this.newMessage = document.getElementById("new-message");
    }

    componentDidMount() {
        const allMessages = document.getElementById("all-messages");

        // get chat history at first page load
        this.socket.emit('get history');

        this.socket.on('get history', function(res) {
            res.map((msg, i) => {
                const prevMessage = document.createElement("p");
                prevMessage.textContent = "[" + msg.currtime + "] " + msg.user + " sa: " + msg.msg;
                allMessages.appendChild(prevMessage);
            })
        });

        // delete all chat history
        this.socket.on('clear chat', function() {
            console.log("chat cleared");
            window.location.reload();
            return false;
        })

        // add a sent chat msg to view
        this.socket.on('chat message', function (message) {
            let addedMessage = document.createElement("p");

            addedMessage.textContent =
                "[" + message.currtime + "] "
                + message.user + " sa: "
                + message.msg;

            allMessages.appendChild(addedMessage);
            allMessages.scrollTop = allMessages.scrollHeight;
        });

        // let others know when new user connects (live update, not saving in db)
        this.socket.on('user connected', function (user) {
            let newUserConnected = document.createElement("p");
            newUserConnected.style.fontStyle = "italic";

            newUserConnected.textContent = user.user + " anslöt till chatten!";

            allMessages.appendChild(newUserConnected);
        })
    }

    // clear the chat history - not really secure to use obvi
    clearChat = (event) => {
        window.confirm("Är du säker? Åtgärden går inte att ångra")

        this.socket.emit('clear chat');
    }

    // handle username
    handleUser = (event) => {
        this.setState({ user: event.target.value })
    }

    // send the chat msg
    handleEnter = (event) => {
        if (event.key === "Enter") {
            this.checkUser();
            const timeStamp = new Date().toLocaleString();
            this.socket.emit('chat message', {
                currtime: timeStamp,
                user: this.state.user,
                msg: event.target.value
            });

            event.target.value = "";
        }
    }

    // check if use has connected before or is new
    checkUser = () => {
        if (!(this.state.users.includes(this.state.user))) {
            this.state.users.push(this.state.user);

            this.socket.emit('user connected', {
                user: this.state.user
            });
        } else {
            console.log(this.state.user + " already connected to chat")
        }
    };

    // render the html page
    render() {
        return (
            <div className="App">
                <article className="article-standard">
                    <h3>Chatt</h3>
                    <div id="all-messages" className="all-messages"></div>

                    <p><strong>Ange ditt namn:</strong></p>
                    <input
                        id="new-user"
                        type="text"
                        required
                        name="user"
                        onChange= {this.handleUser}
                    />

                    <p><strong>Skriv ett chattmeddelande:</strong></p>
                    <input
                        id="new-message"
                        type="text"
                        className="new-message"
                        required
                        name="msg"
                        onKeyDown= {this.handleEnter}
                    />
                    <p><i>Tryck enter för att skicka</i></p><br />

                    <input
                        className="button"
                        type="submit"
                        value="RENSA CHATTHISTORIK"
                        onClick= {this.clearChat} />

                    <p><i>OBS! Detta raderar all historik, går ej att ångra</i></p>
                </article>
            </div>
        )
    }
}

export default Chat;
