import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcryptjs';

let userSchema = new Schema({
  name: {
    type: String
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.methods.encryptPassword = (password) => {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(5), null);
};

userSchema.methods.validPassword = (password) => {
  return bcrypt.compareSync(password, this.password);
};

userSchema.methods.comparePassword = function(candidatePassword, hash,
                                          callback){
  bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
    // isMatch === true
    callback(null, isMatch);
  });
}
//
// module.exports.comparePassword = function(candidatePassword, hash,
//                                           callback){
//   bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
//     // isMatch === true
//     callback(null, isMatch);
//   });
// }

module.exports = mongoose.model('User', userSchema);