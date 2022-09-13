function tabs(headerSelector, tabSelector, contentSelector, activeClass) {
  const header = document.querySelector(headerSelector),
      tabs = document.querySelectorAll(tabSelector),
      contents = document.querySelectorAll(contentSelector)

  function hideTabContent() {
    contents.forEach(item => {
      item.style.display = 'none'
    })
    tabs.forEach(tab => {
      tab.classList.remove(activeClass)
    })
  }

  function showTabContent(i= 0) {
    contents[i].style.display = 'block'
    tabs[i].classList.add(activeClass)
  }
  hideTabContent()
  showTabContent()

  header.addEventListener('click', function(event) {
    const target = event.target
    if (target &&
        (target.classList.contains(tabSelector.replace(/\./, '')) ||
        target.parentNode.classList.contains(tabSelector.replace(/\./, '')))
    ) {
      tabs.forEach((tab, tabIndex) => {
        if (target === tab || target.parentNode === tab) {
          hideTabContent()
          showTabContent(tabIndex)
        }
      })
    }
  })
}

export default tabs
