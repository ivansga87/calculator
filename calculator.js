
const memory = []
let showMemory = document.getElementById("memory-display")
showMemory.textContent = "";

let a = "";
let b = "";
let currentOperator = "";
let resetDisplay = false;
let resetMemDisplay = false;
let period = false;
let result = "";
const para = document.getElementById("display1")
const lastMemory = document.getElementById("display2")
para.textContent = "";
lastMemory.textContent = "";



const buttons = document.getElementById("buttons-container")
buttons.addEventListener("click", function (e) {
    const buttonValue = e.target.textContent;
    if (e.target.id === "clear") {
        clear();
        lastMemory.textContent = "";
        para.textContent = "";
        result = "";
    }

    else if (e.target.id === "backspace") {
        if (currentOperator) {
            resetDisplay = false
            currentOperator = ""
            return
        }

        else para.textContent = para.textContent.slice(0, -1)
        a = para.textContent

        if (para.textContent.includes(".")) {
            period = true;

        }

        else period = false;

    }
    else if (e.target.classList.contains("number")) {
        if (resetMemDisplay) {
            lastMemory.textContent = "";
            resetMemDisplay = false;
        }
        const operators = ["x", "+", "-", "/"];
        const lastChar = lastMemory.textContent.slice(-1); // Gets the last character

        if (lastMemory.textContent.length > 15 || lastMemory.textContent.includes("=")) {
            lastMemory.textContent = `${result} ${currentOperator}`;

        }

        if (operators.includes(lastChar)) {
            lastMemory.textContent += ` ${buttonValue}`; // Add space if last was an op
        } else {
            lastMemory.textContent += buttonValue;       // No space if last was a number
        }
        if (resetDisplay) {
            para.textContent = "";
            result = ""
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
        resetMemDisplay = true;
        if (para.textContent === ".") {
            return
        }

        if (para.textContent === "can't dive by 0") {
            clear();
            return

        }
        result = runCalc();

        if (result === "Can't dive by 0") {
            para.textContent = "can't dive by 0"
            lastMemory.textContent = ""
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

function addition(a, b) {
     if(memory.length > 9){
        memory.shift()
    }
    memory.push(`${a} + ${b} = ${a + b}`)
    console.log(memory)
    updateMemoryDisplay();
    return a + b;
}

function substraction(a, b) {
    if(memory.length > 9){
        memory.shift()
    }
    memory.push(`${a} - ${b} = ${a - b}`)
    console.log(memory)
    updateMemoryDisplay();
    
    return a - b;
}

function multiplication(a, b) {
     if(memory.length > 9){
        memory.shift()
    }
    memory.push(`${a} x ${b} = ${a * b}`)
    console.log(memory)
    updateMemoryDisplay();
    return a * b;
}

function division(a, b) {
    if (b === 0) {
        return "Can't dive by 0"

    }
    else {
         if(memory.length > 9){
        memory.shift()
    }
        memory.push(`${a} / ${b} = ${a / b}`)
        console.log(memory)
        updateMemoryDisplay();
        return a / b;
    }
}

function setOperator(opSymbol) {
    currentOperator = opSymbol;
    lastMemory.textContent += ` ${opSymbol}`;
    period = false;
    resetDisplay = true;

}

function checkCondition(nextOp) {
    if (!para.textContent) {
        return
    }

    else if (para.textContent === ".") {
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
        lastMemory.textContent += ` ${nextOp}`
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
    lastMemory.textContent += ` = ${result}`;

}
window.addEventListener("keydown", function (e) {
    if (e.key >= "0" && e.key <= "9") {
        const numBtn = Array.from(document.querySelectorAll(".number"))
            .find(btn => btn.textContent === e.key);
        if (numBtn) numBtn.click();
    }


    else if (e.key === "+") {
        const btn = document.getElementById("addition");
        btn.classList.add("active");
        btn.click();
        setTimeout(() => {
            btn.classList.remove('active')
        }, 100)
    }
    else if (e.key === "*") document.getElementById("multiplication").click();
    else if (e.key === "/") document.getElementById("division").click();
    else if (e.key === "-") document.getElementById("substraction").click();
    else if (e.key === "Enter" || e.key === "=") document.getElementById("equal").click();
    else if (e.key === "Backspace") document.getElementById("backspace").click();
    else if (e.key === "Delete" || e.key === "Escape") document.getElementById("clear").click();
    else if (e.key === ".") document.getElementById("period").click();
});

function updateMemoryDisplay() {
    // 1. Clear the current list so you don't get duplicates
    showMemory.innerHTML = ""; 

    // 2. Loop through your memory array
    memory.forEach(entry => {
        const li = document.createElement("li"); // Create the element
        li.textContent = entry;                  // Set the text
        showMemory.appendChild(li);              // Add it to your <ul> or <ol>
    });
}