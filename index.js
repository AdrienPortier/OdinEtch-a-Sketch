const contain = document.querySelector(".container");
let isMouseDown = false; // Track if the mouse button is pressed

// Add event listeners to track mouse button state
document.addEventListener("mousedown", () => {
    isMouseDown = true;
});
document.addEventListener("mouseup", () => {
    isMouseDown = false;
});
function fillGrid(ncase){
    while(!Number.isInteger(ncase) || ncase > 100 || ncase < 1){
        if(ncase > 100){
            ncase = +prompt("Too big ! Enter an integer between 1 and 100.")
        }
        else if(ncase < 1){
            ncase = +prompt("Too small ! Enter an integer between 1 and 100.")
        }
        else if (!Number.isInteger(ncase)){
            ncase = +prompt("Not an integer ! Enter an integer between 1 and 100.")
        }
        else{
            break;
        }
    }
    while(contain.firstChild){
        contain.removeChild(contain.firstChild);
    }
    for(let k = 1; k <= ncase; k++){
        const row = document.createElement("div");
        row.classList.add("row");
        for(let j = 1; j <= ncase; j++){
            const jcol = document.createElement("div");
            jcol.style.boxSizing = "border-box"
            jcol.classList.add("case");
            jcol.style.backgroundColor = "grey";
            jcol.style.opacity = 0;
            jcol.addEventListener("mouseenter", () => {
                if (isMouseDown) { // Only change color if the mouse button is down
                    jcol.style.backgroundColor = "#" + ((1 << 24) * Math.random() | 0).toString(16).padStart(6, "0");
                    let currentOpacity = parseFloat(jcol.style.opacity) || 0;
                    currentOpacity = Math.min(currentOpacity + 0.1, 1);
                    jcol.style.opacity = currentOpacity;
                }
            });
            row.appendChild(jcol);
    
        }
        row.style.display = "flex";
        row.style.flexDirection = "row";
    
        contain.appendChild(row);
    }
}
fillGrid(16);
function ResetAll(){
    const buttons = document.querySelectorAll(".case");
    buttons.forEach(x => x.style.backgroundColor = "white");
    console.log("test")
}
const reset = document.querySelector("#reset");
reset.addEventListener("click", ResetAll);
const change = document.querySelector("#changesize");
change.addEventListener("click", () => fillGrid(+prompt("Enter the number of case per row (n x n grid), 1 <= n <= 100")))
