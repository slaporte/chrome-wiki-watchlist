var DEFAULT_TOP = localStorage['listlim'] || 5;

var most_recent_wl = function() {
  var wl = JSON.parse(localStorage.getItem('wl'));
  var unread = 0;
  for (var i = 0; i < wl.length; i++) {
    var rev = wl[i];
    if(rev['notificationtimestamp']) {
      unread += 1;
      if ($('#revs').children().length - 1 < DEFAULT_TOP) {
        $('#revs').append('<a href="https://' + localStorage['wiki'] + '/w/index.php?title=' + rev['title'] + '&action=history" target="_blank"><div class="menu-item">' + rev['title'] + ' <br/> <small>by ' + rev['user'] + ' on ' + rev['timestamp'] + '</small></div></a>');
      }
    }
  }
  if (unread > DEFAULT_TOP) {
    var remaining = unread - DEFAULT_TOP;
    $('#revs').append('<a href="https://' + localStorage['wiki'] + '/w/index.php?title=Special:Watchlist&days=0" target="_blank"><div class="menu-item menu-more">... and ' + remaining + ' more! See your full watchlist</div></a>')
  } else {
    $('#revs').append('<a href="https://' + localStorage['wiki'] + '/w/index.php?title=Special:Watchlist&days=0" target="_blank"><div class="menu-item menu-more">See your full watchlist</div></a>')
  }
}

$(document).ready(function() {
  if(!localStorage['watchlist_key']||!localStorage['username']||!localStorage['wiki']) {
    $('#pop').html('<a href="options.html" target="_blank"><div class="menu-item menu-options only">Please set up your username and token!</div></a>')
  } else {
    most_recent_wl();
    $('#username').html(localStorage['username'])
    $('#wiki').html(localStorage['wiki'])
    $('#unread').html(localStorage['unread'])
  }
});