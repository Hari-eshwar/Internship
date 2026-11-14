// Accessible client-side validation for the contact form.
(function () {
  var form = document.getElementById('contact-form');
  if (!form) return;
  var status = document.getElementById('form-status');

  var rules = {
    name:    { msg: 'Please enter your full name.' },
    email:   { msg: 'Please enter a valid email address, like name@example.com.' },
    message: { msg: 'Please enter a message.' }
  };

  function validate(field) {
    var error = document.getElementById(field.id + '-error');
    var ok = field.value.trim() !== '' && field.checkValidity();
    field.setAttribute('aria-invalid', ok ? 'false' : 'true');
    error.textContent = ok ? '' : rules[field.id].msg;
    return ok;
  }

  Object.keys(rules).forEach(function (id) {
    var f = document.getElementById(id);
    f.addEventListener('blur', function () { validate(f); });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.className = 'form-status';
    var firstBad = null;
    Object.keys(rules).forEach(function (id) {
      var f = document.getElementById(id);
      if (!validate(f) && !firstBad) firstBad = f;
    });
    if (firstBad) {
      status.textContent = 'The form has errors. Please fix the highlighted fields.';
      status.classList.add('err');
      firstBad.focus();
      return;
    }
    // TODO: send the data to your backend here (fetch/XHR), then show the result.
    status.textContent = 'Thank you! Your message has been sent.';
    status.classList.add('ok');
    status.focus();
    form.reset();
  });
})();
