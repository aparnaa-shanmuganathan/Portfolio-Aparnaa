import React from "react";
import { useParams, Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";

const blogContent = {
  "learning-machine-learning": {
    title: "How I Started Learning Machine Learning as a Computer Science Student",
    date: "January 2025",
    readTime: "6 min read",
    paragraphs: [
      "When I first heard about Machine Learning, it sounded very intimidating. Terms like regression, neural networks, and backpropagation felt scary. As a Computer Science student, I wanted to understand ML properly, not just copy code from tutorials.",
      "I started by revising my basics: probability, linear algebra, and Python. Instead of jumping directly into deep learning, I spent time understanding simple models like linear regression, logistic regression, and decision trees. This made more advanced concepts much easier later.",
      "I also made a rule for myself: for every new algorithm I learned, I had to implement it on at least one small dataset. This helped me connect theory with practice and gave me confidence to read research blogs and documentation on my own.",
      "The biggest thing I learned is that consistency matters more than speed. Studying ML for one hour every day was more effective than trying to learn everything in one weekend.",
    ],
  },
  "deep-learning-mistakes": {
    title: "Common Mistakes I Made While Learning Deep Learning",
    date: "February 2025",
    readTime: "7 min read",
    paragraphs: [
      "When I started with deep learning, I was very excited about building complex neural networks. But in that excitement, I made many classic beginner mistakes that wasted time and gave confusing results.",
      "My first mistake was ignoring data preprocessing. I used raw, uncleaned data and expected the model to magically understand it. Later I realised that normalisation, handling missing values, and balancing classes can dramatically improve performance.",
      "Another mistake was focusing only on accuracy. I didn’t check precision, recall, or confusion matrices. For imbalanced datasets, accuracy can be very misleading. Now I always analyse multiple metrics before trusting a model.",
      "I also underestimated the power of simple baselines. Today, before building a deep network, I try a basic model first. If a simple model performs badly, it tells me more work is needed on data and problem understanding, not just on architecture.",
    ],
  },
  "problem-solving-over-frameworks": {
    title: "Why Problem-Solving Skills Matter More Than Just Frameworks",
    date: "March 2025",
    readTime: "5 min read",
    paragraphs: [
      "It’s very tempting to keep learning new frameworks: React, Next.js, TensorFlow, PyTorch, and many more. For a long time, I felt I was improving just because I knew many tools. But during interviews and projects, I realised something important—tools don’t help if you can’t think clearly about the problem.",
      "Problem-solving skills come from practicing logic, data structures, algorithms, and real-world debugging. When you understand how to break a problem into smaller parts, you can pick up any framework much faster.",
      "I also noticed that many issues in projects are not framework-specific. They are related to unclear requirements, wrong assumptions, or poor communication. Strong fundamentals and clear thinking help much more than memorising APIs.",
      "Now I try to balance my learning: I still explore new tools, but I spend more time improving reasoning, reading code, and working on projects that challenge my thinking. Frameworks will change, but problem-solving skills will stay useful throughout my career.",
    ],
  },
};

function BlogDetail() {
  const { slug } = useParams();
  const blog = blogContent[slug];

  if (!blog) {
    return (
      <Container style={{ paddingTop: "120px", color: "white" }}>
        <h2>Blog not found</h2>
        <p>The blog you are looking for does not exist.</p>
        <Button as={Link} to="/blogs" variant="outline-light" size="sm">
          Back to Blogs
        </Button>
      </Container>
    );
  }

  return (
    <Container
      style={{
        paddingTop: "120px",
        paddingBottom: "60px",
        color: "white",
        maxWidth: "850px",
      }}
    >
      <p style={{ opacity: 0.8, marginBottom: "5px" }}>
        {blog.date} · {blog.readTime}
      </p>
      <h1 className="purple" style={{ marginBottom: "20px" }}>
        {blog.title}
      </h1>

      {blog.paragraphs.map((para, idx) => (
        <p key={idx} style={{ lineHeight: 1.8, fontSize: "1rem" }}>
          {para}
        </p>
      ))}

      <Button
        as={Link}
        to="/blogs"
        style={{
          marginTop: "25px",
          backgroundColor: "#c770f0",
          border: "none",
        }}
      >
        ← Back to Blogs
      </Button>
    </Container>
  );
}

export default BlogDetail;
