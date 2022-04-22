import '../../lib/config-firebase.js';
import { auth } from '../../lib/config-auth.js';
import { createPost } from '../../lib/config-firestore.js';
import { navbar } from '../components/navbar.js';
import { header } from '../components/header.js';

export default function writePost() {
    const container = document.createElement('section');
    const template = `    
    <div class="container-write-post">
        <p>Compartilhe sua indicação</p>
        <textarea id="postContent" class="post-content"></textarea>
        <button id="btnPost" class="btn-post">Postar</button>
    </div>`;
    
    container.appendChild(header());
    container.innerHTML += template;
    container.appendChild(navbar());

    const postContent = container.querySelector('#postContent');
    const btnPost = container.querySelector('#btnPost');

    btnPost.addEventListener("click", (e) => {
        e.preventDefault();
        createPost(postContent.value, auth.currentUser.email);
        window.location.hash = '#feed';
    })

    return container
}