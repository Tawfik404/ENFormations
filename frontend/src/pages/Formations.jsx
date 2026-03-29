import { useEffect, useState } from 'react';
import { formationService } from '../services/formationService';
import { groupeService } from '../services/groupeService';
import { villeService } from '../services/villeService';
import { moduleService } from '../services/moduleService';
 
const COLORS = ['#4fffb0','#ff6b6b','#74b9ff','#ffd166','#a29bfe','#fd79a8'];
 
export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading]       = useState(true);
  const [selectedFormation, setSelectedFormation] = useState(null);
  const [fetchedFormation, setFetchedFormation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(false);
  const [groupes, setGroupes] = useState([]);
  const [villes, setVilles] = useState([]);
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    titre: '',
    dateDebut: '',
    dateFin: '',
    ville_id: '',
    groupe_id: '',
    salle_id: '',
    module_id: '',
  });
  const [addFormData, setAddFormData] = useState({
    titre: '',
    dateDebut: '',
    dateFin: '',
    ville_id: '',
    groupe_id: '',
    salle_batiment: '',
    salle_etage: '',
    salle_nombre: '',
    module_id: '',
  });
  const [updateStatus, setUpdateStatus] = useState(null); // 'success' | 'error'
  const [updateMessage, setUpdateMessage] = useState('');
  const [addError, setAddError] = useState('');
 
  useEffect(() => {
    formationService.getAll()
      .then(r => setFormations(r.data))
      .finally(() => setLoading(false));

    groupeService.getAll()
      .then(r => {setGroupes(r.data); console.log(r.data)})
      .catch(err => console.error('Failed to fetch groupes:', err));

    villeService.getAll()
      .then(r => setVilles(r.data))
      .catch(err => console.error('Failed to fetch villes:', err));

    moduleService.getAll()
      .then(r => setModules(r.data))
      .catch(err => console.error('Failed to fetch modules:', err));
  }, []);

  const openDetailsModal = (formation) => {
    setSelectedFormation(formation);
    setShowModal(true);
    setIsEditing(false);
    setFetchLoading(true);
    
    formationService.getById(formation.id)
      .then(r => {
        setFetchedFormation(r.data);
        console.log(r.data);
        setFormData({
          titre: r.data.titre || '',
          dateDebut: ((r.data.dateDebut || r.data.date_debut || '') + '').split('T')[0] || '',
          dateFin: ((r.data.dateFin || r.data.date_fin || '') + '').split('T')[0] || '',
          ville_id: r.data.ville_id || '',
          groupe_id: r.data.groupe_id || '',
          salle_id: r.data.salle_id || '',
          salle_batiment: r.data.salle_batiment || '',
          salle_etage: r.data.salle_etage || '',
          salle_nombre: r.data.salle_nombre || '',
          module_id: r.data.module_id || '',
        });
        setUpdateStatus(null);
        setUpdateMessage('');
      })
      .catch(err => console.error('Failed to fetch formation details:', err))
      .finally(() => setFetchLoading(false));
  };

  const closeDetailsModal = () => {
    setShowModal(false);
    setSelectedFormation(null);
    setFetchedFormation(null);
    setIsEditing(false);
    setFormData({ titre: '', dateDebut: '', dateFin: '', ville_id: '', groupe_id: '', salle_id: '', salle_batiment: '', salle_etage: '', salle_nombre: '', module_id: '' });
    setUpdateStatus(null);
    setUpdateMessage('');
  };

  const openAddModal = () => {
    setShowAddModal(true);
    setAddError('');
    setAddFormData({
      titre: '',
      dateDebut: '',
      dateFin: '',
      ville_id: '',
      groupe_id: '',
      salle_batiment: '',
      salle_etage: '',
      salle_nombre: '',
      module_id: '',
    });
  };

  const closeAddModal = () => {
    setShowAddModal(false);
    setAddError('');
    setAddFormData({
      titre: '',
      dateDebut: '',
      dateFin: '',
      ville_id: '',
      groupe_id: '',
      salle_batiment: '',
      salle_etage: '',
      salle_nombre: '',
      module_id: '',
    });
  };

  const handleAddFormation = () => {
    setAddError('');
    
    if (!addFormData.titre) {
      setAddError('Le titre est requis');
      return;
    }

    formationService.create({
      titre: addFormData.titre,
      dateDebut: addFormData.dateDebut,
      dateFin: addFormData.dateFin,
      ville_id: addFormData.ville_id || undefined,
      groupe_id: addFormData.groupe_id || undefined,
      module_id: addFormData.module_id || undefined,
      salle_batiment: addFormData.salle_batiment || undefined,
      salle_etage: addFormData.salle_etage || undefined,
      salle_nombre: addFormData.salle_nombre || undefined,
    })
      .then(r => {
        setFormations([...formations, r.data]);
        closeAddModal();
      })
      .catch((err) => {
        console.error('Failed to create formation:', err);
        setAddError(err?.response?.data?.message || 'Erreur lors de la création.');
      });
  };
 
  if (loading) return <p style={{ color:'#6b7591' }}>Chargement...</p>;
 
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif",
            fontSize:'1.8rem', fontWeight:400, marginBottom:4 }}>Formations</h1>
          <p style={{ fontSize:'0.68rem', color:'#6b7591', fontStyle:'italic',
            fontFamily:"'DM Serif Display',serif", marginBottom:0 }}>
            {formations.length} modules disponibles
          </p>
        </div>
        <button
          onClick={openAddModal}
          style={{
            backgroundColor: '#4fffb0',
            border: 'none',
            borderRadius: 4,
            padding: '8px 16px',
            color: '#000',
            fontSize: '0.75rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.3s ease',
          }}
          onMouseOver={(e) => e.target.style.opacity = '0.8'}
          onMouseOut={(e) => e.target.style.opacity = '1'}
        >
          + Ajouter Formation
        </button>
      </div>
 
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {formations.map((f,i) => {
          const color = COLORS[i % COLORS.length];
          return (
            <div key={f.id} style={{ background:'#1a1f2b',
              border:'1px solid #262d3d', borderRadius:8,
              padding:'18px 20px', display:'grid',
              gridTemplateColumns:'auto 1fr 1fr 1fr 1fr auto',
              alignItems:'center', gap:20, position:'relative',
              overflow:'hidden' }}>
 
              {/* Left color stripe */}
              <div style={{ position:'absolute',top:0,left:0,
                bottom:0,width:3,background:color }} />
 
              {/* ID */}
              <div style={{ background:'#13171f', border:'1px solid #262d3d',
                borderRadius:4, padding:'3px 8px', fontSize:'0.62rem',
                color:'#6b7591', marginLeft:8 }}>F{String(f.id).padStart(3,'0')}</div>
 
              {/* Name */}
              <div>
                <div style={{ fontSize:'0.75rem', fontWeight:500,
                  color, marginBottom:2 }}>{f.titre}</div>
                <div style={{ fontSize:'0.65rem', color:'#6b7591' }}>
                  {f.ville?.nom || f.ville || '-'}
                  {f.groupe?.nom ? ` · ${f.groupe.nom}` : ''}
                  {f.salle?.nom ? ` · ${f.salle.nom}` : ''}
                  {f.module?.nom ? ` · ${f.module.nom}` : ''}
                </div>
              </div>

              {/* Date début */}
              <div>
                <div style={{ fontSize:'0.62rem', color:'#6b7591',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                  Début</div>
                <div style={{ fontSize:'0.7rem',color:'#ffff' }}>
                  {((f.date_debut || f.dateDebut || '') + '').split('T')[0] || '-'}
                </div>
              </div>
 
              {/* Date fin */}
              <div>
                <div style={{ fontSize:'0.62rem', color:'#6b7591',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                  Fin</div>
                <div style={{ fontSize:'0.7rem',color:'#ffff' }}>
                  {((f.date_fin || f.dateFin || '') + '').split('T')[0] || '-'}
                </div>
              </div>

              {/* Détails Button */}
              <button
                onClick={() => openDetailsModal(f)}
                style={{
                  backgroundColor: color,
                  border: 'none',
                  borderRadius: 4,
                  padding: '6px 12px',
                  color: '#000',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                }}
                onMouseOver={(e) => e.target.style.opacity = '0.8'}
                onMouseOut={(e) => e.target.style.opacity = '1'}
              >
                Détails
              </button>
            </div>
          );
        })}
      </div>

      {/* Details Modal */}
      {showModal && selectedFormation && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#1a1f2b',
            border: '1px solid #262d3d',
            borderRadius: 12,
            padding: 30,
            maxWidth: 560,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          }}>
            <h2 style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: '1.5rem',
              color: '#fff',
              marginBottom: 20,
            }}>
              Détails Formation
            </h2>

            {!isEditing ? (
              <>
                {fetchLoading ? (
                  <p style={{ color: '#6b7591' }}>Chargement des détails...</p>
                ) : fetchedFormation ? (
                  <>
                    <div style={{ marginBottom: 10, color: '#6b7591' }}><strong>ID:</strong> F{String(fetchedFormation.id).padStart(3,'0')}</div>
                    <div style={{ marginBottom: 10, color: '#fff' }}><strong>Titre:</strong> {fetchedFormation.titre}</div>
                    <div style={{ marginBottom: 10, color: '#fff' }}><strong>Ville:</strong> {fetchedFormation.ville_nom || '-'}</div>
                    <div style={{ marginBottom: 10, color: '#fff' }}><strong>Groupe:</strong> {fetchedFormation.groupe_nom || '-'}</div>
                    <div style={{ marginBottom: 10, color: '#fff' }}><strong>Salle:</strong> {fetchedFormation.salle_batiment && fetchedFormation.salle_etage !== undefined && fetchedFormation.salle_nombre ? `${fetchedFormation.salle_batiment} - Étage ${fetchedFormation.salle_etage} - Salle ${fetchedFormation.salle_nombre}` : '-'}</div>
                    <div style={{ marginBottom: 10, color: '#fff' }}><strong>Module:</strong> {fetchedFormation.module_titre || '-'}</div>
                    <div style={{ marginBottom: 10, color: '#fff' }}><strong>Début:</strong> {((fetchedFormation.dateDebut || '') + '').split('T')[0] || '-'}</div>
                    <div style={{ marginBottom: 20, color: '#fff' }}><strong>Fin:</strong> {((fetchedFormation.dateFin || '') + '').split('T')[0] || '-'}</div>

                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                      <button
                        onClick={() => setIsEditing(true)}
                        style={{
                          backgroundColor: '#ffd166',
                          border: 'none',
                          borderRadius: 4,
                          padding: '8px 16px',
                          color: '#000',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Modifier
                      </button>
                      <button
                        onClick={closeDetailsModal}
                        style={{
                          backgroundColor: '#262d3d',
                          border: '1px solid #262d3d',
                          borderRadius: 4,
                          padding: '8px 16px',
                          color: '#fff',
                          fontSize: '0.75rem',
                          fontWeight: 600,
                          cursor: 'pointer',
                        }}
                      >
                        Fermer
                      </button>
                    </div>
                  </>
                ) : null}
              </>
            ) : (
              <>
                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Titre</label>
                  <input
                    type="text"
                    value={formData.titre}
                    onChange={(e) => setFormData({ ...formData, titre: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#13171f',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Date Début</label>
                  <input
                    type="date"
                    value={formData.dateDebut}
                    onChange={(e) => setFormData({ ...formData, dateDebut: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#13171f',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Date Fin</label>
                  <input
                    type="date"
                    value={formData.dateFin}
                    onChange={(e) => setFormData({ ...formData, dateFin: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#13171f',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                    }}
                  />
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Ville</label>
                  <select
                    value={formData.ville_id}
                    onChange={(e) => setFormData({ ...formData, ville_id: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#13171f',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Sélectionner une ville</option>
                    {villes.map(v => (
                      <option key={v.id} value={v.id}>{v.nom}</option>
                    ))}
                  </select>
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Groupe</label>
                  <select
                    value={formData.groupe_id}
                    onChange={(e) => setFormData({ ...formData, groupe_id: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#13171f',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Sélectionner un groupe</option>
                    {groupes.map(g => (
                      <option key={g.id} value={g.id}>{g.nom}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Batiment</label>
                    <input
                      type="text"
                      value={formData.salle_batiment}
                      onChange={(e) => setFormData({ ...formData, salle_batiment: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#13171f',
                        border: '1px solid #262d3d',
                        borderRadius: 4,
                        color: '#fff',
                        fontSize: '0.75rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Étage</label>
                    <input
                      type="number"
                      value={formData.salle_etage}
                      onChange={(e) => setFormData({ ...formData, salle_etage: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#13171f',
                        border: '1px solid #262d3d',
                        borderRadius: 4,
                        color: '#fff',
                        fontSize: '0.75rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                  <div style={{ flex: 1 }}>
                    <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Numéro</label>
                    <input
                      type="number"
                      value={formData.salle_nombre}
                      onChange={(e) => setFormData({ ...formData, salle_nombre: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        background: '#13171f',
                        border: '1px solid #262d3d',
                        borderRadius: 4,
                        color: '#fff',
                        fontSize: '0.75rem',
                        boxSizing: 'border-box',
                      }}
                    />
                  </div>
                </div>

                <div style={{ marginBottom: 15 }}>
                  <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Module</label>
                  <select
                    value={formData.module_id}
                    onChange={(e) => setFormData({ ...formData, module_id: Number(e.target.value) })}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      background: '#13171f',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      color: '#fff',
                      fontSize: '0.75rem',
                      boxSizing: 'border-box',
                      appearance: 'none',
                    }}
                  >
                    <option value="">Sélectionner un module</option>
                    {modules.map(m => (
                      <option key={m.id} value={m.id}>{m.titre}</option>
                    ))}
                  </select>
                </div>

                <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{
                      backgroundColor: '#262d3d',
                      border: '1px solid #262d3d',
                      borderRadius: 4,
                      padding: '8px 16px',
                      color: '#fff',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Annuler
                  </button>
                  <button
                    onClick={() => {
                      setUpdateStatus(null);
                      setUpdateMessage('');
                      formationService.update(selectedFormation.id, {
                        titre: formData.titre,
                        dateDebut: formData.dateDebut,
                        dateFin: formData.dateFin,
                        ville_id: formData.ville_id,
                        groupe_id: formData.groupe_id,
                        salle_id: formData.salle_id,
                        module_id: formData.module_id,
                      })
                        .then(() => {
                          setFormations(formations.map(f => f.id === selectedFormation.id ? { ...f, titre: formData.titre, dateDebut: formData.dateDebut, dateFin: formData.dateFin, ville_id: formData.ville_id, groupe_id: formData.groupe_id, salle_id: formData.salle_id, module_id: formData.module_id } : f));
                          setUpdateStatus('success');
                          setUpdateMessage('Formation mise à jour avec succès.');
                          setIsEditing(false);
                          setFetchedFormation(prev => prev ? { ...prev, ...{
                            titre: formData.titre,
                            dateDebut: formData.dateDebut,
                            dateFin: formData.dateFin,
                            ville_id: formData.ville_id,
                            groupe_id: formData.groupe_id,
                            salle_id: formData.salle_id,
                            module_id: formData.module_id,
                          } } : prev);
                        })
                        .catch((err) => {
                          console.error('Failed to update formation:', err);
                          setUpdateStatus('error');
                          setUpdateMessage(err?.response?.data?.message || 'Erreur lors de la mise à jour.');
                        });
                    }}
                    style={{
                      backgroundColor: '#4fffb0',
                      border: 'none',
                      borderRadius: 4,
                      padding: '8px 16px',
                      color: '#000',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                    }}
                  >
                    Enregistrer
                  </button>
                </div>
                {updateStatus && (
                  <p style={{
                    marginTop: 12,
                    color: updateStatus === 'success' ? '#4fffb0' : '#ff6b6b',
                    fontWeight: 600,
                  }}>
                    {updateMessage}
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}

      {/* Add Formation Modal */}
      {showAddModal && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.7)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000,
        }}>
          <div style={{
            background: '#1a1f2b',
            border: '1px solid #262d3d',
            borderRadius: 12,
            padding: 30,
            maxWidth: 560,
            width: '90%',
            maxHeight: '80vh',
            overflowY: 'auto',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.5)',
          }}>
            <h2 style={{
              fontFamily: "'DM Serif Display',serif",
              fontSize: '1.5rem',
              color: '#fff',
              marginBottom: 20,
            }}>
              Ajouter une Formation
            </h2>

            {addError && (
              <p style={{
                color: '#ff6b6b',
                fontSize: '0.75rem',
                marginBottom: 15,
                backgroundColor: 'rgba(255,107,107,0.1)',
                padding: '10px',
                borderRadius: 4,
              }}>
                ⚠️ {addError}
              </p>
            )}

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Titre</label>
              <input
                type="text"
                value={addFormData.titre}
                onChange={(e) => setAddFormData({ ...addFormData, titre: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#13171f',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Date Début</label>
              <input
                type="date"
                value={addFormData.dateDebut}
                onChange={(e) => setAddFormData({ ...addFormData, dateDebut: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#13171f',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Date Fin</label>
              <input
                type="date"
                value={addFormData.dateFin}
                onChange={(e) => setAddFormData({ ...addFormData, dateFin: e.target.value })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#13171f',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: '0.75rem',
                  boxSizing: 'border-box',
                }}
              />
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Ville</label>
              <select
                value={addFormData.ville_id}
                onChange={(e) => setAddFormData({ ...addFormData, ville_id: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#13171f',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: '0.75rem',
                  boxSizing: 'border-box',
                  appearance: 'none',
                }}
              >
                <option value="">Sélectionner une ville</option>
                {villes.map(v => (
                  <option key={v.id} value={v.id}>{v.nom}</option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Groupe</label>
              <select
                value={addFormData.groupe_id}
                onChange={(e) => setAddFormData({ ...addFormData, groupe_id: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#13171f',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: '0.75rem',
                  boxSizing: 'border-box',
                  appearance: 'none',
                }}
              >
                <option value="">Sélectionner un groupe</option>
                {groupes.map(g => (
                  <option key={g.id} value={g.id}>{g.nom}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 8, marginBottom: 15 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Batiment</label>
                <input
                  type="text"
                  value={addFormData.salle_batiment}
                  onChange={(e) => setAddFormData({ ...addFormData, salle_batiment: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#13171f',
                    border: '1px solid #262d3d',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: '0.75rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Étage</label>
                <input
                  type="number"
                  value={addFormData.salle_etage}
                  onChange={(e) => setAddFormData({ ...addFormData, salle_etage: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#13171f',
                    border: '1px solid #262d3d',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: '0.75rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Numéro</label>
                <input
                  type="number"
                  value={addFormData.salle_nombre}
                  onChange={(e) => setAddFormData({ ...addFormData, salle_nombre: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#13171f',
                    border: '1px solid #262d3d',
                    borderRadius: 4,
                    color: '#fff',
                    fontSize: '0.75rem',
                    boxSizing: 'border-box',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: 15 }}>
              <label style={{ fontSize: '0.75rem', color: '#6b7591', display: 'block', marginBottom: 5 }}>Module</label>
              <select
                value={addFormData.module_id}
                onChange={(e) => setAddFormData({ ...addFormData, module_id: Number(e.target.value) })}
                style={{
                  width: '100%',
                  padding: '8px 12px',
                  background: '#13171f',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  color: '#fff',
                  fontSize: '0.75rem',
                  boxSizing: 'border-box',
                  appearance: 'none',
                }}
              >
                <option value="">Sélectionner un module</option>
                {modules.map(m => (
                  <option key={m.id} value={m.id}>{m.titre}</option>
                ))}
              </select>
            </div>

            <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
              <button
                onClick={closeAddModal}
                style={{
                  backgroundColor: '#262d3d',
                  border: '1px solid #262d3d',
                  borderRadius: 4,
                  padding: '8px 16px',
                  color: '#fff',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Annuler
              </button>
              <button
                onClick={handleAddFormation}
                style={{
                  backgroundColor: '#4fffb0',
                  border: 'none',
                  borderRadius: 4,
                  padding: '8px 16px',
                  color: '#000',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                }}
              >
                Ajouter
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}