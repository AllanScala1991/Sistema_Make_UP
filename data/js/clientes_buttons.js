
// FUNÇÃO QUE CONTROLA A ABERTURA DE FIELDSETS DOS CLIENTES
document.querySelector("#btn_add_cliente").onclick = () => {
    document.querySelector("#field_new_cliente").style.zIndex = "10";
    document.querySelector("#field_edit_cliente").style.zIndex = "-10";
    document.querySelector("#field_show_cliente").style.zIndex = "-10";
    document.querySelector("#container_clientes_name").style.zIndex = "-10";
}
document.querySelector("#btn_edit_cliente").onclick = () => {
    document.querySelector("#field_new_cliente").style.zIndex = "-10";
    document.querySelector("#field_edit_cliente").style.zIndex = "10";
    document.querySelector("#field_show_cliente").style.zIndex = "-10";
    document.querySelector("#container_clientes_name").style.zIndex = "-10";
}
document.querySelector("#btn_show_cliente").onclick = () => {
    document.querySelector("#field_new_cliente").style.zIndex = "-10";
    document.querySelector("#field_edit_cliente").style.zIndex = "-10";
    document.querySelector("#field_show_cliente").style.zIndex = "10";
    document.querySelector("#container_clientes_name").style.zIndex = "-10";
}

// FUNÇÃO DE BUSCA POR CLIENTE
document.querySelector("#btn_edit_search_cliente").onclick = () => {
    try {
        const edit_user = require('../js/db_functions');
        let editar_nome = document.querySelector("#nome_cliente_editar").value;
        edit_user.LocalizarCliente(editar_nome.toUpperCase());
    } catch (error) {
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
    }
    
}

//FUNÇÃO DE SALVAR NOVO CADASTRO DE CLIENTES
document.querySelector('#btn_save_new_client').onclick = () => {
    try {
        const save_user = require('../js/db_functions');
        let nome = document.querySelector("#new_name").value;
        let cpf =  document.querySelector("#new_cpf").value;
        let telefone = document.querySelector("#new_tel").value;
        let rg = document.querySelector("#new_rg").value;
        let email = document.querySelector("#new_email").value;
        let endereco = document.querySelector("#new_end").value;
        let nascido = document.querySelector("#new_date").value;
        let funcionario = document.querySelector("#users_select").value;
        let obs = document.querySelector("#obs_cliente").value;
        if (nome == ""){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Campo NOME está em branco!";
        }else{
            save_user.NovoCliente(nome.toUpperCase(), cpf, telefone, rg, email, endereco, nascido, funcionario, obs);
        }
        
    } catch (error) {
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
    }
    
}

// FUNÇÃO DE ATUALIZAR CADASTRO DO CLIENTE
document.querySelector('#btn_update_client').onclick = () =>{
    if (document.querySelector('#nome_cliente_editar').value == ''){
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Não existem clientes localizados";
    }else{
        const update_user = require('../js/db_functions');
        update_user.AtualizarCliente();
    }
    
}

// FUNÇÃO DE DELETAR CADASTRO DO CLIENTE
document.querySelector('#btn_delete_client').onclick = () =>{
    if (document.querySelector('#nome_cliente_editar').value == ''){
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Não existem clientes localizados";
    }else{
        const delete_user = require('../js/db_functions');
        delete_user.DeletarCliente();
    }
    
}

// FUNÇÃO QUE MOSTRA OS CLIENTES CADASTRADOS
document.querySelector("#show_btn_buscar").onclick = () =>{
    const mostrarCliente = require('../js/db_functions');
    let nomeCliente = document.querySelector("#show_name_cliente").value.toUpperCase();
    let cpfCliente = document.querySelector('#show_cpf_cliente').value;
    mostrarCliente.MostrarClientes(nomeCliente, cpfCliente);
}
