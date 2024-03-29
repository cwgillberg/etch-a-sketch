const container = document.querySelector(".container");
const pen = document.querySelector(".pen-controls");
const canvas = document.querySelector(".canvas");

var brush = "black";
var toggle = "";

//loads the default grid when page loads
window.addEventListener("load", () => {
    loadGrid(16, 16);
});

pen.addEventListener('click', (e) => {
    if(e.target.nodeName === "BUTTON") {
        setBrush(e.target.className);
    }
});

canvas.addEventListener('click', (e) => {
    if(e.target.nodeName === "BUTTON") {
        if(e.target.className === "new") {
            reset();
            newCanvas();
        } else if(e.target.className === "reset") {
            reset();
        }
    }
});

function loadGrid(height, width) {
    container.style.gridTemplateRows = `repeat(${height}, 1fr)`;
    container.style.gridTemplateColumns = `repeat(${width}, 1fr)`;

    for(let i = 0; i < (height*width); i++) {
        let item = document.createElement("div");
        item.className = "grid-item";

        item.addEventListener("mousedown", (e) => {
            toggle = "on";            
            toggleBrush(item);
        });

        item.addEventListener("mouseover", (e) => {
            toggleBrush(item);            
        });
        
        item.addEventListener("mouseup", (e) => {
            toggle = "off";            
        });

        container.appendChild(item);
    }
}

function setBrush(color) {
    if(color === "white") {
        brush = "white";
    } else if(color === "black") {
        brush = "black";
    } else if(color === "rainbow") {
        brush = "rainbow";
    }
}

function toggleBrush(target) {
    if(toggle === "on") {
        if(brush !== "rainbow") {
            target.style.background = brush;
        } else {
            //the below HEX color generator is borrowed from: https://stackoverflow.com/a/5365036 
            target.style.background = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
        }
    } else {
        return;
    }
}

function reset() {
    let items = document.querySelectorAll(".grid-item").forEach(function(item) {
        item.style.background = "white";
    });
}

function newCanvas() {
    let newSize = prompt("Enter size of new canvas (max 100): ");
    if(newSize <= 100) {
        loadGrid(newSize, newSize);
    } else {
        alert("Sorry! You entered a value over 100, please try again");
    }

}




