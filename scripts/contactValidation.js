document.addEventListener("DOMContentLoaded", function () {
  // Formspree configuration for main form data
  const formspreeUrl = 'https://formspree.io/f/mnnowkdp';
  
  // Your Google Form for file uploads
  const googleFormUrl = 'https://forms.gle/mhw3XsNdYy5cuDuXA';

  // Check if GSAP is available
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
  }

  // Form elements
  const form = document.getElementById("contactForm");
  if (!form) {
    console.log('Contact form not found');
    return;
  }

  // Wait a bit for nav.js to load
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

    if (!nameField || !emailField || !messageField || !consentField) {
      console.log('Required form fields not found');
      return;
    }

    // ScrollTrigger Animation for form elements
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

    // Create progress bar elements
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

    // Create message element
    const messageElement = document.createElement("div");
    messageElement.id = "form-message";
    messageElement.className = "form-message";

    // Insert elements before submit button
    if (submitBtn) {
      form.insertBefore(progressContainer, submitBtn);
      form.insertBefore(messageElement, submitBtn);
    }

    // Get references to new elements
    const progressFill = document.querySelector(".progress-fill");
    const progressValue = document.getElementById("progress-value");

    // Required fields for progress tracking
    const requiredFields = [nameField, emailField, messageField, consentField];
    const totalFields = requiredFields.length;

    let completedFields = 0;
    updateProgress();

    // Add error message elements
    const formGroups = form.querySelectorAll(".form-group, .consent");
    formGroups.forEach((group) => {
      const errorEl = document.createElement("small");
      errorEl.className = "error-message";
      group.appendChild(errorEl);
    });

    // Validation functions
    const validateName = (value) => /^[A-Z][a-zA-Z\s\-']{1,}$/.test(value);
    const validateEmail = (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
    const validatePhone = (value) => value === "" || /^\d{10}$/.test(value);
    const validateMessage = (value) => value.trim().length >= 10;

    // Validate individual field
    function validateField(field) {
      const formGroup = field.closest(".form-group, .consent");
      if (!formGroup) return true;

      const errorEl = formGroup.querySelector(".error-message");
      let isValid = true;
      let errorMessage = "";

      formGroup.classList.remove("valid", "invalid");
      if (errorEl) errorEl.textContent = "";

      switch (field.type) {
        case "text":
          if (field === nameField) {
            if (!validateName(field.value.trim())) {
              isValid = false;
              errorMessage = "Please enter a valid name starting with a capital letter.";
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

      if (!isValid) {
        formGroup.classList.add("invalid");
        if (errorEl) errorEl.textContent = errorMessage;
      } else {
        formGroup.classList.add("valid");
      }

      return isValid;
    }

    // Update progress tracking
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

        if (typeof gsap !== "undefined") {
          gsap.to(progressFill, {
            scaleX: progressPercentage / 100,
            duration: 0.5,
            ease: "power2.out",
          });
        }

        if (progressPercentage < 30) {
          progressFill.style.background = "#634321";
        } else if (progressPercentage < 70) {
          progressFill.style.background = "#e67c3a";
        } else {
          progressFill.style.background = "#ed6a18";
        }
      }

      if (progressValue) {
        progressValue.textContent = `${progressPercentage}%`;
      }
    }

    // Shake animation for form
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

    // Show message function
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

    // Submit to Formspree with file reference
    async function submitToFormspree(formData, fileName = null) {
      try {
        showMessage("📤 Sending your message...", "success");
        
        // Create URLSearchParams instead of FormData to avoid file detection
        const params = new URLSearchParams();
        params.append('name', formData.get('name'));
        params.append('email', formData.get('email'));
        params.append('phone', formData.get('phone') || '');
        params.append('message', formData.get('message'));
        params.append('consent', 'true');
        params.append('_subject', 'New Contact Form Submission - Tay\'s Gourmet Treats');
        
        // Add file info if exists
        if (fileName) {
          params.append('file_note', `The user uploaded a file: "${fileName}". Please check the Google Form submissions for this file.`);
          params.append('google_form_link', googleFormUrl);
        }

        const response = await fetch(formspreeUrl, {
          method: 'POST',
          body: params,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        });

        const result = await response.json();

        if (response.ok) {
          return { success: true, data: result };
        } else {
          throw new Error(result.error || 'Form submission failed');
        }
      } catch (error) {
        console.error('Formspree submission error:', error);
        throw error;
      }
    }

    // Event listeners for real-time validation
    requiredFields.forEach((field) => {
      field.addEventListener("input", () => {
        validateField(field);
        updateProgress();
      });

      field.addEventListener("blur", () => {
        validateField(field);
      });
    });

    // Phone field (optional)
    if (phoneField) {
      phoneField.addEventListener("input", () => {
        validateField(phoneField);
      });
    }

    // File field change listener
    if (fileField) {
      fileField.addEventListener("change", () => {
        if (fileField.files[0]) {
          const fileName = fileField.files[0].name;
          const fileSize = (fileField.files[0].size / (1024 * 1024)).toFixed(2);
          showMessage(`📎 File selected: ${fileName} (${fileSize} MB) - You'll be able to upload it after submitting the form`, "success");
          setTimeout(() => {
            if (messageElement.textContent.includes('File selected:')) {
              messageElement.textContent = "";
              messageElement.className = "form-message";
            }
          }, 5000);
        }
      });
    }

    // Form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      let allValid = true;

      // Validate all required fields
      requiredFields.forEach((field) => {
        if (!validateField(field)) {
          allValid = false;
        }
      });

      // Validate optional phone field
      if (phoneField && phoneField.value.trim() !== "" && !validateField(phoneField)) {
        allValid = false;
      }

      if (!allValid) {
        showMessage("Please fix the errors above.", "error");
        shakeForm();

        // Scroll to first error
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

      // Submit form
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
      }

      try {
        const formData = new FormData(form);
        let fileName = null;
        let hasFile = false;

        // Check if file exists
        if (fileField && fileField.files[0]) {
          const file = fileField.files[0];
          fileName = file.name;
          hasFile = true;
        }

        // Submit form data to Formspree
        const result = await submitToFormspree(formData, fileName);

        // Show appropriate success message
        if (hasFile) {
          showMessage("✅ Form submitted successfully! Please click the button below to upload your file to our secure Google Form.", "success");
          
          // Create and show Google Form button
          const googleFormButton = document.createElement('a');
          googleFormButton.href = googleFormUrl;
          googleFormButton.target = '_blank';
          googleFormButton.className = 'google-form-button';
          googleFormButton.textContent = '📎 Upload Your File Here';
          googleFormButton.style.cssText = `
            display: block;
            margin: 1rem auto;
            padding: 12px 24px;
            background: linear-gradient(135deg, #4285f4, #34a853);
            color: white;
            border: none;
            border-radius: 8px;
            font-size: 16px;
            font-weight: bold;
            cursor: pointer;
            text-decoration: none;
            text-align: center;
            max-width: 300px;
            transition: transform 0.3s ease;
          `;
          
          googleFormButton.addEventListener('mouseenter', () => {
            googleFormButton.style.transform = 'scale(1.05)';
          });
          
          googleFormButton.addEventListener('mouseleave', () => {
            googleFormButton.style.transform = 'scale(1)';
          });

          // Add button after the message
          messageElement.appendChild(googleFormButton);
          
        } else {
          showMessage("✅ Your message has been sent successfully! We'll get back to you soon.", "success");
        }

        if (typeof gsap !== "undefined" && submitBtn) {
          gsap.to(submitBtn, {
            scale: 1.1,
            duration: 0.3,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          });
        }

        // Reset form
        form.reset();
        completedFields = 0;
        updateProgress();

        // Clear validation states
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
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = "Send Message";
        }
      }
    });

    // Initialize progress
    updateProgress();
  }
});