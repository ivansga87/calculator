

let a = "";
let b = "";
let currentOperator = "";
let resetDisplay = false;
let period = false;
const para = document.getElementById("display1")
para.textContent = "";



const buttons = document.getElementById("buttons-container")
buttons.addEventListener("click", function (e) {
    const buttonValue = e.target.textContent;
    if (e.target.id === "clear") {
        para.textContent = "";
        a = "";
        b = "";
        currentOperator = "";
        period = false;
    }

    else if (e.target.id === "backspace"){
        para.textContent = para.textContent.slice(0, -1)
        if (para.textContent.includes(".")){
            period = true; 
             
        }
        else period = false;
        
    }
    else if (e.target.classList.contains("number")) {
        if (resetDisplay) {
            para.textContent = buttonValue;
            resetDisplay = false;
        }
        else para.textContent += buttonValue;
    }
    else if (e.target.id === "multiplication") {
        if (a !== "" && currentOperator !== "") {
            runCalculation(currentOperator)
        }
        if (para.textContent.includes("Nope")) {
            return currentOperator = "";
        }
        setOperator("x")
    }
    else if (e.target.id === "division") {
        if (a !== "" && currentOperator !== "") {
            runCalculation(currentOperator)
        }
        if (para.textContent.includes("Nope")) {
            return currentOperator = "";
        }
        setOperator("/")
    }
    else if (e.target.id === "addition") {
        if (a !== "" && currentOperator !== "") {
            runCalculation(currentOperator);
        }
        if (para.textContent.includes("Nope")) {
            return currentOperator = "";
        }
        setOperator("+")
    }
    else if (e.target.id === "substraction") {
        if (a !== "" && currentOperator !== "") {
            runCalculation(currentOperator)
        }
        if (para.textContent.includes("Nope")) {
            return currentOperator = "";
        }
        setOperator("-")
    }
    else if (e.target.id === "equal") {
        b = para.textContent;
        const result = runCalc(currentOperator);
        if (result === "Nope") {
            para.textContent = "Nope"
        }
        else {
            para.textContent = Number(result.toFixed(4))
        }
        a = "";
        b = "";
        currentOperator = "";
        resetDisplay = true;
        period = false;
    }
    else if (e.target.id === "period") {
        if (resetDisplay) {
            para.textContent = "0.";
            resetDisplay = false;
            period = true;
        }
        else if (period) return;
        else {
            para.textContent += buttonValue
            period = true
        }


    }
}

)


function runCalculation(currentOperator) {
    b = para.textContent;
    const result = runCalc(currentOperator);
    if (result === "Nope") {
        para.textContent = "Nope"
        a = "";
        b = "";
        currentOperator = "";
        period = false;
        resetDisplay = true;
        return

    }
    else {
        para.textContent = Number(result.toFixed(4))
    }
    a = result;
    b = "";
    resetDisplay = true;
    period = false;


}

function runCalc(currentOperator) {
    if (currentOperator === "x") return multiplication(Number(a), Number(b));
    if (currentOperator === "/") return division(Number(a), Number(b));
    if (currentOperator === "+") return addition(Number(a), Number(b));
    if (currentOperator === "-") return substraction(Number(a), Number(b));
    return Number(para.textContent);
}

function addition(a, b) { return a + b; }

function substraction(a, b) { return a - b; }

function multiplication(a, b) { return a * b; }

function division(a, b) {
    if (b === 0) {
        return "Nope"

    }
    else return a / b;
}

function setOperator(opSymbol) {
    a = para.textContent;
    currentOperator = opSymbol;
    period = false;
    resetDisplay = true;

}