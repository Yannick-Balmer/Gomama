export interface IAppliForm {
  client_id?: string;
  logo_2?: string;
  logo_1?: string;
  color_main?: string;
  color_secondary?: string;
  ios?: string;
  android?: string;
  privacy_link?: string;
  plateform_name?: string;
  language?: string;
  app_karting?: string;
}

export interface IAppli {
  id?: number;
  name: string;
  ios_android: string;
  plateform_name: string;
  language: string;
  app_karting: string;
  privacy_link: string;
  color_main: string;
  color_secondary: string;
  app_short_presentation: string;
  app_long_presentation: string;
  firebase_name?: string | null;
  version?: string | null;
  publication_date?: Date | null;
  status?: string | null;
  id_app?: string | null;
  firebase_key?: string | null;
  certificate?: string | null;
  id_client?: string | null;
  id_mobile_app_config?: string | null;
  firebase_file?: string | null;
  requested_date?: Date | null;
  id_apple_team?: string | null;
  id_key_auth_apns?: string | null;
  key_apns?: string | null;
}
