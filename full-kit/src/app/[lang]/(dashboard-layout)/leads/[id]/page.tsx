import { db } from "@/lib/prisma"

export default async function LeadViewPage(props: { params: { id: string } }) {
  const lead = await db.lead.findUnique({
    where: { id: props.params.id },
    include: { customer: true },
  })

  if (!lead) {
    return <div className="p-4">Lead not found</div>
  }

  return (
    <section className="container p-4 space-y-2">
      <h1 className="text-2xl font-bold">{lead.title}</h1>
      {lead.description && <p>{lead.description}</p>}
      {lead.customer && <p>Customer: {lead.customer.name}</p>}
    </section>
  )
}
