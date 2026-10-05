// ==========================================================================
// Manju M - Portfolio Interactive JavaScript
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Mobile Hamburger Menu Toggle ---
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navLinks = document.getElementById('navLinks');
    const navItems = document.querySelectorAll('.nav-link');

    if (hamburgerBtn && navLinks) {
        hamburgerBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            hamburgerBtn.classList.toggle('active');
        });

        // Close mobile drawer when any link is clicked
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                navLinks.classList.remove('open');
                hamburgerBtn.classList.remove('active');
            });
        });
    }

    // --- 2. Active Navigation Link on Scroll (ScrollSpy) ---
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollPosition = window.scrollY + 120;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navItems.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);

    // --- 3. Copy to Clipboard Functionality with Toast ---
    const copyBtns = document.querySelectorAll('.copy-email-btn');
    const toast = document.getElementById('toast');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    copyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const email = btn.getAttribute('data-email') || 'manju18022007@gmail.com';
            
            navigator.clipboard.writeText(email).then(() => {
                showToast(`✓ Copied: ${email}`);
            }).catch(() => {
                showToast(`Failed to copy, please manual copy: ${email}`);
            });
        });
    });

    // --- 4. Scroll To Top Button ---
    const scrollTopBtn = document.getElementById('scrollTopBtn');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

});

// --- 5. Contact Form Handler (Direct Mailto Trigger) ---
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const subject = form.subject.value.trim();
    const message = form.message.value.trim();

    const mailtoSubject = encodeURIComponent(`[Portfolio Opportunity] ${subject} - from ${name}`);
    const mailtoBody = encodeURIComponent(
        `Hi Manju,\n\n${message}\n\n---\nSender: ${name}\nEmail: ${email}`
    );

    window.location.href = `mailto:manju18022007@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;
}