function selectPlan(plan) {
  alert(`${plan} plan নির্বাচন করা হয়েছে`);
}

function calculateReturn() {
  const amount = Number(document.getElementById("amount").value);
  const rate = Number(document.getElementById("rate").value);
  const months = Number(document.getElementById("months").value);

  if (!amount || !rate || !months) {
    document.getElementById("result").textContent =
      "সব তথ্য সঠিকভাবে লিখুন।";
    return;
  }

  const profit = amount * (rate / 100) * months;
  const total = amount + profit;

  document.getElementById("result").textContent =
    `আনুমানিক লাভ: ৳${profit.toFixed(2)} | মোট: ৳${total.toFixed(2)}`;
}
