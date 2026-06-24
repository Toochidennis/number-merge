import { useTranslation } from '../i18n';

export function TutorialOverlay({ step, onSkip }: { step: number; onSkip: () => void }) {
  const { t } = useTranslation();
  if (!step || step === 5) return null;
  const copy: Record<number, { title: string; body: string }> = {
    1: { title: t('tutorial1Title'), body: t('tutorial1Body') },
    2: { title: t('tutorial2Title'), body: t('tutorial2Body') },
    3: { title: t('tutorial3Title'), body: t('tutorial3Body') },
    4: { title: t('tutorial4Title'), body: t('tutorial4Body') },
  };
  return (
    <div className={`tutorial-overlay tutorial-step-${step}`}>
      <div className="tutorial-copy"><strong>{copy[step].title}</strong><span>{copy[step].body}</span></div>
      {(step === 1 || step === 3) && <div className="tutorial-hand">☝</div>}
      <button onClick={onSkip}>{t('skipTutorial')}</button>
    </div>
  );
}
