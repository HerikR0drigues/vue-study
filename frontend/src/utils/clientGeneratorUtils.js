export const generator = () => {
    const ceps = [
      "69918170", // Rio Branco, AC
      "57010060", // Maceió, AL 
      "68900032", // Macapá, AP 
      "69058120", // Manaus, AM
      "40010060", // Salvador, BA 
      "60010120", // Fortaleza, CE
      "70040010", // Brasília, DF
      "29010420", // Vitória, ES 
      "74810360", // Goiânia, GO
      "65074720", // São Luís, MA
      "78048650", // Cuiabá, MT
      "79002073", // Campo Grande, MS 
      "30130002", // Belo Horizonte, MG
      "66055230", // Belém, PA
      "58020540", // João Pessoa, PB
      "80010090", // Curitiba, PR
      "50060350", // Recife, PE
      "64001120", // Teresina, PI
      "20031144", // Rio de Janeiro, RJ
      "59010056", // Natal, RN 
      "90010191", // Porto Alegre, RS
      "76804123", // Porto Velho, RO
      "69301150", // Boa Vista, RR
      "88015220", // Florianópolis, SC
      "01001000", // São Paulo, SP
      "49010390", // Aracaju, SE
      "77001036", // Palmas, TO
    ];
  
    const origins = ["digital", "fisico"]; // Array com as opções de origem
  
    const data = new Date();
  
    const diaSemana = data.toDateString().split(" ")[0];
    const mes = data.toDateString().split(" ")[1];
    const dia = data.toDateString().split(" ")[2];
    const ano = data.getFullYear();
    const hora = data.toTimeString().split(" ")[0].replace(/[:\-]/g, ""); // Remover ':' e '-'
  
    const dataFormatada = `${diaSemana}${mes}${dia}${ano}${hora}`;
  
    // Seleciona um CEP e uma origem aleatórios
    const cepAleatorio = ceps[Math.floor(Math.random() * ceps.length)];
    const originAleatoria = origins[Math.floor(Math.random() * origins.length)];
  
    const cliente = {
      nome: "Gerador",
      email: `${dataFormatada}@email.com`,
      cep: cepAleatorio, // Atribuir o CEP aleatório aqui
      numero: "123",
      complemento: "",
      origin: originAleatoria, // Atribuir a origem aleatória aqui
    };
  
    return cliente;
  };
  