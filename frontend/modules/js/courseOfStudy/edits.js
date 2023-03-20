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

const errDiv = document.createElement("div");
errDiv.className = "alert alert-danger";

const editingForm = document.querySelector("#editingForm");

const params = new URLSearchParams(window.location.search);

const paramValue = params.get("id");
console.log(paramValue);
courseOfStudyId.value = paramValue;

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

  courseOfStudyIdInput.value = data.CourseOfStudyId;
  departmentId.value = data.DepartmentId;
  nameInput.value = data.Name;
  shortName.value = data.ShortName;
  uniqueId.value = data.UniqueId;
  award.value = data.Award;
  duration.value = data.Duration;
  requiredCreditUnit.value = data.RequiredCreditUnit
  advisor.value = data.Advisor
  statusInput.value = data.Status;
};

document.addEventListener("DOMContentLoaded", getCourseOfStudyById);

editingForm.addEventListener("submit", (e) => {
  
  e.preventDefault();
  console.log("I'm being called");
  // GET INPUT TO EDIT
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

  // GETTING  OUR VALIDATOR FUNCTION
  const validate = new Validate();

  //   // OBEJCT TO SEND TO DB
  const submitForm = {
    CourseOfStudyId:Number(courseOfStudyIdInput.value),
    DepartmentId: Number(departmentId.value),
    Name: nameInput.value,
    ShortName: shortName.value,
    UniqueId: uniqueId.value,
    Award: award.value,
    Duration: Number(duration.value),
    RequiredCreditUnit: Number(requiredCreditUnit.value),
    Advisor: advisor.value,
    Status: Number(status.value)
  };


  validate.min_length(submitForm.CourseOfStudyId, 1, "CourseOfStudyId");
    validate.min_length(submitForm.DepartmentId, 1, "DepartmentId");
    validate.length(submitForm.Name, 3, 50, "Name");
    validate.length(submitForm.ShortName, 3, 50, "ShortName");
    validate.length(submitForm.UniqueId, 3, 10, "Code");
    validate.length(submitForm.Award, 3, 100, "Award");
    validate.min_length(submitForm.Duration, 1, "Duration");
    validate.min_length(submitForm.RequiredCreditUnit, 1, "RequiredCreditUnit");
    validate.length(submitForm.Advisor, 3, 50, "Advisor");  



  // // CHECK FOR ERROR BEFORE PUTING
  if (validate._errors.length > 0) {
    errDiv.innerHTML = validate.errors[0];
    editingForm.prepend(errDiv);
    setTimeout(() => {
      errDiv.remove();
    }, 3000);
  } else {
    axios
      .put("http://localhost:8097/api/v1/coursesOfStudy", submitForm)
      .then((result) => {
        console.log(result);
        window.location.href =
          "http://127.0.0.1:5500/frontend/modules/html/courseOfStudy/courseOfStudy.html";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
