const express = require('express');
const multer = require('multer');

const app = express();
const PORT = 3000;

// Middleware for handling multipart/form-data (file uploads)
const upload = multer({ dest: 'uploads/' }); // 'uploads/' is the directory where uploaded files will be stored

// Serve the HTML page with the image upload form
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// POST route for handling image uploads
app.post('/upload', upload.single('profileImage'), (req, res) => {
  // Access the uploaded file via req.file
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // File uploaded successfully, you can now process it (e.g., save to database, resize, etc.)
  const uploadedFilePath = req.file.path;
  // Handle the file as needed

  res.send('File uploaded successfully.');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
