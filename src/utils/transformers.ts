import { SocialTypes } from "./enums";

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
    default:
      return 'Link to Website';
  }
}

function iconNameFactory(icon: number) {
  switch (icon) {
    case 0:
      return 'Twitter';
    case 1:
      return 'Instagram';
    case 2:
      return 'Youtube';
    case 3:
      return 'Patreon';
    case 4:
      return 'Twitch';
    case 5:
      return 'Email';
    case 6:
      return 'Mastodon';
    case 7:
      return 'Fur Affinity';
    case 8:
      return 'Dev';
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

export { iconFactory, altTextFactory, iconNameFactory, gradientNameFactory }