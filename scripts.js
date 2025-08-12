// Capturando os inputs do formulário
const form = document.querySelector("form"); // formulario
const amount = document.getElementById("amount"); // valor da despesa
const exepense = document.getElementById("expense"); // nome da despesa
const category = document.getElementById("category"); // categoria da despesa

// Elementos da lista
const expenseList = document.querySelector("ul"); // Lista de despesas
const expenseQuantity = document.querySelector("aside header p span"); //elemento de total de despesas
const expensesTotal = document.querySelector("aside header h2"); // Elemento de valor total de despesas

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

// Adicionando um item na lista
function expenseAdd(newExpense) {
   try {
      // criando os elementos para colocar na lista
      const expenseItem = document.createElement("li"); // item da lista
      expenseItem.classList.add("expense"); // adicionando a classe do item

      // Criando o icone
      const expenseIcon = document.createElement("img"); // Criando a imagem
      expenseIcon.setAttribute("src", `img/${newExpense.category_id}.svg`); // pegando o icone da categoria
      expenseIcon.setAttribute("alt", expenseItem.category_name); // adicionando descriçao do icone

      // Criando a info da despesa
      const expenseInfo = document.createElement("div"); // criando div de informações
      expenseInfo.classList.add("expense-info"); // classe da div

      // Criando o nome da despesa
      const expenseName = document.createElement("strong"); // Nome da despesa
      expenseName.textContent = newExpense.expense; // Adicionando o conteudo 

      // Criando a categoria da despesa
      const expenseCategory = document.createElement("span"); // categoria da despesa
      expenseCategory.textContent = newExpense.category_name; // adicionando conteudo

      // Adicionando os conteudos na div
      expenseInfo.append(expenseName, expenseCategory); 

      // Criando o valor da despesa
      const expenseAmount = document.createElement("span");
      expenseAmount.classList.add("expense-amount"); // classe do valor da despesa

      // Adicionando o conteudo com HTML
      expenseAmount.innerHTML = `
      <small>R$</small>
      ${newExpense.amount.toUpperCase().replace("R$", "")}`;

      // Adicionando o botao de remoção de despesa
      const removeIcon = document.createElement("img"); // Adicionando icone
      removeIcon.classList.add("remove-icon");
      removeIcon.setAttribute("src", "img/remove.svg");
      removeIcon.setAttribute("alt", "remover");

      // Adicionando os dados ao item da lista
      expenseItem.append(expenseIcon, expenseInfo, expenseAmount, removeIcon);

      // Adicionando o item a lista
      expenseList.append(expenseItem);

      // chamando a função que atualiza o total de despesas
      updateTotals();

   } catch (error) {
      alert("Não foi possível adicionar o item na lista"); // exibindo uma mensagem para o usuario
      console.log(error); // exibindo o erro no console
   }
}

// atualizando o tota de iten na lista
function updateTotals() {
   try {
      const items = expenseList.children; // pegando o total de itens na lista

      expenseQuantity.textContent = (`${items.length} ${items.length > 1 ? "despesas" : "despesa"}`); // alterando o conteudo do html

      // capturando o total do valor das despesas
      let total = 0;

      // passando por cada item da lista para calcular o total
      for(let item = 0; item < items.length; item++) {
         const itemAmount = items[item].querySelector(".expense-amount"); // captuando o dado

         let value = itemAmount.textContent.replace(/[^\d,]/g, "").replace(",", "."); //tratando para ser número

         // convertendo para numero float
         value = parseFloat(value);

         // Verificando se ele é valido
         if(isNaN(value)) {
            return alert("ão foi possível calular o total, o valor não parece ser um número");
         }

         // somando o total
         total += Number(value);
      }

      // exibindo o total no HTML
      // Criando o simbolo de real
      const symbolBRL = document.createElement("small");
      symbolBRL.textContent = "R$";

      // formatando o valor total
      total = formatCurrencyBRL(total).toUpperCase().replace("R$", "");

      // resetando os dados do html do elemento
      expensesTotal.innerHTML = "";

      // Adicionando os novos dados
      expensesTotal.append(symbolBRL, total);
   } catch (error) {
      console.log(error);
      alert("Um erro ocorreu ao atualizar o total de despesas");
   }
}

// Removendo o item ao clicar no remover
// capturando o vento de click no icone
expenseList.addEventListener("click", function(event) {
   if(event.target.classList.contains("remove-icon")) {
      // obetendo li pai do elemento clicado
      const item = event.target.closest(".expense");

      // remove o item da lista
      item.remove();
   }

   // chamando a função para re-calcular o total
   updateTotals();
})