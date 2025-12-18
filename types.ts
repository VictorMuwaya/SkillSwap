
export type TimeSlot = 'Morning' | 'Afternoon' | 'Evening';

export interface Availability {
  [day: string]: TimeSlot[];
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  location: {
    lat: number;
    lng: number;
    neighborhood: string;
  };
  skillsOffered: Skill[];
  skillsNeeded: string[];
  rating: number;
  swapsCompleted: number;
  verified: boolean;
  availability: Availability;
}

export interface Skill {
  id: string;
  category: string;
  name: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Expert';
}

export interface SwapRequest {
  id: string;
  senderId: string;
  receiverId: string;
  offeredSkillId: string;
  requestedSkillId: string;
  status: 'pending' | 'accepted' | 'declined' | 'completed';
  timestamp: Date;
  message: string;
  proposedTime?: string;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  text: string;
  timestamp: Date;
}
