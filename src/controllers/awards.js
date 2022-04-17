import Awards from "../models/awards";
import uploader from "../helper/storage";
exports.create = async (req, res) => {
  try {
    const images=req.files.images;
    const response=await uploader(images.tempFilePath)
    console.log("images path",response)
    const awards = new Awards({
          award_type: req.body.award_type,
          display_name: req.body.display_name,
          images:response.secure_url,
          year: req.body.year,
     
      
    });
    const details = await awards.save();
    res.send({
      message: "awards saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getawards = async (req, res) => {
  await Awards.find().then((pro) => {
    res.send({
      message: "awardss found are:",
      pro,
    });
  });
};

exports.getOneawards = async (req, res, next) => {
  try {
    const cust = await Awards.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "awards not found",
      });
    }
    res.send({
      message: "awards found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteawards = async (req, res) => {
  try {
    const cust = await Awards.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "awards not found",
      });
    }

    await Awards.deleteOne({ _id: req.query.id });
    res.send({
      message: " awards deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateawards = async (req, res) => {
  const images=req.files;
  const response=await uploader(images.tempFilePath)
  console.log("images path",response)
  const awards = new Awards({
       _id: req.query.id,
        award_type: req.body.award_type,
        display_name: req.body.display_name,
        images:response.secure_url,
        year: req.body.year,
   
    
  });

  Awards.updateOne({ _id: req.query.id }, awards)
    .then(() => {
      res.status(201).send({
        message: "awards updated successfully",
        awards,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
