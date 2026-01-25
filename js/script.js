/*--------------------- Prelaoder -----------------------*/
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        document.body.classList.add('dark')
    }
    document.querySelector('.main').classList.remove('hidden')
    document.querySelector('.home-section').classList.add('active')
    document.querySelector('.page-loader').classList.add('hidden')
    loadData()
})

/*--------------------- Navbar Toggler -----------------------*/

const navToggler = document.querySelector('.nav-toggler')
const themeToggler = document.querySelector('.theme-toggler')

navToggler.addEventListener('click', () => {
    hideSection()
    toggleNavbar()
    document.body.classList.toggle('hide-scrolling')
})

if (themeToggler) {
    themeToggler.addEventListener('click', () => {
        document.body.classList.toggle('dark')
        const isDark = document.body.classList.contains('dark')
        localStorage.setItem('theme', isDark ? 'dark' : 'light')
    })
}

function hideSection() {
    document.querySelector('section.active').classList.toggle('fade-out')
}

function toggleNavbar() {
    document.querySelector('.header').classList.toggle('active')
}

async function loadData(){
    try{
        const res = await fetch('data.json')
        const data = await res.json()
        applyProfile(data.profile)
        renderSkills(data.skills)
        renderTimeline('education-timelines', data.education)
        renderTimeline('experience-timelines', data.experience)
        renderTimeline('training-timelines', data.training)
        renderLanguages('languages-timelines', data.languages)
        renderPortfolio(data.projects)
        applyContact(data.profile.contacts)
    }catch(err){
        console.error('Failed to load data.json', err)
    }
}

function applyProfile(profile){
    const nameEl = document.getElementById('profile-name')
    const titleEl = document.getElementById('profile-title')
    const summaryEl = document.getElementById('hero-summary')
    const badgesEl = document.getElementById('hero-badges')
    const resumeBtn = document.getElementById('cta-resume')
    const githubBtn = document.getElementById('cta-github')
    if(nameEl) nameEl.textContent = profile.name
    if(titleEl) titleEl.textContent = profile.title
    if(summaryEl) summaryEl.innerHTML = profile.tagline || summaryEl.innerHTML
    if(badgesEl && Array.isArray(profile.badges)){
        badgesEl.innerHTML = profile.badges.map(b=>`<span class="badge">${b}</span>`).join('')
    }
    if(resumeBtn && profile.resumeUrl){
        resumeBtn.setAttribute('href', profile.resumeUrl)
    }
    if(githubBtn && profile.contacts && profile.contacts.socials && profile.contacts.socials.github){
        githubBtn.setAttribute('href', profile.contacts.socials.github)
    }
}

function renderSkills(skills){
    const skillsEl = document.getElementById('skills')
    if(!skillsEl) return
    const list = [].concat(skills.languages_frameworks||[], skills.architecture_patterns||[], skills.tools_technologies||[])
    skillsEl.innerHTML = list.map(s=>`<div class="skill-item">${s}</div>`).join('')
}

function renderTimeline(containerId, items){
    const el = document.getElementById(containerId)
    if(!el) return
    el.innerHTML = (items||[]).map(it=>`
        <div class="timeline-item">
          ${it.date ? `<span class="date">${it.date}</span>`:''}
          <h4>${it.title}${it.place ? ` <span>${it.place}</span>`:''}</h4>
          ${it.details ? `<p>${it.details.join('<br>')}</p>`:''}
        </div>`).join('')
}

function renderLanguages(containerId, langs){
    const el = document.getElementById(containerId)
    if(!el) return
    el.innerHTML = (langs||[]).map(l=>`
        <div class="timeline-item">
          <h4>${l.name}</h4>
          <span>${l.level}</span>
        </div>`).join('')
}

function renderPortfolio(projects){
    const listEl = document.getElementById('portfolio-list')
    if(!listEl) return
    listEl.innerHTML = (projects||[]).map(p=>`
      <div class="portfolio-item">
        <img src="${p.image}" alt="portfolio item thumbnail">
        <h3 class="portfolio-item-title">${p.title}</h3>
        <button type="button" class="btn view-project-btn">View project</button>
        <div class="portfolio-item-details">
          <div class="description">
            <p>${p.description}</p>
          </div>
          <div class="general-info">
            <ul>
              <li>Created - <span>${p.period||p.created||''}</span></li>
              <li>Technoligies used - <span>${p.technologies.join(', ')}</span></li>
              <li>Role - <span>${p.role}</span></li>
              <li>View online - <span>${p.link ? `<a href="${p.link}" target="_blank">${p.linkLabel||'Link'}</a>` : '—'}</span></li>
            </ul>
          </div>
        </div>
      </div>`).join('')
}

function applyContact(contacts){
    const emailEl = document.getElementById('contact-email')
    const phoneEl = document.getElementById('contact-phone')
    const socialsEl = document.getElementById('social-links')
    if(emailEl) emailEl.textContent = contacts.email
    if(phoneEl) phoneEl.textContent = contacts.phone
    if(socialsEl){
        const icons = {
            facebook:'fab fa-facebook', github:'fab fa-github', googlePlay:'fab fa-google-play', website:'fas fa-globe', youtube:'fab fa-youtube', linkedin:'fab fa-linkedin-in', twitter:'fab fa-twitter'
        }
        socialsEl.innerHTML = Object.entries(contacts.socials||{}).map(([k,v])=>`<a href="${v}" target="_blank"><i class="${icons[k]||'fas fa-link'}"></i></a>`).join('')
    }
}

/*--------------------- Active section -----------------------*/
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('link-item') && e.target.hash !== '') {

        //navToggler.classList.add('hide')

        if (e.target.classList.contains('nav-item')) {
            toggleNavbar()
        } else {
            hideSection()
            document.body.classList.add('hide-scrolling')
        }

        document.querySelector('section.active').classList.remove('active', 'fade-out')
        document.querySelector(e.target.hash).classList.add('active')
        window.scrollTo(0, 0)
        document.body.classList.remove('hide-scrolling')
        //navToggler.classList.remove('hide')
    }
})

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
    document.querySelector('.pp-thumbnail img').src = portfolioItem.querySelector('img').src

    document.querySelector('.pp-header h3').innerHTML = portfolioItem.querySelector('.portfolio-item-title').innerHTML

    document.querySelector('.pp-body').innerHTML = portfolioItem.querySelector('.portfolio-item-details').innerHTML
}