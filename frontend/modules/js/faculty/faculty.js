
const addAllForm = document.getElementById('addAllForm');

const facult = async () => {
  try {
    const table = document.getElementById('table-body');
    const response = await axios.get('http://localhost:8097/api/v1/faculties');
    const data = response.data;

    

    data.forEach((faculty, id) => {
      const row = document.createElement('tr');
      row.innerHTML = `
        <td>${id + 1}</td>
        <td>${faculty.Name}</td>
        <td>${faculty.UniqueId}</td>
        <td>${faculty.Code}</td>
        <td>${faculty.Status == 1 ? '<div class="text-success">Active</div>' : '<div class="text-danger">Inactive<div>'}</td>
        <td>
          <a href="../../html/faculty/editfaculty.html?id=${faculty.FacultyId}" class="btn btn-primary">Edit</a>
          <button class="btn btn-danger"  onclick="deletefaculty(${faculty.FacultyId})">Delete</button>
          <a href="../../html/faculty/detailfaculty.html?id=${faculty.FacultyId}" class="btn btn-success">Details</a>
      `;
      table.appendChild(row);
    });
  } catch (error) {
    console.log(error);
  }

}



document.addEventListener('DOMContentLoaded', facult);

function deletefaculty(id){
  axios.delete('http://localhost:8097/api/v1/faculties/'+id).then((res) => {
    window.location.reload()
  }).catch((err) => {
    console.log(err);
  })
}


addAllForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const ALLData = new FormData(addAllForm);
  const info = Object.fromEntries(ALLData.entries());
  // validate checkbox
  if (info.Status) {
    info.Status = 1;
  } else {
    info.Status = 0;
  }
  console.log(info);

  const validate = new Validate();
  validate.length(info.Name, 3, 50, 'Name');
  validate.length(info.UniqueId, 3, 10, 'UniqueId');
  validate.length(info.Code, 3, 10, 'Code');

  if (validate.errors.length > 0) {
    console.log(validate.errors[0]);
    return;
  }
  else{
    console.log("not working");
    axios.post('http://localhost:8097/api/v1/faculties/add', info).then((response) => {
    window.location.reload()
    }).catch((err) => {
      console.log(err);
    })
  }

});




