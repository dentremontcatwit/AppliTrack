document.querySelector("html").classList.remove("is-clipped");
renderTheme();
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  updateDoc,
  deleteField,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAvbph3Qpz8w_ZERUZQ-Oh5YEyZI-ulCWQ",
  authDomain: "applitrack.firebaseapp.com",
  projectId: "applitrack",
  storageBucket: "applitrack.appspot.com",
  messagingSenderId: "396436130687",
  appId: "1:396436130687:web:dca8e5f220ecb9a044284a",
  measurementId: "G-EZDMF0Q14Y",
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

var userSettings = {};

const verifyEmail = document.querySelector("#verifyemail");
var isEmailVerified;
verifyEmail.style.display = "none";
var globalApplications;
//Bring the user back to home page if not logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = await getDoc(doc(db, "users", user.uid));
    var applications = userRef.data();
    userSettings = applications["userSettings"];
    delete applications["userSettings"];
    windowLoad(applications); //Display applications for current user
    if (!user.emailVerified) {
      verifyEmail.style.display = "block";
      isEmailVerified = false;
    } else {
      verifyEmail.style.display = "none";
      isEmailVerified = true;
    }
  } else {
    window.location.href = "index.html";
  }
});

function logout() {
  signOut(auth);
  window.location.href = "index.html";
}

function setNightMode() {
  document.cookie = "theme=night";
  document.getElementById("html").style.transition = "0.3s";
  document.querySelector("nav").style.transition = "0.3s";
  renderTheme();
}

function setLightMode() {
  document.cookie = "theme=light";
  location.reload();
}

//Switch styles of objects to dark theme
function renderTheme() {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  if (cookie["theme"] == "night") {
    document.getElementById("nightbutton").style.display = "none";
    document.getElementById("lightbutton").style.display = "flex";
    document.getElementById("html").style.backgroundColor = "#243B53";
    document.getElementById("appTitle").style.color = "#BCCCDC";
    document.getElementById("newAppTitle").style.color = "#BCCCDC";
    document.getElementById("settingsTitle").style.color = "#BCCCDC";
    document.querySelector("nav").style.backgroundColor = "#102A43";
    document.getElementById("addapplication").style.backgroundColor = "#00897B";
    document
      .getElementById("viewModalContent")
      .classList.remove("has-background-white");
    document
      .getElementById("addModalContent")
      .classList.remove("has-background-white");
    document
      .getElementById("settingsModalContent")
      .classList.remove("has-background-white");
    document
      .getElementById("deleteModalContent")
      .classList.remove("has-background-white");
    var h1texts = document.querySelectorAll("h1");
    for (var i = 0; i < h1texts.length; i++) {
      h1texts[i].style.color = "#BCCCDC";
    }
    var h3texts = document.querySelectorAll("h3");
    for (var i = 0; i < h3texts.length; i++) {
      h3texts[i].style.color = "#BCCCDC";
    }
    var h5texts = document.querySelectorAll("h5");
    for (var i = 0; i < h5texts.length; i++) {
      h5texts[i].style.color = "#BCCCDC";
    }
    var cardContents = document.querySelectorAll(".card-content");
    for (var i = 0; i < cardContents.length; i++) {
      cardContents[i].style.backgroundColor = "#334E68";
    }
    var cardFooters = document.querySelectorAll(".card-footer-item");
    for (var i = 0; i < cardFooters.length; i++) {
      cardFooters[i].style.backgroundColor = "#102A43";
    }
    var pTexts = document.querySelectorAll("p");
    for (var i = 0; i < pTexts.length; i++) {
      pTexts[i].style.color = "#BCCCDC";
    }
    var topButtons = document.querySelectorAll(".topbutton");
    for (var i = 0; i < topButtons.length; i++) {
      topButtons[i].style.backgroundColor = "#334E68";
    }
    var spanTexts = document.querySelectorAll("span");
    for (var i = 0; i < spanTexts.length; i++) {
      spanTexts[i].style.color = "#BCCCDC";
    }
    var modalBgs = document.querySelectorAll(".modal-content");
    for (var i = 0; i < modalBgs.length; i++) {
      modalBgs[i].style.backgroundColor = "#243B53";
    }
    var labelTexts = document.querySelectorAll("label");
    for (var i = 0; i < labelTexts.length; i++) {
      labelTexts[i].style.color = "#BCCCDC";
    }
    var h5Texts = document.querySelectorAll("h5");
    for (var i = 0; i < h5Texts.length; i++) {
      h5Texts[i].style.color = "#BCCCDC";
    }
    var modalHeaders = document.querySelectorAll("#viewModalHeader");
    for (var i = 0; i < modalHeaders.length; i++) {
      modalHeaders[i].style.backgroundColor = "#102A43";
      modalHeaders[i].style.color = "#BCCCDC";
    }
    var tableHeaders = document.querySelectorAll("tr");
    for (var i = 0; i < tableHeaders.length; i++) {
      tableHeaders[i].style.backgroundColor = "#102A43";
      tableHeaders[i].style.color = "#BCCCDC";
    }
    var tableText = document.querySelectorAll("td");
    for (var i = 0; i < tableText.length; i++) {
      tableText[i].style.color = "#BCCCDC";
    }
    var tableTextHeaders = document.querySelectorAll("th");
    for (var i = 0; i < tableTextHeaders.length; i++) {
      tableTextHeaders[i].style.color = "#BCCCDC";
    }
  } else {
    document.getElementById("nightbutton").style.display = "flex";
    document.getElementById("lightbutton").style.display = "none";
    document
      .getElementById("viewModalContent")
      .classList.add("has-background-white");
    document
      .getElementById("addModalContent")
      .classList.add("has-background-white");
    document
      .getElementById("settingsModalContent")
      .classList.add("has-background-white");
    document
      .getElementById("deleteModalContent")
      .classList.add("has-background-white");
  }
}

