(() => {
  const copy = {
    pt: ['Dúvidas e sugestões', 'Sobre:', 'Assunto', 'Mensagem', 'Fechar', 'Esta área ainda não envia mensagens. Nenhum texto será entregue ou salvo ao fechar.', 'Envio indisponível nesta etapa'],
    en: ['Questions and suggestions', 'About:', 'Subject', 'Message', 'Close', 'This area does not send messages yet. No text will be delivered or saved when you close it.', 'Sending is unavailable at this stage'],
    es: ['Dudas y sugerencias', 'Sobre:', 'Asunto', 'Mensaje', 'Cerrar', 'Esta sección todavía no envía mensajes. Ningún texto se entregará ni guardará al cerrar.', 'Envío no disponible en esta etapa'],
    fr: ['Questions et suggestions', 'À propos de :', 'Objet', 'Message', 'Fermer', 'Cet espace ne permet pas encore d’envoyer des messages. Aucun texte ne sera transmis ni conservé à la fermeture.', 'Envoi indisponible à cette étape'],
    he: ['שאלות והצעות', 'בנוגע ל:', 'נושא', 'הודעה', 'סגירה', 'עדיין לא ניתן לשלוח הודעות כאן. הטקסט לא יישלח ולא יישמר לאחר הסגירה.', 'שליחה אינה זמינה בשלב זה']
  };
  let dialog, opener, context;
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
      dialog.innerHTML = '<div class="contact-content"><h2 id="contact-title"></h2><p id="contact-about" hidden></p><label for="contact-subject"></label><input id="contact-subject" type="text" maxlength="160" autocomplete="off"><label for="contact-message"></label><textarea id="contact-message" rows="6" maxlength="5000"></textarea><p id="contact-note"></p><div class="contact-actions"><button id="contact-unavailable" type="button" disabled></button><button id="contact-close" type="button"></button></div></div>';
      document.body.append(dialog);
      dialog.addEventListener('cancel', event => { event.preventDefault(); closeContact(); event.stopPropagation(); });
      dialog.addEventListener('keydown', event => {
        if (event.key === 'Escape') { event.preventDefault(); event.stopPropagation(); closeContact(); }
        if (event.key === 'Tab') {
          const fields = [...dialog.querySelectorAll('input, textarea, button:not(:disabled)')];
          const first = fields[0], last = fields[fields.length - 1];
          if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
          else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
        }
      });
      dialog.querySelector('#contact-close').addEventListener('click', closeContact);
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
    dialog.querySelector('#contact-note').textContent = words[5];
    dialog.querySelector('#contact-unavailable').textContent = words[6];
    dialog.showModal();
    dialog.querySelector('#contact-subject').focus();
  };
  function closeContact() {
    dialog.close();
    dialog.querySelectorAll('input, textarea').forEach(el => { el.value = ''; });
    context = null;
    if (opener?.isConnected) opener.focus({preventScroll: true});
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
