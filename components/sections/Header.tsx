import { company } from "@/lib/data";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

const stats = [
  { label: "Industry", value: company.industry },
  { label: "Revenue", value: company.revenue.replace(" Revenue", "") },
  { label: "Workforce", value: company.employees.replace(" Employees", " staff") },
];

export function Header() {
  return (
    <header className="animate-fade-up">
      <div className="flex items-center gap-2 text-sm text-ink-muted">
        <span className="flex h-6 w-6 items-center justify-center rounded-md bg-ink text-white">
          <Building2 className="h-3.5 w-3.5" />
        </span>
        <span className="font-medium text-ink">Company Profile</span>
        <span className="text-line">/</span>
        <span>Coimbatore, Tamil Nadu</span>
      </div>

      <div className="mt-5 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">
            {company.name}
          </h1>
          <p className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-ink-soft">
            <span>{company.industry}</span>
            <span className="text-line">|</span>
            <span>{company.revenue}</span>
            <span className="text-line">|</span>
            <span>{company.employees}</span>
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {company.products.map((p) => (
              <Badge key={p} tone="neutral">
                {p}
              </Badge>
            ))}
          </div>
        </div>

        <dl className="grid grid-cols-3 gap-px overflow-hidden rounded-2xl border border-line bg-line text-center lg:w-[420px]">
          {stats.map((s) => (
            <div key={s.label} className="bg-white px-4 py-5">
              <dt className="text-[11px] font-medium uppercase tracking-wide text-ink-faint">
                {s.label}
              </dt>
              <dd className="mt-1.5 text-sm font-semibold text-ink">
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </header>
  );
}