const cardList = document.querySelector("#cards");
const appTable = document.querySelector("#applicationtable");

//Top Menu Elements
const searchTextBar = document.querySelector("#appsearchbar");
const searchPType = document.querySelector("#appsearchbarptype");
const searchPStatus = document.querySelector("#appsearchbarpstatus");
const searchFUp = document.querySelector("#appsearchbarfup");
const searchDate = document.querySelector("#appsearchdatebar");
const searchColor = document.querySelector("#appsearchbarcolor");
searchColor.style.display = "none";

//Settings Menu
const settingsModal = document.querySelector("#settingsModal");
const settingsModalBg = document.querySelector("#settingsModalBg");
const settingsButton = document.querySelector("#settingsbutton");
const settingsForm = document.querySelector("#settingsform");
const settingsShowWarning = document.querySelector("#showfollowup");
const settingsWarningTime = document.querySelector("#warningSelect");
const settingsCardDisplay = document.querySelector("#displaySelect");

//Application Form Modal
const newAppButton = document.querySelector("#addapplication");
let isDuplicate = false;
const newAppTitle = document.querySelector("#newAppTitle");
const modalBg = document.querySelector("#formModalBg");
const modal = document.querySelector("#formModal");

//Application Form
const applicationForm = document.querySelector("#applicationform");
var appFormLocationField = applicationForm.addlocation;
const formSubmitButton = document.querySelector("#formsubmit");
const invalidInput = document.querySelector("#invalidinput");

//Application View Modal
const viewModal = document.querySelector("#viewModal");
const viewModalBg = document.querySelector("#viewModalBg");
const viewModalContent = document.querySelector("#viewModalContent");
const viewModalForm = document.querySelector("#viewappform");
var viewFormLocationField = viewModalForm.viewlocation;
var editModalButton;
var applicationID = "";

//Delete Modal
const deleteModal = document.querySelector("#deleteModal");
const deleteModalBg = document.querySelector("#deleteModalBg");
const deleteAppText = document.querySelector("#deleteAppText");
const deleteAppButton = document.querySelector("#appDeleteButton");
const deleteAppCloseButton = document.querySelector("#appDeleteCloseButton");

var appsToDisplay = [];

/**
 * A function to check if a given date is two weeks or more away
 * from the current date.
 */
function isDateAgo(date, timeframe) {
  var time = 0;
  var dateTime = 0;
  if (timeframe == "3 Days") {
    time = 4 * 24 * 60 * 60 * 1000;
  } else if (timeframe == "5 Days") {
    time = 6 * 24 * 60 * 60 * 1000;
  } else if (timeframe == "1 Week") {
    time = 8 * 24 * 60 * 60 * 1000;
  } else {
    time = 15 * 24 * 60 * 60 * 1000;
  }

  dateTime = new Date().getTime() - time;

  return dateTime > date;
}

/**
 * Function that displays application cards on screen through given
 * list.
 *
 * The function creates HTML card elements to display each application
 * and applies necessary style classes. The function also
 * checks if the date on an application is more than two weeks ago,
 * and displays a follow-up warning if so.
 *
 *
 * @param {*} applications
 */
