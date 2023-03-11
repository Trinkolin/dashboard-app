export interface Shortcut {
  url: string;
  icon: string;
  name: string;
}

export interface Shortcuts {
  section: string;
  shortcuts: Shortcut[];
}
