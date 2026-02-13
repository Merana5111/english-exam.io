const questions = [
    {
        question:`I <span class="line"></span> blond when I was a child.`,
        answers: [
            {text : "used to be", correct: true},
            {text : "got used to being", correct: false},
            {text : "was used to being", correct: false},
            {text : "were used to being", correct: false},
        ]
    },
    {
        question:`My father <span class="line"></span> tell us stories when we were in bed.`,
        answers: [
            {text : "was used to", correct: false},
            {text : "used to", correct: true},
            {text : "use to", correct: false},
            {text : "was use to", correct: false},
        ]
    },
    {
        question:`I've been in France for a week and I <span class="line"></span> driving on the right.`,
        answers: [
            {text : "used to", correct: false},
            {text : "use to", correct: false},
            {text : "getting use to", correct: false},
            {text : "am getting used to", correct: true},
        ]
    },
    {
        question:`I <span class="line"></span> work in a bank, but now I'm working as a desinger.`,
        answers: [
            {text : "use to", correct: false},
            {text : "got used to", correct: false},
            {text : "was used", correct: false},
            {text : "used to", correct: true},
        ]
    },
    {
        question:`We <span class="line"></span> go to the cinema very often.`,
        answers: [
            {text : "didn't used to", correct: false},
            {text : "usedn't to", correct: false},
            {text : "didn't use to", correct: true},
            {text : "usen't to", correct: false},
        ]
    },
    {
        question:`When my friends and I were younger we <span class="line"></span> rafting every summer.`,
        answers: [
            {text : "are use to go", correct: false},
            {text : "used to go", correct: true},
            {text : "use to go", correct: false},
            {text : "get used to go", correct: false},
        ]
    },
    {
        question:`I <span class="line"></span> sweets but now I can eat tons of them.`,
        answers: [
            {text : "didn't use to like", correct: true},
            {text : "don't used to like", correct: false},
            {text : "getn't use to like", correct: false},
            {text : "amn't use to like", correct: false},
        ]
    },
    {
        question:`My girlfriend is British so she <span class="line"></span> on the right.`,
        answers: [
            {text : "use to driving", correct: false},
            {text : "used to drive", correct: false},
            {text : "isn't used to driving", correct: true},
            {text : "aren't used to driving", correct: false},
        ]
    },
    {
        question:`When I was a child, I <span class="line"></span> play computer games a lot.`,
        answers: [
            {text : "used to", correct: true},
            {text : "was used to", correct: false},
            {text : "were used to", correct: false},
            {text : "got used to", correct: false},
        ]
    },
    {
        question:`At first Michael didn't like his newboss, but finally he <span class="line"></span> her.`,
        answers: [
            {text : "used to", correct: false},
            {text : "got used to", correct: true},
            {text : "get used to", correct: false},
            {text : "are used to", correct: false},
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
Тест: English Be Used Quiz
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