
document.addEventListener('DOMContentLoaded', function() {
    const yearSpan = document.getElementById('year');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});
// button redirect to contact us page
document.getElementById('getStartedButton').addEventListener('click', function() {
    window.location.href = './public/contactUs.html';
});


document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
  
    menuToggle.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent the click from bubbling up
      navMenu.classList.toggle('active');
    });
  
    document.addEventListener('click', function(event) {
      if (!navMenu.contains(event.target) && !menuToggle.contains(event.target)) {
        navMenu.classList.remove('active');
      }
    });
  
    navMenu.addEventListener('click', function(event) {
      event.stopPropagation(); // Prevent clicks inside the menu from closing it
    });
  });

  document.addEventListener('DOMContentLoaded', function() {
    const backToTopButton = document.getElementById('backToTop');
  
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopButton.style.display = 'block';
      } else {
        backToTopButton.style.display = 'none';
      }
    });
  
    backToTopButton.addEventListener('click', function() {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  });