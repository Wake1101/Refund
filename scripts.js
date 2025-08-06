// Capturando os inputs do formulário
const amount = document.getElementById("amount");

// Formatando o valor do input
amount.oninput = () => {
   // Removendo caracteres não numericos
   let value = amount.value.replace(/\D/g, ""); //Regex removendo letras

   //convertendo para centavos
   value = Number(value) / 100;

   amount.value = formatCurrencyBRL(value); // Aplicando a formatação
}

function formatCurrencyBRL(value) {
   value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });

   return value
}