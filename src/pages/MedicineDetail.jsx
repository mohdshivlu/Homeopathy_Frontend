import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/MedicineDetail.css'

const MedicineDetail = () => {
  const { id } = useParams()
  const [medicine, setMedicine] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchMedicine()
  }, [id])

  const fetchMedicine = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicines/${id}`)
      setMedicine(response.data)
    } catch (err) {
      setError('दवा लोड करने में त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  if (error || !medicine) {
    return (
      <div className="medicine-detail">
        <div className="container">
          <div className="error">{error || 'दवा नहीं मिली'}</div>
          <Link to="/choose-and-use" className="btn-primary">
            दवा सूची पर वापस जाएं
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="medicine-detail">
      <div className="container">
        <Link to="/choose-and-use" className="back-link">
          ← दवा सूची पर वापस जाएं
        </Link>

        <div className="medicine-content">
          <div className="medicine-header">
            <h1>{medicine.name}</h1>
            <span className="prakriti-badge-large">{medicine.prakriti}</span>
          </div>

          <div className="medicine-sections">
            {medicine.shakti && (
              <section className="medicine-section">
                <h3>शक्ति</h3>
                <p>{medicine.shakti}</p>
              </section>
            )}

            {medicine.rogName && (
              <section className="medicine-section">
                <h3>रोग का नाम एवं प्रभावित अंग</h3>
                <p>{medicine.rogName}</p>
              </section>
            )}

            {medicine.rogGati && (
              <section className="medicine-section">
                <h3>रोग की गति</h3>
                <p>{medicine.rogGati}</p>
              </section>
            )}

            {medicine.rogiPrakriti && (
              <section className="medicine-section">
                <h3>रोगी की प्रकृति / बनावट</h3>
                <p>{medicine.rogiPrakriti}</p>
              </section>
            )}

            {medicine.mansikLakshan && (
              <section className="medicine-section">
                <h3>मानसिक लक्षण</h3>
                <p>{medicine.mansikLakshan}</p>
              </section>
            )}

            {medicine.vishishtLakshan && (
              <section className="medicine-section">
                <h3>विशिष्ट लक्षण (समय / परिस्थिति / सहयोगी)</h3>
                <p>{medicine.vishishtLakshan}</p>
              </section>
            )}

            {medicine.vyapakLakshan && (
              <section className="medicine-section">
                <h3>व्यापक लक्षण (मैं संबंधित / चरित्र)</h3>
                <p>{medicine.vyapakLakshan}</p>
              </section>
            )}

            {medicine.utkatIchha && (
              <section className="medicine-section">
                <h3>उत्कट इच्छा या घृणा</h3>
                <p>{medicine.utkatIchha}</p>
              </section>
            )}

            {medicine.masikDharm && (
              <section className="medicine-section">
                <h3>मासिक धर्म की स्थिति</h3>
                <p>{medicine.masikDharm}</p>
              </section>
            )}

            {(medicine.puranak || medicine.saman || medicine.virodhi) && (
              <section className="medicine-section">
                <h3>संबंधित दवाएं</h3>
                <div className="related-medicines">
                  {medicine.puranak && (
                    <div>
                      <strong>पूरक:</strong> {medicine.puranak}
                    </div>
                  )}
                  {medicine.saman && (
                    <div>
                      <strong>समान:</strong> {medicine.saman}
                    </div>
                  )}
                  {medicine.virodhi && (
                    <div>
                      <strong>विरोधी:</strong> {medicine.virodhi}
                    </div>
                  )}
                </div>
              </section>
            )}

            {medicine.notes && (
              <section className="medicine-section">
                <h3>नोट्स / टिप्पणी</h3>
                <p>{medicine.notes}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MedicineDetail

