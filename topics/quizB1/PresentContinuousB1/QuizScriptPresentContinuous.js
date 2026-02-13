const questions = [
    {
        question:`Thomas and Patrick <span class="line"></span> outside in the yard now.`,
        answers: [
            {text : "are playing", correct: true},
            {text : "is playing", correct: false},
            {text : "playing", correct: false},
            {text : "are play", correct: false},
        ]
    },
    {
        question:`I can't talk to you right now because I <span class="line"></span>.`,
        answers: [
            {text : "am study", correct: false},
            {text : "is studying", correct: false},
            {text : "am studying", correct: true},
            {text : "are studying", correct: false},
        ]
    },
    {
        question:`Why are we waiting? Who <span class="line"></span> for?`,
        answers: [
            {text : "we are waiting", correct: false},
            {text : "we wait", correct: false},
            {text : "is we waiting", correct: false},
            {text : "are we waiting", correct: true},
        ]
    },
    {
        question:`It's very noisy upstairs! What <span class="line"></span>?`,
        answers: [
            {text : "is they doing", correct: false},
            {text : "are they doing", correct: true},
            {text : "they doing", correct: false},
            {text : "do they do", correct: false},
        ]
    },
    {
        question:`He usually goes for a walk at this time, but he <span class="line"></span> for a walk now.`,
        answers: [
            {text : "not go", correct: false},
            {text : "aren't going", correct: false},
            {text : "isn't going", correct: true},
            {text : "doesn't go", correct: false},
        ]
    },
    {
        question:`What <span class="line"></span> that cat doing over there by the chair?`,
        answers: [
            {text : "is", correct: true},
            {text : "are", correct: false},
            {text : "does", correct: false},
            {text : "do", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> dinner because we ordered pizza a few minutes ago.`,
        answers: [
            {text : "am not making", correct: true},
            {text : "don't make", correct: false},
            {text : "not make", correct: false},
            {text : "not making", correct: false},
        ]
    },
    {
        question:`I am watching TV and my brother <span class="line"></span> a book.`,
        answers: [
            {text : "reading", correct: false},
            {text : "are reading", correct: false},
            {text : "is reading", correct: true},
            {text : "reads", correct: false},
        ]
    },
    {
        question:`Is your friend sitting down?`,
        answers: [
            {text : "No, not", correct: false},
            {text : "No, he not", correct: false},
            {text : "No, he doesn't", correct: false},
            {text : "No, he isn't", correct: true},
        ]
    },
    {
        question:`<span class="line"></span> doing?`,
        answers: [
            {text : "What is you", correct: false},
            {text : "What are you", correct: true},
            {text : "What you", correct: false},
            {text : "What", correct: false},
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
Тест: English Present Continuous Quiz
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


// Закрытие модального окна при клике вне его
document.getElementById('resultsModal').addEventListener('click', function(e) {
    if (e.target === this) {
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