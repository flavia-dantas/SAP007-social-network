import '../../lib/config-firebase.js';

export function gettingPost(post) {
    const postsContainer = document.createElement('div');
    const templatePost =
        `        
    <div class="container-timeline">
        <p>${post.textPost}</p>
        <p>${post.userEmail}</p>
        <p>${post.date}</p>
        
        <div class="container-likes">
            <button id="like" class="like">Curtir</button>
            <span id="numLikes" class="num-likes">0</span>
            <button id="editButton" class="edit-button">Editar</button>
            <button id="deleteButton" class="delete-button">Excluir</button>
        </div>
    </div>      
    `
    postsContainer.innerHTML = templatePost;

    return postsContainer;
}