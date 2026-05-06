
-- Fix: Public storage bucket allows listing — drop broad SELECT policy.
-- Public bucket files remain accessible via their public URLs without needing storage.objects SELECT.
DROP POLICY IF EXISTS "Media public object read" ON storage.objects;

-- Fix: Restrict EXECUTE on SECURITY DEFINER functions.
-- has_role is only used inside RLS policies (runs as definer there), no need for anon/authenticated EXECUTE.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
-- tg_set_updated_at is only used as a trigger, not directly callable.
REVOKE EXECUTE ON FUNCTION public.tg_set_updated_at() FROM PUBLIC, anon, authenticated;

-- Fix: Realtime messages — deny all subscriptions by default (app does not use Realtime).
ALTER TABLE realtime.messages ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Deny all realtime" ON realtime.messages;
CREATE POLICY "Deny all realtime" ON realtime.messages FOR SELECT TO authenticated, anon USING (false);
