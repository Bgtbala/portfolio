(function () {
  try {
    var theme = localStorage.getItem('portfolio-theme');
    if (theme !== 'future' && theme !== 'classic' && theme !== 'animated') {
      theme = 'classic';
    }
    document.documentElement.setAttribute('data-theme', theme);
  } catch (e) {
    document.documentElement.setAttribute('data-theme', 'classic');
  }
})();
