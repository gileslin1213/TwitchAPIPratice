
//league legends
var game = '21779';
var steamer = '40586609'
$.ajax({
  type: "GET",
  url: "https://api.twitch.tv/helix/streams",
  headers:{'Client-ID':'nykxj742gwdpflmj32jzltnv4u4ctt'},
  data:{
    "game_id":game,
    "language":"zh-tw",
    "first":15,
    
  },
  dataType: "json",
  success: function (data) {
      console.log(data.data);
      
  }
},
{
  type: "get",
  url: "https://api.twitch.tv/helix/users",
   headers:{'Client-ID':'nykxj742gwdpflmj32jzltnv4u4ctt'},
  data: {"id":steamer},
  dataType: "json",
  success: function (response) {
    console.log(response);
    
  }
});
// $.ajax({
//   type: "get",
//   url: "https://api.twitch.tv/helix/users",
//   headers:{'Client-ID':'nykxj742gwdpflmj32jzltnv4u4ctt'},
//   data: {"id":steamer},
//   dataType: "json",
//   success: function (response) {
//     console.log(response);
    
//   }
// });