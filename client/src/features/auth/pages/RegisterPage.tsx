import { Building2, User, Mail, Lock } from "lucide-react";
import { registerSchema } from "@/features/auth/schemas/auth.schema";
import { toast } from "sonner";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/auth-store";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
type RegisterInput = z.infer<typeof registerSchema>;

export function RegisterPage() {
  const navigate = useNavigate();
  const { register } = useAuthStore();
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] =
    useState<
      | "ceo"
      | "office_staff"
      | "production_manager"
      | "accountant"
    >("office_staff");

  const onSubmit = async (data: RegisterInput) => {
    try {
      await register({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      });
      toast.success("Registration successful! Please login.");
      navigate("/auth/login");
    } catch (err: any) {
      setError(
        err.response?.data?.message || "Registration failed",
      );
      toast.error("Registration failed");
    }
  };

  const form = useForm<RegisterInput>({
    resolver: zodResolver(registerSchema),
    defaultValues: { name: "", email: "", password: "", role: "office_staff" },
  });

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary/5 via-muted/30 to-secondary/20 px-4 py-8 animate-fade-in">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      </div>
      <Card className="w-full max-w-md p-10 shadow-2xl rounded-2xl border border-border/50 animate-slide-up">
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <User className="w-7 h-7" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">3Q Facility</CardTitle>
          <CardDescription className="text-sm/5 text-muted-foreground">Create an account</CardDescription>
        </div>
        <CardContent className="pb-6 space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="name">Name</Label>
              </div>
              <div className="relative">
                <Input
                  id="name"
                  placeholder="Full name"
                  {...form.register("name")}
                  required
                  className="pl-10 h-11"
                />
                {form.formState.errors.name && (
                  <div className="text-destructive text-sm mt-1">{form.formState.errors.name.message}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="email">Email</Label>
              </div>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input
                  id="email"
                  type="email"
                  placeholder="name@company.com"
                  {...form.register("email")}
                  required
                  className="pl-10 h-11"
                />
                {form.formState.errors.email && (
                  <div className="text-destructive text-sm mt-1">{form.formState.errors.email.message}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="password">Password</Label>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/50" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  {...form.register("password")}
                  required
                  className="pl-10 h-11"
                />
                {form.formState.errors.password && (
                  <div className="text-destructive text-sm mt-1">{form.formState.errors.password.message}</div>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Label htmlFor="role">Role</Label>
              </div>
              <div className="relative">
                <select
                  id="role"
                  value={roles}
                  onChange={(e) => setRoles(e.target.value as any)}
                  className="block w-full rounded-md border border-input bg-transparent px-3 py-2 pl-10 h-11 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <option value="ceo">CEO</option>
                  <option value="office_staff">Office Staff</option>
                  <option value="production_manager">Production Manager</option>
                  <option value="accountant">Accountant</option>
                </select>
                {error && (
                  <div className="text-destructive text-sm mt-1">{error}</div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-transparent pt-6 pb-4 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span></span>
            <p className="font-medium">Already have an account?</p>
            <a href="/auth/login" className="underline underline-offset-2 text-primary hover:text-primary/90">Sign in</a>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-px h-px bg-border/50 rounded-full" />
            <a href="/auth/register" className="underline underline-offset-2 text-primary hover:text-primary/90 font-medium">
              Register
            </a>
            <span className="w-px h-px bg-border/50 rounded-full" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}