/*
  --------------------------------------------------------------------------------------
  Função para obter a lista existente do servidor via requisição GET
  --------------------------------------------------------------------------------------
*/

const url = 'http://127.0.0.1:5000'

const getList = async () => {             
    let route = `${url}/buscar_produtos`;
    fetch(route, {
      method: 'get',
    })
      .then((response) => response.json())
      .then((data) => {           
        data.produtos.forEach(item => insertList(item.nome, item.quantidade, item.valor, item.data))
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  /*
    --------------------------------------------------------------------------------------
    Chamada da função para carregamento inicial dos dados
    --------------------------------------------------------------------------------------
  */

  getList()
  
  /*
    --------------------------------------------------------------------------------------
    Função para colocar um item na lista do servidor via requisição POST
    --------------------------------------------------------------------------------------
  */
      
  const postItem = async (inputItem, inputQuantidade, inputValor, inputData) => {
    const formData = new FormData();
    formData.append('nome', inputItem);
    formData.append('quantidade', inputQuantidade);
    formData.append('valor', inputValor);
    formData.append('data_insercao', inputData);                 

    let route = `${url}/cadastrar_produto`;

    fetch(route, {
      method: 'post',
      body: formData
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para criar um botão close para cada item da lista
    --------------------------------------------------------------------------------------
  */

  const insertButton = (parent) => {
    // let button = document.createElement("button");
    // button.className = "btn btn-danger btn-sm rounded-0"
    // button.setAttribute("type", "button")
    // button.setAttribute("data-toggle", "tooltip")
    // button.setAttribute("data-placement", "top")
    // button.setAttribute("title", "")
    // button.setAttribute("data-original-title", "Delete")

    // button.appendChild = '<i class="fa fa-trash" aria-hidden="true"></i>'
    // parent.appendChild(button);

    let span = document.createElement("span");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    parent.appendChild(span);
  }  

  /*
    --------------------------------------------------------------------------------------
    Função para remover um item da lista de acordo com o click no botão close
    --------------------------------------------------------------------------------------
  */
  const removeElement = () => {    
    let close = document.getElementsByClassName("close");        
    let i;
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function () {
        let div = this.parentElement.parentElement;
        const item = div.getElementsByTagName('td')[0].innerHTML        
        if (confirm("Você tem certeza que deseja excluir esse registro?")) {
          div.remove()
          deleteItem(item)          
        }
      }
    }
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para deletar um item da lista do servidor via requisição DELETE
    --------------------------------------------------------------------------------------
  */

  const deleteItem = (item) => {        
    let route = `${url}/deletar_produto?nome=${item}`;   
    
    console.log("Route: ", route)
    
    fetch(route, {
      method: 'delete'
    })
      .then((response) => response.json())
      .catch((error) => {
        console.error('Error:', error);
      });
  }
  
  /*
    --------------------------------------------------------------------------------------
    Função para adicionar um novo item com nome, quantidade e valor 
    --------------------------------------------------------------------------------------
  */

  const newItem = () => {       

    // let id = document.getElementById("id").value;
    let inputItem = document.getElementById("idItem").value;
    let inputQuantidade = document.getElementById("idQuantidade").value;
    let inputValor = document.getElementById("idValor").value;
    let inputData = document.getElementById("idData").value;     

    if (inputItem === '') {
      alert("Escreva o nome de um item!");
    } else if (isNaN(inputQuantidade) || isNaN(inputValor)) {
      alert("Quantidade e valor precisam ser números!");
    } else {
        postItem(inputItem, inputQuantidade, inputValor, inputData)
        insertList(inputItem, inputQuantidade, inputValor, inputData)
        console.log("Alerta")
        alert("Item adicionado!");
    }
  }
    

  /*
    --------------------------------------------------------------------------------------
    Função para inserir items na lista apresentada
    --------------------------------------------------------------------------------------
  */

  const insertList = (item, quantidade, valor, data) => {         

    var dados = [item, quantidade, valor, data]
    var table = document.getElementById('myTable');        
    var row = table.insertRow();     

    for (var i = 0; i < dados.length; i++) {
      var cel = row.insertCell(i);
      cel.textContent = dados[i];
    }    

    insertButton(row.insertCell(-1))
    document.getElementById("idItem").value = "";
    document.getElementById("idQuantidade").value = "";
    document.getElementById("idValor").value = "";
    document.getElementById("idData").value = "";     

    removeElement()       
  }