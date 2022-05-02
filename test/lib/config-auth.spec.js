import { createUser } from "../../src/lib/config-auth.js";
import { createUserWithEmailAndPassword } from "../../src/lib/exports.js";

jest.mock("../../src/lib/exports.js");

it("createUser should create an user with email and password", async () => {
  const userEmail = "user@user.com";
  createUserWithEmailAndPassword.mockResolvedValueOnce({
    user: {
      email: userEmail,
    },
  });
  const user = await createUser(userEmail, "123456");

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
  expect(user.email).toBe(userEmail);
});
