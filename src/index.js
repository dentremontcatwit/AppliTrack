renderTheme();
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";

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

const signUpButton = document.querySelector("#signupbutton");
const applicationsButton = document.querySelector("#applicationsbutton");

const logInModal = document.querySelector("#logInModal");
const logInModalBg = document.querySelector("#logInModalBg");

const forgPassModal = document.querySelector("#forgPassModal");
const forgPassModalBg = document.querySelector("#forgPassModalBg");
const forgPassForm = document.querySelector("#forgPassForm");

const signUpModal = document.querySelector("#signUpModal");
const signUpModalBg = document.querySelector("#signUpModalBg");
const signUpForm = document.querySelector("#signupform");
const invalidPassword = document.querySelector("#invalidpassword");
invalidPassword.style.display = "none";
const invalidLogin = document.querySelector("#invalidlogin");
invalidLogin.style.display = "none";
const accountCreate = document.querySelector("#accountcreate");
accountCreate.style.display = "none";

const loginLink = document.querySelector("#loginlink");
const signupLink = document.querySelector("#signuplink");
const logoutLink = document.querySelector("#logoutlink");
const applicationLink = document.querySelector("#applicationlink");
const profileLink = document.querySelector("#profilelink");
loginLink.style.display = "none";
signupLink.style.display = "none";
logoutLink.style.display = "none";
applicationLink.style.display = "none";
applicationsButton.style.display = "none";
signUpButton.style.display = "none";
profileLink.style.display = "none";

onAuthStateChanged(auth, (user) => {
  if (user == null) {
    loginLink.style.display = "flex";
    signupLink.style.display = "flex";
    logoutLink.style.display = "none";
    applicationLink.style.display = "none";
    signUpButton.style.display = "inline";
    applicationsButton.style.display = "none";
    profileLink.style.display = "none";
  } else {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutLink.style.display = "flex";
    applicationLink.style.display = "flex";
    signUpButton.style.display = "none";
    applicationsButton.style.display = "inline";
    profileLink.style.display = "flex";
  }
});

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
      .getElementById("logInModalColor")
      .classList.remove("has-background-white");
    document
      .getElementById("signUpModalColor")
      .classList.remove("has-background-white");
    document
      .getElementById("forgPassModalColor")
      .classList.remove("has-background-white");
    document.getElementById("html").style.backgroundColor = "#243B53";
    document.getElementById("footer").style.backgroundColor = "#102A43";
    document.getElementById("footer").style.color = "#BCCCDC";
    document.querySelector("nav").style.backgroundColor = "#102A43";
    var cardContents = document.querySelectorAll(".card-content");
    for (var i = 0; i < cardContents.length; i++) {
      cardContents[i].style.backgroundColor = "#334E68";
    }
    var cardFooters = document.querySelectorAll(".card-footer-item");
    for (var i = 0; i < cardFooters.length; i++) {
      cardFooters[i].style.backgroundColor = "#334E68";
    }
    var pTexts = document.querySelectorAll("p");
    for (var i = 0; i < pTexts.length; i++) {
      pTexts[i].style.color = "#BCCCDC";
    }
    var titleTexts = document.querySelectorAll(".title");
    for (var i = 0; i < titleTexts.length; i++) {
      titleTexts[i].style.color = "#BCCCDC";
    }
    var subtitleTexts = document.querySelectorAll(".subtitle");
    for (var i = 0; i < subtitleTexts.length; i++) {
      subtitleTexts[i].style.color = "#BCCCDC";
    }
    var modalBgs = document.querySelectorAll(".modal-content");
    for (var i = 0; i < modalBgs.length; i++) {
      modalBgs[i].style.backgroundColor = "#243B53";
    }
    var labelTexts = document.querySelectorAll("label");
    for (var i = 0; i < labelTexts.length; i++) {
      labelTexts[i].style.color = "#BCCCDC";
    }
  } else {
    document.getElementById("nightbutton").style.display = "flex";
    document.getElementById("lightbutton").style.display = "none";
    document
      .getElementById("logInModalColor")
      .classList.add("has-background-white");
    document
      .getElementById("signUpModalColor")
      .classList.add("has-background-white");
    document
      .getElementById("forgPassModalColor")
      .classList.add("has-background-white");
  }
}

