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

// Filter functionality
const categoryFilters = document.querySelectorAll('.category-filter');
const difficultyFilters = document.querySelectorAll('.difficulty-filter');
const competitionFilters = document.querySelectorAll('.competition-filter');
const resetButtons = document.querySelectorAll('.reset-filters-btn');
const writeupCards = document.querySelectorAll('.writeup-card');
const noWriteupsMessage = document.querySelector('.no-writeups-message');
const searchInput = document.querySelector('#writeup-search');
const sortSelect = document.querySelector('#sort-select');

// Handle "All" checkboxes
function handleAllCheckbox(allCheckbox, relatedCheckboxes) {
  allCheckbox.addEventListener('change', function() {
    if (this.checked) {
      relatedCheckboxes.forEach(checkbox => {
        checkbox.checked = false;
      });
    }
  });

  relatedCheckboxes.forEach(checkbox => {
    checkbox.addEventListener('change', function() {
      if (this.checked) {
        allCheckbox.checked = false;
      }
      
      // If no specific checkboxes are checked, re-check "All"
      const anyChecked = [...relatedCheckboxes].some(cb => cb.checked);
      if (!anyChecked) {
        allCheckbox.checked = true;
      }
    });
  });
}

// Setup "All" checkbox handlers
const categoryAll = document.querySelector('.category-filter[value="all"]');
const categorySpecific = document.querySelectorAll('.category-filter:not([value="all"])');
handleAllCheckbox(categoryAll, categorySpecific);

const difficultyAll = document.querySelector('.difficulty-filter[value="all"]');
const difficultySpecific = document.querySelectorAll('.difficulty-filter:not([value="all"])');
handleAllCheckbox(difficultyAll, difficultySpecific);

const competitionAll = document.querySelector('.competition-filter[value="all"]');
const competitionSpecific = document.querySelectorAll('.competition-filter:not([value="all"])');
handleAllCheckbox(competitionAll, competitionSpecific);

// Apply filters function
function applyFilters() {
  let visibleCount = 0;
  
  // Get selected filters
  const selectedCategories = [...document.querySelectorAll('.category-filter:checked')].map(cb => cb.value);
  const selectedDifficulties = [...document.querySelectorAll('.difficulty-filter:checked')].map(cb => cb.value);
  const selectedCompetitions = [...document.querySelectorAll('.competition-filter:checked')].map(cb => cb.value);
  const searchTerm = searchInput.value.toLowerCase();
  
  // Check each writeup card against filters
  writeupCards.forEach(card => {
    const category = card.dataset.category;
    const difficulty = card.dataset.difficulty;
    const competition = card.dataset.competition;
    const title = card.querySelector('h3').textContent.toLowerCase();
    const description = card.querySelector('p').textContent.toLowerCase();
    
    // Category filter
    const categoryMatch = selectedCategories.includes('all') || selectedCategories.includes(category);
    
    // Difficulty filter
    const difficultyMatch = selectedDifficulties.includes('all') || selectedDifficulties.includes(difficulty);
    
    // Competition filter
    const competitionMatch = selectedCompetitions.includes('all') || selectedCompetitions.includes(competition);
    
    // Search filter
    const searchMatch = !searchTerm || 
                       title.includes(searchTerm) || 
                       description.includes(searchTerm);
    
    // Show or hide based on all filters
    if (categoryMatch && difficultyMatch && competitionMatch && searchMatch) {
      card.style.display = 'flex';
      visibleCount++;
    } else {
      card.style.display = 'none';
    }
  });
  
  // Show "No writeups" message if needed
  if (visibleCount === 0) {
    noWriteupsMessage.classList.remove('hidden');
  } else {
    noWriteupsMessage.classList.add('hidden');
  }
}

// Reset filters function
function resetFilters() {
  // Reset category filters
  categoryAll.checked = true;
  categorySpecific.forEach(cb => cb.checked = false);
  
  // Reset difficulty filters
  difficultyAll.checked = true;
  difficultySpecific.forEach(cb => cb.checked = false);
  
  // Reset competition filters
  competitionAll.checked = true;
  competitionSpecific.forEach(cb => cb.checked = false);
  
  // Reset search
  searchInput.value = '';
  
  // Reset sort
  sortSelect.value = 'newest';
  
  // Apply filters & sort
  applyFilters();
  sortWriteups();
}

