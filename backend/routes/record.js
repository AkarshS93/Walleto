import express from "express";
import User from "../models/user.js";
import Activity from "../models/activity.js";

const router = express.Router();

// Route for creating an activity
router.post('/activities', async (req, res) => {
  try {
      const { userId, description, amount, date, time } = req.body;
      const newActivity = new Activity({ userId, description, amount, date, time });
      const activity = await newActivity.save();
      res.status(201).json(activity);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
});

router.get('/activities/:userId', async (req, res) =>{
  const  {userId}  = req.params; // Access userId from query parameters
  // console.log(userId);
  try {
    // Filter activities where giver's userId matches
    const activities = await Activity.find({ userId: userId });
    
    res.status(200).json(activities);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.patch('/activities/:objectId', async(req, res) =>{
  try {
    const {objectId} = req.params
    //console.log(req);
    const activities = await Activity.updateOne({ _id: objectId},{ $set: req.body });
    //console.log(req);
    res.status(200).json({'message': activities})
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})
export default router;
