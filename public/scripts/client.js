/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Test / driver code (temporary). Eventually will get this from the server.
$(document).ready(function() {

  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // Fake data taken from initial-tweets.json
  const data = [
    // {
    //   "user": {
    //     "name": "Newton",
    //     "avatars": "https://i.imgur.com/73hZDYK.png"
    //     ,
    //     "handle": "@SirIsaac"
    //   },
    //   "content": {
    //     "text": "If I have seen further it is by standing on the shoulders of giants"
    //   },
    //   "created_at": 1461116232227
    // },
    // {
    //   "user": {
    //     "name": "Descartes",
    //     "avatars": "https://i.imgur.com/nlhLi3I.png",
    //     "handle": "@rd" },
    //   "content": {
    //     "text": "Je pense , donc je suis",
    //     "created_at": 1461113959088
    //   }
    // }
  ];
    

  const renderTweets = function(tweets) {
    $('#tweet-container').empty(); //removes all child nodes and content from the selected elements //best time to empty the container - right before we fill the form

    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet); //converting object into a dom element (with a helper fxn 'createTweetElement')
      $('#tweet-container').prepend($tweet); //what gets return from the above is attached to a slot in the html
      //all this done without refreshig the page, done asychronously with AJAX and jQuery
    }
  };

  const createTweetElement = function(tweet) {
    //use jQuery to construct new elements using $
    const $tweet =
        `<article class="new-tweet">
          <header>
            <div id="tweet-user">
              <img src="${tweet.user.avatars}"> 
              <span id="username">${tweet.user.name}</span>
            </div>
            <span id="handle">${tweet.user.handle}</span>
          </header>
          
          <p class="iputtext">${escape(tweet.content.text)}</p>
          
          <footer class="tweet-footer">
            <span id="tweet-timestamp">${timeago.format(tweet.created_at)}</span>
            <div id="tweet-icons">
              <span><i class="fas fa-flag"></i></span>
              <span><i class="fas fa-retweet"></i></span>
              <span><i class="fas fa-heart"></i></span>
            </div>
          </footer>
        </article>`
        ;
    return $tweet;
  };
  //To refactor later
  // const createTweetElement = (tweet) => {
  //   const $avatar = $('<img>').avatars;
  //   const $name = $('<h3>').text(`${tweet.name}`);
  //   const $handle = $('<h3>').text(`${tweet.handle}`);
  //   const $text = $('<h3>').text(`${tweet.text}`);
  //   const $timeago = $('<h3>').text(`${timago.format(tweet.created_at)}`);
  //   //let $tweet = $(`<article class="tweet">${timeago.format(1473245023718)}</article>`);   
  //   return $tweet;
  // }

  renderTweets(data);

  const loadTweets = () => {
    //below is the entire http request being made asychronously after the browser loads
    $.ajax({
      url: '/tweets',
      method: 'GET',
      success: (tweets) => {
        console.log(tweets);
        // console.log(createPost(posts[0]));
        renderTweets(tweets);
      },
      error: (err) => {
        console.error(err);
      }
    }); //now I have a function I can call - I have the ability to retrieve post any time (get request and redering to dom)

    //short-hand method
    //$.getJSON('/tweets', (tweets) => console.log(tweets));
  };

  loadTweets(); //on an initial page load I want to fetch the tweet

  const $form = $('#tweet-form');

  $form.on('submit', function(event) { //submit event

    //$('.error-hidden').text('').slideUp();
    // if (event.which === 13) {

    event.preventDefault(); //preventing default behavior of html so that html does not refresh the page, make a GET request, and clutter the url with what you entered in the input/textarea field for post/submit action

    const urlEncodedData = $(this).serialize();
    //console.log('data from post:',urlEncodedData);
    //console.log($('.counter').val())

    const count = $('#tweet-text').val().length;
    const counter = $(this).find('output');
    //console.log(counter);

    if (count <= 0 || count >= 140) {
      $('.error-hidden').slideDown(function() {
        const msg = count > 140 ? 'Total characters cannot be more than 140.' : 'Please enter a message';
        $('.error-hidden').text(msg);
        setTimeout(() => {
          $('.error-hidden').slideUp();
        }, 2000);
      });
      return;
    }

    //$('.error-hidden').slideUp("slow");
  
    $.post('/tweets', urlEncodedData, (response) => {
      console.log(response);
      $('#tweet-text').val('');
      counter.text('140');
      loadTweets(); //fetch the post after I know I have successfully created a new piece of data - once my post request resolves (goes inside .then or callback)
    });
    

    //if you don't include the callback fxn, jQuery assumes you want a promise and returns a promise
    // $.post('/api/posts', urlEncodedData)
    //   .then((response) => {
    //     console.log(response);
    //   });

  // }
  });



});


