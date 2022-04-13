export function navbar() {
    const container = document.createElement("nav");
    container.classList.add("container-nav");

    const template = `
    <button id="btnHome" class="btn-home">
        <img src="../img/icon-home.png" alt="button-home">
    </button>
    <button id="btnNewPost" class="btn-new-post">
      <img src="../img/icon-new-post.png" alt="button-new-post">
    </button>
    <button id="btnLogout" class="btn-logout">
        <img src="../img/icon-logout.png" alt="button-logout">
    </button>
    `;

    container.innerHTML = template;

    return container;
}