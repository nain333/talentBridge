// notti config
if (window.successMessage) {
  new Noty({
    type: "success",
    text: window.successMessage,
    theme: "relax",
    timeout: 3000,
    progressBar: true,
  }).show();
}
// delete dialogue
document
  .querySelectorAll(".delete-job-form")
  .forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (
        !confirm(
          "Are you sure you want to delete this job?"
        )
      ) {
        event.preventDefault();
      }
    });
  });

document
  .querySelectorAll(".update-job-form")
  .forEach((form) => {
    form.addEventListener("submit", (event) => {
      if (
        !confirm(
          "Are you sure you want to update this job?"
        )
      ) {
        event.preventDefault();
      }
    });
  });