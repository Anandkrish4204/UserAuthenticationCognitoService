const authService = require('../Service/AuthService');


exports.register = (req, res)=>{
    authService.Register(req.body, (err, result)=>{
    if(err)
        res.send(err);
    res.send(result);
  });
}

exports.registerConfirmation = (req,res)=>{
    authService.ConfirmRegisteration(req.body,(err,result)=>{
        if(err)
            res.send(err);
        res.send(result);
    });
}


exports.login = (req, res)=>{
    authService.Login(req.body, (err, result)=>{
        if(err)
           res.send(err)
        res.send(result);
    });
 }