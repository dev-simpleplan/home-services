import ContentPageLayout from "@/components/ContentPageLayout";

const BecomePartner = () => {
  return (
    <ContentPageLayout
      eyebrow="Become a Partner"
      title="A dedicated page for future technician, vendor, and service-team onboarding."
      intro="This placeholder version is structured like a recruitment landing page so you can replace the copy and visuals later."
    >
      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=1200&q=80"
            alt="Placeholder partner image"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">Who this is for</h2>
          <p className="mt-4 text-muted-foreground">
            Use this section to attract high-quality local professionals who want a steady booking pipeline under a
            managed platform rather than relying entirely on their own lead generation.
          </p>
          <ul className="mt-6 space-y-4 text-muted-foreground">
            <li>Independent tradespeople with strong local reputations</li>
            <li>Small agencies and specialist home service teams</li>
            <li>Professionals comfortable with quality checks and operational standards</li>
            <li>Partners available for consistent managed dispatch</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">Why join</h3>
          <p className="mt-3 text-muted-foreground">Managed lead flow, structured job intake, and brand-backed trust.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">What you need</h3>
          <p className="mt-3 text-muted-foreground">Experience, professional conduct, documents, and clear service coverage.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">What happens next</h3>
          <p className="mt-3 text-muted-foreground">Screening, onboarding, training, and eventual listing or assignment access.</p>
        </div>
      </section>

      <section className="rounded-3xl border border-border bg-muted/30 p-8">
        <h2 className="text-2xl font-semibold text-foreground">Application checklist</h2>
        <p className="mt-3 text-muted-foreground">Replace these with your final onboarding requirements and workflow later.</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-border bg-card p-5">Business name, city coverage, and primary service categories</div>
          <div className="rounded-2xl border border-border bg-card p-5">Experience, certifications, and average daily capacity</div>
          <div className="rounded-2xl border border-border bg-card p-5">Identity verification, address proof, and bank/payment details</div>
          <div className="rounded-2xl border border-border bg-card p-5">Portfolio photos, references, and customer service expectations</div>
        </div>
      </section>
    </ContentPageLayout>
  );
};

export default BecomePartner;
