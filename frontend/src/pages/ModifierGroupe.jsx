import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { groupeService } from '../services/groupeService';
import { apprenantService } from '../services/apprenantService';
import { formateurService } from '../services/formateurService';

export default function ModifierGroupe() {
  const [nom, setNom] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [apprenants, setApprenants] = useState([]);
  const [formateurs, setFormateurs] = useState([]);
  const [selectedApprenants, setSelectedApprenants] = useState([]);
  const [selectedFormateur, setSelectedFormateur] = useState('');
  const [groupData, setGroupData] = useState(null);
  const [searchApprenants, setSearchApprenants] = useState('');
  const [searchFormateur, setSearchFormateur] = useState('');
  const navigate = useNavigate();
  const { id } = useParams();

  const filteredApprenants = apprenants.filter(a =>
    `${a.nom} ${a.prenom}`.toLowerCase().includes(searchApprenants.toLowerCase())
  );

  const filteredFormateurs = formateurs.filter(f =>
    `${f.nom} ${f.prenom}`.toLowerCase().includes(searchFormateur.toLowerCase())
  );
  
  useEffect(() => {
    Promise.all([
      apprenantService.getAll(),
      formateurService.getAll(),
      groupeService.getById(id),
    ]).then(([aRes, fRes, gRes]) => {
      setApprenants(aRes.data);
      setFormateurs(fRes.data);
      const group = gRes.data.data || gRes.data;
      setGroupData(group);
      setNom(group.nom || '');
      setSelectedApprenants((group.apprenants || []).map(a => String(a.id)));
      setSelectedFormateur(String((group.formateurs || [])[0]?.id || ''));
      setLoading(false);
    }).catch(() => {
      setError('Erreur lors du chargement');
      setLoading(false);
    });
  }, [id]);
  
  const handleSubmit = async () => {
    if (!nom.trim()) {
      setError('Le nom est requis');
      return;
    }

    try {
      await groupeService.update(id, { nom, apprenants: selectedApprenants });

      const currentApprenants = (groupData?.apprenants || []).map(a => String(a.id));
      const toRemove = currentApprenants.filter(x => !selectedApprenants.includes(x));

      try {
        await Promise.all(
          toRemove.map(appId => apprenantService.update(appId, { groupe_id: null }))
        );
      } catch (err) {
        setError('Erreur lors de la suppression des apprenants');
        return;
      }

      try {
        await Promise.all(
          selectedApprenants.map(appId => apprenantService.update(appId, { groupe_id: Number(groupData.id) }))
        );
      } catch (err) {
        setError('Erreur lors de l\'assignation des apprenants');
        return;
      }

      const currentFormateurId = String((groupData?.formateurs?.[0]?.id) || '');
      if (currentFormateurId && currentFormateurId !== selectedFormateur) {
        try {
          await formateurService.update(currentFormateurId, { groupe_id: null });
        } catch (err) {
          setError('Erreur lors de la suppression du formateur');
          return;
        }
      }
      if (selectedFormateur) {
        try {
          await formateurService.update(selectedFormateur, { groupe_id: Number(groupData.id) });
        } catch (err) {
          setError('Erreur lors de l\'assignation du formateur');
          return;
        }
      }

      navigate('/groupes');
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Erreur lors de la modification du groupe';
      setError(errorMsg);
    }
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
            {filteredApprenants.map(apprenant => (
              <div key={apprenant.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <input
                  type="checkbox"
                  id={`apprenant-${apprenant.id}`}
                  checked={selectedApprenants.includes(String(apprenant.id))}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedApprenants([...selectedApprenants, String(apprenant.id)]);
                    } else {
                      setSelectedApprenants(selectedApprenants.filter(id => id !== String(apprenant.id)));
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
                <label htmlFor={`apprenant-${apprenant.id}`} style={{
                  fontSize: '0.72rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace"
                }}>
                  {apprenant.nom} {apprenant.prenom}
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
            {filteredFormateurs.map(formateur => (
              <div key={formateur.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                <input
                  type="radio"
                  id={`formateur-${formateur.id}`}
                  name="formateur"
                  value={String(formateur.id)}
                  checked={selectedFormateur === String(formateur.id)}
                  onChange={(e) => setSelectedFormateur(e.target.value)}
                  style={{
                    width: '14px',
                    height: '14px',
                    marginRight: 8,
                    accentColor: '#4fffb0',
                    cursor: 'pointer'
                  }}
                />
                <label htmlFor={`formateur-${formateur.id}`} style={{
                  fontSize: '0.72rem',
                  color: '#fff',
                  cursor: 'pointer',
                  fontFamily: "'DM Mono', monospace"
                }}>
                  {formateur.nom} {formateur.prenom}
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