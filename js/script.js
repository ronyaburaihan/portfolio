/*--------------------- Preloader -----------------------*/
window.addEventListener('load', () => {
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme === 'dark') {
        document.body.classList.add('dark')
        updateThemeIcon(true)
    }
    document.querySelector('.main').classList.remove('hidden')
    document.querySelector('.home-section').classList.add('active')
    document.querySelector('.page-loader').classList.add('hidden')
    loadData()
})

/*--------------------- Theme Toggle -----------------------*/
function updateThemeIcon(isDark) {
    const icon = document.querySelector('.theme-toggler i')
    if (!icon) return
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon'
}

document.querySelector('.theme-toggler').addEventListener('click', () => {
    document.body.classList.toggle('dark')
    const isDark = document.body.classList.contains('dark')
    localStorage.setItem('theme', isDark ? 'dark' : 'light')
    updateThemeIcon(isDark)
})

/*--------------------- Nav Toggler -----------------------*/
const navToggler   = document.querySelector('.nav-toggler')
const navCloseBtn  = document.querySelector('.nav-close-btn')
const navOverlay   = document.querySelector('.nav-overlay')
const header       = document.querySelector('.header')

function openNav() {
    header.classList.add('active')
    document.body.classList.add('hide-scrolling')
}

function closeNav() {
    header.classList.remove('active')
    document.body.classList.remove('hide-scrolling')
}

navToggler.addEventListener('click', openNav)
navCloseBtn.addEventListener('click', closeNav)
navOverlay.addEventListener('click', closeNav)

/*--------------------- Section Switching -----------------------*/
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('link-item') && e.target.hash !== '') {
        e.preventDefault()

        if (e.target.classList.contains('nav-item')) {
            closeNav()
        } else {
            // animate outgoing section
            const current = document.querySelector('section.active')
            if (current) {
                current.classList.add('fade-out')
                setTimeout(() => current.classList.remove('fade-out'), 500)
            }
        }

        // switch sections
        const current = document.querySelector('section.active')
        if (current) current.classList.remove('active', 'fade-out')
        const target = document.querySelector(e.target.hash)
        if (target) target.classList.add('active')
        window.scrollTo(0, 0)
    }
})

/*--------------------- Data Loading -----------------------*/
function loadData() {
    const data = window.portfolioData
    if (!data) {
        console.error('portfolioData not found. Make sure data.js is loaded.')
        return
    }
    applyProfile(data.profile)
    renderSkillsCategorized(data.skills)
    renderTimeline('education-timelines', data.education)
    renderTimeline('experience-timelines', data.experience)
    renderTimeline('training-timelines', data.training)
    renderLanguages('languages-timelines', data.languages)
    renderPortfolio(data.projects)
    applyContact(data.profile.contacts)
}

/*--------------------- Profile -----------------------*/
function applyProfile(profile) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val }
    const setHtml = (id, val) => { const el = document.getElementById(id); if (el) el.innerHTML = val }

    set('profile-name', profile.name)
    set('profile-title', profile.title)
    setHtml('hero-summary', profile.tagline || '')

    const badgesEl = document.getElementById('hero-badges')
    if (badgesEl && Array.isArray(profile.badges)) {
        badgesEl.innerHTML = profile.badges.map(b => `<span class="badge">${b}</span>`).join('')
    }

    const resumeBtn = document.getElementById('cta-resume')
    if (resumeBtn && profile.resumeUrl) resumeBtn.href = profile.resumeUrl

    const githubBtn = document.getElementById('cta-github')
    if (githubBtn && profile.contacts?.socials?.github) githubBtn.href = profile.contacts.socials.github
}

/*--------------------- Skills -----------------------*/
function renderSkillsCategorized(skills) {
    renderSkillGroup('skills-languages',     skills.languages_frameworks   || [])
    renderSkillGroup('skills-architecture',  skills.architecture_patterns  || [])
    renderSkillGroup('skills-tools',         skills.tools_technologies     || [])
}

function renderSkillGroup(id, items) {
    const el = document.getElementById(id)
    if (!el) return
    el.innerHTML = items.map(s => `<span class="skill-item">${s}</span>`).join('')
}

/*--------------------- Timeline -----------------------*/
function renderTimeline(containerId, items) {
    const el = document.getElementById(containerId)
    if (!el) return
    el.innerHTML = (items || []).map(it => `
        <div class="timeline-item">
          ${it.date ? `<span class="date">${it.date}</span>` : ''}
          <h4>${it.title}${it.place ? ` <span>${it.place}</span>` : ''}</h4>
          ${Array.isArray(it.details) && it.details.length
            ? `<ul class="timeline-details">${it.details.map(d => `<li>${d}</li>`).join('')}</ul>`
            : ''}
        </div>`).join('')
}

function renderLanguages(containerId, langs) {
    const el = document.getElementById(containerId)
    if (!el) return
    el.innerHTML = (langs || []).map(l => `
        <div class="timeline-item">
          <h4>${l.name}</h4>
          <span class="lang-level">${l.level}</span>
        </div>`).join('')
}

/*--------------------- Portfolio -----------------------*/
const categoryLabels = {
    professional: 'Professional',
    'play-store':  'Play Store',
    personal:      'Personal'
}

