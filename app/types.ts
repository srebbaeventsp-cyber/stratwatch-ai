export enum Zone { FRANCE='France', ALGERIE='Algérie', MAROC='Maroc', TUNISIE='Tunisie', SAHARA_OCCIDENTAL='Sahara Occidental', MAGHREB='Maghreb', SAHEL='Sahel', MAURITANIE='Mauritanie', MALI='Mali', NIGER='Niger', BURKINA_FASO='Burkina Faso' }
export enum StrategicAxis { SEC='Sécurité', MIL='Militaire', DIP='Diplomatie', POL='Politique', ECO='Économie', GEO='Géopolitique' }
export enum Priority { ALERT='ALERTE', WATCH='VEILLE', ARCHIVE='ARCHIVE' }
export enum Tone { POS='POSITIVE', NEU='NEUTRE', NEG='NÉGATIVE', HOS='HOSTILE' }
export enum MediaType { NEWSPAPER='Presse', ONLINE='Web', SOCIAL='Social' }
export interface Article { id: string; title: string; summary: string; sourceName: string; sourceCountry: string; date: string; priority: Priority; tone: Tone; zones: Zone[]; axes: StrategicAxis[]; influence_score: number; isFlagged: boolean; link: string; sourceType: MediaType; 
  analysis?: string;
}
export interface FeedFilters { zone: Zone|'ALL'; axis: StrategicAxis|'ALL'; sourceType: MediaType|'ALL'; tone: Tone|'ALL'; crossReferencedOnly: boolean; country: string; }
export interface SystemLog { id: string; timestamp: string; userId: string; action: string; severity: 'info'|'warning'|'high'|'critical'|'low'; details: string; ip?: string; }
export interface SystemNotification { id: string; type: 'info'|'success'|'warning'|'danger'; title: string; message: string; timestamp: string; }
