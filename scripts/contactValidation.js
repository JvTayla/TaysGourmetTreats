// contactValidation.js - Handles the contact form validation and submission
// This makes sure people fill out the contact form properly and handles file uploads

document.addEventListener("DOMContentLoaded", function () {
  // Where we send the main form data
  const formspreeUrl = "https://formspree.io/f/mnnowkdp";

  // Google Form for file uploads (since Formspree has file size limits)
  const googleFormUrl = "https://forms.gle/mhw3XsNdYy5cuDuXA";

  // Check if GSAP is available for animations
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Find the contact form
  const form = document.getElementById("contactForm");
  if (!form) {
    console.log("Contact form not found");
    return;
  }

  // Wait a bit for other scripts to load
  setTimeout(() => {
    initializeForm();
  }, 100);

  function initializeForm() {
    const nameField = document.getElementById("name");
    const emailField = document.getElementById("email");
    const phoneField = document.getElementById("phone");
    const messageField = document.getElementById("message");
    const fileField = document.getElementById("file");
    const consentField = document.getElementById("consent");
    const submitBtn = document.querySelector(".form-submit");

    // Make sure we have all the required fields
    if (!nameField || !emailField || !messageField || !consentField) {
      console.log("Required form fields not found");
      return;
    }

    // Add some nice animations to the form elements
    if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
      gsap.to(".form-group", {
        opacity: 1,
        y: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: ".contact-form-container",
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      });

      gsap.to(".form-submit", {
        opacity: 1,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.8)",
        scrollTrigger: {
          trigger: ".form-submit",
          start: "top 90%",
          toggleActions: "play none none reverse",
        },
      });
    }

    // Create a progress bar to show form completion
    const progressContainer = document.createElement("div");
    progressContainer.className = "progress-container";
    progressContainer.innerHTML = `
      <div class="progress-bar">
        <div class="progress-fill"></div>
      </div>
      <div class="progress-text">
        Form Completion: <span id="progress-value">0%</span>
      </div>
    `;

    // Create a message element for success/error messages
    const messageElement = document.createElement("div");
    messageElement.id = "form-message";
    messageElement.className = "form-message";

    // Insert the new elements before the submit button
    if (submitBtn) {
      form.insertBefore(progressContainer, submitBtn);
      form.insertBefore(messageElement, submitBtn);
    }

    // Get references to our new elements
    const progressFill = document.querySelector(".progress-fill");
    const progressValue = document.getElementById("progress-value");

    // Track progress for required fields
    const requiredFields = [nameField, emailField, messageField, consentField];
    const totalFields = requiredFields.length;

    let completedFields = 0;
    updateProgress();

    // Add error message elements to each form group
    const formGroups = form.querySelectorAll(".form-group, .consent");
    formGroups.forEach((group) => {
      const errorEl = document.createElement("small");
      errorEl.className = "error-message";
      group.appendChild(errorEl);
    });

    // Validation functions - make sure data is actually valid
    const validateName = (value) => /^[A-Z][a-zA-Z\s\-']{1,}$/.test(value);
    const validateEmail = (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    const validatePhone = (value) => value === "" || /^\d{10}$/.test(value);
    const validateMessage = (value) => value.trim().length >= 10;

    // Validate a single field
    function validateField(field) {
      const formGroup = field.closest(".form-group, .consent");
      if (!formGroup) return true;

      const errorEl = formGroup.querySelector(".error-message");
      let isValid = true;
      let errorMessage = "";

      // Clear any previous errors
      formGroup.classList.remove("valid", "invalid");
      if (errorEl) errorEl.textContent = "";

      // Different validation for different field types
      switch (field.type) {
        case "text":
          if (field === nameField) {
            if (!validateName(field.value.trim())) {
              isValid = false;
              errorMessage =
                "Please enter a valid name starting with a capital letter.";
            }
          }
          break;

        case "email":
          if (!validateEmail(field.value.trim())) {
            isValid = false;
            errorMessage = "Please enter a valid email address.";
          }
          break;

        case "tel":
          if (field.value.trim() !== "" && !validatePhone(field.value.trim())) {
            isValid = false;
            errorMessage = "Phone number must be exactly 10 digits.";
          }
          break;

        case "textarea":
          if (!validateMessage(field.value.trim())) {
            isValid = false;
            errorMessage = "Message must be at least 10 characters long.";
          }
          break;

        case "checkbox":
          if (!field.checked) {
            isValid = false;
            errorMessage = "You must consent before submitting.";
          }
          break;
      }

      // Show error or success state
      if (!isValid) {
        formGroup.classList.add("invalid");
        if (errorEl) errorEl.textContent = errorMessage;
      } else {
        formGroup.classList.add("valid");
      }

      return isValid;
    }

    // Update the progress bar as people fill out the form
    function updateProgress() {
      completedFields = 0;

      requiredFields.forEach((field) => {
        if (field.type === "checkbox") {
          if (field.checked) completedFields++;
        } else {
          if (field.value.trim() !== "" && validateField(field)) {
            completedFields++;
          }
        }
      });

      const progressPercentage = Math.round(
        (completedFields / totalFields) * 100
      );

      if (progressFill) {
        progressFill.style.width = `${progressPercentage}%`;

        // Animate the progress bar if GSAP is available
        if (typeof gsap !== "undefined") {
          gsap.to(progressFill, {
            scaleX: progressPercentage / 100,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        // Make the progress bar change colors as it fills
        // White to Dark Pink gradient (#FFFFFF to #FF006E)
        if (progressPercentage === 0) {
          progressFill.style.background = "#FFFFFF";
        } else if (progressPercentage < 25) {
          progressFill.style.background =
            "linear-gradient(90deg, #FFFFFF, #FF91A4)";
        } else if (progressPercentage < 50) {
          progressFill.style.background =
            "linear-gradient(90deg, #FFFFFF, #FF91A4, #FF50A4)";
        } else if (progressPercentage < 75) {
          progressFill.style.background =
            "linear-gradient(90deg, #FFFFFF, #FF91A4, #FF50A4, #FF006E)";
        } else if (progressPercentage < 100) {
          progressFill.style.background =
            "linear-gradient(90deg, #FFFFFF, #FF50A4, #FF006E)";
        } else {
          progressFill.style.background =
            "linear-gradient(90deg, #FFFFFF, #FF006E)";
        }
      }

      if (progressValue) {
        progressValue.textContent = `${progressPercentage}%`;
      }
    }

    // Shake the form when there are errors
    function shakeForm() {
      if (typeof gsap !== "undefined") {
        const shakeTimeline = gsap.timeline();
        shakeTimeline
          .to(form, { x: -10, duration: 0.05, ease: "power1.inOut" })
          .to(form, { x: 10, duration: 0.05, ease: "power1.inOut" })
          .to(form, { x: -8, duration: 0.05, ease: "power1.inOut" })
          .to(form, { x: 8, duration: 0.05, ease: "power1.inOut" })
          .to(form, { x: -5, duration: 0.05, ease: "power1.inOut" })
          .to(form, { x: 5, duration: 0.05, ease: "power1.inOut" })
          .to(form, { x: 0, duration: 0.05, ease: "power1.inOut" });
      } else {
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 400);
      }
    }

    // Show success or error messages
    function showMessage(text, type) {
      if (!messageElement) return;

      messageElement.textContent = text;
      messageElement.className = `form-message ${
        type === "success" ? "message-success" : "message-error"
      }`;

      if (typeof gsap !== "undefined") {
        gsap.fromTo(
          messageElement,
          { opacity: 0, y: -20 },
          { opacity: 1, y: 0, duration: 0.5, ease: "back.out(1.7)" }
        );

        // Auto-hide success messages after a while
        if (type === "success") {
          setTimeout(() => {
            gsap.to(messageElement, {
              opacity: 0,
              y: -20,
              duration: 0.5,
              onComplete: () => {
                messageElement.textContent = "";
                messageElement.className = "form-message";
              },
            });
          }, 8000);
        }
      }
    }

    // Submit the form data to Formspree
    async function submitToFormspree(formData, fileName = null) {
      try {
        showMessage("📤 Sending your message...", "success");

        // Create URLSearchParams instead of FormData to avoid file detection issues
        const params = new URLSearchParams();
        params.append("name", formData.get("name"));
        params.append("email", formData.get("email"));
        params.append("phone", formData.get("phone") || "");
        params.append("message", formData.get("message"));
        params.append("consent", "true");
        params.append(
          "_subject",
          "New Contact Form Submission - Tay's Gourmet Treats"
        );

        // Add file info if they uploaded a file
        if (fileName) {
          params.append(
            "file_note",
            `The user uploaded a file: "${fileName}". Please check the Google Form submissions for this file.`
          );
          params.append("google_form_link", googleFormUrl);
        }

        const response = await fetch(formspreeUrl, {
          method: "POST",
          body: params,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        });

        const result = await response.json();

        if (response.ok) {
          return { success: true, data: result };
        } else {
          throw new Error(result.error || "Form submission failed");
        }
      } catch (error) {
        console.error("Formspree submission error:", error);
        throw error;
      }
    }

    // Real-time validation as people type
    requiredFields.forEach((field) => {
      field.addEventListener("input", () => {
        validateField(field);
        updateProgress();
      });

      field.addEventListener("blur", () => {
        validateField(field);
      });
    });

    // Phone field is optional, but validate if they fill it
    if (phoneField) {
      phoneField.addEventListener("input", () => {
        validateField(phoneField);
      });
    }

    // Handle file selection
    if (fileField) {
      fileField.addEventListener("change", () => {
        if (fileField.files[0]) {
          const fileName = fileField.files[0].name;
          const fileSize = (fileField.files[0].size / (1024 * 1024)).toFixed(2);
          showMessage(
            `📎 File selected: ${fileName} (${fileSize} MB) - You'll be able to upload it after submitting the form`,
            "success"
          );
          setTimeout(() => {
            if (messageElement.textContent.includes("File selected:")) {
              messageElement.textContent = "";
              messageElement.className = "form-message";
            }
          }, 5000);
        }
      });
    }

    // Handle form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let allValid = true;

      // Validate all required fields
      requiredFields.forEach((field) => {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      // Validate optional phone field if filled
      if (
        phoneField &&
        phoneField.value.trim() !== "" &&
        !validateField(phoneField)
      ) {
        allValid = false;
      }

      if (!allValid) {
        showMessage("Please fix the errors above.", "error");
        shakeForm();

        // Scroll to the first error
        const firstError = form.querySelector(".invalid");
        if (firstError && typeof gsap !== "undefined") {
          gsap.to(window, {
            duration: 1,
            scrollTo: {
              y: firstError,
              offsetY: 100,
            },
            ease: "power2.inOut",
          });
        }
        return;
      }

      // Disable the submit button while processing
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const formData = new FormData(form);
        let fileName = null;
        let hasFile = false;

        // Check if they uploaded a file
        if (fileField && fileField.files[0]) {
          const file = fileField.files[0];
          fileName = file.name;
          hasFile = true;
        }

        // Submit to Formspree
        const result = await submitToFormspree(formData, fileName);

        // Show appropriate success message
        if (hasFile) {
          showMessage(
            "✅ Form submitted successfully! Please click the button below to upload your file to our secure Google Form.",
            "success"
          );

          // Create a button to go to the Google Form for file upload
          const googleFormButton = document.createElement("a");
          googleFormButton.href = googleFormUrl;
          googleFormButton.target = "_blank";
          googleFormButton.className = "google-form-button";
          googleFormButton.textContent = "📎 Upload Your File Here";
          googleFormButton.style.cssText = `
            display: block;
            margin: 1rem auto;
            padding: 12px 24px;
            background: linear-gradient(135deg, #FF006E, #FF50A4);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            max-width: 300px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
            box-shadow: 0 4px 15px rgba(255, 0, 110, 0.3);
          `;

          // Add hover effects to the button
          googleFormButton.addEventListener("mouseenter", () => {
            googleFormButton.style.transform = "scale(1.05)";
            googleFormButton.style.boxShadow =
              "0 6px 20px rgba(255, 0, 110, 0.4)";
          });

          googleFormButton.addEventListener("mouseleave", () => {
            googleFormButton.style.transform = "scale(1)";
            googleFormButton.style.boxShadow =
              "0 4px 15px rgba(255, 0, 110, 0.3)";
          });

          // Add the button after the message
          messageElement.appendChild(googleFormButton);
        } else {
          showMessage(
            "✅ Your message has been sent successfully! We'll get back to you soon.",
            "success"
          );
        }

        // Fun little button animation on success
        if (typeof gsap !== "undefined" && submitBtn) {
          gsap.to(submitBtn, {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        }

        // Reset the form
        form.reset();
        completedFields = 0;
        updateProgress();

        // Clear all validation states
        formGroups.forEach((group) => {
          group.classList.remove("valid", "invalid");
          const errorEl = group.querySelector(".error-message");
          if (errorEl) errorEl.textContent = "";
        });
      } catch (error) {
        console.error("Form submission error:", error);
        showMessage(
          "There was a problem sending your message. Please try again later.",
          "error"
        );
      } finally {
        // Re-enable the submit button
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      }
    });

    // Initialize the progress display
    updateProgress();
  }
});
