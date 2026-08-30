function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active");
}

function showToast(message) {
  const toast = document.getElementById("toast");

  toast.textContent = message;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3000);
}

function choosePlan(planName) {
  document.getElementById("calculator").scrollIntoView({
    behavior: "smooth"
  });

  const rates = {
    Basic: 5,
    Standard: 8,
    Premium: 12
  };

  document.getElementById("rate").value = rates[planName];

  showToast(`${planName} প্ল্যান নির্বাচন করা হয়েছে`);
}

function formatMoney(number) {
  return "৳ " + number.toLocaleString("bn-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  });
}

function calculateReturn() {
  const amount = Number(document.getElementById("amount").value);
  const rate = Number(document.getElementById("rate").value);
  const months = Number(document.getElementById("months").value);

  if (amount <= 0 || rate < 0 || months <= 0) {
    showToast("সঠিক তথ্য লিখুন");
    return;
  }

  const profit = amount * (rate / 100) * months;
  const total = amount + profit;

  document.getElementById("investmentResult").textContent =
    formatMoney(amount);

  document.getElementById("profitResult").textContent =
    formatMoney(profit);

  document.getElementById("totalResult").textContent =
    formatMoney(total);

  showToast("হিসাব সফলভাবে সম্পন্ন হয়েছে");
    }
