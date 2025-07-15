import { useState } from "react";
import ReviewSection from "./components/ReviewSection";

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
    <div className="flex flex-col items-center justify-center h-screen bg-gray-800 text-white">
      <button
        className="bg-blue-500 hover:bg-blue-600 px-6 py-3 rounded"
        onClick={() => setShowModal(true)}
      >
        Rate Movie
      </button>

      {/* {showModal && (
        <RatingModal
          movie={movie}
          onClose={() => setShowModal(false)}
          onSubmit={handleSubmit}
        />
      )} */}
      <ReviewSection />
    </div>
  );
}

export default App;
