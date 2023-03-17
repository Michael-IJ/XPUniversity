const addAllForm = document.getElementById("addAllForm");

const lecture = async () => {
  try {
    const table = document.getElementById("table-body");
    const response = await axios.get("http://localhost:8097/api/v1/lecturers");
    const data = response.data;

    const res = await axios.get("http://localhost:8097/api/v1/departments");
    const allData = res.data;
    console.log(allData);
    const departmentSelect = document.querySelector("#departmentId");
    console.log(departmentSelect);
    let godAbeg = allData.map((item, index) => {
      return `<option value="${item.DepartmentId}">${item.Name}</option>`;
    });
    let yeag = '<option value="0">---Please Select---</option>';
    departmentSelect.innerHTML = yeag + godAbeg.join("");

    data.forEach((lecturer, id) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${id + 1}</td>
        <td>${lecturer.Surname}</td>
        <td>${lecturer.StaffId}</td>
        <td>${
          lecturer.Status == 1
            ? '<div class="text-success">Active</div>'
            : '<div class="text-danger">Inactive<div>'
        }</td>
        <td>
          <a href="../../html/lecturer/editlecturer.html?id=${
            lecturer.LecturerId
          }" class="btn btn-primary">Edit</a>
          <button class="btn btn-danger"  onClick="deletelecturer(${
            lecturer.LecturerId
          })">Delete</button>
          <a href="../../html/lecturer/detailslecturer.html?id=${
            lecturer.LecturerId
          }" class="btn btn-success">Details</a>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener("DOMContentLoaded", lecture);

function deletelecturer(id) {
  axios
    .delete("http://localhost:8097/api/v1/lecturers/" + id)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

addForms.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = new FormData(addForms);
  const info = Object.fromEntries(formData.entries());
  // validate checkbox
  if (info.Status) {
    info.Status = 1;
  } else {
    info.Status = 0;
  }

  console.log(info);

  const validate = new Validate();
  validate.min_length(info.DepartmentId, 1, "DepartmentId");
  validate.length(info.Surname, 3, 50, "Surname");
  validate.length(info.FirstName, 3, 50, "FirstName");
  validate.length(info.OtherName, 3, 50, "OtherName");
  validate.min_length(info.StaffId, 1, "StaffId");

  if (validate.errors.length > 0) {
    alert(validate.errors[0]);
    return;
  } else {
    console.log("not working");
    axios
      .post("http://localhost:8097/api/v1/lecturers/add", info)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
