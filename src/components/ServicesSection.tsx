import ServiceCard from "./ServiceCard";
import { motion } from "framer-motion";
import { Service } from "@/hooks/useServices";
import { getServiceIcon } from "@/lib/marketplace";

interface ServicesSectionProps {
  services: Service[];
  isLoading: boolean;
  onSelectService: (service: Service) => void;
}

const ServicesSection = ({ services, isLoading, onSelectService }: ServicesSectionProps) => {
  return (
    <section id="services" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Our Services
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            What We Offer
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Choose from our wide range of professional home services. All our service providers are verified, trained, and background-checked.
          </p>
        </motion.div>

        {isLoading ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-72 rounded-2xl border border-border bg-card/60 animate-pulse"
              />
            ))}
          </div>
        ) : services.length === 0 ? (
          <div className="rounded-3xl border border-dashed border-border bg-muted/40 p-10 text-center">
            <h3 className="text-xl font-semibold text-foreground">Services are being updated</h3>
            <p className="mt-2 text-muted-foreground">
              The admin has not published any services yet. Add a few from the dashboard to start taking bookings.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                icon={getServiceIcon(service.icon_key)}
                title={service.name}
                description={service.description}
                price={service.starting_price}
                available={service.is_active}
                onClick={() => onSelectService(service)}
                delay={index * 0.08}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default ServicesSection;
