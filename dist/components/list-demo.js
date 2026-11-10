// Интерактивная схема односвязного списка: <div data-demo="list"></div>
document.querySelectorAll('[data-demo="list"]').forEach((el) => {
  const items = [3, 7, 1];
  el.innerHTML = `<div class="demo-row"><input type="number" value="5" aria-label="Значение узла">
    <button data-a="head">В начало</button><button data-a="tail">В конец</button><button data-a="pop">Удалить первый</button></div>
    <div class="chain" aria-live="polite"></div>`;
  const inp = el.querySelector('input'), chain = el.querySelector('.chain');
  const draw = () => (chain.innerHTML = '<span class="ptr">head</span>' +
    items.map((v) => `<span class="arr">→</span><span class="node">${v}</span>`).join('') +
    '<span class="arr">→</span><span class="ptr">null</span>');
  el.addEventListener('click', (e) => {
    const a = e.target.dataset.a; if (!a) return;
    const v = Number(inp.value) || 0;
    if (a === 'head') items.unshift(v); else if (a === 'tail') items.push(v); else items.shift();
    draw();
  });
  draw();
});
