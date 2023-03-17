const addAllForm = document.getElementById("addAllForm");

const Course = async () => {
  try {
    const table = document.getElementById("table-body");
    const response = await axios.get("http://localhost:8097/api/v1/courses");
    const data = response.data;

    const resp = await axios.get("http://localhost:8097/api/v1/departments");
    const dat = resp.data;

    const departmentSelect = document.getElementById("departmentId");
    let godAbeg = dat.map((item, index) => {
      return `<option value="${item.DepartmentId}">${item.Name}</option>`;
    });
    let yeag = '<option value="0">---Please Select---</option>';
    departmentSelect.innerHTML = yeag + godAbeg.join("");

    data.forEach((courses, id) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${id + 1}</td>
        <td>${courses.CourseId}</td>
        <td>${courses.Name}</td>
        <td>${courses.UniqueId}</td>
        <td>${courses.Code}</td>
        <td>${
          courses.Status == 1
            ? '<div class="text-success">Active</div>'
            : '<div class="text-danger">Inactive<div>'
        }</td>
        <td>
          <a href="../../html/courses/edits.html?id=${
            courses.CourseId
          }" class="btn btn-primary">Edit</a>
          <button class="btn btn-danger" onclick="deleteCourses(${
            courses.CourseId
          })">Delete</button>
          <a href="../../html/courses/details.html?id=${
            courses.CourseId
          }" class="btn btn-success">Details</a>

        </td>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
};

function deleteCourses(id) {
  axios
    .delete("http://localhost:8097/api/v1/courses/" + id)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", Course);

addAllForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const departmentId = document.getElementById("departmentId");
  const name = document.getElementById("name");
  const code = document.getElementById("code");
  const uniqueId = document.getElementById("uniqueId");
  const units = document.getElementById("units");
  const courseLevel = document.getElementById("courseLevelInput");
  const courseSemester = document.getElementById("courseSemester");
  const status = document.getElementById("statusInput");

  const submitForm = {
    DepartmentId: Number(departmentId.value),
    Name: name.value,
    Code: code.value,
    UniqueId: uniqueId.value,
    Units: Number(units.value),
    CourseLevel: Number(courseLevel.value),
    CourseSemester: Number(courseSemester.value),
    Status: Number(status.value),
  };

  const validate = new Validate();
  validate.min_length(submitForm.DepartmentId, 1, "DepartmentId");
  validate.length(submitForm.Name, 3, 50, "Name");
  validate.length(submitForm.UniqueId, 3, 10, "Code");
  validate.min_length(submitForm.Units, 1, "Units");
  validate.length(submitForm.Code, 3, 10, "Code");
  validate.min_length(submitForm.CourseLevel, 1, "CourseLevel");
  validate.min_length(submitForm.CourseSemester, 1, "CourseSemester");
  //   validate.min_length(submitForm.StaffId, 1, "StaffId");

  //   const formData = new FormData(addAllForm);
  //   const info = Object.fromEntries(formData.entries());
  //   // validate checkbox
  //   if (info.Status) {
  //     info.Status = 1;
  //   } else {
  //     info.Status = 0;
  //   }

  if (validate.errors.length > 0) {
    alert(validate.errors[0]);
    return;
  } else {
    console.log("working");
    axios
      .post("http://localhost:8097/api/v1/courses/add", submitForm)
      .then((response) => {
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  }
});
