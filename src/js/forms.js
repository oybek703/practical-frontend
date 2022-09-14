function forms() {
  const forms = document.querySelectorAll('form'),
      inputs = document.querySelectorAll('input'),
      phoneInputs = document.querySelectorAll('input[name="user_phone"]')

  phoneInputs.forEach(phoneInput => {
    phoneInput.addEventListener('input', function() {
      phoneInput.value = phoneInput.value.replace(/\D/, '')
    })
  })

  const statusMessages = {
    loading: 'Загрузка...',
    success: 'Спасибо! Мы с вами скоро свяжемся.',
    failure: 'Что-то пошло не так!'
  }

  async function sendFormData(url, data) {
    document.querySelector('.status').innerHTML = statusMessages.loading
    return await (await fetch(url, {
      method: 'POST',
      body: data
    })).text()
  }

  function clearInputs() {
    inputs.forEach(input => input.value = '')
  }

  forms.forEach(function(form) {
    form.addEventListener('submit', async function(event) {
      event.preventDefault()
      const statusContent = document.createElement('div')
      statusContent.classList.add('status')
      form.appendChild(statusContent)
      const formData = new FormData(form)
      try {
        const res = await sendFormData('assets/server.php', formData)
        console.log(res)
        statusContent.textContent = statusMessages.success
      } catch (e) {
        statusContent.textContent = statusMessages.failure
      } finally {
        clearInputs()
        setTimeout(function() {
          statusContent.remove()
        }, 5000)
      }
    })
  })
}

export default forms
