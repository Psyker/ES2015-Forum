import xss from 'xss-filters';

let ui = {
    renderPosts(posts) {
        let elements = posts.map((post) => {
            let { title, lastReply } = post;
            return articleTemplate(title, lastReply)
        });
        let target = document.querySelector(".container");
        target.innerHTML = elements.join("");
        console.log(posts)
    },

    renderUsers(users) {
        let elements = users.map((user) => {
            let { name, avatar} = user;
            return userTemplate(name, avatar)
        });
        let target = document.querySelector(".sidebar-content");
        target.innerHTML = elements.join("")
    }
};

function articleTemplate(title, lastReply) {
    let safeTitle = xss.inHTMLData(title);
    let safeLastReply = xss.inHTMLData(lastReply);

    let articleTemplate = `<article class='post'>
      <h2 class='post-title'>
        ${safeTitle}
      </h2>
      <p class='post-meta'>
        ${safeLastReply}
      </p>
    </article>`;

    return articleTemplate;
}

function userTemplate(name, avatar) {
    let safeName = xss.inHTMLData(name);
    let safeAvatar = xss.inHTMLData(avatar);

    let userTemplate = `
    <div class="active-avatar">
    <img width="54" src="assets/images/${safeAvatar}">
    <h5 class="post-author">${safeName}</h5>
    </div>`;

    return userTemplate;
}

export default ui;