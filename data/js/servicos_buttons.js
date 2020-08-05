window.$ = window.jQuery = require('jquery');

//FUNÇÃO QUE VERIFICA SE A BUSCA VAI SER FEITA POR NOME, CPF , RG OU TELEFONE E COLOCA A MASCARA CERTA
document.querySelector("#serv_select").onchange = () => {
    let select_value = document.querySelector("#serv_select").value
    switch (select_value){
        case 'Cpf':
            document.querySelector("#serv_search_input").setAttribute('placeholder', 'ex: 000.000.000.00')
            $('#serv_search_input').prop('readonly', false);
            break;
        case 'Rg':
            document.querySelector("#serv_search_input").setAttribute('placeholder', 'ex: 00.000.000-0')
            $('#serv_search_input').prop('readonly', false);
            break;
        case 'Nome':
            document.querySelector("#serv_search_input").setAttribute('placeholder', '')
            $('#serv_search_input').prop('readonly', false);
            break;
        case 'Telefone':
            document.querySelector("#serv_search_input").setAttribute('placeholder', '')
            $('#serv_search_input').prop('readonly', false);
            break;
    }
    
}

// FUNÇÃO QUE CONTROLA A ABERTURA DE FIELDSETS DOS SERVICOS
document.querySelector("#btn_add_servico").onclick = () => {
    const updateItens= require('../js/db_functions');
    updateItens.AtualizarItems();
    document.querySelector("#field_new_servico").style.zIndex = "10";
    document.querySelector("#field_edit_servico").style.zIndex = "-10";
    document.querySelector("#field_novo_cadastro_servico").style.zIndex = "-10";
    document.querySelector("#container_servicos_name").style.zIndex = "-10";
    document.querySelector('#fieldset_mostrar_item').style.zIndex = "-10";
    
    let Data = new Date();
    let Mes = [01,02,03,04,05,06,07,08,09,10,11,12]
    if (Data.getMonth() <9){
        if(Data.getDate() < 10){
            document.querySelector('#data_cadastro').innerHTML = '0'+Data.getDate() + '/' +'0'+ Mes[Data.getMonth()] + '/' + Data.getFullYear();
        }else{
            document.querySelector('#data_cadastro').innerHTML = Data.getDate() + '/' +'0'+ Mes[Data.getMonth()] + '/' + Data.getFullYear();
        }
        
    }else{
        document.querySelector('#data_cadastro').innerHTML = Data.getDate() + '/' + Mes[Data.getMonth()] + '/' + Data.getFullYear();
    }
    
}
document.querySelector("#btn_edit_servico").onclick = () => {
    document.querySelector("#field_new_servico").style.zIndex = "-10";
    document.querySelector("#field_edit_servico").style.zIndex = "10";
    document.querySelector("#field_novo_cadastro_servico").style.zIndex = "-10";
    document.querySelector("#container_servicos_name").style.zIndex = "-10";
    document.querySelector('#fieldset_mostrar_item').style.zIndex = "-10";
}
document.querySelector("#btn_cadastro_servico").onclick = () => {
    document.querySelector("#field_new_servico").style.zIndex = "-10";
    document.querySelector("#field_edit_servico").style.zIndex = "-10";
    document.querySelector("#field_novo_cadastro_servico").style.zIndex = "10";
    document.querySelector("#container_servicos_name").style.zIndex = "-10";
    document.querySelector('#fieldset_mostrar_item').style.zIndex = "-10";
}
document.querySelector('#btn_mostrar_itens').onclick = () => {
    document.querySelector("#field_new_servico").style.zIndex = "-10";
    document.querySelector("#field_edit_servico").style.zIndex = "-10";
    document.querySelector("#field_novo_cadastro_servico").style.zIndex = "-10";
    document.querySelector("#container_servicos_name").style.zIndex = "-10";
    document.querySelector('#fieldset_mostrar_item').style.zIndex = "10";
    const itenServico = require('../js/db_functions');
    itenServico.LocalizaItensServicos();
}

//FUNÇÃO QUE ADICIONA E LIMPA OS ITEMS NO CADASTRO DE SERVIÇO
var itens_servicos = []
var itens_saude = []
document.querySelector('#add_serv_item').onclick = () => {
    let serv_ul = document.querySelector("#servicos_list");
    let serv_li = document.createElement('li');
    serv_li.innerText = document.querySelector('#item_serv_select').value;
    serv_ul.appendChild(serv_li);
    itens_servicos.push(document.querySelector('#item_serv_select').value);
    console.log(itens_servicos)
}
document.querySelector('#clear_serv_item').onclick = () => {
    $('#servicos_list').empty();
    itens_servicos = [];
}

document.querySelector('#add_saude_item').onclick = () => {
    let saude_ul = document.querySelector("#saude_list");
    let saude_li = document.createElement("li");
    saude_li.innerText = document.querySelector('#item_saude_select').value;
    saude_ul.appendChild(saude_li);
    itens_saude.push(document.querySelector('#item_saude_select').value);
}
document.querySelector('#clear_saude_item').onclick = () => {
    $('#saude_list').empty();
    itens_saude = [];
}

