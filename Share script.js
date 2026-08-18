// =========================================================
// Mobile nav toggle
// =========================================================
const navToggle = document.getElementById('nav-toggle');
const primaryNav = document.getElementById('primary-nav');

navToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

// Close mobile menu after a nav link is clicked
document.querySelectorAll('.nav-link').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

// =========================================================
// Highlight active nav link while scrolling
// =========================================================
const sections = document.querySelectorAll('main .section');
const navLinks = document.querySelectorAll('.nav-link');

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    link.classList.toggle('active', link.dataset.section === id);
  });
};

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveLink(entry.target.id);
        }
      });
    },
    { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
  );

  sections.forEach((section) => observer.observe(section));
}

// =========================================================
// Recommendations: add a new recommendation via the form
// =========================================================
const form = document.getElementById('recommendation-form');
const list = document.getElementById('recommendations-list');
const countLabel = document.getElementById('rec-count');
const errorBox = document.getElementById('form-error');

const nameInput = document.getElementById('rec-name');
const roleInput = document.getElementById('rec-role');
const messageInput = document.getElementById('rec-message');

function showError(message) {
  errorBox.textContent = message;
  errorBox.hidden = false;
}

function hideError() {
  errorBox.hidden = true;
  errorBox.textContent = '';
}

function updateCount() {
  const total = list.querySelectorAll('.recommendation-card').length;
  countLabel.textContent = total;
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function createRecommendationCard(name, role, message) {
  const card = document.createElement('blockquote');
  card.className = 'recommendation-card';

  card.innerHTML = `
    <p class="rec-message">"${escapeHTML(message)}"</p>
    <footer class="rec-footer">
      <span class="rec-name">${escapeHTML(name)}</span>
      <span class="rec-role">${escapeHTML(role || 'Colleague')}</span>
    </footer>
  `;

  return card;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  hideError();

  const name = nameInput.value.trim();
  const role = roleInput.value.trim();
  const message = messageInput.value.trim();

  if (!name || !message) {
    showError('Please add your name and a short recommendation before submitting.');
    return;
  }

  const card = createRecommendationCard(name, role, message);
  list.appendChild(card);
  updateCount();

  form.reset();
  nameInput.focus();
});

// =========================================================
// Footer year
// =========================================================
document.getElementById('year').textContent = new Date().getFullYear();
