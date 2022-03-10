import { initializeApp } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-app.js";
import { getDatabase, ref, child, get } from "https://www.gstatic.com/firebasejs/9.4.0/firebase-database.js";

import {firebaseConfig} from './config.js';
initializeApp(firebaseConfig);

const dbRef = ref(getDatabase());

get(child(dbRef, `troop6059/eagles/`)).then((snapshot) => {
    if (snapshot.exists()) {
        let msg = document.getElementsByClassName("section-title")[0];
        var news = document.getElementsByClassName("timeline")[0];
        var items = snapshot.val();
        var tempYear = 0;

        if (items.length >= 1) {
            let text = document.createElement("p");
            text.innerHTML = "Since " + items[0].year + ", Troop 6059 has encouraged leadership and character by working with our scouts to achieve scouting's highest honor. The Eagle Scout Rank.";
            msg.appendChild(text);
        }

        for(var i = items.length - 1; i >= 0; i--) {
            if (tempYear !== items[i].year) {
                tempYear = items[i].year;

                var timeline_row = document.createElement("div");
                timeline_row.classList.add("timeline-row");
                news.appendChild(timeline_row);

                var timeline_content = document.createElement("div");
                timeline_content.classList.add("timeline-content");
                timeline_row.appendChild(timeline_content);

                var h4 = document.createElement("h4");
                h4.innerHTML = items[i].year;
                timeline_content.appendChild(h4);
            }

            var p = document.createElement("p");
            p.innerHTML = items[i].name;
            timeline_content.appendChild(p);

        }
    } else {
        console.log("No data available");
    }
}).catch((error) => {
    console.error(error);
});