// FUNÇÃO PARA CRIAR NOVO ITEM DE SERVIÇO
document.querySelector('#btn_salvar_novo_itemservico').onclick = () => {
    try {
        const novo_itemServico = require('../js/db_functions');
        let itemNome = document.querySelector('#nome_novo_servico').value;
        let itemCategoria = document.querySelector('#categ_select').value;
        let itemDescricao = document.querySelector('#novo_item_desc').value;
        if (itemNome == "" || itemCategoria =="" || itemDescricao == ""){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Preencha todos os campos!";
        }else{
            novo_itemServico.NovoItemServico(itemNome, itemCategoria, itemDescricao);
        }
        
    } catch (error) {
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
    }
    
}

// FUNÇÃO QUE VERIFIQUE SE VAI TER RETOQUE OU NÃO E ABRE O CAMPO DATA
document.querySelector('#item_func_select').onchange = () => {
    let select_value = document.querySelector("#item_func_select").value
    let campo_data = document.querySelector('#retoque_data');
    switch (select_value){
        case 'Sim':
            campo_data.style.visibility = "visible";
            break;
        case 'Não':
            campo_data.style.visibility = 'hidden';
            break;
    }
}

// FUNÇÃO QUE LOCALIZA O CLIENTE PARA REALIZAR O CADASTRO DE UM NOVO SERVICO
document.querySelector('#localiza_cliente_servico').onclick = () =>{
    try {
        const save_service = require('../js/db_functions');
        let busca_selecionada = document.querySelector('#serv_select').value;
        let clienteName = document.querySelector('#serv_search_input').value;
        
        if (clienteName != ""){
            switch (busca_selecionada){
                case 'Nome':
                    save_service.localizarClienteServico('Nome',document.querySelector('#serv_search_input').value.toUpperCase())
                    break;
                case 'Cpf':
                    save_service.localizarClienteServico('Cpf',document.querySelector('#serv_search_input').value)
                    break;
                case 'Rg':
                    save_service.localizarClienteServico('Rg',document.querySelector('#serv_search_input').value)
                    break;
                case 'Telefone':
                    save_service.localizarClienteServico('Telefone',document.querySelector('#serv_search_input').value)
                    break;
                case 'Sem_valor':
            }
            document.querySelector(".alert_container").style.zIndex = "999";
            document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
        }else{
            document.querySelector(".alert_container").style.zIndex = "999";
            document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
        }
        
    } catch (error) {
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
    }
}

//FUNÇÃO QUE SALVA O SERVICO
document.querySelector('#btn_save_new_serv').onclick = () => {
    try {
        const salvarServico = require('../js/db_functions');
        let cliente = document.querySelector('#cliente_name_select').textContent;
        let data = document.querySelector('#data_cadastro').textContent;
        let servicos = itens_servicos;
        let saude = itens_saude;
        let funcionario = document.querySelector('#novo_serv_funcionario').value;
        let valor = document.querySelector('#valor_serv').value;
        let retoque = document.querySelector('#item_func_select').value;
        let dtRetoque = document.querySelector('#retoque_data').value;
        if (cliente == "" | valor == ""){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Os campos NOME e VALOR são obrigatórios.";
        }else{ 
            salvarServico.SalvarServicos(cliente.toUpperCase(), data, servicos, saude, funcionario, retoque, dtRetoque,valor);
            itens_servicos = [];
            itens_saude = [];
        }
        
    } catch (error) {
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
    }
}

// FUNÇÃO PARA LOCALIZAR UM SERVICO
document.querySelector('#btn_busca_venda_data').onclick = () => {
    const localizaServico = require('../js/db_functions');
    let dataBusca = document.querySelector('#data_busca_venda').value;
    localizaServico.BuscarServico(dataBusca);
}

//FUNCAO QUE SALVA A EDICAO DO SERVICO
document.querySelector('#btn_salva_edita_servico').onclick = () => {
    try {
        const EditarServico = require('../js/db_functions');
        let valores = document.querySelectorAll("table tr td");
        for (i = 0; i < valores.length; i++) {
            EditarServico.EditarServico(valores[8].value,valores[0].textContent,valores[1].textContent.toUpperCase(),valores[2].textContent,valores[3].textContent,
                valores[4].textContent,valores[5].textContent,valores[6].textContent,valores[7].textContent);
        }
    } catch (error) {
        console.log(error);
    }
    
}

// FUNÇÃO PARA EXCLUIR UM SERVIÇO
function ExcluirServico (id) {
    try {
        const DeletarServico = require('../js/db_functions');
        DeletarServico.ExcluirServicos(id.value);
    } catch (error) {
        console.log(error);
    }
}

// FUNÇÃO PARA EXCLUIR UM ITEM
function ExcluirItem(get_id){
    const excluirItem = require('../js/db_functions');
    excluirItem.ExcluirItensServico(get_id.id);
}