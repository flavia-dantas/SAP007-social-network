export function footer() {
  const container = document.createElement("footer");
  container.classList.add("container-footer");

  const template = `
    <p class="footer-text">Desenvolvido por 
    <a class="github" target="_blank" href="https://github.com/flavia-dantas/">Flavia Almeida</a>,
    <a class="github" target="_blank" href="https://github.com/GabrielaMedrado/">Gabriela Medrado e</a>
    <a class="github" target="_blank" href="https://github.com/lidiannerb/">Lidianne Barbosa</a>
    </p>
    `;

  container.innerHTML = template;

  return container;
}
