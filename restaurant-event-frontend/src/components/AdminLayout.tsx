import { NavLink, Outlet, Link } from 'react-router-dom';
import {
  Squares2X2Icon,
  TableCellsIcon,
  CalendarDaysIcon,
  SparklesIcon,
  ArchiveBoxIcon,
  UserGroupIcon,
  ChartBarIcon,
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';
import { Logo } from './Layout';
import { useApp } from '../context/AppContext';

const nav = [
  { label: 'Dashboard',    to: '/admin',             icon: Squares2X2Icon,  end: true },
  { label: 'Reservations', to: '/admin/reservations', icon: CalendarDaysIcon },
  { label: 'Tables',       to: '/admin/tables',       icon: TableCellsIcon },
  { label: 'Events',       to: '/admin/events',       icon: SparklesIcon },
  { label: 'Inventory',    to: '/admin/inventory',    icon: ArchiveBoxIcon },
  { label: 'Staff',        to: '/admin/staff',        icon: UserGroupIcon },
  { label: 'Reports',      to: '/admin/reports',      icon: ChartBarIcon },
];

export default function AdminLayout() {
  const { user } = useApp();
  return (
    <>
      <header className="site-header">
        <div className="nav-wrap">
          <Logo />
          <span style={{ fontSize: 12, fontWeight: 700, letterSpacing: '.06em', textTransform: 'uppercase', color: 'var(--foggy)', flex: 1 }}>
            Staff Workspace
          </span>
          <div className="nav-actions">
            <span style={{ fontSize: 14, color: 'var(--foggy)' }}>{user?.fullName ?? 'Guest'}</span>
            <Link to="/" className="button" style={{ padding: '8px 16px', fontSize: 13 }}>
              <ArrowLeftIcon style={{ width: 14, height: 14 }} /> Back to site
            </Link>
          </div>
        </div>
      </header>
      <div className="admin-wrap">
        <aside className="admin-sidebar">
          <p className="sidebar-section">Menu</p>
          {nav.map(({ label, to, icon: Icon, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) => `sidebar-link${isActive ? ' active' : ''}`}
            >
              <Icon />
              <span>{label}</span>
            </NavLink>
          ))}
        </aside>
        <main className="admin-main">
          <Outlet />
        </main>
      </div>
    </>
  );
}
