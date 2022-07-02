import Awards from "../models/awards";
import uploader from "../helper/storage";
import Business from "../models/business";
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
          business_id: req.business._id,
     
    });
    const details = await awards.save();
    
    const businessId = req.query.businessId;
    const findAllAwards = await Awards.find({business_id: businessId });
    if(findAllAwards){
      if(!findAllAwards){ throw new notFoundRequestError(("No reviews found, be the first to rate this business!"))}
      
      // get all award using loop 
      const awards = findAllAwards.map(award => {
          return {
              "display_name": award.display_name,
              "images":award.images,
          }
      })
      Business.updateOne({_id: businessId}, {$set:{award:awards}}, function(err, res) {
        if (err) throw err;
      });

      return res.status(200).json({status:200, awards: awards,details});
  }
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.getawards = async (req, res) => {
  await Awards.find().then((award) => {
    res.send({
      message: "awards found are:",
      award,
    });
  });
};
exports.getAwardById = async (req, res) => {
  await Awards.find({
      business_id: req.query.business_id
  }).populate("business_id", "name").then((award) => {
    res.send({
      message: "Award found are:",
      award,
    });
  });
};
exports.findByCategory = async(req, res) => {
  await Awards.find(
      {
          category: req.query.category
      }
  ).then((data) => {
      res.status(200).send({
          message: "awards found are:",
          data,
      });
  });
};
exports.getOneawards = async (req, res, next) => {
  try {
    const award = await Awards.findOne({ _id: req.query.id });
    if (!award) {
      res.status(404).send({
        message: "awards not found",
      });
    }
    res.send({
      message: "awards found is:",
      award,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
};
exports.deleteawards = async (req, res) => {
  try {
    const award = await Awards.findOne({ _id: req.query.id });
    if (!award) {
      res.send({
        message: "awards not found",
      });
    }

    await Awards.deleteOne({ _id: req.query.id });
    res.send({
      message: " awards deleted successful",
      award,
    });
  } catch (error) {
    res.status(404).send(error.message);
  }
};

exports.updateawards = async (req, res) => {

  try {
    const images=req.files.images;
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
    
  } catch (error) {
    res.status(400).send(error.message);
  }
      
  
};
exports.countAward = async (req,res) => {
  
  await Awards.find().count().then((data)=>{
    
    res.status(200).send({
      message: "Awards found are:",
      data,
    });
  }
  ) 
}
exports.CountAwardById = async(req, res) => {

  await Awards.find({
      business_id: req.query.business_id
  }).count().then((data) => {

      res.status(200).send({
          message: "award found are:",
          data,
      });
  })
}

exports.getAwardByBusiness = async (req, res, next) => {

  const businessId = req.query.businessId;

  try{



      const findAllAwards = await Awards.find({business_id: businessId });
      const findAllRatingsCount = await Awards.find({business_id: businessId }).count();
      if(findAllAwards){
          if(!findAllAwards){ throw new notFoundRequestError(("No reviews found, be the first to rate this business!"))}
          
          // get all award using loop 
          const awards = findAllAwards.map(award => {
              return {
                  display_name: award.display_name,
                  images:award.images,
              }
          })
          

          return res.status(200).json({status:200, awards: awards,number:findAllRatingsCount});
      }
      throw new ApplicationError(("Failed to load reviews, try again!"));
  }
  catch(error){
      next(error);
  }

  
}

