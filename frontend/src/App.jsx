import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar        from './components/layout/Sidebar';
import Topbar         from './components/layout/Topbar';
import Dashboard      from './pages/Dashboard';
import ListeStagiaires from './pages/ListeStagiaires';
import AjouterStagiaire from './pages/AjouterStagiaire';
import Formations     from './pages/Formations';
import { ThemeContext } from './context/ThemeContext';
 
export default function App() {
  const [dark, setDark]           = useState(true);
  const [collapsed, setCollapsed] = useState(false);
 
  return (
    <ThemeContext.Provider value={{ dark, setDark }}>
      <div style={{ display:'flex', height:'100vh',
        background: dark ? '#0c0f14' : '#f0f4ff',
        fontFamily: "'DM Mono',monospace" }}>
 
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
 
        <div style={{ flex:1, display:'flex', flexDirection:'column', overflow:'hidden' }}>
          <Topbar setCollapsed={setCollapsed} />
          <main style={{ flex:1, overflowY:'auto', padding:'28px' }}>
            <Routes>
              <Route path='/'           element={<Navigate to='/dashboard' />} />
              <Route path='/dashboard'  element={<Dashboard />} />
              <Route path='/stagiaires' element={<ListeStagiaires />} />
              <Route path='/ajouter'    element={<AjouterStagiaire />} />
              <Route path='/formations' element={<Formations />} />
            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}