import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuthStore } from "@/store/auth-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { loginSchema } from "@/features/auth/schemas/auth.schema";
import { Building2, ShieldCheck, Mail, Lock } from "lucide-react";

type LoginInput = z.infer<typeof loginSchema>;

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [error, setError] = useState("");

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
  });

  const onSubmit = async (data: LoginInput) => {
    setError("");
    try {
      await login(data);
      toast.success("Welcome back!");
      navigate("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password");
      toast.error("Login failed");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-primary/5 via-muted/30 to-secondary/20 px-4 py-8 animate-fade-in">
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/20 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-secondary/20 blur-[120px] pointer-events-none" />
      </div>
      <Card className="w-full max-w-md p-10 shadow-2xl rounded-2xl border border-border/50 animate-slide-up">
        <div className="flex flex-col items-center justify-center text-center space-y-3 mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary text-primary-foreground shadow-lg shadow-primary/20">
            <Building2 className="w-7 h-7" />
          </div>
          <CardTitle className="text-3xl font-bold tracking-tight">3Q Facility</CardTitle>
          <CardDescription className="text-sm/5 text-muted-foreground">
            Sign in to your dashboard
          </CardDescription>
        </div>
        <CardContent className="pb-6 space-y-6">
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
            {error && (
              <div className="flex items-center gap-2 rounded-lg bg-destructive/10 border border-destructive/20 p-3 text-destructive text-sm">
                <ShieldCheck className="w-4 h-4" />
                <span>{error}</span>
              </div>
            )}
            <Button
              type="button"
              onClick={() => navigate("/auth/register")}
              className="w-full h-11 rounded-lg font-medium mb-2 bg-primary text-primary-foreground"
            >
              Create Account
            </Button>
            <Button type="submit" className="w-full h-11 rounded-lg font-medium">
              Sign In
            </Button>
          </form>
        </CardContent>
        <CardFooter className="border-t border-border/50 bg-transparent pt-6 pb-4 flex flex-col items-center gap-3 text-center">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <span className="w-px h-px bg-border/50 rounded-full" />
            <p className="font-medium">Demo credentials</p>
            <span className="w-px h-px bg-border/50 rounded-full" />
          </div>
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-muted-foreground">CEO</p>
            <p className="text-xs font-medium text-muted-foreground">·</p>
            <p className="text-xs font-medium text-muted-foreground">Office Staff</p>
            <p className="text-xs font-medium text-muted-foreground">·</p>
            <p className="text-xs font-medium text-muted-foreground">Production Manager</p>
            <p className="text-xs font-medium text-muted-foreground">·</p>
            <p className="text-xs font-medium text-muted-foreground">Accountant</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-px h-px bg-border/50 rounded-full" />
            <a href="/auth/register" className="underline underline-offset-2 text-primary hover:text-primary/90 font-medium">
              Register
            </a>
            <span className="w-px h-px bg-border/50 rounded-full" />
          </div>
          <div className="flex items-center justify-between w-full text-[10px] font-medium text-muted-foreground uppercase tracking-widest">
            <span>3Q Facility Dashboard</span>
            <ShieldCheck className="w-3 h-3" />
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}