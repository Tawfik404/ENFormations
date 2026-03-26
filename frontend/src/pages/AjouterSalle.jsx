import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { salleService } from '../services/salleService';

export default function AjouterSalle() {
  const [form, setForm] = useState({
    batiment: '',
    etage: '',
    nombre: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!form.batiment || !form.etage || !form.nombre) {
      setError('Tous les champs sont requis');
      return;
    }

    salleService.create(form)
      .then(() => navigate('/salles'))
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
        Ajouter une Salle
      </h1>

      <p style={{ 
        fontSize: '0.72rem', 
        color: '#4fffb0', 
        fontStyle: 'italic',
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: 28 
      }}>
        Créer une nouvelle salle
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

        {/* Batiment */}
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
            Bâtiment
          </label>

          <input
            value={form.batiment}
            onChange={e => setForm({...form, batiment: e.target.value})}
            placeholder="Ex: A"
            style={{
              width: '100%',
              background: '#13171f',
              border: '1px solid #262d3d',
              borderRadius: 6,
              padding: '11px 16px',
              fontSize: '0.72rem',
              color: '#fff',
              fontFamily: "'DM Mono', monospace",
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4fffb0'}
            onBlur={(e) => e.target.style.borderColor = '#262d3d'}
          />
        </div>

        {/* Etage */}
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
            Étage
          </label>

          <input
            value={form.etage}
            onChange={e => setForm({...form, etage: e.target.value})}
            placeholder="Ex: 1"
            style={{
              width: '100%',
              background: '#13171f',
              border: '1px solid #262d3d',
              borderRadius: 6,
              padding: '11px 16px',
              fontSize: '0.72rem',
              color: '#fff',
              fontFamily: "'DM Mono', monospace",
              outline: 'none'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4fffb0'}
            onBlur={(e) => e.target.style.borderColor = '#262d3d'}
          />
        </div>
          {/* Nombre */}
        <div>
          <label style={{ 
            display: 'block',
            fontSize: '0.7rem', 
            color: '#6b7591',
            textTransform: 'uppercase', 
            letterSpacing: '0.08em',
            marginBottom: 8,
            fontFamily: "'DM Mono', monospace"
          }}>
            Numéro
          </label>

          <input
            value={form.nombre}
            onChange={e => setForm({...form, nombre: e.target.value})}
            placeholder="Ex: 101"
            style={{
              width: '100%',
              background: '#13171f',
              border: '1px solid #262d3d',
              borderRadius: 6,
              padding: '11px 16px',
              fontSize: '0.72rem',
              color: '#fff',
              fontFamily: "'DM Mono', monospace",
              outline: 'none'
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
          onClick={() => navigate('/salles')}
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