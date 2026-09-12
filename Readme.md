--- packages install :

1.  npm init -y
2.  npm i express
3.  npm i mongoose
4.  npm i ejs

- first step:
  \*\*\* listing model: - title - description - image - location - country

- for coverting method="POST" into method="PUT" require package
  --- package name is method-override
  --- download --> npm i method-override

  we used in edit.ej page

  also require in app.js
  --- const methodOverride = require("method-override");
  and
  app.use(methodOverride("\_method))

* Download EJS Mate:

### what is EJS MATE?

--- INSTALLATION
npm install ejs-mate --save
// use ejs-locals for all ejs templates:
app.engine('ejs', engine);
