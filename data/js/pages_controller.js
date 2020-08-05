window.$ = window.jQuery = require('jquery');

// FUNÇÕES DOS BOTOÕES DO NAVBAR
document.querySelector("#btn_inicio").onclick = () => {
    $(".info_container").empty();
    $(".info_container").load('../pages/inicio.html');
}
document.querySelector("#btn_clientes").onclick = () => {
    $(".info_container").empty();
    $(".info_container").load('../pages/clientes.html');
}
document.querySelector("#btn_servicos").onclick = () => {
    $(".info_container").empty();
    $(".info_container").load('../pages/servicos.html');
}
document.querySelector("#btn_relatorios").onclick = () => {
    $(".info_container").empty();
    $(".info_container").load('../pages/relatorios.html');
}
document.querySelector('#btn_agenda').onclick = () => {
    $(".info_container").empty();
    $(".info_container").load('../pages/agenda.html');
}
