const STORAGE_KEY = "feedback-form-state";
let formData = { email: "", message: "" };
const form = document.querySelector(".feedback-form");
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

function saveFormData(email, message) {
    formData.email = email.trim();
    formData.message = message.trim();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
}

function loadFormData() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    
    try {
        return savedData ? JSON.parse(savedData) : { email: "", message: "" };
    } catch (error) {
        console.error("Error parsing saved form data:", error);
        return { email: "", message: "" };
    }
}

form.addEventListener("input", () => {
    const email = emailInput.value;
    const message = messageInput.value;
    saveFormData(email, message);
});

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const email = emailInput.value.trim();
    const message = messageInput.value.trim();

    if (email === "" || message === "") {
        alert("Будь ласка, заповніть обидва поля форми перед відправкою!");
        return; 
    }

    const submittedData = { email, message };
    
    console.log("Form submitted with data:", submittedData);
    
    localStorage.removeItem(STORAGE_KEY);
    form.reset();

    formData = { email: "", message: "" };
});

window.addEventListener("DOMContentLoaded", () => {
    const savedData = loadFormData();
    
    formData.email = savedData.email;
    formData.message = savedData.message;
    
    emailInput.value = savedData.email;
    messageInput.value = savedData.message;
});