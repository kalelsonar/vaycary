import { Server } from "socket.io";
import { socketPort } from "../config";
const io = new Server(socketPort);

const socketRoutes = (app) => {

    io.on('connection', async function (socket) {
        app.post('/socketNotification', async function (req, res) {
            let endpoint, content;
            endpoint = req.body.endPoint;
            content = req.body.content;
            io.emit(endpoint, content)
            res.send({ status: 200, errorMessage: null });
        });
    });
}
export default socketRoutes
