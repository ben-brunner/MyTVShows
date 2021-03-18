const mongoose = require('mongoose');

var options = {
  connectTimeoutMS: 5000,
  useNewUrlParser: true,
  useUnifiedTopology: true
 };

mongoose.connect(`mongodb+srv://${process.env.LOGIN}:${process.env.PASSWORD}@${process.env.CLUSTER}?retryWrites=true&w=majority`,

   options,
   function(err) {
    if (err) {
      console.log(`error, failed to connect to the database because --> ${err}`);
    } else {
      console.info('*** Database connection : Success ***');
    }
   }
);

module.exports = mongoose;
