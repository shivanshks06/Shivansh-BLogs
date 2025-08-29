import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

const app = express();
const port = process.env.PORT || 3000;

// Fix for ES Modules path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/style", express.static(path.join(__dirname, "style")));
app.use("/assests", express.static(path.join(__dirname, "assests")));

// Set EJS as view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

let blogs = [];
let authors = [];

// Home page
app.get("/", (req, res) => {
    res.render("index", { blogs });  // pass blogs so homepage can display them
});

// Handle blog submission
app.post("/submit", (req, res) => {
    const { title, content, author, contact } = req.body;
    
    // Save author only if not already in authors[]
    if (!authors.find(a => a.name === author && a.contact === contact)) {
        authors.push({ name: author, contact });
    }

    blogs.push({ title, content, author, contact });
    res.redirect("/");
});

app.get("/about", (req, res) => {
    res.render("about");
});

app.get("/contact", (req, res) => {
    res.render("contact");
});

app.get("/authors", (req, res) => {
    res.render("authors", { authors });
});

app.get("/newblog", (req, res) => {
    res.render("newblog");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
