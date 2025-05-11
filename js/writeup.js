// Theme switching functionality
const themeSwitch = document.querySelector('#checkbox');

themeSwitch.addEventListener('change', function() {
  document.body.classList.toggle('light-theme');
  localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
});

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  document.body.classList.add('light-theme');
  themeSwitch.checked = true;
}

// Smooth scrolling for TOC links
document.querySelectorAll('.toc-list a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    window.scrollTo({
      top: targetElement.offsetTop - 100,
      behavior: 'smooth'
    });
    
    // Update URL without page jump
    history.pushState(null, null, targetId);
  });
});

// Copy button for code blocks
document.querySelectorAll('pre').forEach(block => {
  const copyButton = document.createElement('button');
  copyButton.className = 'copy-button';
  copyButton.innerHTML = '<i class="fas fa-copy"></i>';
  block.appendChild(copyButton);
  
  copyButton.addEventListener('click', () => {
    const code = block.querySelector('code').innerText;
    navigator.clipboard.writeText(code);
    
    copyButton.innerHTML = '<i class="fas fa-check"></i>';
    setTimeout(() => {
      copyButton.innerHTML = '<i class="fas fa-copy"></i>';
    }, 2000);
  });
});

// Add active class to TOC item on scroll
const sections = document.querySelectorAll('.writeup-content section');
const tocLinks = document.querySelectorAll('.toc-list a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop - 150) {
      current = section.getAttribute('id');
    }
  });
  
  tocLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});

// Add to writeup.js
document.addEventListener('DOMContentLoaded', function() {
  // Get current writeup info from meta tags
  const competition = document.querySelector('meta[name="competition"]').getAttribute('content');
  const challenge = document.querySelector('meta[name="challenge"]').getAttribute('content');
  
  // Generate navigation URLs
  const generateWriteupUrl = (comp, chall) => {
    return `../../${comp}/${chall}/index.html`;
  };
  
  // Set up navigation based on writeup metadata
  const prevWriteup = document.querySelector('meta[name="prev-writeup"]');
  const nextWriteup = document.querySelector('meta[name="next-writeup"]');
  const prevLink = document.querySelector('.prev-writeup');
  const nextLink = document.querySelector('.next-writeup');
  
  if (prevWriteup) {
    const [prevComp, prevChall] = prevWriteup.getAttribute('content').split('/');
    prevLink.href = generateWriteupUrl(prevComp, prevChall);
  } else {
    prevLink.classList.add('disabled');
  }
  
  if (nextWriteup) {
    const [nextComp, nextChall] = nextWriteup.getAttribute('content').split('/');
    nextLink.href = generateWriteupUrl(nextComp, nextChall);
  } else {
    nextLink.classList.add('disabled');
  }
});