
$(document).ready(function() {
  // set total characters to 140
  const totalCharacters = 140;

  const $tweettext = $('#tweet-text');
  
  // when there is an input being entered, calculate the remaining characters and show the counter in red if it becomes negative
  $tweettext.on('input', function(e) {

    let currentCharacters = $(this).val().length;

    let remainingChars = totalCharacters - currentCharacters;

    const counter = $(this).parent().find('output');

    counter.text(remainingChars);
    
    counter.toggleClass('red', remainingChars < 0);
  });
});

