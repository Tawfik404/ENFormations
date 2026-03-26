import { useEffect, useState } from 'react';
import StatCard from '../components/ui/StatCard';
import { stagiaireService } from '../services/stagiaireService';
import { formationService  } from '../services/formationService';
import { useNavigate } from 'react-router-dom';
 
export default function Dashboard() {
  const [stats, setStats]   = useState({ stagiaires:0, formations:0 });
  const [recent, setRecent] = useState([]);
  const navigate = useNavigate();
 
  useEffect(() => {
    stagiaireService.getAll().then(r => {
      setStats(s => ({ ...s, stagiaires: r.data.total }));
      setRecent(r.data.data.slice(0,5));
    });
    formationService.getAll().then(r => {
      setStats(s => ({ ...s, formations: r.data.data.length }));
    });
  }, []);
 
  return (
    <div>
      <h1 style={{ fontFamily:"'DM Serif Display',serif", fontSize:'2.4rem',
        fontWeight:400, marginBottom:4 }}>Tableau de Bord</h1>
      <p style={{ fontSize:'0.72rem', color:'#4fffb0', fontStyle:'italic',
        fontFamily:"'DM Serif Display',serif", marginBottom:28 }}>
        Formation Manager · Vue d'ensemble
      </p>
 
      {/* Stat Cards */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)',
        gap:14, marginBottom:24 }}>
        <StatCard label='Total Stagiaires' value={stats.stagiaires}
          icon='👥' color='#4fffb0'
          chart={[4,6,5,7,6,stats.stagiaires,stats.stagiaires]} />
        <StatCard label='Total Formations' value={stats.formations}
          icon='📚' color='#a29bfe'
          chart={[2,3,2,4,3,stats.formations,stats.formations]} />
        <StatCard label='Total Formateurs' value={12}
          icon='🎓' color='#ffd166' chart={[8,10,9,11,10,12,12]} />
      </div>
 
      {/* Recent Table */}
      <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
        borderRadius:8, overflow:'hidden' }}>
        <div style={{ padding:'14px 20px', borderBottom:'1px solid #262d3d',
          display:'flex', justifyContent:'space-between' }}>
          <span style={{ fontSize:'0.7rem', color:'#6b7591',
            textTransform:'uppercase', letterSpacing:'0.08em' }}>
            Stagiaires récents
          </span>
          <button onClick={()=>navigate('/stagiaires')}
            style={{ fontSize:'0.68rem', color:'#4fffb0', background:'transparent',
              border:'1px solid rgba(79,255,176,0.2)', padding:'3px 10px',
              borderRadius:4, cursor:'pointer',
              fontFamily:"'DM Mono',monospace" }}>
            Voir tout →
          </button>
        </div>
        <table style={{ width:'100%', borderCollapse:'collapse' }}>
          <thead>
            <tr style={{ background:'#13171f' }}>
              {['Nom','Prénom','Formation','Ville','Sexe'].map(h => (
                <th key={h} style={{ padding:'9px 16px', textAlign:'left',
                  fontSize:'0.65rem', color:'#6b7591',
                  textTransform:'uppercase', fontWeight:400 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {recent.map(s => (
              <tr key={s.id} style={{ borderTop:'1px solid #262d3d' }}>
                <td style={{ padding:'11px 16px', fontSize:'0.72rem',color:'#ffff',
                  fontWeight:500 }}>{s.nom}</td>
                <td style={{ padding:'11px 16px', fontSize:'0.72rem' ,color:'#ffff'}}>
                  {s.prenom}</td>
                <td style={{ padding:'11px 16px' }}>
                  <span style={{ fontSize:'0.65rem', padding:'2px 8px',
                    borderRadius:3, background:'rgba(79,255,176,0.1)',
                    color:'#4fffb0' }}>
                    {s.formation?.titre ?? '-'}
                  </span>
                </td>
                <td style={{ padding:'11px 16px', fontSize:'0.7rem',
                  color:'#ffff' }}>{s.ville}</td>
                  <td><span style={{padding:'4px 10px', borderRadius:4,fontSize:'0.7rem', background:s==='feminin'? '#ff6b9d20':'#4fffb020',color:s.sexe==='feminin'? '#ff6b9d':'#4fffb0',fontWeight:500}}>{s.sexe==='feminin' ?'F':'M'}</span></td>

                  {/* <td style={{ padding:'11px 16px', fontSize:'0.72rem',color:'#ffff',
                  fontWeight:500 }}>{s.sexe}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}