let hamb = document.querySelector('.hamburger');

hamb.addEventListener('click', () => {
    let nav = document.querySelector('.hamburger nav')
    nav.classList.toggle('active')
    hamb.classList.toggle('active')
})
