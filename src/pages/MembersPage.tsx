import { useState } from 'react';
import { toast } from 'react-toastify';
import { BasicText, BasicButton, BasicInput, Icon } from '@/shared/components/atoms';
import Modal from '@/shared/components/molecules/Modal';
import MemberForm from '@/features/memberManage/components/MemberForm';
import { useMemberStore, type Member } from '@/shared/stores/useMemberStore';

export default function MembersPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    searchTerm,
    selectedStatus,
    selectedPlan,
    setSearchTerm,
    setSelectedStatus,
    setSelectedPlan,
    getFilteredMembers,
    addMember,
    updateMember,
    deleteMember,
    toggleMemberStatus,
  } = useMemberStore();

  const filteredMembers = getFilteredMembers();

  const handleAddMember = async (memberData: Omit<Member, 'id'>) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      addMember(memberData);
      setIsAddModalOpen(false);
      toast.success('Member added successfully!');
    } catch (error) {
      toast.error('Failed to add member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMember = (member: Member) => {
    setEditingMember(member);
    setIsEditModalOpen(true);
  };

  const handleUpdateMember = async (memberData: Omit<Member, 'id'>) => {
    if (!editingMember) return;
    
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      updateMember(editingMember.id, memberData);
      setIsEditModalOpen(false);
      setEditingMember(null);
      toast.success('Member updated successfully!');
    } catch (error) {
      toast.error('Failed to update member. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteMember = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      deleteMember(id);
      toast.success('Member deleted successfully!');
    }
  };

  const handleToggleStatus = (id: number) => {
    toggleMemberStatus(id);
    toast.success('Member status updated!');
  };

  const exportMembers = () => {
    const csvData = filteredMembers.map(member => 
      `${member.name},${member.email},${member.status},${member.plan},${member.joinDate}`
    ).join('\n');
    
    const blob = new Blob([`Name,Email,Status,Plan,Join Date\n${csvData}`], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'members.csv';
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('Members exported successfully!');
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BasicText as="h1" variant="heading" size="2xl" className="text-white">
            Members ({filteredMembers.length})
          </BasicText>
          <BasicText color="muted" className="mt-1 text-white/80">
            Manage your members and their subscriptions
          </BasicText>
        </div>
        <BasicButton 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2"
        >
          <Icon name="plus" size="sm" />
          Add Member
        </BasicButton>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <BasicInput
          placeholder="Search members..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="sm:w-80"
        />
        <div className="flex gap-2">
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value as any)}
            className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
          >
            <option value="all" className="bg-dark-800 text-white">All Status</option>
            <option value="active" className="bg-dark-800 text-white">Active</option>
            <option value="inactive" className="bg-dark-800 text-white">Inactive</option>
          </select>
          <select
            value={selectedPlan}
            onChange={(e) => setSelectedPlan(e.target.value as any)}
            className="rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
          >
            <option value="all" className="bg-dark-800 text-white">All Plans</option>
            <option value="Basic" className="bg-dark-800 text-white">Basic</option>
            <option value="Premium" className="bg-dark-800 text-white">Premium</option>
            <option value="Enterprise" className="bg-dark-800 text-white">Enterprise</option>
          </select>
          <BasicButton variant="outline" size="sm" onClick={exportMembers}>
            Export CSV
          </BasicButton>
        </div>
      </div>

      {/* Members Table */}
      <div className="overflow-hidden rounded-xl bg-white/10 backdrop-blur-md shadow-lg border border-white/20">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-white/20">
            <thead className="bg-white/10">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">
                  Member
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">
                  Plan
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">
                  Join Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/70">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/20">
              {filteredMembers.map((member) => (
                <tr key={member.id} className="hover:bg-white/10 transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <BasicText weight="medium">{member.name}</BasicText>
                      <BasicText size="sm" color="muted">
                        {member.email}
                      </BasicText>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() => handleToggleStatus(member.id)}
                      className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold leading-5 cursor-pointer transition-all duration-200 hover:scale-105 ${
                        member.status === 'active'
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 border border-red-500/30 hover:bg-red-500/30'
                      }`}
                    >
                      {member.status}
                    </button>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <BasicText size="sm">{member.plan}</BasicText>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <BasicText size="sm" color="muted">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </BasicText>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex gap-2">
                      <BasicButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleEditMember(member)}
                        className="flex items-center gap-1"
                      >
                        <Icon name="edit" size="xs" />
                        Edit
                      </BasicButton>
                      <BasicButton 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleDeleteMember(member.id, member.name)}
                        className="flex items-center gap-1 text-red-600 hover:text-red-700"
                      >
                        <Icon name="delete" size="xs" />
                        Delete
                      </BasicButton>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
          <BasicText color="muted" size="sm">
            Total Members
          </BasicText>
          <BasicText as="div" variant="heading" size="xl" className="mt-1">
            {useMemberStore.getState().members.length}
          </BasicText>
        </div>
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
          <BasicText color="muted" size="sm">
            Active Members
          </BasicText>
          <BasicText as="div" variant="heading" size="xl" className="mt-1">
            {useMemberStore.getState().members.filter((m) => m.status === 'active').length}
          </BasicText>
        </div>
        <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300">
          <BasicText color="muted" size="sm">
            Premium Members
          </BasicText>
          <BasicText as="div" variant="heading" size="xl" className="mt-1">
            {useMemberStore.getState().members.filter((m) => m.plan === 'Premium').length}
          </BasicText>
        </div>
      </div>

      {/* Add Member Modal */}
      <Modal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        title="Add New Member"
        size="md"
      >
        <MemberForm
          onSubmit={handleAddMember}
          onCancel={() => setIsAddModalOpen(false)}
          isLoading={isLoading}
        />
      </Modal>

      {/* Edit Member Modal */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingMember(null);
        }}
        title="Edit Member"
        size="md"
      >
        <MemberForm
          member={editingMember || undefined}
          onSubmit={handleUpdateMember}
          onCancel={() => {
            setIsEditModalOpen(false);
            setEditingMember(null);
          }}
          isLoading={isLoading}
        />
      </Modal>
    </div>
  );
}
