function Footer() {
  return (
    <footer id="footer" className="footer">
      <h3>JUNED MOBILE REPAIRING</h3>

      <p>G.T. Road, Handia, Prayagraj</p>

      <p>
        Mobile Repairing | New Phones | Second-Hand Phones
      </p>

      <div className="footer-contact">
        <h4>Contact Us</h4>

        <p>
          Phone:{' '}
          <a href="tel:+919936152556">
            +91 9936152556
          </a>
        </p>

        <p>
          WhatsApp:{' '}
          <a
            href="https://wa.me/919936152556"
            target="_blank"
            rel="noreferrer"
          >
            Chat on WhatsApp
          </a>
        </p>

        <p>
          Email:{' '}
          <a href="mailto:junedkhan123@gmail.com">
            junedkhan123@gmail.com
          </a>
        </p>

        <p>
          Instagram:{' '}
          <a
            href="https://www.instagram.com/insta_junedkhan12/"
            target="_blank"
            rel="noreferrer"
          >
            Visit Instagram
          </a>
        </p>
      </div>

      <p className="footer-note">
        Closed every Friday and on public holidays.
      </p>

      <p className="copyright">
        © 2026 Juned Mobile Repairing. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer