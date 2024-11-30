import { dictionary } from './dictionary.js';

const wordInput = document.getElementById('word-input');
const translateBtn = document.getElementById('translate-btn');
const responseArea = document.getElementById('response-area');
const categories = document.querySelectorAll('.categories input');
const wordsArea = document.getElementById('words-area');

// Traducción
translateBtn.addEventListener('click', () => {
    const word = wordInput.value.toLowerCase();
    const language = document.querySelector('input[name="language"]:checked').value;

    for (const category in dictionary.categories) {
        const wordData = dictionary.categories[category].find(
            (entry) => entry[language] && entry[language].toLowerCase() === word
        );
        if (wordData) {
            responseArea.textContent = `${wordData.english} / ${wordData.spanish}`;
            return;
        }
    }
    responseArea.textContent = 'Palabra no encontrada / Word not found';
});

// Mostrar palabras por categoría
categories.forEach((radio) => {
    radio.addEventListener('change', () => {
        const category = radio.value;
        const words = dictionary.categories[category];
        wordsArea.innerHTML = words
            .map((word) => `${word.english} / ${word.spanish}`)
            .join('<br>');
    });
});
