class gestureManager {
    gestures = ["Yes!", "Great", "Super", "Sweet", "Well Done", "WOW"];
    gesturesClasses = ["zoomIn", "zoomOutLeft", "zoomOutUp", "rotateOut", "zoomOut"];
    gestureElement = document.getElementById("gesture");
    COLLIDION_ANIMATION_CLASS_NAME = "numberAnimation";
    COINS_CLASS_NAME = "coins";

    showGestureAnimation() {
        this.gestureElement.innerHTML = this.gestures[randomIntFromInterval(0, this.gestures.length - 1)];
        const animationClass = this.gesturesClasses[randomIntFromInterval(0, this.gesturesClasses.length)]
        this.gestureElement.classList.add(animationClass)
        setTimeout(() => { 
            this.gestureElement.innerHTML = "";
            this.gestureElement.classList.remove(animationClass)
         }, 1200)
    }

    showCollidionGesture(collidedElement, top, left, customText = null, customClass = null) {
        const elementAnimation = document.createElement("div")
        elementAnimation.innerHTML = customText || collidedElement.textContent;
        elementAnimation.classList.add(this.COLLIDION_ANIMATION_CLASS_NAME)

        if(customClass)
            elementAnimation.classList.add(customClass)

        elementAnimation.style.cssText = `
            top: ${top}; 
            left: ${left};
        `;
        document.body.append(elementAnimation)
        setTimeout(()=>{
            elementAnimation.style.cssText = `
            top: 3%; 
            left: 37%;
            opacity: 0.6;
            `;
            elementAnimation.removeWithTimeout(1000)
        }, 200)
    }

    showObtacleCollidionGesture(collidedElement, top, left, customText = null, customClass = null) {
        const elementAnimation = document.createElement("div")
        elementAnimation.innerHTML = customText || collidedElement.textContent;
        elementAnimation.classList.add(this.COLLIDION_ANIMATION_CLASS_NAME, "red-text")
        
        if(customClass)
            elementAnimation.classList.add(customClass)

        elementAnimation.style.cssText = `
            top: ${top + 5}; 
            left: ${left};
        `;
        document.body.append(elementAnimation)
        setTimeout(()=>{
            elementAnimation.style.cssText = `
                top: 140%; 
                left: 50%;
                opacity: 0.6;
            `;
            elementAnimation.removeWithTimeout(1000)
        }, 200)
    }

    showCoinsGesture(top, left) {
        const elementAnimation = document.createElement("div")
        elementAnimation.classList.add(this.COINS_CLASS_NAME)
        elementAnimation.style.cssText = `
            top: ${top}; 
            left: ${left};
        `;
        document.body.append(elementAnimation)
        setTimeout(()=>{
            elementAnimation.style.cssText = `
            top: 1%; 
            left: 3%;
            opacity: 1;
            `;
            elementAnimation.removeWithTimeout(1000)
        }, 200)
    }

    showProgressGesture(newInitalNumber) {
        // this.gestureElement.innerHTML = newInitalNumber;
        // const animationClass = this.gesturesClasses[randomIntFromInterval(0, this.gesturesClasses.length)]
        // this.gestureElement.classList.add(animationClass)
        // setTimeout(() => { 
        //     this.gestureElement.innerHTML = "";
        //     this.gestureElement.classList.remove(animationClass)
        //  }, 1200)
    }
}