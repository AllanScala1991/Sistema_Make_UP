window.$ = window.jQuery = require('jquery');
var Database = require('nedb');
db = {};
db.clientes =  new Database({filename: 'data/storage/clientes.json', autoload: true})
db.item_servicos =  new Database({filename: 'data/storage/item_servicos.json', autoload: true})
db.servicos =  new Database({filename: 'data/storage/servicos.json', autoload: true})
db.agenda  = new Database({filename: 'data/storage/agenda.json', autoload: true})


// MODULOS DOS CLIENTES
module.exports = { 
    NovoCliente(getNome, getCpf, getTelefone, getRg, getEmail, getEndereco, getDtNasc, getFuncionario, getObs){
        try{
            let novo_cliente = {
                Nome: getNome,
                Cpf: getCpf,
                Telefone: getTelefone,
                Rg: getRg,
                Email: getEmail,
                Endereço: getEndereco,
                Nascido: getDtNasc,
                Funcionario: getFuncionario,
                Observação: getObs
            };
            db.clientes.find({
                Nome: getNome
            }, (error,info)=>{
                if (info.length === 0){
                    db.clientes.insert(novo_cliente);
                    document.querySelector("#new_name").value = ""; 
                    document.querySelector("#new_cpf").value = ""; 
                    document.querySelector("#new_tel").value = ""; 
                    document.querySelector("#new_rg").value = ""; 
                    document.querySelector("#new_email").value = ""; 
                    document.querySelector("#new_end").value = ""; 
                    document.querySelector("#new_date").value = ""; 
                    document.querySelector("#obs_cliente").value = "";
                    document.querySelector("#users_select").value = "";
                    document.querySelector(".alert_container").style.zIndex = "999"
                    document.querySelector(".alert_msg").innerHTML = "Cliente salvo com sucesso";
                }else{
                    document.querySelector(".alert_container").style.zIndex = "999"
                    document.querySelector(".alert_msg").innerHTML = "Já existe um cliente com esse nome!";
                }
            })
            
        }catch(error){
            console.log(error);
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
        }
    },
    LocalizarCliente(getName){
        try{
            db.clientes.find({
                Nome : getName
            }).sort({Nome : 1}).exec((error, getCliente)=>{
                if (getCliente == ""){
                    document.querySelector(".alert_container").style.zIndex = "999"
                    document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                }else{
                    document.querySelector(".alert_container").style.zIndex = "999"
                    document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                    document.querySelector('#edit_name').value = getCliente[0].Nome;
                    document.querySelector('#edit_cpf').value = getCliente[0].Cpf;
                    document.querySelector('#edit_tel').value = getCliente[0].Telefone;
                    document.querySelector('#edit_rg').value = getCliente[0].Rg;
                    document.querySelector('#edit_email').value = getCliente[0].Email;
                    document.querySelector('#edit_end').value = getCliente[0].Endereço;
                    document.querySelector('#edit_date').value = getCliente[0].Nascido;
                    document.querySelector('#edit_users_select').value = getCliente[0].Funcionario;
                    document.querySelector('#edit_obs_cliente').value = getCliente[0].Observação;
                }
            })
        }catch(error){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+ error;
        }
    },
    AtualizarCliente(){
        try{
            db.clientes.update({
                Nome : document.querySelector('#nome_cliente_editar').value.toUpperCase() 
            },{$set:{
                Nome : document.querySelector('#edit_name').value.toUpperCase(),
                Cpf: document.querySelector('#edit_cpf').value,
                Telefone: document.querySelector('#edit_tel').value,
                Rg : document.querySelector('#edit_rg').value,
                Email : document.querySelector('#edit_email').value,
                Endereço : document.querySelector('#edit_end').value,
                Nascido : document.querySelector('#edit_date').value,
                Funcionario : document.querySelector('#edit_users_select').value,
                Observação : document.querySelector('#edit_obs_cliente').value
            }});
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Atualizado com sucesso!";
            document.querySelector("#edit_name").value = ""; 
            document.querySelector("#edit_cpf").value = ""; 
            document.querySelector("#edit_tel").value = ""; 
            document.querySelector("#edit_rg").value = ""; 
            document.querySelector("#edit_email").value = ""; 
            document.querySelector("#edit_end").value = ""; 
            document.querySelector("#edit_date").value = ""; 
            document.querySelector("#edit_users_select").value = "";
            document.querySelector("#edit_obs_cliente").value = "";
            document.querySelector("#nome_cliente_editar").value = "";
        }catch (error){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro ao salvar: "+ error;
        }  
    },
    DeletarCliente(){
        try {
            db.clientes.remove({
                Nome : document.querySelector('#nome_cliente_editar').value
            },{});
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Deletado com sucesso!";
            document.querySelector("#edit_name").value = ""; 
            document.querySelector("#edit_cpf").value = ""; 
            document.querySelector("#edit_tel").value = ""; 
            document.querySelector("#edit_rg").value = ""; 
            document.querySelector("#edit_email").value = ""; 
            document.querySelector("#edit_end").value = ""; 
            document.querySelector("#edit_date").value = ""; 
            document.querySelector("#edit_users_select").value = "";
            document.querySelector("#edit_obs_cliente").value = "";
            document.querySelector("#nome_cliente_editar").value = "";
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro ao deletar: "+ error;
        }
    },
    MostrarClientes(getNameShow, getCPFShow){
        try{
            if (getNameShow == "" && getCPFShow == ""){
                db.clientes.find({}).sort({Nome : 1}).exec((error,getCliente) => {
                    let table = document.querySelector(".tables");
                    $('.tr_show').empty();
                    for(item = 0; item < getCliente.length; item++){
                        let tr = document.createElement('tr');
                        tr.className = 'tr_show'
                        let td1 = document.createElement('td');
                        td1.innerText = getCliente[item].Nome;
                        let td2 = document.createElement('td');
                        td2.innerText = getCliente[item].Cpf;
                        let td3 = document.createElement('td');
                        td3.innerText = getCliente[item].Telefone;
                        let td4 = document.createElement('td');
                        td4.innerText = getCliente[item].Rg;
                        let td5 = document.createElement('td');
                        td5.innerText = getCliente[item].Email;
                        let td6 = document.createElement('td');
                        td6.innerText = getCliente[item].Endereço;
                        let td7 = document.createElement('td');
                        td7.innerText = getCliente[item].Nascido;
                        let td8 = document.createElement('td');
                        td8.innerText = getCliente[item].Funcionario;
                        let td9 = document.createElement('td');
                        td9.innerText = getCliente[item].Observação;

                        table.appendChild(tr);
                        tr.appendChild(td1);
                        tr.appendChild(td2);
                        tr.appendChild(td3);
                        tr.appendChild(td4);
                        tr.appendChild(td5);
                        tr.appendChild(td6);
                        tr.appendChild(td7);
                        tr.appendChild(td8);
                        tr.appendChild(td9);
                    }

                })
            }if (getNameShow != "" && getCPFShow == ""){
                db.clientes.find({
                    Nome : getNameShow
                }).sort({Nome : 1}).exec((error, getCliente)=>{
                    if (getCliente == ""){
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                    }else{
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                        let table = document.querySelector(".tables");
                        $('.tr_show').empty();
                        for(item = 0; item < getCliente.length; item++){
                            let tr = document.createElement('tr');
                            tr.className = 'tr_show';
                            let td1 = document.createElement('td');
                            td1.innerText = getCliente[item].Nome;
                            let td2 = document.createElement('td');
                            td2.innerText = getCliente[item].Cpf;
                            let td3 = document.createElement('td');
                            td3.innerText = getCliente[item].Telefone;
                            let td4 = document.createElement('td');
                            td4.innerText = getCliente[item].Rg;
                            let td5 = document.createElement('td');
                            td5.innerText = getCliente[item].Email;
                            let td6 = document.createElement('td');
                            td6.innerText = getCliente[item].Endereço;
                            let td7 = document.createElement('td');
                            td7.innerText = getCliente[item].Nascido;
                            let td8 = document.createElement('td');
                            td8.innerText = getCliente[item].Funcionario;
                            let td9 = document.createElement('td');
                            td9.innerText = getCliente[item].Observação;
    
                            table.appendChild(tr);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            tr.appendChild(td5);
                            tr.appendChild(td6);
                            tr.appendChild(td7);
                            tr.appendChild(td8);
                            tr.appendChild(td9);
                        }
                    }
                })

            }
            if (getNameShow == "" && getCPFShow != ""){
                db.clientes.find({
                    Cpf : getCPFShow
                }).sort({Nome : 1}).exec((error, getCliente)=>{
                    if (getCliente == ""){
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                    }else{
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                        let table = document.querySelector(".tables");
                        $('.tr_show').empty();
                        for(item = 0; item < getCliente.length; item++){
                            let tr = document.createElement('tr');
                            tr.className = 'tr_show';
                            let td1 = document.createElement('td');
                            td1.innerText = getCliente[item].Nome;
                            let td2 = document.createElement('td');
                            td2.innerText = getCliente[item].Cpf;
                            let td3 = document.createElement('td');
                            td3.innerText = getCliente[item].Telefone;
                            let td4 = document.createElement('td');
                            td4.innerText = getCliente[item].Rg;
                            let td5 = document.createElement('td');
                            td5.innerText = getCliente[item].Email;
                            let td6 = document.createElement('td');
                            td6.innerText = getCliente[item].Endereço;
                            let td7 = document.createElement('td');
                            td7.innerText = getCliente[item].Nascido;
                            let td8 = document.createElement('td');
                            td8.innerText = getCliente[item].Funcionario;
                            let td9 = document.createElement('td');
                            td9.innerText = getCliente[item].Observação;
    
                            table.appendChild(tr);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            tr.appendChild(td5);
                            tr.appendChild(td6);
                            tr.appendChild(td7);
                            tr.appendChild(td8);
                            tr.appendChild(td9);
                        }
                    }
                })

            }
            if (getNameShow != "" && getCPFShow != ""){
                db.clientes.find({
                    Nome : getNameShow,
                    Cpf : getCPFShow
                }).sort({Nome : 1}).exec((error, getCliente)=>{
                    if (getCliente == ""){
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                    }else{
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                        let table = document.querySelector(".tables");
                        $('.tr_show').empty();
                        for(item = 0; item < getCliente.length; item++){
                            let tr = document.createElement('tr');
                            tr.className = 'tr_show';
                            let td1 = document.createElement('td');
                            td1.innerText = getCliente[item].Nome;
                            let td2 = document.createElement('td');
                            td2.innerText = getCliente[item].Cpf;
                            let td3 = document.createElement('td');
                            td3.innerText = getCliente[item].Telefone;
                            let td4 = document.createElement('td');
                            td4.innerText = getCliente[item].Rg;
                            let td5 = document.createElement('td');
                            td5.innerText = getCliente[item].Email;
                            let td6 = document.createElement('td');
                            td6.innerText = getCliente[item].Endereço;
                            let td7 = document.createElement('td');
                            td7.innerText = getCliente[item].Nascido;
                            let td8 = document.createElement('td');
                            td8.innerText = getCliente[item].Funcionario;
                            let td9 = document.createElement('td');
                            td9.innerText = getCliente[item].Observação;
    
                            table.appendChild(tr);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            tr.appendChild(td5);
                            tr.appendChild(td6);
                            tr.appendChild(td7);
                            tr.appendChild(td8);
                            tr.appendChild(td9);
                        }
                    }
                })

            }
        }catch(error){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+ error;
        }
    },
    
    //FUNÇÕES DE SERVIÇOS
    NovoItemServico(getIName, getICateg, getIDescription){
        try {
            let novoItem = {
                Nome : getIName,
                Categoria : getICateg,
                Descrição : getIDescription
            };
            db.item_servicos.insert(novoItem);
            document.querySelector("#nome_novo_servico").value = ""; 
            document.querySelector("#novo_item_desc").value = "";
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Item criado com sucesso!";
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
        }

    },
    AtualizarItems(){
        try {
            $('#item_serv_select').empty();
            $('#item_saude_select').empty();
            db.item_servicos.find({Categoria : "Serviços"},(error, info) => {
                for(var item = 0; item < info.length; item++){
                    $('#item_serv_select').append(new Option(info[item].Nome, info[item].Nome));
                }
            })
            db.item_servicos.find({Categoria : "Saúde"},(error, info) => {
                for(var item = 0; item < info.length; item++){
                    $('#item_saude_select').append(new Option(info[item].Nome, info[item].Nome));
                }
            })
        } catch (error) {
            console.log(error)
        }
    },
    localizarClienteServico(searchValue, getValue){
        try{
            switch (searchValue){
                case 'Nome':
                    db.clientes.find({
                        Nome : getValue
                    },(error, getCliente)=>{
                        if (getCliente == ""){
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                        }else{
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                            document.querySelector('#cliente_name_select').innerHTML = getCliente[0].Nome;    
                        }
                    })
                    break;
                case 'Cpf':
                    db.clientes.find({
                        Cpf : getValue
                    },(error, getCliente)=>{
                        if (getCliente == ""){
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                        }else{
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                            document.querySelector('#cliente_name_select').innerHTML = getCliente[0].Nome;    
                        }
                    })
                    break;
                case 'Rg':
                    db.clientes.find({
                        Rg : getValue
                    },(error, getCliente)=>{
                        if (getCliente == ""){
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                        }else{
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                            document.querySelector('#cliente_name_select').innerHTML = getCliente[0].Nome;    
                        }
                    })
                    break;
                case 'Telefone':
                    db.clientes.find({
                        Telefone : getValue
                    },(error, getCliente)=>{
                        if (getCliente == ""){
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente não localizado!";
                        }else{
                            document.querySelector(".alert_container").style.zIndex = "999"
                            document.querySelector(".alert_msg").innerHTML = "Cliente localizado!";
                            document.querySelector('#cliente_name_select').innerHTML = getCliente[0].Nome;    
                        }
                    })
                    break;
            }
            
        }catch(error){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+ error;
        }
    },
    SalvarServicos(sCliente, sData, sServicos, sSaude, sFuncionario, sRetoque, sDtRetoque, sValor){
        try {
            let novoServico = {
                Cliente : sCliente,
                Data : sData,
                Serviços : sServicos,
                Saude : sSaude,
                Funcionario : sFuncionario,
                Retoque: sRetoque,
                DataRetoque: sDtRetoque,
                Valor : sValor
            };
            db.servicos.insert(novoServico);
            document.querySelector("#cliente_name_select").innerHTML = ""; 
            document.querySelector("#serv_search_input").value = ""; 
            $('#servicos_list').empty();
            $('#saude_list').empty();
            document.querySelector("#novo_serv_funcionario").value = ""; 
            document.querySelector("#valor_serv").value = ""; 
            document.querySelector("#retoque_data").value = ""; 
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Serviço salvo com sucesso";
            
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro Desconhecido: "+ error;
        }
    },
    BuscarServico(bData){
        try {
            let div_table = document.querySelector('.servicos_table');
            $(".servicos_table td").remove(); 
            if (bData != ""){
                db.servicos.find({
                    Data : bData
                }).sort({Data : 1}).exec((error, servico)=>{
                    if (servico.length > 0){
                        for(var serv = 0; serv <servico.length; serv++){
                            let tr = document.createElement('tr');
                            tr.className = 'table_results';
                            let td1 = document.createElement('td');
                            td1.setAttribute('contenteditable','true');
                            td1.innerText = servico[serv].Data;
                            let td2 = document.createElement('td');
                            td2.innerText = servico[serv].Cliente;
                            td2.setAttribute('contenteditable','true');
                            let td3 = document.createElement('td');
                            td3.innerText = servico[serv].Serviços;
                            td3.setAttribute('contenteditable','true');
                            let td4 = document.createElement('td');
                            td4.innerText = servico[serv].Saude;
                            td4.setAttribute('contenteditable','true');
                            let td5 = document.createElement('td');
                            td5.innerText = servico[serv].Retoque;
                            td5.setAttribute('contenteditable','true');
                            let td6 = document.createElement('td');
                            td6.innerText = servico[serv].DataRetoque;
                            td6.setAttribute('contenteditable','true');
                            let td7 = document.createElement('td');
                            td7.innerText = servico[serv].Funcionario;
                            td7.setAttribute('contenteditable','true');
                            let td8 = document.createElement('td');
                            td8.innerText = servico[serv].Valor;
                            td8.setAttribute('contenteditable','true');
                            let td9 = document.createElement('td');
                            td9.value = servico[serv]._id;
                            td9.innerHTML = 'Excluir'
                            td9.setAttribute('onclick','ExcluirServico(this);');
                            td9.className = 'mask_excluir';
                            div_table.appendChild(tr);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            tr.appendChild(td5);
                            tr.appendChild(td6);
                            tr.appendChild(td7);
                            tr.appendChild(td8);
                            tr.appendChild(td9);
                        }
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Venda localizada!";
                    }else{
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Nenhuma venda localizada!";
                    }
                })
            }else{
                db.servicos.find({

                }).sort({Data : 1, Cliente : 1}).exec((error, servico)=>{
                    if (servico.length > 0){
                        for(var serv = 0; serv <servico.length; serv++){
                            let tr = document.createElement('tr');
                            tr.className = 'table_results';
                            let td1 = document.createElement('td');
                            td1.setAttribute('contenteditable','true');
                            td1.innerText = servico[serv].Data;
                            let td2 = document.createElement('td');
                            td2.innerText = servico[serv].Cliente;
                            td2.setAttribute('contenteditable','true');
                            let td3 = document.createElement('td');
                            td3.innerText = servico[serv].Serviços;
                            td3.setAttribute('contenteditable','true');
                            let td4 = document.createElement('td');
                            td4.innerText = servico[serv].Saude;
                            td4.setAttribute('contenteditable','true');
                            let td5 = document.createElement('td');
                            td5.innerText = servico[serv].Retoque;
                            td5.setAttribute('contenteditable','true');
                            let td6 = document.createElement('td');
                            td6.innerText = servico[serv].DataRetoque;
                            td6.setAttribute('contenteditable','true');
                            let td7 = document.createElement('td');
                            td7.innerText = servico[serv].Funcionario;
                            td7.setAttribute('contenteditable','true');
                            let td8 = document.createElement('td');
                            td8.innerText = servico[serv].Valor;
                            td8.setAttribute('contenteditable','true');
                            let td9 = document.createElement('td');
                            td9.value = servico[serv]._id;
                            td9.innerHTML = 'Excluir'
                            td9.setAttribute('onclick','ExcluirServico(this);');
                            td9.className = 'mask_excluir';
                            div_table.appendChild(tr);
                            tr.appendChild(td1);
                            tr.appendChild(td2);
                            tr.appendChild(td3);
                            tr.appendChild(td4);
                            tr.appendChild(td5);
                            tr.appendChild(td6);
                            tr.appendChild(td7);
                            tr.appendChild(td8);
                            tr.appendChild(td9);
                        }
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Venda localizada!";
                    }else{
                        document.querySelector(".alert_container").style.zIndex = "999"
                        document.querySelector(".alert_msg").innerHTML = "Nenhuma venda localizada!";
                    }
                })
            }
                
            
        } catch (error) {
            console.log(error);
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+ error;
        }
    },
    EditarServico(esID,esData,esCliente,esServico,esSaude,esRetoque,esDataRetoque,esFuncionario,esValor){
        try {
            db.servicos.update({
                _id : esID
            },{$set:{
                Data : esData,
                Cliente : esCliente,
                Serviços : esServico,
                Saude : esSaude,
                Retoque : esRetoque,
                DataRetoque : esDataRetoque,
                Funcionario : esFuncionario,
                Valor : esValor
            }})
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Atualizado com sucesso!";
            $(".servicos_table td").remove(); 
        } catch (error) {
            console.log(error);
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+error;
        }
    },
    ExcluirServicos(exID){
        try {
            db.servicos.remove({
                _id : exID
            },{});
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Excluido com sucesso!";
            $(".servicos_table td").remove(); 
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: " + error;
        }
    },
    LocalizaItensServicos(){
        try {
            const table = document.querySelector('.table_items');
            $('.tr_item_class').empty();
            db.item_servicos.find({}).sort({Nome: 1}).exec((error, itens) => {
                for (item = 0; item < itens.length; item++){
                    let tr = document.createElement('tr');
                    tr.className = 'tr_item_class';
                    let td1 = document.createElement('td');
                    td1.innerText = itens[item].Nome;
                    let td2 = document.createElement('td');
                    td2.innerText = itens[item].Categoria;
                    let td3 = document.createElement('td');
                    td3.innerText = itens[item].Descrição;
                    let td4 = document.createElement('td');
                    td4.innerHTML = "Excluir";
                    td4.className = "btn_excluir_item";
                    td4.setAttribute('id',itens[item]._id);
                    td4.setAttribute('onclick', 'ExcluirItem(this);' )

                    table.appendChild(tr);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                 
                }
            })    
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+ error;
        }
    },
    ExcluirItensServico(id){
        try {
            db.item_servicos.remove({
                _id : id
            },{});
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Excluido com sucesso!";
            this.LocalizaItensServicos();
            
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+ error;
        }

    },

    //FUNÇÕES DOS RELATÓRIOS
    RetornoBuscaClientes(info) {
        try {
            let cliente_table = document.querySelector('#table_clientes');
            if (info.length > 0){
                document.querySelector(".alert_container").style.zIndex = "999"
                document.querySelector(".alert_msg").innerHTML = "Serviço(s) localizado(s)!";
                for(var i = 0; i <info.length; i++){
                    let tr = document.createElement('tr');
                    tr.className = 'table_results cl_table';
                    tr.setAttribute('id',info[i]._id);
                    tr.setAttribute('onclick', 'clienteID(this);');
                    let td1 = document.createElement('td');
                    td1.innerText = info[i].Cliente;
                    let td2 = document.createElement('td');
                    td2.innerText = info[i].Data;
                    let td3 = document.createElement('td');
                    td3.innerText = info[i].Serviços;
                    let td4 = document.createElement('td');
                    td4.innerText = info[i].Saude;
                    let td5 = document.createElement('td');
                    td5.innerText = info[i].Funcionario;
                    let td6 = document.createElement('td');
                    td6.innerText = info[i].Retoque;
                    let td7 = document.createElement('td');
                    td7.innerText = info[i].DataRetoque;
                    let td8 = document.createElement('td');
                    td8.innerText = info[i].Valor;
                    cliente_table.appendChild(tr);
                    tr.appendChild(td1);
                    tr.appendChild(td2);
                    tr.appendChild(td3);
                    tr.appendChild(td4);
                    tr.appendChild(td5);
                    tr.appendChild(td6);
                    tr.appendChild(td7);
                    tr.appendChild(td8);
                }
            }else{
                document.querySelector(".alert_container").style.zIndex = "999"
                document.querySelector(".alert_msg").innerHTML = "Nenhum serviço localizado!";
            }
            
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: " + error;
        }
        
    },
    RelBuscarCliente(cliente, data){
        try{
            $('.table_results').empty();
            if (cliente != "" && data != ""){
                db.servicos.find({
                    Cliente : {$in : [cliente]},
                    Data : {$in : [data]}
                }).sort({Data : 1}).exec((error, info) => {
                    this.RetornoBuscaClientes(info);
                })
            }else if (cliente != "" && data == ""){
                db.servicos.find({
                    Cliente : {$in : [cliente]}
                }).sort({Cliente : 1}).exec((error, info) => {
                    this.RetornoBuscaClientes(info);
                })
            }else if (cliente == "" && data != ""){
                db.servicos.find({
                    Data : {$in : [data]}
                }).sort({Cliente : 1}).exec((error, info) => {
                    this.RetornoBuscaClientes(info);
                })
            }else if (cliente == "" && data == ""){
                db.servicos.find({}).sort({Cliente : 1}).exec((error, info) => {
                    this.RetornoBuscaClientes(info);
                })
            }

            
        }catch (error){
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: " + error;
        }
    },
    LocalizarInfoClientes(idCliente){
        try {
            db.servicos.find({
                _id : idCliente
            },(error, info)=>{
                document.querySelector('.cliente_info_container').style.zIndex = '60';
                document.querySelector('#set_cncliente').value = info[0].Cliente;
                document.querySelector('#set_cdata').value = info[0].Data;
                let new_ul = document.createElement('ul');
                for (var item=0; item<info[0].Serviços.length; item++){
                    let new_li = document.createElement('li');
                    new_li.innerHTML = info[0].Serviços[item];
                    new_ul.appendChild(new_li);
                }
                document.querySelector('#ctn_box_list').appendChild(new_ul);
                let new_ul2 = document.createElement('ul');
                for (var item=0; item<info[0].Saude.length; item++){
                    let new_li2 = document.createElement('li');
                    new_li2.innerHTML = info[0].Saude[item];
                    new_ul2.appendChild(new_li2);
                }
                document.querySelector('#ctn2_box_list').appendChild(new_ul2);
                document.querySelector('#set_cfunc').value = info[0].Funcionario;
                document.querySelector('#set_cretoque').value = info[0].Retoque;
                document.querySelector('#set_cdtretoque').value = info[0].DataRetoque;
                document.querySelector('#set_cvalor').value = info[0].Valor;
            })
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: " + error;
        }
        
    },
    
    //FUNÇÕES DA AGENDA
    NovoHorario(dia, horario, cliente, servico, funcionario){
        try {
            let novoAgendamento = {
                Dia : dia,
                Horario : horario,
                Cliente : cliente,
                Serviço : servico,
                Funcionario: funcionario
            }
            db.agenda.insert(novoAgendamento);
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Agendado com sucesso!";
            this.BuscarHorarios(document.querySelector('#date_id').value);

        } catch (error) {
            console.log('Erro na Função NovoHorario no db_functions: '+error);
        }
    },
    BuscarHorarios(dia){
        try {
            $('.agenda_results').empty();
            const table = document.querySelector('.agenda_table');
           db.agenda.find({
               Dia : dia
           }).sort({Horario:1}).exec((error, info) => {
               for(item = 0; item < info.length; item ++){
                    let tr_agenda = document.createElement('tr');
                    tr_agenda.className = 'agenda_results';
                    let td1 = document.createElement('td');
                    let td2 = document.createElement('td');
                    let td3 = document.createElement('td');
                    let td4 = document.createElement('td');
                    let td5 = document.createElement('td');

                    td1.innerText = info[item].Horario;
                    td2.innerText = info[item].Cliente;
                    td3.innerText = info[item].Serviço;
                    td4.innerText = info[item].Funcionario;
                    td5.innerHTML = "Excluir";
                    td5.className = "excluir_horario";
                    td5.setAttribute('id',info[item]._id);
                    td5.className = "btn_excluir_agd"
                    td5.setAttribute('onclick', 'deletarHorario(this);')

                    tr_agenda.appendChild(td1);
                    tr_agenda.appendChild(td2);
                    tr_agenda.appendChild(td3);
                    tr_agenda.appendChild(td4);
                    tr_agenda.appendChild(td5);
                    table.appendChild(tr_agenda);
               }
           }) 
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+error;
        }
    },
    DeletarHorario(id){
        try {
            db.agenda.remove({
                _id : id
            },{});
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Deletado com sucesso!";
            this.BuscarHorarios(document.querySelector('#date_id').value);
        } catch (error) {
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+error;
        }
    }
            
}

