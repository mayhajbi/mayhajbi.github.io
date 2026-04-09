async function loadHeaderAndMenu() {

    /* 1) טוען את header.html */
    const header = await fetch("/header.html").then(r => r.text());
    document.getElementById("header").innerHTML = header;

    /* 2) מביא את רשימת הפוסטים */
    const files = await fetch("https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts")
        .then(r => r.json());

    const nav = document.getElementById("dynamic-nav");

    /* 3) תפריט ראשי */
    let menu = `<a href="/lראשי</a>`;

    /* 4) פונקציה שמביאה את הכותרת מתוך <title> */
    async function getTitle(fileName) {
        const html = await fetch(`/posts/${fileName}`).then(r => r.text());
        const match = html.match(/<title>(.*?)<\/title>/);
        return match ? match[1] : fileName.replace(".html", "");
    }

    /* 5) בונה רשימת קישורים אמיתית */
    for (const f of files) {
        if (f.name.endsWith(".html") && f.name !== "template.html") {
            const title = await getTitle(f.name);
            menu += ` | <a href="/posts}${title}</a>`;
        }
    }

    /* 6) מכניס את הכל לניווט */
    nav.innerHTML = menu;
}

loadHeaderAndMenu();
