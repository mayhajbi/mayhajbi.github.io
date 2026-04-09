
fetch('https://api.github.com/repos/mayhajbi/mayhajbi.github.io/contents/posts')
  .then(r => r.json())
  .then(files => {
    const list = document.getElementById('posts-list');
    files.forEach(f => {
      if (f.name.endsWith('.html')) {
        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = 'posts/' + f.name;
        a.textContent = f.name.replace('.html','').replace(/-/g,' ');
        li.appendChild(a);
        list.appendChild(li);
      }
    });
  });