function openLogIn() {
  invalidLogin.style.display = "none";
  logInModal.classList.add("is-active");
}

logInModalBg.addEventListener("click", () => {
  logInModal.classList.remove("is-active");
  logInForm.reset();
});

function openSignUp() {
  invalidPassword.style.display = "none";
  accountCreate.style.display = "none";
  logInModal.classList.remove("is-active");
  logInForm.reset();
  signUpModal.classList.add("is-active");
}

signUpModalBg.addEventListener("click", () => {
  signUpModal.classList.remove("is-active");
  signUpForm.reset();
});

function openForgPass() {
  logInModal.classList.remove("is-active");
  logInForm.reset();
  forgPassModal.classList.add("is-active");
}

forgPassModalBg.addEventListener("click", () => {
  forgPassModal.classList.remove("is-active");
  forgPassForm.reset();
  forgPassMessage.style.display = "none";
});

function logout() {
  signOut(auth);
  location.reload();
}

//Sign user up
const signupForm = document.querySelector("#signupform");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = signupForm.email.value;
  const password = signupForm.password.value;
  const repassword = signupForm.repassword.value;
  const username = signUpForm.name.value;
  if (password == repassword) {
    invalidPassword.style.display = "none";
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        sendEmailVerification(auth.currentUser).then(() => {
          updateProfile(cred.user, {
            displayName: username,
          }).then(() => {
            accountCreate.textContent =
              "Account has been created. Please check email for verification. (Email might show up under spam)";
            accountCreate.style.display = "block";
          });
        });
        var settings = {};
        settings["userSettings"] = ["true", "2 Weeks", "Cards"]; //Default settings
        setDoc(doc(db, "users", cred.user.uid), settings);

        signupForm.reset();
      })
      .catch((err) => {
        accountCreate.style.display = "none";
        invalidPassword.textContent =
          err.message.substring(10, err.message.length - 22) + ".";
        invalidPassword.style.display = "block";
      });
  } else {
    accountCreate.style.display = "none";
    invalidPassword.textContent = "Passwords do not match.";
    invalidPassword.style.display = "block";
  }
});

//Log User In
const logInForm = document.querySelector("#loginform");
logInForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = logInForm.email.value;
  const password = logInForm.password.value;
  signInWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      invalidLogin.style.display = "none";
      logInForm.reset();
      logInModal.classList.remove("is-active");
      location.reload();
    })
    .catch((err) => {
      invalidLogin.textContent = "Invalid credentials.";
      invalidLogin.style.display = "block";
    });
});

//Forgot Password
const forgPassMessage = document.querySelector("#forgPassMessage");
forgPassForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = forgPassForm.email.value;
  sendPasswordResetEmail(auth, email)
    .then(() => {
      forgPassMessage.classList.remove("is-danger");
      forgPassMessage.classList.add("is-success");
      forgPassMessage.textContent = "A password reset email has been sent.";
      forgPassMessage.style.display = "block";
    })
    .catch((err) => {
      forgPassMessage.classList.remove("is-success");
      forgPassMessage.classList.add("is-danger");
      forgPassMessage.textContent = "An account with that email was not found.";
      forgPassMessage.style.display = "block";
    });
});

const logInModalDelete = document.querySelector("#logInCloseButton");
logInModalDelete.addEventListener("click", () => {
  var modalBackground = logInModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

const signUpModalDelete = document.querySelector("#signUpCloseButton");
signUpModalDelete.addEventListener("click", () => {
  var modalBackground = signUpModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

const forgPassModalDelete = document.querySelector("#forgPassCloseButton");
forgPassModalDelete.addEventListener("click", () => {
  var modalBackground =
    forgPassModalDelete.parentElement.previousElementSibling;
  modalBackground.click();
});

export {
  openLogIn,
  openSignUp,
  openForgPass,
  logout,
  setLightMode,
  setNightMode,
};
