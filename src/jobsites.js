renderTheme();
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

var userSettings = {};

const verifyEmail = document.querySelector("#verifyemail");
var isEmailVerified;
verifyEmail.style.display = "none";
var globalApplications;
onAuthStateChanged(auth, async (user) => {
    if (user) {
      const userRef = await getDoc(doc(db, "users", user.uid));
      var applications = userRef.data();
      userSettings = applications["userSettings"];
      delete applications["userSettings"];
      CreateJobSiteTable(); //Create List of Job Sites
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
      var cardContents = document.querySelectorAll(".card-content");
      for (var i = 0; i < cardContents.length; i++) {
        cardContents[i].style.backgroundColor = "#334E68";
      }
      var cardFooters = document.querySelectorAll(".card-footer-item");
      for (var i = 0; i < cardFooters.length; i++) {
        cardFooters[i].style.backgroundColor = "#102A43";
        cardFooters[i];
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
    }
  }

const siteTable = document.querySelector("#sitestable");

function CreateJobSiteTable() {
    var tableBody = document.createElement("tbody");
    var tRow = document.createElement("tr");

    var linkedinFigure = document.createElement("figure");
    linkedinFigure.setAttribute("class", "image is-64x64");
    var linkedinLogo = document.createElement("img");
    linkedinLogo.setAttribute("src", "images/linkedin.png");
    linkedinFigure.appendChild(linkedinLogo);
    var linkedinName = document.createElement("td");
    linkedinName.textContent = "LinkedIn";
    var linkedinDesc = document.createElement("td");
    linkedinDesc.textContent = "This is a good job site to look at.";

    tRow.appendChild(linkedinFigure);
    tRow.appendChild(linkedinName);
    tRow.appendChild(linkedinDesc);

    tableBody.appendChild(tRow);
    siteTable.appendChild(tableBody);

    renderTheme();
}



function logout() {
    signOut(auth);
    window.location.href = "index.html";
  }
  
  function setNightMode() {
    document.cookie = "theme=night";
    renderTheme();
  }
  
  function setLightMode() {
    document.cookie = "theme=light";
    location.reload();
  }

export {
    logout,
    setLightMode,
    setNightMode,
  };