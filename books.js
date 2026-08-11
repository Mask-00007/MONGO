// * SCHEMA VALIDATIONS --> Rules for Schema...

const mongoose = require("mongoose");

main()
  .then((res) => {
    console.log(`Connection successful`);

    // console.log(res);
  })
  .catch((err) => console.log(err)); // returns a promise

//* We are  dealing asynchronously with the function....
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/amazon");
}

// * Let's define Schema for the books
const bookSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  discount: {
    type: Number,
    default: 0,
  },
  category: {
    enum: ["fiction", "non-fiction"],
  },
});

const Book = mongoose.model("Book", bookSchema); // It forms collection inside DB...

// * CRUD OPERATION.....

Book.findByIdAndUpdate(
  "6a7b0bf605269856e604bed1",
  { price: 100 },
  { runValidators: true },
)
  .then((res) => {
    console.log(res);
  })
  .catch((err) => {
    console.log(err);
  });

// * We can also build a custom error....
//   price: {
//     type: Number,
//     required: true,
//     min: [1,"Price is too low"]
//   }

// let book1 = new Book({
//   title: "Mathematics XII",
//   author: "RD Sharma",
//   price: 1200,
//   category: "non-fiction",
// });

// book1
//   .save()
//   .then((res) => {
//     console.log(res);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// * Handling Errors --> console.log(err.errors.category.properties.message);
