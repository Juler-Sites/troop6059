import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

import {firebaseConfig} from './config.js';
initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

let eagles = false;

get(child(dbRef, `troop6059/eagles/`)).then((snapshot) => {
    if (snapshot.exists()) {
        var items = snapshot.val();

        if (items.length >= 1) {
            eagles = true;
        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});

get(child(dbRef, `troop6059/nav/`)).then((snapshot) => {
    if (snapshot.exists()) {
        let nav = document.getElementById("links");
        let items = snapshot.val();
        for (let i = 0; i < items.length; i++) {
            if (items[i].length === 1) {
                if (items[i][0].properties === "show" || (items[i][0].text === "Eagles" && eagles)) {
                    let listItem = document.createElement("li");
                    nav.appendChild(listItem);

                    let listItemLink = document.createElement("a");
                    listItemLink.classList.add("nav-link");
                    listItemLink.classList.add("scrollto");
                    if (items[i][0].link === location.pathname ||
                        items[i][0].link + 'index.html' === location.pathname ||
                        items[i][0].link === (location.pathname).replace('/troop6059', '') ||
                        items[i][0].link + 'index.html' === (location.pathname).replace('/troop6059', '')
                    ) {
                        listItemLink.classList.add("active");
                    }
                    listItemLink.href = items[i][0].link;
                    listItemLink.innerHTML = items[i][0].text;
                    listItem.appendChild(listItemLink);
                }
            }
            else {
                let header = false;
                for (let j = 0; j < items[i].length; j++) {
                    if (items[i][j].text === "External Sites") {
                        if (j === items[i].length - 1) {
                            let listItem = document.createElement("li");
                            nav.appendChild(listItem);

                            let listItemLink = document.createElement("a");
                            listItemLink.classList.add("nav-link");
                            listItemLink.classList.add("scrollto");
                            listItemLink.innerHTML = items[i][j].text;
                            listItem.appendChild(listItemLink);
                        }
                        else {
                            let listItem = document.createElement("li");
                            listItem.classList.add("dropdown");
                            nav.appendChild(listItem);

                            let listItemLink = document.createElement("a");
                            listItemLink.classList.add("nav-link");
                            listItemLink.classList.add("scrollto");
                            listItem.appendChild(listItemLink);

                            let listHeader = document.createElement("span");
                            listHeader.innerHTML = items[i][j].text;
                            listItemLink.appendChild(listHeader);

                            let listIcon = document.createElement("i");
                            listIcon.classList.add("bi");
                            listIcon.classList.add("bi-chevron-down");
                            listItemLink.appendChild(listIcon);

                            let dropdown = document.createElement("ul");
                            dropdown.setAttribute('id', 'dropdown' + i);
                            listItem.appendChild(dropdown);

                            header = true;
                        }
                    }
                    else if (items[i][j].properties === "show" || (items[i][0].text === "Eagles" && eagles)) {
                        if (header === false) {
                            if (j === items[i].length - 1) {
                                let listItem = document.createElement("li");
                                nav.appendChild(listItem);

                                let listItemLink = document.createElement("a");
                                listItemLink.classList.add("nav-link");
                                listItemLink.classList.add("scrollto");
                                if (items[i][0].link === location.pathname ||
                                    items[i][0].link + 'index.html' === location.pathname ||
                                    items[i][0].link === (location.pathname).replace('/troop6059', '') ||
                                    items[i][0].link + 'index.html' === (location.pathname).replace('/troop6059', '')
                                ) {
                                    listItemLink.classList.add("active");
                                }
                                listItemLink.href = items[i][j].link;
                                listItemLink.innerHTML = items[i][j].text;
                                listItem.appendChild(listItemLink);
                            }
                            else {
                                let listItem = document.createElement("li");
                                listItem.classList.add("dropdown");
                                nav.appendChild(listItem);

                                let listItemLink = document.createElement("a");
                                listItemLink.classList.add("nav-link");
                                listItemLink.classList.add("scrollto");
                                if (items[i][j].link === location.pathname ||
                                    items[i][j].link + 'index.html' === location.pathname ||
                                    items[i][j].link === (location.pathname).replace('/troop6059', '') ||
                                    items[i][j].link + 'index.html' === (location.pathname).replace('/troop6059', '')
                                ) {
                                    listItemLink.classList.add("active");
                                }
                                listItemLink.href = items[i][j].link;
                                listItem.appendChild(listItemLink);

                                let listHeader = document.createElement("span");
                                listHeader.innerHTML = items[i][j].text;
                                listItemLink.appendChild(listHeader);

                                let listIcon = document.createElement("i");
                                listIcon.classList.add("bi");
                                listIcon.classList.add("bi-chevron-down");
                                listItemLink.appendChild(listIcon);

                                let dropdown = document.createElement("ul");
                                dropdown.setAttribute('id', 'dropdown' + i);
                                listItem.appendChild(dropdown);

                                header = true;
                            }
                        }
                        else {
                            let dropdown = document.getElementById("dropdown" + i);

                            let listItem = document.createElement("li");
                            dropdown.appendChild(listItem);

                            let listItemLink = document.createElement("a");
                            listItemLink.href = items[i][j].link;
                            listItemLink.innerHTML = items[i][j].text;
                            listItem.appendChild(listItemLink);
                        }
                    }
                }
            }
        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
