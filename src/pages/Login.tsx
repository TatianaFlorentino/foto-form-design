import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Eye, EyeOff, LogIn, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
});

type LoginData = z.infer<typeof loginSchema>;

export function Login() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsSubmitting(true);
    
    try {
      // Simular autenticação
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success("Login realizado com sucesso!");
      // Redirecionar para o workspace
      navigate("/workspace");
    } catch (error) {
      toast.error("Erro ao fazer login. Verifique suas credenciais.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-card border-0 backdrop-blur-sm bg-card/95">
          <CardHeader className="text-center pb-6">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-primary p-4 rounded-full shadow-lg animate-pulse">
                <Camera className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-3xl font-heading font-bold text-primary mb-2 tracking-tight">
              Acesso do Participante
            </h1>
            <p className="text-muted-foreground">
              Entre com suas credenciais para acessar sua área
            </p>
          </CardHeader>
          
          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {/* E-mail */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium">
                  E-mail
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className="h-12 shadow-input bg-background/50 hover:bg-background/80 transition-colors"
                  {...register("email")}
                />
                {errors.email && (
                  <p className="text-required text-sm flex items-center gap-1">
                    <span className="text-xs">⚠</span> {errors.email.message}
                  </p>
                )}
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Digite sua senha"
                    className="h-12 shadow-input bg-background/50 hover:bg-background/80 transition-colors pr-12"
                    {...register("password")}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-12 px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <Eye className="h-4 w-4 text-muted-foreground" />
                    )}
                  </Button>
                </div>
                {errors.password && (
                  <p className="text-required text-sm flex items-center gap-1">
                    <span className="text-xs">⚠</span> {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-12 bg-gradient-primary hover:opacity-90 text-primary-foreground font-medium transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Entrando...
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <LogIn className="h-4 w-4" />
                    Entrar
                  </div>
                )}
              </Button>
            </form>

            <div className="text-center pt-4 border-t border-border/50">
              <p className="text-sm text-muted-foreground">
                Não tem uma conta?{" "}
                <button
                  onClick={() => navigate("/")}
                  className="text-primary hover:underline font-medium"
                >
                  Faça sua inscrição
                </button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}