import '../styles/About.css'

const About = () => {
  return (
    <div className="about-page">
      <div className="container">
        <h1>हमारे बारे में</h1>
        
        <section className="about-section">
          <h2>होम्योपैथी चूज एंड यूज</h2>
          <p>
            होम्योपैथी चूज एंड यूज एक व्यापक वेब प्लेटफॉर्म है जो होम्योपैथिक दवाओं और जानकारी को 
            आसानी से उपलब्ध कराता है। यह प्लेटफॉर्म उपयोगकर्ताओं को होम्योपैथिक दवाओं के बारे में 
            विस्तृत जानकारी प्रदान करता है और उन्हें अपनी आवश्यकता के अनुसार उपयुक्त दवा चुनने में 
            मदद करता है।
          </p>
        </section>

        <section className="about-section">
          <h2>हमारा उद्देश्य</h2>
          <p>
            हमारा उद्देश्य होम्योपैथी के ज्ञान को आम जनता तक पहुंचाना है और लोगों को इस प्राकृतिक 
            चिकित्सा पद्धति के बारे में शिक्षित करना है। हम चाहते हैं कि हर व्यक्ति अपने स्वास्थ्य 
            के लिए सही निर्णय ले सके।
          </p>
        </section>

        <section className="about-section">
          <h2>संपर्क जानकारी</h2>
          <div className="contact-info">
            <div className="contact-card">
              <h3>नाम</h3>
              <p>Pankaj Yadav</p>
            </div>
            <div className="contact-card">
              <h3>ईमेल</h3>
              <p>
                <a href="mailto:pankaj@gmail.com">pankaj@gmail.com</a>
              </p>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>अस्वीकरण</h2>
          <p>
            यह वेबसाइट केवल सूचनात्मक उद्देश्यों के लिए है। यहां दी गई जानकारी चिकित्सकीय सलाह का 
            विकल्प नहीं है। किसी भी स्वास्थ्य समस्या के लिए कृपया एक योग्य होम्योपैथिक चिकित्सक 
            से परामर्श करें। स्व-उपचार केवल सामान्य तीव्र रोगों के लिए ही सुझाया जाता है।
          </p>
        </section>
      </div>
    </div>
  )
}

export default About

