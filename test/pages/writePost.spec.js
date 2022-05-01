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
const messagePost = fnWritePost.querySelector("#messagePost");

describe("writePost", () => {
  it("writePost not show message ", async () => {
    postContent.value = "Este sorvete é uma delícia. Meus preferidos são de nutella e kinder bueno!";

    btnPost.dispatchEvent(new Event("click"));

    expect(messagePost.textContent).toBe("");
    expect(createPost).toHaveBeenCalledTimes(1);
    expect(window.location.hash).toBe("#feed");
  });
  it("writePost show message empty postContent ", async () => {
    postContent.value = "";

    btnPost.dispatchEvent(new Event("click"));

    expect(messagePost.textContent).toBe("O campo está vazio, verifique.");
  });

  it("writePost show message smaller than 20 characters ", async () => {
    postContent.value = "Muito bom!";

    btnPost.dispatchEvent(new Event("click"));

    expect(messagePost.textContent).toBe("Sua indicação deverá ser maior que 20 caracteres");
  });
});
