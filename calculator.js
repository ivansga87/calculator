

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
    else if (e.target.classList.contains("number")) {
        if (resetDisplay) {
            para.textContent = buttonValue;
            resetDisplay = false;
        }

        else para.textContent += buttonValue;
    }
    else if (e.target.id === "multiplication") {
        if (a !== "") {
            runCalculation(currentOperator)

        }
        else {
           setOperator("x")
        }

    }
    else if (e.target.id === "division") {
        if (a !== "") runCalculation(currentOperator)
        
        else setOperator("/")
    }
    else if (e.target.id === "addition") {
        if (a !== "") {
            runCalculation(currentOperator);

        }

        else {
           setOperator("+")
        }
    }
    else if (e.target.id === "substraction") {
        if (a !== "") {
            runCalculation(currentOperator)
        }

        else {
            setOperator("-")
        }

    }
    else if (e.target.id === "equal") {
        b = para.textContent;
        const result = runCalc(currentOperator);
        para.textContent = Number(result.toFixed(4));
        a = "";
        b = "";
        currentOperator = "";
        resetDisplay = true;
        period = false;
    }
    else if (e.target.id === "period") {
        if (resetDisplay) {
            para.textContent = buttonValue;
            resetDisplay = false;
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
    currentOperator = currentOperator;
    b = para.textContent;
    const result = runCalc(currentOperator);
    para.textContent = Number(result.toFixed(4));
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
    return 0;
}

function addition(a, b){return a + b;}

function substraction(a, b) {return a - b;}

function multiplication(a, b) {return a * b;}

function division(a, b) {
    if (b === 0) return "cant divede by 0";
    return a / b;
}

function setOperator(opSymbol) {
    a = para.textContent
    currentOperator = opSymbol;
    period = false;
    resetDisplay = true;
}