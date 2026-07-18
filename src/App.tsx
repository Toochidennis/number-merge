import { useEffect, useState } from 'react';
import { GameShell } from './components/GameShell';
import { GameScreen } from './components/GameScreen';
import { HomeScreen } from './components/HomeScreen';
import { ProfileScreen } from './components/ProfileScreen';
import { useGameEngine } from './hooks/useGameEngine';
import { usePlayerProfile } from './hooks/usePlayerProfile';
import { loadCatalogs } from './state/catalogStore';

export default function App() {
  const game = useGameEngine();
  const playerProfile = usePlayerProfile();
  const [homeView, setHomeView] = useState<'home' | 'profile'>('home');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState('');

  useEffect(() => {
    void loadCatalogs();
    const timer = window.setTimeout(() => setLoading(false), 900);
    const showToast = (event: Event) => {
      setToast((event as CustomEvent<string>).detail);
      window.setTimeout(() => setToast(''), 1400);
    };
    window.addEventListener('merge-toast', showToast);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('merge-toast', showToast);
    };
  }, []);

  if (loading) {
    return (
      <GameShell className="splash-screen">
        <div className="splash-logo"><span>2</span><span>4</span><span>8</span></div>
        <h1>NUMBER<br /><b>MERGE</b></h1>
        <div className="loading-bar"><i /></div>
      </GameShell>
    );
  }

  return (
    <GameShell>
      {game.screen === 'game' ? <GameScreen game={game} /> : homeView === 'profile' ? (
        <ProfileScreen
          profile={playerProfile.profile}
          level={game.level}
          onBack={() => setHomeView('home')}
          onPlay={() => { setHomeView('home'); game.startGame(); }}
          onSave={(profile) => { playerProfile.updateProfile(profile); setHomeView('home'); }}
        />
      ) : (
        <HomeScreen
          highestBlock={game.highestBlock}
          level={game.level}
          levelProgress={game.levelProgress}
          gems={game.gems}
          bestScore={game.bestScore}
          profile={playerProfile.profile}
          onPlay={game.startGame}
          onProfile={() => setHomeView('profile')}
        />
      )}
      {toast && <div className="toast">{toast}</div>}
    </GameShell>
  );
}
