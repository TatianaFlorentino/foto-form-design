import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputMask from "react-input-mask";
import { Camera, Calendar, User, Mail, Phone, MapPin, Instagram, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";

const formSchema = z.object({
  category: z.string().min(1, "Por favor, selecione uma categoria"),
  cpf: z.string().min(14, "CPF inválido"),
  fullName: z.string().min(2, "Nome completo é obrigatório"),
  birthDate: z.string().min(10, "Data de nascimento é obrigatória"),
  motherName: z.string().min(2, "Nome da mãe é obrigatório"),
  gender: z.string().min(1, "Por favor, selecione o gênero"),
  email: z.string().email("E-mail inválido"),
  phone: z.string().min(1, "Telefone é obrigatório"),
  instagram: z.string().optional(),
  howDidYouKnow: z.string().min(1, "Por favor, selecione como ficou sabendo"),
  // Endereço
  cep: z.string().min(1, "CEP é obrigatório"),
  address: z.string().min(1, "Logradouro é obrigatório"),
  addressNumber: z.string().min(1, "Número é obrigatório"),
  complement: z.string().optional(),
  neighborhood: z.string().min(1, "Bairro é obrigatório"),
  city: z.string().min(1, "Cidade é obrigatória"),
  // Dados Bancários
  bank: z.string().min(1, "Banco é obrigatório"),
  accountType: z.string().min(1, "Tipo da conta é obrigatório"),
  agency: z.string().min(1, "Agência é obrigatória"),
  account: z.string().min(1, "Conta é obrigatória"),
  // Termos
  imageRights: z.boolean().refine(val => val === true, "Você deve aceitar a cessão de direitos"),
  privacyTerms: z.boolean().refine(val => val === true, "Você deve aceitar os termos de privacidade"),
});

type FormData = z.infer<typeof formSchema>;

const categories = [
  { value: "profissional", label: "Profissional" },
  { value: "amador", label: "Amador" },
];

const genders = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
  { value: "prefiro-nao-dizer", label: "Prefiro não dizer" },
];

const howDidYouKnowOptions = [
  { value: "redes-sociais", label: "Redes Sociais" },
  { value: "amigos", label: "Amigos/Familiares" },
  { value: "site", label: "Site Oficial" },
  { value: "imprensa", label: "Imprensa" },
  { value: "outros", label: "Outros" },
];

const bankOptions = [
  { value: "banco-brasil", label: "Banco do Brasil" },
  { value: "caixa", label: "Caixa Econômica Federal" },
  { value: "bradesco", label: "Bradesco" },
  { value: "itau", label: "Itaú" },
  { value: "santander", label: "Santander" },
  { value: "nubank", label: "Nubank" },
  { value: "inter", label: "Banco Inter" },
  { value: "outros", label: "Outros" },
];

const accountTypes = [
  { value: "corrente", label: "Conta Corrente" },
  { value: "poupanca", label: "Conta Poupança" },
  { value: "pagamento", label: "Conta de Pagamento" },
];

