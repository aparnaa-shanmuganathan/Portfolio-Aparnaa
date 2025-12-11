import React from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

function Blogs() {
  const blogs = [
    {
      slug: "learning-machine-learning",
      title: "How I Started Learning Machine Learning as a Computer Science Student",
      image: "https://images.unsplash.com/photo-1518779578993-ec3579fee39f",
      description:
        "A reflection on my journey into Machine Learning, the learning approach I followed, mistakes I made early on, and the resources that helped me build strong fundamentals.",
    },
    {
      slug: "deep-learning-mistakes",
      title: "Common Mistakes I Made While Learning Deep Learning",
      image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837",
      description:
        "This blog talks about beginner mistakes in Deep Learning such as overfitting, poor data preprocessing, and unrealistic expectations—and how fixing them improved my understanding.",
    },
    {
      slug: "problem-solving-over-frameworks",
      title: "Why Problem-Solving Skills Matter More Than Just Frameworks",
      image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      description:
        "An insight into why mastering problem-solving and fundamentals is more important than learning multiple frameworks, especially for long-term growth as a software engineer.",
    },
  ];

  return (
    <Container fluid className="project-section">
      <Container>
        <h1 className="project-heading">
          My <strong className="purple">Blogs</strong>
        </h1>

        <p
          style={{
            color: "white",
            fontSize: "1.15rem",
            textAlign: "center",
            maxWidth: "750px",
            margin: "0 auto 45px",
          }}
        >
          I love documenting what I learn—from Machine Learning concepts to
          problem-solving habits and career reflections as a Computer Science
          student.
        </p>

        <Row className="justify-content-center">
          {blogs.map((blog) => (
            <Col md={6} lg={4} key={blog.slug} className="project-card">
              <Card className="project-card-view h-100">
                <Card.Img
                  variant="top"
                  src={blog.image}
                  alt={blog.title}
                  style={{ height: "230px", objectFit: "cover" }}
                />
                <Card.Body>
                  <Card.Title
                    style={{ fontSize: "1.3rem", fontWeight: 600 }}
                  >
                    {blog.title}
                  </Card.Title>
                  <Card.Text style={{ textAlign: "justify" }}>
                    {blog.description}
                  </Card.Text>

                  <Button
                    as={Link}
                    to={`/blogs/${blog.slug}`}
                    style={{ backgroundColor: "#c770f0", border: "none" }}
                  >
                    Read More
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </Container>
  );
}

export default Blogs;
