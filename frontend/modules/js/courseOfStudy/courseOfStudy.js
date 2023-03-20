const addAllForm = document.getElementById("addAllForm");

const CourseOfStudy = async () => {
  try {
    const table = document.getElementById("table-body");
    const response = await axios.get(
      "http://localhost:8097/api/v1/coursesOfStudy"
    );
    const data = response.data;

    const resp = await axios.get("http://localhost:8097/api/v1/departments");
    const dat = resp.data;

    const departmentSelect = document.getElementById("departmentId");
    let godAbeg = dat.map((item, index) => {
      return `<option value="${item.DepartmentId}">${item.Name}</option>`;
    });
    let yeag = '<option value="0">---Please Select---</option>';
    departmentSelect.innerHTML = yeag + godAbeg.join("");

    data.forEach((courseOfStudy, id) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${id + 1}</td>
        <td>${courseOfStudy.CourseOfStudyId}</td>
        <td>${courseOfStudy.DepartmentId}</td>
        <td>${courseOfStudy.Name}</td>
        <td>${courseOfStudy.ShortName}</td>
        <td>${courseOfStudy.UniqueId}</td>
        <td>${courseOfStudy.Award}</td>
        <td>${
          courseOfStudy.Status == 1
            ? '<div class="text-success">Active</div>'
            : '<div class="text-danger">Inactive<div>'
        }</td>
        <td>
          <a href="../../html/courseOfStudy/edits.html?id=${
            courseOfStudy.CourseOfStudyId
          }" class="btn btn-primary">Edit</a>
          <button class="btn btn-danger" onclick="deletecourseOfStudy(${
            courseOfStudy.CourseOfStudyId
          })">Delete</button>
          <a href="../../html/courseOfStudy/details.html?id=${
            courseOfStudy.CourseOfStudyId
          }" class="btn btn-success">Details</a>

        </td>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }
};

function deletecourseOfStudy(id) {
  axios
    .delete("http://localhost:8097/api/v1/coursesOfStudy/" + id)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}

document.addEventListener("DOMContentLoaded", CourseOfStudy);

addAllForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const departmentId = document.getElementById("departmentId");
  const name = document.getElementById("name");
  const shortName = document.getElementById("shortName");
  const uniqueId = document.getElementById("uniqueId");
  const award = document.getElementById("award");
  const duration = document.getElementById("duration");
  const requiredCreditUnit = document.getElementById("requiredCreditUnit");
  const advisor = document.getElementById("advisor");
  const status = document.getElementById("statusInput");

  const submitForm = {
    DepartmentId: Number(departmentId.value),
    Name: name.value,
    ShortName: shortName.value,
    UniqueId: uniqueId.value,
    Award: award.value,
    Duration: Number(duration.value),
    RequiredCreditUnit: Number(requiredCreditUnit.value),
    Advisor: advisor.value,
    Status: Number(status.value),
  };

    const validate = new Validate();
    validate.min_length(submitForm.DepartmentId, 1, "DepartmentId");
    validate.length(submitForm.Name, 3, 50, "Name");
    validate.length(submitForm.ShortName, 3, 50, "ShortName");
    validate.length(submitForm.UniqueId, 3, 10, "Code");
    validate.length(submitForm.Award, 3, 100, "Award");
    validate.min_length(submitForm.Duration, 1, "Duration");
    validate.min_length(submitForm.RequiredCreditUnit, 1, "RequiredCreditUnit");
   validate.length(submitForm.Advisor, 3, 50, "Advisor");    

      const formData = new FormData(addAllForm);
      const info = Object.fromEntries(formData.entries());
      // validate checkbox
      if (info.Status) {
        info.Status = 1;
      } else {
        info.Status = 0;
      }

    if (validate.errors.length > 0) {
      alert(validate.errors[0]);
      return;
    } else {
      console.log("working");
      axios
        .post("http://localhost:8097/api/v1/coursesOfStudy/add", submitForm)
        .then((response) => {
          window.location.reload();
        })
        .catch((err) => {
          console.log(err);
        });
    }
});
