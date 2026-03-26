import { Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import Sidebar        from './components/layout/Sidebar';
import Topbar         from './components/layout/Topbar';
import Dashboard      from './pages/Dashboard';
import ListeStagiaires from './pages/ListeStagiaires';
import AjouterStagiaire from './pages/AjouterStagiaire';
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
              <Route path='/stagiaires' element={<ListeStagiaires />} />
              <Route path='/ajouter'    element={<AjouterStagiaire />} />
              <Route path='/formations' element={<Formations />} />
              <Route path="/groupes" element={<ListeGroupes />} />      {/* NOUVEAU */}
              <Route path="/ajouter-groupe" element={<AjouterGroupe />} />      {/* NOUVEAU */}
              <Route path="/villes" element={<ListeVilles />} />        {/* NOUVEAU */}
              <Route path="/modules" element={<ListeModules />} />      {/* NOUVEAU */}
              <Route path="/ajouter-module" element={<AjouterModule />} />      {/* NOUVEAU */}
              <Route path="/ajouter-ville" element={<AjouterVille />} />      {/* NOUVEAU */}
              <Route path="/modifier-groupe/:id" element={<ModifierGroupe />} />
              <Route path="/divisions" element={<ListeDivisions />} />
              <Route path="/ajouter-division" element={<AjouterDivision />} /> 
              <Route path="/salles" element={<ListeSalles/>} /> 
              <Route path="/ajouter-salle" element={<AjouterSalle />} /> 







            </Routes>
          </main>
        </div>
      </div>
    </ThemeContext.Provider>
  );
}