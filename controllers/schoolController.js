import db from "../config/db-school.js";
import getApproxDistance from "../utils/distanceCal.js";

export const addSchool = async (req, res) => {
  const { name, address, latitude, longitude } = req.body;

  if (!name || !address || !latitude || !longitude) {
    return res.status(400).json({ message: "All fields are required" });
  }

  await db.execute(
    "INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)",
    [name, address, latitude, longitude]
  );

  res.status(201).json({ message: "School added successfully" });
};

export const listSchools = async (req, res) => {
  const lat = Number(req.query.latitude);
  const lng = Number(req.query.longitude);

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and Longitude are required" });
  }

  const [schools] = await db.execute("SELECT * FROM schools");

  const schoolsWithDistance = schools.map((school) => {
    const distance = getApproxDistance(lat, lng, school.latitude, school.longitude);
    return { ...school, distance: Number(distance.toFixed(2)) }; // Optional: round to 2 decimals
  });

  schoolsWithDistance.sort((a, b) => a.distance - b.distance);
  res.json(schoolsWithDistance);
};
