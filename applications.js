const cardList = document.querySelector("#cards");

//upload/download/sort buttons
const uploadButton = document.querySelector("#uploaddata");
const fileInput = document.querySelector("#fileinput");
const downloadButton = document.querySelector("#downloaddata");

//form modal
const newAppButton = document.querySelector("#addapplication");
let isFormSubmit = true;
const newAppTitle = document.querySelector("#newAppTitle");
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
const modalCardHead = document.querySelector("#modalCardHead");
var editModalButton;
let cookieID;

var cookies = document.cookie.split(";");
var cookiesToDisplay = [];

//Function to display cookies as cards on screen
function DisplayCookies(cookies) {
  while (cardList.firstChild) {
    cardList.removeChild(cardList.firstChild);
  }

  for (var i = 0, element; (element = cookies[i++]); ) {
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
      var modalTitle = document.createElement("header");
      modalTitle.classList.add("modal-card-head");
      modalTitle.classList.add("is-size-5");
      modalTitle.classList.add("has-text-weight-bold");
      modalTitle.classList.add("mb-2");
      modalTitle.appendChild(
        document.createTextNode(
          "" + currentDisplay[1] + " @ " + currentDisplay[0]
        )
      );
      //Edit button
      var editButton = document.createElement("a");
      editButton.setAttribute("id", "editIcon");
      editButton.setAttribute("href", "#");
      editButton.setAttribute("onClick", "javascript:editCard()");
      var editSpan = document.createElement("span");
      editSpan.classList.add("icon");
      editSpan.classList.add("is-medium");
      var editIcon = document.createElement("i");
      editIcon.classList.add("fas");
      editIcon.classList.add("fa-pen");
      editSpan.appendChild(editIcon);
      editButton.appendChild(editSpan);
      modalTitle.appendChild(editButton);
      editModalButton = editButton;

      //Company Name
      var viewCompanyNameTitle = document.createElement("h5");
      viewCompanyNameTitle.setAttribute("name", current[0].replace(/\s/g, ""));
      viewCompanyNameTitle.classList.add("subtitle");
      viewCompanyNameTitle.classList.add("is-4");
      viewCompanyNameTitle.classList.add("px-4");
      viewCompanyNameTitle.classList.add("mb-1");
      viewCompanyNameTitle.classList.add("has-text-weight-bold");
      viewCompanyNameTitle.appendChild(document.createTextNode("Company"));
      var viewCompanyName = document.createElement("p");
      viewCompanyName.classList.add("mb-3");
      viewCompanyName.classList.add("px-4");
      viewCompanyName.appendChild(document.createTextNode(currentDisplay[0]));

      //Position
      var viewPositionTitle = document.createElement("h5");
      viewPositionTitle.classList.add("subtitle");
      viewPositionTitle.classList.add("is-4");
      viewPositionTitle.classList.add("px-4");
      viewPositionTitle.classList.add("mb-1");
      viewPositionTitle.classList.add("has-text-weight-bold");
      viewPositionTitle.appendChild(document.createTextNode("Position"));
      var viewPosition = document.createElement("p");
      viewPosition.classList.add("mb-3");
      viewPosition.classList.add("px-4");
      viewPosition.appendChild(document.createTextNode(currentDisplay[1]));

      //Position Type
      var viewPositionTypeTitle = document.createElement("h5");
      viewPositionTypeTitle.classList.add("subtitle");
      viewPositionTypeTitle.classList.add("is-4");
      viewPositionTypeTitle.classList.add("px-4");
      viewPositionTypeTitle.classList.add("mb-1");
      viewPositionTypeTitle.classList.add("has-text-weight-bold");
      viewPositionTypeTitle.appendChild(
        document.createTextNode("Position Type")
      );
      var viewPositionType = document.createElement("p");
      viewPositionType.classList.add("mb-3");
      viewPositionType.classList.add("px-4");
      viewPositionType.appendChild(document.createTextNode(currentDisplay[2]));

      //Status
      var viewStatusTitle = document.createElement("h5");
      viewStatusTitle.classList.add("subtitle");
      viewStatusTitle.classList.add("is-4");
      viewStatusTitle.classList.add("px-4");
      viewStatusTitle.classList.add("mb-1");
      viewStatusTitle.classList.add("has-text-weight-bold");
      viewStatusTitle.appendChild(
        document.createTextNode("Application Status")
      );
      var viewStatus = document.createElement("p");
      viewStatus.classList.add("mb-3");
      viewStatus.classList.add("px-4");
      viewStatus.appendChild(document.createTextNode(currentDisplay[3]));

      //Date Applied
      var viewDateAppliedTitle = document.createElement("h5");
      viewDateAppliedTitle.classList.add("subtitle");
      viewDateAppliedTitle.classList.add("is-4");
      viewDateAppliedTitle.classList.add("px-4");
      viewDateAppliedTitle.classList.add("mb-1");
      viewDateAppliedTitle.classList.add("has-text-weight-bold");
      viewDateAppliedTitle.appendChild(document.createTextNode("Date Applied"));
      var viewDateApplied = document.createElement("p");
      viewDateApplied.classList.add("mb-3");
      viewDateApplied.classList.add("px-4");
      if (currentDisplay[4].length == 0) {
        viewDateApplied.appendChild(document.createTextNode("N/A"));
      } else {
        viewDateApplied.appendChild(document.createTextNode(currentDisplay[4]));
      }

      //Notes
      var viewNotesTitle = document.createElement("h5");
      viewNotesTitle.classList.add("subtitle");
      viewNotesTitle.classList.add("is-4");
      viewNotesTitle.classList.add("px-4");
      viewNotesTitle.classList.add("mb-1");
      viewNotesTitle.classList.add("has-text-weight-bold");
      viewNotesTitle.appendChild(document.createTextNode("Notes"));
      var viewNotes = document.createElement("p");
      viewNotes.classList.add("mb-3");
      viewNotes.classList.add("px-4");
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
}

function sortByAZ(a, b) {
  var aData = JSON.parse(a.split("=")[1]);
  var bData = JSON.parse(b.split("=")[1]);

  if (aData[0].toLowerCase() < bData[0].toLowerCase()) {
    return -1;
  }
  if (bData[0].toLowerCase() < aData[0].toLowerCase()) {
    return 1;
  }
  return 0;
}

function sortByDate(a, b) {
  var aData = JSON.parse(a.split("=")[1]);
  var bData = JSON.parse(b.split("=")[1]);

  if (aData[4] < bData[4]) {
    return -1;
  }
  if (bData[4] < aData[4]) {
    return 1;
  }
  return 0;
}

//Load and display cookies
window.onload = function WindowLoad(event) {
  //Add cookie strings to array
  /*
  0 - Company Name
  1 - Position
  2 - Position Type
  3 - Status
  4 - Date Applied
  5 - Notes
  */

  //Fill cookie array with correct cookies
  for (var i = 0, element; (element = cookies[i++]); ) {
    if (!element.includes(",")) {
      continue;
    }

    cookiesToDisplay.push(element);
  }

  //Get sort cookie and see if cookies need to be sorted
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });

  if (cookie["sort"] == "az") {
    cookiesToDisplay = cookiesToDisplay.sort(sortByAZ);
  }
  if (cookie["sort"] == "date") {
    cookiesToDisplay = cookiesToDisplay.sort(sortByDate);
  }

  DisplayCookies(cookiesToDisplay);
};

