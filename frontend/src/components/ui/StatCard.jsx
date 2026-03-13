export default function StatCard({ label, value, icon, color, chart }) {
  const max = Math.max(...chart);
  return (
    <div style={{ background:'#1a1f2b', border:'1px solid #262d3d',
      borderRadius:8, padding:'20px 20px 16px',
      position:'relative', overflow:'hidden' }}>
 
      {/* Top color stripe */}
      <div style={{ position:'absolute',top:0,left:0,right:0,height:2,background:color }} />
 
      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:14 }}>
        <div>
          <div style={{ fontSize:'0.65rem', color:'#6b7591',
            textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:8 }}>
            {label}
          </div>
          <div style={{ fontFamily:"'DM Serif Display',serif",
            fontSize:'2rem', color, lineHeight:1 }}>{value}</div>
        </div>
        <span style={{ color, opacity:0.7, fontSize:18 }}>{icon}</span>
      </div>
 
      {/* Mini bar chart */}
      <div style={{ display:'flex', alignItems:'flex-end', gap:3, height:36 }}>
        {chart.map((v,i) => (
          <div key={i} style={{
            flex:1, height:`${(v/max)*100}%`,
            background:color, borderRadius:'2px 2px 0 0',
            opacity: 0.4 + (i/chart.length)*0.6
          }} />
        ))}
      </div>
    </div>
  );
}
