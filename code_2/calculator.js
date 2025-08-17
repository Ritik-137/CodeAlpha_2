const display = document.getElementById("display");
let currentInput = "";

// Handle button clicks
document.querySelectorAll(".btn").forEach(btn => {
  btn.addEventListener("click", () => handleInput(btn.dataset.action));
});

// Handle keyboard input
document.addEventListener("keydown", (e) => {
  const validKeys = "0123456789+-*/.=BackspaceEntercC";
  if (!validKeys.includes(e.key)) return;

  if (e.key === "Enter") return handleInput("=");
  if (e.key === "Backspace") return handleInput("back");
  if (e.key.toLowerCase() === "c") return handleInput("clear");

  handleInput(e.key);
});

// Input handler function
function handleInput(value) {
  if (value === "clear") {
    currentInput = "";
  } else if (value === "back") {
    currentInput = currentInput.slice(0, -1);
  } else if (value === "=") {
    try {
      currentInput = eval(currentInput.replace(/×/g, '*').replace(/÷/g, '/')).toString();
    } catch {
      currentInput = "Error";
    }
  } else {
    if (currentInput === "Error") currentInput = "";
    currentInput += value;
  }
  updateDisplay();
}

// Update display content
function updateDisplay() {
  display.textContent = currentInput || "0";
}
