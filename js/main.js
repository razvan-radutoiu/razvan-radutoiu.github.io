// DOM Elements
const about = document.querySelector('#about');
const contact = document.querySelector('#contact');
const project = document.querySelector('#project');
const ctf = document.querySelector('#ctf');

const aboutContent = document.querySelector('#about-content');
const contactContent = document.querySelector('#contact-content');
const projectContent = document.querySelector('#project-content');
const ctfContent = document.querySelector('#ctf-content');

const themeSwitch = document.querySelector('#checkbox');

// Theme Switcher
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

// Create WinBox for About Section
about.addEventListener('click', () => {
  const aboutBox = new WinBox({
    title: 'About Me',
    width: '600px',
    height: '500px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: aboutContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
});

// Create WinBox for Contact Section
contact.addEventListener('click', () => {
  const contactBox = new WinBox({
    title: 'Contact Me',
    width: '600px',
    height: '500px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 60,
    mount: contactContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
});

// Create WinBox for Projects Section
project.addEventListener('click', () => {
  const projectBox = new WinBox({
    title: 'My Projects',
    width: '800px',
    height: '600px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: projectContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
});

// Create WinBox for CTF Achievements Section
ctf.addEventListener('click', () => {
  const ctfBox = new WinBox({
    title: 'CTF Achievements',
    width: '800px',
    height: '600px',
    top: 50,
    right: 50,
    bottom: 50,
    left: 50,
    mount: ctfContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
});

// Typing Effect
const texts = ['whoami', 'ls -la', 'cd projects/', 'python3 hack.py', 'sudo apt update'];
let count = 0;
let index = 0;
let currentText = '';
let letter = '';

function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  
  document.querySelector('.typing-effect').textContent = letter;
  
  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 2000);
  } else {
    setTimeout(type, 100);
  }
}

// Start typing effect on page load
window.addEventListener('load', () => {
  setTimeout(type, 1500);
});

// CTF Filtering (if present in the current view)
if (document.querySelectorAll('.ctf-filter').length > 0) {
  const ctfFilters = document.querySelectorAll('.ctf-filter');
  const ctfCards = document.querySelectorAll('.ctf-card');

  ctfFilters.forEach(filter => {
    filter.addEventListener('click', () => {
      // Remove active class from all filters
      ctfFilters.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked filter
      filter.classList.add('active');
      
      const filterValue = filter.getAttribute('data-filter');
      
      // Filter the CTF cards
      ctfCards.forEach(card => {
        if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// CTF Tab Navigation
if (document.querySelectorAll('.ctf-tab').length > 0) {
  const ctfTabs = document.querySelectorAll('.ctf-tab');
  const ctfTabContents = document.querySelectorAll('.ctf-tab-content');

  ctfTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      ctfTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      tab.classList.add('active');
      
      // Hide all tab contents
      ctfTabContents.forEach(content => {
        content.classList.remove('active');
      });
      
      // Show the selected tab content
      const tabId = tab.getAttribute('data-tab');
      document.getElementById(`${tabId}-content`).classList.add('active');
    });
  });
}

// Connect the CTF writeup cards to their respective template pages
document.querySelectorAll('.ctf-link').forEach(link => {
  link.addEventListener('click', function(e) {
    // Let the href attribute handle navigation if it's set correctly
    // Otherwise fall back to default template
    if (!this.getAttribute('href') || this.getAttribute('href') === '#') {
      e.preventDefault();
      window.location.href = 'writeup-template.html';
    }
  });
});

// Handle "View All Writeups" link if present
const viewAllWriteupsLink = document.querySelector('.view-all-writeups');
if (viewAllWriteupsLink) {
  viewAllWriteupsLink.addEventListener('click', function(e) {
    e.preventDefault();
    window.location.href = 'writeups/index.html';
  });
}

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Simple validation
    if (!name || !email || !message) {
      alert('Please fill out all fields');
      return;
    }
    
    // Simulate form submission
    const submitBtn = document.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      contactForm.reset();
      
      // Reset button after 3 seconds
      setTimeout(() => {
        submitBtn.innerHTML = 'Send Message';
        submitBtn.disabled = false;
      }, 3000);
    }, 1500);
  });
}

// Terminal window enhancements
const terminalWindow = document.querySelector('.terminal-window');
if (terminalWindow) {
  const terminalButtons = document.querySelectorAll('.terminal-buttons span');
  
  // Add interactive behavior to terminal buttons
  terminalButtons.forEach(button => {
    button.addEventListener('click', function() {
      if (this.classList.contains('terminal-close')) {
        terminalWindow.style.display = 'none';
        setTimeout(() => {
          terminalWindow.style.display = 'block';
        }, 1000);
      } else if (this.classList.contains('terminal-minimize')) {
        terminalWindow.querySelector('.terminal-content').classList.toggle('minimized');
      } else if (this.classList.contains('terminal-maximize')) {
        terminalWindow.classList.toggle('maximized');
      }
    });
  });
}