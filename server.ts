import EventEmitter from "events";

class Server extends EventEmitter {
    constructor(public client: EventEmitter) {
        super();
        process.nextTick(() => {
            this.emit("response", "type a command (help to list commands)");
        });
        client.on("command", (command: string) => {
            switch (command) {
                case "help":
                case "add":
                case "ls":
                case "delete":
                    this[command]();
                    break;
                default:
                    this.emit("response", "unknown repsonse");
            }
        });
    }
    help(): void {
        this.emit("response", "help...");
    }
    add(): void {
        this.emit("response", "add time!");
    }
    ls(): void {
        this.emit("response", "ls..");
    }
    delete() {
        this.emit("response", "delete...");
    }
}

export const servo = (client: EventEmitter) => new Server(client);
