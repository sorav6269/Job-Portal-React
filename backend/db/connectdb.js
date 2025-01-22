const mongoose = require('mongoose')

const connectdb=()=>{
    return mongoose
      .connect(process.env.Live_Url)
      .then(() => {
        console.log("conected Server");
      })
      .catch((error) => {
        console.log(error);
      });


}

module.exports = connectdb