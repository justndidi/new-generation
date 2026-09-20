const btn = document.querySelector(".button");
const content = document.querySelector(".alte-hidden");

btn.addEventListener("click", () => {
  if (content.style.display == "none") {
    content.style.display = "block";
    btn.textContent = "close x";
  } else {
    content.style.display = "none";
    btn.textContent = "read more";
  }
});

//second genre type
const btn_2 = document.querySelector(".button_2");
const content_2 = document.querySelector(".naija-hidden");
btn_2.addEventListener("click", () => {
  if (content_2.style.display == "none") {
    content_2.style.display = "block";
    btn_2.textContent = "close x";
  } else {
    content_2.style.display = "none";
    btn_2.textContent = "read more";
  }
});

//third genre type
const btn_3 = document.querySelector(".button_3");
const content_3 = document.querySelector(".hidden");
btn_3.addEventListener("click", () => {
  if (content_3.style.display == "none") {
    content_3.style.display = "block";
    btn_3.textContent = "close x";
  } else {
    content_3.style.display = "none";
    btn_3.textContent = "read more";
  }
});

//fourth genre type
const btn_4 = document.querySelector(".button_4");
const content_4 = document.querySelector(".hidden-1");
btn_4.addEventListener("click", () => {
  if (content_4.style.display == "none") {
    content_4.style.display = "block";
    btn_4.textContent = "close x";
  } else {
    content_4.style.display = "none";
    btn_4.textContent = "read more";
  }
});

//fifth genre type
const btn_5 = document.querySelector(".button_5");
const content_5 = document.querySelector(".hidden-2");
btn_5.addEventListener("click", () => {
  if (content_5.style.display == "none") {
    content_5.style.display = "block";
    btn_5.textContent = "close x";
  } else {
    content_5.style.display = "none";
    btn_5.textContent = "read more";
  }
});

//sixth genre type
const btn_6 = document.querySelector(".button_6");
const content_6 = document.querySelector(".hidden-3");
btn_6.addEventListener("click", () => {
  if (content_6.style.display == "none") {
    content_6.style.display = "block";
    btn_6.textContent = "close x";
  } else {
    content_6.style.display = "none";
    btn_6.textContent = "read more";
  }
});

const form = document.getElementById("form");
const successMessage = document.getElementById("successMessage");
const welcomeText = document.getElementById("welcomeText");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = document.getElementById("name").value.trim();
  const emailInput = document.getElementById("email");
  const email = emailInput.value.trim();
  const role = document.getElementById("role").value;

  // Check email format before sending to backend
  if (!emailInput.checkValidity()) {
    emailInput.reportValidity();
    return;
  }

  try {
    const response = await fetch(`${API_URL}/api/subscribe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: name,
        email: email,
        role: role,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      console.log(data);

      // Hide form
      form.style.display = "none";

      // Show success message
      successMessage.classList.add("show");

      welcomeText.textContent = `Welcome to the wave, ${name}. You're officially part of NewGen.`;

      // Bring form back after 5 seconds
      setTimeout(() => {
        successMessage.classList.remove("show");
        form.style.display = "flex";
        form.reset();
      }, 5000);
    } else {
      // Backend errors such as duplicate email
      alert(data.message || "Something went wrong.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Unable to connect to the server.");
  }
});
// ==========================================
// ARTIST SUBMISSION
// ==========================================

const artistForm = document.getElementById("artistForm");

const artistMessage = document.getElementById("artistMessage");

if (artistForm) {
  artistForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const artistNameInput = document.getElementById("artistNameInput");

    const artistGenreInput = document.getElementById("artistGenreInput");

    const artistLocationInput = document.getElementById("artistLocationInput");

    const artistMusicLinkInput = document.getElementById(
      "artistMusicLinkInput",
    );

    const artistEmailInput = document.getElementById("artistEmailInput");

    // Get values
    const artistName = artistNameInput.value.trim();

    const genre = artistGenreInput.value.trim();

    const location = artistLocationInput.value.trim();

    const musicLink = artistMusicLinkInput.value.trim();

    const email = artistEmailInput.value.trim();

    // Check music link
    if (!artistMusicLinkInput.checkValidity()) {
      artistMusicLinkInput.reportValidity();

      return;
    }

    // Check email
    if (!artistEmailInput.checkValidity()) {
      artistEmailInput.reportValidity();

      return;
    }

    // Show submitting message
    if (artistMessage) {
      artistMessage.textContent = "Submitting your music...";

      artistMessage.className = "artist-message";
    }

    try {
      const response = await fetch(`${API_URL}/api/artists`, {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          artistName,
          genre,
          location,
          musicLink,
          email,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        if (artistMessage) {
          artistMessage.textContent =
            data.message || "Unable to submit your music.";

          artistMessage.className = "artist-message error";
        }

        return;
      }

      // Successful submission
      if (artistMessage) {
        artistMessage.textContent =
          "Submission received. We'll give your music a listen.";

        artistMessage.className = "artist-message success";
      }

      // Clear form
      artistForm.reset();
    } catch (error) {
      console.error("Artist submission error:", error);

      if (artistMessage) {
        artistMessage.textContent =
          "Unable to connect to the server. Please try again.";

        artistMessage.className = "artist-message error";
      }
    }
  });
}

const menuBtn = document.querySelector(".menu");
const closeBtn = document.querySelector(".close-btn");
const list = document.querySelector(".list");

menuBtn.addEventListener("click", () => {
  list.classList.add("active");
});

closeBtn.addEventListener("click", () => {
  list.classList.remove("active");
});
