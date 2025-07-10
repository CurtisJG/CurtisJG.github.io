// --- script.js ---

const introduction = [
  "Operation Kirby Enterprises",
  "Team, listen up. This is your moment. Kirby Enterprises, the shadowy and evil corporate giant, guards a vault holding one million pounds.",
  "Your mission is to break through their defences and crack the four-digit code that will unlock that vault.",
  "Your squad is Ash, Andrew, Connor, Curtis, Emily and Kerem - the best hackers this side of the darknet.",
  "Every puzzle you solve brings you one step closer to the jackpot. But beware - Kirby Enterprises’ defences are tough.",
  "The company’s ruthless Chief Financial Officer, Sterling Cashmore, is a master manipulator ready to block your every move.",
  "And the company’s sinister CEO Elizabeth watches from the shadows, ready to strike.",
  "Every clue you crack pulls you deeper into their web. The stakes are high, and the risks even higher.",
  "This is your one shot - make it count.",
  "\nPress ENTER to continue..."
];

const digits = ["8", "3", "2", "6"];
const questions = [
  {
    question: `\n## Puzzle 1:
The initial access riddle
I am a gate that blocks the way,
Keeping intruders out night and day.
In networks, I’m a name you’ll know.
Count my letters to get the first digit of the vault’s code.
Type your answer to the riddle (e.g., a network device name)",
    digitIndex: 0
  },
  {
    question: `\n## Puzzle 2: Welcome to the real AIT
You’ve accessed a top-secret Teams chat.
Do the following:
1. Add words in Andrew’s last msg on July 4
2. Add Kerem’s second last msg on June 27
3. Subtract from Connor’s last msg on June 24
What’s the result? (Enter the digit only)",
    digitIndex: 1
  },
  {
    question: `\n## Puzzle 3: The Hacker’s Message
> You have 4 bytes of data.
> How many bits is that?
> Divide by bits in a nibble.
> Add 12.
> Subtract 10.
What’s the result? (First digit of the result). Subtract 10.\n\nWhat’s the result? (First digit of the result)`,
    answer: "2",
    digitIndex: 2
  },
  {
    question: `\n## Puzzle 4: The CFO’s Phone Number\n\nYou’ve obtained CFO Sterling Cashmore’s number. His PA notes:\n- Mention his 'finance roundup' emails.\n- Call before noon.\n- Loves limited-edition fountain pens.\n\nWhat is the final digit of the code?`,
    answer: "6",
    digitIndex: 3
  }
];

let current = 0;
let inputLocked = false;
let introComplete = false;
const collectedDigits = [null, null, null, null];
const input = document.getElementById("input");
const output = document.getElementById("output");
const codeDisplay = document.getElementById("code");

function printToTerminal(text) {
  const line = document.createElement("div");
  line.textContent = text;
  output.appendChild(line);
  output.scrollTop = output.scrollHeight;
}

function updateCodeDisplay() {
  const known = collectedDigits.map(d => d === null ? "_" : d).join(" ");
  printToTerminal(`Collected: ${known}`);
}

function askQuestion() {
  if (current < questions.length) {
    printToTerminal(questions[current].question);
  } else {
    printToTerminal("🔐 All digits collected.");
    printToTerminal("You have the digits. Enter the correct 4-digit code to open the vault:");
  }
}

input.addEventListener("keydown", function (e) {
  if (e.key === "Enter" && !inputLocked) {
    const userInput = input.value.trim().toLowerCase();
    printToTerminal("> " + input.value);
    input.value = "";

    if (!introComplete) {
      introComplete = true;
      updateCodeDisplay();
      askQuestion();
      return;
    }

    if (current < questions.length) {
      const q = questions[current];
      if (userInput === q.answer) {
        collectedDigits[q.digitIndex] = digits[q.digitIndex];
        printToTerminal(`✔ Correct. Digit ${q.digitIndex + 1} acquired.`);
        current++;
        updateCodeDisplay();
        askQuestion();
      } else {
        printToTerminal("✖ Incorrect. Try again.");
      }
    } else {
      if (userInput === digits.join("")) {
        printToTerminal("🔓 Vault code accepted...");
        triggerVaultOpening();
      } else {
        printToTerminal("❌ Incorrect code. Try again.");
      }
    }
  }
});

function triggerVaultOpening() {
  inputLocked = true;
  input.disabled = true;
  setTimeout(() => {
    document.getElementById("terminal").innerHTML = `
      <img src="vault.gif" alt="Vault opening animation" style="max-width: 100%; display: block; margin: 0 auto;" />
      <h2 style="color: #0f0; text-align: center;">KK is pleased.</h2>
    `;
  }, 1500);
}

introduction.forEach(line => printToTerminal(line));
