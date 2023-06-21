const express = require('express');
const fs = require('fs/promises');

const app = express();
const PORT = 3003;

app.get('/', (req,res)=>{
    res.send("application is runnning on browser")
})

// First API - Get employee data by ID
app.get('/employee/:id', async (req, res) => {
  try {
    const employeesData = await fs.readFile('E:/Edurekha_Full Stack Master Program/Node.js/Training/assignment2.1/data/emp.json', 'utf-8');
    const employees = JSON.parse(employeesData).employees;
    const employeeId = req.params.id;

    const employee = employees.find((emp) => emp.projectId === employeeId);
    if (employee) {
      res.json(employee);
    } else {
      res.status(404).json({ message: 'Employee not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Second API - Get project information by ID
app.get('/project/:id', async (req, res) => {
  try {
    const projectsData = await fs.readFile('E:/Edurekha_Full Stack Master Program/Node.js/Training/assignment2.1/data/project.json', 'utf-8');
    const projects = JSON.parse(projectsData).projects;
    const projectId = req.params.id;

    const project = projects.find((proj) => proj.projectId === projectId);
    if (project) {
      res.json(project);
    } else {
      res.status(404).json({ message: 'Project not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Third API - Get employee data with project details
app.get('/getemployeedetails', async (req, res) => {
  try {
    const employeesData = await fs.readFile('E:/Edurekha_Full Stack Master Program/Node.js/Training/assignment2.1/data/emp.json', 'utf-8');
    const employees = JSON.parse(employeesData).employees;
    const projectsData = await fs.readFile('E:/Edurekha_Full Stack Master Program/Node.js/Training/assignment2.1/data/project.json', 'utf-8');
    const projects = JSON.parse(projectsData).projects;

    const employeeDetails = employees.map((emp) => {
      const project = projects.find((proj) => proj.projectId === emp.projectId);
      return { ...emp, project };
    });

    res.json(employeeDetails);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});