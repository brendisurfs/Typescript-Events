import { EventEmitter } from "events";
import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});
// new event stream connection to server
const client = new EventEmitter();
import { servo } from "./server";
const server = servo(client);

// when there is a repsonse from the server.
server.on("response", (res: string) => {
    process.stdout.write("\u001B[2J\u001B[0;0f"); // clears the ouput
    process.stdout.write(res);
    process.stdout.write(`\n\>`);
});

// when there is user input
rl.on("line", (ipt) => {
    let argsplit = ipt.split(" ");
    let userCmd = argsplit[0];
    let userString = argsplit[1];
    client.emit("command", [userCmd, userString]);
});
