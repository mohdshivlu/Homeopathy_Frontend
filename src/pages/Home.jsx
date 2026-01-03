import { Link } from 'react-router-dom'
import '../styles/Home.css'

const Home = () => {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <div className="hero-content">
            <h1>होम्योपैथी चूज एंड यूज</h1>
            <p className="hero-subtitle">
              होम्योपैथी एक प्राकृतिक चिकित्सा पद्धति है जो शरीर की स्व-चिकित्सा शक्ति को बढ़ावा देती है।
              यहां आप होम्योपैथिक दवाओं के बारे में जानकारी प्राप्त कर सकते हैं और अपनी आवश्यकता के अनुसार
              उपयुक्त दवा चुन सकते हैं।
            </p>
            <div className="hero-cta">
              <Link to="/choose-and-use" className="btn-primary">
                दवाएं देखें
              </Link>
              <Link to="/articles" className="btn-outline">
                लेख पढ़ें
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <h3>व्यापक जानकारी</h3>
              <p>
                होम्योपैथिक दवाओं की विस्तृत जानकारी, उनके लक्षण, प्रकृति और उपयोग के बारे में
                पूर्ण विवरण प्राप्त करें।
              </p>
            </div>
            <div className="feature-card">
              <h3>आसान खोज</h3>
              <p>
                दवा के नाम, रोग, लक्षण या प्रकृति के आधार पर आसानी से खोजें और अपनी आवश्यकता के
                अनुसार दवा चुनें।
              </p>
            </div>
            <div className="feature-card">
              <h3>शिक्षाप्रद लेख</h3>
              <p>
                होम्योपैथी के बारे में जानकारीपूर्ण लेख पढ़ें और इस चिकित्सा पद्धति को बेहतर तरीके से
                समझें।
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

