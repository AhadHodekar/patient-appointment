import Section from "../../components/Section";
const About = () => {
  return (
    <Section sectionClass="about-container h-full overflow-scroll bg-gray-50">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-lg shadow-md">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-semibold text-primary">
            About Meditorial
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your trusted healthcare partner
          </p>
        </header>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Who We Are
          </h2>
          <p className="text-lg text-gray-700">
            Meditorial is a leading online healthcare platform designed to
            provide users with convenient access to medical information, doctor
            consultations, and healthcare resources. Our platform empowers
            patients to take charge of their health by offering reliable medical
            information, appointment scheduling, and more, all in one place.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            Our Mission
          </h2>
          <p className="text-lg text-gray-700">
            At Meditorial, our mission is to bridge the gap between patients and
            healthcare professionals, making quality medical services accessible
            to everyone. We aim to make healthcare easy, transparent, and
            patient-centered by providing innovative tools that connect you with
            trusted doctors and specialists in real-time.
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-2xl font-semibold text-primary mb-4">
            What We Offer
          </h2>
          <ul className="list-disc pl-6 text-lg text-gray-700">
            <li>Online doctor consultations with trusted professionals</li>
            <li>Access to medical resources and educational content</li>
            <li>Appointment scheduling for easy and hassle-free bookings</li>
            <li>Secure patient data and transaction management</li>
            <li>Comprehensive wellness and health tracking features</li>
          </ul>
        </section>
      </div>
    </Section>
  );
};

export default About;
