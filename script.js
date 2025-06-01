// Initialize Lucide Icons
        lucide.createIcons();

        // Helper function for smooth scrolling
        function scrollToSection(id) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        // Dark Mode Toggle Logic
        document.addEventListener('DOMContentLoaded', () => {
            const htmlElement = document.documentElement;
            const darkModeToggleDesktop = document.getElementById('dark-mode-toggle-desktop');
            const darkModeToggleMobile = document.getElementById('dark-mode-toggle-mobile');

            // Check for saved theme preference in localStorage
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                htmlElement.classList.add('dark');
            } else {
                htmlElement.classList.remove('dark');
            }

            // Function to toggle dark mode
            function toggleDarkMode() {
                if (htmlElement.classList.contains('dark')) {
                    htmlElement.classList.remove('dark');
                    localStorage.setItem('theme', 'light');
                } else {
                    htmlElement.classList.add('dark');
                    localStorage.setItem('theme', 'dark');
                }
                // Re-render Lucide icons after class change to ensure correct icon is shown
                lucide.createIcons();
            }

            // Event listeners for dark mode toggles
            if (darkModeToggleDesktop) {
                darkModeToggleDesktop.addEventListener('click', toggleDarkMode);
            }
            if (darkModeToggleMobile) {
                darkModeToggleMobile.addEventListener('click', toggleDarkMode);
            }

            // Navbar interactivity
            const navbar = document.getElementById('navbar');
            const mobileMenuButton = document.getElementById('mobile-menu-button');
            const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
            const closeMobileMenuButton = document.getElementById('close-mobile-menu-button');
            const mobileMenuLinks = mobileMenuOverlay.querySelectorAll('a');
            const desktopNavLinks = navbar.querySelectorAll('ul.hidden.md\\:flex a');
            const navBrand = navbar.querySelector('a.text-2xl');

            // Set current year in footer
            document.getElementById('current-year').textContent = new Date().getFullYear();

            // Navbar background change on scroll
            window.addEventListener('scroll', () => {
                const isScrolled = window.scrollY > 50;
                if (isScrolled) {
                    navbar.classList.add('bg-white', 'shadow-lg', 'py-3', 'dark:bg-gray-900', 'dark:shadow-md');
                    navbar.classList.remove('bg-transparent', 'py-5');

                    navBrand.classList.remove('text-white');
                    navBrand.classList.add('text-gray-800', 'dark:text-gray-100');

                    desktopNavLinks.forEach(link => {
                        link.classList.remove('text-white');
                        link.classList.add('text-gray-700', 'dark:text-gray-300');
                    });
                    mobileMenuButton.classList.remove('text-white');
                    mobileMenuButton.classList.add('text-gray-800', 'dark:text-gray-100');
                    darkModeToggleMobile.classList.remove('text-white');
                    darkModeToggleMobile.classList.add('text-gray-800', 'dark:text-gray-100');
                    if (darkModeToggleDesktop) {
                        darkModeToggleDesktop.classList.remove('text-white');
                        darkModeToggleDesktop.classList.add('text-gray-800', 'dark:text-gray-100');
                    }

                } else {
                    navbar.classList.remove('bg-white', 'shadow-lg', 'py-3', 'dark:bg-gray-900', 'dark:shadow-md');
                    navbar.classList.add('bg-transparent', 'py-5');

                    navBrand.classList.remove('text-gray-800');
                    navBrand.classList.add('text-white', 'dark:text-gray-100');

                    desktopNavLinks.forEach(link => {
                        link.classList.remove('text-gray-700');
                        link.classList.add('text-white', 'dark:text-gray-100');
                    });
                    mobileMenuButton.classList.remove('text-gray-800');
                    mobileMenuButton.classList.add('text-white', 'dark:text-gray-100');
                    darkModeToggleMobile.classList.remove('text-gray-800');
                    darkModeToggleMobile.classList.add('text-white', 'dark:text-gray-100');
                    if (darkModeToggleDesktop) {
                        darkModeToggleDesktop.classList.remove('text-gray-800');
                        darkModeToggleDesktop.classList.add('text-white', 'dark:text-gray-100');
                    }
                }
            });

            // Mobile menu toggle
            mobileMenuButton.addEventListener('click', () => {
                mobileMenuOverlay.classList.remove('hidden');
            });

            closeMobileMenuButton.addEventListener('click', () => {
                mobileMenuOverlay.classList.add('hidden');
            });

            mobileMenuLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenuOverlay.classList.add('hidden');
                    // scrollToSection is already called by the onclick attribute
                });
            });

            // Scroll to Top Button interactivity
            const scrollToTopButton = document.getElementById('scroll-to-top-button');
            window.addEventListener('scroll', () => {
                if (window.scrollY > 100) {
                    scrollToTopButton.classList.remove('hidden');
                } else {
                    scrollToTopButton.classList.add('hidden');
                }
            });

            scrollToTopButton.addEventListener('click', () => {
                scrollToSection('home');
            });

            // Contact Form Submission
            const contactForm = document.getElementById('contact-form');
            const formStatus = document.getElementById('form-status');

            contactForm.addEventListener('submit', async (e) => {
                e.preventDefault();
                formStatus.textContent = 'Sending...';
                formStatus.classList.remove('text-green-600', 'text-red-600');
                formStatus.classList.add('text-gray-600');

                const formData = new FormData(contactForm);
                const data = Object.fromEntries(formData.entries());

                // Simulate API call delay
                try {
                    await new Promise(resolve => setTimeout(resolve, 1500));

                    console.log('Form data submitted:', data);
                    formStatus.textContent = 'Message sent successfully! I will get back to you shortly.';
                    formStatus.classList.remove('text-gray-600', 'text-red-600');
                    formStatus.classList.add('text-green-600');
                    contactForm.reset(); // Clear form
                } catch (error) {
                    console.error('Error submitting form:', error);
                    formStatus.textContent = 'Failed to send message. Please try again later.';
                    formStatus.classList.remove('text-gray-600', 'text-green-600');
                    formStatus.classList.add('text-red-600');
                }
            });
        });