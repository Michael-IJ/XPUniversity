// GET ALL OUR INPUTS READY AHEAD OF TIME
const courseOfStudyIdInput = document.getElementById("courseOfStudyId");
const departmentId = document.getElementById("departmentId");
const nameInput = document.getElementById("nameInput");
const shortName = document.getElementById("shortName");
const uniqueId = document.getElementById("uniqueId");
const award = document.getElementById("award");
const duration = document.getElementById("duration");
const requiredCreditUnit = document.getElementById("requiredCreditUnit");
const advisor = document.getElementById("advisor");
const status = document.getElementById("statusInput");

const editingForm = document.querySelector("#editingForm");

const params = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const paramValue = params.get("id");
console.log(paramValue);
courseOfStudyId.value = paramValue;

// Get information from the id parameter
const getCourseOfStudyById = async () => {
  const dataObj = await axios.get(
    `http://localhost:8097/api/v1/coursesOfStudy/${courseOfStudyId.value}`
  );
  const data = await dataObj.data;

  const response = await axios.get("http://localhost:8097/api/v1/departments");
  const dat = response.data;

  const departmentSelect = document.getElementById("departmentId");
  let godAbeg = dat.map((item, index) => {
    return `<option value="${item.DepartmentId}">${item.Name}</option>`;
  });
  let allData = `<option value="0">--Please-Select---</option>`;
  departmentSelect.innerHTML = allData + godAbeg.join("");
  // console.log(data.UniqueId);
  courseOfStudyIdInput.value = data.CourseOfStudyId;
  departmentId.value = data.DepartmentId;
  nameInput.value = data.Name;
  shortName.value = data.ShortName;
  uniqueId.value = data.UniqueId;
  award.value = data.Award;
  duration.value = data.Duration;
  requiredCreditUnit.value = data.RequiredCreditUnit;
  advisor.value = data.Advisor;
  statusInput.value = data.Status;
};

document.addEventListener("DOMContentLoaded", getCourseOfStudyById);
