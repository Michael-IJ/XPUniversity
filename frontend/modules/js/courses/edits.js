const courseIdInput = document.getElementById("courseIdInput");
 const departmentId = document.getElementById("departmentId");
 const nameInput = document.getElementById("nameInput");
 const code = document.getElementById("code");
 const uniqueId = document.getElementById("uniqueId");
 const units = document.getElementById("units");
 const courseLevelInput = document.getElementById("courseLevelInput");
 const courseSemester = document.getElementById("courseSemester");
 const statusInput = document.getElementById("statusInput");

const errDiv = document.createElement("div");
errDiv.className = "alert alert-danger";

const editingForm = document.querySelector("#editingForm");
console.log(editingForm);

const params = new URLSearchParams(window.location.search);
// console.log(editingForm);
const paramValue = params.get("id");
console.log(paramValue);
courseIdInput.value = paramValue;

const getCoursesById = async () => {
  const dataObj = await axios.get(
    `http://localhost:8097/api/v1/courses/${courseIdInput.value}`
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

  //   console.log(data.UniqueId);
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
// console.log(lecturerIdInput);
// console.log(staffIdInput);
document.addEventListener("DOMContentLoaded", getCoursesById);

editingForm.addEventListener("submit", (e) => {
  // debugger
  e.preventDefault();
    console.log("I'm being called");
  // GET INPUT TO EDIT
const courseIdInput = document.getElementById("courseIdInput");
const departmentId = document.getElementById("departmentId");
const nameInput = document.getElementById("nameInput");
const code = document.getElementById("code");
const uniqueId = document.getElementById("uniqueId");
const units = document.getElementById("units");
const courseLevelInput = document.getElementById("courseLevelInput");
const courseSemester = document.getElementById("courseSemester");
const status = document.getElementById("statusInput");

  // GETTING  OUR VALIDATOR FUNCTION
  const validate = new Validate();

//   // OBEJCT TO SEND TO DB
  const submitForm = {
    CourseId: Number(courseIdInput.value),
   DepartmentId: Number(departmentId.value),
    Name: nameInput.value,
    Code: code.value,
    UniqueId: uniqueId.value,
    Units: Number(units.value),
    CourseLevel: Number(courseLevelInput.value),
    CourseSemester: Number(courseSemester.value),
    Status: Number(status.value),
 };

//   console.log(submitForm);
  validate.min_length(submitForm.CourseId, 1,"CourseId");
  validate.min_length(submitForm.DepartmentId, 1, "DepartmentId");
  validate.length(submitForm.Name, 3, 50, "Name");
  validate.length(submitForm.UniqueId, 3, 10, "Code");
  validate.min_length(submitForm.Units, 1, "Units");
  validate.length(submitForm.Code, 3, 10, "Code");
  validate.min_length(submitForm.CourseLevel, 1, "CourseLevel");
  validate.min_length(submitForm.CourseSemester, 1, "CourseSemester");

//   if(submitForm.CourseLevel === 0){
//     errDiv.innerHTML = validate.errors[0];
//     editingForm.prepend(errDiv);
//     setTimeout(() => {
//       errDiv.remove();
//     }, 3000);
//   }


  // // CHECK FOR ERROR BEFORE PUTING
  if (validate._errors.length > 0) {
    errDiv.innerHTML = validate.errors[0];
    editingForm.prepend(errDiv);
    setTimeout(() => {
      errDiv.remove();
    }, 3000);
  } else {
    axios
      .put("http://localhost:8097/api/v1/courses", submitForm)
      .then((result) => {
        console.log(result);
        window.location.href =
          "http://127.0.0.1:5500/frontend/modules/html/courses/course.html";
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
