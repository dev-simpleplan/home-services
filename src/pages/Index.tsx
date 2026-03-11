import { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import TrustSection from "@/components/TrustSection";
import Footer from "@/components/Footer";
import BookingModal from "@/components/BookingModal";
import { useServices, Service } from "@/hooks/useServices";
import { BOOKING_DRAFT_STORAGE_KEY } from "@/lib/marketplace";

const Index = () => {
  const servicesRef = useRef<HTMLDivElement | null>(null);
  const { services, isLoading } = useServices();
  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | undefined>();

  useEffect(() => {
    const draft = sessionStorage.getItem(BOOKING_DRAFT_STORAGE_KEY);
    if (!draft) return;

    try {
      const parsed = JSON.parse(draft) as { serviceId?: string };
      const matchedService = services.find((item) => item.id === parsed.serviceId);

      if (matchedService) {
        sessionStorage.removeItem(BOOKING_DRAFT_STORAGE_KEY);
        setSelectedService(matchedService);
        setIsBookingOpen(true);
      }
    } catch {
      sessionStorage.removeItem(BOOKING_DRAFT_STORAGE_KEY);
    }
  }, [services]);

  const handleBookNow = () => {
    setSelectedService(undefined);
    setIsBookingOpen(true);
  };

  const handleSelectService = (service: Service) => {
    setSelectedService(service);
    setIsBookingOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <HeroSection
        onBookNow={handleBookNow}
        onExploreServices={() => servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })}
      />
      <div ref={servicesRef}>
        <ServicesSection services={services} isLoading={isLoading} onSelectService={handleSelectService} />
      </div>
      <TrustSection />
      <Footer />
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        selectedService={selectedService}
      />
    </div>
  );
};

export default Index;
