-- Marketplace services managed by admin
CREATE TABLE public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL UNIQUE,
    slug TEXT NOT NULL UNIQUE,
    description TEXT NOT NULL,
    starting_price TEXT NOT NULL,
    icon_key TEXT NOT NULL DEFAULT 'wrench',
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_active BOOLEAN NOT NULL DEFAULT true,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER update_services_updated_at
    BEFORE UPDATE ON public.services
    FOR EACH ROW
    EXECUTE FUNCTION public.update_updated_at_column();

CREATE POLICY "Anyone can view active services"
    ON public.services FOR SELECT
    USING (is_active = true);

CREATE POLICY "Admins can view all services"
    ON public.services FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can create services"
    ON public.services FOR INSERT
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update services"
    ON public.services FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete services"
    ON public.services FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

ALTER TABLE public.bookings
    ADD COLUMN service_id UUID REFERENCES public.services(id) ON DELETE SET NULL;

CREATE TABLE public.admin_notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.admin_notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view notifications"
    ON public.admin_notifications FOR SELECT
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update notifications"
    ON public.admin_notifications FOR UPDATE
    USING (public.has_role(auth.uid(), 'admin'))
    WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete notifications"
    ON public.admin_notifications FOR DELETE
    USING (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.handle_new_booking_notification()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.admin_notifications (booking_id, title, message)
    VALUES (
        NEW.id,
        'New booking request',
        NEW.customer_name || ' requested ' || NEW.service || ' on ' || NEW.booking_date || ' at ' || NEW.booking_time
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_booking_created_notify_admin
    AFTER INSERT ON public.bookings
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_new_booking_notification();

INSERT INTO public.services (name, slug, description, starting_price, icon_key, sort_order, is_active, is_featured)
VALUES
    ('Electrician', 'electrician', 'Wiring fixes, installations, appliance points, and safety checks handled by verified professionals.', 'Starts at Rs 199', 'zap', 1, true, true),
    ('Plumber', 'plumber', 'Leak repairs, pipe fitting, drain cleaning, bathroom fittings, and urgent plumbing visits.', 'Starts at Rs 249', 'droplets', 2, true, true),
    ('Home Cleaning', 'home-cleaning', 'Deep cleaning for apartments and homes with trained staff and checklist-based delivery.', 'Starts at Rs 499', 'sparkles', 3, true, true),
    ('AC Service', 'ac-service', 'Routine AC servicing, installation, gas charging, diagnosis, and repair support.', 'Starts at Rs 349', 'air-vent', 4, true, true),
    ('Painting', 'painting', 'Interior and exterior painting with surface prep, consultation, and finish options.', 'Starts at Rs 15/sqft', 'paintbrush', 5, true, false),
    ('Pest Control', 'pest-control', 'Targeted pest treatment for termites, insects, and recurring household infestations.', 'Starts at Rs 799', 'bug', 6, true, false),
    ('Appliance Repair', 'appliance-repair', 'Repair support for washing machines, refrigerators, microwaves, and small appliances.', 'Starts at Rs 299', 'wrench', 7, true, false),
    ('Carpentry', 'carpentry', 'Furniture fixes, modular fittings, hinge work, and custom carpentry jobs.', 'Starts at Rs 399', 'hammer', 8, true, false);
