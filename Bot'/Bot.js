const chatInput = document.querySelector(".chat-input textarea");
const sendChatBtn = document.querySelector(".chat-input span");
const chatbox = document.querySelector(".chatbox");
const chatToggler = document.querySelector(".chatbot-toggler");
const chatbotCloseBtn = document.querySelector(".close-btn");

let userMessage;
const API_KEY = "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";
const inputInitHeight = chatInput.scrollHeight;

// Create a list item with the passed message and className
const createChatLi = (message, className) => {
    const chatLi = document.createElement("li");
    chatLi.classList.add("chat", className);
    let chatContent = className === "outgoing" ? `<p></p>` : `<span class="material-symbols-outlined">smart_toy</span><p></p>`;
    chatLi.innerHTML = chatContent;
    chatLi.querySelector("p").textContent = message;
    return chatLi;
};

const generateResponse = (incomingChatLi) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const messageElement = incomingChatLi.querySelector("p");

    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${API_KEY}`
        },
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [{ role: "user", content: userMessage }]
        })
    };

    fetch(API_URL, requestOptions)
        .then(res => res.json())
        .then(data => {
            var user = userMessage.toLowerCase();
                if(user=="hi")
                    messageElement.textContent = "Hello How can i help you.";

                else if(userMessage=="What's your Name")
                    messageElement.textContent = "I am Versa Bot. Your friendly Bot to assist you.";

                else if(user=="I need your help")
                    messageElement.textContent = "Yes. I am created to serve you.";

                else if(user=="hello")
                    messageElement.textContent = "Hello How can i help you.";

                else if(user=="Good Morning")
                    messageElement.textContent = "Good Morning! Hello How can i help you.";

                else if(user=="Good Afternoon")
                    messageElement.textContent = "Good Afternoon! Hello How can i help you.";

                else if(user=="Good Evening")
                    messageElement.textContent = "Good Evening! Hello How can i help you.";

                else if(user=="Good Night")
                    messageElement.textContent = "Good Night! Hello How can i help you.";

                else if(user=="pesticides")
                    messageElement.textContent = "1.Bayers\n\n2.Riddi\n\n3.Symbor67";

                else if(user=="fertilizers")
                    messageElement.textContent = "1.Urea\n\n2.Complex\n\n3.19-19-19";

                else if(user=="common diseases")
                    messageElement.textContent = "Damping Off\nSeptoria leaf spot\nBacterial stem and fruit canker\nEarly blight\nBacterial leaf spot\nBacterial wiltLeaf curl\nMosaic\nTomato spotted wilt disease\nFusarium wilt\nIPM for Tomato";

                else if(user=="ph range")
                    messageElement.textContent = "Average range of pH for tomato is 6-7 (Approx)";

                else if(user=="tomato varities")
                    messageElement.textContent = "Sioux\n\nPusa Red Plum\n\nPusa Early Dwarf\n\nPusa Ruby\n\nCO-1,CO-2";

                else if(user=="tomato season")
                    messageElement.textContent = "Planting Season :\nMay - June \nNovember - December";

                else if(user=="harvest season")
                    messageElement.textContent = "Harvesting Season : \n130-140 Days after Planting(When it turns Reddish colour";

                else
                messageElement.classList.add("error");
                messageElement.textContent = "Oops! Something Went wrong. Please try again.";

        })
        .catch((error) => {
            messageElement.classList.add("error");
            messageElement.textContent = "Oops! Something Went wrong. Please try again.";
        })
        .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};

const handleChat = () => {
    userMessage = chatInput.value.trim();
    if (!userMessage)
        return;

    chatInput.value = "";
    chatInput.style.height = `${inputInitHeight}px`;

    // Display user message
    chatbox.appendChild(createChatLi(userMessage, "outgoing"));
    chatbox.scrollTo(0, chatbox.scrollHeight);

    setTimeout(() => {
        const incomingChatLi = createChatLi("Processing...", "incoming");
        chatbox.appendChild(incomingChatLi);
        chatbox.scrollTo(0, chatbox.scrollHeight);
        generateResponse(incomingChatLi);
    }, 600);
};

chatInput.addEventListener("input", () => {
    chatInput.style.height = `${inputInitHeight}px`;
    chatInput.style.height = `${chatInput.scrollHeight}px`;
});

chatInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter" && window.innerWidth > 800) {
        e.preventDefault();
        handleChat();
    }
});

sendChatBtn.addEventListener("click", handleChat);
chatbotCloseBtn.addEventListener("click", () => document.body.classList.remove("show-chatbot"));
chatToggler.addEventListener("click", () => document.body.classList.toggle("show-chatbot"));