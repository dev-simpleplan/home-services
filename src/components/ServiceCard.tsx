import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ServiceCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  price: string;
  available?: boolean;
  onClick: () => void;
  delay?: number;
}

const ServiceCard = ({
  icon: Icon,
  title,
  description,
  price,
  available = true,
  onClick,
  delay = 0,
}: ServiceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -8 }}
      onClick={onClick}
      className="group cursor-pointer bg-card rounded-2xl p-6 shadow-card hover:shadow-hover transition-all duration-300 border border-border"
    >
      <div className="flex items-start justify-between gap-4 mb-5">
        <div className="w-14 h-14 rounded-xl gradient-hero flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
          <Icon className="w-7 h-7 text-primary-foreground" />
        </div>
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            available
              ? "bg-primary/10 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {available ? "Available" : "Paused"}
        </span>
      </div>

      <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{title}</h3>

      <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
        {description}
      </p>

      <div className="flex items-center justify-between gap-4">
        <div>
          <span className="text-sm text-muted-foreground">Starting from</span>
          <div className="text-lg font-bold text-primary">{price}</div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={(event) => {
            event.stopPropagation();
            onClick();
          }}
          disabled={!available}
        >
          Book now
        </Button>
      </div>
    </motion.div>
  );
};

export default ServiceCard;
