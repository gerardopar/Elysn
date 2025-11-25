export type Persona = {
  userId: string;
  name: string;
  avatarUrl?: string;

  persona: {
    coreTraits: string[];
    tone: string;
    archetype: string;
    baseSystemPrompt: string;
    dynamicSystemPrompt: string;
  };

  relationship: {
    trust: number;
    closeness: number;
    history: string[];
  };

  emotion: {
    current: string;
    lastUpdated: Date;
  };

  state: {
    availability: string; // online | idle | sleepy | busy-processing
    energy: number; // 0–1
    attention: number; // 0–1
  };

  settings: {
    model: string;
    temperature: number;
    openness: number;
    memoryRetention: number;
  };

  memoryIndex: {
    longTermMemories: string[];
  };

  meta: {
    version: string;
    interactions: number;
    tokensUsed: number;
  };

  createdAt: Date;
  updatedAt: Date;
};
