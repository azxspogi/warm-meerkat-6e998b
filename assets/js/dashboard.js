async function loadDashboard() {

  let { data } = await supabaseClient
    .from("dv_records")
    .select("*");

  let total = 0;
  let pending = 0;
  let paid = 0;

  data.forEach(d => {
    total += Number(d.amount);
    d.status === "Paid" ? paid++ : pending++;
  });

  document.getElementById("totalDV").innerText = data.length;
  document.getElementById("totalAmount").innerText = total;
  document.getElementById("pendingDV").innerText = pending;
  document.getElementById("paidDV").innerText = paid;
}

loadDashboard();