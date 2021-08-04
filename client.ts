import { EventEmitter } from "events";
import child_process from "child_process";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

const client = new EventEmitter();
import { servo } from "./server";
const server = servo(client);

// when there is user input
rl.on("line", (ipt) => {
    console.clear(); // clears the ouput
    client.emit("command", ipt);
});

// when there is a repsonse from the server.
server.on("response", (res: any) => {
    console.log(`${res}`);
});
