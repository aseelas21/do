const { executeQuery } = require("../config/dbHelper");

const Job = {
  //findBySkills: async (skills) => {
  //  const query = `
  //    SELECT * FROM tbl_108_dowork_Jobs 
  //    WHERE skill IN (?)`;
  //  console.log("Executing query:", query, skills);
  //  return executeQuery(query, [skills]);
  //},

  findSkillsByJobId: async (job_id) => {
    const query = "SELECT skill FROM tbl_108_dowork_Jobs WHERE job_id = ?";
    console.log("Executing query:", query, job_id);
    return executeQuery(query, [job_id]);
  },

  create: async (job) => {
    const query =
      "INSERT INTO tbl_108_dowork_Jobs (employer_id, title, description, location, salary, skill) VALUES (?, ?, ?, ?, ?, ?)";
    const values = [
      job.employer_id,
      job.title,
      job.description,
      job.location,
      job.salary,
      job.skill,
    ];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },

  checkEmployerExists: async (employer_id) => {
    const query = "SELECT * FROM tbl_108_dowork_Employers WHERE employer_id = ?";
    const result = await executeQuery(query, [employer_id]);
    return result.length > 0;
  },

  checkEmployeeSeekerExists: async (employee_seeker_id) => {
    const query = "SELECT * FROM tbl_108_dowork_EmployeeSeekers WHERE employee_seeker_id = ?";
    const result = await executeQuery(query, [employee_seeker_id]);
    return result.length > 0;
  },

  findAll: async () => {
    const query = "SELECT * FROM tbl_108_dowork_Jobs";
    console.log("Executing query:", query);
    return executeQuery(query);
  },

  findById: async (id) => {
    const query = "SELECT * FROM tbl_108_dowork_Jobs WHERE job_id = ?";
    console.log("Executing query:", query, id);
    return executeQuery(query, [id]);
  },
  findAllWithCompanyDetails: async () => {
    const query = `
      SELECT tbl_108_dowork_Jobs.title, tbl_108_dowork_Jobs.description, tbl_108_dowork_Employers.company_name, tbl_108_dowork_EmployeeSeekers.username
      FROM tbl_108_dowork_Jobs
      JOIN tbl_108_dowork_Employers ON tbl_108_dowork_Jobs.employer_id = tbl_108_dowork_Employers.employer_id
      JOIN tbl_108_dowork_EmployeeSeekers ON tbl_108_dowork_Employers.employee_seeker_id = tbl_108_dowork_EmployeeSeekers.employee_seeker_id;
    `;
    console.log("Executing query:", query);
    return executeQuery(query);
  },

  findBySkillsOfJobSeeker: async (job_seeker_id) => {
    const query = `
      SELECT 
          tbl_108_dowork_Jobs.title, 
          tbl_108_dowork_Jobs.description, 
          tbl_108_dowork_Jobs.location, 
          tbl_108_dowork_Jobs.salary, 
          tbl_108_dowork_Employers.company_name 
      FROM 
        tbl_108_dowork_Jobs 
      JOIN 
        tbl_108_dowork_Employers 
      ON 
        tbl_108_dowork_Jobs.employer_id = tbl_108_dowork_Employers.employer_id 
      JOIN 
        tbl_108_dowork_JobSeekers 
      ON 
        FIND_IN_SET(tbl_108_dowork_Jobs.skill, tbl_108_dowork_JobSeekers.skills) > 0 
      WHERE 
        tbl_108_dowork_JobSeekers.job_seeker_id = ?;
    `;
    const values = [job_seeker_id];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },
  searchJobs: async (searchTerm) => {
    const query = `
      SELECT 
        tbl_108_dowork_Jobs.title, 
        tbl_108_dowork_Jobs.description, 
        tbl_108_dowork_Jobs.location, 
        tbl_108_dowork_Jobs.salary, 
        tbl_108_dowork_Employers.company_name 
      FROM 
        tbl_108_dowork_Jobs 
      JOIN 
        tbl_108_dowork_Employers 
      ON 
        tbl_108_dowork_Jobs.employer_id = tbl_108_dowork_Employers.employer_id 
      WHERE 
        tbl_108_dowork_Jobs.title LIKE ? 
        OR tbl_108_dowork_Jobs.description LIKE ? 
        OR tbl_108_dowork_Jobs.skill LIKE ?;
    `;
    const values = [`%${searchTerm}%`, `%${searchTerm}%`, `%${searchTerm}%`];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },

  update: async (id, job) => {
    const query =
      "UPDATE tbl_108_dowork_Jobs SET title = ?, description = ?, location = ?, salary = ?, skill = ? WHERE job_id = ?";
    const values = [
      job.title,
      job.description,
      job.location,
      job.salary,
      job.skill,
      id,
    ];
    console.log("Executing query:", query, values);
    return executeQuery(query, values);
  },

  delete: async (id) => {
    const query = "DELETE FROM tbl_108_dowork_Jobs WHERE job_id = ?";
    console.log("Executing query:", query, id);
    return executeQuery(query, [id]);
  },
};

module.exports = Job;
