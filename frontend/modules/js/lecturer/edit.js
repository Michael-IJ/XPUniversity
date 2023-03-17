const lecturerIdInput = document.getElementById("lecturerIdInput");
const departmentIdInput = document.getElementById("departmentIdInput");
const surNameInput = document.querySelector("#surNameInput");
const firstNameInput = document.querySelector("#firstNameInput");
const otherNameInput = document.querySelector("#otherNameInput");
const staffIdInput = document.querySelector("#staffIdInput");
const statusInput = document.querySelector("#statusInput");
const errDiv = document.createElement("div");
errDiv.className = "alert alert-danger";

const editingForm = document.querySelector("#editingForm");
console.log(editingForm);

const params = new URLSearchParams(window.location.search);
// console.log(editingForm);
const paramValue = params.get("id");
console.log(paramValue);
lecturerIdInput.value = paramValue;

const getLecturerById = async () => {
  const dataObj = await axios.get(
    `http://localhost:8097/api/v1/lecturers/${lecturerIdInput.value}`
  );
  const data = await dataObj.data;


  const response = await axios.get("http://localhost:8097/api/v1/departments");
  const dat = response.data;

  const departmentSelect = document.getElementById("departmentIdInput");
  let godAbeg = dat.map((item, index) => {
    return `<option value="${item.DepartmentId}">${item.Name}</option>`;
  });
  let allData = `<option value="0">--Please-Select---</option>`;
  departmentSelect.innerHTML=allData+godAbeg.join('')



//   console.log(data.UniqueId);
  lecturerIdInput.value = data.LecturerId;
  departmentIdInput.value = data.DepartmentId;
  surNameInput.value = data.Surname;
  firstNameInput.value = data.FirstName;
  otherNameInput.value = data.OtherName;
  staffIdInput.value = data.StaffId;
  statusInput.value = data.Status;
};
console.log(lecturerIdInput);
console.log(staffIdInput);
document.addEventListener("DOMContentLoaded", getLecturerById);

editingForm.addEventListener("submit", (e) => {
  // debugger
  e.preventDefault();
//   console.log("I'm being called");
  // GET INPUT TO EDIT
const lecturerIdInput = document.getElementById("lecturerIdInput");
const departmentIdInput = document.getElementById("departmentIdInput");
const surNameInput = document.querySelector("#surNameInput");
const firstNameInput = document.querySelector("#firstNameInput");
const otherNameInput = document.querySelector("#otherNameInput");
const staffIdInput = document.querySelector("#staffIdInput");
const statusInput = document.querySelector("#statusInput");

  // GETTING  OUR VALIDATOR FUNCTION
  const validate = new Validate();

  // OBEJCT TO SEND TO DB
  const submitForm = {
    LecturerId: Number(lecturerIdInput.value),
    DepartmentId: Number(departmentIdInput.value),
    Surname: surNameInput.value,
    FirstName: firstNameInput.value,
    OtherName: otherNameInput.value,
    StaffId: Number(staffIdInput.value),
    // Status: statusInput.value,
    Status: Number(statusInput.value),
  };

  console.log(submitForm);
  validate.min_length(submitForm.DepartmentId, 1, "DepartmentId");
  validate.length(submitForm.Surname, 3, 50, "Surname");
  validate.length(submitForm.FirstName, 3, 50, "FirstName");
  validate.length(submitForm.OtherName, 3, 50, "OtherName");
  validate.min_length(submitForm.StaffId, 1, "StaffId");
//   validate.length(submitForm.Code, 3, 10, "Code");

  // // CHECK FOR ERROR BEFORE PUTING
  if (validate._errors.length > 0) {
    errDiv.innerHTML = validate.errors[0];
    editingForm.prepend(errDiv);
    setTimeout(() => {
      errDiv.remove();
    }, 3000);
  } else {
    axios
      .put("http://localhost:8097/api/v1/lecturers", submitForm)
      .then((result) => {
        console.log(result);
        window.location.href =
          "http://127.0.0.1:5500/frontend/modules/html/lecturer/lecturer.html";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
