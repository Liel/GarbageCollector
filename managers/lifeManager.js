class LifeManager {
    LIFES_COUNT_MAX = 3;
    current_life_count = this.LIFES_COUNT_MAX;

    constructor() {

    }

    init() {
       this.current_life_count = this.LIFES_COUNT_MAX;
       this.printHearts();
    }

    printHearts() {
        for (let i = 1; i <this.LIFES_COUNT_MAX+1; i++) {
            document.querySelector(".hearts").innerHTML += `<img src="assets/corazon.png" id="heart-${i}" />`    
        }
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

}