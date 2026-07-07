document.addEventListener('DOMContentLoaded', function() {
  initNavigation();
  initMobileMenu();
  initScrollEffects();
  initCardHover();
  initLucideIcons();
});

function initNavigation() {
  var currentPath = window.location.pathname;
  var currentPage = currentPath.split('/').pop() || 'index.html';
  
  var navLinks = document.querySelectorAll('nav .nav-links a, nav .mobile-links a');
  navLinks.forEach(function(link) {
    var href = link.getAttribute('href');
    if (href === currentPage || (currentPage === 'index.html' && href === 'index.html')) {
      link.classList.add('active');
    }
  });
}

function initMobileMenu() {
  var menuBtn = document.getElementById('mobile-menu-btn');
  var mobileMenu = document.getElementById('mobile-menu');
  
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', function() {
      mobileMenu.classList.toggle('open');
      var icon = menuBtn.querySelector('svg');
      if (mobileMenu.classList.contains('open')) {
        icon.setAttribute('data-lucide', 'x');
      } else {
        icon.setAttribute('data-lucide', 'menu');
      }
      lucide.createIcons();
    });
    
    document.querySelectorAll('.mobile-links a').forEach(function(link) {
      link.addEventListener('click', function() {
        mobileMenu.classList.remove('open');
        var icon = menuBtn.querySelector('svg');
        icon.setAttribute('data-lucide', 'menu');
        lucide.createIcons();
      });
    });
  }
}

function initScrollEffects() {
  var nav = document.querySelector('nav');
  
  window.addEventListener('scroll', function() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
}

function initCardHover() {
  var cards = document.querySelectorAll('.card-hover');
  
  cards.forEach(function(card) {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-4px)';
      this.style.boxShadow = 'var(--shadow-lg)';
    });
    
    card.addEventListener('mouseleave', function() {
      this.style.transform = 'translateY(0)';
      this.style.boxShadow = 'none';
    });
  });
}

function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function scrollToSection(id) {
  var element = document.getElementById(id);
  if (element) {
    var offset = 80;
    var elementPosition = element.getBoundingClientRect().top;
    var offsetPosition = elementPosition + window.pageYOffset - offset;
    
    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
}

function toggleAccordion(button) {
  var content = button.nextElementSibling;
  var icon = button.querySelector('[data-lucide="chevron-down"]');
  
  content.classList.toggle('hidden');
  
  if (content.classList.contains('hidden')) {
    icon.setAttribute('data-lucide', 'chevron-down');
  } else {
    icon.setAttribute('data-lucide', 'chevron-up');
  }
  
  lucide.createIcons();
}

function copyToClipboard(text, element) {
  navigator.clipboard.writeText(text).then(function() {
    var originalText = element.innerHTML;
    element.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> 已复制';
    lucide.createIcons();
    
    setTimeout(function() {
      element.innerHTML = originalText;
      lucide.createIcons();
    }, 2000);
  });
}