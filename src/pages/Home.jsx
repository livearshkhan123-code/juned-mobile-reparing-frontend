function Home() {   // home page ka ui bana rha h
  return (
    <section id = "home" className="home-hero">
      <div className="shop-notice">
        Shop is Closed every Friday and on Public Holidays.
      </div>
      <p className="hero-tag">YOUR TRUSTED MOBILE REPAIR SHOP</p>

      <h1>
        Juned Mobile Repairing
        <br />
        <span>At The Right Price.</span>
      </h1>

      <p className="hero-description">
        Mobile repair, new phones aur second-hand phones —
        Everything under one roof.
      </p>
    <a href="#repair-form" className="btn btn-primary">
         Repair your phone
      </a>
    </section>
  )
}
export default Home