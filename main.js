const SERVER_URL = "https://speedrun-chat-server-js.herokuapp.com/";
const TIMEOUT = 1000;

let items = [
    /*{
        id: "123123123",
        username: "Вася Пупкин",
        text: "Всем привет, я Вася!",
        timestamp: 123123123123
    },*/
];

const list = document.getElementById("list");
const form = document.getElementById("form");
const username = document.getElementById("username");
const message = document.getElementById("message");
form.addEventListener("submit", event => {
    event.preventDefault();
    sendMessage(username.value, message.value);
    message.value = "";
});

function render() {
    let result = "";
    list.innerHTML = "";
    for (const item of items) {
        result += `<li>
                <span class="username">${item.username}:</span>
                <span>${item.text}</span>
            </li>`;
    }
    list.innerHTML = result;
}

render();

async function sendMessage(username, text) {
    const data = {
        username,
        text
    };
    await fetch(SERVER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    fetchMessages();
}

async function fetchMessages() {
    const response = await fetch(SERVER_URL);
    items = await response.json();
    render();
    setTimeout(fetchMessages, TIMEOUT);
}

fetchMessages();