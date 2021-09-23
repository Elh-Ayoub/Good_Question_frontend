import React, { useState } from 'react';
import ArrowUp from '../images/arrow-up.png'
import ArrowDown from '../images/arrow-down.png'

export function sort(posts, field, setSortBy, order){
    function restyle(activeBtnId, noneActive1, noneActive2, order){
        document.getElementById(activeBtnId).style.background = "#3e4b63";
        document.getElementById(activeBtnId).style.color = "white";
        document.getElementById(activeBtnId).style.border = "3px solid #819ccc";
        document.getElementById(activeBtnId).style.border = "3px solid #819ccc";
        if(order == 'desc')document.getElementById(activeBtnId).childNodes[1].src = ArrowUp
        if(order == 'asc')document.getElementById(activeBtnId).childNodes[1].src = ArrowDown
        document.getElementById(activeBtnId).childNodes[1].style.width = "20px";
        document.getElementById(activeBtnId).childNodes[1].style.height = "20px";
        //
        document.getElementById(noneActive1).style.background = "rgba(255, 255, 255, 0.3)";
        document.getElementById(noneActive1).style.color = "black";
        document.getElementById(noneActive1).style.border = "2px solid #3e4b63";
        document.getElementById(noneActive1).childNodes[1].style.width = "0";
        document.getElementById(noneActive1).childNodes[1].style.height = "0";
        //
        document.getElementById(noneActive2).style.background = "rgba(255, 255, 255, 0.3)";
        document.getElementById(noneActive2).style.color = "black";
        document.getElementById(noneActive2).style.border = "2px solid #3e4b63";
        document.getElementById(noneActive2).childNodes[1].style.width = "0";
        document.getElementById(noneActive2).childNodes[1].style.height = "0";
    }
    if(field == "likes"){
        if(order == "desc"){
            setSortBy("asc")
            posts.sort(function(a, b) { 
                var keyA = a.rating, keyB = b.rating;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
        }
        else if(order == "asc"){
            setSortBy("desc")
            posts.sort(function(a, b) {
                var keyA = a.rating, keyB = b.rating;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        }
        restyle('bylikes', 'bydate', 'bytitle', order)
    }else if(field == "date"){
        if(order == "desc"){
            setSortBy("asc")
            posts.sort(function(a, b) {
                var keyA = a.created_at, keyB = b.created_at;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
        }
        else if(order == "asc"){
            setSortBy("desc")
            posts.sort(function(a, b) {
                var keyA = a.created_at, keyB = b.created_at;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        }         
        restyle('bydate', 'bylikes', 'bytitle', order)

    }else if(field == "title"){
        if(order == "desc"){
            setSortBy("asc")
            posts.sort(function(a, b) {
                var keyA = a.title, keyB = b.title;
                if (keyA < keyB) return -1;
                if (keyA > keyB) return 1;
                return 0;
            });
        }
        else if(order == "asc"){
            setSortBy("desc")
            posts.sort(function(a, b) {
                var keyA = a.title, keyB = b.title;
                if (keyA < keyB) return 1;
                if (keyA > keyB) return -1;
                return 0;
            });
        } 
        restyle('bytitle', 'bylikes', 'bydate', order)
    }
}
