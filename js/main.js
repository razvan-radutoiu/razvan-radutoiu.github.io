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
  // Get the button's position
  const buttonRect = about.getBoundingClientRect();
  
  // Create the WinBox starting from the button's position
  const aboutBox = new WinBox({
    title: 'About Me',
    width: '1px', // Start small
    height: '1px',
    x: buttonRect.left,
    y: buttonRect.top,
    mount: aboutContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
  
  // Animate to final position and size
  setTimeout(() => {
    // Add a transition for smooth animation
    aboutBox.g.style.transition = 'all 0.4s cubic-bezier(0.17, 0.84, 0.44, 1)';
    
    // Calculate a good width - about 40% of the screen width
    const finalWidth = Math.min(600, window.innerWidth * 0.4) + 'px';
    // Use a height that fits most of the viewport
    const finalHeight = Math.min(800, window.innerHeight * 0.85) + 'px';
    
    // Move to the left side of the screen and resize
    aboutBox.move(20, 50).resize(finalWidth, finalHeight);
  }, 50);
});

// Create WinBox for Contact Section
contact.addEventListener('click', () => {
  // Get the button's position
  const buttonRect = contact.getBoundingClientRect();
  
  // Create the WinBox starting from the button's position
  const contactBox = new WinBox({
    title: 'Contact Me',
    width: '1px',
    height: '1px',
    x: buttonRect.left,
    y: buttonRect.top,
    mount: contactContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
  
  // Animate to final position and size on the lower right side
  setTimeout(() => {
    contactBox.g.style.transition = 'all 0.4s cubic-bezier(0.17, 0.84, 0.44, 1)';
    
    // Calculate final width and right position
    const finalWidth = Math.min(450, window.innerWidth * 0.4);
    const finalHeight = Math.min(491.05, window.innerHeight * 0.49);
    // Position on the right side
    const rightPosition = window.innerWidth - finalWidth - 20;
    // Position towards the bottom
    const lowerPosition = window.innerHeight - finalHeight - 50;
    
    contactBox.move(rightPosition, lowerPosition).resize(finalWidth + 'px', finalHeight + 'px');
  }, 50);
});

// Create WinBox for Projects Section
project.addEventListener('click', () => {
  // Get the button's position
  const buttonRect = project.getBoundingClientRect();
  
  // Create the WinBox starting from the button's position
  const projectBox = new WinBox({
    title: 'My Projects',
    width: '1px',
    height: '1px',
    x: buttonRect.left,
    y: buttonRect.top,
    mount: projectContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
  
  // Animate to final position and size on the right side
  setTimeout(() => {
    projectBox.g.style.transition = 'all 0.4s cubic-bezier(0.17, 0.84, 0.44, 1)';
    
    // Calculate final width and right position
    const finalWidth = Math.min(800, window.innerWidth * 0.45);
    // Position on the right side
    const rightPosition = window.innerWidth - finalWidth - 20;
    
    projectBox.move(rightPosition, 50).resize(finalWidth + 'px', '600px');
  }, 50);
});

// Create WinBox for CTF Achievements Section
ctf.addEventListener('click', () => {
  // Get the button's position
  const buttonRect = ctf.getBoundingClientRect();
  
  // Create the WinBox starting from the button's position
  const ctfBox = new WinBox({
    title: 'CTF Achievements',
    width: '1px',
    height: '1px',
    x: buttonRect.left,
    y: buttonRect.top,
    mount: ctfContent,
    onfocus: function () {
      this.setBackground('#00aa00');
    },
    onblur: function () {
      this.setBackground('#333');
    },
    class: document.body.classList.contains('light-theme') ? 'light-theme' : '',
  });
  
  // Animate to final position and size on the lower left side
  setTimeout(() => {
    ctfBox.g.style.transition = 'all 0.4s cubic-bezier(0.17, 0.84, 0.44, 1)';
    
    // Calculate final width and height
    const finalWidth = Math.min(800, window.innerWidth * 0.45);
    const finalHeight = Math.min(600, window.innerHeight * 0.7);
    
    // Position on the left side
    const leftPosition = 20; // 20px from the left edge
    
    // Position towards the bottom
    const lowerPosition = window.innerHeight - finalHeight - 50;
    
    ctfBox.move(leftPosition, lowerPosition).resize(finalWidth + 'px', finalHeight + 'px');
  }, 50);
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

//calculate and update CTF statistics from competition data
function updateCTFStats() {
  const competitionCards = document.querySelectorAll('.ctf-competition-card');
  
  let totalCompetitions = competitionCards.length;
  let totalPoints = 0;
  let challengeCount = 1337; // placeholder for now
  
  competitionCards.forEach(card => {
    const scoreText = card.querySelector('.ctf-score')?.textContent || '';
    const scoreMatch = scoreText.match(/Score: ([\d,]+) pts/);
    
    if (scoreMatch && scoreMatch[1]) {
      const points = parseInt(scoreMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(points)) {
        totalPoints += points;
      }
    }
  });
  
  const statsCards = document.querySelectorAll('.ctf-stat-card .ctf-stat-value');
  if (statsCards.length >= 3) {
    statsCards[0].textContent = totalCompetitions;

    statsCards[2].textContent = totalPoints.toLocaleString();
  }
}


document.getElementById('ctf').addEventListener('click', function() {
  setTimeout(updateCTFStats, 300);
});

document.addEventListener('click', function(event) {
  if (event.target.classList.contains('ctf-tab')) {
    if (event.target.getAttribute('data-tab') === 'competitions') {
      setTimeout(updateCTFStats, 100);
    }
  }
});


// Function to update CTF statistics based on competition data
function updateCTFStats() {
  // Select all competition cards
  const competitionCards = document.querySelectorAll('.ctf-competition-card');
  
  // Initialize counters
  let totalCompetitions = competitionCards.length;
  let totalPoints = 0;
  let totalPercentileSum = 0;
  let competitionsWithPositions = 0;
  
  // Process each competition card
  competitionCards.forEach(card => {
    // Extract score from the card
    const scoreText = card.querySelector('.ctf-score')?.textContent || '';
    const scoreMatch = scoreText.match(/Score: ([\d,]+) pts/);
    
    if (scoreMatch && scoreMatch[1]) {
      // Convert string like "1,564" to number 1564
      const points = parseInt(scoreMatch[1].replace(/,/g, ''), 10);
      if (!isNaN(points)) {
        totalPoints += points;
      }
    }
    
    // Extract position for percentile calculation
    const positionText = card.querySelector('.ctf-position')?.textContent || '';
    const positionMatch = positionText.match(/Position: (\d+)\/(\d+)/);
    
    if (positionMatch && positionMatch[1] && positionMatch[2]) {
      const position = parseInt(positionMatch[1], 10);
      const totalTeams = parseInt(positionMatch[2], 10);
      
      if (!isNaN(position) && !isNaN(totalTeams)) {
        // Calculate percentile (how many teams you outperformed)
        const percentile = (1 - (position / totalTeams)) * 100;
        totalPercentileSum += percentile;
        competitionsWithPositions++;
      }
    }
  });
  
  // Calculate average percentile if we have data
  let percentileDisplay = "TOP TIER";
  if (competitionsWithPositions > 0) {
    const averagePercentile = totalPercentileSum / competitionsWithPositions;
    percentileDisplay = ` ${Math.round(averagePercentile)}%`;
  }
  
  // Update the statistics dashboard
  const statsCards = document.querySelectorAll('.ctf-stat-card');
  if (statsCards.length >= 4) {
    // Update competitions count
    statsCards[0].querySelector('.ctf-stat-value').textContent = totalCompetitions;
    
    // Update total points with thousands separator
    statsCards[2].querySelector('.ctf-stat-value').textContent = 
      totalPoints.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    // Update the 4th stat card (replacing "TOP 5% Global Ranking")
    statsCards[3].querySelector('.ctf-stat-value').textContent = percentileDisplay;
    statsCards[3].querySelector('.ctf-stat-label').textContent = "Top Percentile";
  }
}

// Update statistics when the CTF tab is clicked
document.addEventListener('DOMContentLoaded', function() {
  const ctfButton = document.getElementById('ctf');
  if (ctfButton) {
    ctfButton.addEventListener('click', function() {
      // Wait a brief moment for the WinBox to be created and populated
      setTimeout(updateCTFStats, 300);
    });
  }
  
  // Also handle tab navigation within the CTF section
  document.addEventListener('click', function(event) {
    // Check if a CTF tab was clicked
    if (event.target.classList.contains('ctf-tab')) {
      // If competitions tab was clicked
      if (event.target.getAttribute('data-tab') === 'competitions') {
        // Wait a brief moment for the tab content to be displayed
        setTimeout(updateCTFStats, 100);
      }
    }
  });

  // Also update stats in case someone is viewing the CTF section directly
  setTimeout(function() {
    const competitionsContent = document.getElementById('competitions-content');
    if (competitionsContent && competitionsContent.classList.contains('active')) {
      updateCTFStats();
    }
  }, 500);
});