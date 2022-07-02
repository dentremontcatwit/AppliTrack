import { initializeApp } from "firebase/app";
import { getAuth, signOut, onAuthStateChanged } from "firebase/auth";
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

const verifyEmail = document.querySelector("#verifyemail");
var isEmailVerified;
verifyEmail.style.display = "none";
var globalApplications;
//Bring the user back to home page if not logged in
onAuthStateChanged(auth, async (user) => {
  if (user) {
    const userRef = await getDoc(doc(db, "users", user.uid));
    var applications = userRef.data();
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

const cardList = document.querySelector("#cards");

//Top Menu Elements
const searchTextBar = document.querySelector("#appsearchbar");
const searchPType = document.querySelector("#appsearchbarptype");
const searchPStatus = document.querySelector("#appsearchbarpstatus");
const searchFUp = document.querySelector("#appsearchbarfup");
const searchDate = document.querySelector("#appsearchdatebar");

//Application Form Modal
const newAppButton = document.querySelector("#addapplication");
let isDuplicate = false;
const newAppTitle = document.querySelector("#newAppTitle");
const modalBg = document.querySelector("#formModalBg");
const modal = document.querySelector("#formModal");

//Application Form
const applicationForm = document.querySelector("#applicationform");
const formSubmitButton = document.querySelector("#formsubmit");
const invalidInput = document.querySelector("#invalidinput");
const invalidCompanyName = document.querySelector("#invalidcompanyname");

//Application View Modal
const viewModal = document.querySelector("#viewModal");
const viewModalBg = document.querySelector("#viewModalBg");
const viewModalContent = document.querySelector("#viewModalContent");
var editModalButton;
var applicationID = "";

var appsToDisplay = [];

/**
 * A function to check if a given date is two weeks or more away
 * from the current date.
 */
function isTwoWeeksAgo(date) {
  const twoWeeks = 15 * 24 * 60 * 60 * 1000;
  const twoWeeksTime = new Date().getTime() - twoWeeks;

  if (twoWeeksTime > date) {
    return true;
  } else {
    return false;
  }
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
function DisplayApplications(applications) {
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
    cardContentBottom.classList.add("title");
    cardContentBottom.classList.add("is-size-5");
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
    viewLink.classList.add("card-footer-item");
    viewLink.classList.add("application-card");
    viewLink.addEventListener("click", () => {
      //Title
      var modalTitle = document.createElement("header");
      modalTitle.classList.add("modal-card-head");
      modalTitle.classList.add("is-size-5");
      modalTitle.classList.add("has-text-weight-bold");
      modalTitle.classList.add("mb-2");
      if (currentDisplay[1].length + currentDisplay[0].length <= 50) {
        modalTitle.appendChild(
          document.createTextNode(
            "" + currentDisplay[1] + " @ " + currentDisplay[0]
          )
        );
      } else {
        var titleString = "" + currentDisplay[1] + " @ " + currentDisplay[0];
        modalTitle.appendChild(
          document.createTextNode(titleString.substring(0, 50) + "...")
        );
      }
      //Edit button
      var editButton = document.createElement("a");
      editButton.setAttribute("id", "editIcon");
      editButton.setAttribute("href", "#");
      editButton.setAttribute("onClick", "javascript:EntryPoint.editCard()");
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
      viewCompanyNameTitle.setAttribute("name", currentID.replace(/\s/g, ""));
      viewCompanyNameTitle.classList.add("subtitle");
      viewCompanyNameTitle.classList.add("is-4");
      viewCompanyNameTitle.classList.add("px-4");
      viewCompanyNameTitle.classList.add("mb-1");
      viewCompanyNameTitle.classList.add("has-text-weight-bold");
      viewCompanyNameTitle.appendChild(document.createTextNode("Company"));
      var viewCompanyName = document.createElement("p");
      viewCompanyName.classList.add("pText");
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
      viewPosition.classList.add("pText");
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
      viewPositionType.classList.add("pText");
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
      viewStatus.classList.add("pText");
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
      viewDateApplied.classList.add("pText");
      viewDateApplied.classList.add("mb-3");
      viewDateApplied.classList.add("px-4");
      if (currentDisplay[4].length == 0) {
        viewDateApplied.appendChild(document.createTextNode("N/A"));
      } else {
        viewDateApplied.appendChild(document.createTextNode(currentDisplay[4]));
      }

      //Followed Up
      var viewFollowedUpTitle = document.createElement("h5");
      viewFollowedUpTitle.classList.add("subtitle");
      viewFollowedUpTitle.classList.add("is-4");
      viewFollowedUpTitle.classList.add("px-4");
      viewFollowedUpTitle.classList.add("mb-1");
      viewFollowedUpTitle.classList.add("has-text-weight-bold");
      viewFollowedUpTitle.appendChild(document.createTextNode("Followed Up"));
      var viewFollowedUp = document.createElement("p");
      viewFollowedUp.classList.add("pText");
      viewFollowedUp.classList.add("mb-3");
      viewFollowedUp.classList.add("px-4");
      viewFollowedUp.appendChild(document.createTextNode(currentDisplay[5]));

      //Notes
      var viewNotesTitle = document.createElement("h5");
      viewNotesTitle.classList.add("subtitle");
      viewNotesTitle.classList.add("is-4");
      viewNotesTitle.classList.add("px-4");
      viewNotesTitle.classList.add("mb-1");
      viewNotesTitle.classList.add("has-text-weight-bold");
      viewNotesTitle.appendChild(document.createTextNode("Notes"));
      var viewNotes = document.createElement("p");
      viewNotes.classList.add("pText");
      viewNotes.classList.add("mb-3");
      viewNotes.classList.add("px-4");
      if (currentDisplay[6].length == 0) {
        viewNotes.appendChild(document.createTextNode("-"));
      } else {
        viewNotes.appendChild(document.createTextNode(currentDisplay[6]));
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
      viewModalContent.appendChild(viewFollowedUpTitle);
      viewModalContent.appendChild(viewFollowedUp);
      viewModalContent.appendChild(viewNotesTitle);
      viewModalContent.appendChild(viewNotes);
      viewModal.classList.add("is-active");
    });
    viewModalBg.addEventListener("click", () => {
      while (viewModalContent.firstChild) {
        viewModalContent.removeChild(viewModalContent.firstChild);
      }
      viewModal.classList.remove("is-active");
      isDuplicate = false;
    });
    var viewLinkText = document.createTextNode("View");
    viewLink.appendChild(viewLinkText);
    //Check if it's been more than two weeks since Applied Date & add warning if so
    if (
      isTwoWeeksAgo(new Date(currentDisplay[4])) &&
      currentDisplay[5] == "No"
    ) {
      var followUpWarning = document.createElement("span");
      followUpWarning.classList.add("icon");
      followUpWarning.classList.add("has-text-danger");
      var followUpIcon = document.createElement("i");
      followUpIcon.classList.add("fas");
      followUpIcon.classList.add("fa-clock");
      followUpIcon.classList.add("tooltip");
      followUpWarning.appendChild(followUpIcon);
      var followUpText = document.createElement("span");
      followUpText.classList.add("tooltiptext");
      followUpText.textContent =
        "It's been more than 2 weeks since you've applied, consider following up!";
      followUpIcon.appendChild(followUpText);
      viewLink.appendChild(followUpWarning);
    }

    var deleteLink = document.createElement("p");
    deleteLink.classList.add("card-footer-item");
    deleteLink.classList.add("application-card");
    deleteLink.addEventListener("click", async () => {
      var id = "" + currentID;
      var obj = {};
      obj[id] = deleteField();
      await updateDoc(doc(db, "users", auth.currentUser.uid), obj);
      location.reload();
    });
    deleteLink.href = "";
    var deleteLinkText = document.createTextNode("Delete");
    deleteLink.appendChild(deleteLinkText);

    cardFooter.appendChild(viewLink);
    cardFooter.appendChild(deleteLink);

    newCard.appendChild(cardContent);
    newCard.appendChild(cardFooter);
    cardList.appendChild(newCard);
  }
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
 * Comparator function to sort the application cards by date.
 *
 * @param {*} a First date to compare.
 * @param {*} b Second date to compare.
 * @returns Comparison result.
 */
function sortByDate(a, b) {
  var aData = a[1];
  var bData = b[1];

  if (aData[4] < bData[4]) {
    return -1;
  }
  if (bData[4] < aData[4]) {
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
  2 - Position Type
  3 - Status
  4 - Date Applied
  5 - Followed Up
  6 - Notes
  */

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
  }
  if (cookie["sort"] == "date") {
    appsToDisplay = appsToDisplay.sort(sortByDate);
  }

  DisplayApplications(appsToDisplay);
}

/**
 * Shows application form for user to submit data.
 */
newAppButton.addEventListener("click", () => {
  if (isEmailVerified) {
    modal.classList.add("is-active");
    isDuplicate = false;
    newAppTitle.textContent = "New Application";
    formSubmitButton.textContent = "Create";
  } else {
    alert("Please verify your email before adding any applications.");
  }
});

/**
 * Clears application form and disables it when user clicks away.
 */
modalBg.addEventListener("click", () => {
  isDuplicate = false;
  modal.classList.remove("is-active");
  applicationForm.reset();
  invalidInput.style.display = "none";
  invalidCompanyName.style.display = "none";
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
  } else if (method == "date") {
    document.cookie = "sort=date";
  }
  location.reload();
}

/**
 * A function that parses through the application form results
 * and creates a database entry with the given information, and adds
 * it to the database
 */
applicationForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  var elements = document.getElementById("applicationform").elements;

  if (elements[0].value.length < 1 || elements[1].value.length < 1) {
    invalidInput.style.display = "block";
  } else if (!/^[A-Za-z0-9]*$/.test(elements[0].value.replace(/\s/g, ""))) {
    invalidCompanyName.style.display = "block";
  } else {
    invalidInput.style.display = "none";
    invalidCompanyName.style.display = "none";

    //Build element array and create application
    const formElements = [];
    for (var i = 0, element; (element = elements[i++]); ) {
      formElements.push(element.value);
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
    if (isDuplicate) {
      obj[applicationID] = deleteField();
      isDuplicate = false;
    }
    await updateDoc(doc(db, "users", auth.currentUser.uid), obj);

    //Reset form once successfully submitted
    modal.classList.remove("is-active");
    applicationForm.reset();
    invalidInput.style.display = "none";
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
    DisplayApplications(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Position Name") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplications(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchTextBar.style.display = "block";
  } else if (value == "Position Type") {
    search_applications(document.getElementById("searchPTypeText").textContent);
    searchPStatus.style.display = "none";
    searchTextBar.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchPType.style.display = "block";
  } else if (value == "Position Status") {
    search_applications(
      document.getElementById("searchPStatusText").textContent
    );
    searchPType.style.display = "none";
    searchTextBar.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchPStatus.style.display = "block";
  } else if (value == "Date Applied <=" || value == "Date Applied >") {
    searchDate.value = "";
    DisplayApplications(appsToDisplay);
    searchBar.type = "date";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchTextBar.style.display = "none";
    searchDate.style.display = "block";
  } else if (value == "Followed Up") {
    search_applications(document.getElementById("searchfUpText").textContent);
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchTextBar.style.display = "none";
    searchDate.style.display = "none";
    searchFUp.style.display = "block";
  } else if (value == "Notes") {
    document.getElementById("appsearchbar").value = "";
    DisplayApplications(appsToDisplay);
    searchBar.type = "text";
    searchPType.style.display = "none";
    searchPStatus.style.display = "none";
    searchFUp.style.display = "none";
    searchDate.style.display = "none";
    searchTextBar.style.display = "block";
  }
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
      DisplayApplications(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[0].substring(0, input.length).toLowerCase().includes(input)) {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    }
  } else if (spanText.textContent == "Position Name") {
    let input = document.getElementById("appsearchbar").value.toLowerCase();
    if (input == "") {
      DisplayApplications(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[1].substring(0, input.length).toLowerCase().includes(input)) {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    }
  } else if (spanText.textContent == "Position Type") {
    if (selectValue == "Internship/Co-Op") {
      document.getElementById("searchPTypeText").textContent =
        "Internship/Co-Op";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[2] == "Internship/Co-Op") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    } else if (selectValue == "Part-Time") {
      document.getElementById("searchPTypeText").textContent = "Part-Time";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[2] == "Part-Time") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    } else if (selectValue == "Full-Time") {
      document.getElementById("searchPTypeText").textContent = "Full-Time";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[2] == "Full-Time") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    }
  } else if (spanText.textContent == "Position Status") {
    if (selectValue == "Applied") {
      document.getElementById("searchPStatusText").textContent = "Applied";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[3] == "Applied") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    } else if (selectValue == "Interviewed") {
      document.getElementById("searchPStatusText").textContent = "Interviewed";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[3] == "Interviewed") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    } else if (selectValue == "Rejected") {
      document.getElementById("searchPStatusText").textContent = "Rejected";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[3] == "Rejected") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    } else if ((selectValue = "Offered")) {
      document.getElementById("searchPStatusText").textContent = "Offered";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[3] == "Offered") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    }
  } else if (spanText.textContent == "Date Applied <=") {
    let input = document.getElementById("appsearchdatebar").value;
    let newApplications = [];
    for (var i = 0, element; (element = appsToDisplay[i++]); ) {
      let temp = element[1];
      if (new Date(temp[4]) <= new Date(input)) {
        newApplications.push(element);
      }
    }
    DisplayApplications(newApplications);
  } else if (spanText.textContent == "Date Applied >") {
    let input = document.getElementById("appsearchdatebar").value;
    let newApplications = [];
    for (var i = 0, element; (element = appsToDisplay[i++]); ) {
      let temp = element[1];
      if (new Date(temp[4]) > new Date(input)) {
        newApplications.push(element);
      }
    }
    DisplayApplications(newApplications);
  } else if (spanText.textContent == "Followed Up") {
    if (selectValue == "Yes") {
      document.getElementById("searchfUpText").textContent = "Yes";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[5] == "Yes") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    } else if (selectValue == "No") {
      document.getElementById("searchfUpText").textContent = "No";
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[5] == "No") {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
    }
  } else if (spanText.textContent == "Notes") {
    let input = document.getElementById("appsearchbar").value.toLowerCase();
    if (input == "") {
      DisplayApplications(appsToDisplay);
    } else {
      let newApplications = [];
      for (var i = 0, element; (element = appsToDisplay[i++]); ) {
        let temp = element[1];
        if (temp[6].substring(0, input.length).toLowerCase().includes(input)) {
          newApplications.push(element);
        }
      }
      DisplayApplications(newApplications);
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

export { editCard, logout, selectSearch, search_applications, sortCards };
