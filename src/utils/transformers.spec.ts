import { describe, it, expect } from 'vitest';
import { iconFactory, altTextFactory, iconNameFactory, gradientNameFactory } from './transformers';
import { SocialTypes } from './enums';

describe('iconFactory', () => {
  it('should return correct icon for Twitter', () => {
    expect(iconFactory(SocialTypes.Twitter)).toBe('fa6-brands:twitter');
  });

  it('should return correct icon for Instagram', () => {
    expect(iconFactory(SocialTypes.Instagram)).toBe('fa6-brands:instagram');
  });

  it('should return correct icon for YouTube', () => {
    expect(iconFactory(SocialTypes.YouTube)).toBe('fa6-brands:youtube');
  });

  it('should return correct icon for Patreon', () => {
    expect(iconFactory(SocialTypes.Patreon)).toBe('fa6-brands:patreon');
  });

  it('should return correct icon for Twitch', () => {
    expect(iconFactory(SocialTypes.Twitch)).toBe('fa6-brands:twitch');
  });

  it('should return correct icon for Email', () => {
    expect(iconFactory(SocialTypes.Email)).toBe('fa6-regular:envelope');
  });

  it('should return correct icon for Mastodon', () => {
    expect(iconFactory(SocialTypes.Mastodon)).toBe('fa6-brands:mastodon');
  });

  it('should return correct icon for FurAffinity', () => {
    expect(iconFactory(SocialTypes.FurAffinity)).toBe('ion:paw');
  });

  it('should return correct icon for Dev', () => {
    expect(iconFactory(SocialTypes.Dev)).toBe('fa6-brands:dev');
  });

  it('should return correct icon for Medium', () => {
    expect(iconFactory(SocialTypes.Medium)).toBe('mdi:medium');
  });

  it('should return correct icon for BlueSky', () => {
    expect(iconFactory(SocialTypes.BlueSky)).toBe('ri:bluesky-fill');
  });

  it('should return correct icon for LinkedIn', () => {
    expect(iconFactory(SocialTypes.LinkedIn)).toBe('fa6-brands:linkedin');
  });

  it('should return correct icon for SmugMug', () => {
    expect(iconFactory(SocialTypes.SmugMug)).toBe('simple-icons:smugmug');
  });

  it('should return correct icon for Gumroad', () => {
    expect(iconFactory(SocialTypes.Gumroad)).toBe('simple-icons:gumroad');
  });

  it('should return correct icon for KoFi', () => {
    expect(iconFactory(SocialTypes.KoFi)).toBe('simple-icons:kofi');
  });

  it('should return correct icon for Discord', () => {
    expect(iconFactory(SocialTypes.Discord)).toBe('fa6-brands:discord');
  });

  it('should return default icon for unknown type', () => {
    expect(iconFactory('unknown')).toBe('bi:globe');
  });
});

