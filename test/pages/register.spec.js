/*
* @jest-environment jsdom
*/

import register from "../../src/js/pages/register.js";

jest.mock("../../src/lib/exports.js");

describe("page register", () => {
  it("It should return an error", () => {
    const registerUser = register();
    const inputEmail = registerUser.querySelector("#inputEmail");
    inputEmail.value = "";
    const btn = registerUser.querySelector("#btnRegister");
    btn.dispatchEvent(new Event("click"));
    const errorMessage = registerUser.querySelector("#errorMessage");
    console.log(errorMessage);
    expect(errorMessage.textContent).toBe("Por favor, preencha todos os campos.");
  });
});
