// Sends the 57 Tabs newsletter box to Kit and shows a thank-you message.
(function () {
  var f = document.getElementById('nl-form');
  if (!f) return;
  var m = f.querySelector('.msg'), b = f.querySelector('button');
  f.addEventListener('submit', function (e) {
    e.preventDefault();
    if (f.website.value) return; // hidden trap field: bots fill it in, people don't
    b.disabled = true; b.textContent = 'Sending…';
    var d = new FormData();
    d.append('email_address', f.email_address.value);
    d.append('fields[first_name]', f['fields[first_name]'].value);
    fetch(f.action, { method: 'POST', body: d, headers: { Accept: 'application/json' } })
      .then(function (r) {
        if (!r.ok) throw 0;
        f.querySelectorAll('input,.small,button').forEach(function (x) { x.style.display = 'none'; });
        m.textContent = 'Thank you! Please check your inbox and click the link to confirm.';
        m.hidden = false;
      })
      .catch(function () {
        b.disabled = false; b.textContent = 'Yes Please.';
        m.textContent = 'Sorry, something went wrong. Please try again.';
        m.hidden = false;
      });
  });
})();
