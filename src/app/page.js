"use client";
import Image from "next/image";
import { FaSearch, FaUser } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const [name, SetName] = useState("");
  const [specialist, SetSpecialist] = useState("");
  const [worktype, SetWorktype] = useState("");
  const [location, SetLocation] = useState("");
  const [checkupfee, SetCheckupfee] = useState("");
  const [experience, SetExperience] = useState("");
  const [language, SetLanguage] = useState([]);
  const [data, setData] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !name &&
      !specialist &&
      !worktype &&
      !location &&
      !checkupfee &&
      !experience &&
      (!language || language.length === 0)
    ) {
      console.log("Fields are missing");
      return;
    }

    try {
      const response = await fetch("/api/fetchdoc", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          specialist,
          worktype,
          location,
          checkupfee,
          experience,
          language,
        }),
      });

      const result = await response.json();
      console.log("Server response:", result);
      setData(result);
    } catch (error) {
      console.error("Fetch error:", error);
    }

    SetName("");
    SetSpecialist("");
    SetWorktype("");
    SetLocation("");
    SetCheckupfee("");
    SetExperience("");
    SetLanguage([]);
  };

  return (
    <main>
      {/* Header */}
      <div className="flex lg:my-5 border-0 border-black lg:rounded-2xl">
        <Image
          src="/logo.png"
          alt="Logo"
          width={50}
          height={60}
          className="m-3"
          priority
        />
        <div className="relative mt-3 w-full max-w-md">
          <input
            type="text"
            className="w-60 lg:w-full h-10 lg:h-12 pl-10 pr-4 border border-black rounded-2xl"
            placeholder="Enter..."
          />
          <FaSearch className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500" />
        </div>
        <div className="m-6">
          <FaUser size={25} />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex justify-center border-t border-black py-4">
        <Link
          className="font-bold mx-5 hover:border-b-2 border-black"
          href="/create-doctor"
        >
          Create doctor
        </Link>
        <Link className="font-bold mx-5 hover:border-b-2 border-black" href="#">
          Find doctor
        </Link>
        <Link className="font-bold mx-5 hover:border-b-2 border-black" href="#">
          Lab tests
        </Link>
        <Link className="font-bold mx-5 hover:border-b-2 border-black" href="#">
          Circle membership
        </Link>
      </nav>

      {/* Content */}
      <div className="flex w-full">
        {/* Filter Form */}
        <div className="flex flex-col sm:w-[40%] w-[35%] border m-2 p-4">
          <h1 className="font-bold text-xl text-center underline mb-4">
            Filter
          </h1>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Enter doctor name"
              className="border p-2 w-full rounded mb-3"
              value={name}
              onChange={(e) => SetName(e.target.value)}
            />
            <select
              className="border p-2 w-full rounded mb-3"
              value={specialist}
              onChange={(e) => SetSpecialist(e.target.value)}
            >
              <option value="">Select Specialist</option>
              <option value="general-physician">General Physician</option>
              <option value="cardiologist">Cardiologist</option>
              <option value="dermatologist">Dermatologist</option>
              <option value="neurologist">Neurologist</option>
              <option value="pediatrician">Pediatrician</option>
              <option value="orthopedic">Orthopedic</option>
            </select>
            <select
              className="border p-2 w-full rounded mb-3"
              value={location}
              onChange={(e) => SetLocation(e.target.value)}
            >
              <option value="">Select Location</option>
              {[
                "Mumbai",
                "Delhi",
                "Bangalore",
                "Chennai",
                "Kolkata",
                "Hyderabad",
                "Pune",
                "Ahmedabad",
                "Jaipur",
                "Chandigarh",
              ].map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>

            <p className="font-bold mb-2">Checkup Fee:</p>
            {[
              { label: "Below ₹500", value: "300" },
              { label: "₹500 – ₹1000", value: "750" },
              { label: "Above ₹1000", value: "1200" },
            ].map((fee) => (
              <label key={fee.value} className="block mb-2">
                <input
                  type="radio"
                  name="Checkupfee"
                  value={fee.value}
                  checked={checkupfee === fee.value}
                  onChange={(e) => SetCheckupfee(e.target.value)}
                />
                <span className="ml-2">{fee.label}</span>
              </label>
            ))}

            <label className="block mb-1 font-medium mt-4">
              Experience (years):
            </label>
            <input
              type="number"
              className="w-full border rounded p-2 mb-3"
              value={experience}
              onChange={(e) => SetExperience(e.target.value)}
            />

            <label className="block font-semibold mb-2">
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
                <label>{lang}</label>
              </div>
            ))}

            <label className="block mt-4 mb-1 font-medium">
              Consultation Type:
            </label>
            <select
              className="w-full border rounded p-2 mb-4"
              value={worktype}
              onChange={(e) => SetWorktype(e.target.value)}
            >
              <option value="">Select Type</option>
              <option value="Online">Online</option>
              <option value="Offline">Offline</option>
            </select>

            <button
              type="submit"
              className="h-10 w-full border border-black rounded-xl hover:bg-blue-600 text-white bg-black"
            >
              Submit
            </button>
          </form>
        </div>

        {/* Results Display */}
        <div className="w-[65%] border m-2 p-4">
          <h1 className="font-bold text-xl text-center underline mb-4">
            Results
          </h1>
          {data.length > 0 ? (
            data.map((doctor, index) => (
              <div key={index} className="border p-4 mb-3 rounded-lg shadow-sm">
                <p>
                  <strong>Name:</strong> {doctor.Name}
                </p>
                <p>
                  <strong>Specialist:</strong> {doctor.Specialist}
                </p>
                <p>
                  <strong>Location:</strong> {doctor.Location}
                </p>
                <p>
                  <strong>Checkup Fee:</strong> ₹{doctor.Checkupfee}
                </p>
                <p>
                  <strong>Experience:</strong> {doctor.Experience} years
                </p>
                <p>
                  <strong>Work Type:</strong> {doctor.worktype}
                </p>
                <p>
                  <strong>Languages:</strong> {doctor.language?.join(", ")}
                </p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No doctors found.</p>
          )}
        </div>
      </div>
    </main>
  );
}
