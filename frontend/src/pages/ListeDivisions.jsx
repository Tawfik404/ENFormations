import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { divisionService } from '../services/divisionService';

export default function ListeDivisions() {
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    loadDivisions();
  }, []);

  const loadDivisions = () => {
    divisionService.getAll()
      .then(r => setDivisions(r.data.data))
      .catch(e => console.error(e));
  };

  const handleDelete = (id) => {
    if (confirm('Supprimer cette division ?')) {
      divisionService.delete(id)
        .then(() => loadDivisions())
        .catch(e => console.error(e));
    }
  };

  return (
    <div>
      {/* Title */}
      <h1 style={{ 
        fontFamily: "'DM Serif Display', serif", 
        fontSize: '2.4rem',
        fontWeight: 400, 
        marginBottom: 4 
      }}>
        Liste des Divisions
      </h1>

      <p style={{ 
        fontSize: '0.72rem', 
        color: '#4fffb0', 
        fontStyle: 'italic',
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: 28 
      }}>
        Gérer toutes les divisions
      </p>

      {/* Button Ajouter */}
      <button 
        onClick={() => navigate('/ajouter-division')}
        style={{ 
          fontSize: '0.72rem', 
          color: '#1a1f2b', 
          background: '#4fffb0',
          border: 'none', 
          padding: '10px 20px', 
          borderRadius: 6, 
          cursor: 'pointer',
          fontFamily: "'DM Mono', monospace", 
          fontWeight: 500,
          marginBottom: 20
        }}
      >
        + Ajouter Division
      </button>

      {/* Table Card */}
      <div style={{ 
        background: '#1a1f2b', 
        border: '1px solid #262d3d',
        borderRadius: 8, 
        padding: 24
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          
          <thead>
            <tr>
              <th style={{
                textAlign: 'left',
                fontSize: '0.7rem',
                color: '#6b7591',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                paddingBottom: 12
              }}>
                ID
              </th>

              <th style={{
                textAlign: 'left',
                fontSize: '0.7rem',
                color: '#6b7591',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                paddingBottom: 12
              }}>
                Titre
              </th>

              <th style={{
                textAlign: 'left',
                fontSize: '0.7rem',
                color: '#6b7591',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                paddingBottom: 12
              }}>
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {divisions.map(d => (
              <tr key={d.id} style={{ borderTop: '1px solid #262d3d' }}>
                <td style={{ padding: '12px 0', fontSize: '0.75rem' }}>
                  {d.id}
                </td>

                <td style={{ padding: '12px 0', fontSize: '0.75rem' }}>
                  {d.titre}
                </td>

                <td style={{ padding: '12px 0' }}>
                  <button 
                    onClick={() => handleDelete(d.id)}
                    style={{ 
                      fontSize: '0.72rem', 
                      color: '#ff6b6b', 
                      background: 'rgba(255,107,107,0.1)',
                      border: '1px solid rgba(255,107,107,0.2)', 
                      padding: '8px 14px', 
                      borderRadius: 6, 
                      cursor: 'pointer',
                      fontFamily: "'DM Mono', monospace", 
                      fontWeight: 500 
                    }}
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
</table>
      </div>
    </div>
  );
}