class LifeManager {
    LIFES_COUNT_MAX = 3;
    current_life_count = this.LIFES_COUNT_MAX;

    constructor() {

    }

    static instance = null;
    static getInstance() {
        if(LifeManager.instance == null) 
            LifeManager.instance = new LifeManager()

        return LifeManager.instance
    }

    init() {
       this.current_life_count = this.LIFES_COUNT_MAX;
       this.printHearts();
    }

    printHearts(count = this.LIFES_COUNT_MAX) {
        for (let i = 1; i < count + 1; i++) {
            document.querySelector(".hearts").innerHTML += `<img src="assets/corazon.png" class='heart' id="heart-${i}" />`    
        }
    }

    removeAllHeartsFromDOM() {
        document.querySelectorAll(".heart").forEach(el => el.remove())
    }

    decreaseLifeCount() {
        document.getElementById("heart-" + this.current_life_count).remove();
        this.current_life_count--;

        if(this.current_life_count === 0) {
            return {
                gameOver: true,
                current_life_count: this.current_life_count
            }
        }

        return {
            current_life_count: this.current_life_count
        }
    }
    
    increaseLifeCount() {
        if(this.current_life_count === this.LIFES_COUNT_MAX)
            return;
        
        this.current_life_count++;
        this.removeAllHeartsFromDOM();
        this.printHearts(this.current_life_count)
    }

    isLifeCountFull() {
        return this.LIFES_COUNT_MAX === this.current_life_count;
    }
}