import { describe, it, expect } from 'vitest';
import { SocialTypes, GradientDirections } from './enums';

describe('SocialTypes', () => {
  it('should have correct values', () => {
    expect(SocialTypes.Twitter).toBe('0');
    expect(SocialTypes.Instagram).toBe('1');
    expect(SocialTypes.YouTube).toBe('2');
    expect(SocialTypes.Patreon).toBe('3');
    expect(SocialTypes.Twitch).toBe('4');
    expect(SocialTypes.Email).toBe('5');
    expect(SocialTypes.Mastodon).toBe('6');
    expect(SocialTypes.FurAffinity).toBe('7');
    expect(SocialTypes.Dev).toBe('8');
    expect(SocialTypes.Medium).toBe('9');
    expect(SocialTypes.BlueSky).toBe('10');
    expect(SocialTypes.LinkedIn).toBe('11');
    expect(SocialTypes.SmugMug).toBe('12');
    expect(SocialTypes.Gumroad).toBe('13');
    expect(SocialTypes.KoFi).toBe('14');
    expect(SocialTypes.Discord).toBe('15');
  });
});

describe('GradientDirections', () => {
  it('should have correct values', () => {
    expect(GradientDirections.toBottom).toBe('0');
    expect(GradientDirections.toRight).toBe('1');
    expect(GradientDirections.toTop).toBe('2');
    expect(GradientDirections.toLeft).toBe('3');
  });
});
