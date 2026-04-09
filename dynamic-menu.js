async function loadHeaderAndMenu() {

  /* 1) טעינת ה-header.html */
  const headerHtml = await fetch("/header.html").then(r => r.text());
  document.getElementById("header").innerHTML = headerHtml;

  /* 2) טעינת רשימת הפוסטים מגיטהאב */
  const files = await fetch("https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts")
    .then(r => r.json());

  const nav = document.getElementById("dynamic-nav");

  /* תפריט התחלתי */
  let menu = `/index.htmlראשי</a>`;

  /* פונקציה שמביאה את ה-title מהדף עצמו */
  async function getTitle(fileName) {
    const html = await fetch(`/posts/${fileName}`).then(r => r.text());
    const match = html.match(/<title>(.*?)<\/title>/);
    return match ? match[1] : fileName.replace(".html", "");
  }

  /* לולאה תקינה שתומכת ב-await */
  let links = [];

  for (const f of files) {
    if (f.name.endsWith(".html") && f.name !== "template.html") {
      const title = await getTitle(f.name);
      links.push({ file: f.name, title: title });
    }
  }

  /* בניית תפריט מסודר */
  links.forEach(link => {
    menu += ` | /posts/${link.file}`;
  });

  /* הכנסת התפריט ל-header */
  nav.innerHTML = menu;
}

/* הפעלת הקוד */
loadHeaderAndMenu();
