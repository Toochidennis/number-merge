import { Tile } from './Tile';
import { useTranslation } from '../i18n';

export function FirstGoalModal({ onContinue }: { onContinue: () => void }) {
  const { t } = useTranslation();
  return (
    <div className="modal-layer">
      <div className="modal-card goal-modal">
        <small>{t('firstMission')}</small><h2>{t('firstGoal')}</h2>
        <Tile value={256} crown />
        <p>{t('createFirst')}</p>
        <button className="modal-primary" onClick={onContinue}>{t('letsPlay')}</button>
      </div>
    </div>
  );
}