function DisplayApplicationCards(applications) {
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  if (userSettings[2] == "Cards" || check) {
    while (cardList.firstChild) {
      cardList.removeChild(cardList.firstChild);
    }

    for (var i = 0, element; (element = applications[i++]); ) {
      const currentID = element[0];
      const currentDisplay = element[1];

      //Create HTML element
      //Card div
      var newCard = document.createElement("div");
      newCard.classList.add("card");
      var cardID = "" + currentID;
      newCard.setAttribute("id", cardID);

      //Card content
      var cardContent = document.createElement("div");
      cardContent.classList.add("card-content");
      if (currentDisplay[8] == "Blue") {
        cardContent.style.backgroundColor = "#85E3FF";
      } else if (currentDisplay[8] == "Red") {
        cardContent.style.backgroundColor = "#FFABAB";
      } else if (currentDisplay[8] == "Green") {
        cardContent.style.backgroundColor = "#BFFCC6";
      } else if (currentDisplay[8] == "Orange") {
        cardContent.style.backgroundColor = "#FFC8A2";
      } else if (currentDisplay[8] == "Pink") {
        cardContent.style.backgroundColor = "#FEE1E8";
      } else if (currentDisplay[8] == "Purple") {
        cardContent.style.backgroundColor = "#CBAACB";
      } else if (currentDisplay[8] == "Yellow") {
        cardContent.style.backgroundColor = "#FFFFB5";
      }
      var cardContentTop = document.createElement("p");
      cardContentTop.classList.add("pTopText");
      if (currentDisplay[1].length <= 23) {
        var text = document.createTextNode(currentDisplay[1] + " @");
      } else {
        var text = document.createTextNode(
          currentDisplay[1].substring(0, 23) + "... @"
        );
      }
      cardContentTop.appendChild(text);
      var cardContentBottom = document.createElement("p");
      cardContentBottom.classList.add("title", "is-size-5");
      if (screen.width < 1600 && currentDisplay[0].length > 19) {
        text = document.createTextNode(
          currentDisplay[0].substring(0, 19) + "..."
        );
      } else if (currentDisplay[0].length > 20) {
        text = document.createTextNode(
          currentDisplay[0].substring(0, 20) + "..."
        );
      } else {
        text = document.createTextNode(currentDisplay[0]);
      }
      cardContentBottom.appendChild(text);
      cardContent.appendChild(cardContentTop);
      cardContent.appendChild(cardContentBottom);

      //Footer content
      var cardFooter = document.createElement("footer");
      cardFooter.classList.add("card-footer");

      var viewLink = document.createElement("p");
      viewLink.classList.add("card-footer-item", "application-card-view");
      viewLink.addEventListener("click", () => {
        var viewPosTitle = document.querySelector("#viewPositionTitle");
        var viewComTitle = document.querySelector("#viewCompanyTitle");
        viewPosTitle.textContent = currentDisplay[1];
        viewPosTitle.setAttribute("name", currentID);
        viewComTitle.textContent = currentDisplay[0];

        viewModalForm.viewcompany.value = currentDisplay[0];
        viewModalForm.viewposition.value = currentDisplay[1];
        viewModalForm.viewsalary.value = currentDisplay[2];
        viewModalForm.viewjoburl.value = currentDisplay[3];
        document.getElementById("viewjoburllink").href = currentDisplay[3];
        viewModalForm.viewlocation.value = currentDisplay[4];
        viewModalForm.viewjobtype.value = currentDisplay[5];
        viewModalForm.viewdate.value = currentDisplay[6];
        viewModalForm.viewfollowedup.value = currentDisplay[7];
        viewModalForm.viewcolor.value = currentDisplay[8];
        viewModalForm.viewstatus.value = currentDisplay[9];
        viewModalForm.viewnotes.value = currentDisplay[10];
        document.getElementById("viewInfoButton").classList.add("is-active");
        if (currentDisplay[4].length == 0) {
          document.getElementById("viewMapButton").style.display = "none";
        } else {
          document.getElementById("viewMapButton").style.display = "block";
        }

        document
          .getElementById("viewInfoButton")
          .addEventListener("click", () => {
            document.getElementById("viewPage").style.display = "block";
            document.getElementById("viewMap").style.display = "none";
            document
              .getElementById("viewInfoButton")
              .classList.add("is-active");
            document
              .getElementById("viewMapButton")
              .classList.remove("is-active");
            document
              .getElementById("locationMap")
              .classList.remove("is-active");
          });

        renderTheme();
        document.querySelector("html").classList.add("is-clipped");
        viewModal.classList.add("is-active");
      });
      viewModalBg.addEventListener("click", () => {
        viewModal.classList.remove("is-active");
        document.querySelector("html").classList.remove("is-clipped");
        document.getElementById("viewPage").style.display = "block";
        document.getElementById("viewMap").style.display = "none";
        document.getElementById("viewInfoButton").classList.add("is-active");
        document.getElementById("viewMapButton").classList.remove("is-active");
        document.getElementById("locationMap").classList.remove("is-active");
        const viewInvalidInput = document.getElementById("viewInvalidInput");
        viewInvalidInput.style.display = "none";
      });
      var viewLinkText = document.createTextNode("View");
      viewLink.appendChild(viewLinkText);
      //Check if it's been more than two weeks since Applied Date & add warning if so
      if (
        isDateAgo(new Date(currentDisplay[6]), userSettings[1]) &&
        currentDisplay[7] == "No" &&
        userSettings[0] == "true"
      ) {
        var followUpWarning = document.createElement("span");
        followUpWarning.classList.add("icon", "has-text-danger");
        var followUpIcon = document.createElement("i");
        followUpIcon.classList.add("fas", "fa-clock", "tooltip");
        followUpWarning.appendChild(followUpIcon);
        var followUpText = document.createElement("span");
        followUpText.classList.add("tooltiptext");
        followUpText.textContent =
          "It's been more than " +
          userSettings[1].toLowerCase() +
          " since you've applied, consider following up!";
        followUpIcon.appendChild(followUpText);
        viewLink.appendChild(followUpWarning);
      }

      var deleteLink = document.createElement("p");
      deleteLink.classList.add("card-footer-item", "application-card-delete");
      deleteLink.addEventListener("click", () => {
        deleteModal.classList.add("is-active");
        document.querySelector("html").classList.add("is-clipped");
        deleteModalBg.addEventListener("click", () => {
          document.querySelector("html").classList.remove("is-clipped");
          deleteModal.classList.remove("is-active");
        });
        deleteAppText.textContent =
          "Are you sure you want to delete your application for " +
          currentDisplay[0] +
          "?";
        deleteAppCloseButton.addEventListener("click", () => {
          deleteModal.classList.remove("is-active");
        });
        deleteAppButton.addEventListener("click", async () => {
          var id = "" + currentID;
          var obj = {};
          obj[id] = deleteField();
          await updateDoc(doc(db, "users", auth.currentUser.uid), obj);
          location.reload();
        });
      });
      deleteLink.href = "";
      var deleteLinkText = document.createTextNode("Delete");
      deleteLink.appendChild(deleteLinkText);

      cardFooter.appendChild(viewLink);
      cardFooter.appendChild(deleteLink);

      newCard.appendChild(cardContent);
      newCard.appendChild(cardFooter);
      cardList.appendChild(newCard);
      renderTheme();
    }
  } else if (userSettings[2] == "List" && !check) {
    while (appTable.firstChild) {
      appTable.removeChild(appTable.firstChild);
    }

    var tableBody = document.createElement("tbody");

    var tableHead = document.createElement("thead");
    var tRow = document.createElement("tr");
    var cNameHeader = document.createElement("th");
    cNameHeader.textContent = "Company Name";
    var pHeader = document.createElement("th");
    pHeader.textContent = "Position";
    var pTypeHeader = document.createElement("th");
    pTypeHeader.textContent = "Position Type";
    var pStatusHeader = document.createElement("th");
    pStatusHeader.textContent = "Position Status";
    var actionHeader = document.createElement("th");
    actionHeader.textContent = "Actions";
    tRow.appendChild(cNameHeader);
    tRow.appendChild(pHeader);
    tRow.appendChild(pTypeHeader);
    tRow.appendChild(pStatusHeader);
    tRow.appendChild(actionHeader);
    tableHead.appendChild(tRow);
    appTable.appendChild(tableHead);
    appTable.appendChild(tableBody);

    for (var i = 0, element; (element = applications[i++]); ) {
      const currentID = element[0];
      const currentDisplay = element[1];

      var newRow = document.createElement("tr");
      if (currentDisplay[8] == "Blue") {
        newRow.style.backgroundColor = "#85E3FF";
      } else if (currentDisplay[8] == "Red") {
        newRow.style.backgroundColor = "#FFABAB";
      } else if (currentDisplay[8] == "Green") {
        newRow.style.backgroundColor = "#BFFCC6";
      } else if (currentDisplay[8] == "Orange") {
        newRow.style.backgroundColor = "#FFC8A2";
      } else if (currentDisplay[8] == "Pink") {
        newRow.style.backgroundColor = "#FEE1E8";
      } else if (currentDisplay[8] == "Purple") {
        newRow.style.backgroundColor = "#CBAACB";
      } else if (currentDisplay[8] == "Yellow") {
        newRow.style.backgroundColor = "#FFFFB5";
      }
      var companyName = document.createElement("td");
      if (currentDisplay[0].length >= 30) {
        companyName.textContent = currentDisplay[0].substring(0, 29) + "...";
      } else {
        companyName.textContent = currentDisplay[0];
      }
      //Check if it's been more than two weeks since Applied Date & add warning if so
      if (
        isDateAgo(new Date(currentDisplay[6]), userSettings[1]) &&
        currentDisplay[7] == "No" &&
        userSettings[0] == "true"
      ) {
        var followUpWarning = document.createElement("span");
        followUpWarning.classList.add("icon", "has-text-danger");
        var followUpIcon = document.createElement("i");
        followUpIcon.classList.add("fas", "fa-clock", "tooltip");
        followUpWarning.appendChild(followUpIcon);
        var followUpText = document.createElement("span");
        followUpText.classList.add("tooltiptext");
        followUpText.textContent =
          "It's been more than " +
          userSettings[1].toLowerCase() +
          " since you've applied, consider following up!";
        followUpIcon.appendChild(followUpText);
        companyName.appendChild(followUpWarning);
      }
      var position = document.createElement("td");
      if (currentDisplay[1].length >= 40) {
        position.textContent = currentDisplay[1].substring(0, 39) + "...";
      } else {
        position.textContent = currentDisplay[1];
      }
      var positionType = document.createElement("td");
      positionType.textContent = currentDisplay[5];
      var positionStatus = document.createElement("td");
      positionStatus.textContent = currentDisplay[9];
      var buttonTD = document.createElement("td");
      var viewButton = document.createElement("button");
      viewButton.classList.add("button", "tablebutton", "is-link", "mr-2");
      viewButton.textContent = "View";
      var deleteButton = document.createElement("button");
      deleteButton.classList.add("button", "tablebutton", "is-danger");
      deleteButton.textContent = "Delete";
      viewButton.addEventListener("click", () => {
        var viewPosTitle = document.querySelector("#viewPositionTitle");
        var viewComTitle = document.querySelector("#viewCompanyTitle");
        viewPosTitle.textContent = currentDisplay[1];
        viewPosTitle.setAttribute("name", currentID);
        viewComTitle.textContent = currentDisplay[0];

        viewModalForm.viewcompany.value = currentDisplay[0];
        viewModalForm.viewposition.value = currentDisplay[1];
        viewModalForm.viewsalary.value = currentDisplay[2];
        viewModalForm.viewjoburl.value = currentDisplay[3];
        document.getElementById("viewjoburllink").href = currentDisplay[3];
        viewModalForm.viewlocation.value = currentDisplay[4];
        viewModalForm.viewjobtype.value = currentDisplay[5];
        viewModalForm.viewdate.value = currentDisplay[6];
        viewModalForm.viewfollowedup.value = currentDisplay[7];
        viewModalForm.viewcolor.value = currentDisplay[8];
        viewModalForm.viewstatus.value = currentDisplay[9];
        viewModalForm.viewnotes.value = currentDisplay[10];
        document.getElementById("viewInfoButton").classList.add("is-active");
        if (currentDisplay[4].length == 0) {
          document.getElementById("viewMapButton").style.display = "none";
        } else {
          document.getElementById("viewMapButton").style.display = "block";
        }

        document
          .getElementById("viewInfoButton")
          .addEventListener("click", () => {
            document.getElementById("viewPage").style.display = "block";
            document.getElementById("viewMap").style.display = "none";
            document
              .getElementById("viewInfoButton")
              .classList.add("is-active");
            document
              .getElementById("viewMapButton")
              .classList.remove("is-active");
            document
              .getElementById("locationMap")
              .classList.remove("is-active");
          });

        renderTheme();
        document.querySelector("html").classList.add("is-clipped");
        viewModal.classList.add("is-active");
      });
      viewModalBg.addEventListener("click", () => {
        viewModal.classList.remove("is-active");
        document.querySelector("html").classList.remove("is-clipped");
        document.getElementById("viewPage").style.display = "block";
        document.getElementById("viewMap").style.display = "none";
        document.getElementById("viewInfoButton").classList.add("is-active");
        document.getElementById("viewMapButton").classList.remove("is-active");
        document.getElementById("locationMap").classList.remove("is-active");
        const viewInvalidInput = document.getElementById("viewInvalidInput");
        viewInvalidInput.style.display = "none";
      });

      deleteButton.addEventListener("click", () => {
        document.querySelector("html").classList.add("is-clipped");
        deleteModal.classList.add("is-active");
        deleteModalBg.addEventListener("click", () => {
          document.querySelector("html").classList.remove("is-clipped");
          deleteModal.classList.remove("is-active");
        });
        deleteAppText.textContent =
          "Are you sure you want to delete your application for " +
          currentDisplay[0] +
          "?";
        deleteAppCloseButton.addEventListener("click", () => {
          deleteModal.classList.remove("is-active");
        });
        deleteAppButton.addEventListener("click", async () => {
          var id = "" + currentID;
          var obj = {};
          obj[id] = deleteField();
          await updateDoc(doc(db, "users", auth.currentUser.uid), obj);
          location.reload();
        });
      });

      buttonTD.appendChild(viewButton);
      buttonTD.appendChild(deleteButton);
      newRow.appendChild(companyName);
      newRow.appendChild(position);
      newRow.appendChild(positionType);
      newRow.appendChild(positionStatus);
      newRow.appendChild(buttonTD);
      tableBody.appendChild(newRow);
    }
  }
  renderTheme();
}

