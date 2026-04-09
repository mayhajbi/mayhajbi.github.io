async function loadHeaderAndMenu() {

  // טוען את header.html ומכניס אותו לכל דף באתר
  const headerHtml = await fetch("/header.html").then(r => r.text());
  document.getElementById("header").innerHTML = headerHtml;

  // מביא את רשימת הפוסטים מתוך GitHub
  const files = await fetch("https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts")
    .then(r => r.json());

  const nav = document.getElementById("dynamic-nav");

  // מתחיל את התפריט עם קישור לעמוד הראשי
  let menu = `/index.htmlראשי</a>`;

  // פונקציה שמביאה את כותרת הדף מתוך ה-<title>
  async function getTitleForPost(fileName) {
    const html = await fetch(`/posts/${fileName}`).then(r => r.text());
    const match = html.match(/<title>(.*?)<\/title>/);
    return match ? match[1] : fileName.replace(".html", "");
  }

  // לולאה תקינה שמחכה ל-await
  for (const f of files) {
    if (f.name.endsWith(".html") && f.name !== "template.html") {
      const title = await getTitleForPost(f.name);
      menu += ` | /posts/${f.name}`;
    }
  }

  // מכניס את התפריט המלא לניווט
  nav.innerHTML = menu;
}

loadHeaderAndMenu();
