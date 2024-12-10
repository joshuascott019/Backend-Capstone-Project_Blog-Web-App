import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

const posts = [];

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static(path.join(process.cwd(), 'public')));

// Routes
app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.get('/new', (req, res) => {
  res.render('new');
});

app.post('/new', (req, res) => {
  const { title, content } = req.body;
  posts.push({ title, content });
  res.redirect('/');
});

app.get('/edit/:index', (req, res) => {
  const postIndex = parseInt(req.params.index);
  if (!isNaN(postIndex) && posts[postIndex]) {
    res.render('edit', { post: posts[postIndex], index: postIndex });
  } else {
    res.redirect('/');
  }
});

app.post('/edit/:index', (req, res) => {
  const postIndex = parseInt(req.params.index);
  if (!isNaN(postIndex) && posts[postIndex]) {
    const { title, content } = req.body;
    posts[postIndex] = { title, content };
  }
  res.redirect('/');
});

app.get('/delete/:index', (req, res) => {
  const postIndex = parseInt(req.params.index);
  if (!isNaN(postIndex) && posts[postIndex]) {
    posts.splice(postIndex, 1); // Remove the post from the array
  }
  res.redirect('/'); // Redirect to the home page after deletion
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