/**
 * Comparator function to sort the application cards alphabetically.
 *
 * @param {*} a First title to compare.
 * @param {*} b Second title to compare.
 * @returns Comparison result.
 */
function sortByAZ(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[0].toLowerCase() < bData[0].toLowerCase()) {
    return -1;
  }
  if (bData[0].toLowerCase() < aData[0].toLowerCase()) {
    return 1;
  }
  return 0;
}

/**
 * Comparator function to sort the application cards alphabetically.
 *
 * @param {*} a First title to compare.
 * @param {*} b Second title to compare.
 * @returns Comparison result.
 */
function sortByZA(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[0].toLowerCase() < bData[0].toLowerCase()) {
    return 1;
  }
  if (bData[0].toLowerCase() < aData[0].toLowerCase()) {
    return -1;
  }
  return 0;
}

/**
 * Comparator function to sort the application cards by date.
 *
 * @param {*} a First date to compare.
 * @param {*} b Second date to compare.
 * @returns Comparison result.
 */
function sortByDateRecent(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[6] < bData[6]) {
    return 1;
  }
  if (bData[6] < aData[6]) {
    return -1;
  }
  return 0;
}

/**
 * Comparator function to sort the application cards by date.
 *
 * @param {*} a First date to compare.
 * @param {*} b Second date to compare.
 * @returns Comparison result.
 */
