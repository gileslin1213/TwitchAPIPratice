var game;
var language;
var pagination;

$(document).ready(function () {
  GetStream();
});

$('select').change(function (e) {
  e.preventDefault();
  game = $('#game').val();
  language = $('#language').val();
  if (game == 'undefined' && language == 'undefined') {
    game = eval(game);
    language = eval(language);
  } else if (game == 'undefined') {
    game = eval(game);
  } else if (language == 'undefined') {
    language = eval(language);
  }
 
  $('#stream_here').empty();
  pagination = undefined;
  GetStream();
});

$('#game').change(function (e) {
  if(game == 'undefined'){
    $('.title_icon_wrap').empty().append(
      $('<i>').addClass('fab fa-twitch text-light')
    )
  }else{
    GetStreamGame();
  }
});



$(window).scroll(function () {
  var scrollTop = $(this).scrollTop();
  var scrollHeight = $(document).height();
  var windowHeight = $(this).height();

  if (scrollHeight <= scrollTop + windowHeight + 1 && end == 'notEnd') {
    end = 'End';
    GetStream();
  }
});

function GetStream() {
  $.ajax({
    type: "GET",
    url: "https://api.twitch.tv/helix/streams",
    headers: { 'Client-ID': 'nykxj742gwdpflmj32jzltnv4u4ctt' },
    data: {
      "game_id": game,
      "language": language,
      "first": 9,
      "after": pagination
    },
    dataType: "json",
    success: function (data) {
      var nameList = [];
      $.each(data.data, function (indexInArray, valueOfElement) {
        var thumbnail_url = valueOfElement.thumbnail_url.replace("{width}x{height}", "320x180");
        var viewer_count = valueOfElement.viewer_count + '位觀眾';
        var title = valueOfElement.title;
        var user_name = valueOfElement.user_name;
        var link = 'https://www.twitch.tv/' + user_name;
        var user_id = valueOfElement.user_id;
        var stream_card =
          $('<div>').addClass('col-4').append(
            $('<a>').attr('href', link).addClass('stream_card_wrap').append(
              $('<div>').addClass('stream_card_img_wrap').append([
                $('<img src="' + thumbnail_url + '">'),
                $('<p>').addClass('position-absolute').html(viewer_count)
              ]),
              $('<div>').addClass('stream_card_user_wrap pt-3 clearfix').append([
                $('<img id=' + user_id + ' src="">'),
                $('<a>').addClass('stream_card_user_title').attr("href", "#").html(title),
                $('<a>').addClass('stream_card_user_name').attr("href", "#").html(user_name)
              ])
            )
          );
        nameList.push(user_id);
        $('#stream_here').append(stream_card);
      });
      GetStreamer(nameList);
      pagination = data.pagination.cursor;
      end = 'notEnd';
    }
  });


}



function GetStreamer(streamer) {
  $.ajax({
    type: "get",
    url: "https://api.twitch.tv/helix/users",
    headers: { 'Client-ID': 'nykxj742gwdpflmj32jzltnv4u4ctt' },
    data: { "id": streamer },
    dataType: "json",
    success: function (data) {
      console.log(data);
      $.each(data.data, function (indexInArray, valueOfElement) {
        var url = valueOfElement.profile_image_url.replace('300x300', '50x50')
        $('#' + valueOfElement.id).attr('src', url)
      });
    }
  });
}
function GetStreamGame() {
  $.ajax({
    type: "get",
    url: "https://api.twitch.tv/helix/games",
    headers: { 'Client-ID': 'nykxj742gwdpflmj32jzltnv4u4ctt' },
    data: { "id": game },
    dataType: "json",
    success: function (data) {
      console.log(data.data[0].box_art_url);
      
      var link =data.data[0].box_art_url.replace("{width}x{height}", "130x173")
      
      $('.title_icon_wrap').empty().append(
        $('<img>').attr('src',link)
      )
      
    }
  });
}
