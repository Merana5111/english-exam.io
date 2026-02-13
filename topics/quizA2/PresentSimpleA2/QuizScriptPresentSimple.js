const questions = [
    {
        question:`I <span class="line"></span> math, so it's not my favorite subject.`,
        answers: [
            {text : "don't understand", correct: true},
            {text : "don't understood", correct: false},
            {text : "don't understanding", correct: false},
            {text : "doesn't understand", correct: false},
        ]
    },
    {
        question:`My father <span class="line"></span> in his study after lunch.`,
        answers: [
            {text : "work", correct: false},
            {text : "don't work", correct: false},
            {text : "works", correct: true},
            {text : "will work", correct: false},
        ]
    },
    {
        question:`Your pie <span class="line"></span> delicious. I can't wait to taste it!`,
        answers: [
            {text : "are smelling", correct: false},
            {text : "smell", correct: true},
            {text : "smells", correct: false},
            {text : "smelled", correct: false},
        ]
    },
    {
        question:`What <span class="line"></span> the writer <span class="line"></span> these short stories to? Where does he see the similarities?`,
        answers: [
            {text : "do / compare", correct: false},
            {text : "does / compare", correct: true},
            {text : "do / compares", correct: false},
            {text : "does / compares", correct: false},
        ]
    },
    {
        question:`Why <span class="line"></span> you <span class="line"></span> before going to sleep? It's dangerous for health.`,
        answers: [
            {text : "did / exercised", correct: false},
            {text : "do / exercised", correct: false},
            {text : "did / exercise", correct: false},
            {text : "do /  exercise", correct: true},
        ]
    },
    {
        question: `I <span class="line"></span> after work by reading classical literature.`,
        answers: [
            {text : "relax", correct: true},
            {text : "relaxing", correct: false},
            {text : "relaxed", correct: false},
            {text : "relaxes", correct: false},
        ]
    },
    {
        question:`My classmate Josh is aggressive. He <span class="line"></span> me when I come to school.`,
        answers: [
            {text : "were bulling", correct: false},
            {text : "bullied", correct: false},
            {text : "bullies", correct: true},
            {text : "bulling", correct: false},
        ]
    },
    {
        question:`I often <span class="line"></span> books on the Internet because it's cheaper.`,
        answers: [
            {text : "order", correct: true},
            {text : "ordered", correct: false},
            {text : "orders", correct: false},
            {text : "ordering", correct: false},
        ]
    },
    {
        question:`The Earth <span class="line"></span> around the Sun.`,
        answers: [
            {text : "revolve", correct: false},
            {text : "revolves", correct: true},
            {text : "revolved", correct: false},
            {text : "revolving", correct: false},
        ]
    },
    {
        question:`Fans <span class="line"></span> me tens of letters every day.`,
        answers: [
            {text : "sendes", correct: false},
            {text : "sended", correct: false},
            {text : "send", correct: true},
            {text : "sending", correct: false},
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