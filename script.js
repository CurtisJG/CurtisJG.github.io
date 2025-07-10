const questions = [
  { question: "Decrypt this: 2 + 2", answer: "4", codeDigit: "7" },
  { question: "Spell 'hack'", answer: "hack", codeDigit: "3" },
  { question: "Capital of France?", answer: "paris", codeDigit: "1" },
  { question: "Binary of 2?", answer: "10", codeDigit: "9" },
];

let current = 0;
let collectedCode = "";

const input = document.getElementById('input');
const output = document.getElementById('output');
const codeDisplay = document.getElementById('code');

function printToTerminal(text) {
  const line = document.createElement('div');
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function updateCodeDisplay() {
  codeDisplay.textContent = `Vault Code: ${collectedCode.padEnd(questions.length, "_")}`;
}

function askQuestion() {
  printToTerminal(questions[current].question);
}

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userInput = input.value.trim().toLowerCase();
    printToTerminal("> " + input.value);
    input.value = '';

    if (userInput === questions[current].answer) {
      const digit = questions[current].codeDigit;
      collectedCode += digit;
      printToTerminal(`✔ Correct. Code digit acquired: ${digit}`);
      updateCodeDisplay();
      current++;
      if (current < questions.length) {
        askQuestion();
      } else {
        printToTerminal("🔓 Vault code complete...");
        triggerVaultOpening();
      }
    } else {
      printToTerminal("✖ Incorrect. Try again.");
    }
  }
});

function triggerVaultOpening() {
  input.disabled = true;
  printToTerminal("🚨 Hacking the vault...");

  setTimeout(() => {
    document.getElementById("terminal").innerHTML = `
      <img src="vault.gif" alt="Vault opening animation" style="max-width: 100%; display: block; margin: 0 auto;" />
      <h2 style="color: #0f0; text-align: center;">
        ACCESS GRANTED: CODE ${collectedCode}
      </h2>
    `;
  }, 1500);
}

updateCodeDisplay();
askQuestion();
