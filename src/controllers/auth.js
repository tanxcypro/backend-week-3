// import model here
const { user } = require("../../models")

// import package here
const Joi = require("joi")


exports.register = async (req, res) => {
  // code here
  try {
    const data = req.body

    // return console.log(data);

    const schema = Joi.object({
      name: Joi.string().min(5).required(),
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(5).required(),
      status: Joi.string().required()
    })

    const { error } = schema.validate(data)

    if (error) {
      return res.status.send({
        error:{
          message: error.details[0].message
        }
       
      })
    }

    const isAllREady = await user.findOne({
      where:{
        email: data.email,
       
        
      }
     
    })
    if(isAllREady){
      return res.send({
        error:{
          massage:`account ${data.email} is ready`
        }
      })
    }
await user.create(data)
    res.status(200).send({
      status: "success"
    })
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.login = async (req, res) => {
  try {
    const data = req.body

    // return console.log(data);

    const schema = Joi.object({
      
      email: Joi.string().email().min(6).required(),
      password: Joi.string().min(5).required()
      
    })

    const { error } = schema.validate(data)

    if (error) {
      return res.status.send({
        error:{
          message: error.details[0].message
        }
       
      })
    }

    const userExist = await user.findOne({
      where:{
        email: data.email,
       
        
      }
     
    })
    if(!userExist){
      return res.send({
        error:{
          massage:`email and password not match`
        }
      })
    }
if(userExist.password!=data.password){
  return res.send({
    error:{
      massage:`email and password not match`
    }
  })
}
    res.status(200).send({
      status: "success"
    })
  } catch (error) {
    res.send({
      status: "failed",
      message: "Server Error",
    });
  }
};
