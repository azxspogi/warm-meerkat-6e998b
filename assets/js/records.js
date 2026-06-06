let dvData = [];

/* LOAD */
async function loadRecords() {

  let { data } = await supabaseClient
    .from("dv_records")
    .select("*")
    .order("id", { ascending: false });

  dvData = data;

  let html = "";

  data.forEach(d => {
    html += `
      <tr>
        <td>${d.date}</td>
        <td>${d.payee}</td>
        <td>${d.particulars}</td>
        <td>${d.amount}</td>
        <td>${d.status}</td>
        <td>
          <button class="edit" onclick="openEdit(${d.id})">Edit</button>
          <button class="del" onclick="deleteDV(${d.id})">Delete</button>
        </td>
      </tr>
    `;
  });

  document.getElementById("table").innerHTML = html;
}

/* DELETE */
async function deleteDV(id) {

  if (!confirm("Are you sure you want to delete this DV?")) return;

  await supabaseClient
    .from("dv_records")
    .delete()
    .eq("id", id);

  loadRecords();
}

/* OPEN EDIT MODAL */
function openEdit(id) {

  let row = dvData.find(d => d.id === id);

  editId.value = row.id;
  editDate.value = row.date;
  editPayee.value = row.payee;
  editParticulars.value = row.particulars;
  editAmount.value = row.amount;
  editStatus.value = row.status;

  document.getElementById("modal").style.display = "flex";
}

/* UPDATE */
async function updateDV() {

  await supabaseClient
    .from("dv_records")
    .update({
      date: editDate.value,
      payee: editPayee.value,
      particulars: editParticulars.value,
      amount: editAmount.value,
      status: editStatus.value
    })
    .eq("id", editId.value);

  closeModal();
  loadRecords();
}

/* CLOSE MODAL */
function closeModal() {
  document.getElementById("modal").style.display = "none";
}

/* INIT */
loadRecords();