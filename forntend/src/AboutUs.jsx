import React from 'react';
import './AboutUs.css';

const AboutUs = () => {
  return (
    <div className="about-container">
      
      {/* Section 1 */}
      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/261909/pexels-photo-261909.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Give life to reading"
          />
        </div>
        <div className="about-text">
          <h2>📖 Give life to reading</h2>
          <p>
             Books awaken imagination and inspire new thoughts. Reading nurtures the mind, strengthens focus,
            and builds emotional intelligence. It’s not just a hobby—it’s a way to grow every day.
          </p>
          <p>
            Discover new ideas, cultures, and characters through every page. Reading helps develop empathy, 
            boosts creativity, and improves communication.
          </p>
        </div>
      </section>

      {/* Section 2 (reversed layout) */}
      <section className="about-section reverse">
        <div className="about-text">
          <h2>📚 Seed of knowledge</h2>
          <p>
            A single book can spark curiosity, learning, and passion. Books plant seeds of wisdom that grow 
            into lifelong learning habits.
          </p>
          <p>
            Whether you're looking to succeed in life or dive into a fictional world, knowledge from books is
            the foundation of personal and professional growth.
          </p>
        </div>
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/4144223/pexels-photo-4144223.jpeg"
            alt="Seed of knowledge"
          />
        </div>
      </section>

      {/* Section 3 */}
      <section className="about-section">
        <div className="about-image">
          <img
            src="https://images.pexels.com/photos/4050310/pexels-photo-4050310.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
            alt="Best for bookworms"
          />
        </div>
        <div className="about-text">
          <h2>👓 Best for bookworms</h2>
          <p>
            For those who love to read deeply, we offer a home filled with books that enrich, entertain, and empower.
            Explore a vast collection designed for book lovers of all ages.
          </p>
          <p>
            From classics to new releases, fiction to nonfiction—we’re here to keep your reading journey exciting,
            meaningful, and rewarding.
          </p>
        </div>
      </section>
      
    </div>
  );
};

export default AboutUs;
