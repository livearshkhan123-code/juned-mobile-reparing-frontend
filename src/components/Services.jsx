function Services() {
  const services = [
    {
      title: 'Mobile Repairing',
      description: 'Screen, battery, charging aur other mobile issues.',
      link: '#repair-form'
    },
    {
      title: 'Buy New Phones',
      description: 'Explore new phones and check availability.',
      link: '#buy-new'
    },
    {
      title: 'Second-Hand Phones',
      description: 'Browse used phones and enquire with our shop.',
      link: '#buy-used'
    }
  ]

  return (
    <section id = "services" className="services-section">
      <h2>Our Services</h2>

      <div className="services-grid">
        {services.map((service) => (
          <div className="service-card" key={service.title}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <a href={service.link} className="btn btn-outline-info">
              Explore
            </a>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Services