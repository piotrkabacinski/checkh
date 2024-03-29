"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const checkh = () => {
    const amount = process.argv[1] || "5";
    if (isNaN(Number(amount))) {
        console.log("Invalid amount of checkouts");
        return;
    }
    (0, child_process_1.exec)(`git reflog | grep "checkout" | head -${amount}`, async (error, stdout, stderr) => {
        if (error || stderr) {
            console.log(`Error: ${error ? error.message : stderr}`);
            return;
        }
        const branches = stdout
            .split("\n")
            .map((command) => {
                if (command)
                    return command.split("to ")[1];
            })
            .filter((branch) => !!branch);
        if (!branches.length) {
            console.log("No branches to checkout");
            return;
        }
        const unique = [...new Set(branches)].map((name, id) => ({
            id,
            name,
        }));
        console.log(unique.map(({ id, name }) => `${id}: ${name}`).join("\n"));
        const readline = (await Promise.resolve().then(() => require("readline"))).createInterface({
            input: process.stdin,
            output: process.stdout,
        });
        const first = unique[0].id;
        const last = unique[unique.length - 1].id;
        readline.question(`\nPick branch id (from ${first} to ${last}) to checkout or q to quit:`, (answer) => {
            if (answer.toLowerCase() === "q") {
                readline.close();
                return;
            }
            const pickedId = Number(answer);
            if (isNaN(pickedId) || pickedId < first || pickedId > last) {
                console.log("Invalid branch selection");
                readline.close();
                return;
            }
            const branch = unique.find(({ id }) => id === pickedId);
            if (branch) {
                (0, child_process_1.exec)(`git checkout ${branch.name}`, (error, _stdout, stderr) => {
                    if (error || stderr) {
                        console.log(error ? error.message : stderr);
                        return;
                    }
                });
            }
            readline.close();
        });
    });
};
exports.default = checkh;