newAppButton.addEventListener("click", () => {
  modal.classList.add("is-active");
  isFormSubmit = true;
  newAppTitle.textContent = "New Application";
  formSubmitButton.textContent = "Create";
});

modalBg.addEventListener("click", () => {
  modal.classList.remove("is-active");
  applicationForm.reset();
  invalidInput.style.display = "none";
});

function sortAlphabetically() {
  document.cookie = "sort=az";
  location.reload();
}

function sortDate() {
  document.cookie = "sort=date";
  location.reload();
}

function sortRecent() {
  document.cookie = "sort=recent";
  location.reload();
}

formSubmitButton.addEventListener("click", () => {
  if (isFormSubmit) {
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
  } else {
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
      const finalElements =
        "" +
        cookieID +
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
  }
});

downloadButton.addEventListener("click", () => {
  if (cookiesToDisplay.length < 1) {
    alert("Please add at least 1 application before downloading.");
  } else {
    const a = document.createElement("a");
    //Only download cookies containing application data
    var cookies = document.cookie.split(";");
    var filesToDownload = "";
    for (var i = 0, element; (element = cookies[i++]); ) {
      if (element.includes("[")) {
        filesToDownload += element + ";";
      }
    }
    const file = new Blob([filesToDownload], { type: "text/plain" });
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
  }
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

function search_applications() {
  let input = document.getElementById("appsearchbar").value.toLowerCase();
  if (input == "") {
    DisplayCookies(cookiesToDisplay);
  } else {
    let newCookies = [];
    for (var i = 0, element; (element = cookiesToDisplay[i++]); ) {
      let temp = JSON.parse(element.split("=")[1]);
      if (temp[0].substring(0, input.length).toLowerCase().includes(input)) {
        newCookies.push(element);
      }
    }
    DisplayCookies(newCookies);
  }
}

function editCard() {
  isFormSubmit = false;
  //Collect already existing info & remove modal
  let values = [];
  let editParent = editModalButton.parentElement.parentElement;
  editParent.removeChild(editParent.firstChild);
  while (editParent.firstChild) {
    if (editParent.firstChild.nodeName == "P") {
      values.push(editParent.firstChild.textContent);
    }
    if (editParent.firstChild.hasAttribute("name")) {
      cookieID = editParent.firstChild.getAttribute("name");
    }
    editParent.removeChild(editParent.firstChild);
  }
  console.log(cookieID);
  while (viewModalContent.firstChild) {
    viewModalContent.removeChild(viewModalContent.firstChild);
  }
  viewModal.classList.remove("is-active");
  //Add form modal and fill in pre-existing info

  modal.classList.add("is-active");
  console.log(values);
  document.querySelector("#companyNameField").value = values[0];
  document.querySelector("#positionField").value = values[1];
  document.querySelector("#positionTypeField").value = values[2];
  document.querySelector("#positionStatusField").value = values[3];
  if (values[4] != "N/A") {
    document.querySelector("#dateAppliedField").value = values[4];
  }
  if (values[5] != "N/A") {
    document.querySelector("#notesField").value = values[5];
  }
  //formSubmitButton.textContent = "Submit Changes";
  newAppTitle.textContent = "Editing " + values[0];
  formSubmitButton.textContent = "Submit Changes";
}
