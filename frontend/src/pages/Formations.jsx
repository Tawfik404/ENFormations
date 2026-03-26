import { useEffect, useState } from 'react';
import { formationService } from '../services/formationService';
 
const COLORS = ['#4fffb0','#ff6b6b','#74b9ff','#ffd166','#a29bfe','#fd79a8'];
 
export default function Formations() {
  const [formations, setFormations] = useState([]);
  const [loading, setLoading]       = useState(true);
 
  useEffect(() => {
    formationService.getAll()
      .then(r => setFormations(r.data.data))
      .finally(() => setLoading(false));
  }, []);
 
  if (loading) return <p style={{ color:'#6b7591' }}>Chargement...</p>;
 
  return (
    <div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif",
        fontSize:'1.8rem', fontWeight:400, marginBottom:4 }}>Formations</h1>
      <p style={{ fontSize:'0.68rem', color:'#6b7591', fontStyle:'italic',
        fontFamily:"'DM Serif Display',serif", marginBottom:24 }}>
        {formations.length} modules disponibles
      </p>
 
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
                <div style={{ fontSize:'0.65rem', color:'#6b7591' }}>{f.ville}</div>
              </div>

              {/* Date début */}
              <div>
                <div style={{ fontSize:'0.62rem', color:'#6b7591',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                  Début</div>
                <div style={{ fontSize:'0.7rem',color:'#ffff' }}>{f.date_debut.split('T')[0]}</div>
              </div>
 
              {/* Date fin */}
              <div>
                <div style={{ fontSize:'0.62rem', color:'#6b7591',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                  Fin</div>
                <div style={{ fontSize:'0.7rem',color:'#ffff' }}>{f.date_fin.split('T')[0]}</div>
              </div>
 
              {/* Stagiaires */}
              <div>
                <div style={{ fontSize:'0.62rem', color:'#6b7591',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:2 }}>
                  Inscrits</div>
                <div style={{ fontSize:'0.7rem', color }}>
                  {f.stagiaires_count ?? 0}
                </div>
              </div>
 
              {/* Capacity */}
              <div style={{ textAlign:'right' }}>
                <div style={{ fontSize:'0.62rem', color:'#6b7591',
                  textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:4 }}>
                  Capacité</div>
                <div style={{ fontFamily:"'DM Serif Display',serif",
                  fontSize:'1.3rem', color }}>{f.capacity}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}