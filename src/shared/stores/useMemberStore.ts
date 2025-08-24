import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Member = {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  joinDate: string;
  plan: 'Basic' | 'Premium' | 'Enterprise';
  avatar?: string;
};

type MemberState = {
  members: Member[];
  searchTerm: string;
  selectedStatus: 'all' | 'active' | 'inactive';
  selectedPlan: 'all' | 'Basic' | 'Premium' | 'Enterprise';
};

type MemberActions = {
  addMember: (member: Omit<Member, 'id'>) => void;
  updateMember: (id: number, updates: Partial<Member>) => void;
  deleteMember: (id: number) => void;
  setSearchTerm: (term: string) => void;
  setSelectedStatus: (status: MemberState['selectedStatus']) => void;
  setSelectedPlan: (plan: MemberState['selectedPlan']) => void;
  getFilteredMembers: () => Member[];
  toggleMemberStatus: (id: number) => void;
};

type MemberStore = MemberState & MemberActions;

const initialMembers: Member[] = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    status: 'active',
    joinDate: '2024-01-15',
    plan: 'Premium',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    status: 'active',
    joinDate: '2024-01-10',
    plan: 'Basic',
  },
  {
    id: 3,
    name: 'Mike Davis',
    email: 'mike.davis@example.com',
    status: 'inactive',
    joinDate: '2023-12-20',
    plan: 'Premium',
  },
  {
    id: 4,
    name: 'Emma Wilson',
    email: 'emma.wilson@example.com',
    status: 'active',
    joinDate: '2024-01-08',
    plan: 'Basic',
  },
  {
    id: 5,
    name: 'Alex Chen',
    email: 'alex.chen@example.com',
    status: 'active',
    joinDate: '2024-01-12',
    plan: 'Enterprise',
  },
];

export const useMemberStore = create<MemberStore>()(
  persist(
    (set, get) => ({
      // State
      members: initialMembers,
      searchTerm: '',
      selectedStatus: 'all',
      selectedPlan: 'all',

      // Actions
      addMember: (newMember) =>
        set((state) => ({
          members: [
            ...state.members,
            {
              ...newMember,
              id: Math.max(...state.members.map((m) => m.id)) + 1,
            },
          ],
        })),

      updateMember: (id, updates) =>
        set((state) => ({
          members: state.members.map((member) =>
            member.id === id ? { ...member, ...updates } : member
          ),
        })),

      deleteMember: (id) =>
        set((state) => ({
          members: state.members.filter((member) => member.id !== id),
        })),

      setSearchTerm: (term) => set({ searchTerm: term }),

      setSelectedStatus: (status) => set({ selectedStatus: status }),

      setSelectedPlan: (plan) => set({ selectedPlan: plan }),

      toggleMemberStatus: (id) =>
        set((state) => ({
          members: state.members.map((member) =>
            member.id === id
              ? {
                  ...member,
                  status: member.status === 'active' ? 'inactive' : 'active',
                }
              : member
          ),
        })),

      getFilteredMembers: () => {
        const { members, searchTerm, selectedStatus, selectedPlan } = get();
        
        return members.filter((member) => {
          const matchesSearch =
            member.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            member.email.toLowerCase().includes(searchTerm.toLowerCase());
          
          const matchesStatus =
            selectedStatus === 'all' || member.status === selectedStatus;
          
          const matchesPlan =
            selectedPlan === 'all' || member.plan === selectedPlan;

          return matchesSearch && matchesStatus && matchesPlan;
        });
      },
    }),
    {
      name: 'member-store',
    }
  )
);
