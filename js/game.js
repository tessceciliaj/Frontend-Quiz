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
        question: "What does z-index control?",
        choice1: "How far 'back' or 'forward' overlapping elements appear on a page.",
        choice2: "The capitalization of text elements.",
        choice3: "Which elements are at the beginning of a scrollable document.",
        choice4: "The height and width of an element.",
        answer: 1,
    },
    {
        question: "Which of the following statements is correct?",
        choice1: "Classes are more specific then IDs and tags",
        choice2: "Multiple classes are more specific then IDs and tags",
        choice3: "Tags are more specific then IDs and classes",
        choice4: "IDs are more specific then tags and classes",
        answer: 4,
    },
    {
        question: "What is the correct way to call a string's built-in method?",
        choice1: "toUpperCase.('hello');",
        choice2: "'hello'.toUpperCase();",
        choice3: "'hello'.toUpperCase;",
        choice4: "toUpperCase.'hello'();",
        answer: 2,
    },
    {
        question: "What are variables used for in JavaScript?",
        choice1: "For changing language settings.",
        choice2: "For storing or holding data.",
        choice3: "For changing a value's data type.",
        choice4: "Being able to name things.",
        answer: 2,
    },
    {
        question: "What is the correct way to call the 'random' method on the 'Math' global object?",
        choice1: "Math(random)",
        choice2: "math.random()",
        choice3: "random.Math()",
        choice4: "Math.random()",
        answer: 4,
    },
    {
        question: "Which statement is true about for loops?",
        choice1: "for loops always run an unknown number of times.",
        choice2: "for loops can never result in an infinite loop.",
        choice3: "for loops are appropiate when looping a predetermined number of times.",
        choice4: "for loops always count from 0 upwards.",
        answer: 3,
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