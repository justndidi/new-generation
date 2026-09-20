const adminLoginForm = document.getElementById("adminLoginForm");
const loginMessage = document.getElementById("loginMessage");

adminLoginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value;

  loginMessage.textContent = "Logging in...";
  loginMessage.className = "login-message";

  try {
    const response = await fetch(
      `${API_URL}/api/admin/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          username,
          password
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      loginMessage.textContent =
        data.message || "Invalid username or password.";

      loginMessage.classList.add("error");

      return;
    }

    // Save JWT
    localStorage.setItem("adminToken", data.token);

    loginMessage.textContent = "Login successful.";

    loginMessage.classList.add("success");

    // Go to dashboard
    setTimeout(() => {
      window.location.href = "./dashboard.html";
    }, 500);

  } catch (error) {
    console.error("Login error:", error);

    loginMessage.textContent =
      "Unable to connect to the server.";

    loginMessage.classList.add("error");
  }
});