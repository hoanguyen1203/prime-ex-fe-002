const testWrapper = document.querySelector(".test-wrapper")
const testArea = document.querySelector("#test-area")
const originText = document.querySelector("#origin-text p").innerHTML
const resetButton = document.querySelector("#reset")
const theTimer = document.querySelector(".timer")


// Add leading zero to numbers 9 or below (purely for aesthetics):
function addLeadingZero(number) {
    var string = number.toString()
    var length = string.length
    if ( length == 1) {
        string = "0" + string
    }
    return string
}

// Create Timer Object
function Timer(minute, second, hundredths) {
    this.minute = minute
    this.second = second
    this.hundredths = hundredths

    this.showTime = function() {
        theTimer.innerHTML = addLeadingZero(this.minute) + ":" + addLeadingZero(this.second) + ":" + addLeadingZero(this.hundredths)
    }
}

// Create Border Object
function Border(width, style, color) {
    this.width = width
    this.style = style
    this.color = color

    this.showBorder = function() {
        testWrapper.style.border = this.width + " " + this.style + " " + this.color
    }
}

// Create zeroTime Object
var zeroTime = {
    minute: 0,
    second: 0,
    hundredths: 0
}

function start() {
    if(zeroTime.hundredths === 99) {
        zeroTime.second++
        zeroTime.hundredths = 0
    }
    if(zeroTime.second === 59) {
        zeroTime.minute++
        zeroTime.second = 0
    }
    zeroTime.hundredths++
    
    var timer = new Timer(zeroTime.minute, zeroTime.second, zeroTime.hundredths)
    timer.showTime()
}

// Run a standard minute/second/hundredths timer:
var startTime = null
var greenBorder = new Border('10px', 'solid', 'green')
var redBorder = new Border('10px', 'solid', 'red')
var greyBorder = new Border('10px', 'solid', 'grey')

testArea.oninput = function() {
    if(!startTime){
        startTime= setInterval(start, 10)
    }
    if (checkText(testArea.value)) {
        greenBorder.showBorder()
        clearInterval(startTime)
    } else {
        redBorder.showBorder()
    }
}

// Match the text entered with the provided text on the page:
function checkText(text) {
    if(text == originText) {
        return true
    }
    return false
}

// Reset everything:
resetButton.onclick = function() {reset()}

function reset() {
    zeroTime.hundredths = 0
    zeroTime.second = 0
    zeroTime.minute = 0
    var resetTimer = new Timer(zeroTime.minute, zeroTime.second, zeroTime.hundredths)
    resetTimer.showTime()

    clearInterval(startTime)
    startTime = null

    testArea.value = ""
    greyBorder.showBorder()
}