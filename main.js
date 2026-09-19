/* Seamar — site behavior
   Mobile nav toggle, active-link marking, and a light scroll-reveal.
   No dependencies. */

(function () {
  'use strict';

  /* Mobile nav toggle */
  var toggle = document.querySelector('.nav__toggle');
  var drawer = document.querySelector('.nav-drawer');

  if (toggle && drawer) {
    toggle.addEventListener('click', function () {
      var isOpen = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isOpen));
      drawer.classList.toggle('is-open', !isOpen);
      document.body.style.overflow = !isOpen ? 'hidden' : '';
    });

    drawer.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        toggle.setAttribute('aria-expanded', 'false');
        drawer.classList.remove('is-open');
        document.body.style.overflow = '';
      });
    });
  }

  /* Mark the current page's nav link (belt-and-braces alongside aria-current in HTML) */
  var here = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('a[data-nav]').forEach(function (link) {
    if (link.getAttribute('data-nav') === here) {
      link.setAttribute('aria-current', 'page');
    }
  });

  /* Scroll reveal for elements marked .reveal */
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }

  /* Contact form: FormSubmit.co now handles delivery directly via the
     form's action attribute (see contact.html) — no backend needed. This
     stays only as a safety net for a form explicitly marked data-static-demo. */
  var form = document.querySelector('#contact-form');
  if (form && form.dataset.staticDemo === 'true') {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var note = form.querySelector('.form-status');
      if (note) {
        note.textContent = 'This form isn\'t connected to anything yet — see the comment in contact.html for how to wire it up (Formspree, Netlify Forms, or a mailto link).';
      }
    });
  }
})();
