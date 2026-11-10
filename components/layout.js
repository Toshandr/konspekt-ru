// Общий каркас: шапка, сайдбар-содержание, страница курса, пагинация, кнопки «Копировать», подвал.
(function () {
  const S = window.SITE, B = S.base, u = (p) => B + p;
  const path = (location.pathname.slice(B.length).replace(/\/$/, '')) || '/';
  const cur = S.courses.find((c) => path === c.path || path.startsWith(c.path + '/'));
  const body = document.body;

  const header = document.createElement('header');
  header.className = 'site-header';
  header.innerHTML = `<div class="wrap"><a class="brand" href="${u('/main')}">${S.name}</a>
    <nav class="tabs" aria-label="Курсы">${S.courses.map((c) =>
      `<a class="tab${cur && cur.id === c.id ? ' active' : ''}" href="${u(c.path)}">${c.title}</a>`).join('')}</nav></div>`;
  body.prepend(header);

  const content = document.querySelector('.content');
  const idx = cur ? cur.lectures.findIndex((l) => l.path === path) : -1;

  // Страница курса (рендерится из courses.js)
  const root = document.getElementById('course');
  if (root && cur) {
    const lec = cur.lectures.map((l, i) => `<li><a class="lec" href="${u(l.path)}"><span class="n">${i + 1}</span>
      <span><b>${l.title}</b>${l.ready ? '' : ' <i class="soon">скоро</i>'}<small>${l.desc || ''}</small></span></a></li>`).join('');
    root.innerHTML = `<h1 class="course-title">${cur.title}</h1><p class="course-about">${cur.about}</p>
      <div class="meta"><p><b>Преподаватель:</b> ${cur.teacher || 'уточняется'}</p>
      <p><b>Литература:</b> ${cur.literature || 'уточняется'}</p></div>
      <h2 class="contents-title">Содержание</h2>
      ${lec ? `<ol class="contents">${lec}</ol>` : '<p class="stub-tag">Раздел в разработке</p>'}`;
  }

  // Сайдбар: список лекций курса + заголовки текущей лекции
  if (body.hasAttribute('data-sidebar') && cur && content) {
    const heads = [...document.querySelectorAll('.lecture h2')];
    heads.forEach((h, i) => (h.id = h.id || 'sec' + (i + 1)));
    const items = cur.lectures.map((l, i) => `<li><a href="${u(l.path)}" class="${i === idx ? 'active' : ''}">${i + 1}. ${l.title}</a>
      ${i === idx && heads.length ? `<ul>${heads.map((h) => `<li><a href="#${h.id}">${h.textContent}</a></li>`).join('')}</ul>` : ''}</li>`).join('');
    const aside = document.createElement('aside');
    aside.className = 'sidebar';
    aside.innerHTML = `<h3><a href="${u(cur.path)}">${cur.title}</a></h3><ul>${items || '<li class="empty">Лекции появятся позже</li>'}</ul>`;
    content.before(aside);
    // подсветка текущего раздела при прокрутке
    const links = aside.querySelectorAll('ul ul a');
    if (heads.length && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver((es) => es.forEach((e) => {
        if (e.isIntersecting) links.forEach((a) => a.classList.toggle('active', a.hash === '#' + e.target.id));
      }), { rootMargin: '-15% 0px -75% 0px' });
      heads.forEach((h) => io.observe(h));
    }
  }

  // Назад / вперёд
  if (idx >= 0 && content && document.querySelector('.lecture')) {
    const p = cur.lectures[idx - 1], n = cur.lectures[idx + 1];
    const nav = document.createElement('nav');
    nav.className = 'pager';
    nav.innerHTML = (p ? `<a href="${u(p.path)}">← ${p.title}</a>` : '<span></span>') + (n ? `<a class="next" href="${u(n.path)}">${n.title} →</a>` : '<span></span>');
    content.append(nav);
  }

  // Копирование кода
  document.querySelectorAll('.lecture pre').forEach((pre) => {
    const code = pre.innerText;
    const b = document.createElement('button');
    b.className = 'copy'; b.type = 'button'; b.textContent = 'Копировать';
    b.onclick = () => navigator.clipboard.writeText(code.trim())
      .then(() => { b.textContent = 'Скопировано'; setTimeout(() => (b.textContent = 'Копировать'), 1500); });
    pre.append(b);
  });

  const f = document.createElement('footer');
  f.className = 'footer';
  f.innerHTML = `<div class="wrap">Некоммерческий учебный проект. <a href="${u('/main')}#feedback">Написать отзыв</a></div>`;
  body.append(f);
})();
