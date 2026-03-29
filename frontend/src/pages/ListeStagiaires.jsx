import { useState, useEffect } from 'react';
import { stagiaireService } from '../services/stagiaireService';
import { useNavigate, useSearchParams } from 'react-router-dom';
 
export default function ListeStagiaires() {
  const [stagiaires, setStagiaires] = useState([]);
  const [search, setSearch]         = useState('');
  const [loading, setLoading]       = useState(true);
  const [editId, setEditId]         = useState(null);
  const [editData, setEditData]     = useState({});
  const navigate = useNavigate();
  const [params]  = useSearchParams();
 
  useEffect(() => {
    const q = params.get('q') || '';
    setSearch(q);
    const fn = q ? stagiaireService.search(q) : stagiaireService.getAll();
    fn.then(r => setStagiaires(r.data)).finally(() => setLoading(false));
  }, [params]);
 
  const handleSearch = () => {
    setLoading(true);
    const fn = search ? stagiaireService.search(search) : stagiaireService.getAll();
    fn.then(r => setStagiaires(r.data)).finally(() => setLoading(false));
  };
 
  const handleDelete = (id) => {
    if (!confirm('Supprimer ce stagiaire ?')) return;
    stagiaireService.delete(id).then(() =>
      setStagiaires(p => p.filter(s => s.id !== id)));
  };
 
  const handleSaveEdit = () => {
    stagiaireService.update(editId, editData).then(r => {
      setStagiaires(p => p.map(s => s.id === editId ? r.data : s));
      setEditId(null);
    });
  };
 
  if (loading) return <p style={{ color:'#6b7591' }}>Chargement...</p>;
 
  return (
    <div>
      <div style={{ display:'flex', justifyContent:'space-between',
        alignItems:'flex-end', marginBottom:20 }}>
        <div>
          <h1 style={{ fontFamily:"'DM Serif Display',serif",
            fontSize:'1.8rem', fontWeight:400 }}>Liste des Stagiaires</h1>
          <p style={{ fontSize:'0.68rem', color:'#6b7591', marginTop:3 }}>
            {stagiaires.length} stagiaire(s)
          </p>
        </div>
        <button onClick={() => navigate('/ajouter')}
          style={{ padding:'8px 14px', borderRadius:5, background:'#4fffb0',
            color:'#0c0f14', fontSize:'0.7rem', border:'none', cursor:'pointer',
            fontFamily:"'DM Mono',monospace", fontWeight:500 }}>
          + Ajouter
        </button>
      </div>
 
      {/* Search */}
      <div style={{ display:'flex', gap:8, marginBottom:16 }}>
        <input value={search} onChange={e=>setSearch(e.target.value)}
          onKeyDown={e=>e.key==='Enter'&&handleSearch()}
          placeholder='Nom, prénom, ville, formation...'
          style={{ flex:1, padding:'9px 14px', borderRadius:5,
            background:'#1a1f2b', border:'1px solid #262d3d',
            color:'#e8eaf0', fontSize:'0.72rem',
            fontFamily:"'DM Mono',monospace", outline:'none' }} />
        <button onClick={handleSearch}
          style={{ padding:'9px 16px', borderRadius:5, background:'#4fffb0',
            color:'#0c0f14', border:'none', cursor:'pointer',
            fontFamily:"'DM Mono',monospace", fontSize:'0.7rem' }}>
          🔍 Filtrer
        </button>
      </div>
 
      {/* Table */}
      <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
        borderRadius:8, overflow:'hidden' }}>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead><tr style={{ background:'#13171f' }}>
            {['Nom','Prénom','Formation','Division','Groupe','sexe','Actions'].map(h => (
              <th key={h} style={{ padding:'10px 16px', textAlign:'left',
                fontSize:'0.65rem', color:'#6b7591',
                textTransform:'uppercase', fontWeight:400 }}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {stagiaires.map(s => (
              <tr key={s.id} style={{ borderTop:'1px solid #262d3d' }}>
                <td style={{padding:'12px 16px',fontSize:'0.72rem',fontWeight:500,color:'#ffff'}}>
                  {s.nom}</td>
                <td style={{padding:'12px 16px',fontSize:'0.72rem',color:'#ffff'}}>
                  {s.prenom}</td>
                <td style={{padding:'12px 16px'}}>
                  <span style={{ fontSize:'0.65rem',padding:'2px 8px',
                    borderRadius:3,background:'rgba(79,255,176,0.1)',color:'#4fffb0'}}>
                    {s.formation?.titre || s.groupe?.formation?.titre || '-'}
                  </span>
                </td>
                <td style={{padding:'12px 16px',fontSize:'0.7rem',color:'#ffff'}}>
                  {s.division?.titre || s.division?.nom || s.division || '-'}</td>
                <td style={{padding:'12px 16px',fontSize:'0.7rem',color:'#ffff'}}>
                  {s.groupe?.nom || s.groupe || '-'}
                </td>
                  <td><span style={{padding:'4px 10px', borderRadius:4,fontSize:'0.7rem', background:(s.genre || s.sexe)==='F'||(s.genre || s.sexe)==='feminin'? '#ff6b9d20':'#4fffb020',color:(s.genre || s.sexe)==='F'||(s.genre || s.sexe)==='feminin'? '#ff6b9d':'#4fffb0',fontWeight:500}}>{(s.genre || s.sexe)==='F'||(s.genre || s.sexe)==='feminin' ? 'F' : 'M'}</span></td>
                <td style={{padding:'12px 16px'}}>
                  <div style={{ display:'flex', gap:6 }}>
                    <button onClick={()=>{setEditId(s.id);setEditData(s);}}
                      style={{ padding:'4px 9px', borderRadius:4,
                        background:'transparent', border:'1px solid #262d3d',
                        color:'#6b7591', fontSize:'0.65rem', cursor:'pointer',
                        fontFamily:"'DM Mono',monospace" }}>✏ Éditer</button>
                    <button onClick={()=>handleDelete(s.id)}
                      style={{ padding:'4px 9px', borderRadius:4,
                        background:'transparent',
                        border:'1px solid rgba(255,107,107,0.3)',
                        color:'#ff6b6b', fontSize:'0.65rem', cursor:'pointer',
                        fontFamily:"'DM Mono',monospace" }}>🗑 Suppr.</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
 
      {/* Edit Modal */}
      {editId && (
        <div style={{ position:'fixed', inset:0,
          background:'rgba(12,15,20,0.85)',
          display:'flex', alignItems:'center', justifyContent:'center',
          zIndex:100, backdropFilter:'blur(4px)' }}>
          <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
            borderRadius:8, padding:28, width:400 }}>
            <h3 style={{ fontFamily:"'DM Serif Display',serif",
              fontSize:'1.3rem', fontWeight:400, marginBottom:20 }}>
              Modifier le Stagiaire
            </h3>
            {['nom','prenom','division','groupe'].map(k => (
              <div key={k} style={{ marginBottom:12 }}>
                <label style={{ display:'block', fontSize:'0.65rem',
                  color:'#6b7591', textTransform:'uppercase',
                  letterSpacing:'0.08em', marginBottom:5 }}>{k}</label>
                <input value={editData[k]||''}
                  onChange={e=>setEditData(p=>({...p,[k]:e.target.value}))}
                  style={{ width:'100%', padding:'9px 12px', borderRadius:5,
                    background:'#13171f', border:'1px solid #262d3d',
                    color:'#e8eaf0', fontSize:'0.72rem',
                    fontFamily:"'DM Mono',monospace", outline:'none' }} />
              </div>
            ))}
            <div style={{ display:'flex', gap:8, marginTop:20 }}>
              <button onClick={handleSaveEdit}
                style={{ flex:1, padding:'10px', borderRadius:5,
                  background:'#4fffb0', color:'#0c0f14', border:'none',
                  cursor:'pointer', fontFamily:"'DM Mono',monospace",
                  fontSize:'0.72rem', fontWeight:500 }}>
                Sauvegarder
              </button>
              <button onClick={()=>setEditId(null)}
                style={{ padding:'10px 16px', borderRadius:5,
                  background:'transparent', border:'1px solid #262d3d',
                  color:'#6b7591', cursor:'pointer',
                  fontFamily:"'DM Mono',monospace" }}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}