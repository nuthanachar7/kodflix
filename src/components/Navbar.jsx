export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__content">
        <span className="navbar__logo">FlashScreen Movies</span>
        <div className="navbar__links">
          <a href="#home">Home</a>
          <a href="#movies">Movies</a>
          <a href="#search">Search</a>
        </div>
      </div>
    </nav>
  )
}
