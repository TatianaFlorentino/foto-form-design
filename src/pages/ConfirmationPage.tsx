import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, Mail, Eye, EyeOff, Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner";

export function ConfirmationPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [countdown, setCountdown] = useState(10);
  const [showPassword, setShowPassword] = useState(false);
  
  // Dados simulados vindos da inscrição
  const participantName = searchParams.get("name") || "Participante";
  const participantEmail = searchParams.get("email") || "exemplo@email.com";
  const provisionalPassword = `INS${String(Date.now()).slice(-7)}`;

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/login");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    toast.success(`${label} copiado para a área de transferência!`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background/80 to-secondary/10 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl shadow-2xl border-0 bg-card/80 backdrop-blur-sm">
        <CardHeader className="text-center space-y-6 pb-8">
          <div className="mx-auto w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          
          <div className="space-y-2">
            <CardTitle className="text-2xl font-bold text-primary">
              Inscrição Confirmada!
            </CardTitle>
            <CardDescription className="text-base">
              1ª Edição do Concurso de Fotografia Rubens Artero
            </CardDescription>
          </div>
          
          <Badge variant="secondary" className="text-sm font-medium">
            Inscrição Nº #{String(Date.now()).slice(-8)}
          </Badge>
        </CardHeader>

        <CardContent className="space-y-8">
          {/* Saudação personalizada */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">
              Prezado(a) {participantName},
            </h3>
            <p className="text-muted-foreground">
              É com grande satisfação que confirmamos o recebimento da sua inscrição no 
              <strong> 1º Edição do Concurso de Fotografia Rubens Artero</strong>. 
              Agradecemos seu interesse e entusiasmo em compartilhar sua visão conosco.
            </p>
          </div>

          <Separator />

          {/* Status da inscrição */}
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <div className="flex items-center gap-2 text-green-800 dark:text-green-200">
              <CheckCircle className="w-5 h-5" />
              <span className="font-medium">Sua inscrição foi registrada com sucesso.</span>
            </div>
          </div>

          {/* Acesso ao portal */}
          <div className="space-y-4">
            <h4 className="font-semibold text-lg">Acesse o Portal do Candidato</h4>
            <p className="text-muted-foreground text-sm">
              Para enviar e gerenciar suas fotos, utilize as credenciais abaixo:
            </p>
            
            <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
              {/* Email */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Login:</label>
                <div className="flex items-center gap-2 p-3 bg-background rounded border">
                  <Mail className="w-4 h-4 text-muted-foreground" />
                  <span className="flex-1 font-mono">{participantEmail}</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(participantEmail, "Login")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Senha */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Senha Provisória:</label>
                <div className="flex items-center gap-2 p-3 bg-background rounded border">
                  <span className="flex-1 font-mono">
                    {showPassword ? provisionalPassword : "••••••••••"}
                  </span>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(provisionalPassword, "Senha")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-blue-800 dark:text-blue-200 text-sm">
                <strong>Importante:</strong> Depois do primeiro login será necessário criar uma senha nova para sua segurança.
              </p>
            </div>
          </div>

          <Separator />

          {/* Botões de ação */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button 
              onClick={() => navigate("/login")} 
              className="flex-1"
              size="lg"
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Acessar Portal do Candidato
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              size="lg"
            >
              Voltar ao Início
            </Button>
          </div>

          {/* Contador de redirecionamento */}
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Redirecionamento automático em <strong>{countdown}</strong> segundos...
            </p>
          </div>

          {/* Rodapé informativo */}
          <div className="text-center text-xs text-muted-foreground italic border-t pt-4">
            Esta é uma notificação automática. As respostas enviadas para este endereço de e-mail não serão monitoradas.
          </div>
        </CardContent>
      </Card>
    </div>
  );
}