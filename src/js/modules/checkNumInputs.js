function checkNumInputs(selector) {
  document.querySelectorAll(selector).forEach(phoneInput => {
    phoneInput.addEventListener('input', function() {
      phoneInput.value = phoneInput.value.replace(/\D/, '')
    })
  })

}

export default checkNumInputs
