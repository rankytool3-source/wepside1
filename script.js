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
});
