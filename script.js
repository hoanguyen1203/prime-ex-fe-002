var SpeedTest = function() {
    this.testWrapper = document.querySelector(".test-wrapper")
    this.testArea = document.querySelector("#test-area")
    this.originText = document.querySelector("#origin-text p").innerHTML
    this.resetButton = document.querySelector("#reset")
    this.theTimer = document.querySelector(".timer")

    this.minute = 0
    this.second = 0
    this.hundredths = 0

    this.startTime = null

    this.init()
}

SpeedTest.prototype = {
    init() {
        // Click button Start over
        this.resetButton.addEventListener("click", function() {
            this.reset()
        }.bind(this))

        // Typing text
        this.testArea.addEventListener("input", function() {
            if(!this.startTime) {
                this.startTime = setInterval(function() {
                    this.start()
                }.bind(this), 10)
            }
            if (this.checkText(this.testArea.value)) {
                this.testWrapper.style.border = "10px solid green"
                clearInterval(this.startTime)
            } else {
                this.testWrapper.style.border = "10px solid red"
            }
        }.bind(this))
    },
    addLeadingZero(number) {
        var string = number.toString()
        var length = string.length
        if ( length == 1) {
            string = "0" + string
        }
        return string
    },
    start() {
        if(this.hundredths === 99) {
            this.second++
            this.hundredths = 0
        }
        if(this.second === 59) {
            this.minute++
            this.second = 0
        }
        this.hundredths++
        
        this.theTimer.innerHTML = this.addLeadingZero(this.minute) + ":" + this.addLeadingZero(this.second) + ":" + SpeedTest.prototype.addLeadingZero(this.hundredths)
    },
    reset() {
        this.minute = 0
        this.second = 0
        this.hundredths = 0

        this.theTimer.innerHTML = this.addLeadingZero(this.minute) + ":" + this.addLeadingZero(this.second) + ":" + this.addLeadingZero(this.hundredths)
    
        clearInterval(this.startTime)
        this.startTime = null
    
        this.testArea.value = ""
        this.testWrapper.style.border = "10px solid grey"
    },
    checkText(text) {
        if(text == this.originText) {
            return true
        }
        return false
    }
}

new SpeedTest().init()

// Or:

// const testWrapper = document.querySelector(".test-wrapper")
// const testArea = document.querySelector("#test-area")
// const originText = document.querySelector("#origin-text p").innerHTML
// const resetButton = document.querySelector("#reset")
// const theTimer = document.querySelector(".timer")


// // Add leading zero to numbers 9 or below (purely for aesthetics):
// function addLeadingZero(number) {
//     var string = number.toString()
//     var length = string.length
//     if ( length == 1) {
//         string = "0" + string
//     }
//     return string
// }

// // Create Timer Object
// function Timer(minute, second, hundredths) {
//     this.minute = minute
//     this.second = second
//     this.hundredths = hundredths

//     this.showTime = function() {
//         theTimer.innerHTML = addLeadingZero(this.minute) + ":" + addLeadingZero(this.second) + ":" + addLeadingZero(this.hundredths)
//     }
// }

// // Create Border Object
// function Border(width, style, color) {
//     this.width = width
//     this.style = style
//     this.color = color

//     this.showBorder = function() {
//         testWrapper.style.border = this.width + " " + this.style + " " + this.color
//     }
// }

// // Create zeroTime Object
// var zeroTime = {
//     minute: 0,
//     second: 0,
//     hundredths: 0
// }

// function start() {
//     if(zeroTime.hundredths === 99) {
//         zeroTime.second++
//         zeroTime.hundredths = 0
//     }
//     if(zeroTime.second === 59) {
//         zeroTime.minute++
//         zeroTime.second = 0
//     }
//     zeroTime.hundredths++
    
//     var timer = new Timer(zeroTime.minute, zeroTime.second, zeroTime.hundredths)
//     timer.showTime()
// }

// // Run a standard minute/second/hundredths timer:
// var startTime = null
// var greenBorder = new Border('10px', 'solid', 'green')
// var redBorder = new Border('10px', 'solid', 'red')
// var greyBorder = new Border('10px', 'solid', 'grey')

// testArea.oninput = function() {
//     if(!startTime){
//         startTime= setInterval(start, 10)
//     }
//     if (checkText(testArea.value)) {
//         greenBorder.showBorder()
//         clearInterval(startTime)
//     } else {
//         redBorder.showBorder()
//     }
// }

// // Match the text entered with the provided text on the page:
// function checkText(text) {
//     if(text == originText) {
//         return true
//     }
//     return false
// }

// Reset everything:
//resetButton.onclick = function() {reset()}

// function reset() {
//     zeroTime.hundredths = 0
//     zeroTime.second = 0
//     zeroTime.minute = 0
//     var resetTimer = new Timer(zeroTime.minute, zeroTime.second, zeroTime.hundredths)
//     resetTimer.showTime()

//     clearInterval(startTime)
//     startTime = null

//     testArea.value = ""
//     greyBorder.showBorder()
// }