//const calculatorContainer = document.getElementById("calculator");
const calculationsDisplay = document.getElementById("calculations");
const resultDisplay = document.getElementById("result");
let list = [];
//----------------------FUNCTIONS--------------------------
// Function to perform arithmetic operations
function operate(equationList) {
    if (equationList.length < 3) return equationList[0];

    const [a, operator, b] = equationList;

    switch (operator) {
        case "+":
            return round(Number(a) + Number(b));
        case "-":
            return round(a - b);
        case "×":
            return round(a * b);
        case "÷":
            if (b == 0) return "ERROR";
            return round(a / b);
        default:
            return "ERROR";
    }
}

function round(number) {
    return Math.round(number * 1000) / 1000;
}
// Calculator: main function
function calculator(element) {
    resultDisplay.textContent = list[list.length - 1] || "0";

    if (element) {
        if (list.length !== 0) {
            if (element === "c") {
                // Clear display
                list = [];
            } else if (element === "del") {
                // Delete last character
                if (list[list.length - 1].length == 1 || list[list.length - 1] == "ERROR") {
                    list.pop();
                } else {
                    list[list.length - 1] = list[list.length - 1].slice(0, -1);
                }
            } else if (list[list.length - 1].match(/[0-9.]/) && element.match(/[0-9.]/)) {
                // Combine conditions for numbers and decimals
                if (element == ".") {
                    // Insert decimal point ('.')
                    if (!list[list.length - 1].includes(".")) {
                        list[list.length - 1] = list[list.length - 1] + element;
                    }
                } else {
                    // Insert digits
                    list[list.length - 1] = list[list.length - 1] + element;
                }
            } else if (element === "=" || list.length >= 3 || list[list.length - 1] === "=") {
                // Calculate the equation
                if (list.length >= 3 && element !== "=") {
                    // If equation is complete but something else is entered instead of '='
                } else if (!list[list.length - 1].match(/[0-9.]/)) {
                    // If equation is of the form: 'number = '
                    list = [list[list.length - 2]];
                } else {
                    // Solve the equation
                    list.push(element);
                    if (element !== "=") {
                        list.push("=");
                    }
                    list.push(operate(list).toString());
                }
            } else if (element.match(/[×÷\+-]/)) {
                // Insert "+", "-", "×" or "/"
                if (!list[list.length - 1].match(/[0-9.]/)) {
                    list[list.length - 1] = element;
                } else {
                    list.push(element);
                }
            } else {
                // Insert other characters
                list.push(element);
            }
        } else {
            // Insert the first digit to the list
            if (element.match(/[0-9.]/)) {
                list.push(element === "." ? "0." : element);
            }
        }

        // Display calculations
        displayCalculations(list);

        if (list.length === 5) {
            list = [list[4]];
        }
        if (list[list.length - 1] == "ERROR") {
            list = [];
        }
    }
}

// Function to display calculations and result
function displayCalculations(list) {
    console.log(list);
    calculationsDisplay.textContent = list.join("");

    // display Result
    if (list.length == 0) {
        resultDisplay.textContent = "0";
    } else if (list[list.length - 1].match(/[0-9.]/) || list[list.length - 1] == "ERROR") {
        resultDisplay.textContent = list[list.length - 1];
    } else {
        resultDisplay.textContent = list[list.length - 2];
    }
}

//----------------------EVENT LISTENERS--------------------------
document.documentElement.addEventListener("click", (event) => {
    calculator(event.target.value);
});

document.documentElement.addEventListener("keyup", (event) => {
    switch (event.key) {
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
        case "0":
        case ".":
        case "=":
        case "+":
        case "-":
            calculator(event.key);
            break;

        case "*":
            calculator("×");
            break;

        case "/":
            calculator("÷");
            break;

        case "Backspace":
            calculator("del");
            break;

        case "Delete":
            calculator("c");
            break;

        case "Enter":
            calculator("=");
            break;

        default:
            break;
    }
});
