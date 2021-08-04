import EventEmitter from "events";
import fs from "fs";

class Server extends EventEmitter {
    constructor(public client: EventEmitter) {
        super();
        process.nextTick(() => {
            this.emit("response", "type a command (help to list commands)");
        });
        client.on("command", (command: string[]) => {
            let userCmd = command[0];
            let userString = command[1];
            switch (userCmd) {
                case "help":
                case "add":
                case "ls":
                case "delete":
                    this[userCmd](userString);
                    break;
                default:
                    this.emit("response", "unknown repsonse");
            }
        });
    }
    help(): void {
        this.emit("response", "help...");
    }
    add(info: string): void {
        this.emit("response", "add time!");
        let userStore: string[] = [...info];
        fs.writeFile("./list.txt", (err, res) => {});
    }
    ls(): void {
        this.emit("response", "ls..");
        fs.readFile("./list.txt", (err, res) => {
            if (err) {
                console.error(err);
            } else {
                this.emit("response", `contents:\n ${res}`);
            }
        });
    }
    delete() {
        this.emit("response", "delete...");
    }
}

export const servo = (client: EventEmitter) => new Server(client);
