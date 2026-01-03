import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import '../styles/ChooseAndUse.css'

const ChooseAndUse = () => {
  const [medicines, setMedicines] = useState([])
  const [filteredMedicines, setFilteredMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [search, setSearch] = useState('')
  const [prakriti, setPrakriti] = useState('')

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

  useEffect(() => {
    fetchMedicines()
  }, [])

  useEffect(() => {
    filterMedicines()
  }, [search, prakriti, medicines])

  const fetchMedicines = async () => {
    try {
      const params = {}
      if (search) params.search = search
      if (prakriti) params.prakriti = prakriti

      const response = await axios.get(`${API_BASE_URL}/medicines`, { params })
      setMedicines(response.data)
      setFilteredMedicines(response.data)
    } catch (err) {
      setError('दवाएं लोड करने में त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  const filterMedicines = () => {
    let filtered = medicines

    if (search) {
      const searchLower = search.toLowerCase()
      filtered = filtered.filter(
        (med) =>
          med.name?.toLowerCase().includes(searchLower) ||
          med.rogName?.toLowerCase().includes(searchLower) ||
          med.rogGati?.toLowerCase().includes(searchLower) ||
          med.rogiPrakriti?.toLowerCase().includes(searchLower) ||
          med.mansikLakshan?.toLowerCase().includes(searchLower) ||
          med.vishishtLakshan?.toLowerCase().includes(searchLower) ||
          med.vyapakLakshan?.toLowerCase().includes(searchLower)
      )
    }

    if (prakriti) {
      filtered = filtered.filter((med) => med.prakriti === prakriti)
    }

    setFilteredMedicines(filtered)
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  return (
    <div className="choose-and-use">
      <div className="container">
        <h1>दवा चुनें और उपयोग करें</h1>

        <div className="filters">
          <div className="filter-group">
            <label>खोजें (दवा नाम, रोग, लक्षण)</label>
            <input
              type="text"
              placeholder="खोजें..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="filter-group">
            <label>प्रकृति</label>
            <select value={prakriti} onChange={(e) => setPrakriti(e.target.value)}>
              <option value="">सभी</option>
              <option value="गर्म">गर्म</option>
              <option value="ठंडी">ठंडी</option>
              <option value="दोनों">दोनों</option>
            </select>
          </div>
        </div>

        {error && <div className="error">{error}</div>}

        {filteredMedicines.length === 0 ? (
          <div className="no-medicines">
            <p>कोई दवा नहीं मिली।</p>
          </div>
        ) : (
          <>
            <div className="medicines-count">
              {filteredMedicines.length} दवा(एं) मिली
            </div>
            <div className="medicines-grid">
              {filteredMedicines.map((medicine) => (
                <Link
                  key={medicine.id}
                  to={`/medicine/${medicine.id}`}
                  className="medicine-card"
                >
                  <h3>{medicine.name}</h3>
                  <div className="medicine-info">
                    <span className="prakriti-badge">{medicine.prakriti}</span>
                    {medicine.rogName && (
                      <p className="rog-name">{medicine.rogName}</p>
                    )}
                    {medicine.shakti && (
                      <p className="shakti">शक्ति: {medicine.shakti}</p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default ChooseAndUse

