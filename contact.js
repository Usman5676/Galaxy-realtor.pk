(() => {
  const form = document.getElementById('contactForm');
  const submitBtn = document.getElementById('contactSubmit');

  function showToast(msg) {
    alert(msg); // آپ اپنی خواہش کے مطابق نماٸش بہتر کر سکتے ہیں
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitBtn.disabled = true;
    submitBtn.innerText = 'Sending...';

    const name = (document.getElementById('name') || {}).value || '';
    const email = (document.getElementById('email') || {}).value || '';
    const phone = (document.getElementById('phone') || {}).value || '';
    const message = (document.getElementById('message') || {}).value || '';

    if (!name || !email || !message) {
      showToast('Please fill required fields.');
      submitBtn.disabled = false;
      submitBtn.innerText = 'Send Message';
      return;
    }

    try {
      const contactsRef = database.ref('contacts'); // root -> contacts
      const newRef = contactsRef.push();
      await newRef.set({
        name,
        email,
        phone,
        message,
        timestamp: Date.now(),
        read: false
      });

      form.reset();
      showToast('Message sent — thank you!');

    } catch (err) {
      console.error('Error saving contact:', err);
      showToast('Error sending message. Try again later.');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerText = 'Send Message';
    }
  });
})();
