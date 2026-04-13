import { useState } from "react";

function Header({ onSearch }) {
  const [input, setInput] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(input.trim());
  };

  return (
    <header>
      <a href="#" className="logo">
        <span className="new-box">NEW</span>
        <span className="movie-text">MOVIE</span>
      </a>

      <form className="search" onSubmit={handleSubmit}>
        <i className="fa fa-search"></i>
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