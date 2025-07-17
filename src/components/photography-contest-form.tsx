import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputMask from "react-input-mask";
import { Camera, Calendar, User, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";

const formSchema = z.object({
  category: z.string().min(1, "Por favor, selecione uma categoria"),
  cpf: z.string().min(14, "CPF inválido"),
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  birthDate: z.string().min(10, "Data de nascimento é obrigatória"),
  motherName: z.string().min(2, "Nome da mãe é obrigatório"),
  gender: z.string().min(1, "Por favor, selecione o gênero"),
  email: z.string().email("E-mail inválido"),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  { value: "natureza", label: "Natureza" },
  { value: "retrato", label: "Retrato" },
  { value: "paisagem", label: "Paisagem" },
  { value: "arquitetura", label: "Arquitetura" },
  { value: "street", label: "Street Photography" },
  { value: "macro", label: "Macro" },
];

const genders = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
  { value: "prefiro-nao-dizer", label: "Prefiro não dizer" },
];

export function PhotographyContestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const watchedCategory = watch("category");
  const watchedGender = watch("gender");

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular envio do formulário
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Inscrição realizada com sucesso!");
      console.log("Dados enviados:", data);
    } catch (error) {
      toast.error("Erro ao enviar inscrição. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-bg py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <Card className="shadow-card border-0">
          <CardHeader className="text-center pb-8">
            <div className="flex items-center justify-center mb-6">
              <div className="bg-gradient-primary p-3 rounded-full">
                <Camera className="h-8 w-8 text-primary-foreground" />
              </div>
            </div>
            <h1 className="text-4xl font-heading font-bold text-primary mb-2">
              Inscreva-se
            </h1>
            <p className="text-lg text-muted-foreground">
              1ª Edição do Concurso de Fotografia Rubens Artero
            </p>
          </CardHeader>
          
          <CardContent className="space-y-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Categoria */}
              <div className="space-y-2">
                <Label htmlFor="category" className="text-base font-medium">
                  Categoria: <span className="text-required">*</span>
                </Label>
                <Select value={watchedCategory} onValueChange={(value) => setValue("category", value)}>
                  <SelectTrigger className="h-12 shadow-input">
                    <SelectValue placeholder="Selecione uma opção" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-required text-sm">{errors.category.message}</p>
                )}
              </div>

              {/* Dados Pessoais */}
              <div className="space-y-6">
                <h2 className="text-xl font-heading font-semibold text-foreground">
                  Dados Pessoais:
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CPF */}
                  <div className="space-y-2">
                    <Label htmlFor="cpf" className="text-base font-medium">
                      CPF: <span className="text-required">*</span>
                    </Label>
                    <InputMask
                      mask="999.999.999-99"
                      placeholder="000.000.000-00"
                      {...register("cpf")}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="cpf"
                          className="h-12 shadow-input"
                        />
                      )}
                    </InputMask>
                    {errors.cpf && (
                      <p className="text-required text-sm">{errors.cpf.message}</p>
                    )}
                  </div>

                  {/* Nome Completo */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-base font-medium">
                      Nome completo: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="fullName"
                      placeholder="Digite seu nome completo"
                      className="h-12 shadow-input"
                      {...register("fullName")}
                    />
                    {errors.fullName && (
                      <p className="text-required text-sm">{errors.fullName.message}</p>
                    )}
                  </div>

                  {/* Data de Nascimento */}
                  <div className="space-y-2">
                    <Label htmlFor="birthDate" className="text-base font-medium">
                      Data de Nascimento: <span className="text-required">*</span>
                    </Label>
                    <InputMask
                      mask="99/99/9999"
                      placeholder="00/00/0000"
                      {...register("birthDate")}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="birthDate"
                          className="h-12 shadow-input"
                        />
                      )}
                    </InputMask>
                    {errors.birthDate && (
                      <p className="text-required text-sm">{errors.birthDate.message}</p>
                    )}
                  </div>

                  {/* Nome da Mãe */}
                  <div className="space-y-2">
                    <Label htmlFor="motherName" className="text-base font-medium">
                      Nome da Mãe: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="motherName"
                      placeholder="Digite o nome da mãe"
                      className="h-12 shadow-input"
                      {...register("motherName")}
                    />
                    {errors.motherName && (
                      <p className="text-required text-sm">{errors.motherName.message}</p>
                    )}
                  </div>

                  {/* Gênero */}
                  <div className="space-y-2">
                    <Label htmlFor="gender" className="text-base font-medium">
                      Gênero: <span className="text-required">*</span>
                    </Label>
                    <Select value={watchedGender} onValueChange={(value) => setValue("gender", value)}>
                      <SelectTrigger className="h-12 shadow-input">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        {genders.map((gender) => (
                          <SelectItem key={gender.value} value={gender.value}>
                            {gender.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.gender && (
                      <p className="text-required text-sm">{errors.gender.message}</p>
                    )}
                  </div>

                  {/* E-mail */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-base font-medium">
                      E-mail: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="Digite seu e-mail"
                      className="h-12 shadow-input"
                      {...register("email")}
                    />
                    {errors.email && (
                      <p className="text-required text-sm">{errors.email.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Botão de Envio */}
              <div className="flex justify-center pt-6">
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="min-w-[200px] h-12 bg-gradient-primary hover:bg-primary-hover transition-all duration-300"
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Camera className="h-4 w-4 mr-2" />
                      Fazer Inscrição
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}