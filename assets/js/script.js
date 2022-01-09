let firstNum = new Number;
let secondNum = new Number;


const generateDigit = () => {
    return Math.floor(Math.random() * 9);
};

const generateNumber = (num) => {
    let numArr = new Array;
    if (num == 1) {
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

const playGame = ({ first, second, operator, time }) => {
    firstNum = generateNumber(first);
    secondNum = generateNumber(second);
    $('#numeral1H1').text(firstNum);
    $('#numeral2H1').text(secondNum);
    if (operator === 'random') {
        const operators = ['+', '-', '&times', '&divide'];
        operator = operators[Math.floor(Math.random() * operators.length)]
    };
    $('#operatorH1').text(operator);
};

const handleFormSubmit = (e) => {
    e.preventDefault();
    const parameters = {
        first: $('#numeral1DigitsSelect').val(),
        second: $('#numeral2DigitsSelect').val(),
        operator: $('#operatorSelect').val(),
        time: $('#timeInput').val()
    };
    playGame(parameters);
};

const handelAnswerSubmit = (e) => {
    e.preventDefault();

}

$('#parameterForm').on('submit', handleFormSubmit);