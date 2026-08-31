/**
 * WS Store - WhatsApp Integration & Service Booking Script
 */

document.addEventListener('DOMContentLoaded', () => {
    const phoneInput = document.getElementById('phoneInput');
    const updatePhoneBtn = document.getElementById('updatePhoneBtn');
    const whatsappButtons = document.querySelectorAll('.whatsapp-btn');

    /**
     * Cleans non-numeric characters for WhatsApp API link format
     */
    function getCleanPhone(phoneStr) {
        return phoneStr.replace(/[^0-9]/g, '');
    }

    /**
     * Updates all WhatsApp buttons on the page with WS Store pre-filled messages
     */
    function updateWhatsAppLinks() {
        const cleanPhone = getCleanPhone(phoneInput.value || '15552345678');

        whatsappButtons.forEach(btn => {
            const serviceName = btn.getAttribute('data-service-name') || 'Subscription';
            const price = btn.getAttribute('data-price') || '';

            // Construct customized WhatsApp inquiry message for WS Store
            const message = `Hello WS Store! I want to buy ${serviceName} (${price}). Please share payment details and activation instructions.`;

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
