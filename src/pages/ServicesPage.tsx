import { BasicText, BasicButton } from '@/shared/components/atoms';

type Service = {
  id: number;
  name: string;
  description: string;
  price: number;
  category: string;
  status: 'active' | 'inactive';
  subscribers: number;
};

export default function ServicesPage() {
  const services: Service[] = [
    {
      id: 1,
      name: 'Basic Plan',
      description: 'Essential features for getting started',
      price: 29.99,
      category: 'Subscription',
      status: 'active',
      subscribers: 245,
    },
    {
      id: 2,
      name: 'Premium Plan',
      description: 'Advanced features for growing businesses',
      price: 59.99,
      category: 'Subscription',
      status: 'active',
      subscribers: 156,
    },
    {
      id: 3,
      name: 'Consulting Services',
      description: 'One-on-one expert consultation',
      price: 199.99,
      category: 'Service',
      status: 'active',
      subscribers: 23,
    },
    {
      id: 4,
      name: 'Training Workshop',
      description: 'Comprehensive training program',
      price: 299.99,
      category: 'Workshop',
      status: 'inactive',
      subscribers: 12,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <BasicText as="h1" variant="heading" size="2xl" className="text-white">
            Services
          </BasicText>
          <BasicText color="muted" className="mt-1 text-white/80">
            Manage your services and pricing plans
          </BasicText>
        </div>
        <BasicButton>Add Service</BasicButton>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <div
            key={service.id}
            className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20 hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <BasicText as="h3" variant="heading" size="lg">
                  {service.name}
                </BasicText>
                                 <BasicText color="muted" className="mt-1 text-white/80">
                   {service.description}
                 </BasicText>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-all duration-200 ${
                  service.status === 'active'
                    ? 'bg-green-500/20 text-green-400 border-green-500/30'
                    : 'bg-red-500/20 text-red-400 border-red-500/30'
                }`}
              >
                {service.status}
              </span>
            </div>

            <div className="mt-4">
              <BasicText as="div" variant="heading" size="xl">
                ${service.price}
                                 <BasicText as="span" size="sm" color="muted" className="text-white/80">
                   /month
                 </BasicText>
              </BasicText>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div>
                               <BasicText size="sm" color="muted" className="text-white/80">
                 Category
               </BasicText>
                <BasicText size="sm" weight="medium">
                  {service.category}
                </BasicText>
              </div>
              <div>
                               <BasicText size="sm" color="muted" className="text-white/80">
                 Subscribers
               </BasicText>
                <BasicText size="sm" weight="medium">
                  {service.subscribers}
                </BasicText>
              </div>
            </div>

            <div className="mt-6 flex gap-2">
              <BasicButton variant="outline" size="sm" fullWidth>
                Edit
              </BasicButton>
              <BasicButton variant="ghost" size="sm">
                Delete
              </BasicButton>
            </div>
          </div>
        ))}
      </div>

      {/* Service Categories */}
      <div className="rounded-xl bg-white/10 backdrop-blur-md p-6 shadow-lg border border-white/20">
        <BasicText as="h2" variant="heading" size="lg" className="mb-4 text-white">
          Service Categories
        </BasicText>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="text-center">
            <BasicText as="div" variant="heading" size="2xl">
              2
            </BasicText>
                         <BasicText color="muted" size="sm" className="text-white/80">
               Subscription Plans
             </BasicText>
          </div>
          <div className="text-center">
            <BasicText as="div" variant="heading" size="2xl">
              1
            </BasicText>
                         <BasicText color="muted" size="sm" className="text-white/80">
               Consulting Services
             </BasicText>
          </div>
          <div className="text-center">
            <BasicText as="div" variant="heading" size="2xl">
              1
            </BasicText>
                         <BasicText color="muted" size="sm" className="text-white/80">
               Training Workshops
             </BasicText>
          </div>
        </div>
      </div>
    </div>
  );
}
