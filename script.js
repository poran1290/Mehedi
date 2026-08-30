const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");
const languageBtn = document.getElementById("languageBtn");
const formMessage = document.getElementById("formMessage");

const notificationBtn = document.getElementById("notificationBtn");
const notificationPanel = document.getElementById("notificationPanel");
const closeNotification = document.getElementById("closeNotification");

const forgotBtn = document.getElementById("forgotBtn");
const forgotModal = document.getElementById("forgotModal");
const modalClose = document.getElementById("modalClose");
const recoveryForm = document.getElementById("recoveryForm");

const passwordInput = document.getElementById("registerPassword");
const confirmPasswordInput = document.getElementById("confirmPassword");
const passwordHint = document.getElementById("passwordHint");
const strengthBars = document.querySelectorAll(".strength-bar span");

let language = localStorage.getItem("rcn-language") || "bn";
let toastTimer;

const translations = {
  bn: {
    notifications: "নোটিফিকেশন",
    welcomeNotification: "RCN-এ স্বাগতম",
    welcomeNotificationText: "আপনার স্মার্ট ইনভেস্টমেন্ট যাত্রা শুরু করুন।",
    secureNotification: "নিরাপদ প্ল্যাটফর্ম",
    secureNotificationText: "আপনার তথ্য সুরক্ষিত রাখুন।",
    smartPlatform: "স্মার্ট ইনভেস্টমেন্ট প্ল্যাটফর্ম",
    heroText: "আপনার অর্থনৈতিক ভবিষ্যৎ পরিকল্পনা করুন আরও স্মার্টভাবে।",
    support: "সাপোর্ট",
    secure: "সিকিউর",
    signupFee: "সাইনআপ ফি",
    accountAccess: "অ্যাকাউন্ট অ্যাক্সেস",
    accountAccessText: "আপনার অ্যাকাউন্টে প্রবেশ করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন।",
    login: "লগইন",
    register: "রেজিস্ট্রেশন",
    phoneNumber: "ফোন নম্বর",
    password: "পাসওয়ার্ড",
    rememberMe: "আমাকে মনে রাখুন",
    forgotPassword: "পাসওয়ার্ড ভুলে গেছেন?",
    loginButton: "লগইন করুন",
    noAccount: "অ্যাকাউন্ট নেই?",
    registerNow: "রেজিস্ট্রেশন করুন",
    fullName: "আপনার পূর্ণ নাম",
    confirmPassword: "পাসওয়ার্ড নিশ্চিত করুন",
    referralCode: "রেফারেল কোড",
    optional: "(ঐচ্ছিক)",
    agreeTerms: "আমি শর্তাবলিতে সম্মত",
    createAccount: "অ্যাকাউন্ট তৈরি করুন",
    alreadyAccount: "ইতিমধ্যে অ্যাকাউন্ট আছে?",
    loginNow: "লগইন করুন",
    encrypted: "সুরক্ষিত সংযোগ",
    fastEasy: "দ্রুত ও সহজ",
    verified: "ভেরিফায়েড",
    notice: "RCN একটি ডেমো প্ল্যাটফর্ম। বিনিয়োগের আগে সব তথ্য যাচাই করুন।",
    allRights: "সর্বস্বত্ব সংরক্ষিত।",
    recoverPassword: "পাসওয়ার্ড পুনরুদ্ধার",
    recoverText: "আপনার ফোন নম্বর দিন। পাসওয়ার্ড পুনরুদ্ধারের নির্দেশনা পাঠানো হবে।",
    sendRequest: "রিকোয়েস্ট পাঠান",
    required: "এই ঘরটি পূরণ করুন।",
    invalidPhone: "সঠিক ১১ সংখ্যার ফোন নম্বর দিন।",
    shortPassword: "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।",
    passwordMismatch: "দুটি পাসওয়ার্ড মিলছে না।",
    acceptTerms: "শর্তাবলিতে সম্মতি দিন।",
    loginSuccess: "ডেমো লগইন সফল হয়েছে।",
    registerSuccess: "ডেমো রেজিস্ট্রেশন সফল হয়েছে।",
    recoverySuccess: "রিকোয়েস্ট গ্রহণ করা হয়েছে।",
    weak: "দুর্বল পাসওয়ার্ড",
    medium: "মাঝারি পাসওয়ার্ড",
    good: "ভালো পাসওয়ার্ড",
    strong: "শক্তিশালী পাসওয়ার্ড"
  },

  en: {
    notifications: "Notifications",
    welcomeNotification: "Welcome to RCN",
    welcomeNotificationText: "Start your smart investment journey.",
    secureNotification: "Secure Platform",
    secureNotificationText: "Keep your information protected.",
    smartPlatform: "Smart Investment Platform",
    heroText: "Plan your financial future in a smarter way.",
    support: "Support",
    secure: "Secure",
    signupFee: "Signup Fee",
    accountAccess: "Account Access",
    accountAccessText: "Login to your account or create a new account.",
    login: "Login",
    register: "Register",
    phoneNumber: "Phone Number",
    password: "Password",
    rememberMe: "Remember me",
    forgotPassword: "Forgot password?",
    loginButton: "Login",
    noAccount: "Don't have an account?",
    registerNow: "Register now",
    fullName: "Full Name",
    confirmPassword: "Confirm Password",
    referralCode: "Referral Code",
    optional: "(Optional)",
    agreeTerms: "I agree to the terms",
    createAccount: "Create Account",
    alreadyAccount: "Already have an account?",
    loginNow: "Login now",
    encrypted: "Secure connection",
    fastEasy: "Fast & easy",
    verified: "Verified",
    notice: "RCN is a demo platform. Verify all information before investing.",
    allRights: "All rights reserved.",
    recoverPassword: "Recover Password",
    recoverText: "Enter your phone number to receive recovery instructions.",
    sendRequest: "Send Request",
    required: "This field is required.",
    invalidPhone: "Enter a valid 11-digit phone number.",
    shortPassword: "Password must be at least 8 characters.",
    passwordMismatch: "Passwords do not match.",
    acceptTerms: "Please accept the terms.",
    loginSuccess: "Demo login successful.",
    registerSuccess: "Demo registration successful.",
    recoverySuccess: "Recovery request received.",
    weak: "Weak password",
    medium: "Medium password",
    good: "Good password",
    strong: "Strong password"
  }
};

