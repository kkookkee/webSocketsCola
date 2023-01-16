const TicketControl = require("../../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {

    socket.emit('uiltimo-ticket',ticketControl.ultimo);
    socket.emit('estado-actual',ticketControl.ultimos4)
    socket.emit('cola-ticket',ticketControl.tickets.length);
    socket.on('siguiente-ticket',(payload,callback)=>{
        const siguiente = ticketControl.next()
        callback(siguiente)

        //todo notificar nuevo ticket
    })
    socket.on('atender-ticket',({escritorio},callback)=>{
        if(!escritorio){
            return callback({
                ok: false,
                msg: 'Escritorio obligatorio'
            })
        }

        const ticket = ticketControl.atenderTicket(escritorio);
        socket.broadcast.emit('estado-actual',ticketControl.ultimos4);

        if (!ticket) {
            callback({
                ok: false,
                msg: 'No hay mas tickets'
            })
        } else {
            callback({
                ok: true,
                ticket
            })
        }
    })
}


module.exports = {
    socketController
}