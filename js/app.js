let question = JSON.parse(localStorage.getItem('questions')),
    d = document,
    newBtn = d.querySelector('.newBtn'),
    skip = d.querySelector('.skip'),
    confirmBtn = d.querySelector('.confirm_btn'),
    questionTitle = d.querySelector('.question_title'),
    answer1 = d.querySelector('.answer-label-1'),
    answer2 = d.querySelector('.answer-label-2'),
    answer3 = d.querySelector('.answer-label-3'),
    answer4 = d.querySelector('.answer-label-4'),
    totalPrize = d.querySelector('.total-prize'),
    currentPrize = d.querySelector('.current-prize'),
    radioButton = d.getElementsByName('answer'),
    main = d.querySelector('.main'),
    item,
    correctAnswer,
    userAnswer,
    double = 2,
    finalScore = 1000000;

skip.setAttribute('disabled', 'disabled');
let next = function () {
    item = question[Math.floor(Math.random() * question.length)];
    questionTitle.innerText = item.question;
    answer1.innerText = item.content[0];
    answer2.innerText = item.content[1];
    answer3.innerText = item.content[2];
    answer4.innerText = item.content[3];
};
newBtn.addEventListener('click', function (e) {
    e.preventDefault();
    main.style.display = 'block';
    next();
    totalPrize.innerText = '0';
    currentPrize.innerText = '100';
    skip.removeAttribute('disabled');
    for (let i = 0; i < radioButton.length; i++) {
        radioButton[i].checked = false;
    }

});
skip.addEventListener('click', function (e) {
    e.preventDefault();
    next();
    for (let i = 0; i < radioButton.length; i++) {
        radioButton[i].checked = false;
    }
    skip.setAttribute('disabled', 'disabled');
});
confirmBtn.addEventListener('click', function (e) {
    e.preventDefault();
    for (let i = 0; i < radioButton.length; i++) {
        if (radioButton[i].checked) {
            userAnswer = radioButton[i].value;
            correctAnswer = item.correct;
            if (Number(userAnswer) === correctAnswer) {
                next();
                radioButton[i].checked = false;
                totalPrize.innerText = Number(totalPrize.innerHTML) + Number(currentPrize.innerHTML);
                currentPrize.innerText = currentPrize.innerText * double;
                if (Number(totalPrize.innerText) >= finalScore) {
                    alert('You Win' +
                        '\nYour prize: ' + finalScore);
                    next();
                    totalPrize.innerText = '0';
                    currentPrize.innerText = '100';
                }
            } else {
                alert('Game Over' +
                    '\nYour prize: ' + totalPrize.innerText);
                next();
                radioButton[i].checked = false;
                totalPrize.innerText = '0';
                currentPrize.innerText = '100';
                main.style.display = 'none';
            }
        }
    }
});