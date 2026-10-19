import{useState} from 'react'

function Repair() {
  const [message, setMessage] = useState('')
  return (
    <section id = "repair-form" className="repair-section">
      <h2>Book a Mobile Repair</h2>
      <p>Tell us what's wrong with your phone.</p>

      <form 
       onSubmit={async(e) => {
        e.preventDefault()
        const form = e.target
        const customerName = form.elements[0].value
        const contactNumber = form.elements[1].value
        const phoneModel = form.elements[2].value
        const mobileIssue = form.elements[3].value
        const problemDescription = form.elements[4].value

        const photoInput = form.querySelector(`imput[type="file"]`);
        const photos = photoInput?.files;


        
        const shopNumber = '919580748970'
        const whatsappMessage = `Mobile Repair Request
        Customer Name: ${customerName}
        Contact Number: ${contactNumber}
        Phone Model: ${phoneModel}
        Mobile Issue: ${mobileIssue}
        Problem Description: ${problemDescription}`;
        

try {
   const formData = new FormData();

  formData.append('customerName', customerName);
  formData.append('contactNumber', contactNumber);
  formData.append('phoneModel', phoneModel);
  formData.append('mobileIssue', mobileIssue);
  formData.append('problemDescription', problemDescription);

  if (photos) {
    for (const photo of photos) {
      formData.append('photos', photo);
    }
  }

  const response = await fetch('http://localhost:8080/api/repairs', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
      throw new Error('Booking could not be saved');
    }

    const whatsappURL =
      `https://wa.me/${shopNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    window.open(whatsappURL, '_blank');

    setMessage('THANK YOU! Your repair request has been received. Our team will contact you to discuss the issue and estimate the cost.');

    form.reset();
  } catch (error) {
    setMessage('Booking could not be saved. Please try again.');
    console.error(error);
  }
}}>
        <label>Customer Name</label>
        <input 
        type="text"
        placeholder="Enter your name"
        pattern="[A-Za-z\s]+"
        title="Please enter letters only"
        on change={(e) => {
          e.target.value = e.target.value.replace(/[^A-Za-z\s]/g, '')
        }}
        required
        />
        <label>Contact Number</label>
        <input 
        type="tel"
        inputMode="numeric" 
        placeholder="Enter your contact number"
        pattern="[0-9]{10}"
        minLength={10}
        maxLength={10}
        on change={(e) => {
          e.target.value = e.target.value.
          replace(/[^0-9]/g, '')
          .slice(0, 10)
        }}
        required
        />

        <label>Phone Model</label>
        <input 
        type="text"
        placeholder="Enter your phone brand and model" 
        required
        />

        <label>Mobile Issue</label>
        <select defaultValue="" required>
          <option value="" disabled>Select an issue</option>
          <option>Screen Damage</option>
          <option>Battery Problem</option>
          <option>Charging Issue</option>
          <option>Software Problem</option>
          <option>Other Issue</option>
        </select>

        <label>Describe the Problem</label>
        <textarea 
        placeholder="Explain the issue..."
        rows="4"
        required
        />
      
      <label>Upload phone photo</label>
      <input
        type="file"
        accept="image/*"
        multiple
      />
      <p className  = "estimate-note">
        Final repair cost will be confirmed after inspection.
      </p>

        <button type="submit" className="btn btn-primary">
          Submit Repair Request
        </button>

        {message && (
        <p className="estimate-note">
        {message}
          </p>)}

      </form>
    </section>
  )
}

export default Repair