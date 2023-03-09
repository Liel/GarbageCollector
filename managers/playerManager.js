class Player {
    player; // DOM element
    playerHeightPercentage;
    playerWidthPercentage;
    playerBounding;
    bottom = 22;
    direction;
    isSuspended = false;
    directionClasses = {
        left: "player-to-left",
        right: "player-to-right"
    }

    init(gameScreenHeight, gameScreenWidth) {
        this.player = document.getElementById("player");
        this.player.style.bottom = this.bottom + "%"
        this.playerBounding = this.player.getBoundingClientRect();
        this.player.setAttribute("top", this.playerBounding.top);
        this.playerHeightPercentage = this.playerBounding.height/gameScreenHeight*100
        this.playerWidthPercentage = this.playerBounding.width/gameScreenWidth*100
    }

    suspend() {
        this.isSuspended = true;
    }

    releaseSuspention() {
        this.isSuspended = false;
    }

    setDirection(direction) {
        if(this.isSuspended)
            return;

        if(this.direction == direction) {
            this.increaseSpeed()
            return;
        }

        this.direction = direction
        this.player.className = ""
        this.player.classList.add(this.directionClasses[direction])
    }

    increaseSpeed() {
        document.getElementById("player").classList.add("faster")
    }
}