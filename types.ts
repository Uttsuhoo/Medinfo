
export interface GroundingSource {
  title: string;
  uri: string;
}

export interface DiseaseResult {
  content: string;
  sources: GroundingSource[];
  timestamp: string;
}

export interface QuickLink {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export enum AppState {
  IDLE = 'IDLE',
  LOADING = 'LOADING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR'
}

export enum View {
  HOME = 'HOME',
  ABOUT = 'ABOUT'
}
