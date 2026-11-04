import { useMemo, useState } from 'react'
import {
  Activity, Bell, Boxes, CheckCircle2, ChevronDown, CircleHelp,
  Cloud, Cpu, Database, Gauge, HardDrive, Menu, MoreHorizontal,
  Network, Search, Server, ShieldCheck, Zap
} from 'lucide-react'

const initialServices = [
  { name: 'Frontend Web', type: 'Amplify Hosting', region: 'ap-south-1', status: 'Healthy', uptime: '99.99%', icon: Cloud },
  { name: 'API Gateway', type: 'REST API', region: 'ap-south-1', status: 'Healthy', uptime: '99.96%', icon: Network },
  { name: 'Application Server', type: 'EC2 · t3.medium', region: 'ap-south-1', status: 'Warning', uptime: '98.72%', icon: Server },
  { name: 'Primary Database', type: 'RDS · PostgreSQL', region: 'ap-south-1', status: 'Healthy', uptime: '99.98%', icon: Database },
]

const events = [
  { time: '14:08:32', title: 'Deployment completed', detail: 'Frontend Web · production', level: 'success' },
  { time: '13:52:11', title: 'CPU usage above 75%', detail: 'Application Server · 4 minutes', level: 'warning' },
  { time: '13:40:06', title: 'Database backup successful', detail: 'Primary Database · automated', level: 'success' },
  { time: '12:18:44', title: 'New security scan completed', detail: 'All services · no critical findings', level: 'success' },
]

const bars = [38, 48, 42, 62, 54, 72, 58, 66, 51, 78, 63, 56, 84, 69, 60, 74, 65, 88, 72, 61, 79, 68, 91, 74]

function Metric({ icon: Icon, label, value, change, tone }) {
  return <article className="metric card">
    <div className="metric-top"><span className={`metric-icon ${tone}`}><Icon size={19}/></span><span className="metric-change">{change}</span></div>
    <div className="metric-value">{value}</div><div className="metric-label">{label}</div>
  </article>
}

