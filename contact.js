(() => {
  const copy = {
    pt: ['Dúvidas e sugestões', 'Sobre:', 'Assunto', 'Mensagem', 'Fechar'],
    en: ['Questions and suggestions', 'About:', 'Subject', 'Message', 'Close'],
    es: ['Dudas y sugerencias', 'Sobre:', 'Asunto', 'Mensaje', 'Cerrar'],
    fr: ['Questions et suggestions', 'À propos de :', 'Objet', 'Message', 'Fermer'],
    he: ['שאלות והצעות', 'בנוגע ל:', 'נושא', 'הודעה', 'סגירה']
  };
  const sendingCopy = {
    pt: ['Seu e-mail (opcional)', 'Enviar', 'Enviando…', 'Mensagem aceita. Obrigado pelo contato!', 'Não foi possível confirmar o envio. Seu texto foi mantido; tente novamente.', 'Informe um assunto de 3 a 160 caracteres, uma mensagem de 10 a 5000 caracteres e, se preenchido, um e-mail válido.', 'Seu e-mail é opcional. A mensagem será enviada pelo Formspree.'],
    en: ['Your email (optional)', 'Send', 'Sending…', 'Message accepted. Thank you for contacting us!', 'We couldn’t confirm sending. Your text has been kept; please try again.', 'Enter a subject of 3–160 characters, a message of 10–5000 characters and, if provided, a valid email.', 'Your email is optional. The message will be sent through Formspree.'],
    es: ['Tu correo (opcional)', 'Enviar', 'Enviando…', 'Mensaje aceptado. ¡Gracias por contactarnos!', 'No pudimos confirmar el envío. Conservamos tu texto; inténtalo de nuevo.', 'Introduce un asunto de 3–160 caracteres, un mensaje de 10–5000 caracteres y, si lo completas, un correo válido.', 'Tu correo es opcional. El mensaje se enviará mediante Formspree.'],
    fr: ['Votre e-mail (facultatif)', 'Envoyer', 'Envoi…', 'Message accepté. Merci de nous avoir contactés !', 'Impossible de confirmer l’envoi. Votre texte a été conservé ; réessayez.', 'Saisissez un objet de 3 à 160 caractères, un message de 10 à 5000 caractères et, si renseigné, un e-mail valide.', 'Votre e-mail est facultatif. Le message sera envoyé via Formspree.'],
    he: ['האימייל שלכם (לא חובה)', 'שליחה', 'שולח…', 'ההודעה התקבלה. תודה שפניתם אלינו!', 'לא ניתן לאשר את השליחה. הטקסט נשמר; נסו שוב.', 'הזינו נושא באורך 3–160 תווים, הודעה באורך 10–5000 תווים וכתובת אימייל תקינה אם מילאתם אותה.', 'האימייל אינו חובה. ההודעה תישלח באמצעות Formspree.']
  };
  let dialog, opener, context, busy = false, accepted = false;
  const language = () => document.documentElement.lang.split('-')[0] || 'pt';
  function refreshEntries() {
    const words = copy[language()] || copy.pt;
    document.querySelectorAll('[data-contact-entry]').forEach(el => { if (el.textContent !== words[0]) el.textContent = words[0]; });
  }
  window.openContact = function openContact(input = {}) {
    opener = document.activeElement;
    context = Object.freeze({type: input.type || 'general', id: input.id || '', name: input.name || '',
      language: copy[input.language] ? input.language : language(), sourceUrl: input.sourceUrl || location.href});
    const words = copy[context.language] || copy.pt;
    if (!dialog) {
      dialog = document.createElement('dialog');
      dialog.id = 'contact-dialog';
      dialog.setAttribute('aria-labelledby', 'contact-title');
      dialog.setAttribute('aria-describedby', 'contact-note');
      dialog.innerHTML = '<form class="contact-content" novalidate><h2 id="contact-title"></h2><p id="contact-about" hidden></p><label for="contact-email"></label><input id="contact-email" name="email" type="email" maxlength="254" autocomplete="email"><label for="contact-subject"></label><input id="contact-subject" name="subject" type="text" required minlength="3" maxlength="160" autocomplete="off"><label for="contact-message"></label><textarea id="contact-message" name="message" required minlength="10" rows="6" maxlength="5000"></textarea><input name="_gotcha" type="text" hidden aria-hidden="true" tabindex="-1" autocomplete="off"><p id="contact-note"></p><p id="contact-status" role="status" aria-live="polite"></p><div class="contact-actions"><button id="contact-send" type="submit"></button><button id="contact-close" type="button"></button></div></form>';
      document.body.append(dialog);
      dialog.addEventListener('cancel', event => { event.preventDefault(); closeContact(); event.stopPropagation(); });
      dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeContact(); }
        if (event.key === 'Tab') {
          const fields = [...dialog.querySelectorAll('input:not([hidden]):not(:disabled), textarea:not(:disabled), button:not(:disabled)')];
          const first = fields[0], last = fields[fields.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      });
      dialog.querySelector('#contact-close').addEventListener('click', closeContact);
      dialog.querySelector('form').addEventListener('submit', sendContact);
    }
    dialog.lang = context.language;
    dialog.dir = context.language === 'he' ? 'rtl' : 'ltr';
    dialog.querySelector('#contact-title').textContent = words[0];
    const about = dialog.querySelector('#contact-about');
    about.hidden = !context.name;
    about.textContent = context.name ? `${words[1]} ${context.name}` : '';
    dialog.querySelector('[for="contact-subject"]').textContent = words[2];
    dialog.querySelector('[for="contact-message"]').textContent = words[3];
    dialog.querySelector('#contact-close').textContent = words[4];
    const sendWords = sendingCopy[context.language] || sendingCopy.pt;
    dialog.querySelector('[for="contact-email"]').textContent = sendWords[0];
    dialog.querySelector('#contact-note').textContent = sendWords[6];
    dialog.querySelector('#contact-send').textContent = sendWords[1];
    dialog.querySelector('#contact-status').textContent = '';
    busy = accepted = false;
    dialog.querySelectorAll('input, textarea, button').forEach(el => { el.disabled = false; });
    dialog.showModal();
    dialog.querySelector('#contact-subject').focus();
  };
  function closeContact() {
    if (busy) return;
    dialog.close();
    dialog.querySelectorAll('input, textarea').forEach(el => { el.value = ''; });
    context = null;
    if (opener?.isConnected) opener.focus({preventScroll: true});
  }
  async function sendContact(event) {
    event.preventDefault();
    if (busy || accepted) return;
    const words = sendingCopy[context.language] || sendingCopy.pt;
    const status = dialog.querySelector('#contact-status');
    const subject = dialog.querySelector('#contact-subject').value.trim();
    const message = dialog.querySelector('#contact-message').value.trim();
    const emailInput = dialog.querySelector('#contact-email');
    const email = emailInput.value.trim();
    if (subject.length < 3 || subject.length > 160 || message.length < 10 || message.length > 5000
      || email.length > 254 || !emailInput.checkValidity()) {
      status.textContent = words[5]; return;
    }
    if (dialog.querySelector('[name="_gotcha"]').value) { status.textContent = words[4]; return; }
    const payload = {subject, message, contextType: context.type, contextId: context.id,
      contextName: context.name, language: context.language, sourceUrl: context.sourceUrl};
    if (email) payload.email = email;
    busy = true;
    dialog.setAttribute('aria-busy', 'true');
    dialog.querySelectorAll('input, textarea, button').forEach(el => { el.disabled = true; });
    dialog.querySelector('#contact-send').textContent = words[2];
    status.textContent = words[2];
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch('https://formspree.io/f/xeaejbqe', {
        method: 'POST', headers: {'Content-Type': 'application/json', Accept: 'application/json'},
        credentials: 'omit', referrerPolicy: 'origin', body: JSON.stringify(payload), signal: controller.signal
      });
      if (!response.ok) throw new Error('Submission not accepted');
      accepted = true;
      dialog.querySelectorAll('input, textarea').forEach(el => { el.value = ''; });
      status.textContent = words[3];
    } catch {
      status.textContent = words[4];
    } finally {
      clearTimeout(timeout);
      busy = false;
      dialog.removeAttribute('aria-busy');
      dialog.querySelectorAll('input, textarea').forEach(el => { el.disabled = accepted; });
      dialog.querySelector('#contact-send').disabled = accepted;
      dialog.querySelector('#contact-send').textContent = words[1];
      dialog.querySelector('#contact-close').disabled = false;
      dialog.querySelector(accepted ? '#contact-close' : '#contact-subject').focus();
    }
  }
  document.addEventListener('click', event => {
    const entry = event.target.closest('[data-contact-entry]');
    if (!entry) return;
    event.preventDefault();
    window.openContact({type: entry.dataset.contactType, id: entry.dataset.contactId,
      name: entry.dataset.contactName, language: language(), sourceUrl: location.href});
  });
  new MutationObserver(refreshEntries).observe(document.documentElement, {attributes: true, attributeFilter: ['lang']});
  new MutationObserver(refreshEntries).observe(document.body, {childList: true, subtree: true});
  refreshEntries();
})();
