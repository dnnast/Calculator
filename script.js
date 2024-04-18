const calculatorContainer = document.getElementById("calculator");
const calculationsDisplay = document.getElementById("calculations");
const resultDisplay = document.getElementById("result");
let list = [];

//---------------------OPERATOR FUNCTIONS------------------------
function operate(list) {
    if (list.length < 3) return list[0];

    const [a, operator, b] = list;

    switch (operator) {
        case "+":
            return round(Number(a) + Number(b));
        case "-":
            return round(a - b);
        case "×":
            return round(a * b);
        case "÷":
            if (b === 0) return "ERROR";
            return round(a / b);
        default:
            return "ERROR";
    }
}

function round(int) {
    return Math.round(int * 1000) / 1000;
}

function calculator(element) {
    resultDisplay.innerHTML = list[list.length - 1] || "0";

    if (element) {
        if (list.length !== 0) {
            if (element === "c") {
                // Clear display
                list = [];
            } else if (element === "del") {
                // Delete last char
                if (list[list.length - 1].length == 1) {
                    list.pop();
                } else {
                    list[list.length - 1] = list[list.length - 1].slice(0, -1);
                }
            } else if (list[list.length - 1].match(/[0-9.]/) && element.match(/[0-9.]/)) {
                // Combine conditions for numbers and decimals
                if (element == ".") {
                    // Insert float ('.')
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
                // Insert other char
                list.push(element);
            }
        } else {
            // Insert the first digit to the list
            if (element.match(/[0-9.]/)) {
                list.push(element === "." ? "0." : element);
            }
        }

        // display Calculations
        displayCalculations(list);

        if (list.length === 5) {
            list = [list[4]];
        }
    }
}

function displayCalculations(list) {
    // display Calculations
    calculationsDisplay.innerHTML = list.join("");

    // display Result
    if (list.length == 0) {
        resultDisplay.innerHTML = "0";
    } else if (list[list.length - 1].match(/[0-9.]/)) {
        resultDisplay.innerHTML = list[list.length - 1];
    } else {
        resultDisplay.innerHTML = list[list.length - 2];
    }
}

//----------------------EVENT LISTENERS--------------------------
calculatorContainer.addEventListener("click", (event) => {
    calculator(event.target.value);
});
