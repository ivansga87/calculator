function addition(a, b) {
    return a + b;
}

function substraction(a, b) {
    return a - b;
}

function multiplication(a, b) {
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return "cant divede by 0";
    }
    return a / b;
}

let a = "";
let b = "";
let currentOperator = "";
let resetDisplay = false


const para = document.getElementById("display")
para.textContent = "";

const buttons = document.getElementById("buttons-container")
buttons.addEventListener("click", function (e) {

    if (e.target.id === "clear") {
        para.textContent = "";
        a = "";
        b = "";
        currentOperator = "";
    }
    else if (e.target.classList.contains("number")) {
        if (resetDisplay) {
            para.textContent = "";
            resetDisplay = false
        }
        const buttonValue = e.target.textContent;
        para.textContent += buttonValue;
    }
    else if (e.target.id === "multiplication") {
                
        if (a !== "") {
            b = para.textContent;
            const result = runCalc(currentOperator);
            para.textContent = Number(result.toFixed(4));
            a = result;
            b = "";
            currentOperator = "x"
            resetDisplay = true;

        }
        else {
            a = para.textContent
            para.textContent = "";
            currentOperator = "x";
        }

    }
    else if (e.target.id === "division") {
        if (a !== "") {
            b = para.textContent;
            const result = runCalc(currentOperator);
            para.textContent = Number(result.toFixed(4));
            a = result;
            b = "";
            currentOperator = "/"
            resetDisplay = true;
        }

        else {
            a = para.textContent
            para.textContent = "";
            currentOperator = "/";
        }

    }
    else if (e.target.id === "addition") {
        if (a !== "") {
            b = para.textContent;
            const result = runCalc(currentOperator);
            para.textContent = Number(result.toFixed(4));
            a = result;
            b = "";
            currentOperator = "+"
            resetDisplay = true;
        }

        else {
            a = para.textContent
            para.textContent = "";
            currentOperator = "+";
        }
    }
    else if (e.target.id === "substraction") {
        if (a !== "") {
            b = para.textContent;
            const result = runCalc(currentOperator);
            para.textContent = Number(result.toFixed(4));
            a = result;
            b = "";
            currentOperator = "-"
            resetDisplay = true;
        }

        else {
            a = para.textContent
            para.textContent = "";
            currentOperator = "-";
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
        

    }

}

)

function runCalc(currentOperator) {
    let result = 0;

    if (currentOperator === "x") {
        result = multiplication(Number(a), Number(b));

    }
    else if (currentOperator === "/") {
        result = division(Number(a), Number(b));
    }
    else if (currentOperator === "+") {
        result = addition(Number(a), Number(b));
    }
    else if (currentOperator === "-") {
        result = substraction(Number(a), Number(b));
    }
    return result

}

