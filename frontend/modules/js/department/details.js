// GET ALL OUR INPUTS READY AHEAD OF TIME 
const departmentIdInput = document.getElementById("departmentIdInput");
const facultyIdInput = document.querySelector('#facultyIdInput');
const nameInput = document.querySelector('#nameInput');
const uniqueIdInput = document.querySelector('#uniqueIdInput');
const codeInput = document.querySelector('#codeInput');
const statusInput = document.querySelector('#statusInput');
const editingForm = document.querySelector('#editingForm');

const params = new URLSearchParams(window.location.search);

// Get the value of the 'id' parameter
const paramValue = params.get('id');
console.log(paramValue);
departmentIdInput.value = paramValue;


// Get information from the id parameter
const getDepartmentById = async () => {
    const dataObj = await axios.get(`http://localhost:8097/api/v1/departments/${departmentIdInput.value}`)
    const data = await dataObj.data
    // console.log(data.UniqueId);

    facultyIdInput.value = data.FacultyId;
    nameInput.value  = data.Name;
    uniqueIdInput.value  = data.UniqueId;
    codeInput.value  = data.Code;
    statusInput.value  = data.Status == 1 ? 'Active' : 'Inactive';
} 



document.addEventListener('DOMContentLoaded', getDepartmentById);
