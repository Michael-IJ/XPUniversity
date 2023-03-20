// GET ALL OUR INPUTS READY AHEAD OF TIME
const courseIdInput = document.getElementById("courseIdInput");
const departmentId = document.getElementById("departmentId");
const nameInput = document.getElementById("nameInput");
const code = document.getElementById("code");
const uniqueId = document.getElementById("uniqueId");
const units = document.getElementById("units");
const courseLevelInput = document.getElementById("courseLevelInput");
const courseSemester = document.getElementById("courseSemester");
const statusInput = document.getElementById("statusInput");

const editingForm = document.querySelector("#editingForm");

const params = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const paramValue = params.get("id");
console.log(paramValue);
courseIdInput.value = paramValue;

// Get information from the id parameter
const getCoursesById = async () => {
  const dataObj = await axios.get(
    `http://localhost:8097/api/v1/courses/${courseIdInput.value}`
  );
  const data = await dataObj.data;

    const response = await axios.get(
      "http://localhost:8097/api/v1/departments"
    );
    const dat = response.data;

    const departmentSelect = document.getElementById("departmentId");
    let godAbeg = dat.map((item, index) => {
      return `<option value="${item.DepartmentId}">${item.Name}</option>`;
    });
    let allData = `<option value="0">--Please-Select---</option>`;
    departmentSelect.innerHTML = allData + godAbeg.join("");
  // console.log(data.UniqueId);
  courseIdInput.value = data.CourseId;
  departmentId.value = data.DepartmentId;
  nameInput.value = data.Name;
  code.value = data.Code;
  uniqueId.value = data.UniqueId;
  units.value = data.Units;
  courseLevelInput.value = data.CourseLevel;
  courseSemester.value = data.CourseSemester;
  statusInput.value = data.Status;
};

document.addEventListener("DOMContentLoaded", getCoursesById);
