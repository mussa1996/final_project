import Images from "../models/images";
import uploader from "../helper/storage";
exports.create = async (req, res) => {
  try {
    const image=req.files.url;
    console.log(image)
    const response=await uploader(image.tempFilePath)
    console.log("images path",response)
    const images = new Images({
      url:response.secure_url
    });

    const details = await images.save();
    res.send({
      message: "images saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getimages = async (req, res) => {
  await Images.find().then((pro) => {
    res.send({
      message: "images found are:",
      pro,
    });
  });
};

exports.getOneimages = async (req, res, next) => {
  try {
    const cust = await Images.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "images not found",
      });
    }
    res.send({
      message: "images found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteimages = async (req, res) => {
  try {
    const cust = await Images.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "images not found",
      });
    }

    await Images.deleteOne({ _id: req.query.id });
    res.send({
      message: " images deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateimages = async (req, res) => {
  const image=req.files;
  const response=await uploader(image.tempFilePath)
  console.log("images path",response)
  const images = new images({
    _id: req.query.id,
    url:response.secure_url
  });

  Images.updateOne({ _id: req.query.id }, images)
    .then(() => {
      res.status(201).send({
        message: "images updated successfully",
        images,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
