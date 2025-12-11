import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCards";
import Particle from "../Particle";

import leaf from "../../Assets/Projects/leaf.png";
import emotion from "../../Assets/Projects/emotion.png";
import editor from "../../Assets/Projects/codeEditor.png";
import chatify from "../../Assets/Projects/chatify.png";
import suicide from "../../Assets/Projects/suicide.png";
import bitsOfCode from "../../Assets/Projects/blog.png";

function Projects() {
  return (
    <Container fluid className="project-section">
      <Particle />
      <Container>
        <h1 className="project-heading">
          My Recent <strong className="purple">Works</strong>
        </h1>

        <p style={{ color: "white" }}>
          Here are a few projects I've worked on recently.
        </p>

        <Row style={{ justifyContent: "center", paddingBottom: "10px" }}>
          
          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={chatify}
              title="Chatify"
              description="Personal chat room or workspace built with React.js, Material-UI and Firebase. Supports realtime messaging, image sharing and message reactions."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={bitsOfCode}
              title="Bits-Of-Code"
              description="Personal blog website built using Next.js and Tailwind CSS. Uses markdown files to render content and supports dark mode."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={editor}
              title="Editor.io"
              description="Online code and markdown editor built with React.js. Supports HTML, CSS, JavaScript with live preview and autosave using localStorage."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={leaf}
              title="Plant AI"
              description="Plant disease detection using CNN and transfer learning with PyTorch. Achieved 98% accuracy using ResNet34 on 38 plant leaf classes."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={suicide}
              title="AI for Social Good"
              description="NLP-based system to detect suicide-related posts on social media platforms to help in suicide prevention."
            />
          </Col>

          <Col md={4} className="project-card">
            <ProjectCard
              imgPath={emotion}
              title="Face Recognition & Emotion Detection"
              description="Emotion detection using CNN trained on FER-2013 dataset. Face detection done using OpenCV and emotion predicted with TensorFlow & Keras."
            />
          </Col>

        </Row>
      </Container>
    </Container>
  );
}

export default Projects;
