interface UserData {
  active: boolean;
  name: string;
  displayName: string;
  desc: string;
  bgColor: string;
  bgColorAlt: string;
  gradient: number;
  iconGuid: string;
  linksOnTop: boolean;
  links: Array<Link>;
  buttons: Array<Button>;
  user: string;
  textColor: string;
}

interface Link {
  url: string;
  icon_id: string;
}

interface Button {
  url: string;
  text: string;
}

export { type UserData, type Link, type Button };
