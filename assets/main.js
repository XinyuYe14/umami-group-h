// Copy buttons for code blocks + highlight the current page in the nav.
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.code').forEach((block) => {
    const pre = block.querySelector('pre');
    if (!pre) return;
    const btn = document.createElement('button');
    btn.className = 'copy';
    btn.type = 'button';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.innerText);
        btn.textContent = 'Copied';
      } catch (e) {
        btn.textContent = 'Select and copy';
      }
      setTimeout(() => (btn.textContent = 'Copy'), 1500);
    });
    block.appendChild(btn);
  });

  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav a').forEach((a) => {
    if (a.getAttribute('href') === page) a.setAttribute('aria-current', 'page');
  })

});
