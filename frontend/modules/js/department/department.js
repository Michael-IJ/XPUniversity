const addForms  = document.getElementById('addForms');

const Dept = async () => {
    try{
        const table = document.getElementById('table-body');
    const response = await axios.get('http://localhost:8097/api/v1/departments');
    const data = response.data;

   const resp = await axios.get('http://localhost:8097/api/v1/faculties');
    const dat= resp.data;

    const facultySelect = document.getElementById("facultyId")
    let godAbeg = dat.map((item, index)=>{
      return `<option value="${item.FacultyId}">${item.Name}</option>`
    })
    let yeag = '<option value="0">---Please Select---</option>'
     facultySelect.innerHTML=yeag+godAbeg.join('')
    data.forEach((departments, id) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${id + 1}</td>
        <td>${departments.Name}</td>
        <td>${departments.UniqueId}</td>
        <td>${departments.Code}</td>
        <td>${departments.Status == 1 ? '<div class="text-success">Active</div>' : '<div class="text-danger">Inactive<div>'}</td>
        <td>
          <a href="../../html/department/edits.html?id=${departments.DepartmentId}" class="btn btn-primary">Edit</a>
          <button class="btn btn-danger" onclick="deleteDepartment(${departments.DepartmentId})">Delete</button>
          <a href="../../html/department/details.html?id=${departments.DepartmentId}" class="btn btn-success">Details</a>

        </td>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  } 

}


// delete 
function deleteDepartment(id) {
  axios
    .delete("http://localhost:8097/api/v1/departments/" + id)
    .then((res) => {
      window.location.reload();
    })
    .catch((err) => {
      console.log(err);
    });
}



document.addEventListener('DOMContentLoaded', Dept );

addForms.addEventListener('submit', (e) => {
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
  validate.length(info.FacultyId, 1,'FacultyId');
  validate.length(info.Name, 3, 50, 'Name');
  validate.length(info.UniqueId, 3, 10, 'UniqueId');
  validate.length(info.Code, 3, 10, 'Code');

  if (validate.errors.length > 0) {
    alert(validate.errors[0]);
    return;
  }
  else{
    console.log("not working");
    axios.post('http://localhost:8097/api/v1/departments/add', info).then((response) => {
    window.location.reload()
    }).catch((err) => {
      console.log(err);
    });
  }
});
