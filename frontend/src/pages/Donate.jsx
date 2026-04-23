// src/pages/Donate.jsx
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./Donate.css";
import api from "../apii/axios";

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

const placeholderImage =
  "https://via.placeholder.com/400x220?text=No+Image";

const Donate = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [donationModal, setDonationModal] = useState(null);

  const [donationType, setDonationType] = useState("");
  const [donationAmount, setDonationAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [itemName, setItemName] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");

  const [successMessage, setSuccessMessage] = useState("");

  const isLoggedIn = () => !!localStorage.getItem("userData");

  // FETCH EMERGENCIES
  useEffect(() => {
    const fetchEmergencies = async () => {
      try {
        const res = await api.get("emergencies/");
        setEmergencies(res.data);
      } catch (err) {
        console.error("Failed to load emergencies:", err);
      }
    };

    fetchEmergencies();
  }, []);

  // OPEN MODAL
  const openDonationModal = (emergency) => {
    if (!isLoggedIn()) {
      alert("Please login first");
      return;
    }

    setDonationModal(emergency);
    setDonationType("");
    setDonationAmount("");
    setPaymentMethod("");
    setItemName("");
    setItemQuantity("");
    setSuccessMessage("");
  };

  // =========================
  // FINAL WORKING SUBMIT
  // =========================
  const handleDonationSubmit = async () => {
    console.log("🔥 BUTTON CLICKED / SUBMIT STARTED");

    if (!donationModal) {
      alert("No emergency selected");
      return;
    }

    if (!donationType) {
      alert("Select donation type");
      return;
    }

    try {
      const userData = JSON.parse(localStorage.getItem("userData"));

      const payload = {
        emergency: donationModal.id,
        donor: userData?.id || null,
        donation_type: donationType,
        amount: donationType === "money" ? Number(donationAmount || 0) : 0,
        item_name: donationType !== "money" ? itemName || "" : "",
        quantity:
          donationType !== "money" ? Number(itemQuantity || 0) : 0,
        payment_method:
          donationType === "money" ? paymentMethod || "TEST" : "TEST",
      };

      console.log("📦 PAYLOAD SENT:", payload);

      const res = await api.post("donations/", payload);

      console.log("✅ SUCCESS:", res.data);

      setSuccessMessage("Donation successfully sent ✔");

      // reset
      setDonationType("");
      setDonationAmount("");
      setPaymentMethod("");
      setItemName("");
      setItemQuantity("");
    } catch (err) {
      console.error("❌ ERROR:", err.response?.data || err.message);
    }
  };

  return (
    <Layout>
      <div className="donate-container">
        <h1>Donate to Emergencies</h1>

        {/* CARDS */}
        <div className="emergency-cards">
          {emergencies.map((em) => (
            <div key={em.id} className="emergency-card">
              <img
                src={em.file || placeholderImage}
                alt={em.title}
              />

              <h2>{em.title}</h2>

              <p>
                {em.emergencyType} | {em.urgency}
              </p>

              <p>
                {em.district} | Goal: ${em.goal}
              </p>

              <button onClick={() => openDonationModal(em)}>
                Donate
              </button>
            </div>
          ))}
        </div>

        {/* MAP */}
        <MapContainer center={[0.3476, 32.5825]} zoom={8}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {emergencies.map((em) => (
            <Marker key={em.id} position={[em.latitude, em.longitude]}>
              <Popup>{em.title}</Popup>
            </Marker>
          ))}
        </MapContainer>

        {/* MODAL */}
        {donationModal && (
          <div
            className="modal-overlay"
            onClick={() => setDonationModal(null)}
          >
            <div
              className="donation-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <h2>Donate</h2>

              <select
                value={donationType}
                onChange={(e) => setDonationType(e.target.value)}
              >
                <option value="">Select type</option>
                <option value="money">Money</option>
                <option value="food">Food</option>
                <option value="clothes">Clothes</option>
                <option value="medical">Medical</option>
              </select>

              {donationType === "money" && (
                <>
                  <input
                    type="number"
                    placeholder="Amount"
                    value={donationAmount}
                    onChange={(e) =>
                      setDonationAmount(e.target.value)
                    }
                  />

                  <select
                    value={paymentMethod}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  >
                    <option value="">Payment Method</option>
                    <option>Credit Card</option>
                    <option>PayPal</option>
                    <option>Mobile Money</option>
                  </select>
                </>
              )}

              {donationType && donationType !== "money" && (
                <>
                  <input
                    type="text"
                    placeholder="Item Name"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                  />

                  <input
                    type="number"
                    placeholder="Quantity"
                    value={itemQuantity}
                    onChange={(e) =>
                      setItemQuantity(e.target.value)
                    }
                  />
                </>
              )}

              {/* FINAL FIXED BUTTON */}
              <button
                type="button"
                onClick={handleDonationSubmit}
              >
                Donate
              </button>

              {successMessage && <p>{successMessage}</p>}

              <button onClick={() => setDonationModal(null)}>
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Donate;