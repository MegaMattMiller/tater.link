interface UserData {
  readonly active: boolean;
  readonly name: string;
  displayName: string;
  desc: string;
  bgColor: string;
  bgColorAlt: string;
  gradient: number;
  iconGuid: string;
  linksOnTop: boolean;
  links: Array<Link>;
  buttons: Array<Button>;
  readonly user: string;
}

interface Link {
  url: string;
  icon: number;
}

interface Button {
  url: string;
  text: string;
}

export { type UserData, type Link, type Button };