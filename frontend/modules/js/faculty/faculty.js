
const addAllForm = document.getElementById('addAllForm');

const facult = async () => {
  try {
    const table = document.getElementById('table-body');
    const response = await axios.get('http://localhost:8097/api/v1/faculties');
    const data = response.data;

    
    
const searchModalForm = document.querySelector('#searchModalForm');
const searchModal = document.getElementById("searchModal");
const searchModalEvent = new MouseEvent('click', {
  view: window,
  bubbles: true,
  cancelable: true
});


searchModalForm.addEventListener('submit', searchFacultyForm)



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
          <button class="btn btn-danger"  onClick="deletefaculty(${faculty.FacultyId})">Delete</button>
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

const searchModalForm = document.querySelector("#searchModalForm");
const searchModal = document.getElementById("searchModal");
const searchModalEvent = new MouseEvent("click", {
  view: window,
  bubbles: true,
  cancelable: true,
});

searchModalForm.addEventListener("submit", searchFacultyForm);

async function searchFacultyForm(e) {
  e.preventDefault();
  table.innerHTML = null;

  const formData = new FormData(searchModalForm);
  const searchFormData = Object.fromEntries(formData.entries());
  if (searchFormData.Status) {
    searchFormData.Status = 1;
  } else {
    searchFormData.Status = 0;
  }

  //? WE HAVE OUR DATA TO SEARCH FOR NOW WE SEARCH IN OUR DATABASE
  const fetchFilter = await axios.post(
    "http://localhost:8097/api/v1/faculties/",
    searchFormData
  );
  const resultFilter = await fetchFilter;
  const filteredData = resultFilter.data;
  searchModal.dispatchEvent(searchModalEvent);

  if (filteredData.length < 1) {
    setTimeout(() => {
      alert("No Such Data Exist Please Change your filter");
    }, 1000);
  }

  // filteredData.forEach((faculty, index) => {
  //   const row = document.createElement("tr");
  //   row.innerHTML = `
  //     <td>${index + 1}</td>
  //     <td>${faculty.Name}</td>
  //     <td>${faculty.UniqueId}</td>
  //     <td>${faculty.Code}</td>
  //     <td>${
  //       faculty.Status == 1
  //         ? '<div class="text-success">Active</div>'
  //         : '<div class="text-danger">Inactive<div>'
  //     }</td>
  //     <td>
  //       <a href="../../html/faculty/editfaculty.html?id=${
  //         faculty.FacultyId
  //       }" class="btn btn-primary">Edit</a>
  //       <button class="btn btn-danger"  onclick="deletefaculty(${
  //         faculty.FacultyId
  //       })">Delete</button>
  //       <a href="../../html/faculty/detailfaculty.html?id=${
  //         faculty.FacultyId
  //       }" class="btn btn-success">Details</a>
  //     </td>
  //   `;
  //   table.appendChild(row);

  // });
}



