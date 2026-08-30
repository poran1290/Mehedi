/* =====================================================
   RCN FRONTEND
   Login + Registration + Dashboard
===================================================== */


/* ================= ELEMENTS ================= */

const authSection =
  document.getElementById("authSection");

const dashboardSection =
  document.getElementById("dashboardSection");

const bottomNav =
  document.getElementById("bottomNav");

const mainFooter =
  document.getElementById("mainFooter");


const loginForm =
  document.getElementById("loginForm");

const registerForm =
  document.getElementById("registerForm");


const loginTab =
  document.getElementById("loginTab");

const registerTab =
  document.getElementById("registerTab");


const authMessage =
  document.getElementById("authMessage");


const languageBtn =
  document.getElementById("languageBtn");


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


const toast =
  document.getElementById("toast");


let toastTimer = null;


/* ================= LANGUAGE ================= */

let language =
  localStorage.getItem("rcn-language") || "bn";


const translations = {

  bn: {

    login: "লগইন",
    register: "রেজিস্ট্রেশন",

    loginSuccess:
      "ডেমো লগইন সফল হয়েছে।",

    registerSuccess:
      "রেজিস্ট্রেশন সফল হয়েছে। এখন লগইন করুন।",

    invalidPhone:
      "সঠিক ১১ সংখ্যার বাংলাদেশি ফোন নম্বর দিন।",

    required:
      "এই ঘরটি পূরণ করুন।",

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

    recoverySuccess:
      "রিকোয়েস্ট গ্রহণ করা হয়েছে।",

    copied:
      "Referral Link কপি হয়েছে।"

  },


  en: {

    login: "Login",
    register: "Register",

    loginSuccess:
      "Demo login successful.",

    registerSuccess:
      "Registration successful. Please login.",

    invalidPhone:
      "Enter a valid 11-digit Bangladesh phone number.",

    required:
      "This field is required.",

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

    recoverySuccess:
      "Recovery request received.",

    copied:
      "Referral link copied."

  }

};


function t(key) {

  return translations[language][key] || key;

}


/* ================= LANGUAGE TOGGLE ================= */

function changeLanguage() {

  language =
    language === "bn"
      ? "en"
      : "bn";

  localStorage.setItem(
    "rcn-language",
    language
  );

  languageBtn.textContent =
    language === "bn"
      ? "🌐 বাংলা"
      : "🌐 English";

  updatePasswordStrength();

}


/* ================= MESSAGE ================= */

function showAuthMessage(message) {

  authMessage.textContent =
    message;

  authMessage.classList.add("show");

}


function clearAuthMessage() {

  authMessage.textContent = "";

  authMessage.classList.remove("show");

}


/* ================= TOAST ================= */

function showToast(message) {

  clearTimeout(toastTimer);

  toast.textContent =
    message;

  toast.classList.add("show");

  toastTimer =
    setTimeout(() => {

      toast.classList.remove("show");

    }, 2500);

}


/* ================= ERROR ================= */

function showError(input, message) {

  const group =
    input.closest(".form-group");

  input.classList.add("invalid");

  if (group) {

    const error =
      group.querySelector(".error-text");

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
      group.querySelector(".error-text");

    if (error) {
      error.textContent = "";
    }

  }

}


/* ================= PHONE ================= */

function isValidPhone(phone) {

  return /^01[3-9][0-9]{8}$/.test(phone);

}


/* ================= PASSWORD ================= */

function getPasswordScore(password) {

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

  if (!registerPassword) {
    return;
  }

  const password =
    registerPassword.value;

  const score =
    getPasswordScore(password);


  const labels = [

    "",

    t("weak"),

    t("medium"),

    t("good"),

    t("strong")

  ];


  strengthBars.forEach(
    (bar, index) => {

      bar.classList.toggle(
        "active",
        index < score
      );

    }
  );


  passwordHint.textContent =
    password
      ? labels[score]
      : "";

}


/* ================= LOADING ================= */

function setLoading(button, status) {

  if (!button) {
    return;
  }

  button.classList.toggle(
    "loading",
    status
  );

}


/* =====================================================
   AUTH TABS
===================================================== */

