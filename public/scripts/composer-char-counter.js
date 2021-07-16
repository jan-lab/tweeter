$(document).ready(function() {
  // --- our code goes here ---
  //console.log('dom loaded!');

  //Using jQuery and an appropriate selector, register an event handler to the textarea element for the form inside of the .new-tweet section.
  // console.log(new-tweet);
  // console.log(new-tweet.textarea)

  // const errorMsg = () => {
  //   $('.error-hidden').slideDown("slow", function() {
  //     console.log('Total characters cannot be more than 140.');
  //     return 'Total characters cannot be more than 140.';
  //   });
  // };

  const totalCharacters = 140;
  const $tweettext = $('#tweet-text');
  $tweettext.on('input', function(e) {
    let currentCharacters = $(this).val().length;
    let remainingChars = totalCharacters - currentCharacters;
    const counter = $(this).parent().find('output');
    counter.text(remainingChars);
    counter.toggleClass('red', remainingChars < 0);
    // $('.error-hidden').slideDown("slow", function() {
    //   // console.log('Total characters cannot be more than 140.');
    //   // return 'Total characters cannot be more than 140.';
    //   $('.error-hidden').text('error!');
    // });
    
  });
});

