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
            return (Number(a) + Number(b)).toFixed(3);
        case "-":
            return (a - b).toFixed(3);
        case "×":
            return (a * b).toFixed(3);
        case "÷":
            if (b === 0) return "ERROR";
            return (a / b).toFixed(3);
        default:
            return "ERROR";
    }
}

function calculator(element) {
    list[list.length - 1]
        ? (resultDisplay.innerHTML = list[list.length - 1])
        : (resultDisplay.innerHTML = "0");
    if (element) {
        if (list.length != 0) {
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
                console.log("add nr");
                if (element == ".") {
                    // add "."
                    if (!list[list.length - 1].includes(".")) {
                        list[list.length - 1] = list[list.length - 1] + element;
                    }
                } else {
                    // add digits
                    list[list.length - 1] = list[list.length - 1] + element;
                }
            } else if (element === "=" || list.length >= 3 || list[list.length - 1] === "=") {
                // Calculate the equation
                if (list.length >= 3 && element !== "=") {
                    /* list.push("=");
                    list.push(operate(list).toString()); */
                } else if (!list[list.length - 1].match(/[0-9.]/)) {
                    list = [list[list.length - 2]];
                } else {
                    list.push(element);
                    if (element !== "=") {
                        list.push("=");
                    }

                    list.push(operate(list).toString());
                }
            } else if (element.match(/[×÷\+-]/)) {
                // Add "+", "-", "×" or "/"
                console.log("add plus");
                if (!list[list.length - 1].match(/[0-9.]/)) {
                    list[list.length - 1] = element;
                } else {
                    list.push(element);
                }
            } else {
                list.push(element);
            }
        } else {
            // add the first value to the list
            if (element.match(/[0-9.]/)) {
                list.push(element === "." ? "0." : element);
            }
        }
        // display Calculations
        // TODO: crop the equation to fit the dimensions of the screen
        calculationsDisplay.innerHTML = list /* .slice(0, list.length - 1) */
            .join("");

        console.log(list[list.length - 1]);
        // display Result
        if (list.length == 0) {
            resultDisplay.innerHTML = "0";
        } else if (list[list.length - 1].match(/[0-9.]/)) {
            resultDisplay.innerHTML = list[list.length - 1];
        } else {
            resultDisplay.innerHTML = list[list.length - 2];
        }

        if (list.length === 5) {
            list = [list[4]];
        }
    }
}
//----------------------EVENT LISTENERS--------------------------
calculatorContainer.addEventListener("click", (event) => {
    calculator(event.target.value);

    console.log(list);
});
