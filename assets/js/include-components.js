// Simple client-side include loader for header/footer components
(function () {
  const load = (selector, url) => {
    const container = document.querySelector(selector);
    console.log('Loading', selector, 'container:', container);
    if (!container) return;
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); // synchronous
    xhr.send();
    if (xhr.status === 200) {
      container.innerHTML = xhr.responseText;
    }
  };

  load('#site-header', '../components/header.html');
  load('#site-footer', '../components/footer.html');
  load('#share', '../components/share.html');
  load('#move-to-top', '../components/move-to-top.html');

  window.__componentsLoaded = true;
  document.dispatchEvent(new CustomEvent('components:loaded'));
})();
