import { useState } from 'react';
import Header from './components/Header';
import Welcome from './pages/Welcome';
import Profile from './pages/Profile';
import Task1 from './pages/Task1';
import Task2 from './pages/Task2';
import Task3 from './pages/Task3';
import Report from './pages/Report';
import { saveSession, getSessions } from './utils/storage';
import { generateReport } from './utils/gemini';

export default function App() {
  const [screen, setScreen] = useState('welcome');
  const [profile, setProfile] = useState(null);
  const [sessionData, setSessionData] = useState({});
  const [finalSession, setFinalSession] = useState(null);

  const go = (s) => setScreen(s);

  const handleProfileDone = (p) => {
    setProfile(p);
    setSessionData({});
    go('task1');
  };

  const handleTask1Done = (data) => {
    setSessionData(prev => ({
      ...prev,
      scores: {
        ...(prev.scores || {}),
        task1: { score: data.result.score, observations: data.result.observations, result: data.result }
      }
    }));
    go('task2');
  };

  const handleTask2Done = (data) => {
    setSessionData(prev => ({
      ...prev,
      scores: {
        ...(prev.scores || {}),
        task2: { score: data.result.score, observations: data.result.observations, result: data.result }
      }
    }));
    go('task3');
  };

  const handleTask3Done = async (data) => {
    const scores = {
      ...sessionData.scores,
      task3: { score: data.result.score, observations: data.result.observations, result: data.result }
    };

    go('generating');

    const sessions = getSessions();
    const baseline = sessions.length > 0 ? sessions[0] : null;
    const report = await generateReport(scores, baseline, profile);

    const session = saveSession({ scores, profile, report });
    setFinalSession({ ...session, scores, profile, report });
    go('report');
  };

  return (
    <div className="app-shell">
      <Header screen={screen} onHome={() => go('welcome')} />

      {screen === 'welcome'    && <Welcome onStart={() => go('profile')} onContinue={() => go('profile')} />}
      {screen === 'profile'    && <Profile onNext={handleProfileDone} />}
      {screen === 'task1'      && <Task1 profile={profile} onNext={handleTask1Done} />}
      {screen === 'task2'      && <Task2 profile={profile} onNext={handleTask2Done} />}
      {screen === 'task3'      && <Task3 profile={profile} onNext={handleTask3Done} />}
      {screen === 'report'     && finalSession && <Report session={finalSession} onHome={() => go('welcome')} />}
      {screen === 'generating' && (
        <div className="page flex-center" style={{ flexDirection: 'column', gap: 20, minHeight: '60vh' }}>
          <div style={{ width: 48, height: 48, border: '3px solid var(--cyan)', borderTopColor: 'transparent', borderRadius: '50%', animation: 'spin 0.9s linear infinite' }} />
          <h3 style={{ color: 'var(--cyan)' }}>Generating your report...</h3>
          <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>AI is analysing your responses and comparing with past sessions.</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      )}
    </div>
  );
}