describe('altTextFactory', () => {
  it('should return correct alt text for Twitter', () => {
    expect(altTextFactory(SocialTypes.Twitter)).toBe('Link to Twitter');
  });

  it('should return correct alt text for Instagram', () => {
    expect(altTextFactory(SocialTypes.Instagram)).toBe('Link to Instagram');
  });

  it('should return correct alt text for Patreon', () => {
    expect(altTextFactory(SocialTypes.Patreon)).toBe('Link to Patreon');
  });

  it('should return correct alt text for Twitch', () => {
    expect(altTextFactory(SocialTypes.Twitch)).toBe('Link to Twitch');
  });

  it('should return correct alt text for Email', () => {
    expect(altTextFactory(SocialTypes.Email)).toBe('Link to Email');
  });

  it('should return correct alt text for Mastodon', () => {
    expect(altTextFactory(SocialTypes.Mastodon)).toBe('Link to Mastodon');
  });

  it('should return correct alt text for FurAffinity', () => {
    expect(altTextFactory(SocialTypes.FurAffinity)).toBe('Link to Fur Affinity');
  });

  it('should return correct alt text for Dev', () => {
    expect(altTextFactory(SocialTypes.Dev)).toBe('Link to Dev.to');
  });

  it('should return correct alt text for Medium', () => {
    expect(altTextFactory(SocialTypes.Medium)).toBe('Link to Medium');
  });

  it('should return correct alt text for BlueSky', () => {
    expect(altTextFactory(SocialTypes.BlueSky)).toBe('Link to BlueSky');
  });

  it('should return correct alt text for LinkedIn', () => {
    expect(altTextFactory(SocialTypes.LinkedIn)).toBe('Link to LinkedIn');
  });

  it('should return correct alt text for SmugMug', () => {
    expect(altTextFactory(SocialTypes.SmugMug)).toBe('Link to SmugMug');
  });

  it('should return correct alt text for Gumroad', () => {
    expect(altTextFactory(SocialTypes.Gumroad)).toBe('Link to Gumroad');
  });

  it('should return correct alt text for KoFi', () => {
    expect(altTextFactory(SocialTypes.KoFi)).toBe('Link to Ko-Fi');
  });

  it('should return correct alt text for Discord', () => {
    expect(altTextFactory(SocialTypes.Discord)).toBe('Link to Discord Profile');
  });

  it('should return default alt text for unknown type', () => {
    expect(altTextFactory('unknown')).toBe('Link to Website');
  });
});

describe('iconNameFactory', () => {
  it('should return correct name for Twitter', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Twitter))).toBe('Twitter');
  });

  it('should return correct name for Instagram', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Instagram))).toBe('Instagram');
  });

  it('should return correct name for YouTube', () => {
    expect(iconNameFactory(parseInt(SocialTypes.YouTube))).toBe('Youtube');
  });

  it('should return correct name for Patreon', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Patreon))).toBe('Patreon');
  });

  it('should return correct name for Twitch', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Twitch))).toBe('Twitch');
  });

  it('should return correct name for Email', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Email))).toBe('Email');
  });

  it('should return correct name for Mastodon', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Mastodon))).toBe('Mastodon');
  });

  it('should return correct name for FurAffinity', () => {
    expect(iconNameFactory(parseInt(SocialTypes.FurAffinity))).toBe('Fur Affinity');
  });

  it('should return correct name for Dev', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Dev))).toBe('Dev');
  });

  it('should return correct name for Medium', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Medium))).toBe('Medium');
  });

  it('should return correct name for BlueSky', () => {
    expect(iconNameFactory(parseInt(SocialTypes.BlueSky))).toBe('BlueSky');
  });

  it('should return correct name for LinkedIn', () => {
    expect(iconNameFactory(parseInt(SocialTypes.LinkedIn))).toBe('LinkedIn');
  });

  it('should return correct name for SmugMug', () => {
    expect(iconNameFactory(parseInt(SocialTypes.SmugMug))).toBe('SmugMug');
  });

  it('should return correct name for Gumroad', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Gumroad))).toBe('Gumroad');
  });

  it('should return correct name for KoFi', () => {
    expect(iconNameFactory(parseInt(SocialTypes.KoFi))).toBe('Ko-Fi');
  });

  it('should return correct name for Discord', () => {
    expect(iconNameFactory(parseInt(SocialTypes.Discord))).toBe('Discord');
  });

  it('should return default name for unknown type', () => {
    expect(iconNameFactory(-1)).toBe('Website');
  });
});

describe('gradientNameFactory', () => {
  it('should return correct gradient name for direction 0', () => {
    expect(gradientNameFactory(0)).toBe('To Bottom');
  });

  it('should return correct gradient name for direction 1', () => {
    expect(gradientNameFactory(1)).toBe('To Right');
  });

  it('should return correct gradient name for direction 2', () => {
    expect(gradientNameFactory(2)).toBe('To Top');
  });

  it('should return correct gradient name for direction 3', () => {
    expect(gradientNameFactory(3)).toBe('To Left');
  });

  it('should return default gradient name for unknown direction', () => {
    expect(gradientNameFactory(99)).toBe('To Bottom');
  });
});
