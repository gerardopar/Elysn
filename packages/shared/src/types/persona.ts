export type Persona = {
  userId: string;
  name: string;
  avatarUrl?: string;

  persona: {
    coreTraits: string[];
    tone: string;
    archetype: string;
  };

  state: {
    availability: string; // online | idle | sleepy | busy-processing
  };

  createdAt: Date;
  updatedAt: Date;
};
