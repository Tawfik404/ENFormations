import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apprenantService } from '../services/apprenantService';
import { formationService } from '../services/formationService';
import { divisionService } from '../services/divisionService';
import { groupeService } from '../services/groupeService';
 
export default function AjouterApprenant() {
  const [form, setForm] = useState({
    nom:'',
    prenom:'',
    division_id:'',
    formation_id:'',
    groupe_id:'',
    sexe:''
  });
  const [formations, setFormations] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [groupes, setGroupes] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    // Fetch formations
    formationService.getAll()
      .then(r => {
        if (r && r.data && Array.isArray(r.data)) {
          setFormations(r.data);
        } else {
          console.error('Unexpected API response structure for formations:', r);
          setFormations([]);
        }
      })
      .catch(err => {
        console.error('Error fetching formations:', err);
        setFormations([]);
      });

    // Fetch divisions
    divisionService.getAll()
      .then(r => {
        if (r && r.data && Array.isArray(r.data)) {
          setDivisions(r.data);
        } else {
          console.error('Unexpected API response structure for divisions:', r);
          setDivisions([]);
        }
      })
      .catch(err => {
        console.error('Error fetching divisions:', err);
        setDivisions([]);
      });

    // Fetch groupes
    groupeService.getAll()
      .then(r => {
        if (r && r.data && Array.isArray(r.data)) {
          setGroupes(r.data);
        } else {
          console.error('Unexpected API response structure for groupes:', r);
          setGroupes([]);
        }
      })
      .catch(err => {
        console.error('Error fetching groupes:', err);
        setGroupes([]);
      });
  }, []);
 
  const handleSubmit = () => {
    if (!form.nom || !form.prenom) { setError('Nom et Prénom sont requis'); return; }
    if (!form.sexe) { setError('Veuillez sélectionner le sexe'); return; }

    // Verify payload before sending
    console.log('Apprenant payload:', form);

    apprenantService.create(form)
      .then(() => navigate('/apprenants'))
      .catch(() => setError('Erreur lors de la création'));
  };
 
  const inputStyle = {
    width:'100%', padding:'10px 14px', borderRadius:5,
    background:'#13171f', border:'1px solid #262d3d',
    color:'#e8eaf0', fontSize:'0.72rem',
    fontFamily:"'DM Mono',monospace", outline:'none'
  };
  const labelStyle = {
    display:'block', fontSize:'0.65rem', color:'#6b7591',
    textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6
  };
 
  return (
    <div style={{ maxWidth:520 }}>
      <h1 style={{ fontFamily:"'DM Serif Display',serif",
        fontSize:'1.8rem', fontWeight:400, marginBottom:4 }}>
        Ajouter un Apprenant
      </h1>
      <p style={{ fontSize:'0.68rem', color:'#4fffb0', fontStyle:'italic',
        fontFamily:"'DM Serif Display',serif", marginBottom:24 }}>
        Nouveau · Formulaire d'inscription
      </p>
 
      <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
        borderRadius:8, padding:28, position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
          background:'linear-gradient(90deg,#4fffb0,#74b9ff)' }} />
 
        {error && (
          <p style={{ color:'#ff6b6b', fontSize:'0.7rem', marginBottom:16 }}>
            ⚠️ {error}
          </p>
        )}

        {['nom','prenom'].map(k => (
          <div key={k} style={{ marginBottom:16 }}>
            <label style={labelStyle}>{k}</label>
            <input value={form[k]}
              onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
              placeholder={`Entrez le ${k}`}
              style={inputStyle} />
          </div>
        ))}

        {/* Sexe Radio Buttons */}
        <div style={{ marginBottom:16 }}>
          <label style={labelStyle}>Sexe</label>
          <div style={{ display:'flex', gap:20, marginTop:8 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', color:'#e8eaf0', fontSize:'0.72rem' }}>
              <input
                type="radio"
                name="sexe"
                value="F"
                checked={form.sexe === 'F'}
                onChange={e=>setForm(p=>({...p, sexe:e.target.value}))}
                style={{ accentColor:'#4fffb0', cursor:'pointer', width:16, height:16 }}
              />
              Féminin
            </label>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', color:'#e8eaf0', fontSize:'0.72rem' }}>
              <input
                type="radio"
                name="sexe"
                value="M"
                checked={form.sexe === 'M'}
                onChange={e=>setForm(p=>({...p, sexe:e.target.value}))}
                style={{ accentColor:'#4fffb0', cursor:'pointer', width:16, height:16 }}
              />
              Masculin
</label>
          </div>
        </div>

        {/* Division Dropdown */}
        <div style={{ marginBottom:16 }}>
          <label style={labelStyle}>Division</label>
          <select value={form.division_id}
            onChange={e=>setForm(p=>({...p, division_id: e.target.value}))}
            style={inputStyle}>
            <option value=''>Choisir une division</option>
            {Array.isArray(divisions) && divisions.map(d => (
              <option key={d.id} value={d.id}>{d.titre}</option>
            ))}
          </select>
        </div>

        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Formation</label>
          <select value={form.formation_id}
            onChange={e=>setForm(p=>({...p,formation_id:e.target.value}))}
            style={inputStyle}>
            <option value=''>Choisir une formation</option>
            {Array.isArray(formations) && formations.map(f => (
              <option key={f.id} value={f.id}>{f.titre}</option>
            ))}
          </select>
        </div>

        {/* Groupe Dropdown */}
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Groupe</label>
          <select value={form.groupe_id}
            onChange={e=>setForm(p=>({...p,groupe_id:e.target.value}))}
            style={inputStyle}>
            <option value=''>Choisir un groupe</option>
            {Array.isArray(groupes) && groupes.map(g => (
              <option key={g.id} value={g.id}>{g.nom}</option>
            ))}
          </select>
        </div>
 
        <div style={{ display:'flex', gap:10 }}>
          <button onClick={handleSubmit}
            style={{ flex:1, padding:11, borderRadius:5,
              background:'#4fffb0', color:'#0c0f14', border:'none',
              cursor:'pointer', fontFamily:"'DM Mono',monospace",
              fontSize:'0.72rem', fontWeight:500 }}>
            Enregistrer
          </button>
          <button onClick={()=>navigate('/apprenants')}
            style={{ padding:'11px 18px', borderRadius:5,
              background:'transparent', border:'1px solid #262d3d',
              color:'#6b7591', cursor:'pointer',
              fontFamily:"'DM Mono',monospace" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}