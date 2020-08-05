window.$ = window.jQuery = require('jquery');

// EXECUTA QUANDO A PAGINA É CARREGADA
$(document).ready(()=>{ 
    $(document).ready(()=>{
        const data = new Date();
        if (data.getMonth()+1 > 9 && data.getDate() > 9){
            document.querySelector('#date_id').defaultValue = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+data.getDate();
        }
        else if (data.getMonth()+1 < 9 && data.getDate() < 9){
            document.querySelector('#date_id').defaultValue = data.getFullYear()+'-'+'0'+(data.getMonth()+1)+'-'+'0'+data.getDate();
        }
        else if (data.getMonth()+1 < 9 && data.getDate() > 9){
            document.querySelector('#date_id').defaultValue = data.getFullYear()+'-'+'0'+(data.getMonth()+1)+'-'+data.getDate();
        }
        else if (data.getMonth()+1 > 9 && data.getDate() < 9){
            document.querySelector('#date_id').defaultValue = data.getFullYear()+'-'+(data.getMonth()+1)+'-'+'0'+data.getDate();
        }
        
        const data_atual = document.querySelector('#date_id').value;
        const buscarHorario = require('../js/db_functions');
        buscarHorario.BuscarHorarios(data_atual);
    })
})

// ABRIR AGENDAMENTO
document.querySelector('#btn_abrir_agend').onclick = () => {
    document.querySelector('.agendamento_container').style.zIndex = '885';
}

// FECHAR AGENDAMENTO
document.querySelector('#btn_fechar_agd').onclick = () => {
    document.querySelector('#horario_value').value = "";
    document.querySelector('#cliente_value').value = "";
    document.querySelector('#servico_value').value = "";
    document.querySelector('#funcionario_value').value = "";
    document.querySelector('.agendamento_container').style.zIndex = '-500';
}

// SALVAR AGENDAMENTO
document.querySelector('#btn_salvar_agd').onclick = () => {
    try {
        const lb_dia = document.querySelector('#date_id').value;
        const lb_horario = document.querySelector('#horario_value').value;
        const lb_cliente = document.querySelector('#cliente_value').value;
        const lb_servico = document.querySelector('#servico_value').value;
        const lb_funcionario = document.querySelector('#funcionario_value').value;
        const db_save_agend = require('../js/db_functions');
        if (lb_horario != "" && lb_cliente != "" &&  lb_servico != "" && lb_funcionario !=""){
            db_save_agend.NovoHorario(lb_dia, lb_horario, lb_cliente, lb_servico, lb_funcionario);
            document.querySelector('#horario_value').value = "";
            document.querySelector('#cliente_value').value = "";
            document.querySelector('#servico_value').value = "";
            document.querySelector('#funcionario_value').value = "";
        }else{
            document.querySelector(".alert_container").style.zIndex = "999"
            document.querySelector(".alert_msg").innerHTML = "Todos os campos devem ser preenchidos";
        }
    } catch (error) {
        document.querySelector(".alert_container").style.zIndex = "999"
        document.querySelector(".alert_msg").innerHTML = "Erro desconhecido: "+error;
    }
}

// EXCLUIR UM HORARIO
function deletarHorario(horario){
    const deletar = require('../js/db_functions');
    deletar.DeletarHorario(horario.id);
}

// FUNCAO QUE BUSCA OS AGENDAMENTOS CONFORME O HORARIO SELECIONADO
document.querySelector('#date_id').onchange = () => {
    const exibirDias = require('../js/db_functions');
    exibirDias.BuscarHorarios(document.querySelector('#date_id').value);
    
}





