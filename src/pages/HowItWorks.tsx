import ContentPageLayout from "@/components/ContentPageLayout";

const steps = [
  {
    title: "Browse the service catalog",
    body: "Customers see only the services the admin has published, keeping the marketplace focused and controlled.",
  },
  {
    title: "Choose a date and time",
    body: "The booking modal captures the preferred slot before asking the customer to authenticate or continue.",
  },
  {
    title: "Confirm details and location",
    body: "Customers provide their contact number, service address, and optional notes to help with dispatch.",
  },
  {
    title: "Admin gets notified instantly",
    body: "Every booking creates an admin notification so the request can be reviewed and moved into fulfillment.",
  },
  {
    title: "Track progress inside the app",
    body: "Customers can return to their dashboard to monitor booking status and see what has been confirmed.",
  },
];

const HowItWorks = () => {
  return (
    <ContentPageLayout
      eyebrow="How It Works"
      title="A clean customer journey on the front end, with centralized marketplace control on the back end."
      intro="This page explains the current product flow and gives you richer placeholder sections to replace with your final operational messaging."
    >
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
        <div className="rounded-3xl border border-border bg-card p-8 shadow-soft">
          <h2 className="text-2xl font-semibold text-foreground">What the experience feels like</h2>
          <p className="mt-4 text-muted-foreground">
            Customers move through a focused flow: choose a service, pick a slot, log in, confirm details, and submit
            a request. The system is intentionally simple because this is a managed marketplace, not an open directory.
          </p>
          <div className="mt-8 grid gap-5">
            {steps.map((step, index) => (
              <div key={step.title} className="rounded-2xl border border-border bg-muted/30 p-5">
                <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-sm font-semibold text-primary">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{step.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
          <img
            src="https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=1200&q=80"
            alt="Placeholder booking flow image"
            className="h-full min-h-[420px] w-full object-cover"
          />
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">For Customers</h3>
          <p className="mt-3 text-muted-foreground">Simple booking, account-linked history, and visible status tracking.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">For Admin</h3>
          <p className="mt-3 text-muted-foreground">Service control, request visibility, and one place to manage operational workload.</p>
        </div>
        <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
          <h3 className="text-xl font-semibold text-foreground">For Partners</h3>
          <p className="mt-3 text-muted-foreground">More predictable job flow once you decide to add partner assignment to the dashboard.</p>
        </div>
      </section>
    </ContentPageLayout>
  );
};

export default HowItWorks;
