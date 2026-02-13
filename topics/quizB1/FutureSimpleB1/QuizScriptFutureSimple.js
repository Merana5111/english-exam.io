const questions = [
    {
        question:`Enough is enough! I'm fed up with this noise! I <span class="line"></span> to our neighbours about it now.`,
        answers: [
            {text : "talk", correct: false},
            {text : "will talk", correct: true},
            {text : "will have talked", correct: false},
            {text : "am going to talk", correct: false},
        ]
    },
    {
        question:`Because I <span class="line"></span> 18 this January, I will finally be able to drive.`,
        answers: [
            {text : "will be", correct: true},
            {text : "am going to be", correct: false},
            {text : "had been", correct: false},
            {text : "will have been", correct: false},
        ]
    },
    {
        question:`The film <span class="line"></span> at any moment. We had better get in or else we <span class="line"></span> the beginning of it`,
        answers: [
            {text : "is starting / are missing", correct: false},
            {text : "will start / miss", correct: false},
            {text : "starts / will miss", correct: true},
            {text : "will have started / have missed", correct: false},
        ]
    },
    {
        question:`Stop making fun of me or else I <span class="line"></span> mum about it.`,
        answers: [
            {text : "tell", correct: false},
            {text : "will have told", correct: false},
            {text : "have been talking", correct: false},
            {text : "will tell", correct: true},
        ]
    },
    {
        question:`I <span class="line"></span> any peace of mind until we <span class="line"></span> the first part of this job.`,
        answers: [
            {text : "am not going to have / will complete", correct: false},
            {text : "won't have / complete", correct: true},
            {text : "don't have / have completed", correct: false},
            {text : "am not having / are going to complete", correct: false},
        ]
    },
    {
        question:`He <span class="line"></span> tired after that.`,
        answers: [
            {text : "will", correct: false},
            {text : "will probably be", correct: true},
            {text : "probably be", correct: false},
            {text : "will probably was", correct: false},
        ]
    },
    {
        question:`I can't come over today. - Okay, then <span class="line"></span> you tomorrow.`,
        answers: [
            {text : "I've see", correct: false},
            {text : "I've seen", correct: false},
            {text : "I'll see", correct: true},
            {text : "I'm see", correct: false},
        ]
    },
    {
        question:`My car needs to be repaired. <span class="line"></span> do you think <span class="line"></span> cost?`,
        answers: [
            {text : "How much / it will", correct: true},
            {text : "How many / will it", correct: false},
            {text : "How much / will it", correct: false},
            {text : "How many / it will", correct: false},
        ]
    },
    {
        question:`It just said on the radio that it's going to rain. - Oh, did it? I <span class="line"></span> my umbrella then.`,
        answers: [
            {text : "will bought", correct: false},
            {text : "will buy", correct: false},
            {text : "will took", correct: false},
            {text : "will take", correct: true},
        ]
    },
    {
        question:`I've got some incredible news. You <span class="line"></span> what's happened.`,
        answers: [
            {text : "won't believe never", correct: false},
            {text : "will believe", correct: false},
            {text : "won't never believe", correct: false},
            {text : "will never believe", correct: true},
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

// Функция для получения детальных результатов
function getDetailedResults() {
    let details = "📝 Детали ответов:\n";
    
    // Вам нужно сохранять ответы пользователя для этого
    // Добавьте эту логику в существующий код:
    
    return details + "\n(Детали ответов доступны в полной версии)";
}