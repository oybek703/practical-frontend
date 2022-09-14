function timer(id, deadline) {

  function getTimeRemaining(endtime) {
    const totalLeftTime = Date.parse(endtime) - Date.parse(new Date())
    const seconds = Math.floor((totalLeftTime / 1000) % 60)
    const minutes = Math.floor((totalLeftTime / 1000/ 60) % 60)
    const hours = Math.floor((totalLeftTime / (1000 * 60  * 60)) % 24)
    const days = Math.floor((totalLeftTime / (1000 * 60  * 60 * 24)))
    return {totalLeftTime, days, hours, minutes, seconds}
  }

  function addZero(number) {
    return number < 10 ? `0${number}` : number
  }

  function setClock(selector, endtime) {
    const timer = document.querySelector(selector)
    const daysElement = timer.querySelector('#days')
    const hoursElement = timer.querySelector('#hours')
    const minutesElement = timer.querySelector('#minutes')
    const secondsElement = timer.querySelector('#seconds')
    const timeInterval = setInterval(updateClock, 1000)

    updateClock()

    function updateClock() {
      const {totalLeftTime, days, hours, minutes, seconds } = getTimeRemaining(endtime)
      daysElement.textContent = addZero(days)
      hoursElement.textContent = addZero(hours)
      minutesElement.textContent = addZero(minutes)
      secondsElement.textContent = addZero(seconds)
      if (totalLeftTime <= 0) {
        daysElement.textContent = '00'
        hoursElement.textContent = '00'
        minutesElement.textContent = '00'
        secondsElement.textContent = '00'
        clearInterval(timeInterval)
      }
    }
    updateClock()
  }
  setClock(id, deadline)
}

export default timer
