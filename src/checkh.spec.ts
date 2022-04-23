import { expect } from "chai";
import * as childProcess from "child_process";
import * as readline from "readline";
import { stub, SinonStub } from "sinon";
import checkh from "./checkh";

let consoleStub: SinonStub<any, any>;
let execStub: SinonStub<any, any>;
let readlineStub: SinonStub<any, any>;

const uniqueBranches = ["Foo", "Bar", "Baz"];
const notUniqueBranches = uniqueBranches.concat(uniqueBranches);

const sleep = (): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    });
  });

const createConsoleStub = () =>
  stub(console, "log").callsFake((...args) => args);

describe("Checkh", () => {
  afterEach(() => {
    if (consoleStub) consoleStub.restore();
    if (execStub) execStub.restore();
    if (readlineStub) readlineStub.restore();
  });

  it("Should log message when checkouts arg is invalid", () => {
    consoleStub = createConsoleStub();

    checkh("not a number");

    expect(consoleStub.args[0][0]).eq("Invalid amount of checkouts");
  });

  it("Should log error message if `git reflog` exec fails", async () => {
    consoleStub = createConsoleStub();

    let callbackFn: Function;

    execStub = stub(childProcess, "exec").callsFake((...args: any[]): any => {
      callbackFn = args[1];
    });

    checkh();

    const error = {
      message: "An error message",
    };

    callbackFn(error);

    expect(consoleStub.args[0][0]).eq(`Error: ${error.message}`);
  });

  it("Should log message if there're no branches to checkout", async () => {
    consoleStub = createConsoleStub();

    let callbackFn: Function;

    execStub = stub(childProcess, "exec").callsFake((...args: any[]): any => {
      callbackFn = args[1];
    });

    checkh();

    callbackFn(undefined, "");

    expect(consoleStub.args[0][0]).eq(`No branches to checkout`);
  });

  it("Should log formatted list of unique branches", async () => {
    consoleStub = createConsoleStub();

    let callbackFn: Function;

    execStub = stub(childProcess, "exec").callsFake((...args: any[]): any => {
      callbackFn = args[1];
    });

    readlineStub = stub(readline, "createInterface").callsFake((): any => {
      return {
        question: () => undefined,
        close: () => undefined,
      };
    });

    checkh();

    callbackFn(
      undefined,
      notUniqueBranches.map((branch) => ` to ${branch}`).join("\n")
    );

    expect(consoleStub.args[0][0]).eq(
      uniqueBranches.map((branch, index) => `${index}: ${branch}`).join("\n")
    );
  });

  it("Should show error message when user pick invalid branch Id", async () => {
    consoleStub = createConsoleStub();

    let execCallbackFn: Function;
    let answerCallbackFn: Function;

    execStub = stub(childProcess, "exec").callsFake((...args: any[]): any => {
      execCallbackFn = args[1];
    });

    readlineStub = stub(readline, "createInterface").callsFake((): any => {
      return {
        question: (_message, cb) => {
          answerCallbackFn = cb;
        },
        close: () => undefined,
      };
    });

    checkh();

    execCallbackFn(
      undefined,
      notUniqueBranches.map((branch) => ` to ${branch}`).join("\n")
    );

    consoleStub.reset();

    await sleep();

    answerCallbackFn(`${notUniqueBranches.length + 5}`);

    expect(consoleStub.args[0][0]).eq(`Invalid branch selection`);
  });

  it("Should run `git checkout` command with selected branch name", async () => {
    consoleStub = createConsoleStub();

    let execCallbackFn: Function;
    let answerCallbackFn: Function;

    execStub = stub(childProcess, "exec").callsFake((...args: any[]): any => {
      execCallbackFn = args[1];
    });

    readlineStub = stub(readline, "createInterface").callsFake((): any => {
      return {
        question: (_message, cb) => {
          answerCallbackFn = cb;
        },
        close: () => undefined,
      };
    });

    checkh();

    execCallbackFn(
      undefined,
      notUniqueBranches.map((branch) => ` to ${branch}`).join("\n")
    );

    consoleStub.reset();
    execStub.reset();

    await sleep();

    const selectedId = uniqueBranches.length - 1;

    answerCallbackFn(`${selectedId}`);

    expect(execStub.args[0][0]).eq(
      `git checkout ${uniqueBranches[selectedId]}`
    );
  });
});
