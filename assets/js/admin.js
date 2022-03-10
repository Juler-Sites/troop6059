import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, child, get, set, remove } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-auth.js";

import {firebaseConfig} from './config.js';

const app = initializeApp(firebaseConfig)
const db = getDatabase(app)
const dbRef = ref(getDatabase());
let currentYear = new Date().getFullYear()
let currentMonth = new Date().getMonth() + 1
let currentDay = new Date().getDate()
let currentHour = new Date().getHours()
let currentMinute = new Date().getMinutes()

let currentDate = "" + currentMonth + "/" + currentDay + "/" + currentYear;
var numEagles = 0;
var numArticles = 0;
var numAlerts = 0;

// Reference messages collection
var eaglesRef = ref(getDatabase(), 'troop6059/eagles/');

get(child(dbRef, `troop6059/eagles/`)).then((snapshot) => {
    if (snapshot.exists()) {
        var items = snapshot.val();
        document.getElementById("numEagles").innerText = items.length;
        let eagleTableElement = document.getElementById("eaglesTable");
        for(var i = 0; i < items.length; i++) {
            // const temp =
            const name = (items[i].name).replace(' ','&').split('&')

            var eagleRow = document.createElement("tr");
            eagleRow.setAttribute('id', i);
            eagleTableElement.appendChild(eagleRow);

            var eagleId = document.createElement("td");
            eagleId.innerText = i;
            eagleRow.appendChild(eagleId);

            var eagleFName = document.createElement("td");
            eagleFName.innerText = name[0];
            eagleRow.appendChild(eagleFName);

            var eagleLame = document.createElement("td");
            eagleLame.innerText = name[1];
            eagleRow.appendChild(eagleLame);

            var eagleYear = document.createElement("td");
            eagleYear.innerText = items[i].year;
            eagleRow.appendChild(eagleYear);
        }

        numEagles = items.length;
    } else {
        console.log("No data available");
        document.getElementById("numArticles").innerText = numEagles;
    }
}).catch((error) => {
    console.error(error);
});

$('#addEagleForm').submit(function(e) {
    e.preventDefault();


    const db = getDatabase();
    set(ref(db, 'troop6059/eagles/' + numEagles), {
        name: document.getElementById("inputName").value,
        year: document.getElementById("inputYear").value
    });

    $('.success-message').show();

    $('#addEagleForm')[0].reset();

    numEagles += 1;
});

$('#removeEagleForm').submit(function(e) {
    e.preventDefault();

    const id = document.getElementById("inputId").value;
    var auth_code = 0;
    auth_code = "T59+" + currentYear;
    var removeRef = ref(getDatabase(), 'troop6059/eagles/', id);

    if (auth_code === document.getElementById("authCode").value) {
        const db = getDatabase();
        set(ref(db, 'eagles/' + id), {
            name: document.getElementById("inputName2").value,
            year: document.getElementById("inputYear2").value
        });
    }
});

$('#loginForm').submit(function(e) {
    e.preventDefault();

    login()
});

function viewLogin() {
    document.getElementById("login-view").style.display = "block";
    document.getElementById("dashboard").style.display = "none";
    document.getElementById("eagles").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("accountBtn").style.display = "none";
    document.getElementById("navTitle").innerText = "";
    document.getElementById("dashboardNav").classList.remove("active");
    document.getElementById("dashboardNav").style.display = "none";
    document.getElementById("eaglesNav").classList.remove("active");
    document.getElementById("eaglesNav").style.display = "none";
    document.getElementById("newsNav").classList.remove("active");
    document.getElementById("newsNav").style.display = "none";
}

function loggedIn() {
    document.getElementById("login-view").style.display = "none";
    document.getElementById("dashboard").style.display = "block";
    document.getElementById("eagles").style.display = "none";
    document.getElementById("news").style.display = "none";
    document.getElementById("accountBtn").style.display = "block";
    document.getElementById("navTitle").innerText = "Dashboard";
    document.getElementById("dashboardNav").classList.add("active");
    document.getElementById("dashboardNav").style.display = "block";
    document.getElementById("eaglesNav").classList.remove("active");
    document.getElementById("eaglesNav").style.display = "block";
    document.getElementById("newsNav").classList.remove("active");
    document.getElementById("newsNav").style.display = "block";
    document.getElementById("navTitle").style.display = "block";
}

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {

        const uid = user.uid;
        loggedIn()
    } else {
        viewLogin()
    }
});

function login() {

    var userEmail = document.getElementById("email_field").value;
    var userPass = document.getElementById("password_field").value;

    signInWithEmailAndPassword(auth, userEmail, userPass)
        .then((userCredential) => {
            // Signed in
            const user = userCredential.user;
            // ...
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
        });
}

function logout() {
    const auth = getAuth();
    signOut(auth).then(() => {
        viewLogin()
    }).catch((error) => {
        // An error happened.
    });
}

export {logout};