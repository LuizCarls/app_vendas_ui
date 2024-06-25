var users = JSON.parse(localStorage.getItem('users')) || [];
var tableBody = $('#usuariosTableBody');

// Preenche a tabela com os dados dos usuários
users.forEach(function(user, index) {
    var row = '<tr>' +
        '<td class="nome-column">' + user.nome + '</td>' +
        '<td class="email-column">' + user.email + '</td>' +
        '<td>' + user.rua + '</td>' +
        '<td>' + user.numero + '</td>' +
        '<td>' + user.complemento + '</td>' +
        '<td>' + user.cidade + '</td>' +
        '<td>' + user.estado + '</td>' +
        '<td>' + user.cep + '</td>' +
        '<td>' +
            '<button class="btn btn-primary btn-sm" onclick="editarUsuario(' + index + ')">Editar</button> ' +
            '<button class="btn btn-danger btn-sm" onclick="excluirUsuario(' + index + ')">Excluir</button>' +
        '</td>' +
        '</tr>';
    tableBody.append(row);
});

function editarUsuario(index) {
    // Lógica para editar o usuário no índice fornecido
    var user = users[index];
    // Armazena os dados do usuário no localStorage
    localStorage.setItem('usuarioParaEditar', JSON.stringify(user));   

    // Redireciona para a página de cadastro
    window.location.href = `../views/cadastro.html?index=${index}`;    
}

$('#btnVoltar').click(function() {
    window.location.href = 'index.html';
});

function excluirUsuario(index) {    
    Swal.fire({
        title: "Você tem certeza que deseja excluir este usuário?",         
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim, excluir!",
        cancelButtonText: "Não, cancelar!"      
    }).then((result) => {
        if (result.isConfirmed) {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));            
            Swal.fire({
                title: "Usuário excluído!",
                icon: "success"
            }).then(() => {                
                location.reload();
            });       
        }  
    });    
}
