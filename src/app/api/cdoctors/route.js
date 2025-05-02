const express = require("express");
const multer = require("multer");
const path = require("path");
const app = express();
const cors = require("cors");


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors());


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Save files in 'uploads' directory
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
   
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + ext);
  },
});

const upload = multer({ storage });


app.post("/api/cdoctors", upload.single("photo"), (req, res) => {
 
  const {
    name,
    specialist,
    worktype,
    location,
    checkupfee,
    experience,
    language,
  } = req.body;

 
  const photo = req.file ? req.file.filename : null;

 
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

  
  const doctor = {
    name,
    specialist,
    worktype,
    location,
    checkupfee,
    experience,
    language: JSON.parse(language), 
    photo,
  };



 
  res.status(201).json({
    message: "Doctor profile created successfully!",
    doctor: doctor,
  });
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
