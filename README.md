# HomeServe Marketplace

HomeServe is a single-admin managed home services marketplace built with Vite, React, TypeScript, Tailwind, shadcn/ui, and Supabase.

Users can:

- browse live services published by the admin
- choose a service, preferred date, and time slot
- sign in or create an account before confirming a booking
- track their own booking requests from the dashboard

The admin can:

- add new services to the catalog
- publish or pause services
- see booking notifications generated automatically for each new request
- update booking status across the fulfillment flow

## Tech Stack

- Vite
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase Auth + Postgres + RLS
- TanStack Query

## Project Structure

- [src/pages/Index.tsx](/Users/simpleplan/Documents/GitHub/home-services/src/pages/Index.tsx): landing page and booking entry point
- [src/components/BookingModal.tsx](/Users/simpleplan/Documents/GitHub/home-services/src/components/BookingModal.tsx): booking flow with auth handoff
- [src/pages/MyBookings.tsx](/Users/simpleplan/Documents/GitHub/home-services/src/pages/MyBookings.tsx): user booking history
- [src/pages/AdminDashboard.tsx](/Users/simpleplan/Documents/GitHub/home-services/src/pages/AdminDashboard.tsx): admin service management, notifications, and bookings
- [src/contexts/AuthContext.tsx](/Users/simpleplan/Documents/GitHub/home-services/src/contexts/AuthContext.tsx): auth bootstrap and admin role check
- [src/hooks/useServices.ts](/Users/simpleplan/Documents/GitHub/home-services/src/hooks/useServices.ts): service catalog queries and mutations
- [src/hooks/useBookings.ts](/Users/simpleplan/Documents/GitHub/home-services/src/hooks/useBookings.ts): booking queries and mutations
- [supabase/migrations](/Users/simpleplan/Documents/GitHub/home-services/supabase/migrations): schema and RLS migrations

## Setup

1. Install dependencies:

```sh
npm install
```

2. Start the app locally:

```sh
npm run dev
```

3. Run checks:

```sh
npm run lint
npm test
npm run build
```

## Supabase Notes

This app expects:

- `user_roles` for admin access
- `services` for the public catalog
- `bookings` for user requests
- `admin_notifications` for marketplace alerts

The migration [supabase/migrations/20260311093000_marketplace_services_notifications.sql](/Users/simpleplan/Documents/GitHub/home-services/supabase/migrations/20260311093000_marketplace_services_notifications.sql) adds service management and admin booking notifications on top of the initial auth and booking schema.

## Current Validation State

I could not execute `lint`, `test`, or `build` in the current workspace because local dependencies are not installed yet. Run `npm install` first, then the standard scripts above.
