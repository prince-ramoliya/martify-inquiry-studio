import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Seo } from "@/components/Seo";

const AdminLogin = () => {
  const { signIn, user, isAdmin, loading: authLoading } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminExists, setAdminExists] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.from("user_roles").select("id", { count: "exact", head: true }).eq("role", "admin")
      .then(({ count }) => setAdminExists((count ?? 0) > 0));
  }, []);

  useEffect(() => {
    if (!authLoading && user && isAdmin) nav("/admin", { replace: true });
  }, [authLoading, user, isAdmin, nav]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) toast.error(error);
    else toast.success("Signed in");
  };

  return (
    <>
      <Seo title="Admin Login — MARTIFY" description="Admin access" />
      <div className="min-h-screen flex items-center justify-center bg-gradient-soft p-6">
        <div className="w-full max-w-md bg-card rounded-3xl shadow-elev p-8">
          <h1 className="font-display font-extrabold text-2xl mb-2">Admin Login</h1>
          <p className="text-sm text-muted-foreground mb-6">Sign in to manage content.</p>
          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" autoComplete="email" required value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" autoComplete="current-password" required value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <Button type="submit" variant="hero" size="lg" className="w-full" disabled={loading}>
              {loading ? "Signing in…" : "Sign in"}
            </Button>
          </form>
          {adminExists === false && (
            <div className="mt-6 p-4 rounded-xl bg-accent text-sm">
              No admin exists yet. <Link to="/admin/setup" className="font-bold underline">Create the first admin</Link>.
            </div>
          )}
          <Link to="/" className="block text-center text-sm text-muted-foreground mt-6 hover:text-primary">← Back to site</Link>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
