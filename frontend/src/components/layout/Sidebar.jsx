import { NavLink } from 'react-router-dom';
import { useTheme } from '../../context/ThemeContext';
import Logo from './Logo';
 
const NAV = [
  { to:'/dashboard',  label:'Dashboard',         icon:'⊞' },
  { to:'/stagiaires', label:'Liste Stagiaires',  icon:'👥' },
  { to:'/ajouter',    label:'Ajouter Stagiaire', icon:'➕' },
  { to:'/formations', label:'Formations',         icon:'📚' },
];
 
export default function Sidebar({ collapsed, setCollapsed }) {
  const { dark } = useTheme();
  const bg = dark ? '#13171f' : '#1e2a5e';
  const accent = dark ? '#4fffb0' : '#38bdf8';
 
  return (
    <aside style={{ width:collapsed?60:220, background:bg,
      borderRight:`1px solid ${dark?'#262d3d':'#dde3f0'}`,
      display:'flex', flexDirection:'column',
      transition:'width 0.3s cubic-bezier(0.4,0,0.2,1)',
      overflow:'hidden', flexShrink:0 }}>
 
      {/* Logo */}
      <div onClick={()=>setCollapsed(!collapsed)}
        style={{ padding: collapsed?'18px 12px':'18px',
          borderBottom:`1px solid ${dark?'#262d3d':'#dde3f0'}`,
          cursor:'pointer' }}>
        <Logo collapsed={collapsed} dark={dark} />
      </div>
 
      {/* Navigation */}
      <nav style={{ flex:1, padding:'12px 8px', display:'flex',
        flexDirection:'column', gap:2 }}>
        {NAV.map(item => (
          <NavLink key={item.to} to={item.to}
            style={({ isActive }) => ({
              display:'flex', alignItems:'center', gap:10,
              padding: collapsed?'10px':'10px 12px',
              borderRadius:5, textDecoration:'none',
              justifyContent: collapsed?'center':'flex-start',
              borderLeft: isActive?`2px solid ${accent}`:'2px solid transparent',
              background: isActive?`rgba(79,255,176,0.08)`:'transparent',
              color: isActive?accent:'#6b7591',
              fontSize:'0.7rem', transition:'all 0.15s'
            })}>
            <span>{item.icon}</span>
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>
 
      {!collapsed && (
        <div style={{ padding:'12px 18px',
          borderTop:`1px solid ${dark?'#262d3d':'#dde3f0'}`,
          fontSize:'0.62rem', color:'#6b7591' }}>
          v1.0.0 · Laravel + React
        </div>
      )}
    </aside>
  );
}