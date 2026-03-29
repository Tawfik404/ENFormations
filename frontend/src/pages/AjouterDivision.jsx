import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { divisionService } from '../services/divisionService';

export default function AjouterDivision() {
  const [titre, setTitre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!titre.trim()) {
      setError('Le titre est requis');
      return;
    }

divisionService.create({ titre: titre })
      .then(() => navigate('/divisions'))
      .catch(() => setError('Erreur lors de la création'));
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
        Ajouter une Division
      </h1>

      <p style={{ 
        fontSize: '0.72rem', 
        color: '#4fffb0', 
        fontStyle: 'italic',
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: 28 
      }}>
        Créer une nouvelle division
      </p>

      {/* Error */}
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

      {/* Form */}
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
            Titre de la division
          </label>

          <input
            value={titre}
            onChange={e => setTitre(e.target.value)}
            placeholder="Ex: Division Informatique"
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

      {/* Buttons */}
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
          onClick={() => navigate('/divisions')}
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