/*
* @jest-environment jsdom
*/

import writePost from "../../src/js/pages/writePost.js";
import { createPost } from "../../src/lib/config-firestore.js";

jest.mock("../../src/lib/exports.js");
jest.mock("../../src/lib/config-firestore.js");

const fnWritePost = writePost();
const postContent = fnWritePost.querySelector("#postContent");
const btnPost = fnWritePost.querySelector("#btnPost");
const errorMessage = fnWritePost.querySelector("#errorMessage");
const inputPlace = fnWritePost.querySelector("#inputPlace");
const inputCity = fnWritePost.querySelector("#inputCity");

describe("writePost", () => {
  it("writePost success", async () => {
    postContent.value = "Este sorvete é uma delícia. Meus preferidos são de nutella e kinder bueno!";
    inputCity.value = "Campo Grande";
    inputPlace.value = "Sésamo";

    btnPost.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("");
    expect(createPost).toHaveBeenCalledTimes(1);
    expect(createPost).toHaveBeenCalledWith(inputPlace.value, inputCity.value, postContent.value);
    expect(window.location.hash).toBe("#feed");
  });

  it("writePost shows message empty postContent ", async () => {
    postContent.value = "";

    btnPost.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("O campo está vazio, verifique.");
  });

  it("writePost shows message empty inputCity ", async () => {
    postContent.value = "Sorvete bom!";
    inputCity.value = "";

    btnPost.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("O campo está vazio, verifique.");
  });

  it("writePost shows message empty inputPlace ", async () => {
    postContent.value = "Sorvete bom!";
    inputCity.value = "Campo Grande";
    inputPlace.value = "";

    btnPost.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("O campo está vazio, verifique.");
  });

  it("writePost shows message small inputPlace ", async () => {
    postContent.value = "Sorvete bom!";
    inputCity.value = "C";
    inputPlace.value = "S";

    btnPost.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("Cidade e Estabelecimento deverão ser maior que 2 caracteres.");
  });

  it("writePost shows message smaller than 20 characters ", async () => {
    inputCity.value = "Campo Grande";
    inputPlace.value = "Sésamo";
    postContent.value = "Muito bom!";

    btnPost.dispatchEvent(new Event("click"));

    expect(errorMessage.textContent).toBe("Sua indicação deverá ser maior que 20 caracteres");
  });
});
