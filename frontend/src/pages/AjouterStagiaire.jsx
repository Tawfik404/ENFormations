// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { stagiaireService } from '../services/stagiaireService';
// import { formationService  } from '../services/formationService';
 
// export default function AjouterStagiaire() {
//   const [form, setForm]           = useState({nom:'',prenom:'',division:'',ville:'',formation_id:''});
//   const [formations, setFormations] = useState([]);
//   const [error, setError]           = useState('');
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     formationService.getAll().then(r => setFormations(r.data.data));
//   }, []);
 
//   const handleSubmit = () => {
//     if (!form.nom || !form.prenom) { setError('Nom et Prénom sont requis'); return; }
//     stagiaireService.create(form)
//       .then(() => navigate('/stagiaires'))
//       .catch(() => setError('Erreur lors de la création'));
//   };
 
//   const inputStyle = {
//     width:'100%', padding:'10px 14px', borderRadius:5,
//     background:'#13171f', border:'1px solid #262d3d',
//     color:'#e8eaf0', fontSize:'0.72rem',
//     fontFamily:"'DM Mono',monospace", outline:'none'
//   };
//   const labelStyle = {
//     display:'block', fontSize:'0.65rem', color:'#6b7591',
//     textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:6
//   };
 
//   return (
//     <div style={{ maxWidth:520 }}>
//       <h1 style={{ fontFamily:"'DM Serif Display',serif",
//         fontSize:'1.8rem', fontWeight:400, marginBottom:4 }}>
//         Ajouter un Stagiaire
//       </h1>
//       <p style={{ fontSize:'0.68rem', color:'#4fffb0', fontStyle:'italic',
//         fontFamily:"'DM Serif Display',serif", marginBottom:24 }}>
//         Nouveau · Formulaire d'inscription
//       </p>
 
//       <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
//         borderRadius:8, padding:28, position:'relative', overflow:'hidden' }}>
//         <div style={{ position:'absolute',top:0,left:0,right:0,height:2,
//           background:'linear-gradient(90deg,#4fffb0,#74b9ff)' }} />
 
//         {error && (
//           <p style={{ color:'#ff6b6b', fontSize:'0.7rem', marginBottom:16 }}>
//             ⚠ {error}
//           </p>
//         )}
 
//         {['nom','prenom','division','ville'].map(k => (
//           <div key={k} style={{ marginBottom:16 }}>
//             <label style={labelStyle}>{k}</label>
//             <input value={form[k]}
//               onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
//               placeholder={`Entrez le ${k}`}
//               style={inputStyle} />
//           </div>
//         ))}
 
//         <div style={{ marginBottom:24 }}>
//           <label style={labelStyle}>Formation</label>
//           <select value={form.formation_id}
//             onChange={e=>setForm(p=>({...p,formation_id:e.target.value}))}
//             style={{ ...inputStyle }}>
//             <option value=''>-- Choisir une formation --</option>
//             {formations.map(f => (
//               <option key={f.id} value={f.id}>{f.titre}</option>
//             ))}
//           </select>
//         </div>
 
//         <div style={{ display:'flex', gap:10 }}>
//           <button onClick={handleSubmit}
//             style={{ flex:1, padding:11, borderRadius:5,
//               background:'#4fffb0', color:'#0c0f14', border:'none',
//               cursor:'pointer', fontFamily:"'DM Mono',monospace",
//               fontSize:'0.72rem', fontWeight:500 }}>
//             Enregistrer
//           </button>
//           <button onClick={()=>navigate('/stagiaires')}
//             style={{ padding:'11px 18px', borderRadius:5,
//               background:'transparent', border:'1px solid #262d3d',
//               color:'#6b7591', cursor:'pointer',
//               fontFamily:"'DM Mono',monospace" }}>
//             Annuler
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { stagiaireService } from '../services/stagiaireService';
import { formationService  } from '../services/formationService';
 
export default function AjouterStagiaire() {
  const [form, setForm] = useState({
    nom:'',
    prenom:'',
    division:'',
    ville:'',
    formation_id:'',
    sexe:'' // AJOUTÉ
  });
  const [formations, setFormations] = useState([]);
  const [error, setError]           = useState('');
  const navigate = useNavigate();
 
  useEffect(() => {
    formationService.getAll().then(r => setFormations(r.data.data));
  }, []);
 
  const handleSubmit = () => {
    if (!form.nom || !form.prenom) { setError('Nom et Prénom sont requis'); return; }
    if (!form.sexe) { setError('Veuillez sélectionner le sexe'); return; } // AJOUTÉ
    stagiaireService.create(form)
      .then(() => navigate('/stagiaires'))
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
        Ajouter un Stagiaire
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
 
        {['nom','prenom','division','ville','sexe'].map(k => (
          <div key={k} style={{ marginBottom:16 }}>
            <label style={labelStyle}>{k}</label>
            <input value={form[k]}
              onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}
              placeholder={`Entrez le ${k}`}
              style={inputStyle} />
          </div>
        ))}

        {/* SECTION AJOUTÉE - Sexe */}
        <div style={{ marginBottom:16 }}>
          <label style={labelStyle}>Sexe</label>
          <div style={{ display:'flex', gap:20, marginTop:8 }}>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', color:'#e8eaf0', fontSize:'0.72rem' }}>
              <input
                type="radio"
                name="sexe"
                value="feminin"
                checked={form.sexe === 'feminin'}
                onChange={e=>setForm(p=>({...p, sexe:e.target.value}))}
                style={{ accentColor:'#4fffb0', cursor:'pointer', width:16, height:16 }}
              />
              Féminin
            </label>
            <label style={{ display:'flex', alignItems:'center', gap:8, cursor:'pointer', color:'#e8eaf0', fontSize:'0.72rem' }}>
              <input
                type="radio"
                name="sexe"
                value="masculin"
                checked={form.sexe === 'masculin'}
                onChange={e=>setForm(p=>({...p, sexe:e.target.value}))}
                style={{ accentColor:'#4fffb0', cursor:'pointer', width:16, height:16 }}
              />
              Masculin
</label>
          </div>
        </div>
        {/* FIN SECTION AJOUTÉE */}
 
        <div style={{ marginBottom:24 }}>
          <label style={labelStyle}>Formation</label>
          <select value={form.formation_id}
            onChange={e=>setForm(p=>({...p,formation_id:e.target.value}))}
            style={{ ...inputStyle }}>
            <option value=''> Choisir une formation</option>
            <option value='php'>php</option>
            <option value='jav'>jav</option>
            <option value='js'>js</option>
            <option value='react'>react</option>
            <option value='css'>css</option>

            {formations.map(f => (
              <option key={f.id} value={f.id}>{f.titre}</option>
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
          <button onClick={()=>navigate('/stagiaires')}
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