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
        if (elements.length > 1) {
          state[prop] = elementIndex
        } else {
          state[prop] = element.value
        }
        console.log(state)
      })
    })
  }

  bindActionToElements(windowForms, 'click', 'form')
  bindActionToElements(windowWidth, 'input', 'width')
  bindActionToElements(windowHeight, 'input', 'height')
}

export default changeModalState
