const jwt = require('jsonwebtoken');


const generateToken = async (user) => {

   
    const payload = {
      id: user._id,
      username: user.username,
      email: user.email,
  
    };
  
  
    const options = {
      expiresIn: '1d',
    };
  
  
    const generatedToken = jwt.sign(payload, process.env.JWT_SECRET,  options);
  
  
    return generatedToken;
  };

  module.exports = generateToken;