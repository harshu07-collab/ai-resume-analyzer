# Resumizer - AI-Powered Resume Analyzer

Resumizer is a smart, AI-driven resume feedback tool that helps job seekers optimize their resumes for specific job descriptions. Built with **React Router 7** and powered by **Puter.js**, it provides detailed ATS scoring, improvement tips, and analysis of your resume's strengths and weaknesses.

![Resumizer Banner](public/images/bg-main.svg)

## 🚀 Features

- **AI-Powered Analysis**: Get instant feedback on your resume using Claude-3.5-Sonnet (via Puter AI).
- **ATS Scoring**: See how well your resume matches a specific job description.
- **Detailed Feedback**: Analysis of key sections including Profile Summary, Experience, Skills, and Education.
- **Resume Management**: Track multiple applications and resume versions.
- **Secure Storage**: All data and files are stored securely using Puter's cloud infrastructure.
- **Modern UI**: Clean, responsive interface built with Tailwind CSS.

## 🛠️ Tech Stack

- **Framework**: [React Router 7](https://reactrouter.com/)
- **Backend Services**: [Puter.js](https://puter.com/) (Auth, KV Storage, File System, AI)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **PDF Processing**: [PDF.js](https://mozilla.github.io/pdf.js/)

## 🏁 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- A [Puter.com](https://puter.com/) account (the app uses Puter's cloud environment)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/harshu07-collab/ai-resume-analyzer.git
   cd ai-resume-analyzer
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:5173` in your browser.

## 📦 Deployment

### Docker

To build and run using Docker:

```bash
docker build -t ai-resume-analyzer .
docker run -p 3000:3000 ai-resume-analyzer
```

### Puter Deployment

Since this app uses Puter.js, it is optimized to run on the [Puter.com](https://puter.com/) platform. You can easily deploy it as a Puter App.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using React Router and Puter.
