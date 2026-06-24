import { useTranslation } from '../i18n';

interface PauseProps { onResume: () => void; onRestart: () => void; onHome: () => void }

export function PauseModal({ onResume, onRestart, onHome }: PauseProps) {
  const { t } = useTranslation();
  return (
    <div className="modal-layer">
      <div className="modal-card pause-modal">
        <div className="modal-emblem">Ⅱ</div>
        <small>{t('takeBreath')}</small>
        <h2>{t('paused')}</h2>
        <button className="modal-primary" onClick={onResume}>{t('resume')}</button>
        <button className="modal-secondary" onClick={onRestart}>{t('restartGame')}</button>
        <button className="modal-link" onClick={onHome}>{t('backHome')}</button>
      </div>
    </div>
  );
}
