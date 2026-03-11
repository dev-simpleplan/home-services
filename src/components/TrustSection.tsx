import { ShieldCheck, Clock, CreditCard, Star } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: ShieldCheck,
    title: "Verified Professionals",
    description: "All service providers undergo thorough background verification and skill assessment.",
  },
  {
    icon: Clock,
    title: "On-Time Service",
    description: "We guarantee punctual arrivals with real-time tracking of your service professional.",
  },
  {
    icon: CreditCard,
    title: "Secure Payments",
    description: "Multiple payment options with secure transactions. Pay after service completion.",
  },
  {
    icon: Star,
    title: "Quality Guarantee",
    description: "Not satisfied? We offer free re-service or complete refund. No questions asked.",
  },
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-secondary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-4">
            Why Choose Us
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Trusted by 10,000+ Families
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to providing the best home service experience in Dehradun.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6"
            >
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-5">
                <feature.icon className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustSection;
