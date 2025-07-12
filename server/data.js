const questions = [
  {
    id: "q1",
    title: "How to center a div in CSS?",
    description: "I’m trying to center a div vertically and horizontally.",
    tags: ["CSS", "HTML"],
    votes: 4,
    answerCount: 1,
    viewCount: 100,
    createdAt: "2024-07-01T10:00:00Z",
    updatedAt: "2024-07-02T12:00:00Z",
    acceptedAnswerId: "a1",
    author: {
      id: "u1",
      name: "Alice",
      reputation: 150
    }
  },
  {
    id: "q2",
    title: "What is closure in JavaScript?",
    description: "Can someone explain closure with a simple example?",
    tags: ["JavaScript", "Functions"],
    votes: 9,
    answerCount: 2,
    viewCount: 230,
    createdAt: "2024-07-05T09:00:00Z",
    updatedAt: null,
    acceptedAnswerId: null,
    author: {
      id: "u2",
      name: "Bob",
      reputation: 320
    }
  }
];

const tags = [
  { id: "t1", name: "JavaScript", questionCount: 1, color: "#f7df1e" },
  { id: "t2", name: "CSS", questionCount: 1, color: "#264de4" },
  { id: "t3", name: "HTML", questionCount: 1, color: "#e34c26" },
  { id: "t4", name: "Functions", questionCount: 1, color: "#6f42c1" }
];

module.exports = { questions, tags };
