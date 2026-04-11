// Main JavaScript file for Portfolio

document.addEventListener('DOMContentLoaded', function() {
    console.log('Portfolio loaded successfully');

    const GITHUB_USERNAME = 'Hoosn4';
    const STORAGE_KEYS = {
        theme: 'portfolioTheme',
        name: 'portfolioVisitorName',
        auth: 'portfolioAuthStatus',
        projectsVisible: 'portfolioProjectsVisible'
    };
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.sidebar-nav a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
    
    // Theme toggling and persistence (Assignment 2)
    const themeToggleBtn = document.getElementById('themeToggle');
    let currentTheme = 'light';

    function loadTheme() {
        try {
            const saved = localStorage.getItem(STORAGE_KEYS.theme);
            if (saved === 'dark' || saved === 'light') {
                currentTheme = saved;
            }
        } catch (error) {
            console.warn('localStorage unavailable:', error);
            currentTheme = 'light';
        }
    }

    function saveTheme(theme) {
        try {
            localStorage.setItem(STORAGE_KEYS.theme, theme);
        } catch (error) {
            console.warn('Could not save theme to localStorage:', error);
        }
    }

    function applyTheme(theme) {
        document.body.classList.toggle('dark-mode', theme === 'dark');
        document.body.classList.toggle('light-mode', theme === 'light');
        if (themeToggleBtn) {
            themeToggleBtn.textContent = theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
        }
        saveTheme(theme);
    }

    if (themeToggleBtn) {
        loadTheme();
        applyTheme(currentTheme);
        themeToggleBtn.addEventListener('click', function() {
            const nextTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
            currentTheme = nextTheme;
            applyTheme(nextTheme);
        });
    }

    // Visitor state (name, auth status, project visibility)
    const visitorNameDisplay = document.getElementById('visitorNameDisplay');
    const visitorNameInput = document.getElementById('visitorNameInput');
    const saveNameBtn = document.getElementById('saveNameBtn');
    const authStatus = document.getElementById('authStatus');
    const authToggleBtn = document.getElementById('authToggleBtn');
    const toggleProjectsBtn = document.getElementById('toggleProjectsBtn');
    const projectsSection = document.getElementById('projects');

    function loadVisitorState() {
        try {
            const savedName = localStorage.getItem(STORAGE_KEYS.name);
            const savedAuth = localStorage.getItem(STORAGE_KEYS.auth);
            const savedVisibility = localStorage.getItem(STORAGE_KEYS.projectsVisible);

            if (savedName && visitorNameDisplay) {
                visitorNameDisplay.textContent = savedName;
            }
            if (visitorNameInput && savedName) {
                visitorNameInput.value = savedName;
            }
            if (authStatus && authToggleBtn) {
                const isLoggedIn = savedAuth === 'logged-in';
                authStatus.textContent = isLoggedIn ? 'Logged in' : 'Logged out';
                authToggleBtn.textContent = isLoggedIn ? 'Log Out' : 'Log In';
            }
            if (projectsSection && toggleProjectsBtn) {
                const shouldShow = savedVisibility !== 'hidden';
                projectsSection.classList.toggle('projects-hidden', !shouldShow);
                toggleProjectsBtn.textContent = shouldShow ? 'Hide Projects' : 'Show Projects';
            }
        } catch (error) {
            console.warn('Unable to load visitor state:', error);
        }
    }

    function saveVisitorName(name) {
        try {
            localStorage.setItem(STORAGE_KEYS.name, name);
        } catch (error) {
            console.warn('Unable to save visitor name:', error);
        }
    }

    function saveAuthStatus(isLoggedIn) {
        try {
            localStorage.setItem(STORAGE_KEYS.auth, isLoggedIn ? 'logged-in' : 'logged-out');
        } catch (error) {
            console.warn('Unable to save auth status:', error);
        }
    }

    function saveProjectVisibility(isVisible) {
        try {
            localStorage.setItem(STORAGE_KEYS.projectsVisible, isVisible ? 'visible' : 'hidden');
        } catch (error) {
            console.warn('Unable to save project visibility:', error);
        }
    }

    if (saveNameBtn && visitorNameInput && visitorNameDisplay) {
        saveNameBtn.addEventListener('click', () => {
            const name = visitorNameInput.value.trim();
            const safeName = name.length >= 2 ? name : 'Guest';
            visitorNameDisplay.textContent = safeName;
            saveVisitorName(safeName);
        });
    }

    if (authToggleBtn && authStatus) {
        authToggleBtn.addEventListener('click', () => {
            const isLoggedIn = authStatus.textContent === 'Logged out';
            authStatus.textContent = isLoggedIn ? 'Logged in' : 'Logged out';
            authToggleBtn.textContent = isLoggedIn ? 'Log Out' : 'Log In';
            saveAuthStatus(isLoggedIn);
        });
    }

    if (toggleProjectsBtn && projectsSection) {
        toggleProjectsBtn.addEventListener('click', () => {
            const isHidden = projectsSection.classList.toggle('projects-hidden');
            toggleProjectsBtn.textContent = isHidden ? 'Show Projects' : 'Hide Projects';
            saveProjectVisibility(!isHidden);
        });
    }

    loadVisitorState();

    // Dynamic greeting logic
    function updateGreeting() {
        const greetingElement = document.getElementById('dynamicGreeting');
        if (!greetingElement) return;
        const hour = new Date().getHours();
        let greeting;
        if (hour >= 5 && hour < 12) greeting = "Good Morning, I'm Hussain Albaggal";
        else if (hour >= 12 && hour < 18) greeting = "Good Afternoon, I'm Hussain Albaggal";
        else greeting = "Good Evening, I'm Hussain Albaggal";
        greetingElement.textContent = greeting;
    }
    updateGreeting();

    // Project filtering + sorting logic
    const filterButtons = document.querySelectorAll('.project-filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    const projectEmptyState = document.getElementById('projectEmptyState');
    const projectMessage = document.getElementById('projectMessage');
    const levelSelect = document.getElementById('levelSelect');
    const sortSelect = document.getElementById('sortSelect');
    const projectContainer = document.querySelector('.projects-section');

    let activeCategory = 'all';
    let activeLevel = 'all';
    let activeSort = 'newest';

    function updateProjectMessage(visibleCount) {
        if (!projectMessage) return;
        const levelText = activeLevel === 'all' ? 'all levels' : activeLevel;
        const categoryText = activeCategory === 'all' ? 'all categories' : activeCategory;
        projectMessage.textContent = `Showing ${visibleCount} project(s) for ${categoryText} at ${levelText}.`;
    }

    function sortProjects(items) {
        const sorted = Array.from(items);

        if (activeSort === 'name') {
            sorted.sort((a, b) => a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent));
            return sorted;
        }

        sorted.sort((a, b) => {
            const dateA = new Date(a.dataset.date).getTime();
            const dateB = new Date(b.dataset.date).getTime();
            return activeSort === 'newest' ? dateB - dateA : dateA - dateB;
        });
        return sorted;
    }

    function updateProjectVisibility() {
        let visibleCount = 0;
        const filteredItems = [];

        projectItems.forEach(item => {
            const itemCategory = item.dataset.category;
            const itemLevel = item.dataset.level;
            const matchesCategory = activeCategory === 'all' || itemCategory === activeCategory;
            const matchesLevel = activeLevel === 'all' || itemLevel === activeLevel;
            const shouldShow = matchesCategory && matchesLevel;
            item.classList.toggle('project-hidden', !shouldShow);
            if (shouldShow) {
                visibleCount += 1;
                filteredItems.push(item);
            }
        });

        if (projectContainer) {
            const sortedItems = sortProjects(filteredItems);
            sortedItems.forEach(item => projectContainer.appendChild(item));
        }

        if (projectEmptyState) {
            projectEmptyState.style.display = visibleCount === 0 ? 'block' : 'none';
        }

        updateProjectMessage(visibleCount);
    }

    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            activeCategory = btn.dataset.filter;
            updateProjectVisibility();
        });
    });

    if (levelSelect) {
        levelSelect.addEventListener('change', (event) => {
            activeLevel = event.target.value;
            updateProjectVisibility();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (event) => {
            activeSort = event.target.value;
            updateProjectVisibility();
        });
    }

    updateProjectVisibility();

    // Assignment 3 - API Integration (GitHub repositories)
    const githubStatus = document.getElementById('githubStatus');
    const githubRepoList = document.getElementById('githubRepoList');

    function showGitHubError(message) {
        if (!githubStatus || !githubRepoList) return;
        githubStatus.classList.add('error');
        githubStatus.innerHTML = `${message}<br><button id="retryGithubFetch" class="github-retry-btn" type="button">Try Again</button>`;
        githubRepoList.innerHTML = '';

        const retryBtn = document.getElementById('retryGithubFetch');
        if (retryBtn) {
            retryBtn.addEventListener('click', fetchGitHubRepos);
        }
    }

    function createRepoCard(repo) {
        const article = document.createElement('article');
        article.className = 'github-repo-card';

        const title = document.createElement('h3');
        title.textContent = repo.name;

        const description = document.createElement('p');
        description.textContent = repo.description || 'No description provided.';

        const meta = document.createElement('div');
        meta.className = 'github-meta';

        const langSpan = document.createElement('span');
        const langStrong = document.createElement('strong');
        langStrong.textContent = 'Language: ';
        langSpan.appendChild(langStrong);
        langSpan.appendChild(document.createTextNode(repo.language || 'N/A'));

        const starsSpan = document.createElement('span');
        const starsStrong = document.createElement('strong');
        starsStrong.textContent = 'Stars: ';
        starsSpan.appendChild(starsStrong);
        starsSpan.appendChild(document.createTextNode(String(repo.stargazers_count)));

        const forksSpan = document.createElement('span');
        const forksStrong = document.createElement('strong');
        forksStrong.textContent = 'Forks: ';
        forksSpan.appendChild(forksStrong);
        forksSpan.appendChild(document.createTextNode(String(repo.forks_count)));

        meta.appendChild(langSpan);
        meta.appendChild(starsSpan);
        meta.appendChild(forksSpan);

        const link = document.createElement('a');
        link.className = 'github-repo-link';
        link.href = repo.html_url;
        link.target = '_blank';
        link.rel = 'noopener noreferrer';
        link.textContent = 'View Repository';

        article.appendChild(title);
        article.appendChild(description);
        article.appendChild(meta);
        article.appendChild(link);

        return article;
    }

    function renderGitHubRepos(repositories) {
        if (!githubRepoList || !githubStatus) return;

        if (!Array.isArray(repositories) || repositories.length === 0) {
            showGitHubError('No public repositories were found right now. Please check again later.');
            return;
        }

        githubStatus.classList.remove('error');
        githubStatus.textContent = `Showing ${repositories.length} latest repositories from GitHub.`;

        githubRepoList.innerHTML = '';
        repositories.forEach(repo => {
            githubRepoList.appendChild(createRepoCard(repo));
        });
    }

    async function fetchGitHubRepos() {
        if (!githubStatus || !githubRepoList) return;

        githubStatus.classList.remove('error');
        githubStatus.textContent = 'Loading repositories...';
        githubRepoList.innerHTML = '';

        try {
            const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`);

            if (!response.ok) {
                throw new Error(`GitHub API request failed with status ${response.status}`);
            }

            const data = await response.json();
            renderGitHubRepos(data);
        } catch (error) {
            console.error('GitHub fetch failed:', error);
            showGitHubError('Unable to load GitHub projects right now. Please check your internet connection and try again.');
        }
    }

    fetchGitHubRepos();

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    const formFeedback = document.getElementById('formFeedback');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            formFeedback.className = 'form-feedback';
            formFeedback.textContent = '';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            const errors = [];
            if (!name) errors.push('Name is required.');
            if (!email) errors.push('Email is required.');
            if (!message) errors.push('Message is required.');
            if (name && name.length < 2) errors.push('Name must be at least 2 characters.');
            if (message && message.length < 10) errors.push('Message must be at least 10 characters.');

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (email && !emailRegex.test(email)) {
                errors.push('Please enter a valid email address.');
            }

            const nameRegex = /^[a-zA-Z\s'-]+$/;
            if (name && !nameRegex.test(name)) {
                errors.push('Name can only include letters, spaces, hyphens, and apostrophes.');
            }

            if (errors.length > 0) {
                formFeedback.classList.add('error');
                formFeedback.innerHTML = errors.map(item => `<div>${item}</div>`).join('');
                return;
            }

            formFeedback.classList.add('success');
            formFeedback.textContent = 'Message sent successfully!';
            contactForm.reset();
        });

        ['input', 'change'].forEach(eventType => {
            contactForm.addEventListener(eventType, () => {
                if (formFeedback) {
                    formFeedback.className = 'form-feedback';
                    formFeedback.textContent = '';
                }
            });
        });
    }

    // Add animation to elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    const sectionElements = document.querySelectorAll('section');
    sectionElements.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });

    // Session timer
    const sessionTimer = document.getElementById('sessionTimer');
    const sessionStart = Date.now();

    function updateSessionTimer() {
        if (!sessionTimer) return;
        const elapsedSeconds = Math.floor((Date.now() - sessionStart) / 1000);
        const minutes = String(Math.floor(elapsedSeconds / 60)).padStart(2, '0');
        const seconds = String(elapsedSeconds % 60).padStart(2, '0');
        sessionTimer.textContent = `${minutes}:${seconds}`;
    }

    updateSessionTimer();
    setInterval(updateSessionTimer, 1000);
});