function sortByDateLeastRecent(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[6] < bData[6]) {
    return -1;
  }
  if (bData[6] < aData[6]) {
    return 1;
  }
  return 0;
}

/**
 * Comparator function to sort the application cards by salary value.
 *
 * @param {*} a First date to compare.
 * @param {*} b Second date to compare.
 * @returns Comparison result.
 */
function sortBySalaryHtoL(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[2] < bData[2]) {
    return 1;
  }
  if (bData[2] < aData[2]) {
    return -1;
  }
  return 0;
}

/**
 * Comparator function to sort the application cards by salary value.
 *
 * @param {*} a First date to compare.
 * @param {*} b Second date to compare.
 * @returns Comparison result.
 */
function sortBySalaryLtoH(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[2] < bData[2]) {
    return -1;
  }
  if (bData[2] < aData[2]) {
    return 1;
  }
  return 0;
}

/**
 * Comparator function to sort the application cards by colors.
 *
 * @param {*} a First date to compare.
 * @param {*} b Second date to compare.
 * @returns Comparison result.
 */
function sortByColor(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[8] == "None") {
    return 1;
  }
  if (bData[8] == "None") {
    return -1;
  }
  if (aData[8] < bData[8]) {
    return -1;
  }
  if (bData[8] < aData[8]) {
    return 1;
  }
  return 0;
}

/**
 * A function that runs when the page is loaded and displays
 * application cards
 *
 * The function is passed all of the application data from
 * the current user's database document
 *
 * @param {*} applications Applications to display
 */
