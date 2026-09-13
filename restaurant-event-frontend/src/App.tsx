import { type ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import AdminLayout from './components/AdminLayout';
import Discover from './pages/Discover';
import Auth from './pages/Auth';
import Reservations from './pages/Reservations';
import Menu from './pages/Menu';
import Events from './pages/Events';
import Profile from './pages/Profile';
import NotFound from './pages/shared/NotFound';
import AdminDashboard from './pages/admin/Dashboard';
import AdminTables from './pages/admin/Tables';
import AdminReservations from './pages/admin/AdminReservations';
import AdminEvents from './pages/admin/AdminEvents';
import AdminInventory from './pages/admin/Inventory';
import AdminStaff from './pages/admin/Staff';
import AdminReports from './pages/admin/Reports';
import { demoMode } from './services/api';

const STAFF_ROLES = ['ADMIN', 'MANAGER', 'WAITER', 'KITCHEN_STAFF', 'EVENT_COORDINATOR', 'CASHIER', 'INVENTORY_MANAGER'];

function AdminGuard({ children }: { children: ReactNode }) {
  const { user } = useApp();
  if (!demoMode && (!user || !user.roles.some(r => STAFF_ROLES.includes(r)))) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Discover />} />
        <Route path="saved" element={<Discover savedOnly />} />
        <Route path="menu" element={<Menu />} />
        <Route path="events" element={<Events />} />
        <Route path="reservations" element={<Reservations />} />
        <Route path="profile" element={<Profile />} />
        <Route path="login" element={<Auth />} />
        <Route path="register" element={<Auth register />} />
        <Route path="*" element={<NotFound />} />
      </Route>
      <Route
        path="admin"
        element={
          <AdminGuard>
            <AdminLayout />
          </AdminGuard>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="tables" element={<AdminTables />} />
        <Route path="reservations" element={<AdminReservations />} />
        <Route path="events" element={<AdminEvents />} />
        <Route path="inventory" element={<AdminInventory />} />
        <Route path="staff" element={<AdminStaff />} />
        <Route path="reports" element={<AdminReports />} />
      </Route>
    </Routes>
  );
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Toaster
          position="top-center"
          toastOptions={{
            style: { borderRadius: 12, fontFamily: 'Inter, sans-serif', fontSize: 14 },
            success: { iconTheme: { primary: '#00A699', secondary: '#fff' } },
          }}
        />
        <AppRoutes />
      </BrowserRouter>
    </AppProvider>
  );
}
