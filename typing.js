var txt = document.getElementById("txt");
var input = document.getElementById("input");
var tm = document.getElementById("tm");
var wpm = document.getElementById("wpm");
var startBtn = document.getElementById("start");
var time = 0;
var timer = null;
var isRunning = false;
var sampleText = "The quick brown fox jumps over the lazy dog";
function startTest() {
    if (isRunning) {
        // Stop the test
        if (timer !== null)
            clearInterval(timer);
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
    timer = window.setInterval(function () {
        time++;
        tm.textContent = "Time: ".concat(time, "s");
        calculateWPM();
    }, 1000);
}
function calculateWPM() {
    var wordsTyped = input.value.trim().split(/\s+/).length;
    var wordsPerMinute = time > 0 ? Math.round((wordsTyped / time) * 60) : 0;
    wpm.textContent = "WPM: ".concat(wordsPerMinute);
}
input.addEventListener("input", function () {
    calculateWPM();
    var typed = input.value.toLowerCase().replace(/\s+/g, " ").trim();
    var target = sampleText.toLowerCase().replace(/\s+/g, " ").trim();
    if (typed === target) {
        if (timer !== null)
            clearInterval(timer);
        isRunning = false;
        input.disabled = true;
        startBtn.innerText = "Start";
        startBtn.style.backgroundColor = ""; // Reset button color
        var finalWPM = Math.round((sampleText.split(" ").length / time) * 60);
        wpm.textContent = "WPM: ".concat(finalWPM);
        alert("Test Completed! Your WPM: ".concat(finalWPM));
    }
});
startBtn.addEventListener("click", startTest);
