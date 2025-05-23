const txt = document.getElementById("txt") as HTMLElement;
const input = document.getElementById("input") as HTMLInputElement;
const tm = document.getElementById("tm") as HTMLElement;
const wpm = document.getElementById("wpm") as HTMLElement;
const startBtn = document.getElementById("start") as HTMLButtonElement;

let time: number = 0;
let timer: number | null = null;
let isRunning: boolean = false;

const sampleText: string = "The quick brown fox jumps over the lazy dog";

function startTest(): void {
    if (isRunning) {
        // Stop the test
        if (timer !== null) clearInterval(timer);
        isRunning = false;
        startBtn.innerText = "Start";
        startBtn.style.backgroundColor = ""; // Reset button color
        input.disabled = true;
        return;
    }

    // Start the test
    isRunning = true;
    time = 0;
    tm.textContent = "Time: 0s";
    wpm.textContent = "WPM: 0";
    startBtn.innerText = "Stop";
    startBtn.style.backgroundColor = "red"; // Set button to red
    input.value = "";
    input.disabled = false;
    input.focus();
    txt.textContent = sampleText;

    timer = window.setInterval(() => {
        time++;
        tm.textContent = `Time: ${time}s`;
        calculateWPM();
    }, 1000);
}

function calculateWPM(): void {
    const wordsTyped: number = input.value.trim().split(/\s+/).length;
    const wordsPerMinute: number = time > 0 ? Math.round((wordsTyped / time) * 60) : 0;
    wpm.textContent = `WPM: ${wordsPerMinute}`;
}

input.addEventListener("input", () => {
    calculateWPM();

    const typed = input.value.toLowerCase().replace(/\s+/g, " ").trim();
    const target = sampleText.toLowerCase().replace(/\s+/g, " ").trim();

    if (typed === target) {
        if (timer !== null) clearInterval(timer);
        isRunning = false;
        input.disabled = true;
        startBtn.innerText = "Start";
        startBtn.style.backgroundColor = ""; // Reset button color

        const finalWPM = Math.round((sampleText.split(" ").length / time) * 60);
        wpm.textContent = `WPM: ${finalWPM}`;

        alert(`Test Completed! Your WPM: ${finalWPM}`);
    }
});

startBtn.addEventListener("click", startTest);