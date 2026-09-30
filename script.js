const form = document.getElementById("contactForm");
const successMessage = document.getElementById("successMessage");

// Get fields
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const email = document.getElementById("email");
const message = document.getElementById("message");
const consent = document.getElementById("consent");

const queryField = document.querySelector(".query-field");
const queryOptions = document.querySelectorAll('input[name="queryType"]');

form.addEventListener("submit", function (event) {
  event.preventDefault();

  let isValid = true;

  // Clear previous errors
  document.querySelectorAll(".invalid").forEach((element) => {
    element.classList.remove("invalid");
  });

  successMessage.classList.remove("show");

  // First name
  if (firstName.value.trim() === "") {
    showError(firstName, "This field is required");
    isValid = false;
  }

  // Last name
  if (lastName.value.trim() === "") {
    showError(lastName, "This field is required");
    isValid = false;
  }

  // Email
  if (email.value.trim() === "") {
    showError(email, "This field is required");
    isValid = false;
  } else if (!isValidEmail(email.value)) {
    showError(email, "Please enter a valid email address");
    isValid = false;
  }

  // Query type
  const querySelected = [...queryOptions].some((option) => option.checked);

  if (!querySelected) {
    queryField.classList.add("invalid");
    queryOptions.forEach((option) => {
      option.setAttribute("aria-invalid", "true");
    });
    isValid = false;
  }

  // Message
  if (message.value.trim() === "") {
    showError(message, "This field is required");
    isValid = false;
  }

  // Consent
  if (!consent.checked) {
    const consentContainer = consent.closest(".consent");
    consentContainer.classList.add("invalid");

    isValid = false;
  }

  // Submit
  if (isValid) {
    form.reset();
    document.querySelectorAll("[aria-invalid]").forEach((input) => {
      input.setAttribute("aria-invalid", "false");
    });

    successMessage.classList.remove("hide");
    successMessage.classList.add("show");
    successMessage.setAttribute("aria-hidden", "hidden");

    setTimeout(() => {
      successMessage.classList.remove("show");
      successMessage.classList.add("hide");
      successMessage.setAttribute("aria-hidden", "true");
    }, 4000);
  }
});

function showError(input, message) {
  const formGroup = input.closest(".form-group");

  formGroup.classList.add("invalid");
  input.setAttribute("aria-invalid", "true");

  const error = formGroup.querySelector(".error");

  if (error) {
    error.textContent = message;
  }
}

function isValidEmail(email) {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  return emailPattern.test(email);
}

// First Name
firstName.addEventListener("input", () => {
  if (firstName.value.trim() !== "") {
    clearError(firstName);
  }
});

// Last Name
lastName.addEventListener("input", () => {
  if (lastName.value.trim() !== "") {
    clearError(lastName);
  }
});

// Email
email.addEventListener("input", function () {
  const value = email.value.trim();

  if (value === "") {
    return;
  }

  if (isValidEmail(value)) {
    clearError(email);
  }
});

// Message
message.addEventListener("input", () => {
  if (message.value.trim() !== "") {
    clearError(message);
  }
});

// Query Type
queryOptions.forEach((option) => {
  option.addEventListener("change", function () {
    if (option.checked) {
      queryField.classList.remove("invalid");

      queryOptions.forEach((radio) => {
        radio.setAttribute("aria-invalid", "false");
      });
    }
  });
});

// Consent
consent.addEventListener("change", () => {
  if (consent.checked) {
    consent.closest(".consent").classList.remove("invalid");
  }
});

function clearError(input) {
  const formGroup = input.closest(".form-group");

  formGroup.classList.remove("invalid");
  input.setAttribute("aria-invalid", "false");

  const error = formGroup.querySelector(".error");

  if (error) {
    error.textContent = "";
  }
}
