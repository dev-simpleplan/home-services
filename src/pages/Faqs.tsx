import ContentPageLayout from "@/components/ContentPageLayout";

const categories = [
  {
    title: "Booking & Scheduling",
    intro: "Questions customers typically ask before placing a service request.",
    items: [
      {
        question: "How do I place a booking?",
        answer: "Choose a service, select a preferred date and time, sign in or create an account, then complete the address and contact details step.",
      },
      {
        question: "Can I book for another person?",
        answer: "Use this answer area for your final policy on third-party bookings, address verification, and contact handling.",
      },
      {
        question: "Can I reschedule after booking?",
        answer: "Replace this with your real rescheduling window, admin approval flow, and any timeline restrictions.",
      },
    ],
  },
  {
    title: "Pricing & Payments",
    intro: "Use this section for pricing clarity and payment expectations.",
    items: [
      {
        question: "Are the listed prices final?",
        answer: "Current placeholder answer: listed prices work as starting points, while some jobs may need final confirmation after inspection.",
      },
      {
        question: "Are material charges included?",
        answer: "Replace this with your real material billing rules, exclusions, and when customers should expect extra approval.",
      },
      {
        question: "Do you charge cancellation fees?",
        answer: "Add your cancellation terms here, especially for last-minute slot blocks or dispatched technicians.",
      },
    ],
  },
  {
    title: "Partners & Operations",
    intro: "For future partner pages, service operations, and how fulfillment is managed.",
    items: [
      {
        question: "Who handles the assigned job?",
        answer: "The platform currently works as an admin-managed marketplace where the admin controls the service catalog and booking lifecycle.",
      },
      {
        question: "How do service partners join?",
        answer: "Use the Become a Partner page as your recruitment entry point and explain your screening and onboarding process here.",
      },
      {
        question: "Will I get updates after booking?",
        answer: "Bookings are linked to a customer account so status changes can be tracked from the app, subject to your final communication policy.",
      },
    ],
  },
];

const Faqs = () => {
  return (
    <ContentPageLayout
      eyebrow="FAQs"
      title="Categorized FAQs for customers, pricing questions, and future partner operations."
      intro="This page is now grouped by topic so you can scale it into a fuller support center later."
    >
      <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-soft">
        <img
          src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1600&q=80"
          alt="Placeholder support image"
          className="h-72 w-full object-cover"
        />
      </section>

      <section className="grid gap-6">
        {categories.map((category) => (
          <div key={category.title} className="rounded-3xl border border-border bg-card p-8 shadow-soft">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold text-foreground">{category.title}</h2>
              <p className="mt-2 text-muted-foreground">{category.intro}</p>
            </div>
            <div className="mt-6 grid gap-4">
              {category.items.map((item) => (
                <div key={item.question} className="rounded-2xl border border-border bg-muted/30 p-5">
                  <h3 className="text-lg font-semibold text-foreground">{item.question}</h3>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{item.answer}</p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </ContentPageLayout>
  );
};

export default Faqs;
