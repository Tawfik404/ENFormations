import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupeService } from '../services/groupeService';
import { apprenantService } from '../services/apprenantService';
import { formateurService } from '../services/formateurService';

export default function AjouterGroupe() {
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const [apprenants, setApprenants] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [selectedApprenants, setSelectedApprenants] = useState([]);
  const [selectedFormateur, setSelectedFormateur] = useState('');
  const [searchApprenants, setSearchApprenants] = useState('');
  const [searchFormateur, setSearchFormateur] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    apprenantService.getAll().then(r => setApprenants(r.data)).catch(() => setApprenants([]));
    formateurService.getAll().then(r => setFormateurs(r.data)).catch(() => setFormateurs([]));
  }, []);

  const filteredApprenants = apprenants.filter(a =>
    `${a.nom} ${a.prenom}`.toLowerCase().includes(searchApprenants.toLowerCase())
  );

  const filteredFormateurs = formateurs.filter(f =>
    `${f.nom} ${f.prenom}`.toLowerCase().includes(searchFormateur.toLowerCase())
  );
  
  const handleSubmit = () => {
    if (!nom.trim()) {
      setError('Le nom est requis');
      return;
    }
    
    groupeService.create({ nom, apprenants: selectedApprenants })
      .then(async res => {
        const groupId = res.data.id;

        try {
          await Promise.all(selectedApprenants.map(id => (
            apprenantService.update(id, { groupe_id: groupId })
          )));
        } catch (err) {
          setError('Erreur lors de l\'assignation des apprenants');
          return;
        }

        if (selectedFormateur) {
          try {
            await formateurService.update(selectedFormateur, { groupe_id: groupId });
          } catch (err) {
            setError('Erreur lors de l\'assignation du formateur');
            return;
          }
        }

        navigate('/groupes');
      })
      .catch((err) => {
        const errorMsg = err.response?.data?.message || 'Erreur lors de la création du groupe';
        setError(errorMsg);
      });
  };
  
  return (
    <div>
      <h1 style={{ 
        fontFamily: "'DM Serif Display', serif", 
        fontSize: '2.4rem',
        fontWeight: 400, 
        marginBottom: 4 
      }}>
        Ajouter un Groupe
      </h1>
      <p style={{ 
        fontSize: '0.72rem', 
        color: '#4fffb0', 
        fontStyle: 'italic',
        fontFamily: "'DM Serif Display', serif", 
        marginBottom: 28 
      }}>
        Créer un nouveau groupe
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
            Apprenants
          </label>
          <input
            type="text"
            placeholder="Rechercher un apprenant..."
            value={searchApprenants}
            onChange={e => setSearchApprenants(e.target.value)}
            style={{
              width: '100%',
              background: '#13171f',
              border: '1px solid #262d3d',
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: '0.72rem',
              color: '#fff',
              fontFamily: "'DM Mono', monospace",
              outline: 'none',
              marginBottom: 8,
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4fffb0'}
            onBlur={(e) => e.target.style.borderColor = '#262d3d'}
          />
          <div style={{
            background: '#13171f',
            border: '1px solid #262d3d',
            borderRadius: 6,
            padding: '12px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            {filteredApprenants.map(a => (
              <div key={a.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id={`apprenant-${a.id}`}
                  checked={selectedApprenants.includes(String(a.id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedApprenants([...selectedApprenants, String(a.id)]);
                    } else {
                      setSelectedApprenants(selectedApprenants.filter(id => id !== String(a.id)));
                    }
                  }}
                  style={{
                    width: '14px',
                    height: '14px',
                    marginRight: 8,
                    accentColor: '#4fffb0',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor={`apprenant-${a.id}`} style={{
                  fontSize: '0.72rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace"
                }}>
                  {a.nom} {a.prenom}
                </label>
              </div>
            ))}
          </div>
        </div>

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
            Formateur
          </label>
          <input
            type="text"
            placeholder="Rechercher un formateur..."
            value={searchFormateur}
            onChange={e => setSearchFormateur(e.target.value)}
            style={{
              width: '100%',
              background: '#13171f',
              border: '1px solid #262d3d',
              borderRadius: 6,
              padding: '8px 12px',
              fontSize: '0.72rem',
              color: '#fff',
              fontFamily: "'DM Mono', monospace",
              outline: 'none',
              marginBottom: 8,
              transition: 'border-color 0.2s'
            }}
            onFocus={(e) => e.target.style.borderColor = '#4fffb0'}
            onBlur={(e) => e.target.style.borderColor = '#262d3d'}
          />
          <div style={{
            background: '#13171f',
            border: '1px solid #262d3d',
            borderRadius: 6,
            padding: '12px',
            maxHeight: '200px',
            overflowY: 'auto'
          }}>
            <div style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
              <input
                type="radio"
                id="formateur-none"
                name="formateur"
                value=""
                checked={selectedFormateur === ''}
                onChange={(e) => setSelectedFormateur(e.target.value)}
                style={{
                  width: '14px',
                  height: '14px',
                  marginRight: 8,
                  accentColor: '#4fffb0',
                  cursor: 'pointer'
                }}
              />
              <label htmlFor="formateur-none" style={{
                fontSize: '0.72rem',
                color: '#6b7591',
                cursor: 'pointer',
                fontFamily: "'DM Mono', monospace",
                fontStyle: 'italic'
              }}>
                -- Aucun --
              </label>
            </div>
            {filteredFormateurs.map(f => (
              <div key={f.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id={`formateur-${f.id}`}
                  name="formateur"
                  value={String(f.id)}
                  checked={selectedFormateur === String(f.id)}
                  onChange={(e) => setSelectedFormateur(e.target.value)}
                  style={{
                    width: '14px',
                    height: '14px',
                    marginRight: 8,
                    accentColor: '#4fffb0',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor={`formateur-${f.id}`} style={{
                  fontSize: '0.72rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace"
                }}>
                  {f.nom} {f.prenom}
                </label>
              </div>
            ))}
          </div>
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