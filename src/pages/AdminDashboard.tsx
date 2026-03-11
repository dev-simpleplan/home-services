import { useState } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useBookings, Booking } from "@/hooks/useBookings";
import { useServices } from "@/hooks/useServices";
import { useAdminNotifications } from "@/hooks/useAdminNotifications";
import Header from "@/components/Header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Bell,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  Plus,
  Settings2,
  Trash2,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Enums } from "@/integrations/supabase/types";
import { getServiceIcon, serviceIconOptions, slugify } from "@/lib/marketplace";

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

const defaultServiceForm = {
  name: "",
  description: "",
  starting_price: "",
  icon_key: "wrench",
  sort_order: 0,
  is_active: true,
  is_featured: false,
};

const AdminDashboard = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const { bookings, isLoading, updateBookingStatus, deleteBooking } = useBookings();
  const { services, isLoading: servicesLoading, createService, updateService } = useServices();
  const { notifications, unreadCount, markAsRead } = useAdminNotifications();
  const [serviceForm, setServiceForm] = useState(defaultServiceForm);

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

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  const stats = {
    total: bookings.length,
    pending: bookings.filter((b) => b.status === "pending").length,
    inProgress: bookings.filter((b) => b.status === "in_progress" || b.status === "confirmed").length,
    completed: bookings.filter((b) => b.status === "completed").length,
  };

  const handleStatusChange = (id: string, status: Enums<"booking_status">) => {
    updateBookingStatus.mutate({ id, status });
  };

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this booking?")) {
      deleteBooking.mutate(id);
    }
  };

  const handleAddService = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createService.mutateAsync({
        ...serviceForm,
        slug: slugify(serviceForm.name),
      });

      setServiceForm(defaultServiceForm);
    } catch {
      // Mutation handles the error toast.
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
                <p className="text-muted-foreground">
                  Manage services, track new booking requests, and operate the marketplace from one place.
                </p>
              </div>
              <div className="inline-flex items-center gap-3 rounded-2xl border border-border bg-card px-4 py-3 shadow-soft">
                <Bell className="h-5 w-5 text-primary" />
                <div>
                  <div className="text-sm font-semibold text-foreground">{unreadCount} unread notifications</div>
                  <div className="text-xs text-muted-foreground">Every new booking creates an admin alert</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Total Bookings</p>
                    <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
                    <Clock className="w-6 h-6 text-yellow-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold text-foreground">{stats.pending}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
                    <Users className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Active Jobs</p>
                    <p className="text-2xl font-bold text-foreground">{stats.inProgress}</p>
                  </div>
                </div>
              </div>
              <div className="bg-card rounded-xl p-6 shadow-soft border border-border">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold text-foreground">{stats.completed}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
              <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Service Catalog</h2>
                    <p className="text-sm text-muted-foreground">Add, publish, and pause the services users can book.</p>
                  </div>
                  <div className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                    {services.length} services
                  </div>
                </div>

                <form onSubmit={handleAddService} className="grid gap-4 rounded-2xl border border-border bg-muted/30 p-4 md:grid-cols-2">
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Service name</label>
                    <Input
                      value={serviceForm.name}
                      onChange={(e) => setServiceForm((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="Example: Sofa Cleaning"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Starting price</label>
                    <Input
                      value={serviceForm.starting_price}
                      onChange={(e) => setServiceForm((prev) => ({ ...prev, starting_price: e.target.value }))}
                      placeholder="Starts at Rs 699"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="mb-2 block text-sm font-medium text-foreground">Description</label>
                    <Textarea
                      value={serviceForm.description}
                      onChange={(e) => setServiceForm((prev) => ({ ...prev, description: e.target.value }))}
                      placeholder="Describe what this service includes"
                    />
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Icon</label>
                    <Select
                      value={serviceForm.icon_key}
                      onValueChange={(value) => setServiceForm((prev) => ({ ...prev, icon_key: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {serviceIconOptions.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium text-foreground">Display order</label>
                    <Input
                      type="number"
                      value={serviceForm.sort_order}
                      onChange={(e) => setServiceForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
                    />
                  </div>
                  <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={serviceForm.is_active}
                      onChange={(e) => setServiceForm((prev) => ({ ...prev, is_active: e.target.checked }))}
                    />
                    Publish immediately
                  </label>
                  <label className="flex items-center gap-3 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground">
                    <input
                      type="checkbox"
                      checked={serviceForm.is_featured}
                      onChange={(e) => setServiceForm((prev) => ({ ...prev, is_featured: e.target.checked }))}
                    />
                    Mark as featured
                  </label>
                  <div className="md:col-span-2">
                    <Button
                      type="submit"
                      variant="hero"
                      size="lg"
                      className="w-full md:w-auto"
                      disabled={!serviceForm.name || !serviceForm.description || !serviceForm.starting_price || createService.isPending}
                    >
                      <Plus className="h-4 w-4" />
                      {createService.isPending ? "Adding service..." : "Add service"}
                    </Button>
                  </div>
                </form>

                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {servicesLoading ? (
                    Array.from({ length: 4 }).map((_, index) => (
                      <div key={index} className="h-44 rounded-2xl border border-border bg-muted/40 animate-pulse" />
                    ))
                  ) : (
                    services.map((service) => {
                      const Icon = getServiceIcon(service.icon_key);

                      return (
                        <div key={service.id} className="rounded-2xl border border-border bg-card p-5">
                          <div className="mb-4 flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-12 w-12 items-center justify-center rounded-xl gradient-hero">
                                <Icon className="h-5 w-5 text-primary-foreground" />
                              </div>
                              <div>
                                <div className="font-semibold text-foreground">{service.name}</div>
                                <div className="text-sm text-muted-foreground">{service.starting_price}</div>
                              </div>
                            </div>
                            <Badge className={service.is_active ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}>
                              {service.is_active ? "Live" : "Paused"}
                            </Badge>
                          </div>
                          <p className="mb-4 text-sm text-muted-foreground">{service.description}</p>
                          <div className="flex flex-wrap items-center gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() =>
                                updateService.mutate({
                                  id: service.id,
                                  updates: { is_active: !service.is_active },
                                })
                              }
                            >
                              <Eye className="h-4 w-4" />
                              {service.is_active ? "Pause" : "Publish"}
                            </Button>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                updateService.mutate({
                                  id: service.id,
                                  updates: { is_featured: !service.is_featured },
                                })
                              }
                            >
                              <Settings2 className="h-4 w-4" />
                              {service.is_featured ? "Unfeature" : "Feature"}
                            </Button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </section>

              <section className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-foreground">Admin Notifications</h2>
                    <p className="text-sm text-muted-foreground">Fresh booking requests land here automatically.</p>
                  </div>
                  <Badge className="bg-primary/10 text-primary">{unreadCount} unread</Badge>
                </div>

                <div className="space-y-3">
                  {notifications.length === 0 ? (
                    <div className="rounded-2xl border border-dashed border-border bg-muted/20 p-6 text-center text-sm text-muted-foreground">
                      New booking notifications will appear here.
                    </div>
                  ) : (
                    notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`rounded-2xl border p-4 ${
                          notification.is_read ? "border-border bg-background" : "border-primary/20 bg-primary/5"
                        }`}
                      >
                        <div className="mb-2 flex items-start justify-between gap-3">
                          <div>
                            <div className="font-semibold text-foreground">{notification.title}</div>
                            <div className="text-xs text-muted-foreground">
                              {format(new Date(notification.created_at), "PPP p")}
                            </div>
                          </div>
                          {!notification.is_read && (
                            <Badge className="bg-accent text-accent-foreground">New</Badge>
                          )}
                        </div>
                        <p className="mb-3 text-sm text-muted-foreground">{notification.message}</p>
                        {!notification.is_read && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => markAsRead.mutate(notification.id)}
                          >
                            Mark as read
                          </Button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              </section>
            </div>

            <div className="bg-card rounded-xl shadow-soft border border-border overflow-hidden">
              <div className="p-6 border-b border-border">
                <h2 className="text-lg font-semibold text-foreground">All Bookings</h2>
                <p className="text-sm text-muted-foreground">Review incoming requests and move them through fulfillment stages.</p>
              </div>
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
                </div>
              ) : bookings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No bookings yet</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Date & Time</TableHead>
                        <TableHead>Phone</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bookings.map((booking) => (
                        <TableRow key={booking.id}>
                          <TableCell className="font-medium">{booking.service}</TableCell>
                          <TableCell>
                            <div>
                              <p className="font-medium">{booking.customer_name}</p>
                              <p className="text-xs text-muted-foreground truncate max-w-[220px]">
                                {booking.address}
                              </p>
                              {booking.notes && (
                                <p className="mt-1 text-xs text-muted-foreground truncate max-w-[220px]">
                                  {booking.notes}
                                </p>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div>
                              <p>{format(new Date(booking.booking_date), "PP")}</p>
                              <p className="text-xs text-muted-foreground">{booking.booking_time}</p>
                            </div>
                          </TableCell>
                          <TableCell>{booking.phone}</TableCell>
                          <TableCell>
                            <Badge className={`${statusColors[booking.status]} border`}>
                              {statusLabels[booking.status]}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Select
                                value={booking.status}
                                onValueChange={(value) => handleStatusChange(booking.id, value as Enums<"booking_status">)}
                              >
                                <SelectTrigger className="w-[150px] h-8">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="pending">Pending</SelectItem>
                                  <SelectItem value="confirmed">Confirmed</SelectItem>
                                  <SelectItem value="in_progress">In Progress</SelectItem>
                                  <SelectItem value="completed">Completed</SelectItem>
                                  <SelectItem value="cancelled">Cancelled</SelectItem>
                                </SelectContent>
                              </Select>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-destructive hover:text-destructive"
                                onClick={() => handleDelete(booking.id)}
                              >
                                <Trash2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
