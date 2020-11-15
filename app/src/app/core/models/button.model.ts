export enum ButtonType {
  DEFAULT = 'btn-default',
  SUCESS = 'btn-success',
  LIGHT_SUCESS = 'btn-light-success',
  PRIMARY = 'btn-primary',
  LIGHT_PRIMARY = 'btn-light-primary',
  WARNING = 'btn-warning ',
  LIGHT_WARNING = 'btn-light-warning ',
  SECONDARY = 'btn-secondary ',
  LIGHT_SECONDARY = 'btn-light-secondary ',
  DANGER = 'btn-danger',
  LIGHT_DANGER = 'btn-light-danger',
  INFO = 'btn-info ',
  LIGHT_INFO = 'btn-light-info ',
  SUCCESS = 'btn-success',
  LIGHT_SUCCESS = 'btn-light-success',
  DARK = 'btn-dark',
  LIGHT_DARK = 'btn-light-dark',
  LIGHT = 'btn-light ',
}

export class Button {
  permission: string[] = [];
  text: string;
  title: string;
  type: ButtonType;
  active: boolean;
  icon: string;
  disable: boolean;
  click: any;
  beforeRender: any;
  visible: boolean=true;
  actions: Button[] = [];
}
