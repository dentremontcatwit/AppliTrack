document.getElementById('signuplink').addEventListener("click", () => {
    document.querySelector('#signUpModal').classList.add('is-active');
});

document.getElementById('signUpModalBg').addEventListener("click", () => {
    signUpModal.classList.remove('is-active');
    document.querySelector('#signupform').reset();
});

document.getElementById('loginlink').addEventListener("click", () =>{
    document.getElementById('logInModal').classList.add('is-active');
});

document.getElementById('logInModalBg').addEventListener("click", () =>{
    document.getElementById('logInModal').classList.remove('is-active');
    document.querySelector('#loginform').reset();
});