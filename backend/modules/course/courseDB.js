const pool = require('../../dbconfig');
let errMsg = "";

const getAllCourses = async () => {
  try {
    const result = await pool.query('SELECT * FROM "AcadSchema"."Course" ORDER BY "Name" ASC')
    return result.rows;
  } catch (error) {
    console.log(error);
    errMsg = error;
    return null;
  }
}


const getCourses = async (departmentId, status, name) => {
  try {
    let query = 'SELECT * FROM "AcadSchema"."Course" WHERE 1 = 1';
    let values = [];
    let index = 1;
    if (name && name.length > 0) {
      query += ` AND "Name" LIKE $${index}`;
      index++;
      values.push(`%${name}%`);
    }
    if (departmentId && departmentId > 0) {
      query += ` AND "DepartmentId" = $${index}`;
      index++
      values.push(departmentId);
    }
    if (status && status > -1) {
      query +=  ` AND "Status" = $${index}`;
      values.push(status);
    }
    query += ' ORDER BY "CourseId" ASC ';
    const result = await pool.query(query, values);
    if (result?.rows.length > 0) {
      return result.rows;
    }
    return null;
  } catch (error) {
    console.log(error);
    errMsg = error;
    return null;
  }
}


const getCourse = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM "AcadSchema"."Course" WHERE "CourseId" = $1', [id])
    if (result.rows.length > 0) {
      return result.rows[0]
    } else {
      return [];
    }
  } catch (error) {
    errMsg = error;
    return null;
  }
}


const addCourse = async (course) => {
  try {
    const result = await pool.query('INSERT INTO "AcadSchema"."Course" ("Name", "DepartmentId", "UniqueId", "Code", "Units", "CourseLevel", "CourseSemester", "Status") VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *',[course.Name, course.DepartmentId, course.UniqueId, course.Code, course.Units, course.CourseLevel, course.CourseSemester, course.Status]);
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    return null
  } catch (error) {
    console.log(error);
    errMsg = error;
    return null;
  }
}

const editCourse = async (course) => {
  try {
    const result = await pool.query('UPDATE "AcadSchema"."Course" SET "Name" = $1, "DepartmentId" = $2, "UniqueId" = $3, "Code" = $4, "Units" = $5, "CourseLevel" = $6, "CourseSemester" = $7, "Status" = $8 WHERE "CourseId" = $9 RETURNING *', [course.Name, course.DepartmentId, course.UniqueId, course.Code, course.Units, course.CourseLevel, course.CourseSemester, course.Status, course.CourseId]);
    if (result.rows.length > 0) {
      return result.rows[0];
    }
    // return [];
  } catch (error) {
    errMsg = error;
    return null;
  }
}

const removeCourse = async (id) => {
  try {
    const result = await pool.query('DELETE FROM "AcadSchema"."Course" WHERE "CourseId" = $1', [id]);
    if (result.rowCount > 0) {
      return true;
    }
    return false;
  } catch (error) {
    errMsg = error;
    return false;
  }
}



const getError = () => {
  return errMsg;
}

module.exports = {
  getAllCourses,
  getCourses,
  getCourse,
  addCourse,
  editCourse,
  removeCourse,
  getError
}