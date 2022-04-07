const cardList = document.querySelector("#cards");

window.onload = function WindowLoad(event) {
  //Load and display cookies
  var cookies = document.cookie.split(";");
  var cookiesToDisplay = [];

  //Add cookie strings to array
  /*
  0 - Company Name
  1 - Position
  2 - Position Type
  3 - Status
  4 - Date Applied
  5 - Notes
  */
  for (var i = 0, element; (element = cookies[i++]); ) {
    const current = element.split("=");
    const currentDisplay = JSON.parse(current[1]);

    //Create HTML element
    //Card div
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    var cardID = currentDisplay[0].replace(/\s/g, "");
    newCard.setAttribute("id", cardID);

    //Card content
    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    var cardContentTop = document.createElement("p");
    var text = document.createTextNode(currentDisplay[1]);
    cardContentTop.appendChild(text);
    var cardContentBottom = document.createElement("p");
    cardContentBottom.classList.add("title");
    cardContentBottom.classList.add("is-size-5");
    text = document.createTextNode(currentDisplay[0]);
    cardContentBottom.appendChild(text);
    cardContent.appendChild(cardContentTop);
    cardContent.appendChild(cardContentBottom);

    //Footer content
    var cardFooter = document.createElement("footer");
    cardFooter.classList.add("card-footer");

    var viewLink = document.createElement("p");
    viewLink.classList.add("card-footer-item");
    var viewLinkButton = document.createElement("a");
    viewLinkButton.href = "";
    viewLinkButton.classList.add("has-text-gray");
    viewLinkText = document.createTextNode("View");
    viewLinkButton.appendChild(viewLinkText);
    viewLink.appendChild(viewLinkButton);

    var editLink = document.createElement("p");
    editLink.classList.add("card-footer-item");
    var editLinkButton = document.createElement("a");
    editLinkButton.href = "";
    editLinkButton.classList.add("has-text-gray");
    editLinkText = document.createTextNode("Edit");
    editLinkButton.appendChild(editLinkText);
    editLink.appendChild(editLinkButton);

    var deleteLink = document.createElement("p");
    deleteLink.classList.add("card-footer-item");
    var deleteLinkButton = document.createElement("a");
    deleteLinkButton.href = "";
    deleteLinkButton.classList.add("has-text-gray");
    deleteLinkText = document.createTextNode("Delete");
    deleteLinkButton.appendChild(deleteLinkText);
    deleteLink.appendChild(deleteLinkButton);

    cardFooter.appendChild(viewLink);
    cardFooter.appendChild(editLink);
    cardFooter.appendChild(deleteLink);

    newCard.appendChild(cardContent);
    newCard.appendChild(cardFooter);
    cardList.appendChild(newCard);
  }
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
