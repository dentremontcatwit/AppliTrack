const cardList = document.querySelector("#cards");

//upload/download buttons
const uploadButton = document.querySelector("#uploaddata");
const fileInput = document.querySelector("#fileinput");
const downloadButton = document.querySelector("#downloaddata");

//form modal
const newAppButton = document.querySelector("#addapplication");
const testViewButton = document.querySelector("#testview");
const modalBg = document.querySelector("#formModalBg");
const modal = document.querySelector("#formModal");

//form
const applicationForm = document.querySelector("#applicationform");
const formSubmitButton = document.querySelector("#formsubmit");
const invalidInput = document.querySelector("#invalidinput");

//view modal
const viewModal = document.querySelector("#viewModal");
const viewModalBg = document.querySelector("#viewModalBg");
const viewModalContent = document.querySelector("#viewModalContent");

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
    console.log("" + element + ": " + typeof element);
    if (!element.includes(",")) {
      continue;
    }

    const current = element.split("=");
    const currentDisplay = JSON.parse(current[1]);

    //Create HTML element
    //Card div
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    var cardID = "" + current[0];
    newCard.setAttribute("id", cardID);

    //Card content
    var cardContent = document.createElement("div");
    cardContent.classList.add("card-content");
    var cardContentTop = document.createElement("p");
    var text = document.createTextNode(currentDisplay[1] + " @");
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
    viewLinkButton.addEventListener("click", () => {
      //Title
      var modalTitle = document.createElement("h3");
      modalTitle.classList.add("title");
      modalTitle.classList.add("has-text-weight-bold");
      modalTitle.classList.add("mb-6");
      modalTitle.appendChild(
        document.createTextNode(
          "" + currentDisplay[1] + " @ " + currentDisplay[0]
        )
      );

      //Company Name
      var viewCompanyNameTitle = document.createElement("h5");
      viewCompanyNameTitle.classList.add("subtitle");
      viewCompanyNameTitle.classList.add("is-4");
      viewCompanyNameTitle.classList.add("mb-1");
      viewCompanyNameTitle.classList.add("has-text-weight-bold");
      viewCompanyNameTitle.appendChild(document.createTextNode("Company"));
      var viewCompanyName = document.createElement("p");
      viewCompanyName.classList.add("mb-3");
      viewCompanyName.appendChild(document.createTextNode(currentDisplay[0]));

      //Position
      var viewPositionTitle = document.createElement("h5");
      viewPositionTitle.classList.add("subtitle");
      viewPositionTitle.classList.add("is-4");
      viewPositionTitle.classList.add("mb-1");
      viewPositionTitle.classList.add("has-text-weight-bold");
      viewPositionTitle.appendChild(document.createTextNode("Position"));
      var viewPosition = document.createElement("p");
      viewPosition.classList.add("mb-3");
      viewPosition.appendChild(document.createTextNode(currentDisplay[1]));

      //Position Type
      var viewPositionTypeTitle = document.createElement("h5");
      viewPositionTypeTitle.classList.add("subtitle");
      viewPositionTypeTitle.classList.add("is-4");
      viewPositionTypeTitle.classList.add("mb-1");
      viewPositionTypeTitle.classList.add("has-text-weight-bold");
      viewPositionTypeTitle.appendChild(
        document.createTextNode("Position Type")
      );
      var viewPositionType = document.createElement("p");
      viewPositionType.classList.add("mb-3");
      viewPositionType.appendChild(document.createTextNode(currentDisplay[2]));

      //Status
      var viewStatusTitle = document.createElement("h5");
      viewStatusTitle.classList.add("subtitle");
      viewStatusTitle.classList.add("is-4");
      viewStatusTitle.classList.add("mb-1");
      viewStatusTitle.classList.add("has-text-weight-bold");
      viewStatusTitle.appendChild(
        document.createTextNode("Application Status")
      );
      var viewStatus = document.createElement("p");
      viewStatus.classList.add("mb-3");
      viewStatus.appendChild(document.createTextNode(currentDisplay[3]));

      //Date Applied
      var viewDateAppliedTitle = document.createElement("h5");
      viewDateAppliedTitle.classList.add("subtitle");
      viewDateAppliedTitle.classList.add("is-4");
      viewDateAppliedTitle.classList.add("mb-1");
      viewDateAppliedTitle.classList.add("has-text-weight-bold");
      viewDateAppliedTitle.appendChild(document.createTextNode("Date Applied"));
      var viewDateApplied = document.createElement("p");
      viewDateApplied.classList.add("mb-3");
      if (currentDisplay[4].length == 0) {
        viewDateApplied.appendChild(document.createTextNode("N/A"));
      } else {
        viewDateApplied.appendChild(document.createTextNode(currentDisplay[4]));
      }

      //Notes
      var viewNotesTitle = document.createElement("h5");
      viewNotesTitle.classList.add("subtitle");
      viewNotesTitle.classList.add("is-4");
      viewNotesTitle.classList.add("mb-1");
      viewNotesTitle.classList.add("has-text-weight-bold");
      viewNotesTitle.appendChild(document.createTextNode("Notes"));
      var viewNotes = document.createElement("p");
      viewNotes.classList.add("mb-3");
      if (currentDisplay[5].length == 0) {
        viewNotes.appendChild(document.createTextNode("N/A"));
      } else {
        viewNotes.appendChild(document.createTextNode(currentDisplay[5]));
      }

      viewModalContent.appendChild(modalTitle);
      viewModalContent.appendChild(viewCompanyNameTitle);
      viewModalContent.appendChild(viewCompanyName);
      viewModalContent.appendChild(viewPositionTitle);
      viewModalContent.appendChild(viewPosition);
      viewModalContent.appendChild(viewPositionTypeTitle);
      viewModalContent.appendChild(viewPositionType);
      viewModalContent.appendChild(viewStatusTitle);
      viewModalContent.appendChild(viewStatus);
      viewModalContent.appendChild(viewDateAppliedTitle);
      viewModalContent.appendChild(viewDateApplied);
      viewModalContent.appendChild(viewNotesTitle);
      viewModalContent.appendChild(viewNotes);
      viewModal.classList.add("is-active");
    });
    viewModalBg.addEventListener("click", () => {
      while (viewModalContent.firstChild) {
        viewModalContent.removeChild(viewModalContent.firstChild);
      }
      viewModal.classList.remove("is-active");
    });
    viewLinkButton.classList.add("has-text-gray");
    viewLinkText = document.createTextNode("View");
    viewLinkButton.appendChild(viewLinkText);
    viewLink.appendChild(viewLinkButton);

    var deleteLink = document.createElement("p");
    deleteLink.classList.add("card-footer-item");
    var deleteLinkButton = document.createElement("a");
    deleteLinkButton.addEventListener("click", () => {
      var id = "" + current[0];
      document.cookie =
        "" + id + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    deleteLinkButton.href = "";
    deleteLinkButton.classList.add("has-text-gray");
    deleteLinkText = document.createTextNode("Delete");
    deleteLinkButton.appendChild(deleteLinkText);
    deleteLink.appendChild(deleteLinkButton);

    cardFooter.appendChild(viewLink);
    cardFooter.appendChild(deleteLink);

    newCard.appendChild(cardContent);
    newCard.appendChild(cardFooter);
    cardList.appendChild(newCard);
  }
};

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
    var date = new Date();
    var idNum =
      "" +
      (date.getMonth() + 1) +
      date.getDate() +
      date.getFullYear() +
      date.getHours() +
      date.getMinutes() +
      date.getSeconds();
    var id = "" + elements[0].value.replace(/\s/g, "") + idNum;
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

downloadButton.addEventListener("click", () => {
  const a = document.createElement("a");
  const file = new Blob([document.cookie], { type: "text/plain" });
  a.href = URL.createObjectURL(file);

  var date = new Date();
  var fileName =
    "AppliTrack" +
    (date.getMonth() + 1) +
    date.getDate() +
    date.getFullYear() +
    date.getHours() +
    date.getMinutes() +
    date.getSeconds();

  a.download = fileName;
  a.click();
});

function loadFile() {
  const [file] = document.querySelector("input[type=file]").files;
  const reader = new FileReader();
  reader.addEventListener(
    "load",
    () => {
      const cookies = reader.result.split(";");
      for (var i = 0, cookie; (cookie = cookies[i++]); ) {
        document.cookie = cookie;
      }
    },
    false
  );

  if (file) {
    reader.readAsText(file);
  }
  alert("Data has been succesfully uploaded.");
  location.reload();
}

uploadButton.addEventListener("click", () => {
  document.getElementById("fileinput").click();
});
