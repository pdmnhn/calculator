const calc = document.querySelector(".calc");
const display = document.querySelector(".display");
const problem = [];
const operationsString = "'+-×÷'";
const numbers = "0123456789";
const backspace = "←";

function numberCallBack(buttonString) {
  let size = problem.length;
  let lastItem = problem[size - 1];
  if (size === 0 || operationsString.includes(lastItem)) {
    problem.push(buttonString);
  } else if (lastItem === "0" && buttonString === "0") {
    return 0;
  } else if (!isNaN(lastItem)) {
    if (lastItem == "0") {
      problem.push(buttonString);
    } else problem[size - 1] = lastItem + buttonString;
  }
}

function operationCallBack(opString) {
  let size = problem.length;
  let lastItem = problem[size - 1];
  if (size === 0) {
    return;
  } else if (operationsString.includes(lastItem)) {
    problem[size - 1] = opString;
  } else {
    problem.push(opString);
  }
}

function backspaceCallBack() {
  let size = problem.length;
  let lastItem = problem[size - 1];
  if (size === 0) {
    return;
  } else if (lastItem.length == 1) {
    problem.pop();
  } else {
    problem[size - 1] = lastItem.substring(0, lastItem.length - 1);
  }
}

function multiplyAndDivde() {
  let i = 0;
  while (i < problem.length) {
    op = problem[i];
    if ("×÷".includes(op)) {
      op = problem[i];
      prevElement = problem[i - 1];
      nextElement = problem[i + 1];
      if (nextElement == undefined) {
        problem.splice(i, 1);
        i++;
        continue;
      }
      problem.splice(i, 2);
      if (op === "×") {
        problem[i - 1] = Number(prevElement) * Number(nextElement);
      } else if (op === "÷") {
        problem[i - 1] = Number(prevElement) / Number(nextElement);
      }
    }
    i++;
  }
}

function addAndSubtract() {
  let i = 0;
  while (i < problem.length) {
    op = problem[i];
    if ("+-".includes(op)) {
      op = problem[i];
      prevElement = problem[i - 1];
      nextElement = problem[i + 1];
      if (nextElement == undefined) {
        problem.splice(i, 1);
        i++;
        continue;
      }
      problem.splice(i, 2);
      if (op === "+") {
        problem[i - 1] = Number(prevElement) + Number(nextElement);
      } else if (op === "-") {
        problem[i - 1] = Number(prevElement) - Number(nextElement);
      }
    }
    i++;
  }
}

function computeSolution() {
  if (problem.length <= 2) {
    for (let i = 0; i < problem.length; i++) {
      if (operationsString.includes(problem[i])) {
        problem.splice(i, 1);
      }
    }
  } else {
    multiplyAndDivde();
    addAndSubtract();
    computeSolution();
  }
}

function updateDisplay() {
  finalString = "";
  problem.forEach(function (value) {
    finalString += value;
  });
  display.innerText = finalString;
}

calc.addEventListener("click", function (element) {
  buttonString = element.target.innerText;

  if (numbers.includes(buttonString)) {
    numberCallBack(buttonString);
  } else if (operationsString.includes(buttonString)) {
    operationCallBack(buttonString);
  } else if (buttonString === backspace) {
    backspaceCallBack();
  } else if (buttonString === "C") {
    problem.length = 0;
    display.innerText = "0";
    return;
  } else if (buttonString === "=") {
    computeSolution();
  }
  updateDisplay();
});
