import React from "react";
import Card from "react-bootstrap/Card";

function ProjectCards({ imgPath, title, description }) {
  return (
    <Card className="project-card-view">
      <Card.Img variant="top" src={imgPath} alt="project-img" />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text style={{ textAlign: "justify" }}>
          {description}
        </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default ProjectCards;
