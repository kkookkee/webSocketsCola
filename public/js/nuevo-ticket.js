
// Referencias del HTML
const lblNuevoTicket  = document.querySelector('#lblNuevoTicket');
const btnCrear = document.querySelector('button');



const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnCrear.disabled = false;

});

socket.on('uiltimo-ticket', (ultimo) => {
    console.log('ultimo ',ultimo);
    lblNuevoTicket.innerText = 'Ticket '+ultimo;
})


socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnCrear.disabled = true;
});


btnCrear.addEventListener( 'click', () => {

    socket.emit( 'siguiente-ticket', null, ( ticket ) => {
        console.log(ticket);
        lblNuevoTicket.innerText = ticket;
    });

});