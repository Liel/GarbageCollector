class ProgressBarManager {
    bar;
    targetNumber;
    currentValue = 0;

    constructor() {
        this.updateProgress = this.updateProgress.bind(this)
    }

    initLineProgressBar() {
      this.bar = new ProgressBar.Line(progress, {
        strokeWidth: 4,
        easing: 'easeInOut',
        duration: 1400,
        color: '#FFEA82',
        trailColor: '#303030',
        trailWidth: 3,
            svgStyle: {width: '100%', height: '100%',transform: 'rotate(270deg)' },
        text: {
          style: {
            // Text color.
            // Default: same as stroke color (options.color)
            color: '#999',
            position: 'absolute',
            right: '0',
            top: '23%',
            padding: 0,
            margin: 0,
          },
          autoStyleContainer: false
        },
        from: {color: '#FFEA82'},
        to: {color: '#ED6A5A'},
        step: (state, bar) => {
          bar.path.setAttribute('stroke', state.color);
          bar.setText(this.generateMessage());
          bar.text.style.color = state.color;
        }
      });

      this.bar.animate(0);
    }

    init(targetNumber) {
        this.targetNumber = targetNumber;
        //this.initLineProgressBar(targetNumber);
        //return;

        this.bar = new ProgressBar.Circle(progress, {
            strokeWidth: 6,
            color: '#FFEA82',
            trailColor: 'silver',
            trailWidth: 3,
            easing: 'easeInOut',
            duration: 1400,
            svgStyle: {},
            text: {
              value: '',
              alignToBottom: false
            },
            from: {color: '#FFEA82'},
            to: {color: '#ED6A5A'},
            // Set default step function for all animate calls
            step: (state, bar) => {
              bar.path.setAttribute('stroke', state.color);
//              bar.setText(Math.round(bar.value() * 100) + '%');
          bar.setText(this.generateMessage());

              bar.text.style.color = state.color;
            }
          });
          this.bar.text.style.fontFamily = '"Raleway", Helvetica, sans-serif';
          //this.bar.text.style = 'position: absolute;   margin: 56% 21%;';

          this.bar.animate(0);
    }

    generateMessage() {
      if(!this.bar)
        return ""
      
      return `<div>
                <div id="current-value">${this.currentValue}</div>
                <div id="perc">${Math.round(this.bar.value() * 100) + '%'}</div>
                <div id="target-value">${this.targetNumber}</div>
                <div id="more">${this.targetNumber - this.currentValue} left!</div>
              </div>`
      return (this.targetNumber - this.currentValue) + 
                `<br /><div id='counter-label'>to make it ${this.targetNumber}!</div><div id='barPercentage'>${Math.round(this.bar.value() * 100) + ' %'}</div>`;
    }

    updateProgress(value) {
        if(!this.bar)
            return;
        
        this.currentValue = value;
        this.bar.animate(value / this.targetNumber);
    }

    updateTargetNumber(targetNumber) {
      this.targetNumber = targetNumber
      this.updateProgress(this.targetNumber);
    }

    reset(targetNumber) {
        this.bar.animate(0);
        this.currentValue = 0;
        this.targetNumber = targetNumber;   
    }
}