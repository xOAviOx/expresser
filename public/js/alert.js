export const hideAlert = () => {
  const el = document.querySelector(".alert");
  if (el) el.parentElement.removeChild(el);
};

//type is success of error

export const showAlert = (type, msg) => {
  hideAlert();

  //prettier-ignore
  const markup = '<div class="alert alert--' + type + '">' + msg + '</div>';

  document.querySelector("body").insertAdjacentHTML("afterbegin", markup);
  window.setTimeout(hideAlert, 4000);
};
