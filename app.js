const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
//use of ejs-Mate:
const engine = require("ejs-mate");
const ExpressError = require("./utils/ExpressError.js");

//importig routes
const listings = require("./routes/listing.js");
const reviews = require("./routes/review.js");

const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
async function main() {
  await mongoose.connect(MONGO_URL);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

//for css file:
app.use(express.static(path.join(__dirname, "/public")));

//connect css in ejs file
// app.use(express.static(path.join(__dirname, "public")));

// use ejs-locals for all ejs templates:
app.engine("ejs", engine);

main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

app.get("/", (req, res) => {
  res.send("Hi, I am root");
});

//restructring of route
app.use("/listings", listings);
app.use("/listings/:id/reviews", reviews);

// app.get("/testListing", async (req, res) => {
//   let sampleListing = new Listing({
//     title: "My New Villa",
//     description: "By the beach",
//     price: 1200,
//     location: "Calangute Goa",
//     country: "India",
//   });
//   await sampleListing.save();
//   console.log("sample was saved");
//   res.send("sucessful testing");
// });

app.all("/*splat", (req, res, next) => {
  next(new ExpressError(404, "Page Not Found!"));
});

app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  // res.status(statusCode).send(message);
  res.status(statusCode).render("error.ejs", { err });
});

app.listen(8080, () => {
  console.log("http://localhost:8080");
});
