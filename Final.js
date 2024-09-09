document.getElementById('chatbot-toggle').addEventListener('click', function() {
    var chatbotWidget = document.querySelector('.chatbot-widget');
    if (chatbotWidget.style.display === 'none' || chatbotWidget.style.display === '') {
        chatbotWidget.style.display = 'flex';
        this.style.display = 'none';
    }
});

document.querySelector('.close-btn').addEventListener('click', function() {
    var chatbotWidget = document.querySelector('.chatbot-widget');
    var toggleBtn = document.getElementById('chatbot-toggle');
    chatbotWidget.style.display = 'none';
    toggleBtn.style.display = 'block';
});
// List of FAQs and answers
const faqs = [
    {
        question: "hi",
        answer: "Hi Nice to See you how can I help You."
    },
    {
        question: "What is Citysage",
        answer: "CitySage is your trusted partner for seamless and memorable travel experiences. We offer flights to a variety of destinations around the world."
    },
    {
        question: "How can I book a flight",
        answer: "You can book a flight by visiting the 'Book a Flight' section on our website or by clicking the 'Book Your Tickets' button on the homepage."
    },
    {
        question: "What payment methods do you accept",
        answer: "We accept all major credit cards, debit cards, and online payment methods such as PayPal and Google Pay."
    },
    {
        question: "Can I cancel or change my booking",
        answer: "Yes, you can cancel or change your booking by visiting the 'Manage Booking' section on our website. Please note that cancellation and change fees may apply."
    },
    {
        question: "How do I contact customer support",
        answer: "You can contact our customer support team via email at support@skywings.com or by phone at +1 234 567 890."
    }
];

// Chatbot functionality
const chatbotInput = document.querySelector('.chatbot-input');
const sendBtn = document.querySelector('.send-btn');
const chatbotMessages = document.querySelector('.chatbot-messages');

sendBtn.addEventListener('click', handleMessage);

function handleMessage() {
    const userMessage = chatbotInput.value.trim();
    if (!userMessage) return;

    addMessageToChat(userMessage, 'user');
    chatbotInput.value = '';

    const faqAnswer = getFaqAnswer(userMessage);
    if (faqAnswer) {
        addMessageToChat(faqAnswer, 'bot');
    } else {
        addMessageToChat("Sorry, I didn't understand that. Can you please ask in a different way?", 'bot');
    }
}

function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', sender);
    messageElement.textContent = message;
    chatbotMessages.appendChild(messageElement);
}

function getFaqAnswer(userMessage) {
    userMessage = userMessage.toLowerCase();
    for (let faq of faqs) {
        if (userMessage.includes(faq.question.toLowerCase())) {
            return faq.answer;
        }
    }
    return null;
}
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.interimResults = true;
recognition.lang = 'en-US';

const micBtn = document.querySelector('.mic-btn');
const inputField = document.querySelector('.chatbot-input');

micBtn.addEventListener('click', function() {
    recognition.start();
});

recognition.addEventListener('result', (event) => {
    const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');

    inputField.value = transcript;

    if (event.results[0].isFinal) {
        // You can add code here to automatically send the message
        // or process it as per your application logic
        console.log("Final Speech Result: ", transcript);
    }
});

recognition.addEventListener('end', () => {
    // Optionally restart recognition or handle the end of speech recognition
});
