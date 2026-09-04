/* Avishek Adhikari — portfolio interactions */
(function () {
  'use strict';

  /* ---------- scroll progress + sticky header ---------- */
  var bar = document.getElementById('progress');
  var topbar = document.getElementById('topbar');
  var ticking = false;

  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.width = (max > 0 ? (y / max) * 100 : 0) + '%';
    topbar.classList.toggle('is-stuck', y > 20);
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; window.requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  /* ---------- mobile menu ---------- */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('pillnav');

  burger.addEventListener('click', function () {
    var open = nav.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(open));
    burger.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  });

  nav.addEventListener('click', function (e) {
    if (e.target.closest('a')) {
      nav.classList.remove('is-open');
      burger.setAttribute('aria-expanded', 'false');
    }
  });

  document.addEventListener('click', function (e) {
    if (!nav.classList.contains('is-open')) return;
    if (nav.contains(e.target) || burger.contains(e.target)) return;
    nav.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
  });

  /* ---------- reveal on scroll ---------- */
  var items = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry, i) {
        if (!entry.isIntersecting) return;
        entry.target.style.transitionDelay = Math.min(i, 4) * 60 + 'ms';
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    items.forEach(function (el) { io.observe(el); });
  } else {
    items.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- active link ---------- */
  var links = Array.prototype.slice.call(nav.querySelectorAll('a'));
  var targets = links
    .map(function (a) { return document.querySelector(a.getAttribute('href')); })
    .filter(Boolean);

  function setActive(id) {
    links.forEach(function (a) {
      a.classList.toggle('is-active', a.getAttribute('href') === '#' + id);
    });
  }

  if ('IntersectionObserver' in window && targets.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActive(entry.target.id);
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    targets.forEach(function (t) { spy.observe(t); });
  }

  /* ---------- copy email ---------- */
  var copyBtn = document.getElementById('copyEmail');
  copyBtn.addEventListener('click', function () {
    var value = copyBtn.dataset.copy;
    var original = copyBtn.textContent;

    function done(ok) {
      copyBtn.textContent = ok ? 'Copied ✓' : 'Press Ctrl+C';
      setTimeout(function () { copyBtn.textContent = original; }, 1800);
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(value).then(function () { done(true); }, function () { done(false); });
    } else {
      var ta = document.createElement('textarea');
      ta.value = value;
      ta.style.cssText = 'position:fixed;opacity:0';
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      done(ok);
    }
  });

  /* ---------- contact form ---------- */
  var form = document.getElementById('contactForm');
  var status = document.getElementById('cf-status');
  var submit = document.getElementById('cf-submit');
  var label = submit.querySelector('.cf-label');
  var PLACEHOLDER = 'YOUR_WEB3FORMS_ACCESS_KEY';

  function say(msg, ok) {
    status.textContent = msg;
    status.className = 'form__status ' + (ok ? 'is-ok' : 'is-err');
  }

  function invalid(el, yes) {
    if (yes) { el.setAttribute('aria-invalid', 'true'); }
    else { el.removeAttribute('aria-invalid'); }
  }

  // clear the error state as soon as the visitor starts fixing it
  form.addEventListener('input', function (e) {
    if (e.target.hasAttribute('aria-invalid')) invalid(e.target, false);
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var name = form.elements.name;
    var email = form.elements.email;
    var message = form.elements.message;
    var bad = null;

    [name, email, message].forEach(function (el) { invalid(el, false); });

    if (!message.value.trim()) { invalid(message, true); bad = message; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.value.trim())) { invalid(email, true); bad = email; }
    if (!name.value.trim()) { invalid(name, true); bad = name; }

    if (bad) {
      say('Please fill in your name, a valid email and a message.', false);
      bad.focus();
      return;
    }

    if (form.elements.access_key.value === PLACEHOLDER) {
      say('This form is not connected yet — add a Web3Forms access key. Meanwhile, email me directly.', false);
      return;
    }

    var payload = {};
    new FormData(form).forEach(function (v, k) { payload[k] = v; });

    submit.disabled = true;
    label.textContent = 'Sending…';
    status.className = 'form__status';

    fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(payload)
    })
      .then(function (r) { return r.json().catch(function () { return {}; }); })
      .then(function (data) {
        if (data && data.success) {
          form.reset();
          say('Thanks — your message is on its way. I will get back to you soon.', true);
        } else {
          say((data && data.message) || 'Something went wrong. Please email me directly instead.', false);
        }
      })
      .catch(function () {
        say('Could not reach the server. Please email me directly instead.', false);
      })
      .then(function () {
        submit.disabled = false;
        label.textContent = 'Send message';
      });
  });

  /* ---------- year ---------- */
  document.getElementById('year').textContent = new Date().getFullYear();
})();
