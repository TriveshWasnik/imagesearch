import React, { useState } from "react";

function ImageSearch() {
  const [query, setQuery] = useState("");
  let [page, setPage] = useState(1);
  const [images, setImages] = useState([]);

  async function showImages() {
    const apikey = "5ZnTMh3sVuzQXqB7hmqmbzLWPrVJdzD1s0PXYvBQ5aSTH4hEcIND1ZT1";
    const url = `https://api.pexels.com/v1/search?query=${query}&page=${page}&per_page=40`;

    const res = await fetch(url, {
      headers: {
        Authorization: apikey,
      },
    });
    const data = await res.json();
    setImages(data?.photos);
    console.log(data);
  }

  return (
    <div className="container">
      <h2>Image Search Engine</h2>
      <div className="search-box">
        <input
          type="text"
          placeholder="search anything here"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={showImages}>Search</button>
      </div>

      <div className="result">
        {images.map((img) => (
          <>
            <div key={img?.alt}>
              <a href={img?.url} target="_blank">
                <div className="img-container">
                  <img src={img?.src?.original} alt={img?.alt} />
                  <h4>{img?.alt.slice(0, 30)}</h4>
                </div>
              </a>
            </div>
          </>
        ))}
      </div>
    </div>
  );
}

export default ImageSearch;
