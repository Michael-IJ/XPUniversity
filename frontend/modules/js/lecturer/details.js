// GET ALL OUR INPUTS READY AHEAD OF TIME
const lecturerIdInput = document.getElementById("lecturerIdInput");
const departmentIdInput = document.getElementById("departmentIdInput");
const surNameInput = document.querySelector("#surNameInput");
const firstNameInput = document.querySelector("#firstNameInput");
const otherNameInput = document.querySelector("#otherNameInput");
const staffIdInput = document.querySelector("#staffIdInput");
const statusInput = document.querySelector("#statusInput");
const editingForm = document.querySelector("#editingForm");

const params = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const paramValue = params.get("id");
console.log(paramValue);
lecturerIdInput.value = paramValue;

// Get information from the id parameter
const getLecturerById = async () => {
  const dataObj = await axios.get(
    `http://localhost:8097/api/v1/lecturers/${lecturerIdInput.value}`
  );
  const data = await dataObj.data;
  // console.log(data.UniqueId);

   lecturerIdInput.value = data.LecturerId;
   departmentIdInput.value = data.DepartmentId;
   surNameInput.value = data.Surname;
   firstNameInput.value = data.FirstName;
   otherNameInput.value = data.OtherName;
   staffIdInput.value = data.StaffId;
   statusInput.value = data.Status;
};

document.addEventListener("DOMContentLoaded", getLecturerById);
