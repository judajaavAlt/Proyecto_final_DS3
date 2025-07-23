import { useState } from "react";
import ReviewSection from "./components/ReviewSection";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [showModal, setShowModal] = useState(false);
  const movie = {
    title: "Ready Player One",
    image: "https://cdn.hobbyconsolas.com/sites/navi.axelspringer.es/public/media/image/2020/06/ready-player-one-1973431.jpg?tf=3840x",
  };

  const handleSubmit = (data) => {
    console.log("User Rating:", data);
    setShowModal(false);
  };

  return (
    <BrowserRouter basename="/rating/">
      <Routes>
        <Route path="/review/:movieId" element={<ReviewSection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
