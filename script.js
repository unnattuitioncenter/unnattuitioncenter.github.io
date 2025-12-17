document.addEventListener('DOMContentLoaded', () => {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');

        // Hamburger animation toggle (simple lines color change or rotation could be added here)
        hamburger.classList.toggle('toggle');
    });

    // Close mobile menu when clicking a link
    links.forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('toggle');
        });
    });

    // Smooth Scrolling for Safari/Edge older versions fallback
    // (CSS scroll-behavior handles most, this is just a backup/enhancement for custom offsets if needed)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Offset for fixed header
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // Animate numbers in stats section (Simple implementation)
    const statsSection = document.querySelector('.stats');
    let animated = false;

    window.addEventListener('scroll', () => {
        if (!animated && statsSection) {
            const sectionPos = statsSection.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.3;

            if (sectionPos < screenPos) {
                // Could add number counting animation class here
                animated = true;
            }
        }
    });

    // --- INSTANT QUOTE CALCULATOR LOGIC ---
    const serviceSelect = document.getElementById('serviceType');
    const checkboxes = document.querySelectorAll('.calc-addon');
    const totalDisplay = document.getElementById('totalPrice');
    const bookBtn = document.getElementById('bookPriceBtn');

    if (serviceSelect) {
        function calculateTotal() {
            let total = parseInt(serviceSelect.value);
            let serviceName = serviceSelect.options[serviceSelect.selectedIndex].text;

            checkboxes.forEach(box => {
                if (box.checked) {
                    total += parseInt(box.value);
                }
            });

            // Format as currency
            const formattedTotal = '₹' + total.toLocaleString('en-IN');

            // Update Display
            totalDisplay.textContent = formattedTotal;

            // Animation effect
            totalDisplay.style.transform = "scale(1.1)";
            setTimeout(() => totalDisplay.style.transform = "scale(1)", 200);

            // Update WhatsApp Link
            const message = `Hi Unnat Digital, I used your calculator. I am interested in ${serviceName}. Estimated budget is ${formattedTotal}. Can we discuss?`;
            const waLink = `https://wa.me/918307264895?text=${encodeURIComponent(message)}`;
            bookBtn.href = waLink;
        }

        // Event Listeners
        serviceSelect.addEventListener('change', calculateTotal);
        checkboxes.forEach(box => box.addEventListener('change', calculateTotal));

        // Initial Calculation
        calculateTotal();
    }
});

// --- GLOBAL FORM HANDLERS ---

// Tuition Center Form
function sendToWhatsapp(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const msg = document.getElementById('msg').value;

    const whatsappMsg = `*New Tuition Enquiry* 🎓%0A%0AName: ${name}%0APhone: ${phone}%0AMessage: ${msg}`;
    window.open(`https://wa.me/918307264895?text=${whatsappMsg}`, '_blank');
}

// Digital Agency Form
function sendDigitalEnquiry(e) {
    e.preventDefault();
    const name = document.getElementById('d-name').value;
    const biz = document.getElementById('d-biz').value;
    const msg = document.getElementById('d-msg').value;

    const whatsappMsg = `*New Digital Project Lead* 🚀%0A%0AClient: ${name}%0ABusiness: ${biz}%0ARequirement: ${msg}`;
    window.open(`https://wa.me/918307264895?text=${whatsappMsg}`, '_blank');
}

// Quick Inquiry Form (Hero Section)
function sendQuickEnquiry(e) {
    e.preventDefault();
    const name = document.getElementById('q-name').value;
    const phone = document.getElementById('q-phone').value;
    const course = document.getElementById('q-course').value || "Not Selected";
    const msg = document.getElementById('q-msg').value;

    const whatsappMsg = `*Quick Website Inquiry* ⚡%0A%0AName: ${name}%0APhone: ${phone}%0ACourse Interest: ${course}%0AMessage: ${msg}`;
    window.open(`https://wa.me/918307264895?text=${whatsappMsg}`, '_blank');
}
