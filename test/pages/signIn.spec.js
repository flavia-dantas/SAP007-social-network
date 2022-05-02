/*
* @jest-environment jsdom
*/

import login from "../../src/js/pages/signIn.js";
// import { signIn, googleLogin } from "../../lib/config-auth.js";

jest.mock("../../src/lib/exports.js");
jest.mock("../../src/lib/config-auth.js");

const fnLogin = login();
const email = fnLogin.querySelector("#inputEmail");
const password = fnLogin.querySelector("#inputPassword");
// const btnLoginGoogle = fnLogin.querySelector("#btnGoogle");
const btnLogin = fnLogin.querySelector("#btnLogin");
const errorMessage = fnLogin.querySelector("#errorMessage");

describe("signIn", () => {
  it("signIn success ", async () => {
    email.value = "darthvader@starwars.com";
    password.value = "estreladamorte";

    btnLogin.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("");
  });
});
