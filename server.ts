import EventEmitter from "events";

class Server extends EventEmitter {
    constructor(public client: EventEmitter) {
        super();
        client.on("command", (command) => {
            switch (command) {
                case "help":
                case "add":
                case "ls":
                case "delete":
            }
        });
    }
    help() {
        this.emit("response", "help...");
    }
}

export const servo = (client: EventEmitter) => new Server(client);
