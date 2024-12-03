import { dictionary } from './dictionary.js';

document.getElementById('translate-btn').addEventListener('click', () => {

    const wordInput = document.getElementById('word-input').value.trim().toLowerCase();
    const selectedLanguage = document.querySelector('input[name="language"]:checked').value;
    const responseArea = document.getElementById('response-area');
    const searchLanguage = selectedLanguage === 'english' ? 'spanish' : 'english';
    const translationLanguage = selectedLanguage === 'english' ? 'english' : 'spanish';

    const result = Object.values(dictionary.categories)
        .flat()
        .find(word => word[searchLanguage].toLowerCase() === wordInput);

    if (result) {
        const translation = result[translationLanguage];
        responseArea.textContent = `${translation} (${result.example})`;
    } else {
        responseArea.textContent = 'Palabra no encontrada.';
    }
});

document.querySelectorAll('input[name="category"]').forEach(categoryRadio => {
    categoryRadio.addEventListener('change', () => {
        const selectedCategory = categoryRadio.value;
        const wordsArea = document.getElementById('words-area');
        wordsArea.innerHTML = ''; 

        dictionary.categories[selectedCategory].forEach(word => {
            const wordElement = document.createElement('span');
            wordElement.textContent = `${word.english} -> ${word.spanish}`;
            wordElement.style.marginRight = "10px"; 
            wordsArea.appendChild(wordElement);
        });
    });
});

document.getElementById('new-word-form').addEventListener('submit', event => {
    event.preventDefault(); 

    const newWordEnglish = document.getElementById('new-word-english').value.trim();
    const newWordSpanish = document.getElementById('new-word-spanish').value.trim();
    const newWordExample = document.getElementById('new-word-example').value.trim();
    const category = document.getElementById('new-word-category').value;

    if (!newWordEnglish || !newWordSpanish || !newWordExample) {
        alert('Por favor, completa todos los campos.');
        return;
    }

    const newId = dictionary.categories[category].length + 1;

    const newWord = {
        id: newId,
        english: newWordEnglish,
        spanish: newWordSpanish,
        example: newWordExample
    };

    dictionary.categories[category].push(newWord);

    const wordsArea = document.getElementById('words-area');
    if (document.querySelector(`input[name="category"][value="${category}"]`).checked) {
        const wordElement = document.createElement('span');
        wordElement.textContent = `${newWord.english} -> ${newWord.spanish}`;
        wordElement.style.marginRight = "10px";
        wordsArea.appendChild(wordElement);
    }

    document.getElementById('new-word-form').reset();
});
