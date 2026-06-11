
    window.addEventListener("load", () => {
      const loading = document.getElementById("loading");
      setTimeout(() => {
        loading.classList.add("esconder");
        setTimeout(() => { loading.style.display = "none"; }, 500);
      }, 1000);
    });

    const track = document.getElementById('track');
    const slides = track.querySelectorAll('.slide');
    const dotsContainer = document.getElementById('dots');
    const contador = document.getElementById('contador');
    let atual = 0;

    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = 'dot' + (i === 0 ? ' ativo' : '');
      dot.addEventListener('click', () => ir(i));
      dotsContainer.appendChild(dot);
    });

    function ir(index) {
      atual = (index + slides.length) % slides.length;
      track.style.transform = `translateX(-${atual * 100}%)`;
      document.querySelectorAll('.dot').forEach((d, i) =>
        d.classList.toggle('ativo', i === atual));
      contador.textContent =
        String(atual + 1).padStart(2, '0') + ' / ' +
        String(slides.length).padStart(2, '0');
    }

    document.getElementById('prev').addEventListener('click', () => ir(atual - 1));
    document.getElementById('next').addEventListener('click', () => ir(atual + 1));

    document.addEventListener('keydown', e => {
      if (e.key === 'ArrowLeft') ir(atual - 1);
      if (e.key === 'ArrowRight') ir(atual + 1);
    });
  
      function toggleTheme() {
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme') === 'dark';
    html.setAttribute('data-theme', isDark ? 'light' : 'dark');
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
    document.querySelector('.theme-toggle-icon').textContent = isDark ? '🌙' : '☀️';
  }

  (function () {
    const saved = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    const icon = document.querySelector('.theme-toggle-icon');
    if (icon) icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  })();