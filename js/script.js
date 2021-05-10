/*--------------------- About section -----------------------*/
const tabsContainer = document.querySelector('.about-tabs'),
    aboutSection = document.querySelector('.about-section')

tabsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('tab-item') && !e.target.classList.contains('active')) {
        tabsContainer.querySelector('.active').classList.remove('active')
        e.target.classList.add('active')
        const target = e.target.getAttribute('data-target')
        aboutSection.querySelector('.tab-content.active').classList.remove('active')
        aboutSection.querySelector(target).classList.add('active')
    }
})

/*--------------------- Portfolio section -----------------------*/
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-project-btn')) {
        togglePortfolioPopup()
        document.querySelector('.portfolio-popup').scrollTo(0, 0)
        setPortfolioItemDetails(e.target.parentElement)
    }
})

document.querySelector('.pp-close').addEventListener('click', togglePortfolioPopup)

//hide popup when click outside
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pp-inner')) {
        togglePortfolioPopup()
    }
})

function togglePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.toggle('open')
    document.body.classList.toggle('hide-scrolling')
    document.querySelector('.main').classList.toggle('fade-out')
}

function setPortfolioItemDetails(portfolioItem) {
    document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('.portfolio-item img').src

    document.querySelector('.pp-header h3').innerHTML = portfolioItem.querySelector('.portfolio-item-title').innerHTML

    document.querySelector('.pp-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML
}