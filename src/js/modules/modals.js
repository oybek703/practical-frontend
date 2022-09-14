function modals() {
  function bindModal(triggerSelector, modalSelector, closeSelector, closeFromOverlay = true) {
    const triggers = document.querySelectorAll(triggerSelector)
    const modal = document.querySelector(modalSelector)
    const close = document.querySelector(closeSelector)
    const allModals = document.querySelectorAll('[data-modal]')
    triggers.forEach(node => {
      node.addEventListener('click', function(event) {
        if (event.target) event.preventDefault()
        allModals.forEach(modalItem => {
          modalItem.style.display = 'none'
        })
        modal.style.display = 'block'
        document.body.style.overflow = 'hidden'
        // document.body.classList.add('modal-open')
      })
    })
    close.addEventListener('click', function() {
      allModals.forEach(modalItem => {
        modalItem.style.display = 'none'
      })
      modal.style.display = 'none'
      document.body.style.overflow = ''
      // document.body.classList.remove('modal-open')
    })

    modal.addEventListener('click', function(event) {
      if (event.target === modal && closeFromOverlay) {
        allModals.forEach(modalItem => {
          modalItem.style.display = 'none'
        })
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
  bindModal(
      '.popup_calc_btn',
      '.popup_calc',
      '.popup_calc_close'
  )
  bindModal(
      '.popup_calc_button',
      '.popup_calc_profile',
      '.popup_calc_profile_close',
      false
  )
  bindModal(
      '.popup_calc_profile_button',
      '.popup_calc_end',
      '.popup_calc_end_close',
      false
  )

  showModalByTime('.popup', 5000)
}

export default modals
