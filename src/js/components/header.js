export function header() {
    const container = document.createElement("header");
    container.classList.add("container-header");

    const template = `
    <img class="logo-header" src="./img/icon-goodfood.png" alt="logo-header">
    `;

    container.innerHTML = template;

    return container;
}