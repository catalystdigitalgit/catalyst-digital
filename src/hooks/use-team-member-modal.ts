import { create } from 'zustand';

interface TeamMember {
  name: string;
  role: string;
  image: string;
  bio?: string;
  achievements?: string[];
  socialLinks?: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

interface TeamMemberModalStore {
  isOpen: boolean;
  member: TeamMember | null;
  openModal: (member: TeamMember) => void;
  closeModal: () => void;
}

export const useTeamMemberModal = create<TeamMemberModalStore>((set) => ({
  isOpen: false,
  member: null,
  openModal: (member) => set({ isOpen: true, member }),
  closeModal: () => set({ isOpen: false, member: null }),
}));