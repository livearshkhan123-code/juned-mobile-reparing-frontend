import { useState } from 'react'

function BuyUsed() {
  const [selectedPhone, setSelectedPhone] = useState(null)
  const [message, setMessage] = useState('')
  const [customerName, setCustomerName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [contactNumber, setContactNumber] = useState('')

  const phones = [
    { id: 1, name: 'Certified Pre-Owned', condition: 'Good Condition' },
    { id: 2, name: 'Value Deal', condition: 'Very Good Condition' },
    { id: 3, name: 'Premium Used Phones', condition: 'Good Condition' }
  ]

  const handleAvailability = (phone) => {
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

    const whatsappMessage = `Second-Hand Phone Enquiry

Customer Name: ${customerName}
Selected Phone: ${selectedPhone.name}
Preferred Model Name: ${brandName}
Condition: ${selectedPhone.condition}
Contact Number: ${contactNumber}`

    const whatsappURL =
      `https://wa.me/${shopNumber}?text=${encodeURIComponent(whatsappMessage)}`

    window.open(whatsappURL, '_blank')

    setCustomerName('')
    setBrandName('')
    setContactNumber('')

    setMessage('Inquiry prepared! Please send the message on WhatsApp.')
  }

  return (
    <section id="buy-used" className="services-section">
      <h2>Second-Hand Phones</h2>

      <p>Check availability and prices of second-hand phones.</p>

      <div className="services-grid">
        {phones.map((phone) => (
          <div className="service-card" key={phone.id}>
            <h3>{phone.name}</h3>
            <p>{phone.condition}</p>
            <p>Price and availability on enquiry.</p>

            <button
              type="button"
              className="btn btn-outline-info"
              onClick={() => handleAvailability(phone)}
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
          <p>Condition: {selectedPhone.condition}</p>

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

export default BuyUsed