function App() {
  const [active, setActive] = useState('Overview')
  const [query, setQuery] = useState('')
  const [range, setRange] = useState('Last 24 hours')
  const [menuOpen, setMenuOpen] = useState(false)
  const filtered = useMemo(() => initialServices.filter(s => `${s.name} ${s.type} ${s.status}`.toLowerCase().includes(query.toLowerCase())), [query])

  return <div className="app-shell">
    <aside className={`sidebar ${menuOpen ? 'open' : ''}`}>
      <div className="brand"><div className="brand-mark"><Activity size={21}/></div><span>cloud<span className="brand-light">pulse</span></span></div>
      <div className="workspace"><div className="workspace-avatar">SP</div><div><strong>Starter Project</strong><small>Personal workspace</small></div><ChevronDown size={15}/></div>
      <div className="nav-label">WORKSPACE</div>
      {['Overview', 'Services', 'Infrastructure', 'Activity Logs'].map((item, i) => {
        const Icon = [Gauge, Boxes, Network, Activity][i]
        return <button key={item} className={`nav-item ${active === item ? 'selected' : ''}`} onClick={() => setActive(item)}><Icon size={18}/>{item}{item === 'Activity Logs' && <span className="nav-count">4</span>}</button>
      })}
      <div className="nav-label nav-label-lower">MANAGEMENT</div>
      <button className="nav-item" onClick={() => setActive('Security')}><ShieldCheck size={18}/>Security</button>
      <button className="nav-item" onClick={() => setActive('Settings')}><Zap size={18}/>Settings</button>
      <div className="sidebar-bottom"><div className="help-card"><div className="help-icon"><CircleHelp size={18}/></div><strong>Need a hand?</strong><p>Check the docs to get the most out of CloudPulse.</p><button onClick={() => alert('Documentation demo: connect your own docs URL here.')}>View documentation <span>↗</span></button></div><div className="profile"><div className="profile-avatar">S</div><div><strong>Sibitharan</strong><small>Free plan</small></div><MoreHorizontal size={19}/></div></div>
    </aside>

    <main className="main">
      <header className="topbar">
        <button className="mobile-menu" onClick={() => setMenuOpen(!menuOpen)}><Menu size={20}/></button>
        <div className="breadcrumb">Workspace <span>/</span> <strong>{active}</strong></div>
        <div className="top-actions"><div className="live-pill"><span/> All systems operational</div><button className="icon-button" aria-label="Notifications" onClick={() => alert('You are all caught up!')}><Bell size={18}/><i/></button><div className="top-avatar">S</div></div>
      </header>

      <div className="content">
        <section className="page-heading"><div><div className="eyebrow">MONITORING CENTER <span>•</span> PRODUCTION</div><h1>{active === 'Overview' ? 'Welcome to CloudPulse by Sibitharan' : active}</h1><p>Here’s what’s happening across your cloud infrastructure.</p></div><button className="date-select" onClick={() => setRange(range === 'Last 24 hours' ? 'Last 7 days' : 'Last 24 hours')}>{range}<ChevronDown size={15}/></button></section>

        <section className="metrics-grid">
          <Metric icon={Cloud} label="Active services" value="12" change="+2 this month" tone="purple"/>
          <Metric icon={Activity} label="Requests today" value="84.2K" change="+12.8%" tone="blue"/>
          <Metric icon={Gauge} label="Avg. response time" value="124 ms" change="−8.4%" tone="green"/>
          <Metric icon={ShieldCheck} label="Security score" value="98/100" change="Excellent" tone="orange"/>
        </section>

        <section className="middle-grid">
          <article className="card traffic-card">
            <div className="card-heading"><div><h2>Traffic overview</h2><p>Incoming requests across all services</p></div><button className="more-button" onClick={() => setRange(range === 'Last 24 hours' ? 'Last 7 days' : 'Last 24 hours')}><MoreHorizontal size={20}/></button></div>
            <div className="traffic-summary"><strong>24,892</strong><span className="positive">↗ 18.6%</span><small>vs. previous period</small></div>
            <div className="chart"><div className="y-labels"><span>30k</span><span>20k</span><span>10k</span><span>0</span></div><div className="chart-area"><div className="grid-lines"><i/><i/><i/><i/></div><div className="bars">{bars.map((h, i) => <div key={i} className="bar-wrap"><div className="bar" style={{height: `${h}%`}}/></div>)}</div></div></div>
            <div className="x-labels"><span>00:00</span><span>04:00</span><span>08:00</span><span>12:00</span><span>16:00</span><span>20:00</span><span>23:59</span></div>
          </article>
          <article className="card health-card">
            <div className="card-heading"><div><h2>Infrastructure health</h2><p>Current resource utilization</p></div><span className="healthy-tag"><span/> Healthy</span></div>
            <div className="health-score"><div className="score-ring"><div><strong>94</strong><small>/ 100</small></div></div><div><strong>Looking good!</strong><p>Your infrastructure is performing well.</p></div></div>
            {[['CPU usage', '42%', 42, Cpu], ['Memory', '68%', 68, HardDrive], ['Storage', '31%', 31, Database]].map(([label, value, width, Icon]) => <div className="resource" key={label}><div className="resource-label"><span><Icon size={15}/>{label}</span><strong>{value}</strong></div><div className="progress"><i style={{width: `${width}%`}}/></div></div>)}
          </article>
        </section>

        <section className="card services-card">
          <div className="card-heading services-heading"><div><h2>Connected services</h2><p>Monitor and manage your cloud resources</p></div><button className="outline-button" onClick={() => alert('Demo: connect your AWS account to add services.')}>＋ Add service</button></div>
          <div className="table-toolbar"><div className="search-box"><Search size={16}/><input value={query} onChange={e => setQuery(e.target.value)} placeholder="Search services..."/></div><span>{filtered.length} services</span></div>
          <div className="service-table"><div className="table-head"><span>SERVICE</span><span>TYPE</span><span>REGION</span><span>UPTIME</span><span>STATUS</span></div>
            {filtered.map(s => <div className="service-row" key={s.name}><div className="service-name"><span className="service-icon"><s.icon size={17}/></span><strong>{s.name}</strong></div><span className="muted">{s.type}</span><span className="muted">{s.region}</span><strong className="uptime">{s.uptime}</strong><span className={`status ${s.status.toLowerCase()}`}><i/>{s.status}</span></div>)}
            {filtered.length === 0 && <div className="empty">No services match “{query}”.</div>}
          </div>
        </section>

        <section className="card events-card"><div className="card-heading"><div><h2>Recent activity</h2><p>Latest events from your infrastructure</p></div><button className="text-button" onClick={() => setActive('Activity Logs')}>View all activity →</button></div><div className="events-list">{events.map(e => <div className="event" key={e.time}><span className={`event-icon ${e.level}`}>{e.level === 'success' ? <CheckCircle2 size={16}/> : <Zap size={16}/>}</span><div className="event-copy"><strong>{e.title}</strong><small>{e.detail}</small></div><time>{e.time}</time></div>)}</div></section>
        <footer>© 2026 CloudPulse. Demo dashboard · Built with React + Vite</footer>
      </div>
    </main>
  </div>
}

export default App
