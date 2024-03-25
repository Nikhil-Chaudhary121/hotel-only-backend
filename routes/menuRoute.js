const express = require('express');
const router = express.Router();

const MenuItem = require('../Models/MenuItemModel.js');

router.post("/", async (req, res) => {
    try {
      const data = req.body;
      const newMenu = new MenuItem(data);
      await newMenu.save();
      console.log("MenuItem saved");
      res.status(200).json(newMenu);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })


  
router.get("/", async (req, res) => {
    try {
      const menus = await MenuItem.find();
      console.log("Data loaded");
      res.status(200).json(menus);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })

  router.get("/:taste", async (req, res) => {
    try {
      const taste = req.params.taste;
      if(taste === "sweet" || taste === "spicy" || taste === "sour"){
        const data = await MenuItem.find({taste : taste});
        console.log("Data fatched");
        res.status(200).json(data);
      }else{
        res.status(400).json({error : " invalid taste type"});
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })

  router.put("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;
      const updatedMenu = await MenuItem.findByIdAndUpdate(id, data , {new : true , runValidators : true});
      console.log("Menu Item updated");
      if(!updatedMenu){
        res.status(400).json({error : " item not found "});
      }
      res.status(200).json(updatedMenu);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })

  router.delete("/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const deletedMenu = await MenuItem.findByIdAndDelete(id);
      console.log("Menu Item deleted");
      if(!deletedMenu){
        res.status(400).json({error : " item not found "});
      }
      res.status(200).json(deletedMenu);
    } catch (error) {
      console.log(error);
      res.status(500).json({error : " internal server error"});
    }
  })

  module.exports = router;