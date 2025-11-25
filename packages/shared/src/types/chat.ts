export type Chat = {
  id: string;
  userId: string;
  personaId: string;
  title?: string;
  topic?: string;
  shortTermSummary?: string;
  lastSummaryUpdate?: number;
  createdAt: number;
  updatedAt: number;
};
