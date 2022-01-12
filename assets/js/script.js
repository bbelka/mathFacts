let firstNum = new Number;
let secondNum = new Number;
let operator = new String;
let first = new Number;
let second = new Number;
let selectedOperator = new String;
let numberOfProblems = new Number;
let time = new Number;
let questionCounter = new Number;

const computations = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b
}

const generateDigit = () => {
    return Math.floor(Math.random() * 9);
};

const generateNumber = (num) => {
    console.log(num);
    let numArr = new Array;
    if (num === 1) {
        let digit = generateDigit();
        numArr.push(digit);
    } else {
        let counter = 1;
        while (counter <= num) {
            while (counter === 1) {
                let digit = generateDigit();
                while (digit === 0) digit = generateDigit();
                numArr.push(digit);
                ++counter;
            }
            let digit = generateDigit();
            numArr.push(digit);
            ++counter;
        };
    };
    return parseInt(numArr.join(''));
};

const displayProblem = () => {
    $('#mathProblemDiv')[0].reset();
    if (selectedOperator === 'random') {
        const operators = ['+', '-', '*', '/'];
        operator = operators[Math.floor(Math.random() * operators.length)]
    } else { operator = selectedOperator };
    firstNum = generateNumber(first);
    secondNum = generateNumber(second);
    if (operator === '/') {
        while (firstNum % secondNum !== 0) {
            firstNum = generateNumber(first);
            secondNum = generateNumber(second);
        }
        while (secondNum === 0) {
            secondNum = generateNumber(second);
        };
    };
    if (operator === '-') {
        while (firstNum - secondNum < 0) {
            firstNum = generateNumber(first);
            secondNum = generateNumber(second);
        };
    };
    $('#numeral1H1').text(firstNum);
    $('#numeral2H1').text(secondNum);
    $('#operatorH1').text(operator);
    $('#mathProblemDiv').removeClass('hidden')
    $('#answer').select();
}

const playGame = () => {
    $('#parameterForm').addClass('hidden');
    $('#header').addClass('hidden');
    if (questionCounter <= numberOfProblems) {
        displayProblem();
    } else {
        $('#header').removeClass('hidden');
        $('#parameterForm').removeClass('hidden');
        $('#mathProblemDiv').addClass('hidden');
    }
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    first = parseInt($('#numeral1DigitsSelect').val());
    second = parseInt($('#numeral2DigitsSelect').val());
    selectedOperator = $('#operatorSelect').val();
    numberOfProblems = parseInt($('#numberOfProblemsInput').val());
    time = parseInt($('#timeInput').val());
    questionCounter = 1;
    playGame();
};

const compareAnswer = () => {
    const userAnswer = parseFloat($('#answer').val());
    const computedAnswer = computations[operator](firstNum, secondNum);
    return userAnswer === computedAnswer ? true : false;
}

const correct = () => {
    $('#mathProblemDiv').addClass('hidden');
    $('#correct').removeClass('hidden')
    setTimeout(() => {
        $('#correct').addClass('hidden');
        $('#mathProblemDiv').removeClass('hidden');
        ++questionCounter;
        playGame()
    }, 500);
};

const incorrect = () => {
    $('#mathProblemDiv').addClass('hidden');
    $('#incorrect').removeClass('hidden')
    setTimeout(() => {
        $('#incorrect').addClass('hidden');
        $('#mathProblemDiv').removeClass('hidden');
        ++questionCounter;
        playGame()
    }, 500);
};

const handelAnswerSubmit = (e) => {
    e.preventDefault();
    const outcome = compareAnswer();
    return outcome ? correct() : incorrect();
};

$('#parameterForm').on('submit', handleFormSubmit);
$('#mathProblemDiv').on('submit', handelAnswerSubmit);