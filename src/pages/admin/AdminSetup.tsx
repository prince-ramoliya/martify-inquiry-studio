import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Seo } from "@/components/Seo";

const AdminSetup = () => {
  const { signUp, signIn, user, refreshRole } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin")
      .then(({ count }) => setAdminExists((count ?? 0) > 0));
  }, []);

  const claim = async (uid: string) => {
    const { error } = await supabase.from("user_roles").insert({ user_id: uid, role: "admin" });
    if (error) throw new Error(error.message);
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (adminExists) { toast.error("An admin already exists."); return; }
    setLoading(true);
    try {
      // Try sign up
      const { error: signUpErr } = await signUp(email, password);
      // Then sign in (works whether new user was created or already existed)
      const { error: signInErr } = await signIn(email, password);
      if (signInErr && signUpErr) throw new Error(signUpErr || signInErr);

      // Get fresh session
      const { data: { user: u } } = await supabase.auth.getUser();
      if (!u) throw new Error("Could not establish session. If email confirmation is on, disable it in Cloud → Auth.");
      await claim(u.id);
      await refreshRole();
      toast.success("Admin account created");
      nav("/admin", { replace: true });
    } catch (err: any) {
      toast.error(err?.message ?? "Could not create admin");
    } finally { setLoading(false); }
  };

  return (
    <>
      <Seo title="Admin Setup — MARTIFY" description="Create the first admin" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="w-full max-w-md bg-card rounded-3xl shadow-elev p-8">
          <h1 className="font-display font-extrabold text-2xl mb-2">Create First Admin</h1>
          <p className="text-sm text-muted-foreground mb-6">
            This page is only available until the first admin account is created. After that, it stops working automatically.
          </p>
          {adminExists ? (
            <div className="p-4 rounded-xl bg-muted text-sm">
              An admin already exists. <Link to="/admin/login" className="font-bold underline">Go to login</Link>.
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-4">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div>
                <Label htmlFor="password">Password (min 6 chars)</Label>
                <Input id="password" type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
                {loading ? "Creating…" : "Create admin account"}
              </Button>
            </form>
          )}
          <Link to="/" className="block text-center text-sm text-muted-foreground mt-6 hover:text-primary">← Back to site</Link>
        </div>
      </div>
    </>
  );
};

export default AdminSetup;
