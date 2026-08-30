"use strict";


/* ================= ELEMENTS ================= */

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");

const loginTab = document.getElementById("loginTab");
const registerTab = document.getElementById("registerTab");

const languageBtn = document.getElementById("languageBtn");

const formMessage = document.getElementById("formMessage");

const notificationBtn =
  document.getElementById("notificationBtn");

const notificationPanel =
  document.getElementById("notificationPanel");

const notificationClose =
  document.getElementById("notificationClose");

const forgotButton =
  document.getElementById("forgotButton");

const forgotModal =
  document.getElementById("forgotModal");

const modalClose =
  document.getElementById("modalClose");

const recoveryForm =
  document.getElementById("recoveryForm");

const registerPassword =
  document.getElementById("registerPassword");

const passwordHint =
  document.getElementById("passwordHint");

const strengthBars =
  document.querySelectorAll(".strength-bars span");


/* ================= STATE ================= */

let language =
  localStorage.getItem("rcn-language") || "bn";

let toastTimer = null;


/* ================= TRANSLATIONS ================= */

const text = {

  bn: {

    notifications: "নোটিফিকেশন",

    welcome: "RCN-এ স্বাগতম",

    welcomeText:
      "আপনার স্মার্ট ইনভেস্টমেন্ট যাত্রা শুরু করুন।",

    secureAccount:
      "অ্যাকাউন্ট সুরক্ষিত রাখুন",

    secureText:
      "সবসময় শক্তিশালী পাসওয়ার্ড ব্যবহার করুন।",

    subtitle:
      "স্মার্ট ইনভেস্টমেন্ট প্ল্যাটফর্ম",

    accountAccess:
      "অ্যাকাউন্ট অ্যাক্সেস",

    accountText:
      "লগইন করুন অথবা নতুন অ্যাকাউন্ট তৈরি করুন",

    login:
      "লগইন",

    register:
      "রেজিস্ট্রেশন",

    phone:
      "ফোন নম্বর",

    password:
      "পাসওয়ার্ড",

    remember:
      "আমাকে মনে রাখুন",

    forgot:
      "পাসওয়ার্ড ভুলে গেছেন?",

    loginButton:
      "লগইন করুন",

    noAccount:
      "অ্যাকাউন্ট নেই?",

    registerNow:
      "রেজিস্ট্রেশন করুন",

    fullName:
      "আপনার পূর্ণ নাম",

    confirmPassword:
      "পাসওয়ার্ড নিশ্চিত করুন",

    terms:
      "আমি শর্তাবলিতে সম্মত",

    createAccount:
      "অ্যাকাউন্ট তৈরি করুন",

    alreadyAccount:
      "ইতিমধ্যে অ্যাকাউন্ট আছে?",

    loginNow:
      "লগইন করুন",

    rights:
      "সর্বস্বত্ব সংরক্ষিত।",

    recoverTitle:
      "পাসওয়ার্ড পুনরুদ্ধার",

    recoverText:
      "আপনার ফোন নম্বর দিন। পুনরুদ্ধারের নির্দেশনা পাঠানো হবে।",

    sendRequest:
      "রিকোয়েস্ট পাঠান",

    required:
      "এই ঘরটি পূরণ করুন।",

    invalidPhone:
      "সঠিক ১১ সংখ্যার ফোন নম্বর দিন।",

    weak:
      "দুর্বল পাসওয়ার্ড",

    medium:
      "মাঝারি পাসওয়ার্ড",

    good:
      "ভালো পাসওয়ার্ড",

    strong:
      "শক্তিশালী পাসওয়ার্ড",

    shortPassword:
      "কমপক্ষে ৮ অক্ষরের শক্তিশালী পাসওয়ার্ড দিন।",

    passwordMismatch:
      "দুটি পাসওয়ার্ড মিলছে না।",

    acceptTerms:
      "শর্তাবলিতে সম্মতি দিন।",

    loginSuccess:
      "ডেমো লগইন সফল হয়েছে।",

    registerSuccess:
      "ডেমো রেজিস্ট্রেশন সফল হয়েছে।",

    recoverySuccess:
      "রিকোয়েস্ট গ্রহণ করা হয়েছে।"

  },


  en: {

    notifications:
      "Notifications",

    welcome:
      "Welcome to RCN",

    welcomeText:
      "Start your smart investment journey.",

    secureAccount:
      "Keep your account secure",

    secureText:
      "Always use a strong password.",

    subtitle:
      "Smart Investment Platform",

    accountAccess:
      "Account Access",

    accountText:
      "Login or create a new account",

    login:
      "Login",

    register:
      "Register",

    phone:
      "Phone Number",

    password:
      "Password",

    remember:
      "Remember me",

    forgot:
      "Forgot password?",

    loginButton:
      "Login",

    noAccount:
      "Don't have an account?",

    registerNow:
      "Register now",

    fullName:
      "Full Name",

    confirmPassword:
      "Confirm Password",

    terms:
      "I agree to the terms",

    createAccount:
      "Create Account",

    alreadyAccount:
      "Already have an account?",

    loginNow:
      "Login now",

    rights:
      "All rights reserved.",

    recoverTitle:
      "Recover Password",

    recoverText:
      "Enter your phone number to receive recovery instructions.",

    sendRequest:
      "Send Request",

    required:
      "This field is required.",

    invalidPhone:
      "Enter a valid 11-digit phone number.",

    weak:
      "Weak password",

    medium:
      "Medium password",

    good:
      "Good password",

    strong:
      "Strong password",

    shortPassword:
      "Use a strong password with at least 8 characters.",

    passwordMismatch:
      "Passwords do not match.",

    acceptTerms:
      "Please accept the terms.",

    loginSuccess:
      "Demo login successful.",

    registerSuccess:
      "Demo registration successful.",

    recoverySuccess:
      "Recovery request received."

  }

};


