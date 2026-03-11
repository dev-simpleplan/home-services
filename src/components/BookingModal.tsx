import { useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { X, Calendar, Clock, MapPin, User, Phone, CheckCircle, LogIn, Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings } from "@/hooks/useBookings";
import { Service, useServices } from "@/hooks/useServices";
import { BOOKING_DRAFT_STORAGE_KEY, getServiceIcon } from "@/lib/marketplace";
import { loadGoogleMaps } from "@/lib/googleMaps";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedService?: Service;
}

const timeSlots = [
  "9:00 AM",
  "10:00 AM",
  "11:00 AM",
  "12:00 PM",
  "2:00 PM",
  "3:00 PM",
  "4:00 PM",
  "5:00 PM",
];

const createEmptyForm = (service?: Service) => ({
  serviceId: service?.id ?? "",
  date: "",
  time: "",
  name: "",
  phone: "",
  address: "",
  notes: "",
  latitude: "",
  longitude: "",
});

const BookingModal = ({ isOpen, onClose, selectedService }: BookingModalProps) => {
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
  const { user } = useAuth();
  const { services } = useServices();
  const { createBooking } = useBookings();
  const navigate = useNavigate();
  const addressInputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<any>(null);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(createEmptyForm(selectedService));
  const [mapsReady, setMapsReady] = useState(false);
  const [mapsError, setMapsError] = useState("");

  useEffect(() => {
    if (isOpen) {
      setFormData((prev) => ({
        ...prev,
        serviceId: selectedService?.id ?? prev.serviceId,
      }));
      return;
    }

    setStep(1);
    setFormData(createEmptyForm(selectedService));
  }, [isOpen, selectedService]);

  useEffect(() => {
    if (!isOpen || step !== 2) return;
    if (!googleMapsApiKey || !addressInputRef.current) return;
    if (autocompleteRef.current) return;

    let active = true;

    loadGoogleMaps(googleMapsApiKey)
      .then((google) => {
        if (!active || !google || !addressInputRef.current) return;

        const autocomplete = new google.maps.places.Autocomplete(addressInputRef.current, {
          fields: ["formatted_address", "geometry", "name"],
        });

        autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const formattedAddress = place.formatted_address || place.name || "";
          const lat = place.geometry?.location?.lat?.();
          const lng = place.geometry?.location?.lng?.();

          setFormData((prev) => ({
            ...prev,
            address: formattedAddress,
            latitude: lat ? String(lat) : prev.latitude,
            longitude: lng ? String(lng) : prev.longitude,
          }));
        });

        autocompleteRef.current = autocomplete;
        setMapsReady(true);
      })
      .catch(() => {
        if (!active) return;
        setMapsError("Google Maps address search could not be loaded.");
      });

    return () => {
      active = false;
    };
  }, [googleMapsApiKey, isOpen, step]);

  const selectedServiceDetails = useMemo(() => {
    if (selectedService?.id === formData.serviceId) return selectedService;
    return services.find((service) => service.id === formData.serviceId);
  }, [formData.serviceId, selectedService, services]);

  const mapPreviewUrl = useMemo(() => {
    if (!googleMapsApiKey || !formData.address.trim()) return "";

    return `https://www.google.com/maps/embed/v1/place?key=${googleMapsApiKey}&q=${encodeURIComponent(formData.address)}`;
  }, [formData.address, googleMapsApiKey]);

  const openGoogleMaps = () => {
    const query = formData.address.trim() || "Dehradun";
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`, "_blank", "noopener,noreferrer");
  };

  const persistDraftAndGoToAuth = () => {
    sessionStorage.setItem(
      BOOKING_DRAFT_STORAGE_KEY,
      JSON.stringify({
        serviceId: formData.serviceId,
        date: formData.date,
        time: formData.time,
      }),
    );
    onClose();
    navigate("/auth?next=book");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!user) {
      persistDraftAndGoToAuth();
      return;
    }

    if (!selectedServiceDetails) return;

    try {
      await createBooking.mutateAsync({
        service_id: selectedServiceDetails.id,
        service: selectedServiceDetails.name,
        booking_date: formData.date,
        booking_time: formData.time,
        customer_name: formData.name,
        phone: formData.phone,
        address: formData.address,
        notes: formData.notes.trim() || null,
      });
      sessionStorage.removeItem(BOOKING_DRAFT_STORAGE_KEY);
      setStep(3);
    } catch {
      // Mutation handles user feedback.
    }
  };

  const resetAndClose = () => {
    setStep(1);
    setFormData(createEmptyForm(selectedService));
    onClose();
  };

  const handleContinueClick = () => {
    if (!selectedServiceDetails) return;
    if (!user) {
      persistDraftAndGoToAuth();
      return;
    }

    setStep(2);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={resetAndClose}
            className="fixed inset-0 bg-foreground/50 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-end justify-center overflow-y-auto p-4 sm:items-center"
          >
            <div className="relative my-6 w-full max-w-2xl rounded-[28px] border border-white/10 bg-card shadow-card sm:my-10">
              <div className="max-h-[90vh] overflow-y-auto rounded-[28px]">
              <div className="gradient-hero px-6 py-5 flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-primary-foreground">
                    {step === 3 ? "Booking request sent" : "Book a service"}
                  </h2>
                  <p className="text-sm text-primary-foreground/80">
                    {step === 1 && "Choose a service, date, and slot"}
                    {step === 1.5 && "Sign in or create an account to continue"}
                    {step === 2 && "Share contact details for this booking"}
                    {step === 3 && "The admin can now review and manage the request"}
                  </p>
                </div>
                <button
                  onClick={resetAndClose}
                  className="rounded-full p-2 transition-colors hover:bg-primary-foreground/10"
                >
                  <X className="h-5 w-5 text-primary-foreground" />
                </button>
              </div>

              {step !== 3 && (
                <div className="px-6 pt-4">
                  <div className="flex gap-2">
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-primary" : "bg-muted"}`} />
                    <div className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-primary" : "bg-muted"}`} />
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="p-6">
                {step === 1 && (
                  <div className="space-y-6">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {services.map((service) => {
                        const Icon = getServiceIcon(service.icon_key);
                        const selected = service.id === formData.serviceId;

                        return (
                          <button
                            key={service.id}
                            type="button"
                            onClick={() => setFormData((prev) => ({ ...prev, serviceId: service.id }))}
                            className={`rounded-2xl border p-4 text-left transition-all ${
                              selected
                                ? "border-primary bg-primary/5 shadow-soft"
                                : "border-border hover:border-primary/40"
                            }`}
                          >
                            <div className="mb-3 flex items-center justify-between gap-3">
                              <div className="flex h-11 w-11 items-center justify-center rounded-xl gradient-hero">
                                <Icon className="h-5 w-5 text-primary-foreground" />
                              </div>
                              <span className="text-sm font-semibold text-primary">{service.starting_price}</span>
                            </div>
                            <div className="font-semibold text-foreground">{service.name}</div>
                            <p className="mt-1 text-sm text-muted-foreground">{service.description}</p>
                          </button>
                        );
                      })}
                    </div>

                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Calendar className="h-4 w-4 text-primary" />
                          Preferred date
                        </Label>
                        <Input
                          type="date"
                          value={formData.date}
                          onChange={(e) => setFormData((prev) => ({ ...prev, date: e.target.value }))}
                          min={new Date().toISOString().split("T")[0]}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Clock className="h-4 w-4 text-primary" />
                          Preferred time
                        </Label>
                        <div className="grid grid-cols-2 gap-2">
                          {timeSlots.map((time) => (
                            <button
                              key={time}
                              type="button"
                              onClick={() => setFormData((prev) => ({ ...prev, time }))}
                              className={`rounded-lg border-2 px-3 py-2 text-sm font-medium transition-all ${
                                formData.time === time
                                  ? "border-primary bg-primary/10 text-primary"
                                  : "border-border hover:border-primary/40"
                              }`}
                            >
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {selectedServiceDetails && (
                      <div className="rounded-2xl border border-border bg-muted/40 p-4">
                        <div className="text-sm text-muted-foreground">Selected service</div>
                        <div className="mt-1 flex items-center justify-between gap-4">
                          <div>
                            <div className="font-semibold text-foreground">{selectedServiceDetails.name}</div>
                            <div className="text-sm text-muted-foreground">{selectedServiceDetails.description}</div>
                          </div>
                          <div className="text-sm font-semibold text-primary">{selectedServiceDetails.starting_price}</div>
                        </div>
                      </div>
                    )}

                    <Button
                      type="button"
                      variant="hero"
                      size="lg"
                      className="w-full"
                      disabled={!formData.serviceId || !formData.date || !formData.time}
                      onClick={handleContinueClick}
                    >
                      {user ? "Continue to details" : "Login or create account"}
                    </Button>
                  </div>
                )}

                {step === 1.5 && (
                  <div className="space-y-5 py-6 text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                      <LogIn className="h-8 w-8 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-foreground">Account required</h3>
                      <p className="mt-2 text-muted-foreground">
                        Create an account or sign in to place the booking. Your selected service and slot will be kept ready.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-border bg-muted/40 p-4 text-left">
                      <div className="font-semibold text-foreground">{selectedServiceDetails?.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {formData.date} at {formData.time}
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                        Change selection
                      </Button>
                      <Button type="button" variant="hero" size="lg" className="flex-1" onClick={persistDraftAndGoToAuth}>
                        Continue to auth
                      </Button>
                    </div>
                  </div>
                )}

                {step === 2 && (
                  <div className="space-y-5">
                    <div className="grid gap-5 md:grid-cols-2">
                      <div>
                        <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <User className="h-4 w-4 text-primary" />
                          Your name
                        </Label>
                        <Input
                          placeholder="Enter your full name"
                          value={formData.name}
                          onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                          className="h-12"
                        />
                      </div>

                      <div>
                        <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
                          <Phone className="h-4 w-4 text-primary" />
                          Phone number
                        </Label>
                        <Input
                          type="tel"
                          placeholder="Enter your phone number"
                          value={formData.phone}
                          onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                          className="h-12"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="mb-2 flex items-center gap-2 text-sm font-medium">
                        <MapPin className="h-4 w-4 text-primary" />
                        Service address
                      </Label>
                      <Input
                        ref={addressInputRef}
                        placeholder="Enter your complete address"
                        value={formData.address}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            address: e.target.value,
                            latitude: "",
                            longitude: "",
                          }))
                        }
                        className="h-12"
                      />
                      <div className="mt-2 flex flex-wrap items-center gap-2">
                        <Button type="button" variant="outline" size="sm" onClick={openGoogleMaps}>
                          <MapPin className="h-4 w-4" />
                          Open Google Maps
                        </Button>
                        <span className="text-xs text-muted-foreground">
                          {googleMapsApiKey
                            ? mapsReady
                              ? "Search suggestions are powered by Google Maps."
                              : "Loading Google Maps address suggestions..."
                            : "Add VITE_GOOGLE_MAPS_API_KEY to enable Google Maps address search here."}
                        </span>
                      </div>
                      {mapsError && <p className="mt-2 text-xs text-destructive">{mapsError}</p>}
                    </div>

                    {mapPreviewUrl && (
                      <div className="overflow-hidden rounded-2xl border border-border">
                        <iframe
                          title="Google Maps preview"
                          src={mapPreviewUrl}
                          className="h-56 w-full border-0"
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                        />
                      </div>
                    )}

                    <div>
                      <Label className="mb-2 text-sm font-medium">Anything the admin should know?</Label>
                      <Textarea
                        placeholder="Gate code, issue details, access notes, or preferred call timing"
                        value={formData.notes}
                        onChange={(e) => setFormData((prev) => ({ ...prev, notes: e.target.value }))}
                        className="min-h-28"
                      />
                    </div>

                    <div className="rounded-2xl border border-border bg-muted/40 p-4">
                      <div className="font-semibold text-foreground">{selectedServiceDetails?.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {formData.date} at {formData.time}
                      </div>
                      {formData.latitude && formData.longitude && (
                        <div className="mt-2 inline-flex items-center gap-2 text-xs text-primary">
                          <Navigation className="h-3.5 w-3.5" />
                          Map pin selected
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Button type="button" variant="outline" size="lg" className="flex-1" onClick={() => setStep(1)}>
                        Back
                      </Button>
                      <Button
                        type="submit"
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        disabled={!formData.name || !formData.phone || !formData.address || createBooking.isPending}
                      >
                        {createBooking.isPending ? "Submitting..." : "Send booking request"}
                      </Button>
                    </div>
                  </div>
                )}

                {step === 3 && (
                  <div className="py-6 text-center">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", duration: 0.5 }}
                      className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full gradient-hero"
                    >
                      <CheckCircle className="h-10 w-10 text-primary-foreground" />
                    </motion.div>

                    <h3 className="mb-2 text-2xl font-bold text-foreground">Booking submitted</h3>
                    <p className="mb-6 text-muted-foreground">
                      The admin has been notified. You can now track this request from your bookings page.
                    </p>

                    <div className="mb-6 rounded-2xl border border-border bg-muted/40 p-4 text-left">
                      <div className="font-semibold text-foreground">{selectedServiceDetails?.name}</div>
                      <div className="mt-1 text-sm text-muted-foreground">
                        {formData.date} at {formData.time}
                      </div>
                      <div className="mt-1 text-sm text-muted-foreground">{formData.address}</div>
                    </div>

                    <div className="flex gap-3">
                      <Button variant="outline" size="lg" className="flex-1" onClick={resetAndClose}>
                        Close
                      </Button>
                      <Button
                        type="button"
                        variant="hero"
                        size="lg"
                        className="flex-1"
                        onClick={() => {
                          resetAndClose();
                          navigate("/my-bookings");
                        }}
                      >
                        View my bookings
                      </Button>
                    </div>
                  </div>
                )}
              </form>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default BookingModal;
