import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings, Booking } from "@/hooks/useBookings";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, MapPin, Trash2, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";

const statusColors: Record<Booking["status"], string> = {
  pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
  confirmed: "bg-blue-100 text-blue-800 border-blue-200",
  in_progress: "bg-purple-100 text-purple-800 border-purple-200",
  completed: "bg-green-100 text-green-800 border-green-200",
  cancelled: "bg-red-100 text-red-800 border-red-200",
};

const statusLabels: Record<Booking["status"], string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  in_progress: "In Progress",
  completed: "Completed",
  cancelled: "Cancelled",
};

const MyBookings = () => {
  const navigate = useNavigate();
  const { user, loading: authLoading } = useAuth();
  const { bookings, isLoading, deleteBooking } = useBookings();

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" replace />;
  }

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to cancel this booking?")) {
      deleteBooking.mutate(id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <h1 className="text-3xl font-bold text-foreground mb-2">My Bookings</h1>
            <p className="text-muted-foreground mb-8">Track and manage your service bookings</p>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                <p className="text-muted-foreground mt-4">Loading bookings...</p>
              </div>
            ) : bookings.length === 0 ? (
              <div className="text-center py-16 bg-muted/30 rounded-2xl">
                <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-foreground mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-6">
                  Book your first service and it will appear here
                </p>
                <Button variant="hero" onClick={() => navigate("/")}>
                  Book a Service
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {bookings.map((booking, index) => (
                  <motion.div
                    key={booking.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-card rounded-xl p-6 shadow-soft border border-border"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-foreground">{booking.service}</h3>
                        <p className="text-sm text-muted-foreground">
                          Booked on {format(new Date(booking.created_at), "PPP")}
                        </p>
                      </div>
                      <Badge className={`${statusColors[booking.status]} border`}>
                        {statusLabels[booking.status]}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{format(new Date(booking.booking_date), "PPP")}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Clock className="w-4 h-4 text-primary" />
                        <span>{booking.booking_time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-muted-foreground">
                        <Phone className="w-4 h-4 text-primary" />
                        <span>{booking.phone}</span>
                      </div>
                    </div>

                    <div className="flex items-start gap-2 mt-3 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                      <span>{booking.address}</span>
                    </div>

                    {booking.notes && (
                      <div className="mt-3 rounded-lg bg-muted/40 p-3 text-sm text-muted-foreground">
                        {booking.notes}
                      </div>
                    )}

                    {booking.status === "pending" && (
                      <div className="mt-4 pt-4 border-t border-border">
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDelete(booking.id)}
                        >
                          <Trash2 className="w-4 h-4 mr-2" />
                          Cancel Booking
                        </Button>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MyBookings;
