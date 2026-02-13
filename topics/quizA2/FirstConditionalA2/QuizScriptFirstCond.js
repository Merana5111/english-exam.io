const questions = [
    {
        question:`Tell me the truth if you <span class="line"></span>.`,
        answers: [
            {text : "can", correct: true},
            {text : "will can", correct: false},
            {text : "will", correct: false},
            {text : "could", correct: false},
        ]
    },
    {
        question:`If you <span class="line"></span> some eggs, I <span class="line"></span> some coffee.`,
        answers: [
            {text : "cook / make", correct: false},
            {text : "will cook / will make", correct: false},
            {text : "cook / will make", correct: true},
            {text : "will cook / make", correct: false},
        ]
    },
    {
        question:`The children <span class="line"></span> warm clothes tomorrow if it <span class="line"></span> cold.`,
        answers: [
            {text : "wear / will be", correct: false},
            {text : "will wear / is", correct: true},
            {text : "wear / is", correct: false},
            {text : "will wear / will be", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> a headache if I <span class="line"></span> to more of that loud music!`,
        answers: [
            {text : "will have / will listen", correct: false},
            {text : "have / listen", correct: false},
            {text : "will have / listen", correct: true},
            {text : "have / will listen", correct: false},
        ]
    },
    {
        question:`If our teacher <span class="line"></span> us another test on Monday, I <span class="line"></span> happy.`,
        answers: [
            {text : "will give / am not happy", correct: false},
            {text : "will gives / will not be", correct: false},
            {text : "gives / am not happy", correct: false},
            {text : "gives / will not be", correct: true},
        ]
    },
    {
        question:`If you <span class="line"></span> free tonight, we might go out for a drink, or to the cimena.`,
        answers: [
            {text : "will be", correct: false},
            {text : "are", correct: true},
            {text : "is", correct: false},
            {text : "would be", correct: false},
        ]
    },
    {
        question:`You should call me if you <span class="line"></span> anything unusual.`,
        answers: [
            {text : "seen", correct: false},
            {text : "saw", correct: false},
            {text : "will see", correct: false},
            {text : "see", correct: true},
        ]
    },
    {
        question:`He <span class="line"></span> depressed if he fails the exam.`,
        answers: [
            {text : "will be", correct: true},
            {text : "would be", correct: false},
            {text : "are", correct: false},
            {text : "is", correct: false},
        ]
    },
    {
        question:`If the weather <span class="line"></span> nice tomorrow, we <span class="line"></span> to the beach.`,
        answers: [
            {text : "is / go", correct: false},
            {text : "is / will go", correct: true},
            {text : "will be / go", correct: false},
            {text : "will be / will go", correct: false},
        ]
    },
    {
        question:`Don't worry! If you <span class="line"></span> out of the tree, I <span class="line"></span> you!`,
        answers: [
            {text : "will fall / will catch", correct: false},
            {text : "will fall / catch", correct: false},
            {text : "fall / catch", correct: false},
            {text : "fall / will catch", correct: true},
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
Тест: English First Conditional Quiz
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