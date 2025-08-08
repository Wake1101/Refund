// Capturando os inputs do formulário
const form = document.querySelector("form"); // formulario
const amount = document.getElementById("amount"); // valor da despesa
const exepense = document.getElementById("expense"); // nome da despesa
const category = document.getElementById("category"); // categoria da despesa

// Elementos da lista
const expenseList = document.querySelector("ul"); // Lista de despesas

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

   // chamando a função que cria o item na lista
   expenseAdd(newExpense);
}

function expenseAdd(newExpense) {
   try {
      // criando os elementos para colocar na lista
      const expenseItem = document.createElement("li"); // item da lista
      expenseItem.classList.add("expense"); // adicionando a classe do item

      // Criando o icone
      const expenseIcon = document.createElement("img"); // Criando a imagem
      expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`); // pegando o icone da categoria
      expenseIcon.setAttribute("alt", expenseItem.category_name); // adicionando descriçao do icone

      // Adicionando os dados ao item da lista
      expenseItem.append(expenseIcon);

      // Adicionando o item a lista
      expenseList.append(expenseItem);

   } catch (error) {
      alert("Não foi possível adicionar o item na lista"); // exibindo uma mensagem para o usuario
      console.log(error); // exibindo o erro no console
   }
}