import React from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../components/Layout";
import "./Home.css";

import { FaHandsHelping, FaDonate, FaExclamationTriangle } from "react-icons/fa";

import heroImage from "../assets/images/alejandra.jpg";
import foodImage from "../assets/images/bill.jpg";
import medicalImage from "../assets/images/chitto.jpg";
import schoolImage from "../assets/images/claudia.jpg";
import ctaImage from "../assets/images/danie.jpg";
import rashmage from "../assets/images/rashpa.jpg";

const donations = [
  {
    title: "Emergency Food Support",
    description:
      "Providing immediate nutritional assistance to families facing food shortages, ensuring no one goes hungry during a crisis. Every meal counts, and your support delivers hope.",
    raised: 1200,
    goal: 2000,
    image: foodImage,
  },
  {
    title: "Medical Support Fund",
    description:
      "Funding urgent medical care, treatments, and life-saving services for individuals in critical need. Your contribution can help save lives when time matters most.",
    raised: 850,
    goal: 1500,
    image: medicalImage,
  },
  {
    title: "School Supplies for Children",
    description:
      "Supporting children's education with books, uniforms, and essential learning materials, helping students stay on track and thrive even in difficult circumstances.",
    raised: 600,
    goal: 1200,
    image: schoolImage,
  },
];

const Home = () => {
  const navigate = useNavigate();

  return (
    <Layout>
      {/* =========================
          ANIMATED INTRO SECTION
      ========================= */}
      <section
        className="animated-intro-section"
        style={{ backgroundImage: `url(${rashmage})` }}
      >
        <div className="animated-intro-overlay"></div>
        <div className="animated-intro-content">
          <h1>Empowering Communities, Saving Lives</h1>
          <p>
            CommunityAid is your digital hub to report emergencies, volunteer locally, and donate resources instantly. Together, we turn compassion into impact.
          </p>
        </div>
      </section>

      {/* =========================
          HERO SECTION
      ========================= */}
      <section className="hero-section">
        <img src={heroImage} alt="Community support" className="hero-video" />
        <div className="hero-content">
          <h1>Together We Can Save Lives</h1>
          <p>
            Volunteers, donors, and neighbors unite to provide immediate help—food, medical aid, and essential resources. Every contribution matters.
          </p>
          <div className="hero-buttons">
            <button className="donate-btn" onClick={() => navigate("/donate")}>
              <FaDonate /> Donate
            </button>
            <button
              className="report-btn"
              onClick={() => navigate("/report-emergency")}
            >
              <FaExclamationTriangle /> Report Emergency
            </button>
          </div>
        </div>
      </section>

      {/* =========================
          INTRO SECTION
      ========================= */}
      <section className="intro-section">
        <div className="intro-text">
          <h2>What is CommunityAid?</h2>
          <p>
            A platform connecting people in need with immediate assistance. Volunteers, donors, and local resources coordinate for fast, organized help in emergencies.
          </p>
          <button className="readmore-btn" onClick={() => navigate("/about")}>
            <FaHandsHelping /> Learn More
          </button>
        </div>
        <img src={rashmage} alt="Community volunteers" className="intro-image" />
      </section>

      {/* =========================
          HOW IT WORKS SECTION
      ========================= */}
      <section className="how-section">
        <h2>How CommunityAid Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-icon">📣</div>
            <h3>Report an Emergency</h3>
            <p>
              Submit an emergency report with location, type, and number of people affected. Accurate reporting mobilizes aid faster.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">🤝</div>
            <h3>Community Responds</h3>
            <p>
              Volunteers and donors nearby are notified instantly. Resources, time, and skills are directed where most needed.
            </p>
          </div>
          <div className="step-card">
            <div className="step-icon">🚚</div>
            <h3>Support Delivered</h3>
            <p>
              Resources reach people efficiently and safely. Immediate help transforms compassion into impact.
            </p>
          </div>
        </div>
      </section>

      {/* =========================
          DONATIONS SECTION
      ========================= */}
      <section className="donations-section">
        <h2>Recent Donations Making a Difference</h2>
        <div className="donations-container">
          {donations.map((don, i) => {
            const percent = Math.round((don.raised / don.goal) * 100);
            return (
              <div className="donation-card" key={i}>
                <img src={don.image} alt={don.title} className="donation-image" />
                <h3>{don.title}</h3>
                <p>{don.description}</p>
                <p><strong>Raised:</strong> ${don.raised}</p>
                <p><strong>Goal:</strong> ${don.goal}</p>
                <p><strong>Remaining:</strong> ${don.goal - don.raised}</p>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${percent}%` }}></div>
                  <span className="progress-text">{percent}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =========================
          CTA SECTION
      ========================= */}
      <section className="cta-section">
        <div className="cta-content">
          <h2>Join Us in Changing Lives</h2>
          <p>
            Every donation, volunteer hour, and shared resource contributes to immediate relief. Together, we make a real-time impact.
          </p>
          <div className="cta-buttons">
            <button className="donate-btn" onClick={() => navigate("/donate")}>
              <FaDonate /> Donate Now
            </button>
            <button
              className="report-btn"
              onClick={() => navigate("/report-emergency")}
            >
              <FaExclamationTriangle /> Report Emergency
            </button>
          </div>
        </div>
        <img src={ctaImage} alt="Volunteers helping" className="cta-image" />
      </section>
    </Layout>
  );
};

export default Home;