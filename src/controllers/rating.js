
import Rating from "../models/rating";
import Business from "../models/business";
exports.create = async (req, res) => {
  try {
    // const tokenVerify = await Rating.generateAuthToken(req, res);
    //  userId = tokenVerify._id;
    const rating = new Rating({
      rate: req.body.rate,
      user:req.query.userId,
      business: req.query.businessId,
    }); 
 
    const details = await rating.save();
    const businessId = req.query.businessId;
    const findAllRatings = await Rating.find({business: businessId });
    const findAllRatingsCount = await Rating.find({business: businessId }).count();
    if(findAllRatings){
      if(!findAllRatings){ throw new notFoundRequestError(("No reviews found, be the first to rate this business!"))}
      
      //calculating the average of rates
      const ratesData = {
        
          averageRate: calculatingAverageRating(findAllRatings)

      
          // oneStar: `${((findAllRatings * 100)/ findAllRatings).toFixed(0)}%`,
          // twoStar: `${((findAllRatings.twoStar * 100)/ findAllRatings).toFixed(0)}%`,
          // threeStar: `${((findAllRatings.threeStar * 100)/ findAllRatings).toFixed(0)}%`,
          // fourStar: `${((findAllRatings.fourStar * 100)/ findAllRatings).toFixed(0)}%`,
          // fiveStar: `${((findAllRatings.fiveStar * 100)/ findAllRatings).toFixed(0)}%`
      }
      if(ratesData.averageRate<=1.5 && ratesData.averageRate>=0)
          {
            ratesData.averageRate = 1;

      }
      else if(ratesData.averageRate>1.5 && ratesData.averageRate<=2.5)
      {
        ratesData.averageRate = 2;
      }
      else if(ratesData.averageRate>2.5 && ratesData.averageRate<=3.5)
      {
        ratesData.averageRate = 3;
      }
      else if(ratesData.averageRate>3.5 && ratesData.averageRate<=4.5)
      {
        ratesData.averageRate = 4;
      }
      else if(ratesData.averageRate>=5)
      {
        ratesData.averageRate = 5;
      }
      else{
        ratesData.averageRate = 0;
      }
     
    const business= await Business({
      _id: businessId,
      rating: ratesData.averageRate
    })
    Business.updateOne({_id: businessId}, business, function(err, res) {
      if (err) throw err;
      console.log("1 document updated");
    });
      return res.status(200).json({status:200, rates: ratesData, data: details});
  }
    // res.status(200).send({
    //   message: "rating added successfully",
    //   data: details,
    //   ratesData
    // });
  } catch (error) {
    res.status(500).send(error.message);
  } 
};

exports.getRating = async (req, res) => {
    await Rating.find().populate("user", "fullname").populate("business", "name").then((rating) => {
        rating.map((rating) => {
            rating._doc.id=rating._id;
            delete rating._doc._id;
            }
            )
        res.send({
            message: "Ratings found are:",
            rating,
        });
    });
};

//  // function for calculating average rating

 function calculatingAverageRating(rating) {
    let sum = 0;
    let count = 0;
    for (let i = 0; i < rating.length; i++) {
        sum += rating[i].rate;
        count++;
    }
    return sum / count;
}



exports.getReviews = async (req, res, next) => {

    const businessId = req.query.businessId;

    try{
        // const page = req.query.page || 1;
        // const limit = req.query.limit || 3;
        // const skip = ((page - 1) === -1) ? 0 : (page - 1) * limit;
        // const paginatedReviews = {
        //     offset: skip,
        //     limit,
        //     attributes: ['rate', 'review']
    
        // }
        // function for calculating average rating



        const findAllRatings = await Rating.find({business: businessId });
        const findAllRatingsCount = await Rating.find({business: businessId }).count();
    //     console.log(findAllRatings);
    //     let sum = 0; 
    //     let count = 0;
    //     for (let i = 0; i < findAllRatings.length; i++) {
    //         sum += findAllRatings[i].rate;
    //         count++;
    //     }
    //     const averageRating = sum / count;
    // console.log(averageRating);
        if(findAllRatings){
            if(!findAllRatings){ throw new notFoundRequestError(("No reviews found, be the first to rate this business!"))}
            
            //calculating the average of rates
            const ratesData = {
              
                averageRate: calculatingAverageRating(findAllRatings)

            
                // oneStar: `${((findAllRatings * 100)/ findAllRatings).toFixed(0)}%`,
                // twoStar: `${((findAllRatings.twoStar * 100)/ findAllRatings).toFixed(0)}%`,
                // threeStar: `${((findAllRatings.threeStar * 100)/ findAllRatings).toFixed(0)}%`,
                // fourStar: `${((findAllRatings.fourStar * 100)/ findAllRatings).toFixed(0)}%`,
                // fiveStar: `${((findAllRatings.fiveStar * 100)/ findAllRatings).toFixed(0)}%`
            }
            if(ratesData.averageRate<=1.5 && ratesData.averageRate>=0)
                {
                  ratesData.averageRate = 1;

            }
            else if(ratesData.averageRate>1.5 && ratesData.averageRate<=2.5)
            {
              ratesData.averageRate = 2;
            }
            else if(ratesData.averageRate>2.5 && ratesData.averageRate<=3.5)
            {
              ratesData.averageRate = 3;
            }
            else if(ratesData.averageRate>3.5 && ratesData.averageRate<=4.5)
            {
              ratesData.averageRate = 4;
            }
            else if(ratesData.averageRate>=5)
            {
              ratesData.averageRate = 5;
            }
            else{
              ratesData.averageRate = 0;
            }


            return res.status(200).json({status:200, rates: ratesData, reviews: findAllRatings,number:findAllRatingsCount});
        }
        throw new ApplicationError(("Failed to load reviews, try again!"));
    }
    catch(error){
        next(error);
    }

    
}