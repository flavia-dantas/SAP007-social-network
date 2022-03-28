import '../../lib/config-firebase.js';
import { userLogout} from '../../lib/config-auth.js';

export default function feed (){
    const container = document.createElement('div');
    const template = `
    <div class="container-feed">
        <h3>Feed</h3>
        <button id="logoutButton" class="logout-button">Logout</button>
    </div>
    `;
     container.innerHTML = template;


     const btnLogout = container.querySelector('#logoutButton');

     btnLogout.addEventListener("click", (e) => {
         e.preventDefault();
         userLogout()
             .then(() => {
                 window.location.hash = '#login';
             }).catch((error) => {
                 return error;
             });
     })
     return container

}