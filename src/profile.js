import { initializeApp } from "firebase/app";
import {
  getAuth,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  deleteUser,
} from "firebase/auth";
import { deleteDoc, doc, getFirestore } from "firebase/firestore";

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

export { logout, changeName, changePass, deleteAccount, deleteAUser };
