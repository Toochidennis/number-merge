export const AVATAR_IDS = [
  'avatar-1', 'avatar-2', 'avatar-3', 'avatar-4', 'avatar-5', 'avatar-6',
  'avatar-7', 'avatar-8', 'avatar-9', 'avatar-10', 'avatar-11', 'avatar-12',
] as const;

export type AvatarId = (typeof AVATAR_IDS)[number];
export type AvatarKind = 'ninja' | 'robot' | 'boy' | 'girl' | 'cat' | 'dog' | 'alien' | 'wizard' | 'knight' | 'astronaut' | 'crown' | 'monster';

export interface AvatarDefinition {
  id: AvatarId;
  name: string;
  kind: AvatarKind;
  colors: [string, string, string];
}

export const AVATARS: AvatarDefinition[] = [
  { id: 'avatar-1', name: 'Ninja', kind: 'ninja', colors: ['#20283e', '#6845e8', '#ffcc9d'] },
  { id: 'avatar-2', name: 'Robot', kind: 'robot', colors: ['#18364d', '#28c9e8', '#d9f7ff'] },
  { id: 'avatar-3', name: 'Gamer boy', kind: 'boy', colors: ['#223d6c', '#397df2', '#d79467'] },
  { id: 'avatar-4', name: 'Gamer girl', kind: 'girl', colors: ['#55255d', '#ef5ca8', '#c77f58'] },
  { id: 'avatar-5', name: 'Cat', kind: 'cat', colors: ['#5a321c', '#f59c3d', '#ffe0aa'] },
  { id: 'avatar-6', name: 'Dog', kind: 'dog', colors: ['#50341f', '#c98446', '#f0c38b'] },
  { id: 'avatar-7', name: 'Alien', kind: 'alien', colors: ['#174c3f', '#4de190', '#b9ffd3'] },
  { id: 'avatar-8', name: 'Wizard', kind: 'wizard', colors: ['#32205f', '#7752e7', '#ffd0a0'] },
  { id: 'avatar-9', name: 'Knight', kind: 'knight', colors: ['#283442', '#91a5b8', '#e9f5ff'] },
  { id: 'avatar-10', name: 'Astronaut', kind: 'astronaut', colors: ['#173454', '#f2f7ff', '#6bd2ff'] },
  { id: 'avatar-11', name: 'Crown player', kind: 'crown', colors: ['#563b12', '#ffd34f', '#b8754e'] },
  { id: 'avatar-12', name: 'Monster', kind: 'monster', colors: ['#3c2155', '#9b5de5', '#d9b6ff'] },
];

export const isAvatarId = (value: string): value is AvatarId => AVATAR_IDS.includes(value as AvatarId);
export const getAvatar = (avatarId: string): AvatarDefinition => AVATARS.find((avatar) => avatar.id === avatarId) ?? AVATARS[0];