export function PhotographyContestForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const imageRightsText = `CESSÃO DE DIREITOS DE USO DE IMAGEM

Por meio do presente instrumento, eu,______________________________________________________,
RG:______________ , CPF:_________________ , autorizo a GOIÁS TURISMO – AGÊNCIA ESTADUAL DE TURISMO, autarquia estadual, dotada de personalidade jurídica de direito público interno, criada pela Lei Estadual nº 13.550, de 11 de novembro de 1999, com estrutura alterada pela Lei nº 21.792, de 16 de fevereiro de 2023, regulamentada pelo Decreto Estadual nº 10.218, de 16 de fevereiro de 2023, inscrita no CNPJ/MF sob o nº 03.549.463/0001-03, com sede na Rua 30, esquina com a Rua 4, Centro, Goiânia, Goiás, CEP.: 74.015-180, a utilizar a(s) imagem(s) enviada(s) para concorrer a "1ª EDIÇÃO DO CONCURSO DE FOTOGRAFIA RUBENS ARTERO", independente da mídia utilizada, de caráter institucional, por tempo indeterminado.

A Goiás Turismo poderá utilizar o material para FINS NÃO COMERCIAIS com finalidade de divulgação ou não, modificando, reproduzindo, editando e/ou alterando, sem limite de quantidade de uso e/ou veiculação, fixando em qualquer suporte existente, seja eletrônico, digital, impresso, editorial e/ou em composições multimídia, adaptando para qualquer idioma, bem como veiculando por todos os meios de sinais e mídias, mediante emprego de qualquer tecnologia (analógica, digital, com ou sem fio e outras), não limitados a internet, cabo ou satélite, através de qualquer forma de transmissão de sinais/dados, exposição, inclusão em base de dados, em terminais móveis, através de qualquer processo de comunicação público ou privado, incluindo exibição em videowall e vôos nacionais e internacionais, e quaisquer outras modalidades de utilização existentes ou que venham a ser inventadas, próprios ou de terceiros, dentro e fora do território nacional, podendo, inclusive, disponibilizar e/ou ceder à terceiros, sendo tudo sem qualquer remuneração, pelo prazo de proteção legal previsto na Lei 9.610/1998.

A presente autorização é feita em caráter definitivo e irrevogável, de forma gratuita, sem ônus de qualquer espécie a Goiás Turismo.`;

  const privacyTermsText = `TERMO DE PRIVACIDADE, POLÍTICA DE USO E TRATAMENTO DE DADOS (LGPD)

O Estado de Goiás, por meio da Goiás Turismo, está comprometido com a proteção dos dados pessoais dos participantes do "1ª Edição do Concurso de Fotografia Rubens Artero", em conformidade com a Lei Geral de Proteção de Dados Pessoais (LGPD - Lei nº 13.709/2018) e demais normativas aplicáveis.

COLETA E FINALIDADE DOS DADOS
Os dados pessoais coletados através deste formulário de inscrição serão utilizados exclusivamente para:
- Processar a inscrição no concurso de fotografia;
- Realizar comunicações relacionadas ao concurso;
- Divulgar os resultados do concurso;
- Cumprimento de obrigações legais e regulamentares.

DADOS COLETADOS
São coletadas as seguintes categorias de dados pessoais: nome completo, CPF, data de nascimento, nome da mãe, gênero, e-mail, telefone, endereço completo, dados bancários e demais informações fornecidas no formulário de inscrição.

BASE LEGAL
O tratamento dos dados pessoais está fundamentado no legítimo interesse da Administração Pública para a realização do concurso cultural, conforme art. 7º, IX da LGPD.

COMPARTILHAMENTO
Os dados poderão ser compartilhados com órgãos da Administração Pública, quando necessário para o cumprimento de finalidades específicas do concurso ou por determinação legal.

RETENÇÃO
Os dados serão mantidos pelo período necessário para cumprimento das finalidades descritas e das obrigações legais aplicáveis.

DIREITOS DO TITULAR
Você possui os seguintes direitos: confirmação da existência de tratamento, acesso aos dados, correção de dados incompletos/inexatos, anonimização/bloqueio/eliminação, portabilidade, eliminação dos dados tratados com consentimento, informação sobre compartilhamento, informação sobre possibilidade de não fornecer consentimento e revogação do consentimento.

CONTATO
Para exercer seus direitos ou esclarecer dúvidas sobre o tratamento de dados, entre em contato através dos canais oficiais da Goiás Turismo.

Ao aceitar este termo, você declara estar ciente e concordar com as práticas descritas nesta Política de Privacidade.`;
  
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
  const watchedHowDidYouKnow = watch("howDidYouKnow");
  const watchedBank = watch("bank");
  const watchedAccountType = watch("accountType");
  const watchedImageRights = watch("imageRights");
  const watchedPrivacyTerms = watch("privacyTerms");

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
      <div className="max-w-4xl mx-auto">
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
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              {/* Categoria */}
              <div className="space-y-4">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Categoria
                </h2>
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
              </div>

              {/* Dados Pessoais */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Dados Pessoais
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

                  {/* Telefone */}
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-base font-medium">
                      Telefone: <span className="text-required">*</span>
                    </Label>
                    <InputMask
                      mask="(99) 99999-9999"
                      placeholder="(00) 00000-0000"
                      {...register("phone")}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="phone"
                          className="h-12 shadow-input"
                        />
                      )}
                    </InputMask>
                    {errors.phone && (
                      <p className="text-required text-sm">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Instagram */}
                  <div className="space-y-2">
                    <Label htmlFor="instagram" className="text-base font-medium">
                      Instagram:
                    </Label>
                    <div className="relative">
                      <Input
                        id="instagram"
                        placeholder="@"
                        className="h-12 shadow-input pl-3"
                        {...register("instagram")}
                      />
                    </div>
                  </div>
                </div>

                {/* Como ficou sabendo */}
                <div className="space-y-2">
                  <Label htmlFor="howDidYouKnow" className="text-base font-medium">
                    Como ficou sabendo do concurso? <span className="text-required">*</span>
                  </Label>
                  <Select value={watchedHowDidYouKnow} onValueChange={(value) => setValue("howDidYouKnow", value)}>
                    <SelectTrigger className="h-12 shadow-input">
                      <SelectValue placeholder="Selecione uma opção" />
                    </SelectTrigger>
                    <SelectContent>
                      {howDidYouKnowOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.howDidYouKnow && (
                    <p className="text-required text-sm">{errors.howDidYouKnow.message}</p>
                  )}
                </div>
              </div>

              {/* Endereço */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Endereço
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* CEP */}
                  <div className="space-y-2">
                    <Label htmlFor="cep" className="text-base font-medium">
                      CEP: <span className="text-required">*</span>
                    </Label>
                    <InputMask
                      mask="99999-999"
                      placeholder="00000-000"
                      {...register("cep")}
                    >
                      {(inputProps: any) => (
                        <Input
                          {...inputProps}
                          id="cep"
                          className="h-12 shadow-input"
                        />
                      )}
                    </InputMask>
                    {errors.cep && (
                      <p className="text-required text-sm">{errors.cep.message}</p>
                    )}
                  </div>

                  {/* Logradouro */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base font-medium">
                      Logradouro: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="address"
                      placeholder="Digite o logradouro"
                      className="h-12 shadow-input"
                      {...register("address")}
                    />
                    {errors.address && (
                      <p className="text-required text-sm">{errors.address.message}</p>
                    )}
                  </div>

                  {/* Número */}
                  <div className="space-y-2">
                    <Label htmlFor="addressNumber" className="text-base font-medium">
                      Número: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="addressNumber"
                      placeholder="Digite o número"
                      className="h-12 shadow-input"
                      {...register("addressNumber")}
                    />
                    {errors.addressNumber && (
                      <p className="text-required text-sm">{errors.addressNumber.message}</p>
                    )}
                  </div>

                  {/* Complemento */}
                  <div className="space-y-2">
                    <Label htmlFor="complement" className="text-base font-medium">
                      Complemento:
                    </Label>
                    <Input
                      id="complement"
                      placeholder="Apt, Bloco, etc."
                      className="h-12 shadow-input"
                      {...register("complement")}
                    />
                  </div>

                  {/* Bairro */}
                  <div className="space-y-2">
                    <Label htmlFor="neighborhood" className="text-base font-medium">
                      Bairro: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="neighborhood"
                      placeholder="Digite o bairro"
                      className="h-12 shadow-input"
                      {...register("neighborhood")}
                    />
                    {errors.neighborhood && (
                      <p className="text-required text-sm">{errors.neighborhood.message}</p>
                    )}
                  </div>

                  {/* Cidade */}
                  <div className="space-y-2">
                    <Label htmlFor="city" className="text-base font-medium">
                      Cidade: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="city"
                      placeholder="Digite a cidade"
                      className="h-12 shadow-input"
                      {...register("city")}
                    />
                    {errors.city && (
                      <p className="text-required text-sm">{errors.city.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Dados Bancários */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Dados Bancários
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Banco */}
                  <div className="space-y-2">
                    <Label htmlFor="bank" className="text-base font-medium">
                      Banco: <span className="text-required">*</span>
                    </Label>
                    <Select value={watchedBank} onValueChange={(value) => setValue("bank", value)}>
                      <SelectTrigger className="h-12 shadow-input">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        {bankOptions.map((bank) => (
                          <SelectItem key={bank.value} value={bank.value}>
                            {bank.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.bank && (
                      <p className="text-required text-sm">{errors.bank.message}</p>
                    )}
                  </div>

                  {/* Tipo da Conta */}
                  <div className="space-y-2">
                    <Label htmlFor="accountType" className="text-base font-medium">
                      Tipo da Conta: <span className="text-required">*</span>
                    </Label>
                    <Select value={watchedAccountType} onValueChange={(value) => setValue("accountType", value)}>
                      <SelectTrigger className="h-12 shadow-input">
                        <SelectValue placeholder="Selecione uma opção" />
                      </SelectTrigger>
                      <SelectContent>
                        {accountTypes.map((type) => (
                          <SelectItem key={type.value} value={type.value}>
                            {type.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.accountType && (
                      <p className="text-required text-sm">{errors.accountType.message}</p>
                    )}
                  </div>

                  {/* Agência */}
                  <div className="space-y-2">
                    <Label htmlFor="agency" className="text-base font-medium">
                      Agência: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="agency"
                      placeholder="Digite a agência"
                      className="h-12 shadow-input"
                      {...register("agency")}
                    />
                    {errors.agency && (
                      <p className="text-required text-sm">{errors.agency.message}</p>
                    )}
                  </div>

                  {/* Conta */}
                  <div className="space-y-2">
                    <Label htmlFor="account" className="text-base font-medium">
                      Conta: <span className="text-required">*</span>
                    </Label>
                    <Input
                      id="account"
                      placeholder="Digite o número da conta"
                      className="h-12 shadow-input"
                      {...register("account")}
                    />
                    {errors.account && (
                      <p className="text-required text-sm">{errors.account.message}</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Termos e Condições */}
              <div className="space-y-6">
                <h2 className="text-2xl font-heading font-semibold text-foreground">
                  Termos e Condições
                </h2>
                
                <div className="space-y-4">
                  {/* Cessão de Direitos */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="imageRights"
                      checked={watchedImageRights}
                      onCheckedChange={(checked) => setValue("imageRights", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="imageRights" className="text-base font-medium cursor-pointer">
                        Cessão de Direitos de Uso de Imagem
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <a href="#" className="text-primary underline hover:no-underline">
                              Ver detalhes
                            </a>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Cessão de Direitos de Uso de Imagem</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 text-sm">
                              <pre className="whitespace-pre-wrap font-sans">{imageRightsText}</pre>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </p>
                    </div>
                  </div>
                  {errors.imageRights && (
                    <p className="text-required text-sm ml-6">{errors.imageRights.message}</p>
                  )}

                  {/* Termos de Privacidade */}
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      id="privacyTerms"
                      checked={watchedPrivacyTerms}
                      onCheckedChange={(checked) => setValue("privacyTerms", checked as boolean)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <Label htmlFor="privacyTerms" className="text-base font-medium cursor-pointer">
                        Termo de Privacidade, Política de Uso e Tratamento de Dados (LGPD)
                      </Label>
                      <p className="text-sm text-muted-foreground mt-1">
                        <Dialog>
                          <DialogTrigger asChild>
                            <a href="#" className="text-primary underline hover:no-underline">
                              Ver detalhes
                            </a>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
                            <DialogHeader>
                              <DialogTitle>Termo de Privacidade, Política de Uso e Tratamento de Dados (LGPD)</DialogTitle>
                            </DialogHeader>
                            <div className="space-y-4 text-sm">
                              <pre className="whitespace-pre-wrap font-sans">{privacyTermsText}</pre>
                            </div>
                          </DialogContent>
                        </Dialog>
                      </p>
                    </div>
                  </div>
                  {errors.privacyTerms && (
                    <p className="text-required text-sm ml-6">{errors.privacyTerms.message}</p>
                  )}
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