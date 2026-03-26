import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { villeService } from '../services/villeService';

export default function ListeVilles() {
  const [villes, setVilles] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadVilles();
  }, []);
  
  const loadVilles = () => {
    villeService.getAll()
      .then(r => setVilles(r.data.data))
      .catch(e => console.error(e));
  };
  
  const handleDelete = (id) => {
    if (confirm('Supprimer cette ville ?')) {
      villeService.delete(id)
        .then(() => loadVilles())
        .catch(e => console.error(e));
    }
  };
  
  return (
    <div>
      <h1 style={{ 
        fontFamily: "'DM Serif Display', serif", 
        fontSize: '2.4rem',
        fontWeight: 400, 
        marginBottom: 4 
      }}>
        Liste des Villes
      </h1>
      <p style={{ 
        fontSize: '0.72rem', 
        color: '#4fffb0', 
        fontStyle: 'italic',
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: 28 
      }}>
        Gestion des villes
      </p>

      {/* Bouton Ajouter */}
      <div style={{ marginBottom: 24 }}>
        <button 
          onClick={() => navigate('/ajouter-ville')}
          style={{ 
            fontSize: '0.72rem', 
            color: '#1a1f2b', 
            background: '#4fffb0',
            border: 'none', 
            padding: '10px 20px', 
            borderRadius: 6, 
            cursor: 'pointer',
            fontFamily: "'DM Mono', monospace", 
            fontWeight: 500 
          }}
        >
          + Ajouter Ville
        </button>
      </div>
      
      {/* Table */}
      <div style={{ 
        background: '#1a1f2b', 
        border: '1px solid #262d3d',
        borderRadius: 8, 
        overflow: 'hidden' 
      }}>
        <div style={{ 
          padding: '14px 20px', 
          borderBottom: '1px solid #262d3d' 
        }}>
          <span style={{ 
            fontSize: '0.7rem', 
            color: '#6b7591',
            textTransform: 'uppercase', 
            letterSpacing: '0.08em' 
          }}>
            Toutes les villes
          </span>
        </div>
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ background: '#13171f' }}>
              <th style={{ 
                padding: '9px 16px', 
                textAlign: 'left',
                fontSize: '0.65rem', 
                color: '#6b7591',
                textTransform: 'uppercase', 
                fontWeight: 400 
              }}>
                ID
              </th>
              <th style={{ 
                padding: '9px 16px', 
                textAlign: 'left',
                fontSize: '0.65rem', 
                color: '#6b7591',
                textTransform: 'uppercase', 
                fontWeight: 400 
              }}>
                Nom
              </th>
              <th style={{ 
                padding: '9px 16px', 
                textAlign: 'left',
                fontSize: '0.65rem', 
                color: '#6b7591',
                textTransform: 'uppercase', 
                fontWeight: 400 
              }}>
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {villes.map(v => (
              <tr key={v.id} style={{ borderTop: '1px solid #262d3d' }}>
                <td style={{ 
                  padding: '11px 16px', 
                  fontSize: '0.72rem',
                  color: '#6b7591', 
                  fontWeight: 500 
                }}>
                  {v.id}
                </td>
                <td style={{ 
                  padding: '11px 16px', 
                  fontSize: '0.72rem',
                  color: '#fff',
                 fontWeight: 500 
                }}>
                  {v.nom}
                </td>
                <td style={{ 
                  padding: '11px 16px', 
                  display: 'flex', 
                  gap: 8 
                }}>
                  <button 
                    onClick={() => handleDelete(v.id)}
                    style={{ 
                      fontSize: '0.68rem', 
                      color: '#ff6b6b',
                      background: 'rgba(255,107,107,0.1)', 
                      border: '1px solid rgba(255,107,107,0.2)',
                      padding: '5px 12px', 
                      borderRadius: 4, 
                      cursor: 'pointer',
                      fontFamily: "'DM Mono', monospace" 
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