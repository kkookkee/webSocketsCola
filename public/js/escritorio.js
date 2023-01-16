
const lblEscritorio = document.querySelector('h1');
const btnAtender = document.querySelector('button')
const lblTicket = document.querySelector('small')
const divAlerta = document.querySelector('#alert')
const lblPendientes = document.querySelector('#lblPendientes')

const searchParams = new URLSearchParams(window.location.search);

if(!searchParams.has('escritorio')){
    window.location = 'index.html';
    throw new Error('El escritorio es obligatorio');
}
const escritorio = searchParams.get('escritorio')
lblEscritorio.innerText = 'Escritorio ' + escritorio;
divAlerta.style.display = 'none'

const socket = io();



socket.on('connect', () => {
    // console.log('Conectado');
    btnAtender.disabled = false;

});

socket.on('cola-ticket',(payload)=>{
    lblPendientes.innerText = payload
})

socket.on('disconnect', () => {
    // console.log('Desconectado del servidor');
    btnAtender.disabled = true;
});


btnAtender.addEventListener( 'click', () => {
    const audio = new Audio('./audio/new-ticket.mp3');
    audio.play()
    socket.emit( 'atender-ticket', {escritorio}, ( {ok,ticket,msg} ) => {
        console.log(ticket);
        if(!ok || ticket == undefined){
            divAlerta.style.display = '';
        } 
        else {
            console.log(ticket);
            lblTicket.innerText = 'Ticket ' + ticket.numero;
        }
        
    });

});