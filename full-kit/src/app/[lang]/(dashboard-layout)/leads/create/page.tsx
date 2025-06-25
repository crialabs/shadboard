import { redirect } from "next/navigation"

import { db } from "@/lib/prisma"

async function createLead(formData: FormData) {
  "use server"
  const title = String(formData.get("title"))
  const description = String(formData.get("description") ?? "")
  const customerName = String(formData.get("customer") ?? "")

  let customer = await db.customer.findFirst({ where: { name: customerName } })
  if (!customer && customerName) {
    customer = await db.customer.create({ data: { name: customerName } })
  }

  const lead = await db.lead.create({
    data: {
      title,
      description,
      customerId: customer?.id,
    },
  })

  redirect(`/leads/${lead.id}`)
}

export default function CreateLeadPage() {
  return (
    <form action={createLead} className="container p-4 space-y-4">
      <h1 className="text-2xl font-bold">Create Lead</h1>
      <div>
        <input
          name="title"
          placeholder="Title"
          className="w-full border px-3 py-2"
          required
        />
      </div>
      <div>
        <textarea
          name="description"
          placeholder="Description"
          className="w-full border px-3 py-2"
        />
      </div>
      <div>
        <input
          name="customer"
          placeholder="Customer"
          className="w-full border px-3 py-2"
        />
      </div>
      <button type="submit" className="px-4 py-2 border">
        Save
      </button>
    </form>
  )
}
