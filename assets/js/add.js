async function addDV() {

  await supabaseClient.from("dv_records").insert([{
    date: date.value,
    payee: payee.value,
    particulars: particulars.value,
    amount: amount.value,
    status: addstatus.value
  }]);

  alert("Saved!");
}