document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("collegeForm");
  const submitBtn = form.querySelector("button[type='submit']");
  const toastContainer = document.getElementById("toastContainer");

  // Toast function
  function showToast(type, text) {
    const toast = document.createElement("div");
    toast.className = `toast ${type}`;
    toast.innerText = text;
    toastContainer.appendChild(toast);

    setTimeout(() => {
      toast.classList.add("fade-out");
      setTimeout(() => toast.remove(), 500);
    }, 3000);
  }

  // Validation
  function validate(formData) {
    const errors = {};

    if (!formData.fullname || formData.fullname.length < 3) {
      errors.fullname = "Full name must be at least 3 characters";
    }
    if (!formData.dob) {
      errors.dob = "Please select your date of birth";
    }
    if (!formData.gender) {
      errors.gender = "Please select gender";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Enter a valid email";
    }
    if (!/^[0-9]{11}$/.test(formData.phone)) {
      errors.phone = "Enter a valid 11-digit phone number";
    }
    if (!formData.address || formData.address.length < 5) {
      errors.address = "Enter a valid address";
    }
    if (!formData.qualification) {
      errors.qualification = "Select your last qualification";
    }
    if (formData.marks < 0 || formData.marks > 100 || formData.marks === "") {
      errors.marks = "Enter marks/percentage between 0 and 100";
    }
    if (!formData.program) {
      errors.program = "Select a program";
    }
    if (!formData.photo) {
      errors.photo = "Please upload your photo";
    }
    if (!formData.transcript) {
      errors.transcript = "Please upload your transcript";
    }
    if (!formData.agree) {
      errors.agree = "You must confirm the information is correct";
    }

    return errors;
  }

  // Submit event
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const formData = {
      fullname: form.fullname.value.trim(),
      dob: form.dob.value,
      gender: form.gender.value,
      email: form.email.value.trim(),
      phone: form.phone.value.trim(),
      address: form.address.value.trim(),
      qualification: form.qualification.value,
      marks: form.marks.value,
      program: form.program.value,
      photo: form.photo.files[0],
      transcript: form.transcript.files[0],
      agree: form.agree.checked,
    };

    // Clear old errors
    form.querySelectorAll(".error").forEach((el) => (el.innerText = ""));

    // Validate
    const errors = validate(formData);
    if (Object.keys(errors).length > 0) {
      for (let key in errors) {
        const field = form.querySelector(`[name="${key}"]`);
        if (field) {
          field.nextElementSibling.innerText = errors[key];
        }
      }
      showToast("error", "Please fix the errors first.");
      return;
    }

    // Loading simulation
    submitBtn.disabled = true;
    submitBtn.innerText = "Submitting...";

    setTimeout(() => {
      showToast("success", "Application submitted successfully!");
      form.reset();
      submitBtn.disabled = false;
      submitBtn.innerText = "Submit Application";
    }, 1500);
  });
});


fetch("Navbar.html")
  .then(response => {
    if (!response.ok) throw new Error("Navbar not found!");
    return response.text();
  })
  .then(data => {
    document.getElementById("navbar").innerHTML = data;
    console.log("Navbar loaded successfully!");
  })
  .catch(err => console.error("Error loading navbar:", err));

fetch("Footer.html")
  .then(response => {
    if (!response.ok) throw new Error("Footer not found!");
    return response.text();
  })
  .then(data => {
    document.getElementById("footer").innerHTML = data;
  })
  .catch(err => console.error("Error loading footer:", err));