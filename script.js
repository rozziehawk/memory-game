const gameContainer = document.getElementById("game");

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];

// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {
  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.setAttribute("data-color",color);
    newDiv.setAttribute("data-matched","0")

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

// TODO: Implement this function!
function handleCardClick(event) {
  //console.log(event);
  //let static  clickCount = 0; 
  //let staticVar=0;
  
  const selectedElement = event.target;
  const parent = selectedElement.parentElement;
  let numClicks = parent.getAttribute("data-clicks");

  let isSelectMatched = selectedElement.getAttribute("is-matched");
  if (isSelectMatched)
    return;
       //if (!isMatched)
  if (!numClicks)
  {
    numClicks = 0;
  } 
  else if (numClicks >=2)
  {
    // reset the game
    //createDivsForColors();
    
    parent.setAttribute("data-clicks", 0);
    var children = parent.children;
    for (var i = 0; i < children.length; i++) 
      {
       var kid = children[i];
       let isMatched = kid.getAttribute("is-matched");
       if (! isMatched)
          kid.style.backgroundColor = "white";
     
       //kid.getAttribute("is-matched");
       //if (!isMatched)
       //   kid.style.backgroundColor = "white"; 
  
    }
  
    return;
  }

  console.log(numClicks);
  let hiddenColor = selectedElement.getAttribute("data-color");
  console.log(hiddenColor);
  //console.log(selectedElement.style);
  //selectedElement.style.color = newColor;
  selectedElement.style.backgroundColor = hiddenColor;
  // you can use event.target to see which element was clicked
  //console.log("you just clicked", event.target);
  console.log("you just clicked", selectedElement);
  parent.setAttribute("data-clicks", ++numClicks);
  if (numClicks === 1)
  {
    //if (selectedElement.getAttribute("is-matched")) // ignore click. return
    //  return;
    parent.setAttribute("color-to-match", hiddenColor);
    //parent.setAttribute("first-tile",event.target);
  }
  else if (numClicks === 2)
  {
    matchColor = parent.getAttribute("color-to-match");
    if (hiddenColor === matchColor)
    {
      console.log("MATCH!");
      var children = parent.children;
      for (var i = 0; i < children.length; i++) 
      {
        var kid = children[i];
        if (kid.style.backgroundColor == matchColor)
        {
          kid.setAttribute("is-matched", 1);
        }
    
       //kid.getAttribute("is-matched");
       //if (!isMatched)
       //   kid.style.backgroundColor = "white";
  
    
      }
      parent.setAttribute("data-clicks", 0);
    }
    numClicks = 0;
    //parent.setAttribute("data-clicks", 0);
  }
  //clickCount ++;
  //console.log(event.target.get))
  //console.log(++staticVar);
}

// when the DOM loads
createDivsForColors(shuffledColors);
