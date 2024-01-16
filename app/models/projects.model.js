//Name: Joey Han
//ID: 1555382

const {resume} = require("./db");
const db = require("./db");

//Constructor
const Project = function(project) {
  this.projectname = project.projectname;
  this.projectdesc = project.projectdesc;
  this.startdate = project.startdate;
  this.enddate = project.enddate;
};

//Create Project
Project.create = (newProject, result) => {
  db.query("INSERT INTO projects SET ?", newProject, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }
    console.log("Created project:", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

//Retrieve all Projects from the database.
Project.getAll = result => {
  db.query("SELECT * FROM projects", (err,res) =>{
    if(err) {
      console.log("error:", err);
      result(null,err);
      return;
    }
    console.log("projects:", res);
    result(null,res);
  });
};

//Get a single project by ID
Project.findById = (projectId, result) => {
  db.query(`SELECT * FROM projects WHERE id = ${projectId}`, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found project:", res[0]);
      result(null, res[0]);
      return;
    }

    //not found Project with the id (kind is used to indicate the type of response)
    result({ kind: "not_found" }, null);
  });
};

//Retrieve a single project by project name
Project.findByName = (projectName, result) => {
  db.query(`SELECT * FROM projects WHERE projectname = '${projectName}'`, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("Found project:", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Project with the project name
    result({ kind: "not_found" }, null);
  });
};

//Update a project by ID
Project.updateById = (id, project, result) => {
  db.query(
    "UPDATE projects SET projectname = ?, projectdesc = ?, startdate = ?, enddate = ? WHERE id = ?",
    [project.projectname, project.projectdesc, project.startdate, project.enddate, id],
    (err, res) => {
      if (err) {
        console.log("Error:", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Project with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("Updated project:", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

//Delete a project by ID
Project.remove = (id, result) => {
  db.query("DELETE FROM projects WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Project with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("Deleted project with id:", id);
    result(null, res);
  });
};

//Delete all projects
Project.removeAll = result => {
  db.query("DELETE FROM projects", (err, res) => {
    if (err) {
      console.log("Error:", err);
      result(null, err);
      return;
    }
    console.log(`Deleted ${res.affectedRows} projects`);
    result(null, res);
  });
};

//Export the project class for other files to use
module.exports = Project;
