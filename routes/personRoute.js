const express = require('express');
const router = express.Router();


const Person = require("../Models/personModel.js");


// POST request to create a new person 
router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newPerson = new Person(data);
      await newPerson.save();
      console.log("Person saved");
      res.status(200).json(newPerson);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  });
  

  // GET request to get all persons
  router.get("/" , async (req, res) => {
    try {
      const persons = await Person.find();
      console.log("Data loaded");
      res.status(200).json(persons);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })



  // GET request to get persons by worktype
  router.get("/:worktype" , async (req, res) => {
    try {
      const workType = req.params.worktype;
      if(workType == "chef" || workType =="waiter" || workType =="manager"){
      const persons = await Person.find({work: workType});
      console.log("Data loaded");
      res.status(200).json(persons);
      }else{
        res.status(404).json({error : "Invalid work type"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })  

  router.put("/:id" , async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const person = await Person.findByIdAndUpdate(id, data ,{new : true , runValidators : true}); 
      console.log("Person updated");
      if(!person){
        res.status(404).json({error : "Person not found"});
      }
      res.status(200).json(person);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })


  router.delete("/:id" , async (req, res) => {
    try {
      const id = req.params.id;
      const person = await Person.findByIdAndDelete(id); 
      console.log("Person deleted");
      if(!person){
        res.status(404).json({error : "Person not found"});
      }
      res.status(200).json(person);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })


    module.exports = router;