function windowLoad(applications) {
  /*
  0 - Company Name
  1 - Position
  2 - Salary
  3 - Job URL
  4 - Location
  5 - Job Type
  6 - Date
  7 - Followed Up
  8 - Color
  9 - Status
  10 - Notes
  */

  document.getElementById("viewPage").style.display = "block";
  document.getElementById("viewMap").style.display = "none";
  //Convert applications from database into Strings for displaying
  globalApplications = Object.entries(applications);
  let applicationObject = {};
  for (var i = 0, element; (element = globalApplications[i++]); ) {
    applicationObject[element[0]] = element[1];
  }
  appsToDisplay = Object.entries(applicationObject);

  document.getElementById("appTitle").textContent =
    auth.currentUser.displayName +
    "'s Applications (" +
    Object.keys(applicationObject).length +
    ")";

  //Get sort cookie and see if cookies need to be sorted
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });

  if (cookie["sort"] == "az") {
    appsToDisplay = appsToDisplay.sort(sortByAZ);
  } else if (cookie["sort"] == "za") {
    appsToDisplay = appsToDisplay.sort(sortByZA);
  } else if (cookie["sort"] == "datemost") {
    appsToDisplay = appsToDisplay.sort(sortByDateRecent);
  } else if (cookie["sort"] == "dateleast") {
    appsToDisplay = appsToDisplay.sort(sortByDateLeastRecent);
  } else if (cookie["sort"] == "salaryhtol") {
    appsToDisplay = appsToDisplay.sort(sortBySalaryHtoL);
  } else if (cookie["sort"] == "salaryltoh") {
    appsToDisplay = appsToDisplay.sort(sortBySalaryLtoH);
  } else if (cookie["sort"] == "color") {
    appsToDisplay = appsToDisplay.sort(sortByColor);
  } else {
    appsToDisplay = appsToDisplay.sort(sortByAZ);
  }

  DisplayApplicationCards(appsToDisplay);
}

settingsButton.addEventListener("click", () => {
  document.querySelector("html").classList.add("is-clipped");
  settingsModal.classList.add("is-active");
  let check = false;
  (function (a) {
    if (
      /(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(
        a
      ) ||
      /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(
        a.substr(0, 4)
      )
    )
      check = true;
  })(navigator.userAgent || navigator.vendor || window.opera);

  if (check) {
    settingsCardDisplay.setAttribute("disabled", "true");
    var mobileText = document.createElement("p");
    mobileText.innerHTML =
      "<i>Note: Display change not available on mobile</i>";
    settingsForm.appendChild(mobileText);
  }

  if (userSettings[0] == "true") {
    settingsShowWarning.checked = true;
  } else {
    settingsShowWarning.checked = false;
  }

  settingsWarningTime.value = userSettings[1];
  settingsCardDisplay.value = userSettings[2];
});

settingsModalBg.addEventListener("click", () => {
  document.querySelector("html").classList.remove("is-clipped");
  settingsModal.classList.remove("is-active");
});

/**
 * Shows application form for user to submit data.
 */
newAppButton.addEventListener("click", () => {
  if (isEmailVerified) {
    applicationForm.addjobtype.value = "";
    applicationForm.addstatus.value = "";
    document.querySelector("html").classList.add("is-clipped");
    modal.classList.add("is-active");
  } else {
    alert("Please verify your email before adding any applications.");
  }
});

/**
 * Clears application form and disables it when user clicks away.
 */
modalBg.addEventListener("click", () => {
  isDuplicate = false;
  document.querySelector("html").classList.remove("is-clipped");
  modal.classList.remove("is-active");
  applicationForm.reset();
  invalidInput.style.display = "none";
});

/**
 * A function that sorts the application cards by a given criteria.
 *
 * The function uses the given parameter to determine how to
 * sort the cards, either alphabetically or by date.
 *
 * @param {*} method A parameter to determine how to sort the cards.
 */
function sortCards(method) {
  if (method == "az") {
    document.cookie = "sort=az";
  } else if (method == "datemost") {
    document.cookie = "sort=datemost";
  } else if (method == "salaryhtol") {
    document.cookie = "sort=salaryhtol";
  } else if (method == "za") {
    document.cookie = "sort=za";
  } else if (method == "dateleast") {
    document.cookie = "sort=dateleast";
  } else if (method == "salaryltoh") {
    document.cookie = "sort=salaryltoh";
  } else if (method == "color") {
    document.cookie = "sort=color";
  } else {
    document.cookie = "sort=az";
  }
  location.reload();
}

settingsForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var settings = settingsForm.elements;
  const settingsElements = [];
  for (var i = 0; i < settings.length - 1; i++) {
    settingsElements.push(settings[i].value);
  }

  if (settingsShowWarning.checked) {
    settingsElements[0] = "true";
  } else {
    settingsElements[0] = "false";
  }

  var settings = {};
  settings["userSettings"] = settingsElements;
  await updateDoc(doc(db, "users", auth.currentUser.uid), settings);
  location.reload();
});

/**
 * A function that parses through the application form results
 * and creates a database entry with the given information, and adds
 * it to the database
 */
/*
  0 - Company Name
  1 - Position
  2 - Salary
  3 - Job URL
  4 - Location
  5 - Job Type
  6 - Date
  7 - Followed Up
  8 - Color
  9 - Status
  10 - Notes
  */
applicationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var elements = document.getElementById("applicationform").elements;

  if (elements[0].value.length < 1 || elements[1].value.length < 1) {
    invalidInput.textContent = "Please fill all required fields.";
    invalidInput.style.display = "block";
  } else if (!/^[A-Za-z0-9]*$/.test(elements[0].value.replace(/\s/g, ""))) {
    invalidInput.textContent =
      "Company name can only contain numbers and letters.";
    invalidInput.style.display = "block";
  } else if (!/^\d+$/.test(elements[2].value) && elements[2].value.length > 0) {
    invalidInput.textContent = "Salary must only contain numbers.";
    invalidInput.style.display = "block";
  } else {
    invalidInput.style.display = "none";

    //Build element array and create application
    const formElements = [];
    for (var i = 0; i < elements.length - 1; i++) {
      formElements.push(elements[i].value);
    }
    //Create a unique ID to assign to application
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

    var obj = {};
    obj[id] = formElements;
    await updateDoc(doc(db, "users", auth.currentUser.uid), obj);

    //Reset form once successfully submitted
    modal.classList.remove("is-active");
    applicationForm.reset();
    invalidInput.style.display = "none";
    location.reload();
  }
});

