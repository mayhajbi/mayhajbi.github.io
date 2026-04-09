async function loadHeaderAndMenu() {

    const header = await fetch("/header.html").then(r => r.text());
    document.getElementById("header").innerHTML = header;

    const files = await fetch("https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts")
        .then(r => r.json());

    const nav = document.getElementById("dynamic-nav");

    let menu = `<a href="/lראשי</a>`;

    async function getTitle(fileName) {
        const html = await fetch(`/posts/${fileName}`).then(r => r.text());
        const match = html.match(/<title>(.*?)<\/title>/);
        return match ? match[1] : fileName.replace(".html", "");
    }

    for (const f of files) {
        if (f.name.endsWith(".html") && f.name !== "template.html") {
            const title = await getTitle(f.name);
            menu += ` | <a href="/posts}${title}</a>`;
        }
    }

    nav.innerHTML = menu;
}

loadHeaderAndMenu();
