const questions = [
    {
        question:`I never <span class="line"></span> for my exams. I know that rote-learning is inefficient.`,
        answers: [
            {text : "craming", correct: false},
            {text : "cram", correct: true},
            {text : "crams", correct: false},
            {text : "crames", correct: false},
        ]
    },
    {
        question:`She <span class="line"></span> on her little son. He's like an angel to her.`,
        answers: [
            {text : "dotes", correct: true},
            {text : "doting", correct: false},
            {text : "dote", correct: false},
            {text : "dots", correct: false},
        ]
    },
    {
        question:`Lame people often <span class="line"></span> their feet.`,
        answers: [
            {text : "shuffling", correct: false},
            {text : "shuffles", correct: false},
            {text : "shuffls", correct: false},
            {text : "shuffle", correct: true},
        ]
    },
    {
        question:`Your words <span class="line"></span> the agenda. Are you in the know of what's going on in the world?`,
        answers: [
            {text : "doesn't fit", correct: false},
            {text : "don't fit", correct: true},
            {text : "fits", correct: false},
            {text : "don't fits", correct: false},
        ]
    },
    {
        question:`If great disasters <span class="line"></span> our nation, we will go through these.`,
        answers: [
            {text : "befalling", correct: false},
            {text : "befalls", correct: false},
            {text : "befall", correct: true},
            {text : "befalles", correct: false},
        ]
    },
    {
        question:`She <span class="line"></span> her desires through devout religious service.`,
        answers: [
            {text : "daunting", correct: false},
            {text : "dauntes", correct: false},
            {text : "daunts", correct: true},
            {text : "daunt", correct: false},
        ]
    },
    {
        question:`The best journalists <span class="line"></span> the ongoing conflict in Afghanistan.`,
        answers: [
            {text : "cover", correct: true},
            {text : "coveres", correct: false},
            {text : "covers", correct: false},
            {text : "covering", correct: false},
        ]
    },
    {
        question:`Your story <span class="line"></span> me to the days of my youth.`,
        answers: [
            {text : "transporting", correct: false},
            {text : "transports", correct: true},
            {text : "transport", correct: false},
            {text : "transportes", correct: false},
        ]
    },
    {
        question:`The government in Denmark <span class="line"></span> more taxes than in Russia.`,
        answers: [
            {text : "levie", correct: false},
            {text : "leviess", correct: false},
            {text : "leving", correct: false},
            {text : "levies", correct: true},
        ]
    },
    {
        question:`Extreme sports fan always <span class="line"></span> themselves to the limits.`,
        answers: [
            {text : "pushing", correct: false},
            {text : "pushs", correct: false},
            {text : "pushes", correct: false},
            {text : "push", correct: true},
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
    backtomenu.innerHTML = "Back to home";
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
Тест: English Present Simple Quiz
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
// Функция для получения детальных результатов
function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
}

// Закрытие модального окна при клике вне его
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