import React from "react";
import Layout from "../components/Layout";
import { useNavigate } from "react-router-dom"; // <- import useNavigate
import "./Contact.css";
import contactHero from "../assets/images/rashpa.jpg"; // hero image

const Contact = () => {
  const navigate = useNavigate(); // <- initialize navigate

  return (
    <Layout>

      {/* Hero Section */}
      <section
        className="contact-hero"
        style={{ backgroundImage: `url(${contactHero})` }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <h1>Get in Touch with CommunityAid</h1>
          <p>
            We’re here to answer your questions, hear your stories, and help you take action.
          </p>
        </div>
      </section>

      {/* Intro / Mission Reminder */}
      <section className="contact-intro">
        <h2>We’d Love to Hear From You</h2>
        <p>
          Whether you want to volunteer, donate, or ask a question about our programs, our team is ready to assist you.
        </p>
      </section>

      {/* Contact Info */}
      <section className="contact-info">
        <div className="info-card">
          <h3>Phone</h3>
          <p>+256 (773) 224‑301</p>
        </div>
        <div className="info-card">
          <h3>Email</h3>
          <p>support@communityaid.org</p>
        </div>
        <div className="info-card">
          <h3>Address</h3>
          <p>Compassion building, Kampala, Uganda</p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <h2>Send Us a Message</h2>
        <form className="contact-form">
          <input type="text" name="name" placeholder="Your Name" required />
          <input type="email" name="email" placeholder="Your Email" required />
          <textarea name="message" rows="6" placeholder="Your Message" required />
          <button type="submit" className="btn-primary">
            Send Message
          </button>
        </form>
      </section>

      {/* Social Links */}
      <section className="social-section">
        <h2>Follow Us</h2>
        <p>
          Stay connected with our community and updates through social media.
        </p>
        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
          <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
        </div>
      </section>

      {/* CTA Section */}
      <section className="contact-cta">
        <h2>Support Our Mission</h2>
        <p>Your actions help us reach more communities in need.</p>
        <button
          className="btn-primary"
          onClick={() => navigate("/donate")} // <- Navigate to donate page
        >
          Donate Now
        </button>
      </section>

    </Layout>
  );
};

export default Contact;