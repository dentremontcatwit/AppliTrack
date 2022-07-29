renderTheme();
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { getDoc, deleteDoc, doc, getFirestore } from "firebase/firestore";

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

function setNightMode() {
  document.cookie = "theme=night";
  renderTheme();
}

function setLightMode() {
  document.cookie = "theme=light";
  location.reload();
}

function renderTheme() {
  let cookie = {};
  document.cookie.split(";").forEach(function (el) {
    let [key, value] = el.split("=");
    cookie[key.trim()] = value;
  });
  if (cookie["theme"] == "night") {
    document.getElementById("nightbutton").style.display = "none";
    document.getElementById("lightbutton").style.display = "flex";
    document
      .getElementById("resetNameModalColor")
      .classList.remove("has-background-white");
    document
      .getElementById("deleteAccountModalColor")
      .classList.remove("has-background-white");
    document.getElementById("html").style.backgroundColor = "#243B53";
    document.querySelector("nav").style.backgroundColor = "#102A43";
    document.querySelector(".box").style.backgroundColor = "#102A43";
    var titleTexts = document.querySelectorAll(".title");
    for (var i = 0; i < titleTexts.length; i++) {
      titleTexts[i].style.color = "#BCCCDC";
    }
    var subtitleTexts = document.querySelectorAll(".subtitle");
    for (var i = 0; i < subtitleTexts.length; i++) {
      subtitleTexts[i].style.color = "#BCCCDC";
    }
    var spanTexts = document.querySelectorAll("span");
    for (var i = 0; i < spanTexts.length; i++) {
      spanTexts[i].style.color = "#BCCCDC";
    }
    var modalBgs = document.querySelectorAll(".modal-content");
    for (var i = 0; i < modalBgs.length; i++) {
      modalBgs[i].style.backgroundColor = "#243B53";
    }
  } else {
    document.getElementById("nightbutton").style.display = "flex";
    document.getElementById("lightbutton").style.display = "none";
    document
      .getElementById("resetNameModalColor")
      .classList.add("has-background-white");
    document
      .getElementById("deleteAccountModalColor")
      .classList.add("has-background-white");
  }
}

//Reset Name
const resetNameForm = document.querySelector("#nameresetform");
const resetNameModal = document.querySelector("#resetnamemodal");
const resetNameModalBg = document.querySelector("#resetnamemodalbg");
const nameResetMsg = document.querySelector("#nameresetmessage");

//Reset Password
const changePassText = document.querySelector("#changepasstext");

//Delete Account
const deleteAccountModal = document.querySelector("#deleteaccountmodal");
const deleteAccountModalBg = document.querySelector("#deleteaccountmodalbg");
const deleteAccountMsg = document.querySelector("#deleteaccountmodalmsg");

const nameText = document.querySelector("#nameText");
const emailText = document.querySelector("#emailText");

//Display profile information or kick user to index.html if not signed in
onAuthStateChanged(auth, (user) => {
  if (user) {
    nameText.textContent = "Hello, " + user.displayName + "!";
    emailText.textContent = user.email;
  } else {
    window.location.href = "index.html";
  }
});

function logout() {
  signOut(auth);
  location.reload();
}

function changeName() {
  resetNameModal.classList.add("is-active");
}

resetNameModalBg.addEventListener("click", () => {
  resetNameModal.classList.remove("is-active");
  nameResetMsg.style.display = "none";
  resetNameForm.reset();
});

resetNameForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const name = resetNameForm.name.value;
  updateProfile(auth.currentUser, {
    displayName: name,
  }).then(() => {
    resetNameForm.reset();
    nameResetMsg.style.display = "block";
  });
});

function changePass() {
  sendPasswordResetEmail(auth, auth.currentUser.email).then(() => {
    changePassText.textContent = "Password reset email has been sent.";
  });
}

function deleteAccount() {
  deleteAccountModal.classList.add("is-active");
}

deleteAccountModalBg.addEventListener("click", () => {
  deleteAccountModal.classList.remove("is-active");
  deleteAccountMsg.style.display = "none";
});

function deleteAUser() {
  deleteDoc(doc(db, "users", auth.currentUser.uid)).then(() => {});
  deleteUser(auth.currentUser).then(() => {});
}

const delAccountModalDelete = document.querySelector("#delAccountCloseButton");
delAccountModalDelete.addEventListener("click", () => {
  var modalBackground =
    delAccountModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

const changeNameModalDelete = document.querySelector("#changeNameCloseButton");
changeNameModalDelete.addEventListener("click", () => {
  var modalBackground =
    changeNameModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

export {
  logout,
  changeName,
  changePass,
  deleteAccount,
  deleteAUser,
  setLightMode,
  setNightMode,
};
