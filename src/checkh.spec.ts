import { expect } from "chai";
import * as childProcess from "child_process";
import { stub, SinonStub } from "sinon";
import checkh from "./checkh";

let consoleStub: SinonStub<any, any>;
let execStub: SinonStub<any, any>;

const createConsoleStub = () =>
  stub(console, "log").callsFake((...args) => args);

describe("Checkh", () => {
  afterEach(() => {
    if (consoleStub) consoleStub.restore();
    if (execStub) execStub.restore();
  });

  it("Should log message when checkouts arg is invalid", () => {
    consoleStub = createConsoleStub();

    checkh("not a number");

    expect(consoleStub.args[0][0]).eq("Invalid amount of checkouts");
  });

  it("Should log error message if git reflog exec fails", async () => {
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

  it("Should log list of unique branches", async () => {
    consoleStub = createConsoleStub();

    let callbackFn: Function;

    execStub = stub(childProcess, "exec").callsFake((...args: any[]): any => {
      callbackFn = args[1];
    });

    checkh();

    const branches = ["Foo", "Bar", "Baz"];
    const notUnique = branches.concat(branches);

    callbackFn(
      undefined,
      notUnique.map((branch) => ` to ${branch}`).join("\n")
    );

    expect(consoleStub.args[0][0]).eq(
      branches.map((branch, index) => `${index}: ${branch}`).join("\n")
    );
  });
});
