// DOM Element Selection
const quizContainer = document.getElementById('quiz');
const resultsContainer = document.getElementById('results');
const submitButton = document.getElementById('submit');
const startContainer = document.getElementById('start-container');
const quizContainerMain = document.getElementById('quiz-container');
const resultsContainerMain = document.getElementById('results-container');
const startButton = document.getElementById('start-quiz');
const restartButton = document.getElementById('restart-quiz');
const timerDisplay = document.getElementById('time-left');
const currentQuestionDisplay = document.getElementById('current-question');

// Quiz Questions Array
const myQuestions = [
    {
        question: "Who invented JavaScript?",
        answers: {
            a: "Douglas Crockford",
            b: "Sheryl Sandberg",
            c: "Brendan Eich"
        },
        correctAnswer: "c"
    },
    {
        question: "Which one of these is a JavaScript package manager?",
        answers: {
            a: "Node.js",
            b: "TypeScript",
            c: "npm"
        },
        correctAnswer: "c"
    },
    {
        question: "Which tool can you use to ensure code quality?",
        answers: {
            a: "Angular",
            b: "jQuery",
            c: "RequireJS",
            d: "ESLint"
        },
        correctAnswer: "d"
    }
];

// GGlobal Variables
let currentSlide = 0;
let timer;
let timeLeft;

// Timer Function: Manages the countdown for each questionm
function startTimer() {
    clearInterval(timer);
    timeLeft = 20;
    timerDisplay.textContent = timeLeft;
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        
        // Auto-advance to next question when timer reaches 0;
        if (timeLeft <= 0) {
            clearInterval(timer);
            showNextSlide();
        }
    }, 1000);
}

// Quiz Building Function: Creates the HTML structure for all questions
function buildQuiz() {
    const output = [];

    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answers = [];

        // Create buttons for each answer
        for(letter in currentQuestion.answers) {
            answers.push(
                `<label>
                    <input type="radio" name="question${questionNumber}" value="${letter}">
                    ${letter} : ${currentQuestion.answers[letter]}
                </label>`
            );
        }

        // Add question and its answers to the output array
        output.push(
            `<div class="slide">
                <div class="question">${currentQuestion.question}</div>
                <div class="answers">${answers.join('')}</div>
            </div>`
        );
    });

    // Insert the HTML into the quiz container
    quizContainer.innerHTML = output.join('');
}

// Results Function: Calculates and displays the final score
function showResults() {
    clearInterval(timer);
    const answerContainers = quizContainer.querySelectorAll('.answers');
    let numCorrect = 0;

    // Check answers for each question
    myQuestions.forEach((currentQuestion, questionNumber) => {
        const answerContainer = answerContainers[questionNumber];
        const selector = `input[name=question${questionNumber}]:checked`;
        const userAnswer = (answerContainer.querySelector(selector) || {}).value;

        // Increment score for correct answers
        if(userAnswer === currentQuestion.correctAnswer) {
            numCorrect++;
        }
    });

    // Show results page with final score
    quizContainerMain.classList.add('hidden');
    resultsContainerMain.classList.remove('hidden');
    resultsContainer.innerHTML = `You got ${numCorrect} out of ${myQuestions.length} questions correct!`;
}

// Navigation Function: Handles the display of each question slide
function showSlide(n) {
    slides[currentSlide].classList.remove('active-slide');
    slides[n].classList.add('active-slide');
    currentSlide = n;
    currentQuestionDisplay.textContent = currentSlide + 1;

    // Handle Previous button visibility
    if(currentSlide === 0) {
        previousButton.style.display = 'none';
    } else {
        previousButton.style.display = 'inline-block';
    }

    // Handle Next/Submit button visibility
    if(currentSlide === slides.length-1) {
        nextButton.style.display = 'none';
        submitButton.style.display = 'inline-block';
    } else {
        nextButton.style.display = 'inline-block';
        submitButton.style.display = 'none';
    }

    // Start timer for new question
    startTimer();
}

// Navigation Functions: Move between slides
function showNextSlide() {
    if (currentSlide < slides.length - 1) {
        showSlide(currentSlide + 1);
    } else {
        showResults();
    }
}

function showPreviousSlide() {
    showSlide(currentSlide - 1);
}

// Quiz Initialization Function: Sets up the quiz when Start is clicked
function startQuiz() {
    startContainer.classList.add('hidden');
    quizContainerMain.classList.remove('hidden');
    buildQuiz();
    slides = document.querySelectorAll(".slide");
    previousButton.style.display = 'none';
    submitButton.style.display = 'none';
    showSlide(0);
}

// Restart Function: Resets the quiz to the start page
function restartQuiz() {
    currentSlide = 0;
    resultsContainerMain.classList.add('hidden');
    startContainer.classList.remove('hidden');
}

// Additional DOM Elements
const previousButton = document.getElementById("previous");
const nextButton = document.getElementById("next");

// Event Listeners
startButton.addEventListener('click', startQuiz);
submitButton.addEventListener('click', showResults);
previousButton.addEventListener("click", showPreviousSlide);
nextButton.addEventListener("click", showNextSlide);
restartButton.addEventListener('click', restartQuiz);