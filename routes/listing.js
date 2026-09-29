const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { listingSchema } = require("../schema.js");
const Listing = require("../model/listing.js");

const validateListing = (req, res, next) => {
  let { error } = listingSchema.validate(req.body); //validate listing Schema using joi.dev
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

//Index route
router.get(
  "/",
  wrapAsync(async (req, res) => {
    const allLisitngs = await Listing.find({});
    res.render("listings/index.ejs", { allLisitngs });
  }),
);

//New Route
router.get("/new", (req, res) => {
  res.render("listings/new.ejs");
});

//Show Route
router.get("/:id", async (req, res) => {
  let { id } = req.params;

  const listing = await Listing.findById(id).populate("reviews");
  if (!listing) {
    req.flash("error", " Listing you requested for does not exists!");
    res.redirect("/listings");
  }

  res.render("listings/show.ejs", { listing });
});

//Create route
router.post(
  "/",
  wrapAsync(async (req, res, next) => {
    // let result = listingSchema.validate(req.body); //validate listing Schema using joi.dev
    // if (result.error) {
    //   throw new ExpressError(400, result.error);
    // }
    const newListing = new Listing(req.body.listing);
    await newListing.save();
    req.flash("success", "New Listing Created!");
    res.redirect("/listings");
  }),
);

//EDIT route
router.get(
  "/:id/edit",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if (!listing) {
      req.flash("error", " Listing you requested for does not exists!");
      res.redirect("/Listings");
    }
    res.render("listings/edit.ejs", { listing });
  }),
);

//UPDATE route
router.put(
  "/:id",
  validateListing,
  wrapAsync(async (req, res) => {
    if (!req.body.listing) {
      throw new ExpressError(400, "Send valid data for listings");
    }
    let { id } = req.params;
    await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    req.flash("success", "Listing Updated!");
    res.redirect(`/listings/${id}`);
  }),
);

router.get(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    res.render("listings/show.ejs", { listing });
  }),
);

//DELETE Route:
router.delete(
  "/:id",
  wrapAsync(async (req, res) => {
    let { id } = req.params;
    let deleteListing = await Listing.findByIdAndDelete(id);
    console.log(deleteListing);
    req.flash("warning", "New Listing Deleted!");
    res.redirect("/listings");
  }),
);

module.exports = router;
