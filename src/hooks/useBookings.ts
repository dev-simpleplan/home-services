import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Enums, Tables } from "@/integrations/supabase/types";

export type Booking = Tables<"bookings">;

export interface CreateBookingData {
  service_id: string;
  service: string;
  booking_date: string;
  booking_time: string;
  customer_name: string;
  phone: string;
  address: string;
  notes?: string | null;
}

export const useBookings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const bookingsQuery = useQuery({
    queryKey: ["bookings", user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from("bookings")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!user,
  });

  const createBooking = useMutation({
    mutationFn: async (bookingData: CreateBookingData) => {
      if (!user) throw new Error("You must be logged in to create a booking");

      const { data, error } = await supabase
        .from("bookings")
        .insert({
          ...bookingData,
          user_id: user.id,
        })
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking created successfully!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateBookingStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: Enums<"booking_status"> }) => {
      const { data, error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking status updated!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("bookings")
        .delete()
        .eq("id", id);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      toast.success("Booking deleted!");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    bookings: bookingsQuery.data ?? [],
    isLoading: bookingsQuery.isLoading,
    error: bookingsQuery.error,
    createBooking,
    updateBookingStatus,
    deleteBooking,
  };
};
