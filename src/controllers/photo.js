import Photo from "../models/photo";
exports.create = async (req, res) => {
  try {
    const photo = new Photo({
           caption: req.body.caption,
          helpfulvotes: req.body.helpfulvotes,
           published_date: req.body.published_date,
          uploaded_date: req.body.uploaded_date,
          images:req.body.images,
          user: req.user._id,
      
    });

    const details = await photo.save();
    res.send({
      message: "photo saved successfully",
      data: details,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getphoto = async (req, res) => {
  await Photo.find().then((pro) => {
    res.send({
      message: "photos found are:",
      pro,
    });
  });
};

exports.getOnephoto = async (req, res, next) => {
  try {
    const cust = await Photo.findOne({ _id: req.query.id });
    if (!cust) {
      res.status(404).send({
        message: "photo not found",
      });
    }
    res.send({
      message: "photo found is:",
      cust,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deletephoto = async (req, res) => {
  try {
    const cust = await Photo.findOne({ _id: req.query.id });
    if (!cust) {
      res.send({
        message: "photo not found",
      });
    }

    await Photo.deleteOne({ _id: req.query.id });
    res.send({
      message: " photo deleted successful",
      cust: cust,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updatephoto = async (req, res) => {
  const photo = new Photo({
    _id: req.query.id,
    caption: req.body.caption,
   helpfulvotes: req.body.helpfulvotes,
    published_date: req.body.published_date,
   uploaded_date: req.body.uploaded_date,
   images:req.images._id,
   user: req.user._id,

});

  Photo.updateOne({ _id: req.query.id }, photo)
    .then(() => {
      res.status(201).send({
        message: "photo updated successfully",
        photo,
      });
    })
    .catch((error) => {
      res.status(400).send(error.message);
    });
};
