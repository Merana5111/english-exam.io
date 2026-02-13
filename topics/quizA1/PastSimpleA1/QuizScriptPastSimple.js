const questions = [
    {
        question:`Jack <span class="line"></span> with us.`,
        answers: [
            {text : "didn't came", correct: false},
            {text : "didn't come", correct: true},
            {text : "don't came", correct: false},
            {text : "wasn't come", correct: false},
        ]
    },
    {
        question:`<span class="line"></span> by plane?`,
        answers: [
            {text : "Did you go", correct: true},
            {text : "Did you went", correct: false},
            {text : "Do you went", correct: false},
            {text : "Did you gone", correct: false},
        ]
    },
    {
        question:`Machester United <span class="line"></span> the final.`,
        answers: [
            {text : "did lose", correct: false},
            {text : "losed", correct: false},
            {text : "lost", correct: true},
            {text : "lose", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> a black shirt for the gala.`,
        answers: [
            {text : "choosed", correct: false},
            {text : "did choose", correct: false},
            {text : "choose", correct: false},
            {text : "chose", correct: true},
        ]
    },
    {
        question:`We <span class="line"></span> to Vancouver on holiday.`,
        answers: [
            {text : "go", correct: false},
            {text : "went", correct: true},
            {text : "did go", correct: false},
            {text : "did went", correct: false},
        ]
    },
    {
        question: `It was hot, so I <span class="line"></span> the window.`,
        answers: [
            {text : "opend", correct: false},
            {text : "open", correct: false},
            {text : "opened", correct: true},
            {text : "did open", correct: false},
        ]
    },
    {
        question:`The film was boring. I <span class="line"></span> it.`,
        answers: [
            {text : "didn't enjoyed", correct: false},
            {text : "enjoyed", correct: false},
            {text : "enjoy", correct: false},
            {text : "didn't enjoy", correct: true},
        ]
    },
    {
        question:`We <span class="line"></span> a lot last year.`,
        answers: [
            {text : "travelled", correct: true},
            {text : "did travel", correct: false},
            {text : "did travelled", correct: false},
            {text : "traveled", correct: false},
        ]
    },
    {
        question:`My uncle <span class="line"></span> a yacht last week.`,
        answers: [
            {text : "did buyed", correct: false},
            {text : "did buy", correct: false},
            {text : "bought", correct: true},
            {text : "buyed", correct: false},
        ]
    },
    {
        question:`She <span class="line"></span> French when she was at school.`,
        answers: [
            {text : "studied", correct: true},
            {text : "did studied", correct: false},
            {text : "did study", correct: false},
            {text : "studyed", correct: false},
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
const backtomenu = document.getElementById("backtomenu-btn")
const topics = document.getElementById("topics-btn")

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
Тест: English Past Simple Quiz
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