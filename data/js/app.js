const { remote } = require('electron');
window.$ = window.jQuery = require('jquery');
var mask = require('jquery-mask-plugin');
$.mask = mask;
window.mask = mask;

// BOTOES DE MINIMIZAR E FECHAR
document.querySelector("#btn_minimize").onclick  = ()=>{
    remote.BrowserWindow.getFocusedWindow().minimize();
}
document.querySelector("#btn_close").onclick  = ()=>{
    remote.BrowserWindow.getFocusedWindow().close();
}

document.querySelector(".alert_btn").onclick = () => {
    document.querySelector(".alert_container").style.zIndex = "-50"
    document.querySelector(".alert_msg").innerHTML = "";
}


//MASCARAS
$(document).ready(function(){
    $(".mask_data").mask('00/00/0000');
    $(".mask_cep").mask('00000-000');
    $(".mask_tel").mask('(00)00000-0000');
    $(".mask_cpf").mask('000.000.000.00');
    $(".mask_rg").mask('00.000.000-0');
    $(".mask_cnpj").mask('00.000.000/0000-00');
    $(".mask_valor").mask('#.##0,00', {reverse: true});
    $(".mask_excluir").mask('Excluir');
    $('.mask_hrs').mask('00:00')
})