function showLogin() {

  loginForm.classList.remove(
    "hidden"
  );

  registerForm.classList.add(
    "hidden"
  );


  loginTab.classList.add(
    "active"
  );

  registerTab.classList.remove(
    "active"
  );


  clearAuthMessage();

}


function showRegister() {

  loginForm.classList.add(
    "hidden"
  );

  registerForm.classList.remove(
    "hidden"
  );


  loginTab.classList.remove(
    "active"
  );

  registerTab.classList.add(
    "active"
  );


  clearAuthMessage();

}


/* =====================================================
   LOGIN VALIDATION
===================================================== */

function validateLogin() {

  const phone =
    document.getElementById(
      "loginPhone"
    );

  const password =
    document.getElementById(
      "loginPassword"
    );


  let valid = true;


  if (
    !isValidPhone(
      phone.value.trim()
    )
  ) {

    showError(
      phone,
      t("invalidPhone")
    );

    valid = false;

  } else {

    clearError(phone);

  }


  if (
    !password.value.trim()
  ) {

    showError(
      password,
      t("required")
    );

    valid = false;

  } else {

    clearError(password);

  }


  return valid;

}


/* =====================================================
   REGISTER VALIDATION
===================================================== */

function validateRegister() {

  const name =
    document.getElementById(
      "registerName"
    );

  const phone =
    document.getElementById(
      "registerPhone"
    );

  const password =
    document.getElementById(
      "registerPassword"
    );

  const confirmPassword =
    document.getElementById(
      "confirmPassword"
    );

  const terms =
    document.getElementById(
      "terms"
    );


  let valid = true;


  if (
    name.value.trim().length < 2
  ) {

    showError(
      name,
      t("required")
    );

    valid = false;

  } else {

    clearError(name);

  }


  if (
    !isValidPhone(
      phone.value.trim()
    )
  ) {

    showError(
      phone,
      t("invalidPhone")
    );

    valid = false;

  } else {

    clearError(phone);

  }


  if (
    getPasswordScore(
      password.value
    ) < 3
  ) {

    showError(
      password,
      t("shortPassword")
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
      t("passwordMismatch")
    );

    valid = false;

  } else {

    clearError(
      confirmPassword
    );

  }


  if (!terms.checked) {

    showAuthMessage(
      t("acceptTerms")
    );

    valid = false;

  }


  return valid;

}


/* =====================================================
   SAVE DEMO USER
===================================================== */

function saveDemoUser() {

  const name =
    document.getElementById(
      "registerName"
    ).value.trim();

  const phone =
    document.getElementById(
      "registerPhone"
    ).value.trim();

  const password =
    document.getElementById(
      "registerPassword"
    ).value;


  const user = {

    name: name,

    phone: phone,

    password: password

  };


  localStorage.setItem(
    "rcn-user",
    JSON.stringify(user)
  );

}


/* =====================================================
   SHOW DASHBOARD
===================================================== */

function openDashboard() {

  const userData =
    localStorage.getItem(
      "rcn-user"
    );


  let user = {

    name: "RCN User",

    phone: "01XXXXXXXXX"

  };


  if (userData) {

    try {

      const saved =
        JSON.parse(userData);

      user.name =
        saved.name || user.name;

      user.phone =
        saved.phone || user.phone;

    } catch (error) {

      /* Ignore invalid local data */

    }

  }


  document.getElementById(
    "dashboardName"
  ).textContent =
    user.name;


  document.getElementById(
    "profileName"
  ).textContent =
    user.name;


  document.getElementById(
    "profilePhone"
  ).textContent =
    user.phone;


  const initial =
    user.name
      .charAt(0)
      .toUpperCase();


  document.getElementById(
    "profileInitial"
  ).textContent =
    initial || "U";


  authSection.classList.add(
    "hidden"
  );

  dashboardSection.classList.remove(
    "hidden"
  );

  bottomNav.classList.remove(
    "hidden"
  );


  mainFooter.classList.add(
    "hidden"
  );


  window.scrollTo(
    0,
    0
  );

}


/* =====================================================
   SHOW AUTH
===================================================== */

