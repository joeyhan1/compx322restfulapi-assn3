//Name: Joey Han
//ID: 1555382

const Project = require("../models/projects.model");
 
//Create and Save a new Project
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  
  //Create a Project
  const project = new Project({
    projectname: req.body.projectname,
    projectdesc: req.body.projectdesc,
    startdate: req.body.startdate,
    enddate: req.body.enddate,
  });
  
  //Save Project into the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project.",
      });
    else {
      res.send(data);
    }
  });
};
  
//Retrieve all Projects from the database.
exports.findAll = (req, res) => {
  Project.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving projects.",
      });
      else {
        res.send(data);
      }
  });
};
  
//Get a single project by ID
exports.findOne = (req, res) => {

  const id = req.params.id;

  Project.findById(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Project not found with id ${id}.` });
      } else {
        res.status(500).send({
          message: "Error retrieving project with id " + id,
        });
      }
    } else {
      res.send(data);
    }
  });
};
  
//Retrieve a single project by project name
exports.findOneByName = (req, res) => {

  const projectName = req.params.projectName;

  Project.findByName(projectName, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Project not found with name ${projectName}.` });
      } else {
        res.status(500).send({
          message: "Error retrieving project with name " + projectName,
        });
      }
    } else {
      res.send(data);
    }
  });
};
  
//Update a project by ID
exports.update = (req, res) => {
  //Checking if request body is empty
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const id = req.params.id;

  Project.updateById(id, req.body, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Project not found with id ${id}.` });
      } else {
        res.status(500).send({
          message: "Error updating project with id " + id,
        });
      }
    } else {
      res.send(data);
    }
  });
};

//Delete a project by ID
exports.delete = (req, res) => {
  
  const id = req.params.id;

  Project.remove(id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({ message: `Project not found with id ${id}.` });
      } else {
        res.status(500).send({
          message: "Could not delete project with id " + id,
        });
      }
    } else {
      res.send({ message: "Project was deleted successfully!" });
    }
  });
};

//Delete all projects
exports.deleteAll = (req, res) => {
  Project.removeAll((err, data) => {
    if (err) {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects.",
      });
    } else {
      res.send({ message: "All projects were deleted successfully!" });
    }
  });
};