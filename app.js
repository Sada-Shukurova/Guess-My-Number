'use strict';

// selecting body
const body = document.querySelector( 'body' );

// getting html elements⬇
const checkBtn = document.querySelector( '.check' );
const guess = document.querySelector( '.guess' );
const message = document.querySelector( '.message' );
const score = document.querySelector( '.score' );
const number = document.querySelector( '.number' );
const againBtn = document.querySelector( '.again' );
const highscore = document.querySelector( '.highscore' );
const glow = document.querySelector( '.glow' );
const heading = document.querySelector( 'h1' );

// defining secret number⬇

let secretNumber = Math.trunc( Math.random() * 20 ) + 1;

// console.log( secretNumber );

// defining initial score
let scoreValue = 20;

// defining initial highscore value
let highscoreValue = 0;
// set autofocus property
guess.focus();


// Add this variable to keep track of typing animation
let typingInProgress = false;

//function to set message text content
function displayMessage ( ourMessage ) {

    // message.textContent = ourMessage;
    if ( typingInProgress ) {
        // If typing is in progress, clear it and display the message immediately
        clearTimeout( typeWriter );
        message.textContent = ourMessage;
        typingInProgress = false;
    } else {
        // If typing is not in progress, start the animation
        typeWriter( ourMessage );
    }

}

// Update the typeWriter function to accept a message parameter
function typeWriter ( newMessage ) {
    typingInProgress = true; // Set typing in progress

    let i = 0;
    const speed = 80;

    function type () {
        if ( i < newMessage.length ) {
            message.textContent += newMessage.charAt( i );
            i++;
            setTimeout( type, speed );
        } else {
            // Reset i to 0 to start the typing animation again
            i = 0;
            setTimeout( () => {
                message.textContent = ''; // Clear the content
                typingInProgress = false; // Typing animation is complete
            }, 1000 ); // Wait for 1 second before clearing the message
        }
    }

    type();
}



// DOM manipulation⬇️
// function for manipulating element values and their styles
function gameLogic () {
    let guessValue = +guess.value;
    // when there is no input
    if ( !guessValue ) {
        // message.textContent = '⛔ No number!';
        displayMessage( '⛔ No number!' );
    } else if ( guessValue === secretNumber ) {
        // when player wins
        // message.textContent = '🎉 Correct number!';
        // displayMessage( '🎉 Correct number!' );
        // Function to start the fireworks animation
        function startFireworksAnimation () {
            ( async () => {
                // Wait for the tsParticles library to be loaded (only if you are not using the bundle script)
                await loadFireworksPreset( tsParticles );

                // Configure and start the tsParticles animation inside the "fireworks-container"
                tsParticles.load( "fireworks-container", {
                    preset: "fireworks",
                } );
            } )();
        }

        // Function to stop the fireworks animation and return to the original page
        function stopFireworksAnimation () {
            // Remove the "fireworks-container" from the DOM
            const fireworksContainer = document.getElementById( "fireworks-container" );
            fireworksContainer.parentNode.removeChild( fireworksContainer );
            message.innerHTML = '<i class="fa-solid fa-star fa-beat"></i> You won!';
        }

        // Call the startFireworksAnimation function to begin the animation
        startFireworksAnimation();

        // After 2 seconds, stop the fireworks animation and return to the original page
        setTimeout( () => {
            stopFireworksAnimation();
            // Add any code here to perform actions after the fireworks animation
        }, 4000 );

        body.style.overflow = 'hidden';

        number.textContent = secretNumber;
        body.style.backgroundColor = '#60b347';
        number.style.width = '30rem';
        guess.setAttribute( 'disabled', '' );
        checkBtn.disabled = true; // Disable the "Check!" button
        number.classList.add( 'active' );
        if ( scoreValue > highscoreValue ) {
            highscoreValue = scoreValue;
            highscore.textContent = highscoreValue;
        }
        // when guess is wrong
    } else if ( guessValue !== secretNumber ) {
        if ( scoreValue > 1 ) {
            // when guess is higher or lower than secret number
            // message.textContent = guessValue > secretNumber ? '📈Too high' : '📉 Too low';
            displayMessage( guessValue > secretNumber ? '⬆️Too high, Try less' : '⬇️ Too low, Try high' );
            scoreValue--;
            score.textContent = scoreValue;
            guess.focus();
            guess.value = '';
        } else {
            // check if score is 0 and player lost
            // message.textContent = '💥 You lost the game!';
            // displayMessage( '💥 You lost the game!' );
            message.innerHTML = '<i class="fa-solid fa-bomb fa-beat-fade"></i>  You lost the game!';
            score.textContent = 0;
            guess.setAttribute( 'disabled', '' );
            checkBtn.disabled = true; // Disable the "Check!" button
            body.classList.add( 'loser' );
            guess.style.color = "#fff";
            message.style.color = "#fff";
            guess.style.borderColor = "#fff";
        }
    }
};
guess.addEventListener( "keypress", function ( event ) {
    // If the user presses the "Enter" key on the keyboard
    if ( event.key === "Enter" ) {
        event.preventDefault();
        gameLogic();
    }
} );

checkBtn.addEventListener( "click", function () {
    // Call the same function when the button is clicked
    gameLogic();
} );


// locic to play again button- reset all values except highscore value
againBtn.addEventListener( 'click', function () {
    body.style.overflow = 'visible';
    body.classList.remove( 'loser' );
    number.classList.remove( 'active' );
    scoreValue = 20;
    secretNumber = Math.trunc( Math.random() * 20 ) + 1;
    message.innerHTML = '';
    displayMessage( ' G u e s s i n g . . . ' );
    score.textContent = scoreValue;
    number.textContent = '?';
    let guessValue = guess.value = '';
    body.style.backgroundColor = '#222';
    number.style.width = '15rem';
    guess.removeAttribute( 'disabled' );
    checkBtn.disabled = false; // enable the "Check!" button
    guess.focus();
    guess.style.color = "#360033";
    message.style.color = "#360033";
    guess.style.borderColor = "#360033";

    // console.log( secretNumber );
} );

// Call typeWriter to start the initial typing animation
typeWriter( "  G u e s s i n g . . .  " );

