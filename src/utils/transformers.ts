import { SocialTypes } from './enums';

function iconFactory(id: string) {
  switch (id) {
    case SocialTypes.Twitter:
      return 'fa6-brands:twitter';
    case SocialTypes.Instagram:
      return 'fa6-brands:instagram';
    case SocialTypes.YouTube:
      return 'fa6-brands:youtube';
    case SocialTypes.Patreon:
      return 'fa6-brands:patreon';
    case SocialTypes.Twitch:
      return 'fa6-brands:twitch';
    case SocialTypes.Email:
      return 'fa6-regular:envelope';
    case SocialTypes.Mastodon:
      return 'fa6-brands:mastodon';
    case SocialTypes.FurAffinity:
      return 'ion:paw';
    case SocialTypes.Dev:
      return 'fa6-brands:dev';
    case SocialTypes.Medium:
      return 'mdi:medium';
    case SocialTypes.BlueSky:
      return 'ri:bluesky-fill';
    case SocialTypes.LinkedIn:
      return 'fa6-brands:linkedin';
    case SocialTypes.SmugMug:
      return 'simple-icons:smugmug';
    default:
      return 'bi:globe';
  }
}

function altTextFactory(id: string) {
  switch (id) {
    case SocialTypes.Twitter:
      return 'Link to Twitter';
    case SocialTypes.Instagram:
      return 'Link to Instagram';
    case SocialTypes.YouTube:
      return 'Link to YouTube';
    case SocialTypes.Patreon:
      return 'Link to Patreon';
    case SocialTypes.Twitch:
      return 'Link to Twitch';
    case SocialTypes.Email:
      return 'Link to Email';
    case SocialTypes.Mastodon:
      return 'Link to Mastodon';
    case SocialTypes.FurAffinity:
      return 'Link to Fur Affinity';
    case SocialTypes.Dev:
      return 'Link to Dev.to';
    case SocialTypes.Medium:
      return 'Link to Medium';
    case SocialTypes.BlueSky:
      return 'Link to BlueSky';
    case SocialTypes.LinkedIn:
      return 'Link to LinkedIn';
    case SocialTypes.SmugMug:
      return 'Link to SmugMug';
    default:
      return 'Link to Website';
  }
}

function iconNameFactory(icon: number) {
  switch (icon) {
    case parseInt(SocialTypes.Twitter):
      return 'Twitter';
    case parseInt(SocialTypes.Instagram):
      return 'Instagram';
    case parseInt(SocialTypes.YouTube):
      return 'Youtube';
    case parseInt(SocialTypes.Patreon):
      return 'Patreon';
    case parseInt(SocialTypes.Twitch):
      return 'Twitch';
    case parseInt(SocialTypes.Email):
      return 'Email';
    case parseInt(SocialTypes.Mastodon):
      return 'Mastodon';
    case parseInt(SocialTypes.FurAffinity):
      return 'Fur Affinity';
    case parseInt(SocialTypes.Dev):
      return 'Dev';
    case parseInt(SocialTypes.Medium):
      return 'Medium';
    case parseInt(SocialTypes.BlueSky):
      return 'BlueSky';
    case parseInt(SocialTypes.LinkedIn):
      return 'LinkedIn';
    case parseInt(SocialTypes.SmugMug):
      return 'SmugMug';
    default:
      return 'Website';
  }
}

function gradientNameFactory(direction: number) {
  switch (direction) {
    case 0:
      return 'To Bottom';
    case 1:
      return 'To Right';
    case 2:
      return 'To Top';
    case 3:
      return 'To Left';
    default:
      return 'To Bottom';
  }
}

export { iconFactory, altTextFactory, iconNameFactory, gradientNameFactory };
