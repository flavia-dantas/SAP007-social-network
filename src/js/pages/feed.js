import '../../lib/config-firebase.js';
import { getPost } from '../../lib/config-firestore.js';
import { postComponent } from '../components/post.js';
import { navbar } from '../components/navbar.js';
import { header } from '../components/header.js';

export default function feed() {
    const container = document.createElement('section');
    const template = `
    <h3>Feed</h3>
    <div id="showPost" class="show-post"></div>    
    `;

    container.appendChild(header());
    container.innerHTML += template;
    container.appendChild(navbar());
  

    const sectionPost = container.querySelector('#showPost');

    const showAllPosts = async () => {
        const allPosts = await getPost();
        allPosts.forEach(item => {
            const postElement = postComponent(item);
            sectionPost.prepend(postElement);
        })
    }
    showAllPosts();
    return container
}




