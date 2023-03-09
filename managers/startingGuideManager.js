class StartingGuideManager {
    wizardSteps = [
        {
            htmlText: "<span>You should hold your phone like that</span><br /><img id='phoneHolder' src='assets/two-hands-holding-black-smartphone-260nw-704394934.png' />"
        },
        {
            htmlText: "You have 30 seconds to reach the number<p>30</p>"
        },
        {
            htmlText: "You can see your progress on top of the screen<br />"
        },
    ]

    currentStep = 0;

    start() {
        this.printStep()
        // document.getElementById("nextStep").addEventListener("click", function(e) {
        //     currentStep++;
        //     this.printStep();
        // })

        // document.getElementById("ready").addEventListener("click", function(e) {
        //     console.log("start game!")
        //     document.getElementById("guide").remove();
        // })
    }

    printStep() {
        const step = this.prepareStep()
        document.getElementById("guide").innerHTML = step;
    }

    next() {
        this.currentStep++;
        this.printStep();
    }

    ready() {
        startGameAfterGuide()
        document.getElementById("guide").remove();
    }

    prepareStep() {
        var step = this.wizardSteps[this.currentStep].htmlText;
        if(this.currentStep == this.wizardSteps.length -1) { // isLast
            step += "<br /><button id='ready' onclick='startingGuideInstance.ready()'>READY!</button>"
        }
        else {
            step += "<br /><button id='nextStep' onclick='startingGuideInstance.next()'>NEXT</button>"
        }

        return `${step}`
    }
    
}