/* ================= TRANSLATE ================= */

function translate(key) {

  return text[language][key] || key;

}


/* ================= APPLY LANGUAGE ================= */

function applyLanguage() {

  document.documentElement.lang = language;

  document
    .querySelectorAll("[data-i18n]")
    .forEach((element) => {

      element.textContent =
        translate(element.dataset.i18n);

    });


  languageBtn.textContent =
    language === "bn"
      ? "🌐 বাংলা"
      : "🌐 English";


  updatePasswordStrength();

}


/* ================= LANGUAGE ================= */

function toggleLanguage() {

  language =
    language === "bn"
      ? "en"
      : "bn";

  localStorage.setItem(
    "rcn-language",
    language
  );

  applyLanguage();

}


/* ================= FORM SWITCH ================= */

function showLogin() {

  loginForm.classList.remove("hidden");

  registerForm.classList.add("hidden");

  loginTab.classList.add("active");

  registerTab.classList.remove("active");

  clearMessage();

}


function showRegister() {

  loginForm.classList.add("hidden");

  registerForm.classList.remove("hidden");

  loginTab.classList.remove("active");

  registerTab.classList.add("active");

  clearMessage();

}


/* ================= MESSAGE ================= */

function showMessage(message) {

  formMessage.textContent = message;

  formMessage.className =
    "form-message show";

}


function clearMessage() {

  formMessage.textContent = "";

  formMessage.className =
    "form-message";

}


/* ================= TOAST ================= */

function showToast(message) {

  const toast =
    document.getElementById("toast");

  clearTimeout(toastTimer);

  toast.textContent = message;

  toast.classList.add("show");

  toastTimer = setTimeout(() => {

    toast.classList.remove("show");

  }, 2600);

}


/* ================= ERROR ================= */

function showError(input, message) {

  const group =
    input.closest(".form-group");

  input.classList.add("invalid");

  if (group) {

    const error =
      group.querySelector(".error-message");

    if (error) {
      error.textContent = message;
    }

  }

}


function clearError(input) {

  const group =
    input.closest(".form-group");

  input.classList.remove("invalid");

  if (group) {

    const error =
      group.querySelector(".error-message");

    if (error) {
      error.textContent = "";
    }

  }

}


/* ================= PHONE ================= */

function validPhone(phone) {

  return /^01[3-9][0-9]{8}$/.test(phone);

}


/* ================= PASSWORD ================= */

function passwordScore(password) {

  let score = 0;

  if (password.length >= 8) {
    score++;
  }

  if (/[A-Z]/.test(password)) {
    score++;
  }

  if (/[0-9]/.test(password)) {
    score++;
  }

  if (/[^A-Za-z0-9]/.test(password)) {
    score++;
  }

  return score;

}


function updatePasswordStrength() {

  const score =
    passwordScore(registerPassword.value);


  const labels = [

    "",

    translate("weak"),

    translate("medium"),

    translate("good"),

    translate("strong")

  ];


  strengthBars.forEach((bar, index) => {

    bar.classList.toggle(
      "active",
      index < score
    );

  });


  passwordHint.textContent =
    registerPassword.value
      ? labels[score]
      : "";

}


/* ================= LOADING ================= */

function setLoading(button, status) {

  button.classList.toggle(
    "loading",
    status
  );

}


/* ================= LOGIN VALIDATION ================= */

function validateLogin() {

  const phone =
    document.getElementById("loginPhone");

  const password =
    document.getElementById("loginPassword");


  let valid = true;


  if (!validPhone(phone.value.trim())) {

    showError(
      phone,
      translate("invalidPhone")
    );

    valid = false;

  } else {

    clearError(phone);

  }


  if (!password.value.trim()) {

    showError(
      password,
      translate("required")
    );

    valid = false;

  } else {

    clearError(password);

  }


  return valid;

}


/* ================= REGISTER VALIDATION ================= */

