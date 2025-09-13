import { getCurrentTenant } from "../lib/tenant";

export default async function TenantHome() {

  const tenant = await getCurrentTenant();
  if (!tenant) {
    return <h1>Unknown tenant</h1>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
       <h1 className="text-4xl font-bold text-brand-primary/50">
         Welcome to {tenant.brand?.name}
       </h1>
       <p className="bg-brand-surface text-brand-text p-4 rounded-md">
        Slug: {tenant.slug}</p>
        <button className="bg-brand-primary text-brand-surface p-4 rounded-md">
          Click me
        </button>
    </div>
  );
}
