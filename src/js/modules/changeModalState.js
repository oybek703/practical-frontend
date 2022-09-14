import checkNumInputs from './checkNumInputs'

function changeModalState(state) {
  const windowForms = document.querySelectorAll('.balcon_icons_img')
  const windowWidth = document.querySelectorAll('#width')
  const windowHeight = document.querySelectorAll('#height')
  const windowViewType = document.querySelectorAll('#view_type')
  const windowProfile = document.querySelectorAll('.checkbox')

  checkNumInputs('#width')
  checkNumInputs('#height')

  function bindActionToElements(elements, event, prop) {
    elements.forEach((element, elementIndex) => {
      element.addEventListener(event, function() {
        switch (element.nodeName) {
          case 'SPAN':
            state[prop] = elementIndex
            break
          case 'INPUT':
            const inputType = element.getAttribute('type')
            if (inputType === 'checkbox') {
              state[prop] = elementIndex === 0 ? 'Холодное' : 'Теплое'
              elements.forEach((checkBox, chbIndex) => checkBox.checked = elementIndex === chbIndex)
              break
            }
            state[prop] = element.value
            break
          case 'SELECT':
            state[prop] = element.value
            break
        }
        console.log(state)
      })
    })
  }

  bindActionToElements(windowForms, 'click', 'form')
  bindActionToElements(windowWidth, 'input', 'width')
  bindActionToElements(windowHeight, 'input', 'height')
  bindActionToElements(windowViewType, 'change', 'type')
  bindActionToElements(windowProfile, 'change', 'profile')
}

export default changeModalState
