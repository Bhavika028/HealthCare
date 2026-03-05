export default function RiskBadge({ level }) {
  const cls = {
    Low: 'badge-low',
    Moderate: 'badge-moderate',
    High: 'badge-high',
  }[level] || 'badge-low';

  const icon = { Low: '✓', Moderate: '⚠', High: '!' }[level] || '?';

  return (
    <span className={`badge ${cls}`} style={{ fontSize: 14, padding: '6px 16px' }}>
      {icon} {level} Risk
    </span>
  );
}