// Sort writeups function
function sortWriteups() {
  const sortValue = sortSelect.value;
  const cardsArray = [...writeupCards];
  const container = document.querySelector('.writeups-grid');
  
  cardsArray.sort((a, b) => {
    if (sortValue === 'newest') {
      return new Date(b.dataset.date) - new Date(a.dataset.date);
    } else if (sortValue === 'oldest') {
      return new Date(a.dataset.date) - new Date(b.dataset.date);
    } else if (sortValue === 'difficulty-asc') {
      const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return difficultyOrder[a.dataset.difficulty] - difficultyOrder[b.dataset.difficulty];
    } else if (sortValue === 'difficulty-desc') {
      const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
      return difficultyOrder[b.dataset.difficulty] - difficultyOrder[a.dataset.difficulty];
    }
    return 0;
  });
  
  // Remove all cards from DOM
  writeupCards.forEach(card => card.remove());
  
  // Add sorted cards back
  cardsArray.forEach(card => container.appendChild(card));
}

// Event Listeners
categoryFilters.forEach(filter => {
  filter.addEventListener('change', applyFilters);
});

difficultyFilters.forEach(filter => {
  filter.addEventListener('change', applyFilters);
});

competitionFilters.forEach(filter => {
  filter.addEventListener('change', applyFilters);
});

resetButtons.forEach(button => {
  button.addEventListener('click', resetFilters);
});

searchInput.addEventListener('input', applyFilters);

sortSelect.addEventListener('change', sortWriteups);

// Initial sort and filter application
sortWriteups();
applyFilters();


// Add this function to calculate and update stats
function updateWriteupStats() {
  // Get all writeup cards
  const allWriteups = document.querySelectorAll('.writeup-card');
  
  // Count total writeups
  const totalWriteups = allWriteups.length;
  
  // Count unique categories
  const categories = new Set();
  allWriteups.forEach(writeup => {
    categories.add(writeup.dataset.category);
  });
  
  // Count unique competitions
  const competitions = new Set();
  allWriteups.forEach(writeup => {
    const competitionEl = writeup.querySelector('.writeup-competition');
    if (competitionEl) {
      competitions.add(competitionEl.textContent.trim());
    }
  });
  
  // Update the stats in the sidebar
  const statItems = document.querySelectorAll('.stat-item .stat-value');
  if (statItems.length >= 3) {
    statItems[0].textContent = totalWriteups;
    statItems[1].textContent = categories.size;
    statItems[2].textContent = competitions.size;
    // We'll keep the views count as is, as this would typically require a backend
  }
}

// Call this function when the page loads
document.addEventListener('DOMContentLoaded', updateWriteupStats);


// Function to update the total views statistic
async function updateTotalViews() {
  try {
    // Create a namespace for your site (e.g., your GitHub username)
    const namespace = 'razvan-radutoiu';
    const name = 'ctf-writeups-total';
    
    // Fetch the current view count
    const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${name}`);
    const data = await response.json();
    
    // Update the views count in the stats
    const viewsElement = document.querySelector('.stats-grid .stat-item:nth-child(4) .stat-value');
    if (viewsElement) {
      viewsElement.textContent = data.Count.toLocaleString();
    }
    
    return data.Count;
  } catch (error) {
    console.error('Error fetching view count:', error);
    // If the counter doesn't exist yet, create it with an initial value
    try {
      const namespace = 'razvan-radutoiu';
      const name = 'ctf-writeups-total';
      
      // Set initial count to 0
      await fetch(`https://api.counterapi.dev/v1/${namespace}/${name}/set?count=0`);
      
      return 0;
    } catch (setError) {
      console.error('Error setting initial view count:', setError);
      return 0;
    }
  }
}

// Increment total views counter when the page loads
async function incrementTotalViews() {
  try {
    const namespace = 'razvan-radutoiu';
    const name = 'ctf-writeups-total';
    
    // Increment the counter by 1
    const response = await fetch(`https://api.counterapi.dev/v1/${namespace}/${name}/up`);
    const data = await response.json();
    
    // Update the views display
    const viewsElement = document.querySelector('.stats-grid .stat-item:nth-child(4) .stat-value');
    if (viewsElement) {
      viewsElement.textContent = data.Count.toLocaleString();
    }
  } catch (error) {
    console.error('Error incrementing view count:', error);
    // If we couldn't increment, try to at least display the current count
    updateTotalViews();
  }
}

// Add to your existing DOMContentLoaded event
document.addEventListener('DOMContentLoaded', async function() {
  // Your existing stats calculation code
  updateWriteupStats();
  
  // Then handle the view counting
  incrementTotalViews();
});