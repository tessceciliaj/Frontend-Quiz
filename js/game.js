const question = document.querySelector("#question");
const choices = Array.from(document.querySelectorAll(".choice-text"));
const progressText = document.querySelector("#progressText");
const scoreText = document.querySelector("#score");
const progressBarFull = document.querySelector("#progressBarFull");

let currentQuestion = {};
let acceptingAnswers = true;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "Which of the following is valid HTML for the heading tag with the smallest size and lowest rank in the hierarchy?",
        choice1: "<h3>",
        choice2: "<h6>",
        choice3: "<h1>",
        choice4: "<h9>",
        answer: 2,
    },
    {
        question: "HTML stands for which of the following?",
        choice1: "HyperTransfer Markup Language",
        choice2: "HyperText Markdown Language",
        choice3: "HyperText Markup Language",
        choice4: "HyperTransfer Markdown Language",
        answer: 3,
    },
    {
        question: "The <title> tag should only exist within...?",
        choice1: "<!DOCTYPE html>",
        choice2: "<head>",
        choice3: "<body>",
        choice4: "<div>",
        answer: 2,
    },
    {
        question: "Who developed JavaScript?",
        choice1: "Brendan Eich",
        choice2: "Bill Gates",
        choice3: "Steve Jobs",
        choice4: "Ada Lovelace",
        answer: 1,
    },
    {
        question: "What are the total number of episodes in Game of Thrones?",
        choice1: "50",
        choice2: "33",
        choice3: "100",
        choice4: "73",
        answer: 4,
    },
    {
        question: "What is 50 * 100?",
        choice1: "500",
        choice2: "4",
        choice3: "5000",
        choice4: "19",
        answer: 3,
    },
    {
        question: "What is the largest desert in the world?",
        choice1: "Sahara",
        choice2: "Antarctic",
        choice3: "Arctic",
        choice4: "Arabian",
        answer: 2,
    },
    {
        question: "What is the highest mountain on Earth?",
        choice1: "Mount Everest",
        choice2: "Broad Peak",
        choice3: "K12",
        choice4: "K2",
        answer: 1,
    },
    {
        question: "What are the Seven Seas of the world?",
        choice1: "Arctic, North Pole, South Atlantic, North Pacific, South Pacific, Indian, and Southern Oceans",
        choice2: "Arctic, North Atlantic, Atlantic ocean, South Shields, Indian, and Southern Oceans",
        choice3: "Arctic, North Atlantic, South Atlantic, North Pacific, South Pacific, Indian, and Southern Oceans",
        choice4: "North Atlantic, South Atlantis, North Pacific, South Pacific, Indian, and North West Oceans",
        answer: 3,
    },
    {
        question: "What is the highest grossing film ever made?",
        choice1: "Avatar",
        choice2: "Avengers: Endgame",
        choice3: "Star Wars: The Force Awakens",
        choice4: "Titanic",
        answer: 1,
    }
]

const SCORE_POINTS = 100;
const MAX_QUESTIONS = 10;

startGame = () => {
    questionCounter = 0
    score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}

getNewQuestion = () => {
    if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS) {
        localStorage.setItem('mostRecentScore', score)

        return window.location.assign('./end.html')
    }

    questionCounter++
    progressText.innerText = `Question ${questionCounter} of ${MAX_QUESTIONS}`
    progressBarFull.style.width = `${(questionCounter/MAX_QUESTIONS) * 100}%`
    
    const questionsIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionsIndex]
    question.innerText = currentQuestion.question

    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })

    availableQuestions.splice(questionsIndex, 1)

    acceptingAnswers = true
}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct' : 'incorrect'

        if(classToApply === 'correct') {
            incrementScore(SCORE_POINTS)
        }

        selectedChoice.parentElement.classList.add(classToApply)

        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()

        }, 1000)
    })
})

incrementScore = num => {
    score +=num
    scoreText.innerText = score
}

startGame()