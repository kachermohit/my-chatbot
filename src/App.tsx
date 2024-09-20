import React from "react";
import Chatbot from "./components/Chatbot";
import Header from "./components/Header";
import Footer from "./components/Footer";

const App: React.FC = () => {
  return (
    <div>
      <Header />
      <Chatbot />
      <Footer />
    </div>
  );
};

export default App;