function validateRegister() {

  const name =
    document.getElementById("fullName");

  const phone =
    document.getElementById("registerPhone");

  const password =
    document.getElementById("registerPassword");

  const confirmPassword =
    document.getElementById("confirmPassword");

  const terms =
    document.getElementById("terms");


  let valid = true;


  if (name.value.trim().length < 2) {

    showError(
      name,
      translate("required")
    );

    valid = false;

  } else {

    clearError(name);

  }


  if (!validPhone(phone.value.trim())) {

    showError(
      phone,
      translate("invalidPhone")
    );

    valid = false;

  } else {

    clearError(phone);

  }


  if (passwordScore(password.value) < 3) {

    showError(
      password,
      translate("shortPassword")
    );

    valid = false;

  } else {

    clearError(password);

  }


  if (
    !confirmPassword.value ||
    confirmPassword.value !== password.value
  ) {

    showError(
      confirmPassword,
      translate("passwordMismatch")
    );

    valid = false;

  } else {

    clearError(confirmPassword);

  }


  if (!terms.checked) {

    showMessage(
      translate("acceptTerms")
    );

    valid = false;

  }


  return valid;

}


/* ================= DEMO SUBMIT ================= */

function simulateSubmit(
  button,
  message,
  callback
) {

  setLoading(button, true);


  setTimeout(() => {

    setLoading(button, false);

    showToast(message);


    if (callback) {
      callback();
    }

  }, 1000);

}


/* ================= EVENTS ================= */

languageBtn.addEventListener(
  "click",
  toggleLanguage
);


loginTab.addEventListener(
  "click",
  showLogin
);


registerTab.addEventListener(
  "click",
  showRegister
);


/* ================= SWITCH BUTTONS ================= */

document
  .querySelectorAll("[data-switch]")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        if (
          button.dataset.switch === "login"
        ) {

          showLogin();

        } else {

          showRegister();

        }

      }
    );

  });


/* ================= PASSWORD SHOW/HIDE ================= */

document
  .querySelectorAll(".password-button")
  .forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const input =
          document.getElementById(
            button.dataset.target
          );


        if (input.type === "password") {

          input.type = "text";

          button.textContent = "🙈";

        } else {

          input.type = "password";

          button.textContent = "👁";

        }

      }
    );

  });


/* ================= PASSWORD STRENGTH ================= */

registerPassword.addEventListener(
  "input",
  updatePasswordStrength
);


/* ================= LOGIN ================= */

loginForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    clearMessage();


    if (!validateLogin()) {
      return;
    }


    const button =
      loginForm.querySelector(
        ".submit-button"
      );


    simulateSubmit(
      button,
      translate("loginSuccess")
    );

  }
);


/* ================= REGISTER ================= */

registerForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();

    clearMessage();


    if (!validateRegister()) {
      return;
    }


    const button =
      registerForm.querySelector(
        ".submit-button"
      );


    simulateSubmit(
      button,
      translate("registerSuccess"),
      () => {

        registerForm.reset();

        updatePasswordStrength();

      }
    );

  }
);


/* ================= FORGOT PASSWORD ================= */

forgotButton.addEventListener(
  "click",
  () => {

    forgotModal.classList.add("show");

    document
      .getElementById("recoveryPhone")
      .focus();

  }
);


function closeModal() {

  forgotModal.classList.remove("show");

  recoveryForm.reset();

  document
    .getElementById("recoveryError")
    .textContent = "";

}


modalClose.addEventListener(
  "click",
  closeModal
);


forgotModal.addEventListener(
  "click",
  (event) => {

    if (event.target === forgotModal) {

      closeModal();

    }

  }
);


/* ================= RECOVERY ================= */

recoveryForm.addEventListener(
  "submit",
  (event) => {

    event.preventDefault();


    const phone =
      document.getElementById(
        "recoveryPhone"
      );

    const error =
      document.getElementById(
        "recoveryError"
      );

    const button =
      recoveryForm.querySelector(
        ".submit-button"
      );


    if (!validPhone(phone.value.trim())) {

      phone.classList.add("invalid");

      error.textContent =
        translate("invalidPhone");

      return;

    }


    phone.classList.remove("invalid");

    error.textContent = "";


    setLoading(button, true);


    setTimeout(() => {

      setLoading(button, false);

      closeModal();

      showToast(
        translate("recoverySuccess")
      );

    }, 900);

  }
);


/* ================= NOTIFICATION ================= */

notificationBtn.addEventListener(
  "click",
  (event) => {

    event.stopPropagation();

    notificationPanel.classList.toggle(
      "show"
    );

  }
);


notificationClose.addEventListener(
  "click",
  () => {

    notificationPanel.classList.remove(
      "show"
    );

  }
);


document.addEventListener(
  "click",
  (event) => {

    if (
      !event.target.closest(
        ".notification-area"
      )
    ) {

      notificationPanel.classList.remove(
        "show"
      );

    }

  }
);


/* ================= ESCAPE ================= */

document.addEventListener(
  "keydown",
  (event) => {

    if (event.key === "Escape") {

      notificationPanel.classList.remove(
        "show"
      );

      closeModal();

    }

  }
);


/* ================= CLEAR ERRORS ================= */

document
  .querySelectorAll("input")
  .forEach((input) => {

    input.addEventListener(
      "input",
      () => {

        if (
          input.classList.contains(
            "invalid"
          )
        ) {

          clearError(input);

        }

      }
    );

  });


/* ================= START ================= */

applyLanguage();
