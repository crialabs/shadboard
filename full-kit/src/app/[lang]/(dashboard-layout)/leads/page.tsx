import Link from "next/link"

import { db } from "@/lib/prisma"

export default async function LeadsPage() {
  const leads = await db.lead.findMany({ include: { customer: true } })
  return (
    <section className="container p-4">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Leads</h1>
        <Link className="underline" href="/leads/create">
          Create Lead
        </Link>
      </div>
      <ul className="space-y-2">
        {leads.map((lead) => (
          <li key={lead.id}>
            <Link className="underline" href={`/leads/${lead.id}`}>
              {lead.title}
            </Link>
            {lead.customer ? ` - ${lead.customer.name}` : ""}
          </li>
        ))}
      </ul>
    </section>
  )
}
