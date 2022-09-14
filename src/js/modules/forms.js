import checkNumInputs from './checkNumInputs'

function forms(state) {
  const forms = document.querySelectorAll('form')
  const inputs = document.querySelectorAll('input')

  checkNumInputs('input[name="user_phone"]')

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
      if (form.getAttribute('data-calc') === 'end') {
        for (const stateKey in state) {
          formData.append(stateKey, state[stateKey])
        }
      }
      try {
        const res = await sendFormData('assets/server.php', formData)
        statusContent.textContent = statusMessages.success
        console.log(res)
        setTimeout(() => document.querySelector('.popup_calc_end_close').click(), 1500)
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
