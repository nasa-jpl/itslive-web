// Active-section highlighting + a compact sticky navigation bar that appears
// once the hero has been scrolled past.
document.addEventListener('DOMContentLoaded', function () {
  var menu = document.getElementById('navMenu');
  if (!menu) return;

  var links = Array.prototype.slice.call(menu.querySelectorAll('a.navbar-item'));
  var sectionLinks = links.filter(function (link) {
    return link.getAttribute('href').charAt(0) === '#';
  });

  var sections = sectionLinks
    .map(function (link) { return document.getElementById(link.getAttribute('href').slice(1)); })
    .filter(Boolean);

  var sticky = buildStickyNav(links);
  var clonesByHref = {};
  Array.prototype.forEach.call(sticky.querySelectorAll('a.navbar-item'), function (clone) {
    clonesByHref[clone.getAttribute('href')] = clone;
  });

  function setActive(href) {
    links.concat(Array.prototype.slice.call(sticky.querySelectorAll('a.navbar-item'))).forEach(function (link) {
      link.classList.toggle('is-current', link.getAttribute('href') === href);
    });
  }

  function updateActive() {
    if (!sections.length) return;
    var probe = window.scrollY + window.innerHeight * 0.35;
    var current = sections[0];
    sections.forEach(function (section) {
      var top = section.getBoundingClientRect().top + window.scrollY;
      if (top <= probe) current = section;
    });
    if (window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 4) {
      current = sections[sections.length - 1];
    }
    setActive('#' + current.id);
  }

  function updateSticky() {
    var hero = document.querySelector('.hero');
    var threshold = hero ? hero.offsetHeight - 80 : 320;
    sticky.classList.toggle('is-visible', window.scrollY > threshold);
  }

  var ticking = false;
  window.addEventListener('scroll', function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      updateActive();
      updateSticky();
      ticking = false;
    });
  }, { passive: true });

  updateActive();
  updateSticky();

  function buildStickyNav(items) {
    var bar = document.createElement('div');
    bar.id = 'sticky-nav';
    bar.className = 'sticky-nav';

    var inner = document.createElement('div');
    inner.className = 'sticky-nav-inner';

    var brand = document.createElement('a');
    brand.className = 'sticky-brand';
    brand.href = '#top';
    brand.textContent = 'ITS_LIVE';
    inner.appendChild(brand);

    items.forEach(function (item) {
      inner.appendChild(item.cloneNode(true));
    });

    var cta = document.createElement('a');
    cta.className = 'button is-small is-link sticky-cta';
    cta.href = 'https://nsidc.org/apps/itslive/';
    cta.target = '_blank';
    cta.rel = 'noopener';
    cta.textContent = 'Get Data';
    inner.appendChild(cta);

    bar.appendChild(inner);
    document.body.appendChild(bar);
    return bar;
  }
});
