const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const cors = require("cors");

// Middleware to handle JSON data (for form fields other than the image)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Allow cross-origin requests (optional, for local development)
app.use(cors());

// Set up storage for Multer to store uploaded files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files in 'uploads' directory
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    // Rename the file to avoid conflicts (you can modify the naming logic)
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });

// POST route to handle the form submission with file upload
app.post("/api/cdoctors", upload.single("photo"), (req, res) => {
  // Extract form data
  const {
    name,
    specialist,
    worktype,
    location,
    checkupfee,
    experience,
    language,
  } = req.body;

  // Extract the uploaded photo file information
  const photo = req.file ? req.file.filename : null;

  // Log the received data (for debugging purposes)
  console.log("Form Data:", {
    name,
    specialist,
    worktype,
    location,
    checkupfee,
    experience,
    language,
  });
  console.log("Uploaded Photo:", photo);

  // If all fields are present (you can add more validation as needed)
  if (
    !name ||
    !specialist ||
    !worktype ||
    !location ||
    !checkupfee ||
    !experience ||
    !language ||
    !photo
  ) {
    return res
      .status(400)
      .json({ message: "All fields are required, including the photo." });
  }

  // Assuming a database connection is available to save the data
  // Save the data to the database (example using a mock database object)
  const doctor = {
    name,
    specialist,
    worktype,
    location,
    checkupfee,
    experience,
    language: JSON.parse(language), // Convert the language JSON string back to an array
    photo,
  };

  // Mock database save operation
  // db.collection('doctors').insertOne(doctor, (err, result) => {
  //   if (err) {
  //     return res.status(500).json({ message: 'Failed to save doctor.' });
  //   }
  //   return res.status(201).json({ message: 'Doctor profile created successfully!', doctor });
  // });

  // Respond with success
  res.status(201).json({
    message: "Doctor profile created successfully!",
    doctor: doctor, // Return the saved doctor data
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
