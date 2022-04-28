/*
* @jest-environment jsdom
*/

import { postComponent } from "../../../src/js/components/post.js";

it("postComponent cria o elemento de post", () => {
  const post = {
    textPost: "teste",
    userEmail: "lidianne@gmail.com",
    date: "11/04/2022",
  };
  const component = postComponent(post);
  const paragraphs = component.querySelectorAll("p");
  expect(paragraphs).toHaveLength(3);
});
