if (window.successMessage) {
  new Noty({
    type: "success",
    text: window.successMessage,
    theme: "relax",
    timeout: 3000,
    progressBar: true,
  }).show();
}