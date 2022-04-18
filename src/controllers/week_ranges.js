import Week_ranges from "../models/week_ranges";
exports.create = async (req, res) => {
  try {
    const week_ranges = new Week_ranges({
             opentime: req.body.opentime,
              closetime: req.body.closetime,
    });

    const details = await week_ranges.save();
    res.send({
      message: "week_ranges saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getweek_ranges = async (req, res) => {
  await Week_ranges.find().then((pro) => {
    res.send({
      message: "week_ranges found are:",
      pro,
    });
  });
};

exports.getOneweek_ranges = async (req, res, next) => {
  try {
    const cust = await Week_ranges.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "week_ranges not found",
      });
    }
    res.send({
      message: "week_ranges found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteweek_ranges = async (req, res) => {
  try {
    const cust = await Week_ranges.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "week_ranges not found",
      });
    }

    await Week_ranges.deleteOne({ _id: req.query.id });
    res.send({
      message: " week_ranges deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateweek_ranges = async (req, res) => {
  const week_ranges = new Week_ranges({
    _id: req.query.id,
    opentime: req.body.opentime,
     closetime: req.body.closetime,
});
  Week_ranges.updateOne({ _id: req.query.id }, week_ranges)
    .then(() => {
      res.status(201).send({
        message: "week_ranges updated successfully",
        week_ranges,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
