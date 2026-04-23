import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom";

import rashmage from "../assets/images/rashpa.jpg";
import one from "../assets/images/marcos.jpg";
import two from "../assets/images/michael.jpg";
import three from "../assets/images/ocg.jpg";
import four from "../assets/images/josh.jpg";

import { FaHandsHelping, FaHeart, FaMedkit, FaBook, FaQuoteLeft } from "react-icons/fa";
import "./About.css";

const About = () => {
  const navigate = useNavigate(); // initialize navigate

  return (
    <Layout>

      {/* ================= HERO ================= */}
      <section
        className="about-hero"
        style={{ backgroundImage: `url(${rashmage})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1 className="animated fadeInDown">Empowering Communities</h1>
          <p className="animated fadeInUp">
            CommunityAid connects volunteers, donors, and local responders to deliver immediate relief where it’s needed most.
          </p>
        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="mission-section">
        <h2>Our Mission & Vision</h2>
        <p>
          Our mission is to provide fast and effective assistance to communities in need. We aim to create a world where help is immediate, coordinated, and transparent.
        </p>
        <p>
          Our vision is a society where no one is left behind in emergencies, and every volunteer and donor can see the real impact of their contribution.
        </p>
      </section>

      {/* ================= CORE IMPACT ================= */}
      <section className="impact-section">
        <h2>Our Core Impact</h2>
        <div className="impact-cards">
          <div className="impact-card animated zoomIn">
            <FaHeart className="impact-icon" />
            <h3>Food Assistance</h3>
            <p>Delivering meals to families in crisis and ensuring no one goes hungry.</p>
          </div>
          <div className="impact-card animated zoomIn delay-1">
            <FaMedkit className="impact-icon" />
            <h3>Medical Aid</h3>
            <p>Providing urgent care, treatments, and medicines to those in need.</p>
          </div>
          <div className="impact-card animated zoomIn delay-2">
            <FaBook className="impact-icon" />
            <h3>Education Support</h3>
            <p>Helping children continue learning with supplies and mentorship programs.</p>
          </div>
          <div className="impact-card animated zoomIn delay-3">
            <FaHandsHelping className="impact-icon" />
            <h3>Community Engagement</h3>
            <p>Empowering volunteers and local leaders to make sustainable change.</p>
          </div>
        </div>
      </section>

      {/* ================= STORY / HISTORY ================= */}
      <section className="story-section">
        <h2>Our Story</h2>
        <p>
          CommunityAid started in 2015 as a small volunteer group helping local families. Over the years, we expanded our reach to multiple cities, coordinating with thousands of volunteers to deliver life-saving resources.
        </p>
        <p>Key milestones include:</p>
        <ul>
          <li>2015 – Founded by Marcos and Michael in response to a local crisis.</li>
          <li>2017 – Expanded programs to include medical and educational support.</li>
          <li>2019 – Helped over 10,000 families across the country.</li>
          <li>2021 – Launched digital platform for reporting emergencies and coordinating volunteers.</li>
        </ul>
      </section>

      {/* ================= TEAM ================= */}
      <section className="team-section">
        <h2>Meet Our Team</h2>
        <div className="team-grid">
          <div className="team-member animated fadeInUp">
            <img src={one} alt="Marcos" />
            <h4>Marcos</h4>
            <p>Founder & CEO</p>
          </div>
          <div className="team-member animated fadeInUp delay-1">
            <img src={two} alt="Michael" />
            <h4>Michael</h4>
            <p>Operations Lead</p>
          </div>
          <div className="team-member animated fadeInUp delay-2">
            <img src={three} alt="OCG" />
            <h4>OCG</h4>
            <p>Community Outreach</p>
          </div>
          <div className="team-member animated fadeInUp delay-3">
            <img src={four} alt="Josh" />
            <h4>Josh</h4>
            <p>Fundraising Coordinator</p>
          </div>
        </div>
      </section>

      {/* ================= TESTIMONIALS ================= */}
      <section className="testimonial-section">
        <h2>What People Say</h2>
        <div className="testimonial-card animated fadeInUp">
          <FaQuoteLeft className="quote-icon" />
          <p>"CommunityAid helped my family when we had nowhere else to turn. Their support changed our lives."</p>
          <h4>- Sarah L., Beneficiary</h4>
        </div>
        <div className="testimonial-card animated fadeInUp delay-1">
          <FaQuoteLeft className="quote-icon" />
          <p>"Volunteering with CommunityAid has been the most rewarding experience of my life."</p>
          <h4>- Daniel K., Volunteer</h4>
        </div>
      </section>

      {/* ================= GALLERY ================= */}
      <section className="gallery-section">
        <h2>See Our Work in Action</h2>
        <div className="gallery-grid">
          <img src={one} alt="Gallery 1" />
          <img src={two} alt="Gallery 2" />
          <img src={three} alt="Gallery 3" />
          <img src={four} alt="Gallery 4" />
          <img src={rashmage} alt="Gallery 5" />
        </div>
      </section>

      {/* ================= CALL TO ACTION ================= */}
      <section className="cta-section">
        <h2>Join Us in Making a Difference</h2>
        <p>Every volunteer hour and donation helps families and communities survive and thrive.</p>
        <button 
          className="btn-primary"
          onClick={() => navigate("/donate")} // Navigate to /donate page
        >
          Donate Now
        </button>
      </section>

    </Layout>
  );
};

export default About;