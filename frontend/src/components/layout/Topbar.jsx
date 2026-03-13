import { useState } from 'react';
import { useTheme } from '../../context/ThemeContext';
import SearchBar from '../ui/SearchBar';
 
export default function Topbar() {
  const { dark, setDark } = useTheme();
  const bg = dark ? '#13171f' : '#1e2a5e';
  const border = dark ? '#262d3d' : '#dde3f0';
 
  return (
    <header style={{ background:bg, borderBottom:`1px solid ${border}`,
      padding:'0 24px', height:54,
      display:'flex', alignItems:'center', justifyContent:'space-between' }}>
 
      <SearchBar dark={dark} />
 
      <div style={{ display:'flex', alignItems:'center', gap:8 }}>
        <button onClick={()=>setDark(!dark)}
          style={{ padding:'6px 12px', borderRadius:4,
            background:'transparent', border:`1px solid ${border}`,
            color:'#6b7591', fontSize:'0.68rem',
            fontFamily:"'DM Mono',monospace", cursor:'pointer' }}>
          {dark ? '☀️ Light' : '🌙 Dark'}
        </button>
        <button style={{ padding:'6px 12px', borderRadius:4,
          background:'transparent', border:'1px solid rgba(255,107,107,0.3)',
          color:'#ff6b6b', fontSize:'0.68rem',
          fontFamily:"'DM Mono',monospace", cursor:'pointer' }}>
          ↪ Logout
        </button>
      </div>
    </header>
  );
}