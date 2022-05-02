/*
* @jest-environment jsdom
*/

import { postComponent } from "../../../src/js/components/post.js";

jest.mock("../../../src/lib/exports.js");

const post = {
  textPost: "teste",
  userEmail: "user@user.com",
  date: new Date(),
  like: [],
};
const component = postComponent(post);

it("postComponent creates the post element", () => {
  const paragraphs = component.querySelectorAll("p");
  expect(paragraphs).toHaveLength(5);
});
