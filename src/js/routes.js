import register from "./pages/register.js";
import login from "./pages/signIn.js";
import feed from "./pages/feed.js";
import writePost from "./pages/writePost.js";
import { verifyUserLogged } from "../lib/config-auth.js";

const main = document.getElementById("root");

const redirect = () => {
  switch (window.location.hash) {
    case "#login":
      main.appendChild(login());
      break;
    case "#register":
      main.appendChild(register());
      break;
    case "#feed":
      verifyUserLogged((loggedIn) => {
        if (loggedIn) {
          main.appendChild(feed());
        } else {
          window.location.hash = "#login";
        }
      });
      break;
    case "#writePost":
      verifyUserLogged((loggedIn) => {
        if (loggedIn) {
          main.appendChild(writePost());
        } else {
          window.location.hash = "#login";
        }
      });
      break;
    default:
      main.appendChild(login());
  }
};

const init = () => {
  window.addEventListener("hashchange", () => {
    main.innerHTML = "";
    redirect();
  });
};

window.addEventListener("load", () => {
  redirect();
  init();
});
