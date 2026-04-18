import { useState } from "react";

function Header({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const query = input.trim();
    onSearch(query);
    setInput("");
  };

  return (
    <header>
      <div className="logo">
        <span className="new-box">NEW</span>
        <span className="movie-text">MOVIE</span>
      </div>

      <form className="search" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
      </form>
    </header>
  );
}

export default Header;