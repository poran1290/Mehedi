const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");

  loginTab.classList.add("active");
  registerTab.classList.remove("active");
}

function showRegister() {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");

  loginTab.classList.remove("active");
  registerTab.classList.add("active");
}

function togglePassword(inputId, button) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    button.textContent = "🙈";
  } else {
    input.type = "password";
    button.textContent = "👁";
  }
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function forgotPassword() {
  showToast("পাসওয়ার্ড পুনরুদ্ধার ফিচার শীঘ্রই আসছে");
}

loginForm.addEventListener("submit", function(event) {
  event.preventDefault();
  showToast("ডেমো লগইন সফল হয়েছে");
});

registerForm.addEventListener("submit", function(event) {
  event.preventDefault();
  showToast("ডেমো রেজিস্ট্রেশন সফল হয়েছে");
  registerForm.reset();
});
