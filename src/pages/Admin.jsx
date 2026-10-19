import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

function Admin() {
  const [bookings, setBookings] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const handleLogout = () => {
  sessionStorage.removeItem('adminAuth');
  navigate('/admin-login', { replace: true });
};

useEffect(() => {
  const auth = sessionStorage.getItem('adminAuth');

  fetch('http://localhost:8080/api/repairs', {
    headers: {
      Authorization: `Basic ${auth}`,
    },
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => {
      setBookings(data);
      setError('');
    })
    .catch((err) => {
      console.error('Bookings fetch error:', err);
      setError('Bookings load nahi hui. Backend check karo.');
    })
    .finally(() => setLoading(false));
}, []);

  return (
    <div style={styles.app}>
      <aside style={styles.sidebar}>
        <h2 style={styles.brand}>JUNED<span style={{ color: '#f59e0b' }}>.</span></h2>
        <p style={styles.sideLabel}>MANAGEMENT</p>
        <div style={styles.activeLink}>▦ &nbsp; Dashboard</div>
        <div style={styles.sideLink}>🔧 &nbsp; Repair Bookings</div>
        <div style={styles.sideLink}>⚙️ &nbsp; Settings</div>
        <div style={styles.sidebarBottom}>JUNED MOBILE REPAIRING</div>
      </aside>

      <main style={styles.main}>
        <header style={styles.header}>
          <div>
            <h1 style={styles.title}>Admin Dashboard</h1>
            <p style={styles.subtitle}>Manage your mobile repair requests</p>
          </div>
        <div style={{
      display: 'flex',
      gap: '10px',
      alignItems: 'center'
    }}>
      <div style={styles.adminBadge}>Admin Panel</div>

      <button
        onClick={handleLogout}
        style={{
          padding: '10px 14px',
          background: '#dc2626',
          color: '#fff',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Logout
      </button>
    </div>
         

        </header>

        <section style={styles.stats}>
          <div style={styles.statCard}>
            <p style={styles.statLabel}>TOTAL BOOKINGS</p>
            <h2 style={styles.statNumber}>{bookings.length}</h2>
            <p style={styles.statNote}>All repair requests</p>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>PENDING</p>
            <h2 style={styles.statNumber}>
              {bookings.filter((b) => !b.repairStatus || b.repairStatus === 'PENDING').length}
            </h2>
            <p style={styles.statNote}>Awaiting repair</p>
          </div>

          <div style={styles.statCard}>
            <p style={styles.statLabel}>LATEST BOOKING</p>
            <h2 style={styles.statNumber}>
              {bookings.length ? `#${Math.max(...bookings.map((b) => b.id))}` : '—'}
            </h2>
            <p style={styles.statNote}>Most recent ID</p>
          </div>
        </section>

        <section style={styles.panel}>
          <div style={styles.panelHeader}>
            <div>
              <h2 style={styles.panelTitle}>Repair Bookings</h2>
              <p style={styles.subtitle}>Customer requests received by your shop</p>
            </div>
            <button
              style={styles.refreshButton}
              onClick={() => window.location.reload()}
            >
              ↻ Refresh
            </button>
          </div>

          {loading && <p style={styles.message}>Loading bookings...</p>}
          {error && <p style={styles.error}>{error}</p>}

          {!loading && !error && bookings.length === 0 && (
            <p style={styles.message}>Abhi koi booking nahi hai.</p>
          )}

          {!loading && !error && bookings.length > 0 && (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>BOOKING</th>
                    <th style={styles.th}>CUSTOMER</th>
                    <th style={styles.th}>PHONE</th>
                    <th style={styles.th}>ISSUE</th>
                    <th style={styles.th}>DESCRIPTION</th>
                    <th style={styles.th}>STATUS</th>
                    <th style={styles.th}>DATE</th>
                  </tr>
                </thead>
                <tbody>
                  {[...bookings].sort((a, b) => b.id - a.id).map((booking) => (
                    <tr key={booking.id}>
                      <td style={styles.td}>
                        <strong>#{booking.id}</strong>
                      </td>
                      <td style={styles.td}>
                        <strong>{booking.customerName}</strong>
                        <div style={styles.smallText}>{booking.contactNumber}</div>
                      </td>
                      <td style={styles.td}>{booking.phoneModel}</td>
                      <td style={styles.td}>{booking.mobileIssue}</td>
                      <td style={styles.td}>{booking.problemDescription || '—'}</td>
                      <td style={styles.td}>
                        <span style={styles.status}>
                          {booking.repairStatus || 'PENDING'}
                        </span>
                      </td>
                      <td style={styles.td}>
                        {booking.createdAt
                          ? new Date(booking.createdAt).toLocaleString()
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}

const styles = {
  app: {
    minHeight: '100vh',
    display: 'flex',
    background: '#f4f6fa',
    color: '#172033',
    fontFamily: 'Arial, sans-serif',
  },
  sidebar: {
    width: '230px',
    flexShrink: 0,
    background: '#111827',
    color: '#fff',
    padding: '28px 18px',
    boxSizing: 'border-box',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  brand: { margin: '0 0 45px', fontSize: '23px', letterSpacing: '1px' },
  sideLabel: {
    color: '#9ca3af',
    fontSize: '11px',
    letterSpacing: '1.5px',
    marginBottom: '14px',
  },
  activeLink: {
    background: '#263449',
    color: '#fbbf24',
    padding: '13px 12px',
    borderRadius: '8px',
    marginBottom: '8px',
  },
  sideLink: { color: '#d1d5db', padding: '13px 12px', fontSize: '14px' },
  sidebarBottom: {
    marginTop: 'auto',
    paddingTop: '35px',
    fontSize: '10px',
    letterSpacing: '1px',
    color: '#9ca3af',
  },
  main: { flex: 1, minWidth: 0, padding: '32px' },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
    flexWrap: 'wrap',
    marginBottom: '28px',
  },
  title: { margin: 0, fontSize: '28px' },
  subtitle: { margin: '8px 0 0', color: '#7b8496', fontSize: '13px' },
  adminBadge: {
    background: '#fff',
    border: '1px solid #e5e7eb',
    padding: '10px 15px',
    borderRadius: '9px',
    fontSize: '13px',
  },
  stats: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
    gap: '18px',
    marginBottom: '28px',
  },
  statCard: {
    background: '#fff',
    padding: '22px',
    borderRadius: '13px',
    border: '1px solid #e9edf3',
    boxShadow: '0 3px 12px rgba(20,30,50,0.03)',
  },
  statLabel: { color: '#7b8496', fontSize: '11px', letterSpacing: '1px' },
  statNumber: { fontSize: '30px', margin: '12px 0', color: '#172033' },
  statNote: { color: '#9ca3af', fontSize: '12px', margin: 0 },
  panel: {
    background: '#fff',
    border: '1px solid #e9edf3',
    borderRadius: '13px',
    overflow: 'hidden',
  },
  panelHeader: {
    padding: '23px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    gap: '14px',
    borderBottom: '1px solid #edf0f5',
  },
  panelTitle: { margin: 0, fontSize: '19px' },
  refreshButton: {
    border: '1px solid #dce2eb',
    background: '#fff',
    borderRadius: '8px',
    padding: '10px 14px',
    cursor: 'pointer',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
    textAlign: 'left',
    fontSize: '13px',
  },
  th: {
    background: '#f9fafc',
    color: '#7b8496',
    fontSize: '10px',
    letterSpacing: '0.7px',
    padding: '15px',
    whiteSpace: 'nowrap',
  },
  td: {
    padding: '16px 15px',
    borderTop: '1px solid #edf0f5',
    verticalAlign: 'top',
    lineHeight: 1.5,
  },
  smallText: { color: '#7b8496', fontSize: '12px', marginTop: '5px' },
  status: {
    display: 'inline-block',
    background: '#fff4d6',
    color: '#946200',
    padding: '6px 9px',
    borderRadius: '20px',
    fontSize: '11px',
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  message: { padding: '24px', color: '#7b8496' },
  error: { padding: '24px', color: '#b91c1c' },
};

export default Admin;