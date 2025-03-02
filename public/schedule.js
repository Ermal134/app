document.addEventListener('DOMContentLoaded', function() {
  const calendar = document.getElementById('calendar');
  const timeSlots = document.getElementById('time-slots');
  const bookingForm = document.getElementById('booking-form');
  const bookingConfirmation = document.getElementById('booking-confirmation');

  if (calendar) {
      calendar.addEventListener('click', function() {
      toggleVisibilityBasedOnChildren('time-slots');
      toggleVisibilityBasedOnChildren('booking-confirmation');
    });
  }
  bookingForm.addEventListener('input', updateBookingConfirmation);

  function updateBookingConfirmation() {
    const fullName = document.getElementById('fullName').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    bookingConfirmation.innerHTML = `
      <p><strong>Name:</strong> ${fullName || 'Not provided'}</p>
      <p><strong>Phone:</strong> ${phone || 'Not provided'}</p>
      <p><strong>Email:</strong> ${email || 'Not provided'}</p>
      <p><strong>Address:</strong> ${address || 'Not provided'}</p>
    `;
  }
});

function toggleVisibilityBasedOnChildren(elementId) {
  const element = document.getElementById(elementId);
    element.style.display = 'block';
}
