// MIP = Make It Pretty

// -> Setting up variables
let font1;
let userInput;
let button;
let userLines 
let response;
let poem = [];
let P0;

// -> Preloading the font 
function preload(){
  font1 = loadFont('Foglihtenno07calt-WpzEA.otf')
  P0 = loadImage('P0.png');
}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight)
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  // -> Add font 
  textFont(font1);
  textSize(25)
  // -> Input bar and button 
  userInput = createInput(); 
  userInput.position(80, 10); // - input bar position
  userInput.style('background','linear-gradient(to bottom, #F1DDB0, #D1A543') // - MIP
  userInput.style('border', '1px solid #927128'); // - MIP
  userInput.style('color', '#533D0D'); // - MIP
 

  button = createButton('Add to the poem'); // - button name
  button.position(userInput.x + userInput.width, userInput.y); // - button under bar
  button.style('background','linear-gradient(to bottom, #F1DDB0, #D1A543') // - MIP
  button.style('border', '1px solid #927128'); // - MIP
  button.style('color', '#533D0D'); // - MIP
  button.mousePressed(newLines); // - Run newLines when button is clicked
  userInput.changed(newLines); // -Run newLines with other user input 
  userInput.input(() => { 
    if (keyCode === 13) { // - If "enter" key is pressed
    newLines(); // - Run function 
  }
});
}


function newLines(){ // - Setting up button.mousePressed
  userLines = userInput.value(); // - Store user's input
  userInput.value(''); // - Reset bar 
  poem.push(userLines); // - Print original line

  let words = RiTa.tokenize(userLines); // - User input as an array
  let last = words.length - 1 // - Select last word from array
  let rhymes = RiTa.rhymesSync(words[last]) // - Array of rhymes for last word
  
  if (rhymes.length === 0){ // - If there are no rhymes
    poem.push(userLines) // - Push user input to poem
  } else { // - If there are rhymes
    let changedWord = random(rhymes); // - Select random rhyme to substitute original word
    words[last] = changedWord; // - Replace last word with random rhyme
    userLines = RiTa.untokenize(words); // - Return user input to string
    poem.push(userLines) // - Push input into poem array
  }

  let modifiedInput = words.join(' '); // - Join the words to form a string
  // Make the third line end with the same word as the second line
  let lastWordSecondLine = modifiedInput.split(' ').pop(); // - Get the last word of the second line
  response = '';
  for (x = 0; x < words.length -1; x++){ // - Move through words array 
    if (RiTa.isVerb(words[x])){ // - If there are verbs
      response += RiTa.randomWord({pos: "vbd"}) // - Add random verb
    } else { // - If no verbs are found
      response += words[x]; // - Keep word in response
    }
    response += ' '; // - Add space between words
  }
  response += lastWordSecondLine; // - Add the last word from the second line to the third line
  poem.push(response); // - Push machine text (response) to poem
}

function writePoem(){ // setting up poem drawing
  for (x = 0; x < poem.length; x++){ // - Go through array
    text(poem[x], 50, 90 + x * 20) // - Poem array, 20 pixels under last line
  }
}

function draw() {
  background('#F2E6CA')
  image(P0, 20, 40, P0.width - 20, P0.height -20); // Image on background
  writePoem(); // - Draw poem on background

  // Draw instructions
  fill('#533D0D'); // Text color
  textSize(18); // Text size
  textAlign(LEFT, TOP); // Text alignment
  text("Welcome to our Poem Generator!", 520, 20); // Welcome message
  text("How to Use:", 520, 60); // How to use section
  text("1. Input: Type your line of poetry into the text bar located at the top.", 520, 90, 400); // Input instruction
  text("2. Generate: Click the 'Add to the poem' button or press Enter after typing your small line.", 520, 140, 400); // Generate instruction
  text("4. View: See your poem take shape below the input area.", 520, 285, 400); // View instruction
  textSize(14); // Text size
  text("2.1. The code will return your original sentence, one sentence with a different last word that rhymes with the first, and a third sentence with the verbs randomised.", 540, 210, 360); // View instruction

}