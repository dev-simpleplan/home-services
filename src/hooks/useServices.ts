import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Tables, TablesInsert, TablesUpdate } from "@/integrations/supabase/types";
import { toast } from "sonner";

export type Service = Tables<"services">;
export type CreateServiceData = Omit<TablesInsert<"services">, "id" | "created_at" | "updated_at">;

export const useServices = () => {
  const { isAdmin } = useAuth();
  const queryClient = useQueryClient();

  const servicesQuery = useQuery({
    queryKey: ["services", isAdmin],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("services")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("name", { ascending: true });

      if (error) throw error;
      return data;
    },
  });

  const createService = useMutation({
    mutationFn: async (serviceData: CreateServiceData) => {
      const { data, error } = await supabase
        .from("services")
        .insert(serviceData)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service added");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  const updateService = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: TablesUpdate<"services"> }) => {
      const { data, error } = await supabase
        .from("services")
        .update(updates)
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["services"] });
      toast.success("Service updated");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return {
    services: servicesQuery.data ?? [],
    isLoading: servicesQuery.isLoading,
    error: servicesQuery.error,
    createService,
    updateService,
  };
};
