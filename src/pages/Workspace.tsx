import { useState } from "react";
import { Camera, Upload, Eye, Edit, Trash2, User, Mail, Phone, MapPin, Calendar, FileText, LogOut, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

interface Photo {
  id: string;
  title: string;
  description: string;
  category: string;
  location: string;
  equipment: string;
  date: string;
  image: string;
  status: "pending" | "approved" | "rejected";
}

// Dados de exemplo
const mockParticipant = {
  name: "João Silva",
  email: "joao.silva@email.com",
  phone: "(62) 99999-9999",
  category: "Profissional",
  cpf: "123.456.789-10",
  city: "Goiânia - GO",
  registrationDate: "15/01/2024",
};

const mockPhotos: Photo[] = [
  {
    id: "1",
    title: "Pôr do Sol no Cerrado",
    description: "Belíssimo pôr do sol capturado no cerrado goiano",
    category: "Paisagem",
    location: "Chapada dos Veadeiros",
    equipment: "Canon EOS R5",
    date: "2024-01-10",
    image: "/placeholder.svg",
    status: "approved"
  },
  {
    id: "2",
    title: "Águas Cristalinas",
    description: "Cachoeira do Rio Claro com suas águas cristalinas",
    category: "Natureza",
    location: "Rio Claro - GO",
    equipment: "Sony A7III",
    date: "2024-01-08",
    image: "/placeholder.svg",
    status: "pending"
  }
];

export function Workspace() {
  const [photos, setPhotos] = useState<Photo[]>(mockPhotos);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    setIsUploading(true);
    try {
      // Simular upload
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast.success("Foto enviada com sucesso!");
    } catch (error) {
      toast.error("Erro ao enviar foto. Tente novamente.");
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogout = () => {
    toast.success("Logout realizado com sucesso!");
    navigate("/login");
  };

  const getStatusBadge = (status: Photo["status"]) => {
    switch (status) {
      case "approved":
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Aprovada</Badge>;
      case "rejected":
        return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Rejeitada</Badge>;
      default:
        return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pendente</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg">
      {/* Header */}
      <header className="bg-card/95 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Camera className="h-6 w-6 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-heading font-semibold text-foreground">
                  Concurso de Fotografia
                </h1>
                <p className="text-sm text-muted-foreground">
                  Área do Participante
                </p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-muted-foreground">
                Olá, {mockParticipant.name}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={handleLogout}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs defaultValue="photos" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 max-w-md">
            <TabsTrigger value="photos" className="flex items-center gap-2">
              <Camera className="h-4 w-4" />
              Minhas Fotos
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Meus Dados
            </TabsTrigger>
          </TabsList>

          {/* Aba Fotos */}
          <TabsContent value="photos" className="space-y-6">
            {/* Cabeçalho das fotos */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div>
                <h2 className="text-2xl font-heading font-bold text-foreground">
                  Minhas Fotos ({photos.length}/10)
                </h2>
                <p className="text-muted-foreground">
                  Gerencie suas fotos do concurso
                </p>
              </div>
              
              <div className="flex items-center gap-3">
                {/* Botões de visualização */}
                <div className="flex border border-border/50 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>

                {/* Upload */}
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleUpload}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    disabled={isUploading}
                  />
                  <Button
                    disabled={isUploading}
                    className="bg-gradient-primary hover:opacity-90 text-primary-foreground"
                  >
                    {isUploading ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                        Enviando...
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Enviar Foto
                      </div>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Grid/Lista de fotos */}
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="aspect-video bg-muted relative">
                      <img
                        src={photo.image}
                        alt={photo.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-2 right-2">
                        {getStatusBadge(photo.status)}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
                        {photo.title}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                        {photo.description}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-muted-foreground">
                          {photo.location}
                        </span>
                        <div className="flex gap-1">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedPhoto(photo)}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-4xl">
                              <DialogHeader>
                                <DialogTitle>{photo.title}</DialogTitle>
                              </DialogHeader>
                              <div className="space-y-4">
                                <img
                                  src={photo.image}
                                  alt={photo.title}
                                  className="w-full rounded-lg"
                                />
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                  <div>
                                    <strong>Categoria:</strong> {photo.category}
                                  </div>
                                  <div>
                                    <strong>Local:</strong> {photo.location}
                                  </div>
                                  <div>
                                    <strong>Equipamento:</strong> {photo.equipment}
                                  </div>
                                  <div>
                                    <strong>Data:</strong> {new Date(photo.date).toLocaleDateString()}
                                  </div>
                                </div>
                                <div>
                                  <strong>Descrição:</strong>
                                  <p className="mt-1 text-muted-foreground">{photo.description}</p>
                                </div>
                              </div>
                            </DialogContent>
                          </Dialog>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {photos.map((photo) => (
                  <Card key={photo.id} className="hover:shadow-lg transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <div className="w-24 h-24 bg-muted rounded-lg overflow-hidden flex-shrink-0">
                          <img
                            src={photo.image}
                            alt={photo.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="font-semibold text-foreground">
                              {photo.title}
                            </h3>
                            {getStatusBadge(photo.status)}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {photo.description}
                          </p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>{photo.location}</span>
                            <span>{photo.equipment}</span>
                            <span>{new Date(photo.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm">
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-red-600 hover:text-red-700">
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Aba Perfil */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Dados da Inscrição
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  Visualize seus dados de inscrição (não é possível editar)
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      Nome Completo
                    </Label>
                    <Input value={mockParticipant.name} readOnly className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      E-mail
                    </Label>
                    <Input value={mockParticipant.email} readOnly className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      Telefone
                    </Label>
                    <Input value={mockParticipant.phone} readOnly className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Camera className="h-4 w-4 text-muted-foreground" />
                      Categoria
                    </Label>
                    <Input value={mockParticipant.category} readOnly className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      CPF
                    </Label>
                    <Input value={mockParticipant.cpf} readOnly className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      Cidade
                    </Label>
                    <Input value={mockParticipant.city} readOnly className="bg-muted/50" />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-sm font-medium flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      Data de Inscrição
                    </Label>
                    <Input value={mockParticipant.registrationDate} readOnly className="bg-muted/50" />
                  </div>
                </div>

                <div className="pt-4 border-t border-border/50">
                  <p className="text-sm text-muted-foreground text-center">
                    Para alterar seus dados, entre em contato com a organização do concurso.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}