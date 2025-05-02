"use client";
import { toast } from "react-toastify";
import { useState } from "react";
import Link from "next/link";

export default function CreateDoctorPage() {
  const [name, SetName] = useState("");
  const [specialist, SetSpecialist] = useState("");
  const [worktype, SetWorktype] = useState("");
  const [location, SetLocation] = useState("");
  const [checkupfee, SetCheckupfee] = useState("");
  const [experience, SetExperience] = useState("");
  const [language, SetLanguage] = useState([]);
  const [photo, SetPhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
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
      toast.error("Please fill all fields");
    } else {
      try {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("specialist", specialist);
        formData.append("worktype", worktype);
        formData.append("location", location);
        formData.append("checkupfee", checkupfee);
        formData.append("experience", experience);
        formData.append("language", JSON.stringify(language)); // Send as stringified JSON
        formData.append("photo", photo); // Append the photo file

        const response = await fetch("/api/cdoctors", {
          method: "POST",
          body: formData, 
        });

        const data = await response.json();

        if (response.ok) {
          toast.success("Doctor profile created successfully!");

          // Reset form fields after success
          SetName("");
          SetSpecialist("");
          SetWorktype("");
          SetLocation("");
          SetCheckupfee("");
          SetExperience("");
          SetLanguage([]);
          SetPhoto(null);
        } else {
          toast.error(data.message || "Failed to create doctor profile.");
        }
      } catch (error) {
        console.error("Error creating doctor:", error);
        toast.error("Something went wrong.");
      }
    }
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <Link
        href="/"
        className=" lg:h-20 lg:w-40 border-1 border-black lg:rounded-xl text-center rounded-sm mx-7 my-4 lg:mx-40 hover:bg-blue-600"
      >
        Home
      </Link>
      <h1 className="text-2xl font-bold mb-6">Create Doctor</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="Name"
          placeholder="Name"
          value={name}
          onChange={(e) => SetName(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />

        <select
          name="Specialist"
          value={specialist}
          onChange={(e) => SetSpecialist(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Specialist</option>
          <option value="General Physician">General Physician</option>
          <option value="Cardiologist">Cardiologist</option>
          <option value="Dermatologist">Dermatologist</option>
          <option value="Neurologist">Neurologist</option>
          <option value="Orthopedic">Orthopedic</option>
        </select>

        <select
          name="Location"
          value={location}
          onChange={(e) => SetLocation(e.target.value)}
          required
          className="w-full p-2 border rounded"
        >
          <option value="">Select Location</option>
          <option value="Mumbai">Mumbai</option>
          <option value="Delhi">Delhi</option>
          <option value="Bangalore">Bangalore</option>
          <option value="Chennai">Chennai</option>
          <option value="Kolkata">Kolkata</option>
          <option value="Hyderabad">Hyderabad</option>
          <option value="Pune">Pune</option>
          <option value="Ahmedabad">Ahmedabad</option>
          <option value="Jaipur">Jaipur</option>
          <option value="Chandigarh">Chandigarh</option>
        </select>

        <div>
          <label className="block mb-1 font-medium">Experience (years):</label>
          <input
            type="number"
            name="Experience"
            className="lg:w-[80%] lg:mx-10 w-full border rounded p-2"
            required
            value={experience}
            onChange={(e) => SetExperience(e.target.value)}
          />
        </div>

        <div className="space-x-4">
          <label>
            <input
              type="radio"
              name="Type"
              value="Online"
              onChange={(e) => SetWorktype(e.target.value)}
              required
            />
            Online Consult
          </label>
          <label>
            <input
              type="radio"
              name="Type"
              value="Offline"
              onChange={(e) => SetWorktype(e.target.value)}
            />
            Offline Consult
          </label>
        </div>
        <p className="font-bold mb-2 text-center">Checkup Fee:</p>
        <label className="block mb-1 lg:text-xl text-center lg:w-[40%]  border-2 border-black lg:mx-30 rounded-sm">
          <input
            type="radio"
            className="lg:text-2l "
            name="Checkupfee"
            value="300"
            checked={checkupfee === "300"}
            onChange={(e) => SetCheckupfee(e.target.value)}
          />
          <span className="ml-2">Below ₹500</span>
        </label>
        <label className="block mb-1 lg:text-xl text-center border-2 border-black lg:w-[40%] rounded-sm lg:mx-30 rounded-sm">
          <input
            type="radio"
            name="Checkupfee"
            value="750"
            checked={checkupfee === "750"}
            onChange={(e) => SetCheckupfee(e.target.value)}
          />
          <span className="ml-2">₹500 – ₹1000</span>
        </label>
        <label className="block mb-1 lg:text-xl text-center lg:w-[40%]  border-2 border-black lg:mx-30 rounded-sm">
          <input
            type="radio"
            name="Checkupfee"
            value="1200"
            checked={checkupfee === "1200"}
            onChange={(e) => SetCheckupfee(e.target.value)}
          />
          <span className="ml-2">Above ₹1000</span>
        </label>
        <div>
          <label className="block mb-1 font-medium">Language Spoken:</label>
          <div className="lg:w-[80%] lg:mx-10 w-full border rounded p-2">
            <label className="block mb-2 font-semibold">
              Select Languages:
            </label>
            {[
              "Hindi",
              "English",
              "Bengali",
              "Telugu",
              "Marathi",
              "Tamil",
              "Gujarati",
              "Urdu",
              "Kannada",
              "Malayalam",
            ].map((lang) => (
              <div key={lang} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  id={lang}
                  value={lang}
                  checked={language.includes(lang)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      SetLanguage([...language, lang]);
                    } else {
                      SetLanguage(language.filter((l) => l !== lang));
                    }
                  }}
                  className="mr-2"
                />
                <label htmlFor={lang}>{lang}</label>
              </div>
            ))}
          </div>
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => SetPhoto(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
