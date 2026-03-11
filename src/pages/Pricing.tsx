import ContentPageLayout from "@/components/ContentPageLayout";

const pricingBands = [
  {
    title: "Quick Fix Jobs",
    price: "Starts at Rs 199",
    description: "Best for inspections, small plumbing fixes, minor electrical work, and standard call-outs.",
  },
  {
    title: "Scheduled Home Services",
    price: "Starts at Rs 499",
    description: "Use for deep cleaning, appliance support, preventive maintenance, and bundled at-home tasks.",
  },
  {
    title: "Scope-Based Projects",
    price: "Custom estimate",
    description: "Ideal for painting, carpentry, annual contracts, and larger jobs priced after assessment.",
  },
];

const Pricing = () => {
  return (
    <ContentPageLayout
      eyebrow="Pricing"
      title="Placeholder pricing content with enough structure to become a real public pricing page."
      intro="You can replace these numbers, plans, and explanations later, but the page now supports a fuller pricing presentation."
    >
      <section className="grid gap-6 lg:grid-cols-[1fr_1fr]">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">How pricing works</h2>
          <p className="mt-4 text-muted-foreground">
            Use this section to explain whether prices shown are minimum charges, approximate estimates, or category
            anchors before a final confirmation from your operations team.
          </p>
          <ul className="mt-6 space-y-4 text-muted-foreground">
            <li>Base visit charges can apply to diagnostics and inspection-only requests.</li>
            <li>Material costs can be billed separately or bundled into selected service types.</li>
            <li>Large jobs may require a custom estimate after site review or customer photos.</li>
            <li>Emergency, weekend, or after-hours support can carry premium pricing.</li>
          </ul>
        </div>
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1556740749-887f6717d7e4?auto=format&fit=crop&w=1200&q=80"
            alt="Placeholder pricing image"
            className="h-full min-h-[340px] w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {pricingBands.map((band) => (
          <div key={band.title} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <h2 className="text-2xl font-semibold text-foreground">{band.title}</h2>
            <p className="mt-3 text-muted-foreground">{band.description}</p>
            <p className="mt-6 text-3xl font-bold text-primary">{band.price}</p>
          </div>
        ))}
      </section>

      <section className="rounded-3xl border border-border bg-muted/30 p-8">
        <h2 className="text-2xl font-semibold text-foreground">Suggested pricing notes</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5 text-muted-foreground">Explain cancellation and rescheduling terms.</div>
          <div className="rounded-2xl border border-border bg-card p-5 text-muted-foreground">State whether materials are excluded, included, or variable.</div>
          <div className="rounded-2xl border border-border bg-card p-5 text-muted-foreground">Clarify when final pricing is confirmed after inspection.</div>
          <div className="rounded-2xl border border-border bg-card p-5 text-muted-foreground">Mention subscription plans or repeat-visit discounts if relevant.</div>
        </div>
      </section>
    </ContentPageLayout>
  );
};

export default Pricing;