function openAuth() {

  dashboardSection.classList.add(
    "hidden"
  );

  bottomNav.classList.add(
    "hidden"
  );

  mainFooter.classList.remove(
    "hidden"
  );

  authSection.classList.remove(
    "hidden"
  );

  showLogin();

}


/* =====================================================
   LOGIN SUBMIT
===================================================== */

loginForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    clearAuthMessage();


    if (!validateLogin()) {
      return;
    }


    const button =
      loginForm.querySelector(
        ".main-submit"
      );


    setLoading(
      button,
      true
    );


    setTimeout(
      () => {

        setLoading(
          button,
          false
        );


        const phone =
          document.getElementById(
            "loginPhone"
          ).value.trim();


        /*
          Demo login:
          If no user exists, create
          a temporary demo user.
        */

        let savedUser =
          localStorage.getItem(
            "rcn-user"
          );


        if (!savedUser) {

          const demoUser = {

            name: "RCN User",

            phone: phone,

            password:
              document.getElementById(
                "loginPassword"
              ).value

          };


          localStorage.setItem(
            "rcn-user",
            JSON.stringify(demoUser)
          );

        }


        localStorage.setItem(
          "rcn-logged-in",
          "true"
        );


        showToast(
          t("loginSuccess")
        );


        setTimeout(
          openDashboard,
          400
        );


      },
      800
    );

  }
);


/* =====================================================
   REGISTER SUBMIT
===================================================== */

registerForm.addEventListener(
  "submit",
  function(event) {

    event.preventDefault();

    clearAuthMessage();


    if (!validateRegister()) {
      return;
    }


    const button =
      registerForm.querySelector(
        ".main-submit"
      );


    setLoading(
      button,
      true
    );


    setTimeout(
      () => {

        setLoading(
          button,
          false
        );


        saveDemoUser();


        registerForm.reset();

        updatePasswordStrength();


        showToast(
          t("registerSuccess")
        );


        setTimeout(
          showLogin,
          500
        );


      },
      900
    );

  }
);


/* =====================================================
   SWITCH BUTTONS
===================================================== */

document
  .querySelectorAll(
    "[data-switch]"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const target =
            button.dataset.switch;


          if (target === "login") {

            showLogin();

          } else {

            showRegister();

          }

        }
      );

    }
  );


loginTab.addEventListener(
  "click",
  showLogin
);


registerTab.addEventListener(
  "click",
  showRegister
);


/* =====================================================
   PASSWORD SHOW/HIDE
===================================================== */

document
  .querySelectorAll(
    ".password-toggle"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const target =
            document.getElementById(
              button.dataset.target
            );


          if (
            target.type === "password"
          ) {

            target.type =
              "text";

            button.textContent =
              "🙈";

          } else {

            target.type =
              "password";

            button.textContent =
              "👁";

          }

        }
      );

    }
  );


/* =====================================================
   PASSWORD STRENGTH
===================================================== */

registerPassword.addEventListener(
  "input",
  updatePasswordStrength
);


/* =====================================================
   LANGUAGE
===================================================== */

languageBtn.addEventListener(
  "click",
  changeLanguage
);


/* =====================================================
   NOTIFICATION
===================================================== */

notificationBtn.addEventListener(
  "click",
  event => {

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
  event => {

    if (
      !event.target.closest(
        ".topbar"
      )
    ) {

      notificationPanel.classList.remove(
        "show"
      );

    }

  }
);


/* =====================================================
   FORGOT PASSWORD
===================================================== */

forgotButton.addEventListener(
  "click",
  () => {

    forgotModal.classList.add(
      "show"
    );

    document
      .getElementById(
        "recoveryPhone"
      )
      .focus();

  }
);


function closeModal() {

  forgotModal.classList.remove(
    "show"
  );

  recoveryForm.reset();

  document.getElementById(
    "recoveryError"
  ).textContent = "";

}


modalClose.addEventListener(
  "click",
  closeModal
);


forgotModal.addEventListener(
  "click",
  event => {

    if (
      event.target ===
      forgotModal
    ) {

      closeModal();

    }

  }
);


recoveryForm.addEventListener(
  "submit",
  event => {

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
        ".main-submit"
      );


    if (
      !isValidPhone(
        phone.value.trim()
      )
    ) {

      phone.classList.add(
        "invalid"
      );

      error.textContent =
        t("invalidPhone");

      return;

    }


    phone.classList.remove(
      "invalid"
    );

    error.textContent =
      "";


    setLoading(
      button,
      true
    );


    setTimeout(
      () => {

        setLoading(
          button,
          false
        );

        closeModal();

        showToast(
          t("recoverySuccess")
        );

      },
      800
    );

  }
);


