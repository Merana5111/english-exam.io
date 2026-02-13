const questions = [
    {
        question:`I <span class="line"></span> you.`,
        answers: [
            {text : "will helped", correct: false},
            {text : "help", correct: false},
            {text : "will help", correct: true},
            {text : "will helping", correct: false},
        ]
    },
    {
        question:`We <span class="line"></span> this problem at the next meeting.`,
        answers: [
            {text : "will discuss", correct: true},
            {text : "will discussed", correct: false},
            {text : "wil discussing", correct: false},
            {text : "is discussing", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> today, tale an umbrella.`,
        answers: [
            {text : "will rain it", correct: false},
            {text : "it will rain", correct: true},
            {text : "will it rain", correct: false},
            {text : "it rain will", correct: false},
        ]
    },
    {
        question:`She <span class="line"></span> the movie tonight.`,
        answers: [
            {text : "watch will", correct: false},
            {text : "will watch", correct: true},
            {text : "watch'll", correct: false},
            {text : "are watch", correct: false},
        ]
    },
    {
        question:`What <span class="line"></span> after work?`,
        answers: [
            {text : "will he do", correct: true},
            {text : "do will he", correct: false},
            {text : "he will do", correct: false},
            {text : "he do will", correct: false},
        ]
    },
    {
        question: `I <span class="line"></span> lunch at the café today.`,
        answers: [
            {text : "have will", correct: false},
            {text : "have'll", correct: false},
            {text : "will had", correct: false},
            {text : "will have", correct: true},
        ]
    },
    {
        question:`Next year I <span class="line"></span> on the cruise.`,
        answers: [
            {text : "will went", correct: false},
            {text : "go", correct: false},
            {text : "will go", correct: true},
            {text : "will gone", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> my homework and go for a walk.`,
        answers: [
            {text : "will do", correct: true},
            {text : "will done", correct: false},
            {text : "do", correct: false},
            {text : "will did", correct: false},
        ]
    },
    {
        question:`When <span class="line"></span> the project?`,
        answers: [
            {text : "you will finish", correct: false},
            {text : "you'll finish", correct: false},
            {text : "will you finish", correct: true},
            {text : "finish will you", correct: false},
        ]
    },
    {
        question:`What <span class="line"></span> at the supermarket?`,
        answers: [
            {text : "you will buy", correct: false},
            {text : "buy you will", correct: false},
            {text : "will you buy", correct: true},
            {text : "you buy will", correct: false},
        ]
    }
];


function getRandomNumber(max) {
    return Math.floor(Math.random() * max);
}
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = getRandomNumber(i + 1);
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}
    
const randomQuestion = questions[getRandomNumber(questions.length)];
console.log(randomQuestion.question);


const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const backtomenu = document.getElementById("backtomenu-btn");
const topics = document.getElementById("topics-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });

}

function resetState() {
    nextButton.style.display = "none";
    backtomenu.style.display = "none";
    topics.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
    backtomenu.innerHTML = "Back to home"
    backtomenu.style.display = "block";
    topics.innerHTML = "Back to topics";
    topics.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        shuffleArray(questions);
        startQuiz();
    }
});

shuffleArray(questions);
startQuiz();

const originalShowScore = showScore;
showScore = function() {
    originalShowScore.call(this);
    
    // Создаем кнопку отправки результатов
    const sendResultsBtn = document.createElement('button');
    sendResultsBtn.id = 'send-results-btn';
    sendResultsBtn.innerHTML = 'Send results';
    sendResultsBtn.style.display = 'block';
    
    // Вставляем кнопку после кнопки "Back to topics"
    const topicsBtn = document.getElementById('topics-btn');
    topicsBtn.parentNode.insertBefore(sendResultsBtn, topicsBtn.nextSibling);
    
    // Добавляем обработчик
    sendResultsBtn.addEventListener('click', openResultsModal);
};

// Функции для работы с модальным окном
function openResultsModal() {
    document.getElementById('resultsModal').style.display = 'flex';
    document.getElementById('studentName').value = '';
    document.getElementById('studentName').focus();
}

function closeModal() {
    document.getElementById('resultsModal').style.display = 'none';
}

// Функция отправки результатов
function sendResultsByEmail() {
    const studentName = document.getElementById('studentName').value.trim();
    const teacherEmail = "mishishiii5@gmail.com"; 
    
    if (!studentName) {
        alert("Please enter your first and last name.");
        return;
    }
    
    // Подсчитываем детали ответов (добавьте эту функцию)
    const answersDetails = getDetailedResults();
    
    // Формируем текст письма
    const subject = encodeURIComponent(`Результаты теста: ${studentName}`);
    const body = encodeURIComponent(
`Уважаемый преподаватель!

📋 Результаты тестирования:

Студент: ${studentName}
Тест: English Future Simple Quiz
Правильных ответов: ${score} из ${questions.length}
Процент: ${Math.round((score/questions.length)*100)}%
Дата: ${new Date().toLocaleDateString('ru-RU')}


`);
    
    // Создаем mailto ссылку
    const mailtoLink = `mailto:${teacherEmail}?subject=${subject}&body=${body}`;
    
    // Открываем почтовый клиент
    window.location.href = mailtoLink;
    
    // Закрываем окно
    setTimeout(() => {
        closeModal();
        alert("Откроется ваша почта. Пожалуйста, нажмите 'Отправить' в письме.");
    }, 500);
}


document.getElementById('resultsModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// Закрытие по Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && document.getElementById('resultsModal').style.display === 'flex') {
        closeModal();
    }
});

// Функция для получения детальных результатов
function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
}