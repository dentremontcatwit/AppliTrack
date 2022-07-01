import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signOut,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
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
loginLink.style.display = "none";
signupLink.style.display = "none";
logoutLink.style.display = "none";
applicationLink.style.display = "none";
applicationsButton.style.display = "none";
signUpButton.style.display = "none";

onAuthStateChanged(auth, (user) => {
  if (user == null) {
    loginLink.style.display = "flex";
    signupLink.style.display = "flex";
    logoutLink.style.display = "none";
    applicationLink.style.display = "none";
    signUpButton.style.display = "inline";
    applicationsButton.style.display = "none";
  } else {
    loginLink.style.display = "none";
    signupLink.style.display = "none";
    logoutLink.style.display = "flex";
    applicationLink.style.display = "flex";
    signUpButton.style.display = "none";
    applicationsButton.style.display = "inline";
  }
});

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
  if (password == repassword) {
    invalidPassword.style.display = "none";
    createUserWithEmailAndPassword(auth, email, password)
      .then((cred) => {
        sendEmailVerification(auth.currentUser).then(() => {
          accountCreate.textContent =
            "Account has been created. Please check email for verification.";
          accountCreate.style.display = "block";
        });
        setDoc(doc(db, "users", cred.user.uid), {});
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
  sendPasswordResetEmail(auth, email).then(() => {
    forgPassMessage.style.display = "block";
  });
});

export { openLogIn, openSignUp, openForgPass, logout };
