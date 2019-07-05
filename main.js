"use strict";

const resultDisplay = document.getElementById("calculator");

function endsWithAny(suffixes, string) {
    return suffixes.some(function (suffix) {
        return string.endsWith(suffix);
    });
}

function includesAny(suffixes, string) {
    return suffixes.some(function (suffix) {
        return string.includes(suffix);
    });
}

function clearInput(e) {
    resultDisplay.value = "";
}

function deleteCharacter(e) {
    resultDisplay.value = resultDisplay.value.slice(0, -1);
}

function buttonHandler(e) {
    switch (e.target.value) {
        case '=':
            resultDisplay.value = +(eval(resultDisplay.value)).toFixed(4);
            if (!isFinite(resultDisplay.value)) {
                resultDisplay.value = "";
                break;
            }
            break;
        case '*':
        case '/':
            if (resultDisplay.value.length === 0) {
                break
            }
        case '-':
        case '+':
            if (includesAny(['+', '-', '*', '/'], resultDisplay.value.slice(1,-1))) {
                resultDisplay.value = +(eval(resultDisplay.value)).toFixed(4);
            }
            if (endsWithAny(['+', '-', '*', '/'], resultDisplay.value)) {
                resultDisplay.value = resultDisplay.value.slice(0, -1) + e.target.value;
            } else {
                resultDisplay.value += e.target.value;
            }
            break;
        case '.':
            if (!resultDisplay.value.endsWith('.')) {
                resultDisplay.value += e.target.value;
            }
            break;
        default:
            if (resultDisplay.value.endsWith('0') && (endsWithAny(['+', '-', '*', '/'],
                resultDisplay.value.slice(0, -1)) || resultDisplay.value.length === 1)) {
                resultDisplay.value = resultDisplay.value.slice(0, -1)
            }
            resultDisplay.value += e.target.value;
            break;
    }
}

function buttonHandlerWrapper(e) {
    try {
        buttonHandler(e);
    } catch (exception) {
        if (e.target.value === "=") {
            alert("Bad Expression: " + resultDisplay.value);
            resultDisplay.value = "";
        }
        console.log(exception);
    }
}

document.addEventListener("DOMContentLoaded", function(e) {
    const clearButton = document.getElementById("cancel");
    const deleteButton = document.getElementById("delete");
    const buttons = document.querySelectorAll(".calculator-buttons input");
    clearButton.addEventListener("click", clearInput);
    deleteButton.addEventListener("click", deleteCharacter);
    buttons.forEach(key => key.addEventListener("click", buttonHandlerWrapper));
});
