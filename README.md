# 🧠 Health Journal App

This is a mobile app that helps users log their daily health entries using **voice or text**, and automatically organizes the data using **AI (ChatGPT)**. It stores the structured information in **Firebase Firestore** for later analysis and visualization.

---

## ✨ Features

- 🗣️ Voice-to-text input *(web only)*
- ✍️ Freeform health journal entry
- 🤖 AI-powered structuring using OpenAI GPT
- 🔥 Firebase Firestore for daily log storage
- 📱 Built with React Native (Expo)

---

## 📷 Screenshots

Coming soon...

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+)
- Expo CLI (`npm install -g expo-cli`)
- Firebase account
- OpenAI API key

### Installation

1. Clone the repo:

```bash
git clone https://github.com/yourusername/health-journal-app.git
cd health-journal-app
```

2. Install dependencies:

```bash
npm install
```

3. Set up Firebase:

- Download your Firebase Admin SDK JSON file
- Save it in the root folder

4. Configure API keys:

- Set the `FIREBASE_API_KEY` and `OPENAI_KEY` environment variables. You can create an `.env` file or export them in your shell before running the app.

---

## 📂 Folder Structure

```
/health-journal-app
├── /app
│   └── index.tsx
├── /assets
├── /components
├── /screens
├── .gitignore
├── README.md
└── ...
```

---

## 🧠 Future Phases

- 🔐 Authentication (Google or Email)
- 📊 Data visualization (charts, timelines)
- 💡 Smart insights from AI
- 🧲 Hardware sensor integration (head-mounted ECG, muscle signals)

---

## 🛠️ Built With

- [React Native + Expo](https://reactnative.dev/)
- [Firebase Firestore](https://firebase.google.com/)
- [OpenAI GPT](https://platform.openai.com/)
- [Visual Studio Code](https://code.visualstudio.com/)

---

## 📄 License

This project is open-source and available under the MIT License.