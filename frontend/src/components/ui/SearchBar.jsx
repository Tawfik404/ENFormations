import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
 
export default function SearchBar({ dark }) {
  const [q, setQ] = useState('');
  const navigate  = useNavigate();
  const border    = dark ? '#262d3d' : '#dde3f0';
  const bg        = dark ? '#1a1f2b' : '#ffffff';
  const color     = dark ? '#e8eaf0' : '#1a1f2b';
 
  const handleKey = (e) => {
    if (e.key === 'Enter' && q.trim()) {
      navigate(`/stagiaires?q=${q}`);
    }
  };
 
  return (
    <div style={{ display:'flex', alignItems:'center', gap:8,
      background:bg, border:`1px solid ${border}`,
      borderRadius:5, padding:'7px 12px', width:260 }}>
      <span style={{ color:'#6b7591' }}>🔍</span>
      <input
        value={q}
        onChange={e=>setQ(e.target.value)}
        onKeyDown={handleKey}
        placeholder='Rechercher...'
        style={{ background:'transparent', border:'none',
          color, fontSize:'0.7rem',
          fontFamily:"'DM Mono',monospace", outline:'none', width:'100%' }}
      />
    </div>
  );
}