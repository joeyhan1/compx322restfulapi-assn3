//Name: Joey Han
//ID: 1555382

module.exports = app => {  
  const projects = require("../controllers/projects.controller");
  
  //Create a new project
  app.post("/create", projects.create); //localhost:3000/create
  
  //Retrieve all projects
  app.get("/getall", projects.findAll); //localhost:3000/getall
  
  //Retrieve a single project with id
  app.get("/:id", projects.findOne); //localhost:3000/2 (Use: localhost:3000/{id})
  
  //Retrieve a single project with projectname
  app.get("/name/:projectName", projects.findOneByName); //localhost:3000/name/Local Charity Goods Alerting System (Use: localhost:3000/name/{projectname})
  
  //Update a project with id
  app.put("/:id", projects.update); //localhost:3000/2 (Use: localhost:3000/{id})
  
  //Delete a project with id
  app.delete("/:id", projects.delete); //localhost:3000/2 (Use: localhost:3000/{id})
  
  //Delete all projects
  app.delete("/projects/deleteall", projects.deleteAll); //localhost:3000/projects/deleteAll
}