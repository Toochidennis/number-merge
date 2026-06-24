import { useMemo, useState } from 'react';
import countryList from 'react-select-country-list';
import type { PlayerProfile } from '../types/profile';
import { countryCodeToFlagEmoji } from '../utils/profileStorage';
import { AvatarIcon } from './avatars/AvatarIcon';
import { AVATARS } from './avatars/avatarData';
import { BottomNav } from './BottomNav';
import { CountryFlag } from './CountryFlag';
import { SUPPORTED_LANGUAGES, type LanguageCode, useTranslation } from '../i18n';

interface ProfileScreenProps {
  profile: PlayerProfile;
  level: number;
  onSave: (profile: PlayerProfile) => void;
  onBack: () => void;
  onPlay: () => void;
}

export function ProfileScreen({ profile, level, onSave, onBack, onPlay }: ProfileScreenProps) {
  const { language, setLanguage, t } = useTranslation();
  const countries = useMemo(() => countryList().getData(), []);
  const [draft, setDraft] = useState(profile);
  const [countryQuery, setCountryQuery] = useState('');
  const [countryOpen, setCountryOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [languageQuery, setLanguageQuery] = useState('');

  const matchingLanguages = useMemo(() => {
    const query = languageQuery.trim().toLocaleLowerCase();
    return SUPPORTED_LANGUAGES.filter(([code, name]) => !query || code.includes(query) || name.toLocaleLowerCase().includes(query));
  }, [languageQuery]);

  const matchingCountries = useMemo(() => {
    const query = countryQuery.trim().toLowerCase();
    if (!query) {
      const selected = countries.find((country) => country.value === draft.countryCode);
      return selected ? [selected, ...countries.filter((country) => country.value !== draft.countryCode).slice(0, 7)] : countries.slice(0, 8);
    }
    return countries
      .filter((country) => country.label.toLowerCase().includes(query) || country.value.toLowerCase().includes(query))
      .slice(0, 10);
  }, [countries, countryQuery, draft.countryCode]);

  const chooseCountry = (countryCode: string, countryName: string) => {
    setDraft((current) => ({
      ...current,
      countryCode,
      countryName,
      countryFlag: countryCodeToFlagEmoji(countryCode),
    }));
    setCountryQuery('');
    setCountryOpen(false);
  };

  const chooseLanguage = (nextLanguage: LanguageCode) => {
    setLanguage(nextLanguage);
    setLanguageQuery('');
    setLanguageOpen(false);
  };

  return (
    <section className="profile-screen">
      <header className="profile-header">
        <button className="profile-back" onClick={onBack} aria-label={t('backHome')}>‹</button>
        <div><small>{t('account')}</small><h1>{t('playerProfile')}</h1></div>
        <span className="profile-level">{t('level', { level })}</span>
      </header>

      <div className="profile-scroll">
        <div className="profile-preview">
          <div className="profile-avatar-large"><AvatarIcon avatarId={draft.avatarId} size={104} /></div>
          <strong>{draft.username.trim() || t('player')}</strong>
          <span><CountryFlag countryCode={draft.countryCode} /> {draft.countryName}</span>
        </div>

        <div className="profile-form-panel">
          <label className="profile-field">
            <span>{t('username')} <small>{draft.username.length}/16</small></span>
            <input
              value={draft.username}
              maxLength={16}
              placeholder={t('enterName')}
              autoComplete="nickname"
              onChange={(event) => setDraft((current) => ({ ...current, username: event.target.value.replace(/[^\p{L}\p{N}_ ]/gu, '') }))}
            />
          </label>

          <div className="profile-field country-field">
            <span>{t('country')}</span>
            <button className="selected-country" type="button" onClick={() => setCountryOpen((open) => !open)} aria-expanded={countryOpen}>
              <b><CountryFlag countryCode={draft.countryCode} /></b><strong>{draft.countryName}</strong><i>⌄</i>
            </button>
            {countryOpen && (
              <div className="country-popover">
                <div className="country-search">
                  <i>⌕</i>
                  <input
                    autoFocus
                    value={countryQuery}
                    placeholder={t('searchCountries')}
                    onChange={(event) => setCountryQuery(event.target.value)}
                  />
                </div>
                <div className="country-results">
                  {matchingCountries.map((country) => (
                    <button type="button" key={country.value} onClick={() => chooseCountry(country.value, country.label)}>
                      <b><CountryFlag countryCode={country.value} /></b><span>{country.label}</span>
                      {country.value === draft.countryCode && <i>✓</i>}
                    </button>
                  ))}
                  {!matchingCountries.length && <p>{t('noCountry')}</p>}
                </div>
              </div>
            )}
          </div>

          <div className="profile-field language-field">
            <span>{t('language')}</span>
            <button className="selected-country selected-language" type="button" onClick={() => setLanguageOpen((open) => !open)} aria-expanded={languageOpen}>
              <b><CountryFlag countryCode={SUPPORTED_LANGUAGES.find(([code]) => code === language)?.[2] ?? 'GB'} /></b>
              <strong>{SUPPORTED_LANGUAGES.find(([code]) => code === language)?.[1] ?? 'English'}</strong><i>⌄</i>
            </button>
            {languageOpen && (
              <div className="country-popover language-popover">
                <div className="country-search">
                  <i>⌕</i>
                  <input autoFocus value={languageQuery} placeholder={t('searchLanguages')} onChange={(event) => setLanguageQuery(event.target.value)} />
                </div>
                <div className="country-results language-results">
                  {matchingLanguages.map(([code, name, countryCode]) => (
                    <button type="button" key={code} onClick={() => chooseLanguage(code)}>
                      <b><CountryFlag countryCode={countryCode} /></b><span lang={code}>{name}</span>{code === language && <i>✓</i>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="avatar-section">
          <div className="profile-section-title"><div><small>{t('chooseYour')}</small><h2>{t('gameAvatar')}</h2></div><span>{t('styles', { count: AVATARS.length })}</span></div>
          <div className="avatar-grid">
            {AVATARS.map((avatar) => {
              const selected = avatar.id === draft.avatarId;
              return (
                <button
                  type="button"
                  key={avatar.id}
                  className={selected ? 'selected' : ''}
                  onClick={() => setDraft((current) => ({ ...current, avatarId: avatar.id }))}
                  aria-label={t('chooseAvatar', { name: avatar.name })}
                  aria-pressed={selected}
                >
                  <AvatarIcon avatarId={avatar.id} size={58} />
                  <small>{avatar.name.replace('Gamer ', '')}</small>
                  {selected && <i>✓</i>}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="profile-actions">
        <button className="save-profile" onClick={() => onSave(draft)}>{t('saveProfile')}</button>
        <button className="cancel-profile" onClick={onBack}>{t('cancel')}</button>
      </div>
      <BottomNav activeTab="profile" onHome={onBack} onPlay={onPlay} onProfile={() => undefined} />
    </section>
  );
}
