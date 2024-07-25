const jwt = require("jsonwebtoken");
const config = require("../config/auth.config");
const db = require("../models");
const User = db.User;

//Verify token
verifyToken = (req, res, next) =>{
    let token = req.headers["x-access-token"];
    //1st verify
    if(!token){
        return res.status(403).send({message:"No token provided!"});
    }
    jwt.verify(token, config.secret, (err, decoded)=>{
        if(err){
            return res.status(401).send({message:"Unauthorized!"});
        }
        req.userId = decoded.id;
        next();
    });
};

//isAdmin?
isAdmin = (req, res, next) =>{
    User.findByPk(req.userId).then((user)=>{
        user.getRoles().then((roles)=>{
            for(let i = 0; i< roles.lenght; i++){
                if(roles[i].name === "admin"){
                    next();
                    return;
                }
            }
            return res.status(401).send({message:"Unauthorized access, require Admin Role!"})
        })
    })
}

//isMod?
isMod = (req, res, next) => {
  User.findByPk(req.userId).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.lenght; i++) {
        if (roles[i].name === "mod") {
          next();
          return;
        }
      }
      return res
        .status(401)
        .send({ message: "Unauthorized access, require Moderator Role!" });
    });
  });
};

//IsAdminOrMod
isModOrAdmin = (req, res, next) => {
    User.findByPk(req.userId).then((user) => {
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.lenght; i++) {
          if (roles[i].name === "moderator" || roles[i].name === "admin") {
            next();
            return;
          }
        }
        return res
          .status(401)
          .send({ message: "Unauthorized access, require Moderator or Admin Role!" });
      });
    });
}

const authJwt = {
    verifyToken,
    isAdmin,
    isMod,
    isModOrAdmin
};
module.exports = authJwt;