/**
 * WS Store - WhatsApp Integration & Service Booking Script
 * Default WhatsApp Phone: 0332 4013881 (International: +923324013881)
 */

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phoneInput');
    const updatePhoneBtn = document.getElementById('updatePhoneBtn');
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');

    /**
     * Cleans non-numeric characters and formats Pakistani local numbers (03xx...) to international format (923xx...)
     */
    function getCleanPhone(phoneStr) {
        let clean = (phoneStr || '').replace(/[^0-9]/g, '');
        if (clean.startsWith('03') && clean.length === 11) {
            clean = '92' + clean.slice(1);
        }
        return clean || '923324013881';
    }

    /**
     * Updates all WhatsApp buttons on the page with WS Store pre-filled messages
     */
    function updateWhatsAppLinks() {
        const cleanPhone = getCleanPhone(phoneInput.value || '03324013881');

        whatsappButtons.forEach(btn => {
            const serviceName = btn.getAttribute('data-service-name') || 'Subscription';

            // Construct customized WhatsApp inquiry message for WS Store
            const message = `Hello WS Store! I want to buy ${serviceName}. Please share details and activation instructions.`;

            // Encode message safely for URL query string
            const encodedMessage = encodeURIComponent(message);

            // Construct direct WhatsApp URL (wa.me)
            const waUrl = `https://wa.me/${cleanPhone}?text=${encodedMessage}`;

            // Set button href attribute
            btn.setAttribute('href', waUrl);
        });
    }

    // Initialize links on page load
    updateWhatsAppLinks();

    // Event Listener: Update links when user edits phone input
    phoneInput.addEventListener('input', () => {
        updateWhatsAppLinks();
    });

    if (updatePhoneBtn) {
        updatePhoneBtn.addEventListener('click', () => {
            updateWhatsAppLinks();
            // Visual feedback on save
            const icon = updatePhoneBtn.querySelector('i');
            if (icon) {
                icon.className = 'fa-solid fa-thumbs-up';
                setTimeout(() => {
                    icon.className = 'fa-solid fa-check';
                }, 1200);
            }
        });
    }

    // Console log when buttons are clicked
    whatsappButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const currentHref = btn.getAttribute('href');
            console.log('WS Store opening WhatsApp:', currentHref);
        });
    });

    /* ==========================================================================
       HACKED / SYSTEM ERROR GLITCH OVERLAY CONTROLLER
       ========================================================================== */
    function initHackedGlitchOverlay() {
        const hackedOverlay = document.getElementById('hackedOverlay');
        const glitchGrid = document.getElementById('glitchGrid');
        const glitchStrips = document.getElementById('glitchStrips');
        const toggleSystemBtn = document.getElementById('toggleSystemBtn');

        if (!hackedOverlay || !glitchGrid) return;

        // 1. Generate Colorful Glitch Box Grid
        const boxTypes = ['type-red', 'type-white', 'type-red', 'type-white', 'type-cyan', 'type-magenta', 'type-yellow', 'type-darkred'];
        const totalBoxes = Math.max(48, Math.floor((window.innerWidth * window.innerHeight) / 12000));
        
        glitchGrid.innerHTML = '';
        const boxes = [];

        for (let i = 0; i < totalBoxes; i++) {
            const box = document.createElement('div');
            const randomType = boxTypes[Math.floor(Math.random() * boxTypes.length)];
            box.className = `bg-glitch-box ${randomType}`;
            box.style.animationDelay = `${(Math.random() * 2).toFixed(2)}s`;
            box.style.animationDuration = `${(0.4 + Math.random() * 1.5).toFixed(2)}s`;
            glitchGrid.appendChild(box);
            boxes.push(box);
        }

        // Rapid color & size shift loop for high-energy visual glitch
        setInterval(() => {
            if (!hackedOverlay.classList.contains('active')) return;
            const randomIdx = Math.floor(Math.random() * boxes.length);
            const targetBox = boxes[randomIdx];
            if (targetBox) {
                const newType = boxTypes[Math.floor(Math.random() * boxTypes.length)];
                targetBox.className = `bg-glitch-box ${newType}`;
                targetBox.style.transform = `scale(${(0.8 + Math.random() * 0.5).toFixed(2)}) translate(${Math.floor(Math.random()*10 - 5)}px, ${Math.floor(Math.random()*10 - 5)}px)`;
            }
        }, 80);

        // 2. Generate Animated Strip Stream
        if (glitchStrips) {
            glitchStrips.innerHTML = '';
            const stripColors = ['#ff0033', '#ffffff', '#00f0ff', '#ff007f', '#ffe600', '#00ff66'];
            for (let i = 0; i < 20; i++) {
                const strip = document.createElement('div');
                strip.className = 'glitch-strip';
                strip.style.background = stripColors[Math.floor(Math.random() * stripColors.length)];
                glitchStrips.appendChild(strip);
            }

            setInterval(() => {
                if (!hackedOverlay.classList.contains('active')) return;
                const strips = glitchStrips.children;
                for (let s of strips) {
                    s.style.background = stripColors[Math.floor(Math.random() * stripColors.length)];
                }
            }, 120);
        }

        // 3. Floating Quick Toggle Button
        const floatingBtn = document.createElement('button');
        floatingBtn.className = 'restore-floating-btn';
        floatingBtn.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> LOCK / GLITCH SCREEN';
        floatingBtn.style.display = 'none';
        document.body.appendChild(floatingBtn);

        // Toggle functions
        function disableGlitchScreen() {
            hackedOverlay.classList.remove('active');
            floatingBtn.style.display = 'flex';
        }

        function enableGlitchScreen() {
            hackedOverlay.classList.add('active');
            floatingBtn.style.display = 'none';
        }

        if (toggleSystemBtn) {
            toggleSystemBtn.addEventListener('click', disableGlitchScreen);
        }

        floatingBtn.addEventListener('click', enableGlitchScreen);

        // Add interactive box explosion on overlay click
        hackedOverlay.addEventListener('click', (e) => {
            if (e.target.closest('#toggleSystemBtn')) return;
            const clickBox = document.createElement('div');
            clickBox.className = 'bg-glitch-box type-white';
            clickBox.style.position = 'fixed';
            clickBox.style.left = `${e.clientX - 30}px`;
            clickBox.style.top = `${e.clientY - 30}px`;
            clickBox.style.width = '60px';
            clickBox.style.height = '60px';
            clickBox.style.zIndex = '9999999';
            clickBox.style.boxShadow = '0 0 40px #ff0033, 0 0 60px #ffffff';
            clickBox.style.pointerEvents = 'none';
            clickBox.style.transition = 'all 0.4s ease-out';
            document.body.appendChild(clickBox);

            setTimeout(() => {
                clickBox.style.transform = 'scale(3)';
                clickBox.style.opacity = '0';
            }, 20);

            setTimeout(() => {
                clickBox.remove();
            }, 450);
        });
    }

    initHackedGlitchOverlay();
});
