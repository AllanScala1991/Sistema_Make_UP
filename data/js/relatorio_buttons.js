window.$ = window.jQuery = require('jquery');

// FUNÇÃO DE BUSCAR UM CLIENTE
document.querySelector('#btn_rel_buscar').onclick = () => {
    const busca_clientes = require('../js/db_functions');
    let get_name = document.querySelector('#rel_name').value;
    let get_data = document.querySelector('#rel_data').value;
    busca_clientes.RelBuscarCliente(get_name, get_data);
}

// FUNÇÃO DE LIMPAR OS CAMPOS
document.querySelector('#btn_rel_limpar_filtros').onclick = () => {
    document.querySelector('#rel_name').value = "";
    document.querySelector('#rel_data').value = "";
    $('.table_results').empty();
    
}

// ABRIR INFORMACOES DO CLIENTE
function clienteID (getID){
    const abrir_cliente = require('../js/db_functions');
    abrir_cliente.LocalizarInfoClientes(getID.id);
}

// FECHAR INFOMACOES DO CLIENTE
document.querySelector('#rel_btn_fechar_cont').onclick = () =>{
    document.querySelector('.cliente_info_container').style.zIndex = '-60';
    $('.ctns').empty();
}