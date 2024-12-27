/*CREATED BY : SHIVAM KUMAR ROLL NO: 230103044
  STARTED ON : 1st Sept
  COMPLETED ON: 7th Sept 10:36 a.m
  JAVASCRIPT FILE
*/
let operationHistory = []; // Making an array where i'll push the operations 
    let historyIndex = -1; 

    function appendValue(value) {
        const display = document.getElementById('operand');
        display.value += value;
    }

    function setOperation(operation) {
        const display = document.getElementById('operand');
        display.value += ` ${operation} `;
    }

    function binaryOR(a, b) { 
        let result = ""; // INTIALIZING RESULT
        const maxLength = Math.max(a.length, b.length);
        a = a.padStart(maxLength, '0');
        b = b.padStart(maxLength, '0');

        for (let i = 0; i < maxLength; i++) {
            result += (a[i] === '1' || b[i] === '1') ? '1' : '0';
        }
        return result;
    }

    function binaryAND(a, b) {
        let result = "";
        const maxLength = Math.max(a.length, b.length);
        a = a.padStart(maxLength, '0');
        b = b.padStart(maxLength, '0');

        for (let i = 0; i < maxLength; i++) {
            result += (a[i] === '1' && b[i] === '1') ? '1' : '0';
        }
        return result;
    }

    function binaryXOR(a, b) {
        let result = "";
        const maxLength = Math.max(a.length, b.length);
        a = a.padStart(maxLength, '0');
        b = b.padStart(maxLength, '0');

        for (let i = 0; i < maxLength; i++) {
            result += (a[i] !== b[i]) ? '1' : '0';
        }
        return result;
    }

    function binaryNOT(a) {
        let result = "";
        for (let i = 0; i < a.length; i++) {
            result += (a[i] === '0') ? '1' : '0';
        }
        return result;
    }
    function leftShift(a, b) {
    return a + '0'.repeat(parseInt(b, 2));
}
    function rightShift(a, b) {
    const shiftAmount = parseInt(b, 2);
    if (shiftAmount >= a.length) {
        return '0'.repeat(a.length);
    }
    return '0'.repeat(shiftAmount) + a.slice(0, a.length - shiftAmount);
}
    function unsignedRightShift(a, b) {
    const shiftAmount = parseInt(b, 2);
    if (shiftAmount >= a.length) {
        return '0'.repeat(a.length);
    }
    return '0'.repeat(shiftAmount) + a.slice(0, a.length - shiftAmount);
}

    function calculate() {
        const input = document.getElementById('operand').value.trim();
        const [operand1, operation, operand2] = input.split(' ');
        const displayOption = document.querySelector('input[name="displayOption"]:checked').value;

        let result;
        switch (operation) {
            case '&':
                result = binaryAND(operand1, operand2);
                break;
            case '|':
                result = binaryOR(operand1, operand2);
                break;
            case '^':
                result = binaryXOR(operand1, operand2);
                break;
            case '~':
                result = binaryNOT(operand1);
                break;
            case '<<':
                result = leftShift(operand1, operand2);
                break;
            case '>>':
                result = rightShift(operand1, operand2);
                break;
            case '>>>':
                result = unsignedRightShift(operand1, operand2);
                break;

            case '*':
                result = binMul(operand1, operand2);
                break;
            case '/':
                result = binDiv(operand1, operand2);
                break;
            case '_':
                result = onecomp(operand1);
                break;
            case '.':
                result = twocomp(operand1);
                break;
          default:
                alert("INVALID INPUT");
        }
// Sir .. here are the two display options {that binary is already checked}
        let finalResult = result;
        if (displayOption === 'both') {
            const decimalResult = parseInt(result, 2).toString(10);
            finalResult = `${result} (D: ${decimalResult})`;
        }
        if (displayOption === 'octal') {
            const octalResult = parseInt(result, 2).toString(8);
            finalResult = `Octal: ${octalResult}`;
}

        disAnimation(finalResult);

        // pushing operation in that array
        if (historyIndex === -1 || operationHistory[historyIndex] !== input) {
            operationHistory.push(input);
            historyIndex = operationHistory.length - 1;
        }
    }

    function reset() {
        document.getElementById('operand').value = '';
    }
// making a function for animations .. though i'm enabling this at default because i was not able to understand that button function ..
    function disAnimation(result) {
        const display = document.getElementById('operand');
        display.value += " = ";
        let i = 0;

        function showNextChar() {
            if (i < result.length) {
                display.value += result.charAt(i);
                i++;
                setTimeout(showNextChar, 600);
            }
        }

        showNextChar();
    }

    function prevOperation() {
        if (historyIndex > 0) {
            historyIndex--;
            document.getElementById('operand').value = operationHistory[historyIndex];
        }
    }

    function nextOperation() {
        if (historyIndex < operationHistory.length - 1) {
            historyIndex++;
            document.getElementById('operand').value = operationHistory[historyIndex];
        }
    }
    
    //NEW ADDED FUNCTIONS ON 4TH SEPT
    function onecomp(a) {
        return binaryNOT(a);
    }

    function twocomp(a) {
        let onesComp = onecomp(a);
        return (parseInt(onesComp, 2) + 1).toString(2).padStart(a.length, '0');
    }
    function deletel() {
        const display = document.getElementById('operand');
        display.value = display.value.slice(0, -1);
    }
    
function binMul(a, b) {
    let result = "0";
    let multiplier = parseInt(a, 2);
    let multiplicand = parseInt(b, 2);

    while (multiplicand > 0) {
        result = binAdd(result, a);
        multiplicand--; 
    }

    return result;
}

function binAdd(a, b) {
    let carry = 0;
    let result = "";

    // Pading the strings so they are the same length
    const maxLength = Math.max(a.length, b.length);
    a = a.padStart(maxLength, '0');
    b = b.padStart(maxLength, '0');

    for (let i = maxLength - 1; i >= 0; i--) {
        const sum = parseInt(a[i]) + parseInt(b[i]) + carry;
        result = (sum % 2) + result;
        carry = Math.floor(sum / 2);
    }

    if (carry) {
        result = "1" + result;
    }

    return result;
}
      function binDiv(a, b) {
    let quotient = "0";
    let dividend = parseInt(a, 2);
    const divisor = parseInt(b, 2);

    while (dividend >= divisor) {
        dividend = binSub(dividend.toString(2), b);
        quotient = binAdd(quotient, "1");
    }

    return quotient;
}

function binSub(a, b) {

    const result = parseInt(a, 2) - parseInt(b, 2);
    return result.toString(2);
}
function firstOperation() {
    if (operationHistory.length > 0) {
        historyIndex = 0;
        document.getElementById('operand').value = operationHistory[historyIndex];
    } else {
        alert("No operations in history.");
    }
}

function lastOperation() {
    if (operationHistory.length > 0) {
        historyIndex = operationHistory.length - 1;
        document.getElementById('operand').value = operationHistory[historyIndex];
    } else {
        alert("No operations in history.");
    }
}
// ALMOST MADE ALL THE FUNCTIONS BUT I WASN'T ABLE ... to find any replacement of toString() and parseInt()
