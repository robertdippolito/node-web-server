const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

//required for deploying to heroku
const port = process.env.PORT || 3000;
var app = express();
hbs.registerPartials(__dirname + "/views/partials");

app.set("view engine", "hbs");
//__dirname finds the directory of the node-web-server file

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {
      console.log('unable to append to server.log.')
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => {
  return new Date().getFullYear();
});

hbs.registerHelper("screamIt", (text) => {
  return text.toUpperCase();
})

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'Home Page',
    myWelcome: 'Welcome to my home page',
    });
  })

app.get('/about', (req, res) => {
  res.render('about.hbs', {
    pageTitle: 'About Page',
  });
})

app.get('/project', (req, res) => {
  res.render('projects.hbs', {
    pageTitle: 'Projects Page',
  });
})

app.get('/bad', (req, res) => {
  res.send({
    error: 'Unable to handle this request'
  })
})

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
