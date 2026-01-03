import { useState, useEffect } from 'react'
import axios from 'axios'
import '../../styles/AdminMedicines.css'

const AdminMedicines = () => {
  const [medicines, setMedicines] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingMedicine, setEditingMedicine] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    prakriti: 'गर्म',
    shakti: '',
    rogName: '',
    rogGati: '',
    rogiPrakriti: '',
    mansikLakshan: '',
    vishishtLakshan: '',
    vyapakLakshan: '',
    utkatIchha: '',
    masikDharm: '',
    puranak: '',
    saman: '',
    virodhi: '',
    notes: ''
  })

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'
  const token = localStorage.getItem('adminToken')

  useEffect(() => {
    fetchMedicines()
  }, [])

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/medicines`)
      setMedicines(response.data)
    } catch (err) {
      setError('दवाएं लोड करने में त्रुटि')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    try {
      if (editingMedicine) {
        await axios.put(
          `${API_BASE_URL}/medicines/${editingMedicine.id}`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      } else {
        await axios.post(
          `${API_BASE_URL}/medicines`,
          formData,
          { headers: { Authorization: `Bearer ${token}` } }
        )
      }
      setShowForm(false)
      setEditingMedicine(null)
      resetForm()
      fetchMedicines()
    } catch (err) {
      setError(err.response?.data?.message || 'त्रुटि हुई')
    }
  }

  const resetForm = () => {
    setFormData({
      name: '',
      prakriti: 'गर्म',
      shakti: '',
      rogName: '',
      rogGati: '',
      rogiPrakriti: '',
      mansikLakshan: '',
      vishishtLakshan: '',
      vyapakLakshan: '',
      utkatIchha: '',
      masikDharm: '',
      puranak: '',
      saman: '',
      virodhi: '',
      notes: ''
    })
  }

  const handleEdit = (medicine) => {
    setEditingMedicine(medicine)
    setFormData({
      name: medicine.name || '',
      prakriti: medicine.prakriti || 'गर्म',
      shakti: medicine.shakti || '',
      rogName: medicine.rogName || '',
      rogGati: medicine.rogGati || '',
      rogiPrakriti: medicine.rogiPrakriti || '',
      mansikLakshan: medicine.mansikLakshan || '',
      vishishtLakshan: medicine.vishishtLakshan || '',
      vyapakLakshan: medicine.vyapakLakshan || '',
      utkatIchha: medicine.utkatIchha || '',
      masikDharm: medicine.masikDharm || '',
      puranak: medicine.puranak || '',
      saman: medicine.saman || '',
      virodhi: medicine.virodhi || '',
      notes: medicine.notes || ''
    })
    setShowForm(true)
  }

  const handleDelete = async (id) => {
    if (!window.confirm('क्या आप इस दवा को हटाना चाहते हैं?')) {
      return
    }

    try {
      await axios.delete(`${API_BASE_URL}/medicines/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      fetchMedicines()
    } catch (err) {
      setError('दवा हटाने में त्रुटि')
    }
  }

  const handleCancel = () => {
    setShowForm(false)
    setEditingMedicine(null)
    resetForm()
  }

  if (loading) {
    return <div className="loading">लोड हो रहा है...</div>
  }

  return (
    <div className="admin-medicines">
      <div className="page-header">
        <h1>दवा प्रबंधन</h1>
        <button
          className="btn-primary"
          onClick={() => {
            setShowForm(true)
            setEditingMedicine(null)
            resetForm()
          }}
        >
          + नई दवा
        </button>
      </div>

      {error && <div className="error">{error}</div>}

      {showForm && (
        <div className="form-modal">
          <div className="form-card">
            <h2>{editingMedicine ? 'दवा संपादित करें' : 'नई दवा जोड़ें'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>नाम दवा *</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>प्रकृति *</label>
                  <select
                    value={formData.prakriti}
                    onChange={(e) => setFormData({ ...formData, prakriti: e.target.value })}
                    required
                  >
                    <option value="गर्म">गर्म</option>
                    <option value="ठंडी">ठंडी</option>
                    <option value="दोनों">दोनों</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>शक्ति</label>
                  <input
                    type="text"
                    value={formData.shakti}
                    onChange={(e) => setFormData({ ...formData, shakti: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>रोग का नाम एवं प्रभावित अंग</label>
                <input
                  type="text"
                  value={formData.rogName}
                  onChange={(e) => setFormData({ ...formData, rogName: e.target.value })}
                />
              </div>

              <div className="form-group">
                <label>रोग की गति</label>
                <textarea
                  value={formData.rogGati}
                  onChange={(e) => setFormData({ ...formData, rogGati: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>रोगी की प्रकृति / बनावट</label>
                <textarea
                  value={formData.rogiPrakriti}
                  onChange={(e) => setFormData({ ...formData, rogiPrakriti: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>मानसिक लक्षण</label>
                <textarea
                  value={formData.mansikLakshan}
                  onChange={(e) => setFormData({ ...formData, mansikLakshan: e.target.value })}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>विशिष्ट लक्षण (समय / परिस्थिति / सहयोगी)</label>
                <textarea
                  value={formData.vishishtLakshan}
                  onChange={(e) => setFormData({ ...formData, vishishtLakshan: e.target.value })}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>व्यापक लक्षण (मैं संबंधित / चरित्र)</label>
                <textarea
                  value={formData.vyapakLakshan}
                  onChange={(e) => setFormData({ ...formData, vyapakLakshan: e.target.value })}
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label>उत्कट इच्छा या घृणा</label>
                <textarea
                  value={formData.utkatIchha}
                  onChange={(e) => setFormData({ ...formData, utkatIchha: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-group">
                <label>मासिक धर्म की स्थिति</label>
                <textarea
                  value={formData.masikDharm}
                  onChange={(e) => setFormData({ ...formData, masikDharm: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>पूरक दवा</label>
                  <input
                    type="text"
                    value={formData.puranak}
                    onChange={(e) => setFormData({ ...formData, puranak: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>समान दवा</label>
                  <input
                    type="text"
                    value={formData.saman}
                    onChange={(e) => setFormData({ ...formData, saman: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>विरोधी दवा</label>
                  <input
                    type="text"
                    value={formData.virodhi}
                    onChange={(e) => setFormData({ ...formData, virodhi: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-group">
                <label>नोट्स / टिप्पणी</label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  rows="3"
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingMedicine ? 'अपडेट करें' : 'जोड़ें'}
                </button>
                <button type="button" className="btn-outline" onClick={handleCancel}>
                  रद्द करें
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <div className="medicines-list">
        {medicines.length === 0 ? (
          <p>कोई दवा नहीं है।</p>
        ) : (
          medicines.map((medicine) => (
            <div key={medicine.id} className="medicine-item">
              <div className="medicine-info">
                <h3>{medicine.name}</h3>
                <span className="prakriti-badge">{medicine.prakriti}</span>
                {medicine.rogName && (
                  <p className="rog-name">{medicine.rogName}</p>
                )}
                {medicine.shakti && (
                  <p className="shakti">शक्ति: {medicine.shakti}</p>
                )}
              </div>
              <div className="medicine-actions">
                <button
                  className="btn-secondary"
                  onClick={() => handleEdit(medicine)}
                >
                  संपादित करें
                </button>
                <button
                  className="btn-danger"
                  onClick={() => handleDelete(medicine.id)}
                >
                  हटाएं
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default AdminMedicines

