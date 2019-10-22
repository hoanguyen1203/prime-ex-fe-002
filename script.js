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
            this.testWrapper.style.border = "10px solid red"
            
            if (this.checkText(this.testArea.value)) {
                this.testWrapper.style.border = "10px solid green"
                clearInterval(this.startTime)
            }
        }.bind(this))
    },
    addLeadingZero(number) {
        var string = number.toString()
        var length = string.length
        if ( length === 1) {
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
        if(text === this.originText) {
            return true
        }
        return false
    }
}

new SpeedTest().init()