/* =====================================================
   BOTTOM NAVIGATION
===================================================== */

const navItems =
  document.querySelectorAll(
    ".nav-item"
  );


const dashboardPages =
  document.querySelectorAll(
    ".dashboard-page"
  );


navItems.forEach(
  item => {

    item.addEventListener(
      "click",
      () => {

        const pageId =
          item.dataset.page;


        navItems.forEach(
          nav => {

            nav.classList.remove(
              "active"
            );

          }
        );


        item.classList.add(
          "active"
        );


        dashboardPages.forEach(
          page => {

            page.classList.remove(
              "active-page"
            );

          }
        );


        const targetPage =
          document.getElementById(
            pageId
          );


        if (targetPage) {

          targetPage.classList.add(
            "active-page"
          );

        }


        window.scrollTo(
          0,
          0
        );

      }
    );

  }
);


/* =====================================================
   DASHBOARD NOTIFICATION
===================================================== */

const dashboardNotification =
  document.getElementById(
    "dashboardNotification"
  );


dashboardNotification.addEventListener(
  "click",
  () => {

    showToast(
      "আপনার নতুন কোনো notification নেই।"
    );

  }
);


/* =====================================================
   TASK BUTTONS
===================================================== */

document
  .querySelectorAll(
    ".task-button:not(.done)"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          button.textContent =
            "Done";

          button.classList.add(
            "done"
          );


          const card =
            button.closest(
              ".task-card"
            );


          if (card) {

            card.classList.add(
              "completed"
            );

          }


          showToast(
            "Task সম্পন্ন হয়েছে।"
          );

        }
      );

    }
  );


/* =====================================================
   VIP BUTTON
===================================================== */

document
  .querySelectorAll(
    ".vip-button"
  )
  .forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          showToast(
            "VIP প্ল্যানের বিস্তারিত শীঘ্রই আসছে।"
          );

        }
      );

    }
  );


/* =====================================================
   COPY REFERRAL
===================================================== */

const copyReferral =
  document.getElementById(
    "copyReferral"
  );


copyReferral.addEventListener(
  "click",
  async () => {

    const input =
      document.getElementById(
        "referralLink"
      );


    try {

      await navigator.clipboard.writeText(
        input.value
      );

      showToast(
        t("copied")
      );

    } catch (error) {

      input.select();

      document.execCommand(
        "copy"
      );

      showToast(
        t("copied")
      );

    }

  }
);


/* =====================================================
   LOGOUT
===================================================== */

document
  .getElementById(
    "logoutButton"
  )
  .addEventListener(
    "click",
    () => {

      localStorage.removeItem(
        "rcn-logged-in"
      );

      openAuth();

      showToast(
        "আপনি Logout করেছেন।"
      );

    }
  );


/* =====================================================
   CLEAR INPUT ERROR
===================================================== */

document
  .querySelectorAll(
    "input"
  )
  .forEach(
    input => {

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

    }
  );


/* =====================================================
   ESCAPE
===================================================== */

document.addEventListener(
  "keydown",
  event => {

    if (
      event.key === "Escape"
    ) {

      notificationPanel.classList.remove(
        "show"
      );

      closeModal();

    }

  }
);


/* =====================================================
   AUTO LOGIN AFTER REFRESH
===================================================== */

function checkLogin() {

  const loggedIn =
    localStorage.getItem(
      "rcn-logged-in"
    );


  if (
    loggedIn === "true"
  ) {

    openDashboard();

  } else {

    openAuth();

  }

}


/* =====================================================
   INITIALIZE
===================================================== */

languageBtn.textContent =
  language === "bn"
    ? "🌐 বাংলা"
    : "🌐 English";


updatePasswordStrength();

checkLogin();
