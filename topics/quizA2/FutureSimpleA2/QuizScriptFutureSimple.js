const questions = [
    {
        question:`It is getting cold. Come in or you <span class="line"></span> a cold.`,
        answers: [
            {text : "catch", correct: false},
            {text : "will catch", correct: true},
            {text : "are going to catch", correct: false},
            {text : "are catching", correct: false},
        ]
    },
    {
        question:`I'm afraid John <span class="line"></span> to our wedding. He <span class="line"></span to Argentina on Friday.`,
        answers: [
            {text : "won't come / is flying", correct: true},
            {text : "isn't coming / flies", correct: false},
            {text : "doesn't come / will fly", correct: false},
            {text : "isn't going to come / is going to fly", correct: false},
        ]
    },
    {
        question:`Perhaps, they <span class="line"></span> the museum this year.`,
        answers: [
            {text : "open", correct: false},
            {text : "are going to open", correct: false},
            {text : "will open", correct: true},
            {text : "are opening", correct: false},
        ]
    },
    {
        question:`Save some money for the future, or you <span class="line"></span> difficulty when you are old.`,
        answers: [
            {text : "is going to have", correct: false},
            {text : "are having", correct: false},
            {text : "have had", correct: false},
            {text : "will have", correct: true},
        ]
    },
    {
        question:`Don't come home late, or I <span class="line"></span> you go out with your friends again.`,
        answers: [
            {text : "won't let", correct: true},
            {text : "am not going to let", correct: false},
            {text : "don't let", correct: false},
            {text : "am mot letting", correct: false},
        ]
    },
    {
        question: `It's very cold in here. Oh, I <span class="line"></span> the window.`,
        answers: [
            {text : "closed", correct: false},
            {text : "close", correct: false},
            {text : "will close", correct: true},
            {text : "am closing", correct: false},
        ]
    },
    {
        question:`I promise I <span class="line"></span> of your dog.`,
        answers: [
            {text : "am going to take care", correct: false},
            {text : "will take care", correct: true},
            {text : "am taking care", correct: false},
            {text : "take care", correct: false},
        ]
    },
    {
        question:`Try this dress! I'm sure it <span class="line"></span> you.`,
        answers: [
            {text : "will suit", correct: true},
            {text : "is going to suit", correct: false},
            {text : "suits", correct: false},
            {text : "suit will", correct: false},
        ]
    },
    {
        question:`There isn't any juice left. I <span class="line"></span> some.`,
        answers: [
            {text : "get", correct: false},
            {text : "will getting", correct: false},
            {text : "am getting", correct: false},
            {text : "will get", correct: true},
        ]
    },
    {
        question:`I promise I <span class="line"></span> to the party without you.`,
        answers: [
            {text : "won't go", correct: true},
            {text : "not go", correct: false},
            {text : "don't go", correct: false},
            {text : "won't went", correct: false},
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

function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
}