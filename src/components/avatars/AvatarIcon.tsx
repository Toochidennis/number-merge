import { useId } from 'react';
import { getAvatar } from './avatarData';

export interface AvatarIconProps {
  avatarId: string;
  size?: number;
}

export function AvatarIcon({ avatarId, size = 48 }: AvatarIconProps) {
  const avatar = getAvatar(avatarId);
  const gradientId = `avatar-${useId().replace(/:/g, '')}`;
  const [dark, accent, skin] = avatar.colors;

  const eyes = <><circle cx="39" cy="50" r="3.5" fill="#17202b" /><circle cx="61" cy="50" r="3.5" fill="#17202b" /><circle cx="40" cy="49" r="1" fill="#fff" /><circle cx="62" cy="49" r="1" fill="#fff" /></>;
  let character: React.ReactNode;

  switch (avatar.kind) {
    case 'robot':
      character = <><path d="M50 18v10M44 18h12" stroke={skin} strokeWidth="4" strokeLinecap="round"/><rect x="25" y="30" width="50" height="45" rx="12" fill={skin}/><rect x="31" y="38" width="38" height="25" rx="8" fill={dark}/><circle cx="41" cy="50" r="4" fill={accent}/><circle cx="59" cy="50" r="4" fill={accent}/><path d="M41 68h18" stroke={dark} strokeWidth="4" strokeLinecap="round"/><path d="M25 43h-6v18h6M75 43h6v18h-6" fill={accent}/></>;
      break;
    case 'cat':
      character = <><path d="M27 39 31 18 45 31M73 39 69 18 55 31" fill={accent}/><circle cx="50" cy="52" r="28" fill={skin}/>{eyes}<path d="m46 59 4 3 4-3-4-2Z" fill="#d66b73"/><path d="M50 62v4M45 66c2 3 8 3 10 0M33 59 17 56M33 64l-16 4M67 59l16-3M67 64l16 4" stroke={dark} strokeWidth="2" strokeLinecap="round"/></>;
      break;
    case 'dog':
      character = <><path d="M32 34C18 25 15 42 25 54l12-9M68 34c14-9 17 8 7 20l-12-9" fill={dark}/><circle cx="50" cy="52" r="27" fill={skin}/>{eyes}<ellipse cx="50" cy="61" rx="7" ry="5" fill={dark}/><path d="M50 66c0 8 10 7 10 1" stroke="#e76f76" strokeWidth="4" strokeLinecap="round"/></>;
      break;
    case 'alien':
      character = <><path d="M50 21c23 0 30 16 24 36-5 17-17 25-24 25s-19-8-24-25c-6-20 1-36 24-36Z" fill={accent}/><ellipse cx="39" cy="50" rx="7" ry="11" fill={dark} transform="rotate(-18 39 50)"/><ellipse cx="61" cy="50" rx="7" ry="11" fill={dark} transform="rotate(18 61 50)"/><path d="M44 68c4 3 8 3 12 0" stroke={skin} strokeWidth="2.5" strokeLinecap="round"/></>;
      break;
    case 'wizard':
      character = <><circle cx="50" cy="56" r="25" fill={skin}/>{eyes}<path d="M35 62c2 22 28 22 30 0-8 7-22 7-30 0Z" fill="#e9eef7"/><path d="m23 36 24-29 24 29Z" fill={accent}/><path d="M19 36h62" stroke={dark} strokeWidth="8" strokeLinecap="round"/><circle cx="50" cy="22" r="3" fill="#ffd74a"/></>;
      break;
    case 'knight':
      character = <><path d="M25 40c0-19 11-29 25-29s25 10 25 29v35H25Z" fill={accent}/><path d="M31 38h38v25H31Z" fill={dark}/><path d="M36 47h28M40 55h20" stroke={skin} strokeWidth="3"/><path d="M50 38v25" stroke={accent} strokeWidth="4"/><path d="M50 11V4" stroke="#e65b5b" strokeWidth="7" strokeLinecap="round"/></>;
      break;
    case 'astronaut':
      character = <><circle cx="50" cy="50" r="34" fill={skin}/><circle cx="50" cy="48" r="26" fill={dark}/><path d="M30 43c8-16 30-20 42-6" stroke={accent} strokeWidth="5" strokeLinecap="round" opacity=".8"/>{eyes}<path d="M42 62h16" stroke="#fff" strokeWidth="3" strokeLinecap="round"/><rect x="30" y="77" width="40" height="10" rx="5" fill={accent}/></>;
      break;
    case 'monster':
      character = <><path d="m31 32-6-17 17 12M69 32l6-17-17 12" fill={skin}/><rect x="22" y="27" width="56" height="55" rx="24" fill={accent}/><circle cx="50" cy="48" r="11" fill="#fff"/><circle cx="50" cy="49" r="5" fill={dark}/><path d="M34 66c8 8 24 8 32 0" stroke={dark} strokeWidth="5" strokeLinecap="round"/><path d="m42 66 4 8 4-7 4 7 4-8" fill="#fff"/></>;
      break;
    default: {
      const isNinja = avatar.kind === 'ninja';
      const isGirl = avatar.kind === 'girl';
      const hasCrown = avatar.kind === 'crown';
      character = <><circle cx="50" cy="51" r="27" fill={skin}/>{isNinja && <path d="M23 48c0-24 13-32 27-32s27 8 27 32v17H23Z" fill={dark}/>} {!isNinja && <path d={isGirl ? "M21 51c0-26 13-37 29-37 20 0 31 16 28 42l-10-4c-2-13-9-20-19-20-11 0-18 8-19 21Z" : "M24 43c2-22 15-31 29-29 12 1 20 9 22 23-14-8-28-5-51 6Z"} fill={dark}/>} {isNinja && <rect x="26" y="42" width="48" height="18" rx="8" fill={skin}/>} {eyes}<path d="M43 64c4 3 10 3 14 0" stroke={dark} strokeWidth="2.5" strokeLinecap="round"/>{hasCrown && <path d="m30 25 4-18 15 12L61 6l7 19Z" fill={accent} stroke="#fff2a8" strokeWidth="2"/>}{avatar.kind === 'boy' && <path d="M31 40c9-6 26-8 39-1" stroke={accent} strokeWidth="5" strokeLinecap="round"/>}{isGirl && <path d="M26 57c-8 8-7 19-2 27M74 57c8 8 7 19 2 27" stroke={dark} strokeWidth="7" strokeLinecap="round"/>}</>;
    }
  }

  return (
    <svg width={size} height={size} viewBox="0 0 100 100" role="img" aria-label={avatar.name}>
      <defs><linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="1"><stop stopColor={dark}/><stop offset="1" stopColor={accent}/></linearGradient></defs>
      <circle cx="50" cy="50" r="48" fill={`url(#${gradientId})`} />
      <circle cx="50" cy="50" r="45" fill="#ffffff0b" stroke="#ffffff24" strokeWidth="2" />
      {character}
    </svg>
  );
}
