import { EventEmitter } from "events";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new EventEmitter();
import { servo } from "./server";
servo(client);

rl.on("line", (ipt) => {
    client.emit("command", ipt);
});
