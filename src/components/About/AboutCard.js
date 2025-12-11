import React from "react";
import Card from "react-bootstrap/Card";
import { ImPointRight } from "react-icons/im";

function AboutCard() {
  return (
    <Card className="quote-card-view">
      <Card.Body style={{ padding: "2rem" }}>
        <blockquote className="blockquote mb-0">
          <p
            style={{
              textAlign: "justify",
              fontSize: "1.1rem",
              lineHeight: "1.8",
            }}
          >
            Hi there! 👋 I’m <span className="purple">Aparnaa A S</span>,  
            from <span className="purple">Belgaum, India</span>.
            <br />
            <br />
            I’m currently pursuing a degree in{" "}
            <span className="purple">Computer Science</span> at{" "}
            <span className="purple">CMR Institute of Technology (CMRIT), Bengaluru</span>.
            <br />
            <br />
            I have a strong interest in{" "}
            <span className="purple">Mathematics, Computing, and Continuous Learning</span>,  
            and I enjoy building a solid foundation in both theory and practical skills.
            <br />
            <br />
            Beyond academics and coding, I love staying creative and curious through
            various activities:
          </p>

          <ul style={{ marginTop: "1.2rem", marginBottom: "1.5rem" }}>
            <li className="about-activity" style={{ marginBottom: "0.6rem" }}>
              <ImPointRight /> Playing Games 🎮
            </li>
            <li className="about-activity" style={{ marginBottom: "0.6rem" }}>
              <ImPointRight /> Writing Tech Blogs ✍️
            </li>
            <li className="about-activity">
              <ImPointRight /> Traveling & Exploring New Places 🌍
            </li>
          </ul>

          <p
            style={{
              color: "rgb(155, 126, 172)",
              fontSize: "1.05rem",
              fontStyle: "italic",
              textAlign: "center",
            }}
          >
            “Strive to build things that make a meaningful difference.”
          </p>

          <footer
            className="blockquote-footer"
            style={{ textAlign: "center", marginTop: "0.5rem" }}
          >
            Aparnaa A S
          </footer>
        </blockquote>
      </Card.Body>
    </Card>
  );
}

export default AboutCard;
