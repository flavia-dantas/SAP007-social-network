// /*
// * @jest-environment jsdom
// */

// import { postComponent } from "../../../src/js/components/post.js";
// import { getAuth } from "../../../src/lib/exports.js";

// jest.mock("../../../src/lib/exports.js");

// it("postComponent creates the post element", () => {
//   const authentication = {
//     currentUser: {
//       email: "user@user.com",
//     },
//   };
//   getAuth.mockReturnValueOnce(authentication);
//   const post = {
//     textPost: "teste",
//     userEmail: "user@user.com",
//     date: "11/04/2022",
//   };
//   const component = postComponent(post);
//   const paragraphs = component.querySelectorAll("p");
//   expect(paragraphs).toHaveLength(3);
// });
