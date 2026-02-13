const questions = [
    {
        question:`I got to the post office just before it closed and <span class="line"></span> the letter.`,
        answers: [
            {text : "sended", correct: false},
            {text : "send", correct: false},
            {text : "sent", correct: true},
            {text : "was sended", correct: false},
        ]
    },
    {
        question:`We invited Stephanie to the party, but she <span class="line"></span>.`,
        answers: [
            {text : "didn't come", correct: true},
            {text : "didn't came", correct: false},
            {text : "don't come", correct: false},
            {text : "came", correct: false},
        ]
    },
    {
        question:`I was bored, so Mum <span class="line"></span> me some money to go shopping.`,
        answers: [
            {text : "give", correct: false},
            {text : "given", correct: false},
            {text : "was given", correct: false},
            {text : "gave", correct: true},
        ]
    },
    {
        question:`It started raining, but luckily I <span class="line"></span> an umbrella in my bag.`,
        answers: [
            {text : "was had", correct: false},
            {text : "had", correct: true},
            {text : "have", correct: false},
            {text : "haved", correct: false},
        ]
    },
    {
        question:`Do you remember the time we <span class="line"></span> to India on holiday?`,
        answers: [
            {text : "do", correct: false},
            {text : "went", correct: true},
            {text : "did", correct: false},
            {text : "done", correct: false},
        ]
    },
    {
        question:`Jack lost his job because he <span class="line"></span> too many mistakes.`,
        answers: [
            {text : "made", correct: true},
            {text : "make", correct: false},
            {text : "did make", correct: false},
            {text : "maked", correct: false},
        ]
    },
    {
        question:`Karen <span class="line"></span> the keys from the kitchen table and ran out the door.`,
        answers: [
            {text : "taked", correct: false},
            {text : "take", correct: false},
            {text : "was taked", correct: false},
            {text : "took", correct: true},
        ]
    },
    {
        question:`Everyone <span class="line"></span> that it was Bill's fault, but nobody said anything.`,
        answers: [
            {text : "knowed", correct: false},
            {text : "knew", correct: true},
            {text : "know", correct: false},
            {text : "knewed", correct: false},
        ]
    },
    {
        question:`I don't need to worry about my homework because I <span class="line"></span> it last night.`,
        answers: [
            {text : "finesh", correct: false},
            {text : "did finished", correct: false},
            {text : "finished", correct: true},
            {text : "finish", correct: false},
        ]
    },
    {
        question:`Mum is angry with me because I <span class="line"></span> the window a week ago.`,
        answers: [
            {text : "broak", correct: false},
            {text : "broken", correct: false},
            {text : "broke", correct: true},
            {text : "break", correct: false},
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