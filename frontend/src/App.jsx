import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar        from './components/layout/Sidebar';
import Topbar         from './components/layout/Topbar';
import Dashboard      from './pages/Dashboard';
import ListeApprenants from './pages/ListeApprenants';
import AjouterApprenant from './pages/AjouterApprenant';
import Formations     from './pages/Formations';
import { ThemeContext } from './context/ThemeContext';
import ListeGroupes from './pages/ListeGroupes';
import ListeVilles from './pages/ListeVilles';
import ListeModules from './pages/ListeModules';
import AjouterModule from './pages/AjouterModule';
import AjouterGroupe from './pages/AjouterGroupe';
import AjouterVille from './pages/AjouterVille';
import ModifierGroupe from "./pages/ModifierGroupe";
import ListeDivisions from "./pages/ListeDivisions";
import AjouterDivision from "./pages/AjouterDivision";
import ListeSalles from './pages/ListeSalles';
import AjouterSalle from './pages/AjouterSalle';
// import ListeSalles from './pages/ListeSalles';
// import ListeSalles from './pages/ListeSalles';






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
              <Route path='/apprenants' element={<ListeApprenants />} />
              <Route path='/ajouter-apprenant' element={<AjouterApprenant />} />
              <Route path='/formations' element={<Formations />} />
              <Route path="/groupes" element={<ListeGroupes />} />
              <Route path="/ajouter-groupe" element={<AjouterGroupe />} />
              <Route path="/modules" element={<ListeModules />} />
              <Route path="/ajouter-module" element={<AjouterModule />} />
              <Route path="/modifier-groupe/:id" element={<ModifierGroupe />} />
              <Route path="/divisions" element={<ListeDivisions />} />
              <Route path="/ajouter-division" element={<AjouterDivision />} /> 







            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}