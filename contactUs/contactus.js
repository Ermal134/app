document.getElementById('contact-form').addEventListener('submit', function(event) {
  const phoneInput = document.getElementById('phNumber');
  const phonePattern = /^[0-9]{10}$/;

  if (!phonePattern.test(phoneInput.value)) {
      alert('Please enter a valid 10-digit phone number.');
      event.preventDefault();
  }
});

function validateForm() {
  let userName = document.getElementById("name").value;
  let userEmail = document.getElementById("email").value;

  let nameRegex = /^[a-zA-Z\s]+$/; // Allows letters and spaces
  let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format

  if (!nameRegex.test(userName)) {
    document.getElementById("name").value = "";
    alert("Please use correct name information!");
    return false;
  }

  if (!emailRegex.test(userEmail)) {
    document.getElementById("email").value = "";
    alert("Please use a correct email format!");
    return false;
  }

  return true;
}

document.getElementById('phNumber').addEventListener('input', function (e) {
  this.value = this.value.replace(/[^0-9]/g, '');
});