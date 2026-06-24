import { useTranslation } from '../i18n';

interface GameOverProps { score: number; best: number; onRestart: () => void; onHome: () => void }

export function GameOverModal({ score, best, onRestart, onHome }: GameOverProps) {
  const { t, formatNumber } = useTranslation();
  return (
    <div className="modal-layer">
      <div className="modal-card game-over-modal">
        <div className="modal-emblem danger">×</div>
        <small>{t('noMoves')}</small>
        <h2>{t('gameOver')}</h2>
        <div className="result-row">
          <div><small>{t('score')}</small><strong>{formatNumber(score)}</strong></div>
          <div><small>♛ {t('best')}</small><strong>{formatNumber(best)}</strong></div>
        </div>
        <button className="modal-primary" onClick={onRestart}>{t('playAgain')}</button>
        <button className="modal-link" onClick={onHome}>{t('backHome')}</button>
      </div>
    </div>
  );
}
