// Pages
const homePage = document.getElementById('home-page');
const addFlashcardsPage = document.getElementById('add-flashcards-page');
const studyPage = document.getElementById('study-page');
const resultsPage = document.getElementById('results-page');


// Buttons
// Imma be realt with you, this sucks
// I wrote this at like 4 am, absolutely geeked of a irish cream java monster
// They're SO good i recommend
const startBtn = document.getElementById('start-btn');
const goToStudyBtn = document.getElementById('go-to-study-btn');
const flashcardForm = document.getElementById('flashcard-form');
const flashcardContent = document.getElementById('card-content');
const flipBtn = document.getElementById('flip-btn');
const correctBtn = document.getElementById('correct-btn');
const incorrectBtn = document.getElementById('incorrect-btn');
const nextBtn = document.getElementById('next-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsText = document.getElementById('results');

// Data
let flashcards = [];
let currentIndex = 0;
let showingAnswer = false;
let correctCount = 0;

// Navigation
function showPage(page) {
    [homePage, addFlashcardsPage, studyPage, resultsPage].forEach(p => p.classList.add('hidden'));
    page.classList.remove('hidden');
}

// STUDY TRIGGER
startBtn.addEventListener('click', () => showPage(addFlashcardsPage));
goToStudyBtn.addEventListener('click', () => {
    if (flashcards.length > 0) {
        showPage(studyPage);
        loadFlashcard();
    } else {
        alert('Add some flashcards first!');
    }
});

// FLASHCARD TRIGGER
flashcardForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const question = document.getElementById('question').value;
    const answer = document.getElementById('answer').value;
    flashcards.push({ question, answer });
    flashcardForm.reset();
    alert('Flashcard added!');
});

// FLIP TRIGGER
flipBtn.addEventListener('click', () => {
    showingAnswer = !showingAnswer;
    loadFlashcard();
});

// CORRECT INC TRIGGER
correctBtn.addEventListener('click', () => {
    correctCount++;
    nextFlashcard();
});

// INCORRECT TRIGGER
incorrectBtn.addEventListener('click', nextFlashcard);

// NEXT FLASHCARD TRIGGER
nextBtn.addEventListener('click', nextFlashcard);

// RESET TRIGGER
resetBtn.addEventListener('click', () => {
    flashcards = [];
    currentIndex = 0;
    correctCount = 0;
    showingAnswer = false;
    showPage(homePage);
});

// Loads a flashcard
// Or if no more flashcards are available, display results
function loadFlashcard() {
    if (currentIndex < flashcards.length) {
        const card = flashcards[currentIndex];
        flashcardContent.textContent = !showingAnswer ? "Question: " + card.question : "Answer: " + card.answer;
    } else {
        showPage(resultsPage);
        resultsText.textContent = `You answered ${correctCount} out of ${flashcards.length} correctly!`;
    }
}

// Next flashcard helper func
function nextFlashcard() {
    showingAnswer = false;
    currentIndex++;
    loadFlashcard();
}