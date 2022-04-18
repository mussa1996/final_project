module.exports={
    ensureAuthenticated:function (req,res,next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash("error_msg",'Please log in first!');
        res.redirect('/api/business/login');
    },
   forwardAuthenticated:function (req,res,next) {
       if(!req.isAuthenticated()){
           return next()
       }
       res.send('Business is logged in');
   }
};