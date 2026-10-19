import { useState } from 'react'

function BuyNew() {
  const [selectedPhone, setSelectedPhone] = useState(null)
  const [message, setMessage] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const phones = [
    { id: 1, name: 'Latest Smartphone A', price: 'Price on enquiry' },
    { id: 2, name: 'Budget Smartphone B', price: 'Price on enquiry' },
    { id: 3, name: 'Premium Smartphone', price: 'Price on enquiry' },
  ]

  const openInquiry = (phone) => {
    setSelectedPhone(phone)
    setBrandName(phone.name)
    setCustomerName('')
    setContactNumber('')
    setMessage('')
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (contactNumber.length !== 10) {
      setMessage('Please enter a valid 10-digit contact number.')
      return
    }

    const shopNumber = '919936152556'

    const whatsappMessage = `New Phone Enquiry

Customer Name: ${customerName}
Preferred Model Name: ${brandName}
Selected Phone: ${selectedPhone.name}
Contact Number: ${contactNumber}`

    const whatsappURL =
      `https://wa.me/${shopNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappURL, '_blank')
    setCustomerName("")
    setBrandName("")
    setContactNumber("")

    setMessage('Inquiry prepared! Please send the message on WhatsApp.')
  }

  return (
    <section id="buy-new" className="services-section">
      <h2>Buy New Phones</h2>
      <p>Check availability and prices of new phones.</p>

      <div className="services-grid">
        {phones.map((phone) => (
          <div className="service-card" key={phone.id}>
            <h3>{phone.name}</h3>
            <p>{phone.price}</p>

            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => openInquiry(phone)}
            >
              Check Availability
            </button>
          </div>
        ))}
      </div>

      {selectedPhone && (
        <div className="service-card mt-4">
          <h3>Check Availability</h3>
          <p>Selected Phone: {selectedPhone.name}</p>

          <form onSubmit={handleSubmit}>
            <label>Customer Name</label>
            <input
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              type="text"
              className="form-control mb-3"
              placeholder="Enter your name"
              required
            />

            <label>Preferred Model Name</label>
            <input
              value={brandName}
              onChange={(e) => setBrandName(e.target.value)}
              type="text"
              className="form-control mb-3"
              placeholder="Enter preferred model"
              required
            />

            <label>Customer Contact Number</label>
            <input
              value={contactNumber}
              onChange={(e) => {
                const value = e.target.value
                if (/^\d{0,10}$/.test(value)) {
                  setContactNumber(value)
                }
              }}
              type="tel"
              inputMode="numeric"
              className="form-control mb-3"
              placeholder="Enter 10-digit mobile number"
              pattern="[0-9]{10}"
              maxLength={10}
              required
            />

            <button type="submit" className="btn btn-primary">
              Send Inquiry
            </button>

            {message && (
              <p className="success-message">{message}</p>
            )}

            <button
              type="button"
              className="btn btn-secondary ms-2"
              onClick={() => {
                setSelectedPhone(null)
                setMessage('')
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </section>
  )
}

export default BuyNew