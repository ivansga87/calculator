

let a = "";
let b = "";
let currentOperator = "";
let resetDisplay = false;
let period = false;
let result = "";
const para = document.getElementById("display1")
para.textContent = "";



const buttons = document.getElementById("buttons-container")
buttons.addEventListener("click", function (e) {
    const buttonValue = e.target.textContent;
    if (e.target.id === "clear") {
        clear();
        para.textContent = "";
    }

    else if (e.target.id === "backspace") {
        if (currentOperator) {
            resetDisplay = false
            currentOperator = ""
            return
        }

        else para.textContent = para.textContent.slice(0, -1)

        if (para.textContent.includes(".")) {
            period = true;

        }

        else period = false;

    }
    else if (e.target.classList.contains("number")) {
        if (resetDisplay) {
            para.textContent = "";
            resetDisplay = false;
        }
        if (a !== "" && currentOperator !== "") {
            para.textContent += buttonValue;
            b = para.textContent
        }
        else {
            para.textContent += buttonValue;
            a = para.textContent
        }
    }
    else if (e.target.id === "multiplication") {
        checkCondition("x")
    }
    else if (e.target.id === "division") {
        checkCondition("/")
    }
    else if (e.target.id === "addition") {
        checkCondition("+")
    }
    else if (e.target.id === "substraction") {
        checkCondition("-")
    }
    else if (e.target.id === "equal") {
        if (para.textContent === "."){
            return 
        }

        if (para.textContent === "can't dive by 0") {
            clear();
            return

        }
        result = runCalc();

        if (result === "Can't dive by 0") {
            para.textContent = "can't dive by 0"
            clear();
        }
        else {
            para.textContent = Number(result.toFixed(4))
            clear();
                       
        }
    }
    else if (e.target.id === "period") {
        if (period) return;

        if (resetDisplay) {
            para.textContent = ".";
            resetDisplay = false;
            period = true;
        }
        else {
            para.textContent += buttonValue
            period = true
        }


    }
}

)


function runCalculation(nextOp) {
    result = runCalc();
    if (result === "Can't dive by 0") {
        para.textContent = "Can't dive by 0"
        clear()
        return

    }
    else {
        para.textContent = Number(result.toFixed(4))
        
    }
    clear()
    a = result;
    currentOperator = nextOp;


}

function runCalc() {
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
        return "Can't dive by 0"

    }
    else return a / b;
}

function setOperator(opSymbol) {
    currentOperator = opSymbol;
    period = false;
    resetDisplay = true;

}

function checkCondition(nextOp) {
    if (!para.textContent) {
        return
    }
   
    else if (para.textContent === "."){
        return 
    }
    
    else if (a !== "" && currentOperator !== "" && b === "") {
        return
    }
    else if (para.textContent === "Can't dive by 0") {
        para.textContent = "can't dive by 0"
       clear()
    }

    else if (a !== "" && currentOperator !== "" && b !== "") {
        runCalculation(nextOp);
    }

    else if (result) {
        a = result;
        setOperator(nextOp);
    }
    else {
        setOperator(nextOp)
    }
}

function clear() {
    a = "";
    b = "";
    currentOperator = "";
    resetDisplay = true;
    period = false;
    
}