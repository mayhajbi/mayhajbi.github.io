async function loadHeaderAndMenu() {

  // 1) טוען את ה־header.html לתוך #header
  const headerHtml = await fetch("/header.html").then(r => r.text());
  document.getElementById("header").innerHTML = headerHtml;

  // 2) מביא את רשימת הפוסטים מתוך GitHub
  const files = await fetch("https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts")
    .then(r => r.json());

  // זה ה־NAV שנמצא בתוך header.html
  const nav = document.getElementById("dynamic-nav");

  // 3) תחילת התפריט
  let menu = `<a href="/index.html">ראשי</a>`;

  // 4) פונקציה שמביאה את <title> מתוך קובץ HTML
  async function getTitle(fileName) {
    const html = await fetch(`/posts/${fileName}`).then(r => r.text());
    const match = html.match(/<title>(.*?)<\/title>/);
    return match ? match[1] : fileName.replace(".html", "");
  }

  // 5) יצירת רשימת הפוסטים
  for (const f of files) {
    if (f.name.endsWith(".html") && f.name !== "template.html") {
      const title = await getTitle(f.name);
      menu += ` | <a href="/posts/${f.name // 6) הצגת התפריט ב־header
  nav.innerHTML = menu;
}

loadHeaderAndMenu();
