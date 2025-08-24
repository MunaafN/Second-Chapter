import { useState, useEffect } from 'react';
import { BasicInput, BasicButton, BasicText } from '@/shared/components/atoms';
import type { Member } from '@/shared/stores/useMemberStore';

type MemberFormProps = {
  member?: Member;
  onSubmit: (memberData: Omit<Member, 'id'>) => void;
  onCancel: () => void;
  isLoading?: boolean;
};

export default function MemberForm({
  member,
  onSubmit,
  onCancel,
  isLoading = false,
}: MemberFormProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    status: 'active' as 'active' | 'inactive',
    plan: 'Basic' as 'Basic' | 'Premium' | 'Enterprise',
    joinDate: new Date().toISOString().split('T')[0],
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (member) {
      setFormData({
        name: member.name,
        email: member.email,
        status: member.status,
        plan: member.plan,
        joinDate: member.joinDate,
      });
    }
  }, [member]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.joinDate) {
      newErrors.joinDate = 'Join date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Full Name *
        </label>
        <BasicInput
          value={formData.name}
          onChange={(e) => handleInputChange('name', e.target.value)}
          placeholder="Enter full name"
          className={errors.name ? 'border-red-500' : ''}
        />
        {errors.name && (
          <BasicText size="sm" color="error" className="mt-1">
            {errors.name}
          </BasicText>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Email Address *
        </label>
        <BasicInput
          type="email"
          value={formData.email}
          onChange={(e) => handleInputChange('email', e.target.value)}
          placeholder="Enter email address"
          className={errors.email ? 'border-red-500' : ''}
        />
        {errors.email && (
          <BasicText size="sm" color="error" className="mt-1">
            {errors.email}
          </BasicText>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Status
          </label>
          <select
            value={formData.status}
            onChange={(e) => handleInputChange('status', e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
          >
            <option value="active" className="bg-dark-800 text-white">Active</option>
            <option value="inactive" className="bg-dark-800 text-white">Inactive</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-white mb-1">
            Plan
          </label>
          <select
            value={formData.plan}
            onChange={(e) => handleInputChange('plan', e.target.value)}
            className="w-full rounded-lg border border-white/30 bg-white/10 px-3 py-2 text-sm text-white focus:border-white/50 focus:outline-none focus:ring-1 focus:ring-white/50 backdrop-blur-sm"
          >
            <option value="Basic" className="bg-dark-800 text-white">Basic</option>
            <option value="Premium" className="bg-dark-800 text-white">Premium</option>
            <option value="Enterprise" className="bg-dark-800 text-white">Enterprise</option>
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-white mb-1">
          Join Date *
        </label>
        <BasicInput
          type="date"
          value={formData.joinDate}
          onChange={(e) => handleInputChange('joinDate', e.target.value)}
          className={errors.joinDate ? 'border-red-500' : ''}
        />
        {errors.joinDate && (
          <BasicText size="sm" color="error" className="mt-1">
            {errors.joinDate}
          </BasicText>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-4">
        <BasicButton
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
        >
          Cancel
        </BasicButton>
        <BasicButton type="submit" disabled={isLoading}>
          {isLoading ? 'Saving...' : member ? 'Update Member' : 'Add Member'}
        </BasicButton>
      </div>
    </form>
  );
}
