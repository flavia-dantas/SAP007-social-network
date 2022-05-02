/*
* @jest-environment jsdom
*/

import login from "../../src/js/pages/signIn.js";

jest.mock("../../src/lib/exports.js");
jest.mock("../../src/lib/config-auth.js");

const fnLogin = login();
const email = fnLogin.querySelector("#inputEmail");
const password = fnLogin.querySelector("#inputPassword");
const btnLogin = fnLogin.querySelector("#btnLogin");
const errorMessage = fnLogin.querySelector("#errorMessage");

describe("signIn", () => {
  it("signIn email empty ", async () => {
    email.value = "";
    password.value = "estreladamorte";

    btnLogin.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("Por favor, preencha todos os campos.");
  });

  it("signIn password empty ", async () => {
    email.value = "darthvader@starwars.com";
    password.value = "";

    btnLogin.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("Por favor, preencha todos os campos.");
  });
});
