"use strict";

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
    document.getElementById("calculator").value = "";
}

function deleteCharacter(e) {
    document.getElementById("calculator").value = document.getElementById("calculator").value.slice(0, -1);
}

function buttonHandler(e) {
    switch (e.target.value) {
        case '=':
            document.getElementById("calculator").value = +(eval(document.getElementById("calculator").value)).toFixed(4);
            if (!isFinite(document.getElementById("calculator").value)) {
                document.getElementById("calculator").value = "";
                break;
            }
            break;
        case '*':
        case '/':
            if (document.getElementById("calculator").value.length === 0) {
                break
            }
        case '-':
        case '+':
            if (includesAny(['+', '-', '*', '/'], document.getElementById("calculator").value.slice(1,-1))) {
                document.getElementById("calculator").value = +(eval(document.getElementById("calculator").value)).toFixed(4);
            }
            if (endsWithAny(['+', '-', '*', '/'], document.getElementById("calculator").value)) {
                document.getElementById("calculator").value = document.getElementById("calculator").value.slice(0, -1) + e.target.value;
            } else {
                document.getElementById("calculator").value += e.target.value;
            }
            break;
        case '.':
            if (!document.getElementById("calculator").value.endsWith('.')) {
                document.getElementById("calculator").value += e.target.value;
            }
            break;
        default:
            if (document.getElementById("calculator").value.endsWith('0') && (endsWithAny(['+', '-', '*', '/'],
                document.getElementById("calculator").value.slice(0, -1)) || document.getElementById("calculator").value.length === 1)) {
                document.getElementById("calculator").value = document.getElementById("calculator").value.slice(0, -1)
            }
            document.getElementById("calculator").value += e.target.value;
            break;
    }
}

function buttonHandlerWrapper(e) {
    try {
        buttonHandler(e);
    } catch (exception) {
        if (e.target.value === "=") {
            alert("Bad Expression: " + document.getElementById("calculator").value);
            document.getElementById("calculator").value = "";
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
