import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface ContentPageLayoutProps {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}

const ContentPageLayout = ({ eyebrow, title, intro, children }: ContentPageLayoutProps) => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <section className="relative overflow-hidden border-b border-border bg-foreground text-primary-foreground">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,hsl(174_62%_40%/.35),transparent_35%),radial-gradient(circle_at_bottom_right,hsl(35_100%_55%/.14),transparent_30%)]" />
          <div className="container relative mx-auto px-4 py-16">
            <Link
              to="/"
              className="mb-8 inline-flex items-center gap-2 text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to home
            </Link>
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex rounded-full border border-primary-foreground/15 bg-primary-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                {eyebrow}
              </div>
              <h1 className="text-4xl font-bold leading-tight md:text-5xl">{title}</h1>
              <p className="mt-4 text-lg text-primary-foreground/75">{intro}</p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-12">
          <div className="grid gap-6">{children}</div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default ContentPageLayout;
