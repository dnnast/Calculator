// Import necessary functions for testing
const { operate, add, subtract, multiply, divide } = require("./calculatorFunctions");

// Positive test cases for operate function
test("Addition operation", () => {
    expect(operate(2, "+", 3)).toBe(5);
});

test("Subtraction operation", () => {
    expect(operate(5, "-", 2)).toBe(3);
});

test("Multiplication operation", () => {
    expect(operate(4, "×", 2)).toBe(8);
});

test("Division operation", () => {
    expect(operate(10, "÷", 2)).toBe(5);
});

// Negative test case for divide function
test("Division by zero", () => {
    expect(divide(5, 0)).toBe("ERROR");
});

// Positive test cases for calculator function
test("Adding a number to the list", () => {
    list = [];
    calculator("5");
    expect(list).toEqual(["5"]);
});

test("Performing addition operation", () => {
    list = ["5", "+"];
    calculator("3");
    expect(list).toEqual(["5", "+", "3"]);
});

// Negative test case for calculator function
test("Dividing by zero", () => {
    list = ["6", "÷"];
    calculator("0");
    expect(list).toEqual(["6", "÷"]);
});
