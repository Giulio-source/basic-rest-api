const express = require("express");
const subscriber = require("../modules/subscriber.js");
const router = express.Router();
const Subscriber = require("../modules/subscriber.js");

//getting all
router.get("/", async (req, res) => {
  try {
    const subscribers = await Subscriber.find();
    res.json(subscribers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//get one
router.get("/:id", getSubscriber, (req, res) => {
  res.send(res.subscriber.name);
});
//create one
router.post("/", async (req, res) => {
  const subscriber = new Subscriber({
    name: req.body.name,
    subscribedToChannel: req.body.subscribedToChannel,
  });
  try {
    const newSubscriber = await subscriber.save();
    res.status(201).send("success!");
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//update one
router.patch("/:id", getSubscriber, async (req, res) => {
  if (req.body.name != null) {
    res.subscriber.name = req.body.name;
    res.json({ message: "updated name" });
  }
  if (req.body.subscribedToChannel != null) {
    res.subscriber.subscribedToChannel = req.body.subscribedToChannel;
    res.json({ message: "updated channel" });
  }

  try {
    await res.subscriber.save();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
//delete one
router.delete("/:id", getSubscriber, async (req, res) => {
  try {
    await res.subscriber.remove();
    res.json({ message: "deleted subscriber" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getSubscriber(req, res, next) {
  let subscriber;
  try {
    subscriber = await Subscriber.findById(req.params.id);
    if (subscriber == null) {
      return res.status(404).json({ message: "Sorry couldn't find" });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }

  res.subscriber = subscriber;
  next();
}

module.exports = router;
