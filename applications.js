window.onload = function WindowLoad(event) {
  //Load and display cookies
};

//modal
const newAppButton = document.querySelector("#addapplication");
const modalBg = document.querySelector(".modal-background");
const modal = document.querySelector(".modal");

//form
const applicationForm = document.querySelector("#applicationform");
const formSubmitButton = document.querySelector("#formsubmit");
const invalidInput = document.querySelector("#invalidinput");

newAppButton.addEventListener("click", () => {
  modal.classList.add("is-active");
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("is-active");
  applicationForm.reset();
  invalidInput.style.display = "none";
});

formSubmitButton.addEventListener("click", () => {
  var elements = document.getElementById("applicationform").elements;

  if (elements[0].value.length < 1 || elements[1].value.length < 1) {
    invalidInput.style.display = "block";
  } else {
    invalidInput.style.display = "none";
    applicationForm.submit();

    //Build element array and create cookie
    const formElements = [];
    for (var i = 0, element; (element = elements[i++]); ) {
      formElements.push(element.value);
    }
    var id = elements[0].value.replace(/\s/g, "");
    const finalElements =
      "" +
      id +
      "=" +
      JSON.stringify(formElements) +
      "; expires=Sun, 01 Jan 2023 00:00:00 UTC; path=/;";
    document.cookie = finalElements;

    //Reset form once successfully submitted
    modal.classList.remove("is-active");
    applicationForm.reset();
    invalidInput.style.display = "none";
    location.reload();
  }
});
