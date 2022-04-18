import Hours from "../models/hours";
exports.create = async (req, res) => {
  try {
    const hours = new Hours({
     timezone: req.body.timezone,
     week_ranges:req.body.week_ranges
    });

    const details = await hours.save();
    res.send({
      message: "hours saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.gethours = async (req, res) => {
  await Hours.find().then((pro) => {
    res.send({
      message: "hours found are:",
      pro,
    });
  });
};

exports.getOnehours = async (req, res, next) => {
  try {
    const cust = await Hours.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "hours not found",
      });
    }
    res.send({
      message: "hours found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deletehours = async (req, res) => {
  try {
    const cust = await Hours.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "hours not found",
      });
    }

    await Hours.deleteOne({ _id: req.query.id });
    res.send({
      message: " hours deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updatehours = async (req, res) => {
  const hours = new Hours({
    _id: req.query.id,
    timezone: req.body.timezone,
    week_ranges:req.week_ranges._id
   });
  Hours.updateOne({ _id: req.query.id }, hours)
    .then(() => {
      res.status(201).send({
        message: "hours updated successfully",
        hours,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
