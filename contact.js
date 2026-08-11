const requestForm = document.querySelector('#project-request-form');
const formStatus = document.querySelector('#form-status');

requestForm?.addEventListener('submit', async event => {
  event.preventDefault();

  if (!requestForm.checkValidity()) {
    requestForm.reportValidity();
    formStatus.textContent = 'Merci de compléter les champs obligatoires.';
    formStatus.dataset.state = 'error';
    return;
  }

  const endpoint = requestForm.dataset.formspreeEndpoint?.trim();
  if (!endpoint) {
    formStatus.textContent = 'Le formulaire est prêt, mais son service d’envoi doit encore être activé. Vous pouvez utiliser l’adresse e-mail affichée à gauche.';
    formStatus.dataset.state = 'error';
    return;
  }

  const submitButton = requestForm.querySelector('[type="submit"]');
  submitButton.disabled = true;
  submitButton.setAttribute('aria-busy', 'true');
  formStatus.textContent = 'Envoi de votre demande…';
  formStatus.dataset.state = 'loading';

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      body: new FormData(requestForm),
      headers: { Accept: 'application/json' }
    });

    if (!response.ok) throw new Error('Submission failed');

    requestForm.reset();
    formStatus.textContent = 'Votre demande a bien été envoyée. Merci, je vous répondrai dès que possible.';
    formStatus.dataset.state = 'success';
  } catch {
    formStatus.textContent = 'L’envoi n’a pas abouti. Réessayez ou écrivez directement à loicgex917@gmail.com.';
    formStatus.dataset.state = 'error';
  } finally {
    submitButton.disabled = false;
    submitButton.removeAttribute('aria-busy');
  }
});
