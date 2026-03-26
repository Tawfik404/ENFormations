import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { groupeService } from '../services/groupeService';

export default function ModifierGroupe() {
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();
  
  useEffect(() => {
    groupeService.getById(id)
      .then(r => {
        setNom(r.data.data.nom);
        setLoading(false);
      })
      .catch(() => {
        setError('Erreur lors du chargement');
        setLoading(false);
      });
  }, [id]);
  
  const handleSubmit = () => {
    if (!nom.trim()) {
      setError('Le nom est requis');
      return;
    }
    
    groupeService.update(id, { nom })
      .then(() => navigate('/groupes'))
      .catch(() => setError('Erreur lors de la modification'));
  };
  
  if (loading) {
    return <div style={{ color: '#fff' }}>Chargement...</div>;
  }
  
  return (
    <div>
      <h1 style={{ 
        fontFamily: "'DM Serif Display', serif", 
        fontSize: '2.4rem',
        fontWeight: 400, 
        marginBottom: 4 
      }}>
        Modifier le Groupe
      </h1>
      <p style={{ 
        fontSize: '0.72rem', 
        color: '#4fffb0', 
        fontStyle: 'italic',
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: 28 
      }}>
        Mettre à jour les informations du groupe
      </p>

      {/* Message d'erreur */}
      {error && (
        <div style={{ 
          background: 'rgba(255,107,107,0.1)', 
          border: '1px solid rgba(255,107,107,0.2)',
          color: '#ff6b6b',
          padding: '12px 16px',
          borderRadius: 6,
          fontSize: '0.72rem',
          marginBottom: 24,
          fontFamily: "'DM Mono', monospace"
        }}>
          {error}
        </div>
      )}
      
      {/* Formulaire */}
      <div style={{ 
        background: '#1a1f2b', 
        border: '1px solid #262d3d',
        borderRadius: 8, 
        padding: 24,
        marginBottom: 24
      }}>
        <div style={{ marginBottom: 20 }}>
          <label style={{ 
            display: 'block',
            fontSize: '0.7rem', 
            color: '#6b7591',
            textTransform: 'uppercase', 
            letterSpacing: '0.08em',
            marginBottom: 8,
            fontFamily: "'DM Mono', monospace"
          }}>
            Nom du groupe
          </label>
          <input
            value={nom}
            onChange={e => setNom(e.target.value)}
            placeholder="Ex: Groupe A"
            style={{
              width: '100%',
              background: '#13171f',
              border: '1px solid #262d3d',
              borderRadius: 6,
              padding: '11px 16px',
              fontSize: '0.72rem',
              color: '#fff',
              fontFamily: "'DM Mono', monospace",
              outline: 'none',
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4fffb0'}
            onBlur={(e) => e.target.style.borderColor = '#262d3d'}
          />
        </div>
      </div>

      {/* Boutons d'action */}
      <div style={{ display: 'flex', gap: 12 }}>
        <button 
          onClick={handleSubmit}
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
          Enregistrer
        </button>
        <button 
          onClick={() => navigate('/groupes')}
          style={{ 
            fontSize: '0.72rem',
         color: '#6b7591', 
            background: 'transparent',
            border: '1px solid #262d3d', 
            padding: '10px 20px', 
            borderRadius: 6, 
            cursor: 'pointer',
            fontFamily: "'DM Mono', monospace", 
            fontWeight: 500 
          }}
        >
          Annuler
        </button>
      </div>
    </div>
  );
}