const viewAppForm = document.querySelector("#viewappform");
viewAppForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const viewInvalidInput = document.getElementById("viewInvalidInput");
  var elements = viewAppForm.elements;
  var currID = document
    .getElementById("viewPositionTitle")
    .getAttribute("name");

  if (elements[0].value.length < 1 || elements[1].value.length < 1) {
    viewInvalidInput.textContent = "Please fill all required fields.";
    viewInvalidInput.style.display = "block";
  } else if (!/^[A-Za-z0-9]*$/.test(elements[0].value.replace(/\s/g, ""))) {
    viewInvalidInput.textContent =
      "Company name can only contain numbers and letters.";
    viewInvalidInput.style.display = "block";
  } else if (!/^\d+$/.test(elements[2].value) && elements[2].value.length > 0) {
    viewInvalidInput.textContent = "Salary must only contain numbers.";
    viewInvalidInput.style.display = "block";
  } else {
    viewInvalidInput.style.display = "none";

    //Build element array and create application
    const formElements = [];
    for (var i = 0; i < elements.length - 1; i++) {
      formElements.push(elements[i].value);
    }
    //Create a unique ID to assign to application
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

    var obj = {};
    obj[id] = formElements;
    obj[currID] = deleteField();
    await updateDoc(doc(db, "users", auth.currentUser.uid), obj);

    //Reset form once successfully submitted
    viewModal.classList.remove("is-active");
    viewAppForm.reset();
    location.reload();
  }
});

/**
 * A function to properly apply changes to the display structure of
 * the search dropdown.
 *
 * The function takes in a parameter and uses it to determine which
 * search criteria to show the corresponding search box/dropdown for.
 *
 * @param {*} value The String to let the dropdown know which search
 * criteria is selected so it can act accordingly
 */
function selectSearch(value) {
  var spanText = document.getElementById("searchText");
  var searchBar = document.getElementById("appsearchbar");
  spanText.textContent = value;

  if (value == "Company Name") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplicationCards(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Position Name") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplicationCards(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Position Type") {
    search_applications(document.getElementById("searchPTypeText").textContent);
    searchPStatus.style.display = "none";
    searchTextBar.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchPType.style.display = "block";
  } else if (value == "Position Status") {
    search_applications(
      document.getElementById("searchPStatusText").textContent
    );
    searchPType.style.display = "none";
    searchTextBar.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchPStatus.style.display = "block";
  } else if (value == "Date Applied <=" || value == "Date Applied >") {
    searchDate.value = "";
    DisplayApplicationCards(appsToDisplay);
    searchBar.type = "date";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchTextBar.style.display = "none";
    searchColor.style.display = "none";
    searchDate.style.display = "block";
  } else if (value == "Followed Up") {
    search_applications(document.getElementById("searchfUpText").textContent);
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchTextBar.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchFUp.style.display = "block";
  } else if (value == "Notes") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplicationCards(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Salary <=") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplicationCards(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Salary >") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplicationCards(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchColor.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Color") {
    search_applications(document.getElementById("searchColorText").textContent);
    searchPType.style.display = "none";
    searchTextBar.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchPStatus.style.display = "none";
    searchColor.style.display = "block";
  }
  renderTheme();
}

/**
 * A function to search through the list of application given a certain
 * criteria.
 *
 * The function determines which criteria to search for through the
 * 'searchText' element, and loops through every application and filters
 * with the corresponding criteria.
 *
 * @param {*} selectValue An optional parameter that lets the function know
 * which criteria to search for in certain conditions
 */
