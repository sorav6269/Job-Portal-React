const mongoose = require('mongoose')

const connectdb=()=>{
    return mongoose.connect( process.env.LOCAL_URL)
    .then(()=>{
        console.log('conected Server')
}).catch((error)=>{
    console.log(error)
})


}

module.exports = connectdb