const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");


// Add leading zero to numbers 9 or below (purely for aesthetics):
function addLeadingZero(number) {
    var string = number.toString();
    var length = string.length;
    if ( length == 1) {
        string = "0" + string;
    }
    return string;
}

// Run a standard minute/second/hundredths timer:
var hundredths = 0;
var second = 0;
var minute = 0;

function start() {
    if(hundredths === 99) {
        second++;
        hundredths = 0;
        if(second === 59) {
            minute++;
            second = 0;
        }
    }
    hundredths++;
    theTimer.innerHTML = addLeadingZero(minute) + ":" + addLeadingZero(second) + ":" + addLeadingZero(hundredths);
}

//var startTime = setInterval(start, 10);
testArea.oninput = function() {
    var startTime = setInterval(start, 10);
    if (checkText(testArea.value)) {
        testWrapper.style.border = "10px solid green";
        clearInterval(startTime);
    } else {
        testWrapper.style.border = "10px solid red";
    }
};

// Match the text entered with the provided text on the page:
function checkText(text) {
    if(text == originText) {
        return true;
    }
    return false;
}

// Start the timer:

// Reset everything:
resetButton.onclick = function() {reset()};

function reset() {
    hundredths = 0;
    second = 0;
    minute = 0;
    theTimer.innerHTML = addLeadingZero(minute) + ":" + addLeadingZero(second) + ":" + addLeadingZero(hundredths);
    clearInterval(startTime);

    testArea.value = "";
    testWrapper.style.border = "10px solid grey";
}

// Event listeners for keyboard input and the reset button:
