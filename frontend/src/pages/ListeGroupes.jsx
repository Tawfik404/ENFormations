import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { groupeService } from '../services/groupeService';

export default function ListeGroupes() {
  const [groupes, setGroupes] = useState([]);
  const navigate = useNavigate();
  
  useEffect(() => {
    loadGroupes();
  }, []);
  
  const loadGroupes = () => {
    groupeService.getAll()
      .then(r => setGroupes(r.data.data))
      .catch(e => console.error(e));
  };
  
  const handleDelete = (id) => {
    if (confirm('Supprimer ce groupe ?')) {
      groupeService.delete(id)
        .then(() => loadGroupes())
        .catch(e => console.error(e));
    }
  };
  
  return (
    <div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.4rem',
        fontWeight:400, marginBottom:4 }}>Liste des Groupes</h1>
      <p style={{ fontSize:'0.72rem', color:'#4fffb0', fontStyle:'italic',
        fontFamily:"'DM Serif Display',serif", marginBottom:28 }}>
        Gestion des groupes
      </p>

      {/* Bouton Ajouter */}
      <div style={{ marginBottom:24 }}>
        <button onClick={() => navigate('/ajouter-groupe')}
          style={{ fontSize:'0.72rem', color:'#1a1f2b', background:'#4fffb0',
            border:'none', padding:'10px 20px', borderRadius:6, cursor:'pointer',
            fontFamily:"'DM Mono',monospace", fontWeight:500 }}>
          + Ajouter Groupe
        </button>
      </div>
      
      {/* Table */}
      <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
        borderRadius:8, overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid #262d3d' }}>
          <span style={{ fontSize:'0.7rem', color:'#6b7591',
            textTransform:'uppercase', letterSpacing:'0.08em' }}>
            Tous les groupes
          </span>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#13171f' }}>
              <th style={{ padding:'9px 16px', textAlign:'left',
                fontSize:'0.65rem', color:'#6b7591',
                textTransform:'uppercase', fontWeight:400 }}>ID</th>
              <th style={{ padding:'9px 16px', textAlign:'left',
                fontSize:'0.65rem', color:'#6b7591',
                textTransform:'uppercase', fontWeight:400 }}>Nom</th>
              <th style={{ padding:'9px 16px', textAlign:'left',
                fontSize:'0.65rem', color:'#6b7591',
                textTransform:'uppercase', fontWeight:400 }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {groupes.map(g => (
              <tr key={g.id} style={{ borderTop:'1px solid #262d3d' }}>
                <td style={{ padding:'11px 16px', fontSize:'0.72rem',
                  color:'#6b7591', fontWeight:500 }}>{g.id}</td>
                <td style={{ padding:'11px 16px', fontSize:'0.72rem',
                  color:'#fff', fontWeight:500 }}>{g.nom}</td>
                <td style={{ padding:'11px 16px', display:'flex', gap:8 }}>
                  <button onClick={() => navigate(`/modifier-groupe/${g.id}`)}
                    style={{ fontSize:'0.68rem', color:'#4fffb0',
                      background:'rgba(79,255,176,0.1)', border:'1px solid rgba(79,255,176,0.2)',
                      padding:'5px 12px', borderRadius:4, cursor:'pointer',
                      fontFamily:"'DM Mono',monospace" }}>
                    Modifier
                  </button>
                  <button onClick={() => handleDelete(g.id)}
                    style={{ fontSize:'0.68rem', color:'#ff6b6b',
                      background:'rgba(255,107,107,0.1)', border:'1px solid rgba(255,107,107,0.2)',
                      padding:'5px 12px', borderRadius:4, cursor:'pointer',
                      fontFamily:"'DM Mono',monospace" }}>
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