function renderPortfolio(projects) {
    const listEl = document.getElementById('portfolio-list')
    if (!listEl) return

    listEl.innerHTML = (projects || []).map(p => {
        const techs = p.technologies || []
        const top   = techs.slice(0, 3)
        const extra = techs.length - 3
        const chips = top.map(t => `<span class="tech-chip">${t}</span>`).join('')
            + (extra > 0 ? `<span class="tech-chip tech-chip-more">+${extra}</span>` : '')

        const cat      = p.category || 'personal'
        const catLabel = categoryLabels[cat] || cat
        const period   = p.period || ''

        return `
        <div class="portfolio-item" data-category="${cat}">
          <div class="portfolio-item-img-wrap">
            <span class="category-badge cat-${cat}">${catLabel}</span>
            ${p.featured ? `<span class="featured-badge"><i class="fas fa-star"></i> Featured</span>` : ''}
            <img src="${p.image}" alt="${p.title}" loading="lazy">
          </div>
          <div class="portfolio-item-body">
            <div class="portfolio-item-tech">${chips}</div>
            <h3 class="portfolio-item-title">${p.title}</h3>
            ${period ? `<p class="portfolio-item-period"><i class="fas fa-calendar-alt"></i> ${period}</p>` : ''}
            <button type="button" class="btn view-project-btn">View Project</button>
          </div>
          <div class="portfolio-item-details hidden-details">
            <div class="description"><p>${p.description}</p></div>
            <div class="general-info">
              <ul>
                <li>Period <span>${period}</span></li>
                <li>Technologies <span>${techs.join(', ')}</span></li>
                <li>Role <span>${p.role}</span></li>
                <li>View online <span>${p.link
                  ? `<a href="${p.link}" target="_blank" rel="noopener">${p.linkLabel || 'Link'}</a>`
                  : '—'}</span></li>
              </ul>
            </div>
          </div>
        </div>`
    }).join('')

    initPortfolioFilter()
}

/*--------------------- Filter -----------------------*/
function initPortfolioFilter() {
    document.querySelectorAll('.portfolio-filter-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.portfolio-filter-btn').forEach(b => b.classList.remove('active'))
            btn.classList.add('active')
            const filter = btn.dataset.filter
            document.querySelectorAll('.portfolio-item').forEach(item => {
                const show = filter === 'all' || item.dataset.category === filter
                item.classList.toggle('item-hidden', !show)
            })
        })
    })
}

/*--------------------- About Tabs -----------------------*/
const tabsContainer = document.querySelector('.about-tabs')
const aboutSection  = document.querySelector('.about-section')

tabsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('tab-item') || e.target.classList.contains('active')) return
    tabsContainer.querySelector('.active').classList.remove('active')
    e.target.classList.add('active')
    aboutSection.querySelector('.tab-content.active').classList.remove('active')
    aboutSection.querySelector(e.target.dataset.target).classList.add('active')
})

/*--------------------- Portfolio Popup -----------------------*/
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-project-btn')) {
        const item = e.target.closest('.portfolio-item')
        openPortfolioPopup(item)
    }
})

document.querySelector('.pp-close').addEventListener('click', closePortfolioPopup)

document.addEventListener('click', (e) => {
    if (e.target.classList.contains('pp-inner')) closePortfolioPopup()
})

function openPortfolioPopup(item) {
    const popup = document.querySelector('.portfolio-popup')
    popup.classList.add('open')
    document.body.classList.add('hide-scrolling')
    document.querySelector('.main').classList.add('fade-out')
    popup.scrollTop = 0

    const img     = item.querySelector('img')
    const title   = item.querySelector('.portfolio-item-title')
    const details = item.querySelector('.hidden-details')
    const cat     = item.dataset.category || ''

    if (img)     document.querySelector('.pp-thumbnail img').src = img.src
    if (title)   document.querySelector('.pp-title').innerHTML = title.innerHTML
    if (details) document.querySelector('.pp-body').innerHTML = details.innerHTML

    const badge = document.querySelector('.pp-category-badge')
    if (badge) {
        badge.className = `pp-category-badge category-badge cat-${cat}`
        badge.textContent = categoryLabels[cat] || cat
    }
}

function closePortfolioPopup() {
    document.querySelector('.portfolio-popup').classList.remove('open')
    document.body.classList.remove('hide-scrolling')
    document.querySelector('.main').classList.remove('fade-out')
}

/*--------------------- Contact -----------------------*/
function applyContact(contacts) {
    const set = (id, val) => { const el = document.getElementById(id); if (el) el.textContent = val }
    set('contact-email', contacts.email)
    set('contact-phone', contacts.phone)

    const icons = {
        facebook: 'fab fa-facebook', github: 'fab fa-github', googlePlay: 'fab fa-google-play',
        website: 'fas fa-globe', youtube: 'fab fa-youtube', linkedin: 'fab fa-linkedin-in', twitter: 'fab fa-twitter'
    }
    const el = document.getElementById('social-links')
    if (el) {
        el.innerHTML = Object.entries(contacts.socials || {})
            .map(([k, v]) => `<a href="${v}" target="_blank" rel="noopener"><i class="${icons[k] || 'fas fa-link'}"></i></a>`)
            .join('')
    }
}
