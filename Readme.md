# WanderLust Backend Project

A Node.js + Express + MongoDB project for creating and managing **Listings**.
This project also uses EJS for views, EJS-Mate for layouts, Method-Override for PUT/DELETE requests, and Joi for schema validation.

---

## 📦 Packages Installation

### 1. Initialize Node.js Project

```bash
npm init -y
```

### 2. Install Express

```bash
npm i express
```

### 3. Install Mongoose

```bash
npm i mongoose
```

### 4. Install EJS

```bash
npm i ejs
```

---

# 🚀 First Step — Listing Model

Create a **Listing Model** using Mongoose.

A listing contains the following fields:

- **Title**
- **Description**
- **Image**
- **Location**
- **Country**

Example:

```javascript
const listingSchema = new mongoose.Schema({
  title: String,
  description: String,
  image: String,
  location: String,
  country: String,
});
```

---

# 🔄 Method-Override

HTML forms normally support only:

```text
GET
POST
```

But in our application, we also need methods such as:

```text
PUT
DELETE
```

To use `PUT` and `DELETE` with HTML forms, we use the **method-override** package.

## Installation

```bash
npm i method-override
```

## Require the Package

In `app.js`:

```javascript
const methodOverride = require("method-override");
```

Then add the middleware:

```javascript
app.use(methodOverride("_method"));
```

## Usage in `edit.ejs`

We can write:

```html
<form method="POST" action="/listings/<%= listing._id %>?_method=PUT"></form>
```

Although the form uses:

```html
method="POST"
```

`method-override` converts it into:

```text
PUT
```

This allows us to update an existing listing.

---

# 🎨 EJS-Mate

## What is EJS-Mate?

**EJS-Mate** is a layout system for EJS templates.

It allows us to create a common layout for multiple pages instead of repeating the same HTML code such as:

- Navbar
- Footer
- `<head>`
- Bootstrap/CSS links
- Common page structure

---

## Installation

```bash
npm install ejs-mate --save
```

## Setup in `app.js`

Require EJS-Mate:

```javascript
const engine = require("ejs-mate");
```

Then configure the EJS engine:

```javascript
app.engine("ejs", engine);
```

And set EJS as the view engine:

```javascript
app.set("view engine", "ejs");
```

Now we can use layouts in our EJS templates.

Example:

```ejs
<% layout("/layouts/boilerplate") -%>
```

---

# ✅ Joi Schema Validation

We use **Joi** to validate the data before saving it to the database.

Without Joi, we might have to write multiple checks manually:

```javascript
if (!newListing.title) {
  throw new ExpressError(400, "Title is missing!");
}

if (!newListing.description) {
  throw new ExpressError(400, "Description is missing!");
}

if (!newListing.location) {
  throw new ExpressError(400, "Location is missing!");
}
```

Joi allows us to create a validation schema and handle these checks in a cleaner way.

## Installation

```bash
npm i joi
```

## Example Joi Schema

```javascript
const Joi = require("joi");

const listingSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().required(),
  location: Joi.string().required(),
  country: Joi.string().required(),
  image: Joi.string().allow("", null),
});
```

We can then validate the listing data:

```javascript
const { error } = listingSchema.validate(req.body);

if (error) {
  throw new ExpressError(400, error.details[0].message);
}
```

### Why Use Joi?

Joi helps us:

- Validate user input
- Make sure required fields are present
- Prevent invalid data from reaching the database
- Keep validation code clean and organized
- Provide useful error messages

---

# 🛠️ Technologies Used

| Technology      | Purpose                             |
| --------------- | ----------------------------------- |
| Node.js         | JavaScript runtime                  |
| Express.js      | Backend framework                   |
| MongoDB         | Database                            |
| Mongoose        | MongoDB ODM                         |
| EJS             | Template engine                     |
| EJS-Mate        | EJS layouts                         |
| Method-Override | PUT/DELETE requests from HTML forms |
| Joi             | Data validation                     |

---

# 📁 Basic Project Structure

```text
project/
│
├── models/
│   └── listing.js
│
├── views/
│   ├── layouts/
│   │   └── boilerplate.ejs
│   │
│   └── listings/
│       ├── index.ejs
│       ├── new.ejs
│       ├── edit.ejs
│       └── show.ejs
│
├── app.js
├── package.json
└── package-lock.json
```

---

# 📌 Main Concepts Learned

Through this project, we learn:

1. Node.js and Express setup
2. Creating RESTful routes
3. Connecting MongoDB with Mongoose
4. Creating Mongoose models and schemas
5. CRUD operations
6. EJS templates
7. EJS layouts using EJS-Mate
8. PUT and DELETE requests using Method-Override
9. Server-side data validation using Joi
10. Error handling with custom `ExpressError`

---

## 📥 Install All Packages

You can install the main packages together:

```bash
npm i express mongoose ejs ejs-mate method-override joi
```
