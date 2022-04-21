// import package here
const jwt = require("jsonwebtoken")

exports.auth = (req, res, next) => {
  // code here
  const authHeader = req.header("Authorization")
  console.log('authHeader',authHeader);

  const token = authHeader.split(' ')[1]
  console.log('tokenSplit',token);

  if(!token){
    return res.status(401).send({message: "Access denied"})
  }

  try {
  
    const bebas = jwt.verify(token, process.env.SECRET_KEY)
    req.user = bebas
    next()
  } catch (error) {
    console.log(error);
    res.status(400).send({message: 'Invalid Token'})

  }

};
