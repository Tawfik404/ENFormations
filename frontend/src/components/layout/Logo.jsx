// src/components/layout/Logo.jsx
export default function Logo({ collapsed, dark }) {
  const c = dark
    ? { text: '#e8eaf0', accent: '#4fffb0', sub: '#6b7591' }
    : { text: '#1a1f2b', accent: '#0ea5e9', sub: '#6b7591' };
 
  return (
    <div style={{ display:'flex', alignItems:'center', gap:10 }}>
      <div style={{
        width:34, height:34, borderRadius:6, flexShrink:0,
        background:`linear-gradient(135deg, ${c.accent}, #74b9ff)`,
        display:'flex', alignItems:'center', justifyContent:'center',
        color:'#0c0f14', fontWeight:700, fontSize:15,
        fontFamily:"'DM Serif Display',serif"
      }}>F</div>
      {!collapsed && (
        <div>
          <div style={{ fontSize:'0.75rem', fontWeight:700, color:c.text }}>ENFormations</div>
          <div style={{ fontSize:'0.62rem', color:c.accent, fontStyle:'italic',
            fontFamily:"'DM Serif Display',serif" }}>Dashboard</div>
        </div>
      )}
    </div>
  );
}