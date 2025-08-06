// Capturando os inputs do formulário
const form = document.querySelector("form"); // formulario
const amount = document.getElementById("amount"); // valor da despesa
const exepense = document.getElementById("expense"); // nome da despesa
const category = document.getElementById("category"); // categorai da despesa

// Formatando o valor do input
amount.oninput = () => {
   // Removendo caracteres não numericos
   let value = amount.value.replace(/\D/g, ""); //Regex removendo letras

   //convertendo para centavos
   value = Number(value) / 100;

   amount.value = formatCurrencyBRL(value); // Aplicando a formatação
}

// Formatando o valor para a moeda brasileira
function formatCurrencyBRL(value) {
   value = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
   });

   // Retornando o valor
   return value;
}

// Adicionando os eventos do formulário
form.onsubmit = (event) => {
   // evitando o reset da página durente o submit
   event.preventDefault();

   // criando um obejto da nova despesa
   const newExpense = {
      id: new Date().getTime(), // id da despesa
      expense: expense.value, // nome
      category_id: category.value, // id do tipo da despesa
      category_name: category.options[category.selectedIndex].text, // nome do tipo da despesa
      amount: amount.value, // valor da despesa
      created_at: new Date(), // quando foi criada a despesa
   }
}