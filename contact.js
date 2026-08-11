const requestForm = document.querySelector('#project-request-form');
const fileInput = document.querySelector('#project-files');
const fileSelection = document.querySelector('#file-selection');
const formStatus = document.querySelector('#form-status');

fileInput?.addEventListener('change', () => {
  const files = [...fileInput.files];
  formStatus.textContent = '';
  delete formStatus.dataset.state;

  if (!files.length) {
    fileSelection.textContent = 'Aucun fichier sélectionné';
    return;
  }

  const megabyte = 1024 * 1024;
  const invalidFiles = files.length > 10
    || files.some(file => file.size > 25 * megabyte)
    || files.reduce((total, file) => total + file.size, 0) > 100 * megabyte;

  if (invalidFiles) {
    fileInput.value = '';
    fileSelection.textContent = 'Aucun fichier sélectionné';
    formStatus.textContent = 'Vous pouvez ajouter jusqu’à 10 fichiers, avec une limite de 25 Mo par fichier et de 100 Mo au total.';
    formStatus.dataset.state = 'error';
    return;
  }

  fileSelection.textContent = files.length === 1
    ? files[0].name
    : `${files.length} fichiers sélectionnés : ${files.map(file => file.name).join(', ')}`;
});

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
    fileSelection.textContent = 'Aucun fichier sélectionné';
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
