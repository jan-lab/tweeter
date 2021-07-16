/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


$(document).ready(function() {

  // declare an escape variable to use to prevent XSS
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  // in-memomry database from initial-tweets.json
  const data = [];
    

  const renderTweets = function(tweets) {
    // remove all child nodes + content from the selected elements - best time to empty the container - right before we fill the form
    $('#tweet-container').empty();

    for (const tweet of tweets) {
      // convert object into a dom element (with a helper fxn)
      const $tweet = createTweetElement(tweet);
      // attached the dom element to a slot - all this done without refreshig the page, done asychronously with AJAX and jQuery
      $('#tweet-container').prepend($tweet);
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
          <p class="inputtext">${escape(tweet.content.text)}</p>  
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

  renderTweets(data);

  // function that can retrieve post any time (get request and redering to dom)
  const loadTweets = () => {
    //http request made asychronously after the browser loads
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
    });

    //short-hand method
    //$.getJSON('/tweets', (tweets) => console.log(tweets));
  };

  // an initial page load to fetch the tweet
  loadTweets();

  const $form = $('#tweet-form');

  //submit event
  $form.on('submit', function(event) {

    // prevent default behavior of html so that html does not refresh the page, make a GET request, and clutter the url with what was entered in the textarea in the submit event
    event.preventDefault();

    // serialize to create a url encoded string
    const urlEncodedData = $(this).serialize();

    // count the number of characters entered
    const count = $('#tweet-text').val().length;

    // create a variable for the counter
    const counter = $(this).find('output');

    // generate an error if the number of characters is less than or equal to zero or larger than equal to 140
    if (count <= 0 || count >= 140) {
      $('.error-hidden').slideDown(function() {
        const msg = count > 140 ? 'Total characters cannot be more than 140 :(' : 'Please enter a message!';
        $('.error-hidden').text(msg);
        setTimeout(() => {
          $('.error-hidden').slideUp();
        }, 2000);
      });
      return;
    }

    // unless an error occurred, post the url encoded data to /tweets
    $.post('/tweets', urlEncodedData, (response) => {
      //console.log(response);
      // after posting a tweet, clear the input field
      $('#tweet-text').val('');
      // after posting a tweet, set the counter back to 140
      counter.text('140');
      //fetch the tweet once my post request resolves (goes inside .then or callback)
      loadTweets();
    });
    
  });

});
