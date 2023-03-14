const departmentIdInput = document.getElementById("departmentIdInput");
const facultyIdInput = document.querySelector("#facultyIdInput");
const nameInput = document.querySelector("#nameInput");
const uniqueIdInput = document.querySelector("#uniqueIdInput");
const codeInput = document.querySelector("#codeInput");
const statusInput = document.querySelector("#statusInput");
const errDiv = document.createElement('div');
  errDiv.className = 'alert alert-danger';

const editingForm = document.querySelector("#editingForm");
console.log(editingForm);

const params = new URLSearchParams(window.location.search);
// console.log(editingForm);
const paramValue = params.get("id");
console.log(paramValue);
departmentIdInput.value = paramValue;

const getDepartmentById = async () => {
  const dataObj = await axios.get(
    `http://localhost:8097/api/v1/departments/${departmentIdInput.value}`
  );
  const data = await dataObj.data;
  console.log(data.UniqueId);
  departmentIdInput.value = data.DepartmentId;
  facultyIdInput.value = data.FacultyId;
  nameInput.value = data.Name;
  uniqueIdInput.value = data.UniqueId;
  codeInput.value = data.Code;
  statusInput.value = data.Status;
};

document.addEventListener("DOMContentLoaded", getDepartmentById);

editingForm.addEventListener("submit", (e) => {
    // debugger
  e.preventDefault();
  console.log("I'm being called");
  // GET INPUT TO EDIT
  const departmentIdInput = document.getElementById("departmentIdInput");
  const facultyIdInput = document.querySelector("#facultyIdInput");
  const nameInput = document.querySelector("#nameInput");
  const uniqueIdInput = document.querySelector("#uniqueIdInput");
  const codeInput = document.querySelector("#codeInput");
  const statusInput = document.querySelector("#statusInput");

  // GETTING  OUR VALIDATOR FUNCTION
  const validate = new Validate();

  // OBEJCT TO SEND TO DB
  const submitForm = {
    DepartmentId: Number(departmentIdInput.value),
    FacultyIdInput: Number(facultyIdInput.value),
    Name: nameInput.value,
    UniqueId: uniqueIdInput.value,
    Code: codeInput.value,
    // Status: statusInput.value,
    Status: Number(statusInput.value),
  };

  console.log(submitForm);
  validate.min_length(submitForm.FacultyIdInput, 1, "FacultyIdInput");
  validate.length(submitForm.Name, 3, 50, 'Name');
  validate.length(submitForm.UniqueId, 3, 10, 'UniqueId');
  validate.length(submitForm.Code, 3, 10, 'Code');

  // // CHECK FOR ERROR BEFORE PUTING
  if (validate._errors.length > 0) {
    errDiv.innerHTML = validate.errors[0];
    editingForm.prepend(errDiv);
    setTimeout(() => {
      errDiv.remove();
    }, 3000);
  } else {
    axios
      .put("http://localhost:8097/api/v1/departments", submitForm)
      .then((result) => {
        console.log(result);
        window.location.href =
          "http://127.0.0.1:5500/frontend/modules/html/department/department.html";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
