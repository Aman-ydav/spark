const images = document.querySelectorAll(".carousel-image");
let currentIndex = 0;

setInterval(() => {
  images[currentIndex].classList.remove("active");
  currentIndex = (currentIndex + 1) % images.length;
  images[currentIndex].classList.add("active");
}, 3000);

const urlParams = new URLSearchParams(window.location.search);
const errorMessage = urlParams.get("error");

if (errorMessage) {
  document.getElementById("error-message").textContent = errorMessage;
  document.getElementById("error-message").style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registrationForm");
  const errorMessage = document.getElementById("error-message");

  form.addEventListener("submit", async (event) => {
      event.preventDefault(); // Prevent default form submission

      // Gather form data
      const formData = new FormData(form);
      const data = {};
      formData.forEach((value, key) => {
          if (!data[key]) {
              data[key] = value;
          } else {
              // Handle multiple checkbox values
              if (!Array.isArray(data[key])) {
                  data[key] = [data[key]];
              }
              data[key].push(value);
          }
      });

      try {
          const response = await fetch("/submit", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(data),
          });

          if (!response.ok) {
              const result = await response.json();
              errorMessage.textContent = result.error || "An unknown error occurred.";
              errorMessage.style.display = "block";
              return;
          }

          // On successful submission
          const result = await response.json();
          alert(result.message || "Form submitted successfully!");
          form.reset(); // Reset the form
          errorMessage.style.display = "none"; // Hide error message
      } catch (err) {
          errorMessage.textContent = "Something went wrong. Please try again later.";
          errorMessage.style.display = "block";
      }
  });
});

