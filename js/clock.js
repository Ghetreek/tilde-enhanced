class Clock {
    constructor(toggleHelp) {
      this._el = $.el('#clock');
      this._setTime = this._setTime.bind(this);
      this._el.addEventListener('click', toggleHelp);
      this._start();
    }
  
    _setTime() {
      const date = new Date();
      let hours = $.pad(date.getHours());
      let amPm = '';
  
      if (!config.get('twentyFourHourClock')) {
        hours = date.getHours();
        if (hours > 12) hours -= 12;
        else if (hours === 0) hours = 12;
  
        amPm =
          `&nbsp;<span class="am-pm">` +
          `${date.getHours() >= 12 ? 'PM' : 'AM'}</span>`;
      }
  
      const minutes = $.pad(date.getMinutes());
      this._el.innerHTML = `${hours}${config.get('clockDelimiter')}${minutes}${amPm}`;
      this._el.setAttribute('datetime', date.toTimeString());
    }
  
    _start() {
      this._setTime();
      setInterval(this._setTime, 1000);
    }
  }