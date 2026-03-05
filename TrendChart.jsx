import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

export default function TrendChart({ sessions }) {
  if (!sessions || sessions.length < 2) return null;

  const data = sessions.map((s, i) => ({
    session: `S${i + 1}`,
    date: new Date(s.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
    fluency: s.scores?.task1?.score || 0,
    recall: s.scores?.task2?.score || 0,
    speech: s.scores?.task3?.score || 0,
    overall: Math.round(((s.scores?.task1?.score || 0) + (s.scores?.task2?.score || 0) + (s.scores?.task3?.score || 0)) / 3),
  }));

  return (
    <div>
      <h3 className="mb-16" style={{ color: 'var(--text-dim)', fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 13, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
        Cognitive Trend — {sessions.length} Sessions
      </h3>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data} margin={{ top: 4, right: 4, bottom: 4, left: -20 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" />
          <XAxis dataKey="date" tick={{ fill: '#64748B', fontSize: 12 }} />
          <YAxis domain={[0, 100]} tick={{ fill: '#64748B', fontSize: 12 }} />
          <Tooltip
            contentStyle={{ background: '#141D2E', border: '1px solid rgba(255,255,255,0.07)', borderRadius: 10, color: '#F1F5F9' }}
          />
          <ReferenceLine y={70} stroke="rgba(16,185,129,0.3)" strokeDasharray="4 4" />
          <ReferenceLine y={45} stroke="rgba(245,158,11,0.3)" strokeDasharray="4 4" />
          <Line type="monotone" dataKey="overall" stroke="#22D3EE" strokeWidth={2.5} dot={{ fill: '#22D3EE', r: 4 }} name="Overall" />
          <Line type="monotone" dataKey="fluency" stroke="#818CF8" strokeWidth={1.5} dot={false} name="Fluency" strokeDasharray="4 2" />
          <Line type="monotone" dataKey="recall" stroke="#10B981" strokeWidth={1.5} dot={false} name="Recall" strokeDasharray="4 2" />
          <Line type="monotone" dataKey="speech" stroke="#F59E0B" strokeWidth={1.5} dot={false} name="Speech" strokeDasharray="4 2" />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-16 mt-8" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
        {[['#22D3EE','Overall'],['#818CF8','Fluency'],['#10B981','Recall'],['#F59E0B','Speech']].map(([c,l]) => (
          <span key={l} className="flex items-center gap-8" style={{ fontSize: 12, color: 'var(--text-muted)' }}>
            <span style={{ width: 20, height: 2, background: c, display: 'inline-block', borderRadius: 1 }}/>
            {l}
          </span>
        ))}
      </div>
    </div>
  );
}