function t(key) {
  return translations[language][key] || key;
}

function applyLanguage() {
  document.documentElement.lang = language;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n);
  });

  languageBtn.textContent = language === "bn" ? "🌐 বাংলা" : "🌐 English";

  updatePasswordStrength();
}

function setLanguage() {
  language = language === "bn" ? "en" : "bn";
  localStorage.setItem("rcn-language", language);
  applyLanguage();
}

function showLogin() {
  loginForm.classList.remove("hidden");
  registerForm.classList.add("hidden");
  loginTab.classList.add("active");
  registerTab.classList.remove("active");
  clearFormMessage();
}

function showRegister() {
  loginForm.classList.add("hidden");
  registerForm.classList.remove("hidden");
  loginTab.classList.remove("active");
  registerTab.classList.add("active");
  clearFormMessage();
}

function showToast(message) {
  const toast = document.getElementById("toast");

  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add("show");

  toastTimer = setTimeout(() => {
    toast.classList.remove("show");
  }, 2800);
}

function showFormMessage(message, type = "error") {
  formMessage.textContent = message;
  formMessage.className = `form-message show ${type}`;
}

function clearFormMessage() {
  formMessage.textContent = "";
  formMessage.className = "form-message";
}

function showError(input, message) {
  const field = input.closest(".field");
  input.classList.add("invalid");

  if (field) {
    field.querySelector(".error-text").textContent = message;
  }
}

function clearError(input) {
  const field = input.closest(".field");

  input.classList.remove("invalid");

  if (field) {
    field.querySelector(".error-text").textContent = "";
  }
}

function isValidPhone(value) {
  return /^01[3-9]\d{8}$/.test(value);
}

function getPasswordScore(password) {
  let score = 0;

  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[0-9]/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  return score;
}

function updatePasswordStrength() {
  if (!passwordInput) return;

  const score = getPasswordScore(passwordInput.value);
  const labels = ["", t("weak"), t("medium"), t("good"), t("strong")];

  strengthBars.forEach((bar, index) => {
    bar.classList.toggle("active", index < score);
  });

  passwordHint.textContent = passwordInput.value
    ? labels[score]
    : "";
}

function setLoading(button, loading) {
  button.classList.toggle("loading", loading);
}

