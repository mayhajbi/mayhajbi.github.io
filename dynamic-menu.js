async function loadHeaderAndMenu() {

  const headerHtml = await fetch("/header.html").then(r => r.text());
  document.getElementById("header").innerHTML = headerHtml;

  const files = await fetch("https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts")
    .then(r => r.json());

  const nav = document.getElementById("dynamic-nav");

  let menu = `/index.htmlראשי</a>`;

  files.forEach(f => {
    if (f.name.endsWith(".html") && f.name !== "template.html") {
      async function getTitleForPost(fileName) {
        const html = await fetch(`/posts/${fileName}`).then(r => r.text());
        const match = html.match(/<title>(.*?)<\/title>/);
        return match ? match[1] : fileName.replace(".html",""); 
      }
      const title = await getTitleForPost(f.name);
      menu += ` | /posts/${f.name}`;   
    }
  });

  nav.innerHTML = menu;
}

loadHeaderAndMenu();