function search_applications(selectValue) {
  var spanText = document.getElementById("searchText");
  if (spanText.textContent == "Company Name") {
    let input = document.getElementById("appsearchbar").value.toLowerCase();
    if (input == "") {
      DisplayApplicationCards(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[0].substring(0, input.length).toLowerCase().includes(input)) {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Position Name") {
    let input = document.getElementById("appsearchbar").value.toLowerCase();
    if (input == "") {
      DisplayApplicationCards(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[1].substring(0, input.length).toLowerCase().includes(input)) {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Position Type") {
    if (selectValue == "Internship/Co-Op") {
      document.getElementById("searchPTypeText").textContent =
        "Internship/Co-Op";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[5] == "Internship/Co-Op") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Part-Time") {
      document.getElementById("searchPTypeText").textContent = "Part-Time";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[5] == "Part-Time") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Full-Time") {
      document.getElementById("searchPTypeText").textContent = "Full-Time";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[5] == "Full-Time") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Position Status") {
    if (selectValue == "Applied") {
      document.getElementById("searchPStatusText").textContent = "Applied";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[9] == "Applied") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Interviewed") {
      document.getElementById("searchPStatusText").textContent = "Interviewed";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[9] == "Interviewed") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Rejected") {
      document.getElementById("searchPStatusText").textContent = "Rejected";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[9] == "Rejected") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if ((selectValue = "Offered")) {
      document.getElementById("searchPStatusText").textContent = "Offered";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[9] == "Offered") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Date Applied <=") {
    let input = document.getElementById("appsearchdatebar").value;
    let newApplications = [];
    for (var i = 0, element; (element = appsToDisplay[i++]); ) {
      let temp = element[1];
      if (new Date(temp[6]) <= new Date(input)) {
        newApplications.push(element);
      }
    }
    DisplayApplicationCards(newApplications);
  } else if (spanText.textContent == "Date Applied >") {
    let input = document.getElementById("appsearchdatebar").value;
    let newApplications = [];
    for (var i = 0, element; (element = appsToDisplay[i++]); ) {
      let temp = element[1];
      if (new Date(temp[6]) > new Date(input)) {
        newApplications.push(element);
      }
    }
    DisplayApplicationCards(newApplications);
  } else if (spanText.textContent == "Followed Up") {
    if (selectValue == "Yes") {
      document.getElementById("searchfUpText").textContent = "Yes";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[7] == "Yes") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "No") {
      document.getElementById("searchfUpText").textContent = "No";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[7] == "No") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Notes") {
    let input = document.getElementById("appsearchbar").value.toLowerCase();
    if (input == "") {
      DisplayApplicationCards(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[10].substring(0, input.length).toLowerCase().includes(input)) {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Salary <=") {
    let input = parseInt(document.getElementById("appsearchbar").value, 10);
    if (input == "") {
      DisplayApplicationCards(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (parseInt(temp[2], 10) <= input && temp[2] != "") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Salary >") {
    let input = parseInt(document.getElementById("appsearchbar").value, 10);
    if (input == "") {
      DisplayApplicationCards(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (parseInt(temp[2], 10) > input && temp[2] != "") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  } else if (spanText.textContent == "Color") {
    if (selectValue == "None") {
      document.getElementById("searchColorText").textContent = "None";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "None" || temp[8] == "") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Blue") {
      document.getElementById("searchColorText").textContent = "Blue";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Blue") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Red") {
      document.getElementById("searchColorText").textContent = "Red";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Red") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Green") {
      document.getElementById("searchColorText").textContent = "Green";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Green") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Orange") {
      document.getElementById("searchColorText").textContent = "Orange";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Orange") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Pink") {
      document.getElementById("searchColorText").textContent = "Pink";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Pink") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Purple") {
      document.getElementById("searchColorText").textContent = "Purple";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Purple") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    } else if (selectValue == "Yellow") {
      document.getElementById("searchColorText").textContent = "Yellow";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[8] == "Yellow") {
          newApplications.push(element);
        }
      }
      DisplayApplicationCards(newApplications);
    }
  }
}

/**
 * A function that allows the user to edit an existing application
 * card.
 *
 * The function converts the information modal to the editable form
 * modal and allows the user to edit the existing information and
 * submit the changes to override the already existing application.
 */
function editCard() {
  //Collect already existing info & remove modal
  let values = [];
  let editParent = editModalButton.parentElement.parentElement;
  editParent.removeChild(editParent.firstChild);
  while (editParent.firstChild) {
    if (editParent.firstChild.nodeName == "P") {
      values.push(editParent.firstChild.textContent);
    }
    if (editParent.firstChild.lastChild.nodeName == "TEXTAREA") {
      values.push(editParent.firstChild.lastChild.value);
    }
    if (editParent.firstChild.hasAttribute("name")) {
      applicationID = editParent.firstChild.getAttribute("name");
    }
    editParent.removeChild(editParent.firstChild);
  }
  while (viewModalContent.firstChild) {
    viewModalContent.removeChild(viewModalContent.firstChild);
  }
  viewModal.classList.remove("is-active");
  //Add form modal and fill in pre-existing info

  isDuplicate = true;
  modal.classList.add("is-active");
  document.querySelector("#companyNameField").value = values[0];
  document.querySelector("#positionField").value = values[1];
  document.querySelector("#positionTypeField").value = values[2];
  document.querySelector("#positionStatusField").value = values[3];
  if (values[4] != "N/A") {
    document.querySelector("#dateAppliedField").value = values[4];
  }
  document.querySelector("#followedUpField").value = values[5];
  if (values[6] != "N/A") {
    document.querySelector("#notesField").value = values[6];
  }
  newAppTitle.textContent = "Editing " + values[0];
  formSubmitButton.textContent = "Submit Changes";
}

const appModalDelete = document.querySelector("#appCloseButton");
appModalDelete.addEventListener("click", () => {
  var modalBackground = appModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

const settingsModalDelete = document.querySelector("#settingsCloseButton");
settingsModalDelete.addEventListener("click", () => {
  var modalBackground =
    settingsModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

const viewCloseButton = document.querySelector("#viewCloseButton");
viewCloseButton.addEventListener("click", () => {
  document.getElementById("viewPage").style.display = "block";
  document.getElementById("viewMap").style.display = "none";
  document.getElementById("viewInfoButton").classList.add("is-active");
  document.getElementById("viewMapButton").classList.remove("is-active");
  document.getElementById("locationMap").classList.remove("is-active");
  viewModal.classList.remove("is-active");
  document.querySelector("html").classList.remove("is-clipped");
  const viewInvalidInput = document.getElementById("viewInvalidInput");
  viewInvalidInput.style.display = "none";
});

export {
  editCard,
  logout,
  selectSearch,
  search_applications,
  sortCards,
  setLightMode,
  setNightMode,
};