function validateLogin() {
  const phone = document.getElementById("loginPhone");
  const password = document.getElementById("loginPassword");

  let valid = true;

  if (!isValidPhone(phone.value.trim())) {
    showError(phone, t("invalidPhone"));
    valid = false;
  } else {
    clearError(phone);
  }

  if (!password.value.trim()) {
    showError(password, t("required"));
    valid = false;
  } else {
    clearError(password);
  }

  return valid;
}

function validateRegister() {
  const name = document.getElementById("fullName");
  const phone = document.getElementById("registerPhone");
  const password = document.getElementById("registerPassword");
  const confirmPassword = document.getElementById("confirmPassword");
  const terms = document.getElementById("terms");

  let valid = true;

  if (name.value.trim().length < 2) {
    showError(name, t("required"));
    valid = false;
  } else {
    clearError(name);
  }

  if (!isValidPhone(phone.value.trim())) {
    showError(phone, t("invalidPhone"));
    valid = false;
  } else {
    clearError(phone);
  }

  if (getPasswordScore(password.value) < 3) {
    showError(password, t("shortPassword"));
    valid = false;
  } else {
    clearError(password);
  }

  if (confirmPassword.value !== password.value || !confirmPassword.value) {
    showError(confirmPassword, t("passwordMismatch"));
    valid = false;
  } else {
    clearError(confirmPassword);
  }

  if (!terms.checked) {
    showFormMessage(t("acceptTerms"));
    valid = false;
  }

  return valid;
}

function simulateSubmit(button, message, callback) {
  setLoading(button, true);

  setTimeout(() => {
    setLoading(button, false);
    showToast(message);

    if (callback) callback();
  }, 1100);
}

languageBtn.addEventListener("click", setLanguage);

loginTab.addEventListener("click", showLogin);
registerTab.addEventListener("click", showRegister);

document.querySelectorAll("[data-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    button.dataset.tab === "login" ? showLogin() : showRegister();
  });
});

document.querySelectorAll("[data-open-tab]").forEach((button) => {
  button.addEventListener("click", () => {
    button.dataset.openTab === "login" ? showLogin() : showRegister();
  });
});

document.querySelectorAll(".password-toggle").forEach((button) => {
  button.addEventListener("click", () => {
    const input = document.getElementById(button.dataset.target);

    if (input.type === "password") {
      input.type = "text";
      button.textContent = "🙈";
    } else {
      input.type = "password";
      button.textContent = "👁";
    }
  });
});

passwordInput.addEventListener("input", updatePasswordStrength);

loginForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFormMessage();

  if (!validateLogin()) return;

  const button = loginForm.querySelector(".submit-btn");

  simulateSubmit(button, t("loginSuccess"));
});

registerForm.addEventListener("submit", (event) => {
  event.preventDefault();
  clearFormMessage();

  if (!validateRegister()) return;

  const button = registerForm.querySelector(".submit-btn");

  simulateSubmit(button, t("registerSuccess"), () => {
    registerForm.reset();
    updatePasswordStrength();
  });
});

forgotBtn.addEventListener("click", () => {
  forgotModal.classList.add("show");
  document.getElementById("recoveryPhone").focus();
});

function closeModal() {
  forgotModal.classList.remove("show");
  recoveryForm.reset();
  document.getElementById("recoveryError").textContent = "";
}

modalClose.addEventListener("click", closeModal);

forgotModal.addEventListener("click", (event) => {
  if (event.target === forgotModal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
    notificationPanel.classList.remove("show");
  }
});

recoveryForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const phone = document.getElementById("recoveryPhone");
  const error = document.getElementById("recoveryError");
  const button = recoveryForm.querySelector(".submit-btn");

  if (!isValidPhone(phone.value.trim())) {
    error.textContent = t("invalidPhone");
    phone.classList.add("invalid");
    return;
  }

  error.textContent = "";
  phone.classList.remove("invalid");

  setLoading(button, true);

  setTimeout(() => {
    setLoading(button, false);
    closeModal();
    showToast(t("recoverySuccess"));
  }, 1000);
});

notificationBtn.addEventListener("click", (event) => {
  event.stopPropagation();
  notificationPanel.classList.toggle("show");
});

closeNotification.addEventListener("click", () => {
  notificationPanel.classList.remove("show");
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".notification-wrap")) {
    notificationPanel.classList.remove("show");
  }
});

document.querySelectorAll("input").forEach((input) => {
  input.addEventListener("input", () => clearError(input));
});

applyLanguage();
