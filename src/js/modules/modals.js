function modals() {
  function bindModal(triggerSelector, modalSelector, closeSelector) {
    const triggers = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    triggers.forEach(node => {
      node.addEventListener('click', function(event) {
        if (event.target) event.preventDefault()
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        // document.body.classList.add('modal-open')
      })
    })
    close.addEventListener('click', function() {
      modal.style.display = 'none'
      document.body.style.overflow = ''
      // document.body.classList.remove('modal-open')
    })

    modal.addEventListener('click', function(event) {
      if (event.target === modal) {
        modal.style.display = 'none'
        document.body.style.overflow = ''
        // document.body.classList.remove('modal-open')
      }
    })
  }

  function showModalByTime(selector, time) {
    setTimeout(function() {
        document.querySelector(selector).style.display = 'block'
    }, time)
  }

  bindModal(
      '.popup_engineer_btn',
      '.popup_engineer',
      '.popup_engineer .popup_close'
  )
  bindModal(
      '.phone_link',
      '.popup',
      '.popup .popup_close'
  )

  showModalByTime('.popup', 5000)
}

export default modals
