import ContentPageLayout from "@/components/ContentPageLayout";

const highlights = [
  { value: "15k+", label: "service requests managed" },
  { value: "4.8/5", label: "average customer satisfaction" },
  { value: "12", label: "core service categories" },
];

const AboutUs = () => {
  return (
    <ContentPageLayout
      eyebrow="About Us"
      title="A managed home services marketplace built around trust, speed, and visible accountability."
      intro="This version uses polished placeholder content and dummy imagery so you can replace it later without changing the page structure."
    >
      <section className="grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
        <article className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">Built for households that want reliability, not randomness</h2>
          <p className="mt-4 text-muted-foreground">
            HomeServe operates like a managed marketplace: customers get a clear booking flow, the admin controls the
            catalog and fulfillment, and partners work inside a single operating system rather than through scattered
            chats and informal calls.
          </p>
          <p className="mt-4 text-muted-foreground">
            Replace this with your founder story, customer promise, regional focus, and how your team differentiates
            itself from listing websites or unstructured service aggregators.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {highlights.map((item) => (
              <div key={item.label} className="rounded-2xl border border-border bg-muted/30 p-5">
                <div className="text-3xl font-bold text-primary">{item.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{item.label}</div>
              </div>
            ))}
          </div>
        </article>

        <aside className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1520607162513-77705c0f0d4a?auto=format&fit=crop&w=1200&q=80"
            alt="Placeholder team image"
            className="h-full min-h-[320px] w-full object-cover"
          />
        </aside>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80"
            alt="Placeholder operations image"
            className="h-full min-h-[300px] w-full object-cover"
          />
        </div>
        <div className="rounded-3xl border border-border bg-muted/30 p-8">
          <h2 className="text-2xl font-semibold text-foreground">Why customers choose this model</h2>
          <ul className="mt-6 space-y-4 text-muted-foreground">
            <li>Centralized booking and a single operating team handling customer communication.</li>
            <li>Published service catalog instead of unmanaged provider listings.</li>
            <li>Admin-level control over status updates, notifications, and service visibility.</li>
            <li>Consistent support process across electricians, cleaning, plumbing, and custom requests.</li>
          </ul>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">Mission</h3>
          <p className="mt-3 text-muted-foreground">
            Replace this with a concise statement about dependable response times, professional service standards, and
            transparent follow-through.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">Vision</h3>
          <p className="mt-3 text-muted-foreground">
            Use this section for your expansion plan, city-level growth roadmap, and the service experience you want to
            be known for.
          </p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">Values</h3>
          <p className="mt-3 text-muted-foreground">
            Add your internal principles around trust, customer care, partner quality, punctuality, and accountability.
          </p>
        </div>
      </section>
    </ContentPageLayout>
  );
};

export default AboutUs;
