import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Book, Users, ClipboardList, Settings, AlertTriangle } from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: 'var(--font-size-lg)', color: 'var(--color-primary)' }}>Admin Portal</h2>
        <p className="text-muted" style={{ fontSize: 'var(--font-size-sm)' }}>ERPNext Integration</p>
      </div>
      
      <nav className="sidebar-nav">
        <NavLink to="/dashboard" end className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Overview
        </NavLink>
        <NavLink to="/dashboard/inventory" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Book size={20} /> Book Inventory
        </NavLink>
        <NavLink to="/dashboard/members" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Users size={20} /> Members
        </NavLink>
        <NavLink to="/dashboard/reservations" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <ClipboardList size={20} /> Reservations
        </NavLink>
        <NavLink to="/dashboard/overdue" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <AlertTriangle size={20} /> Overdue Returns
        </NavLink>
        <div style={{ margin: '1rem 0', height: '1px', backgroundColor: 'var(--color-background)' }}></div>
        <NavLink to="/dashboard/settings" className={({ isActive }) => `sidebar-link ${isActive ? 'active' : ''}`}>
          <Settings size={20} /> Settings
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
