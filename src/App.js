// App.js
import React, { useState } from "react";
import axios from "axios";
import "./App.css";
import { motion } from "framer-motion";

const UNSPLASH_ACCESS_KEY = "PDcwVuaFM31W_L52XEhZb0DbWR1tMGVpLyG8g9e4Y7k";

function App() {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = async () => {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    setImages(response.data.results);
  };

  return (
    <div className="App">
      <header>
        <h1>Image Gallery</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for images..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button onClick={fetchImages}>Search</button>
        </div>
      </header>

      <div className="grid">
        {images.map((image) => (
          <motion.div
            key={image.id}
            className="card"
            whileHover={{ scale: 1.1 }}
            onClick={() => setSelectedImage(image)}
          >
            <img src={image.urls.small} alt={image.alt_description} />
          </motion.div>
        ))}
      </div>

      {selectedImage && (
        <div className="modal" onClick={() => setSelectedImage(null)}>
          <motion.div
            className="modal-content"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
          >
            <img src={selectedImage.urls.regular} alt={selectedImage.alt_description} />
            <h2>{selectedImage.description || "No Title"}</h2>
            <p>By: {selectedImage.user.name}</p>
          </motion.div>
        </div>
      )}
    </div>
  );
}

export default App;

