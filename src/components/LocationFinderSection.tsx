import { useMemo, useState } from "react";
import { CheckCircle2, Clock3, MapPin, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const serviceAreas = [
  { city: "Dehradun", state: "Uttarakhand", status: "available" as const, note: "Bookings are live across core city zones." },
  { city: "Rishikesh", state: "Uttarakhand", status: "coming-soon" as const, note: "Planned for a future service launch." },
  { city: "Haridwar", state: "Uttarakhand", status: "coming-soon" as const, note: "Expansion area under review." },
  { city: "Mussoorie", state: "Uttarakhand", status: "coming-soon" as const, note: "Limited support area planned later." },
];

const LocationFinderSection = () => {
  const [query, setQuery] = useState("Dehradun");

  const selectedArea = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return serviceAreas.find((area) => area.city.toLowerCase() === normalizedQuery) ?? null;
  }, [query]);

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[32px] border border-border bg-foreground p-8 text-primary-foreground shadow-card">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary-foreground/10 bg-primary-foreground/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
              <MapPin className="h-4 w-4" />
              Serviceability
            </div>
            <h2 className="text-3xl font-bold leading-tight">Check if your area is live before you book.</h2>
            <p className="mt-4 max-w-xl text-primary-foreground/70">
              The marketplace is currently operating only in Dehradun. More areas will be added later, so this section is designed to scale with future launches.
            </p>

            <div className="mt-8 rounded-3xl border border-primary-foreground/10 bg-primary-foreground/5 p-6">
              <label className="mb-3 block text-sm font-medium text-primary-foreground/80">Enter city</label>
              <div className="flex flex-col gap-3 sm:flex-row">
                <div className="relative flex-1">
                  <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-primary-foreground/40" />
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search city"
                    className="h-12 border-primary-foreground/10 bg-primary-foreground/10 pl-11 text-primary-foreground placeholder:text-primary-foreground/35"
                  />
                </div>
                <Button type="button" variant="accent" size="lg" onClick={() => setQuery(query.trim() || "Dehradun")}>
                  Check area
                </Button>
              </div>
            </div>
          </div>

          <div className="rounded-[32px] border border-border bg-card p-8 shadow-soft">
            {selectedArea ? (
              <div className="rounded-3xl border border-border bg-muted/30 p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm font-semibold uppercase tracking-[0.16em] text-muted-foreground">Selected area</div>
                    <h3 className="mt-2 text-3xl font-bold text-foreground">{selectedArea.city}</h3>
                    <p className="mt-1 text-muted-foreground">{selectedArea.state}</p>
                  </div>
                  <div
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${
                      selectedArea.status === "available"
                        ? "bg-primary/10 text-primary"
                        : "bg-accent/15 text-foreground"
                    }`}
                  >
                    {selectedArea.status === "available" ? <CheckCircle2 className="h-4 w-4" /> : <Clock3 className="h-4 w-4" />}
                    {selectedArea.status === "available" ? "Now serviceable" : "Coming soon"}
                  </div>
                </div>

                <p className="mt-6 text-muted-foreground">{selectedArea.note}</p>
              </div>
            ) : (
              <div className="rounded-3xl border border-dashed border-border bg-muted/20 p-6 text-center">
                <h3 className="text-2xl font-semibold text-foreground">Area not live yet</h3>
                <p className="mt-3 text-muted-foreground">
                  We are currently accepting bookings only in Dehradun. You can still keep this section here for future city launches.
                </p>
              </div>
            )}

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {serviceAreas.map((area) => (
                <div key={area.city} className="rounded-2xl border border-border bg-card p-5">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <div className="font-semibold text-foreground">{area.city}</div>
                      <div className="text-sm text-muted-foreground">{area.state}</div>
                    </div>
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${
                        area.status === "available"
                          ? "bg-primary/10 text-primary"
                          : "bg-muted text-muted-foreground"
                      }`}
                    >
                      {area.status === "available" ? "Live" : "Soon"}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LocationFinderSection;
