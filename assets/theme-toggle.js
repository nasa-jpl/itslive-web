// Light/dark theme switch. The initial theme is applied by an inline script in
// the document head so there is no flash of the wrong theme.
(function () {
  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') === 'light' ? 'light' : 'dark';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);

    var light = document.getElementById('theme-light');
    var dark = document.getElementById('theme-dark');
    if (light && dark) {
      light.disabled = theme !== 'light';
      dark.disabled = theme !== 'dark';
    }

    try {
      localStorage.setItem('itslive-theme', theme);
    } catch (e) {}

    var isLight = theme === 'light';
    Array.prototype.forEach.call(document.querySelectorAll('.theme-toggle'), function (button) {
      button.setAttribute('aria-pressed', isLight ? 'true' : 'false');
      button.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      button.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    });
  }

  document.addEventListener('click', function (event) {
    var button = event.target.closest ? event.target.closest('.theme-toggle') : null;
    if (!button) return;
    event.preventDefault();
    applyTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  });

  // Reflect the initial state on the toggle buttons.
  applyTheme(currentTheme());
})();
