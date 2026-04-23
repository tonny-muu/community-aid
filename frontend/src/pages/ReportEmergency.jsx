import React, { useState, useRef } from "react";
import Layout from "../components/Layout";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import axiosInstance from "../apii/axios";
import "./ReportEmergency.css";

// Fix Leaflet icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

// Map click handler
const LocationPicker = ({ setPosition }) => {
  useMapEvents({
    click(e) {
      setPosition(e.latlng);
    },
  });
  return null;
};

const ReportEmergency = () => {
  const mapRef = useRef(null);

  const [position, setPosition] = useState({
    lat: 0.3476,
    lng: 32.5825,
  });

  const [district, setDistrict] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    title: "",
    emergencyType: "Medical",
    urgency: "Medium",
    description: "",
    goal: "",
    file: null,
  });

  const [filePreview, setFilePreview] = useState(null);

  const handleChange = (e) => {
    if (e.target.name === "file") {
      const file = e.target.files[0];
      setFormData({ ...formData, file });
      setFilePreview(URL.createObjectURL(file));
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const detectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation not supported.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat = pos.coords.latitude;
        const lng = pos.coords.longitude;

        setPosition({ lat, lng });

        if (mapRef.current) {
          mapRef.current.setView([lat, lng], 12);
        }

        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`
          );
          const data = await res.json();

          const place =
            data.address?.county ||
            data.address?.city ||
            data.address?.state ||
            "";

          setDistrict(place);
        } catch (err) {
          console.error("Geocoding error:", err);
        }
      },
      () => alert("Location detection failed.")
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const form = new FormData();

      form.append("name", formData.name);
      form.append("phone", formData.phone);
      form.append("title", formData.title);
      form.append("emergencyType", formData.emergencyType);
      form.append("urgency", formData.urgency);
      form.append("description", formData.description);
      form.append("goal", formData.goal);

      form.append("district", district);
      form.append("latitude", position.lat);
      form.append("longitude", position.lng);

      if (formData.file) {
        form.append("file", formData.file);
      }

      const res = await axiosInstance.post("emergencies/", form, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("SUCCESS:", res.data);
      alert("✅ Emergency submitted successfully!");

      setFormData({
        name: "",
        phone: "",
        title: "",
        emergencyType: "Medical",
        urgency: "Medium",
        description: "",
        goal: "",
        file: null,
      });

      setDistrict("");
      setFilePreview(null);
    } catch (error) {
      console.error("ERROR:", error.response?.data || error.message);
      alert("❌ Submission failed. Check console.");
    }
  };

  return (
    <Layout>
      <div className="report-emergency-container">
        <h1>Report Emergency</h1>

        <form onSubmit={handleSubmit} className="report-emergency-form">
          <input
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <input
            name="title"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <select
            name="emergencyType"
            value={formData.emergencyType}
            onChange={handleChange}
          >
            <option>Medical</option>
            <option>Fire</option>
            <option>Accident</option>
            <option>Food</option>
            <option>Shelter</option>
            <option>Other</option>
          </select>

          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
            <option>Critical</option>
          </select>

          <textarea
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            required
          />

          <input
            name="goal"
            type="number"
            placeholder="Goal"
            value={formData.goal}
            onChange={handleChange}
            required
          />

          <input type="text" value={district} readOnly />

          <button type="button" onClick={detectLocation}>
            Detect Location
          </button>

          <input type="file" name="file" onChange={handleChange} />

          {filePreview && (
            <img src={filePreview} alt="preview" width="200" />
          )}

          <button type="submit">Submit Emergency</button>
        </form>

        <MapContainer
          ref={mapRef}
          center={[position.lat, position.lng]}
          zoom={12}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          <Marker
            position={[position.lat, position.lng]}
            draggable={true}
            eventHandlers={{
              dragend: (e) => setPosition(e.target.getLatLng()),
            }}
          />

          <LocationPicker setPosition={setPosition} />
        </MapContainer>
      </div>
    </Layout>
  );
};

export default ReportEmergency;