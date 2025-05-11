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

// Setup writeup navigation
document.addEventListener('DOMContentLoaded', function() {
  // Get current writeup info from meta tags
  const competition = document.querySelector('meta[name="competition"]')?.getAttribute('content');
  const challenge = document.querySelector('meta[name="challenge"]')?.getAttribute('content');
  
  // Generate navigation URLs
  const generateWriteupUrl = (comp, chall) => {
    return `../../${comp}/${chall}/index.html`;
  };
  
  // Set up navigation based on writeup metadata
  const prevWriteup = document.querySelector('meta[name="prev-writeup"]');
  const nextWriteup = document.querySelector('meta[name="next-writeup"]');
  const prevLink = document.querySelector('.prev-writeup');
  const nextLink = document.querySelector('.next-writeup');
  
  let metaNavSuccess = false;
  
  if (prevLink && prevWriteup) {
    const [prevComp, prevChall] = prevWriteup.getAttribute('content').split('/');
    prevLink.href = generateWriteupUrl(prevComp, prevChall);
    prevLink.classList.remove('disabled');
    metaNavSuccess = true;
  } else if (prevLink) {
    prevLink.classList.add('disabled');
  }
  
  if (nextLink && nextWriteup) {
    const [nextComp, nextChall] = nextWriteup.getAttribute('content').split('/');
    nextLink.href = generateWriteupUrl(nextComp, nextChall);
    nextLink.classList.remove('disabled');
    metaNavSuccess = true;
  } else if (nextLink) {
    nextLink.classList.add('disabled');
  }
  
  // If meta navigation failed or is incomplete, try dynamic navigation
  if (!metaNavSuccess) {
    fetchDynamicNavigation();
  }
  
  // Dynamic navigation function
  async function fetchDynamicNavigation() {
    try {
      // Extract current writeup path information
      const pathSegments = window.location.pathname.split('/');
      const currentCompetition = pathSegments[pathSegments.length - 3] || '';
      const currentChallenge = pathSegments[pathSegments.length - 2] || '';
      
      if (!currentCompetition || !currentChallenge) return;
      
      // Fetch the writeups index page
      const indexPath = '../../index.html';
      const response = await fetch(indexPath);
      const html = await response.text();
      
      // Parse the HTML to extract writeup data
      const parser = new DOMParser();
      const doc = parser.parseFromString(html, 'text/html');
      
      // Extract all writeup cards
      const writeupCards = Array.from(doc.querySelectorAll('.writeup-card'));
      
      // Build writeup data array
      const writeups = writeupCards.map(card => {
        const title = card.querySelector('h3').textContent;
        const link = card.querySelector('.read-writeup-btn').getAttribute('href');
        const competition = card.querySelector('.writeup-competition').textContent;
        const date = card.dataset.date || '';
        
        // Extract competition and challenge from link
        const linkParts = link.split('/');
        const comp = linkParts[0] || '';
        const chall = linkParts[1] || '';
        
        return {
          title,
          link,
          competition,
          date,
          comp,
          chall
        };
      });
      
      // Sort by date (newest first)
      writeups.sort((a, b) => {
        if (!a.date || !b.date) return 0;
        return new Date(b.date) - new Date(a.date);
      });
      
      // Find current writeup index
      const currentIndex = writeups.findIndex(writeup => 
        writeup.comp === currentCompetition && writeup.chall === currentChallenge
      );
      
      if (currentIndex === -1) return;
      
      // Get previous and next writeups
      const prevWriteup = currentIndex < writeups.length - 1 ? writeups[currentIndex + 1] : null;
      const nextWriteup = currentIndex > 0 ? writeups[currentIndex - 1] : null;
      
      // Update navigation links if they were disabled
      if (prevLink && prevLink.classList.contains('disabled') && prevWriteup) {
        prevLink.href = prevWriteup.link;
        
        // Find or create span for the title
        let prevSpan = prevLink.querySelector('span');
        if (!prevSpan) {
          prevSpan = document.createElement('span');
          prevLink.appendChild(prevSpan);
        }
        prevSpan.textContent = 'Previous: ' + prevWriteup.title;
        prevLink.classList.remove('disabled');
      }
      
      if (nextLink && nextLink.classList.contains('disabled') && nextWriteup) {
        nextLink.href = nextWriteup.link;
        
        // Find or create span for the title
        let nextSpan = nextLink.querySelector('span');
        if (!nextSpan) {
          nextSpan = document.createElement('span');
          nextLink.appendChild(nextSpan);
        }
        nextSpan.textContent = 'Next: ' + nextWriteup.title;
        nextLink.classList.remove('disabled');
      }
      
      console.log('Dynamic navigation loaded successfully');
    } catch (error) {
      console.error('Error fetching dynamic navigation:', error);
    }
  }
});