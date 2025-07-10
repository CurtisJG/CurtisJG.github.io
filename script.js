const questions = [
  { question: "Decrypt this: 2 + 2", answer: "4", codeDigit: "7" },
  { question: "Spell 'hack'", answer: "hack", codeDigit: "3" },
  { question: "Capital of France?", answer: "paris", codeDigit: "1" },
  { question: "Binary of 2?", answer: "10", codeDigit: "9" },
];

// Change this to the correct code combination (use digits above)
const correctCode = "9317";

let current = 0;
let collectedDigits = [];

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
  codeDisplay.textContent = `Vault Digits: ${collectedDigits.join(" ")}`;
}

function askQuestion() {
  printToTerminal(questions[current].question);
}

input.addEventListener('keydown', function (e) {
  if (e.key === 'Enter') {
    const userInput = input.value.trim().toLowerCase();
    printToTerminal("> " + input.value);
    input.value = '';

    if (current < questions.length) {
      if (userInput === questions[current].answer) {
        const digit = questions[current].codeDigit;
        collectedDigits.push(digit);
        printToTerminal(`✔ Correct. Digit acquired: ${digit}`);
        current++;
        updateCodeDisplay();

        if (current < questions.length) {
          askQuestion();
        } else {
          promptForCode();
        }
      } else {
        printToTerminal("✖ Incorrect. Try again.");
      }
    } else {
      // At vault stage
      if (userInput === correctCode) {
        printToTerminal("🔓 Correct code. Vault unlocking...");
        triggerVaultOpening();
      } else {
        printToTerminal("✖ Wrong code. The vault remains sealed.");
      }
    }
  }
});

function promptForCode() {
  printToTerminal("🔢 All digits collected.");
  printToTerminal(`You have the digits: ${collectedDigits.join(" ")}`);
  printToTerminal("Enter the correct 4-digit code to open the vault:");
}

function triggerVaultOpening() {
  input.disabled = true;
  setTimeout(() => {
    document.getElementById("terminal").innerHTML = `
      <img src="vault.gif" alt="Vault opening animation" style="max-width: 100%; display: block; margin: 0 auto;" />
      <h2 style="color: #0f0; text-align: center;">
        KK is pleased.
      </h2>
    `;
  }, 1000);
}

updateCodeDisplay();
askQuestion();
