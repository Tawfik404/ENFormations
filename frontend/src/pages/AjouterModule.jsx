// import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { moduleService } from '../services/moduleService';

// export default function AjouterModule() {
//   const [titre, setTitre] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
  
//   const handleSubmit = () => {
//     if (!titre.trim()) {
//       setError('Le titre est requis');
//       return;
//     }
    
//     moduleService.create({ titre })
//       .then(() => navigate('/modules'))
//       .catch(() => setError('Erreur lors de la création'));
//   };
  
//   return (
//     <div>
//       <h1>Ajouter un Module</h1>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
      
//       <div>
//         <label>Titre du module</label>
//         <input
//           value={titre}
//           onChange={e => setTitre(e.target.value)}
//           placeholder="Ex: Développement Web"
//         />
//       </div>
      
//       <button onClick={handleSubmit}>Enregistrer</button>
//       <button onClick={() => navigate('/modules')}>Annuler</button>
//     </div>
//   );
// }


import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { moduleService } from '../services/moduleService';

export default function AjouterModule() {
  const [titre, setTitre] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleSubmit = () => {
    if (!titre.trim()) {
      setError('Le titre est requis');
      return;
    }
    
    moduleService.create({ titre })
      .then(() => navigate('/modules'))
      .catch(() => setError('Erreur lors de la création'));
  };
  
  return (
    <div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.4rem',
        fontWeight:400, marginBottom:4 }}>Ajouter un Module</h1>
      <p style={{ fontSize:'0.72rem', color:'#4fffb0', fontStyle:'italic',
        fontFamily:"'DM Serif Display',serif", marginBottom:28 }}>
        Nouveau module de formation
      </p>

      {error && <p style={{ color: '#ff6b6b', fontSize:'0.72rem', marginBottom:16 }}>{error}</p>}
      
      <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
        borderRadius:8, padding:24, maxWidth:500 }}>
        
        <div style={{ marginBottom:20 }}>
          <label style={{ display:'block', fontSize:'0.7rem', color:'#6b7591',
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>
            Titre du module
          </label>
          <input
            value={titre}
            onChange={e => setTitre(e.target.value)}
            placeholder="Ex: Développement Web"
            style={{ width:'100%', padding:'10px 14px', fontSize:'0.72rem',
              background:'#13171f', border:'1px solid #262d3d', borderRadius:6,
              color:'#fff', fontFamily:"'DM Mono',monospace" }}
          />
        </div>
        
        <div style={{ display:'flex', gap:12 }}>
          <button onClick={handleSubmit}
            style={{ flex:1, fontSize:'0.72rem', color:'#1a1f2b', background:'#4fffb0',
              border:'none', padding:'10px 20px', borderRadius:6, cursor:'pointer',
              fontFamily:"'DM Mono',monospace", fontWeight:500 }}>
            Enregistrer
          </button>
          <button onClick={() => navigate('/modules')}
            style={{ fontSize:'0.72rem', color:'#6b7591', background:'transparent',
              border:'1px solid #262d3d', padding:'10px 20px', borderRadius:6,
              cursor:'pointer', fontFamily:"'DM Mono',monospace" }}>
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}