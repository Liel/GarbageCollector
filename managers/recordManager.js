class UserRecordsManager {

    LOCAL_STORAGE_HIGHSCORE_KEY = "highScore"
    NEW_RECORD_ELEMENT_ID = "new-highscore"
    
    constructor() {
        document.getElementById("user-record").innerHTML = this.getCurrentRecord()
    }

    getCurrentRecord() {
        const record = localStorage.getItem(this.LOCAL_STORAGE_HIGHSCORE_KEY);
        return record || 0;
    }

    setScore(score) {
        localStorage.setItem("lastScore", score);

        if(this.isHighscore(score)) {
            localStorage.setItem(this.LOCAL_STORAGE_HIGHSCORE_KEY, score);
            return { isHighscore: true }
        } 

       return {} 
    }

    isHighscore(score) {
        return score > this.getCurrentRecord();
    }

    showNewRecordLabel() {
        const highscore = this.getCurrentRecord();
        document.getElementById(this.NEW_RECORD_ELEMENT_ID).innerHTML = `New Record! ${highscore}`
    }
}