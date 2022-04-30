import { createUser } from "../../src/lib/config-auth.js";
import { createUserWithEmailAndPassword } from "../../src/lib/exports.js";

jest.mock("../../src/lib/exports.js");

it("createUser should create an user with email and password", async () => {
  createUserWithEmailAndPassword.mockResolvedValue({
    user: {},
  });
  const user = await createUser("user@user.com", "123456");
  console.log(user);

  expect(createUserWithEmailAndPassword).toHaveBeenCalledTimes(1);
});
