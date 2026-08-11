const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log(`Connection successful`);

    // console.log(res);
  })
  .catch((err) => console.log(err)); // returns a promise

//* We are  dealing asynchronously with the function....
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/test");
}

// ! Mongoose uses Operation Buffering : It lets you start using your models immediately,
// ! without waiting for mongoose to establish a connection to MongoDB..

// * SCHEMA -> It defines the shape of the documents within that collection
// * tables/rows -> collections/documents
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

// * MODELS -> Model in mongoose is a class with which we construct documents
const User = mongoose.model("User", userSchema);

// ! Let's perform "CRUD OPERATIONS....."
// * INSERTION OF DATA....
const user1 = new User({
  name: "Adam",
  email: "adam@.com",
  age: 22,
});

user1.save(); // save() is also an asynchronous method which returns a promise

const user2 = new User({
  name: "Aam",
  email: "aam@.com",
  age: 222,
});

user2
  .save()
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// * About "find()" method.... returns a query object, not a promise but we can use ".then()"
User.find({ age: { $gt: 30 } }) // for finding all objects, we use ".find({})"
  .then((res) => {
    // console.log(res);
    console.log(res[0].name); // Since, it will give result in the form of an array, therefore we can any properties of the array on the final output
  })
  .catch((err) => {
    console.log(err);
  });

// * Model.findOne() -> returns a single result
// * Model.findById() -> commonly used

// * UPDATE METHOD ..... Model.updateOne()... returns a query object
// Similarly, we have method kown as "Model.updateMany()"
User.updateOne({ name: "Adam" }, { age: 49 })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// * Above method only gives you an object  but it will not give the upated value,
// * but to get the updated value there is an another method known to be "Model.findOneAndUpdate()"
User.findOneAndUpdate({ name: "Adam" }, { age: 59 }, { new: true })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// * DELETE METHOD -> We have two options for deletion
// * 01. Model.deleteOne(); 02. Model.deleteMany();  --> returns count
// * Frequently used methods --> Model.findByIdAndDelete() & Model.findOneAndDelete()
User.deleteOne({ name: "Aam" })
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });
