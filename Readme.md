# WanderLust Backend Project

A Node.js + Express + MongoDB backend project for creating and managing **Listings**.

This project uses:

- Node.js
- npm
- Express.js
- MongoDB
- Mongoose
- EJS
- EJS-Mate
- Method-Override
- Joi
- Express-Session
- Connect-Flash
- Cookie-Parser
- passport
- passport-local

The project covers RESTful routing, CRUD operations, server-side validation, sessions, cookies, flash messages, middleware, and EJS layouts.

---

## 📦 Project Setup and Package Installation

### 1. Initialize the Node.js Project

Create `package.json`:

```bash
npm init -y
```

### 2. Install the Main Direct Dependencies

You can install all packages used directly by the application with one command:

```bash
npm i express mongoose ejs ejs-mate method-override joi express-session connect-flash cookie-parser passport passport-local
```

Or install them individually:

```bash
npm i express
npm i mongoose
npm i ejs
npm i ejs-mate
npm i method-override
npm i joi
npm i express-session
npm i connect-flash
npm i cookie-parser
npm i passport
npm i passport-local
```

### 3. Check Directly Installed Packages

```bash
npm list --depth=0
```

This shows the packages directly installed in the current project.

---

# 🟢 Node.js and npm

## What is Node.js?

Node.js is a JavaScript runtime that allows JavaScript to run outside the browser.

Example:

```bash
node app.js
```

## What is npm?

npm stands for **Node Package Manager**.

It is used to install and manage third-party packages.

Example:

```bash
npm i express
```

npm manages files such as:

```text
package.json
package-lock.json
node_modules/
```

---

# 📦 Direct Packages vs Dependency Packages

There is an important difference between packages that your application directly uses and packages installed automatically as dependencies.

## Direct Dependencies

These are the packages your application intentionally installs and uses:

```text
express
mongoose
ejs
ejs-mate
method-override
joi
express-session
connect-flash
cookie-parser
passport
passport-local
```

## Transitive Dependencies

When you install a package, npm may automatically install other packages required by that package.

Examples that may appear in `node_modules` include:

```text
uid-safe
safe-buffer
randombytes
on-headers
```

These are generally dependencies of other packages.

You normally **do not need to install them manually** unless your own application directly imports and uses them.

The exact dependency tree can change between package versions.

A simple dependency relationship can look like:

```text
Your Application
      |
      +-- express-session
      |      |
      |      +-- uid-safe
      |             |
      |             +-- randombytes
      |
      +-- other packages
             |
             +-- their dependencies
```

Therefore, having 100+ folders inside `node_modules` does **not** mean you personally installed 100+ packages.

---

# 🟡 Node.js Built-in Modules

Node.js also provides built-in modules.

These are included with Node.js and do not require `npm install`.

Common examples:

```javascript
const path = require("path");
const fs = require("fs");
const crypto = require("crypto");
const http = require("http");
const os = require("os");
const url = require("url");
```

Do **not** install these with npm just because you see them imported.

For example:

```bash
npm i path
```

is normally unnecessary because `path` is already part of Node.js.

---

# 🚀 Express.js

Express is the backend web framework used to create the server, routes, and middleware.

## Installation

```bash
npm i express
```

## Basic Setup

```javascript
const express = require("express");

const app = express();

app.listen(8080, () => {
  console.log("Server started on port 8080");
});
```

Express allows us to create routes such as:

```javascript
app.get("/", (req, res) => {
  res.send("Hello World!");
});
```

---

# 🗄️ MongoDB + Mongoose

## MongoDB

MongoDB is the database used by the WanderLust application.

## Mongoose

Mongoose is an ODM (Object Data Modeling) library for MongoDB and Node.js.

It allows us to define schemas and models and work with MongoDB using JavaScript objects.

## Installation

```bash
npm i mongoose
```

## Connection

Example:

```javascript
const mongoose = require("mongoose");

mongoose
  .connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
```

Here:

```text
127.0.0.1  -> Local computer
27017      -> Default MongoDB port
wanderlust -> Database name
```

---

# 🚀 Listing Model

A Listing represents a property or place stored in MongoDB.

A listing can contain:

- Title
- Description
- Image
- Location
- Country

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

A Mongoose model can then be created from the schema:

```javascript
const Listing = mongoose.model("Listing", listingSchema);

module.exports = Listing;
```

---

# 🔄 CRUD Operations

CRUD means:

| Operation | Meaning          | HTTP Method |
| --------- | ---------------- | ----------- |
| Create    | Create a listing | POST        |
| Read      | View listing(s)  | GET         |
| Update    | Update a listing | PUT         |
| Delete    | Delete a listing | DELETE      |

Typical RESTful routes:

```text
GET     /listings
GET     /listings/new
POST    /listings
GET     /listings/:id
GET     /listings/:id/edit
PUT     /listings/:id
DELETE  /listings/:id
```

---

# 🛣️ RESTful Routes

RESTful routing organizes application URLs around resources.

For the WanderLust project, the main resource is:

```text
/listings
```

Examples:

```text
GET     /listings
```

Shows all listings.

```text
GET     /listings/new
```

Shows the form for creating a listing.

```text
POST    /listings
```

Creates a new listing.

```text
GET     /listings/:id
```

Shows one listing.

```text
GET     /listings/:id/edit
```

Shows the edit form.

```text
PUT     /listings/:id
```

Updates a listing.

```text
DELETE  /listings/:id
```

Deletes a listing.

---

# 🔄 Method-Override

HTML forms normally support:

```text
GET
POST
```

But RESTful applications also need:

```text
PUT
DELETE
```

The `method-override` package allows us to use these methods from HTML forms.

## Installation

```bash
npm i method-override
```

## Require the Package

In `app.js`:

```javascript
const methodOverride = require("method-override");
```

Add the middleware:

```javascript
app.use(methodOverride("_method"));
```

## Usage in `edit.ejs`

```html
<form method="POST" action="/listings/<%= listing._id %>?_method=PUT"></form>
```

The browser sends a POST request, and `method-override` changes it to:

```text
PUT
```

This allows the application to update the listing.

For deletion:

```html
<form method="POST" action="/listings/<%= listing._id %>?_method=DELETE"></form>
```

The request is treated as:

```text
DELETE
```

---

# 🎨 EJS

EJS stands for **Embedded JavaScript Templates**.

It allows JavaScript data to be inserted into HTML.

## Installation

```bash
npm i ejs
```

## Setup

```javascript
app.set("view engine", "ejs");
```

Example:

```ejs
<h1><%= listing.title %></h1>
```

If the title is:

```text
Beautiful House
```

the browser displays:

```text
Beautiful House
```

---

# 🎨 EJS-Mate

## What is EJS-Mate?

EJS-Mate is a layout system for EJS.

It allows us to create a common layout instead of repeating the same HTML on every page.

A common layout can contain:

- Navbar
- Footer
- `<head>`
- CSS links
- Bootstrap links
- Common page structure

## Installation

```bash
npm i ejs-mate
```

## Setup in `app.js`

```javascript
const engine = require("ejs-mate");

app.engine("ejs", engine);
app.set("view engine", "ejs");
```

Example layout usage:

```ejs
<% layout("/layouts/boilerplate") -%>
```

---

# 🔐 Express-Session

Express-Session is used to create and manage sessions.

Sessions are useful for storing temporary information between requests, such as authentication/session data.

## Installation

```bash
npm i express-session
```

## Require

```javascript
const session = require("express-session");
```

## Middleware

```javascript
app.use(
  session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
  }),
);
```

For a real production application, use a strong secret and configure the session store appropriately rather than relying on the default in-memory store.

---

# 📢 Connect-Flash

## What is Connect-Flash?

Flash messages are temporary messages that are commonly displayed after a redirect.

Examples:

```text
Listing created successfully!
Listing updated successfully!
Listing deleted successfully!
```

A flash message is generally available for the next request and then removed.

## Installation

```bash
npm i connect-flash
```

## Require

```javascript
const flash = require("connect-flash");
```

Flash messages require a session.

Example:

```javascript
app.use(
  session({
    secret: "mysupersecret",
    resave: false,
    saveUninitialized: true,
  }),
);

app.use(flash());
```

## Set a Flash Message

```javascript
req.flash("success", "Listing created successfully!");
```

## Read a Flash Message

```javascript
req.flash("success");
```

Example:

```javascript
app.get("/flash", function (req, res) {
  req.flash("info", "Flash is back!");
  res.redirect("/");
});

app.get("/", function (req, res) {
  res.render("index", {
    messages: req.flash("info"),
  });
});
```

---

# 🍪 Cookie-Parser

## What is Cookie-Parser?

`cookie-parser` is Express middleware used to parse cookies from incoming HTTP requests.

## Installation

```bash
npm i cookie-parser
```

## Require

```javascript
const cookieParser = require("cookie-parser");
```

## Middleware

```javascript
app.use(cookieParser());
```

Cookies can then be accessed through:

```javascript
req.cookies;
```

Example:

```javascript
console.log(req.cookies);
```

---

# ✅ Joi Schema Validation

Joi is used for server-side validation.

It checks incoming data before that data is saved to the database.

## Installation

```bash
npm i joi
```

## Example Without Joi

Without a validation library, we might write:

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

This can become difficult to maintain when there are many fields.

## Joi Schema

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

## Validate Data

```javascript
const { error } = listingSchema.validate(req.body);

if (error) {
  throw new ExpressError(400, error.details[0].message);
}
```

## Why Use Joi?

Joi helps us:

- Validate user input
- Make required fields mandatory
- Prevent invalid data from reaching the database
- Keep validation organized
- Generate useful validation messages

---

# ⚠️ Express Error Handling

A custom error class can be used to create consistent application errors.

Example:

```javascript
class ExpressError extends Error {
  constructor(statusCode, message) {
    super();
    this.statusCode = statusCode;
    this.message = message;
  }
}

module.exports = ExpressError;
```

Example usage:

```javascript
throw new ExpressError(404, "Listing not found!");
```

An Express error-handling middleware can then handle the error.

Example:

```javascript
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;

  res.status(statusCode).send(message);
});
```

---

# 🧩 Middleware

Middleware functions run during the request-response cycle.

Common middleware in this project includes:

```javascript
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(cookieParser());
app.use(session(...));
app.use(flash());
```

A middleware function generally has:

```javascript
(req, res, next);
```

Example:

```javascript
app.use((req, res, next) => {
  console.log("Middleware running");
  next();
});
```

`next()` passes control to the next middleware or route.

---

# 📋 Main Packages Used

| Package           | Purpose                             |
| ----------------- | ----------------------------------- |
| `express`         | Backend web framework               |
| `mongoose`        | MongoDB ODM                         |
| `ejs`             | Template engine                     |
| `ejs-mate`        | EJS layouts                         |
| `method-override` | PUT/DELETE requests from HTML forms |
| `joi`             | Server-side validation              |
| `express-session` | Session management                  |
| `connect-flash`   | Temporary flash messages            |
| `cookie-parser`   | Cookie parsing                      |

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
├── public/
│   ├── css/
│   └── js/
│
├── utils/
│   └── ExpressError.js
│
├── app.js
├── package.json
└── package-lock.json
```

---

# 🛠️ Technologies Used

| Technology      | Purpose                             |
| --------------- | ----------------------------------- |
| Node.js         | JavaScript runtime                  |
| npm             | Package manager                     |
| Express.js      | Backend framework                   |
| MongoDB         | Database                            |
| Mongoose        | MongoDB ODM                         |
| EJS             | Template engine                     |
| EJS-Mate        | EJS layouts                         |
| Method-Override | PUT/DELETE requests from HTML forms |
| Joi             | Data validation                     |
| Express-Session | Session management                  |
| Connect-Flash   | Flash messages                      |
| Cookie-Parser   | Cookie parsing                      |

---

# 📌 Main Concepts Learned

Through this project, we learn:

1. Node.js and Express setup
2. npm and package management
3. Creating RESTful routes
4. Connecting MongoDB with Mongoose
5. Creating Mongoose models and schemas
6. CRUD operations
7. EJS templates
8. EJS layouts using EJS-Mate
9. PUT and DELETE requests using Method-Override
10. Server-side validation using Joi
11. Error handling with custom `ExpressError`
12. Middleware in Express
13. Sessions using Express-Session
14. Flash messages using Connect-Flash
15. Cookies using Cookie-Parser
16. RESTful backend architecture

---

# 📥 Install All Direct Packages

Install all direct project dependencies with:

```bash
npm i express mongoose ejs ejs-mate method-override joi express-session connect-flash cookie-parser
```

Then check them:

```bash
npm list --depth=0
```

---

# 🚀 Run the Project

Start the application:

```bash
node app.js
```

If you have nodemon available:

```bash
npx nodemon app.js
```

The application can normally be accessed at:

```text
http://localhost:8080
```

---

# 🔎 Useful npm Commands

Initialize a project:

```bash
npm init -y
```

Install a package:

```bash
npm i package-name
```

Install a package as a development dependency:

```bash
npm i package-name -D
```

Remove a package:

```bash
npm uninstall package-name
```

Show direct dependencies:

```bash
npm list --depth=0
```

Show the complete dependency tree:

```bash
npm list
```

Check outdated packages:

```bash
npm outdated
```

---

# 📝 Important Note About `node_modules`

The `node_modules` folder can contain many more packages than the number shown in `package.json`.

For example:

```text
package.json
    ↓
Direct dependencies
    ↓
Their dependencies
    ↓
Dependencies of those dependencies
    ↓
node_modules/
```

Therefore, do not manually add every folder from `node_modules` to `package.json`.

Your `package.json` should normally contain the packages your application directly depends on.

---

# 👨‍💻 Project

**WanderLust Backend**

A learning project built with Node.js, Express.js, MongoDB, Mongoose, EJS, RESTful routing, middleware, validation, sessions, cookies, and CRUD operations.
