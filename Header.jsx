import { getSessions } from '../utils/storage';

export default function Header({ screen, onHome }) {
  const sessions = getSessions();
  const showHome = screen !== 'welcome';

  return (
    <header className="header">
      <div className="logo" onClick={showHome ? onHome : undefined} style={{ cursor: showHome ? 'pointer' : 'default' }}>
        Cogni<span>Screen</span>
      </div>
      <div className="flex items-center gap-16">
        {sessions.length > 0 && (
          <span className="text-muted" style={{ fontSize: 13 }}>
            {sessions.length} session{sessions.length !== 1 ? 's' : ''} recorded
          </span>
        )}
        <span className="badge" style={{ background: 'rgba(34,211,238,0.1)', color: 'var(--cyan)', fontSize: 11 }}>
          BETA
        </span>
      </div>
    </header>
  );
}
