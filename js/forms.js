/**
 * Zenith Academy - Forms & Lead Generation Engine
 * Client-side validation, WhatsApp prefill generator, and enquiry submission
 * Aligned with IMPLEMENTATION.md Section 9 & 19
 */

document.addEventListener('DOMContentLoaded', () => {
  initEnquiryForms();
});

function initEnquiryForms() {
  const forms = document.querySelectorAll('form[data-enquiry-form]');
  
  forms.forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      handleFormSubmit(form);
    });

    // Clear validation state on input
    const inputs = form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        input.classList.remove('is-invalid');
      });
    });
  });
}

function handleFormSubmit(form) {
  let isValid = true;

  // Validate Student Name
  const studentNameInput = form.querySelector('[name="studentName"]');
  if (studentNameInput && (!studentNameInput.value.trim() || studentNameInput.value.trim().length < 2)) {
    studentNameInput.classList.add('is-invalid');
    isValid = false;
  }

  // Validate Phone
  const phoneInput = form.querySelector('[name="phoneNumber"]');
  if (phoneInput) {
    const phoneVal = phoneInput.value.replace(/\D/g, '');
    if (phoneVal.length < 10) {
      phoneInput.classList.add('is-invalid');
      isValid = false;
    }
  }

  // Validate Board
  const boardSelect = form.querySelector('[name="board"]');
  if (boardSelect && !boardSelect.value) {
    boardSelect.classList.add('is-invalid');
    isValid = false;
  }

  // Validate Class
  const classSelect = form.querySelector('[name="classLevel"]');
  if (classSelect && !classSelect.value) {
    classSelect.classList.add('is-invalid');
    isValid = false;
  }

  // Validate Consent Checkbox if present
  const consentBox = form.querySelector('[name="consent"]');
  if (consentBox && !consentBox.checked) {
    alert("Please check the consent box to receive course details and demo schedule.");
    isValid = false;
  }

  if (!isValid) {
    if (window.showToast) {
      window.showToast("Please fill in all required fields accurately.", "warning");
    }
    return;
  }

  // Extract Form Data
  const formData = new FormData(form);
  const student = formData.get('studentName') || 'Student';
  const parent = formData.get('parentName') || '';
  const phone = formData.get('phoneNumber') || '';
  const board = formData.get('board') || '';
  const classLvl = formData.get('classLevel') || '';
  const stream = formData.get('stream') || 'Not specified';
  const mode = formData.get('mode') || 'Offline / Online';
  const notes = formData.get('message') || '';

  // Construct structured WhatsApp prefilled message
  const waMessage = 
    `Hello Zenith Academy Admissions Desk,\n` +
    `I would like to book a Free Demo Class / Enquire about admission.\n\n` +
    `• Student: ${student}\n` +
    (parent ? `• Parent/Guardian: ${parent}\n` : '') +
    `• Phone: ${phone}\n` +
    `• Board: ${board}\n` +
    `• Class: ${classLvl}\n` +
    `• Stream: ${stream}\n` +
    `• Preferred Mode: ${mode}\n` +
    (notes ? `• Note: ${notes}\n` : '') +
    `\nPlease confirm the demo batch schedule.`;

  const waUrl = `https://wa.me/919847012345?text=${encodeURIComponent(waMessage)}`;

  // Show Success Feedback
  const submitBtn = form.querySelector('button[type="submit"]');
  const originalText = submitBtn ? submitBtn.innerHTML : 'Submit';
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = 'Enquiry Registered ✓';
  }

  // Close demo modal if open
  const demoModal = document.getElementById('demoModal');
  if (demoModal && demoModal.classList.contains('active')) {
    demoModal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // Open confirmation modal or toast with direct WhatsApp action
  showSubmissionSuccess(student, waUrl);

  // Reset Form
  form.reset();
  setTimeout(() => {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }, 2000);
}

function showSubmissionSuccess(studentName, waUrl) {
  let successModal = document.getElementById('successModal');
  if (!successModal) {
    successModal = document.createElement('div');
    successModal.id = 'successModal';
    successModal.className = 'site-modal';
    successModal.innerHTML = `
      <div class="modal-dialog" style="text-align: center; max-width: 480px;">
        <div style="width: 64px; height: 64px; background: rgba(39, 138, 75, 0.15); color: var(--color-success); border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; margin: 0 auto 20px;">✓</div>
        <h3 style="font-size: 1.6rem; margin-bottom: 12px; color: #121310;">Thank You, <span id="successStudentName">${studentName}</span>!</h3>
        <p style="color: #55574F; margin-bottom: 24px; font-size: 0.98rem; line-height: 1.6;">
          Your demo class request has been registered. Our academic coordinator will contact you within 2 hours.
        </p>
        <div style="background: #F7F6F0; border-radius: var(--radius-md); padding: 16px; margin-bottom: 24px; text-align: left;">
          <strong style="color: #121310; display: block; margin-bottom: 4px; font-size: 0.9rem;">Need an immediate slot confirmation?</strong>
          <span style="font-size: 0.85rem; color: #666;">Connect directly with our admissions counselor on WhatsApp.</span>
        </div>
        <div style="display: flex; flex-direction: column; gap: 10px;">
          <a id="successWaLink" href="${waUrl}" target="_blank" class="btn btn-whatsapp btn-block">
            Continue on WhatsApp 💬
          </a>
          <button class="btn btn-secondary btn-block" onclick="document.getElementById('successModal').classList.remove('active'); document.body.style.overflow='';">
            Close
          </button>
        </div>
      </div>
    `;
    document.body.appendChild(successModal);

    successModal.addEventListener('click', (e) => {
      if (e.target === successModal) {
        successModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  } else {
    document.getElementById('successStudentName').textContent = studentName;
    document.getElementById('successWaLink').href = waUrl;
  }

  successModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}
