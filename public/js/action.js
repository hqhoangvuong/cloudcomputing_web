
//Count time
function startTime() {
    var today = new Date();
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('txt').innerHTML = h+' '+m+' '+' '+s;
    var t = setTimeout(startTime, 500);
}
function checkTime(i) {
    if (i < 10) {i = "0" + i};
    return i;
}


$(document).ready(function(){
    //Lấy độ ẩm, nhiệt độ, thời gian gần nhất.
    getCurrentWeather();

})


function getCurrentWeather(){
        //Ajax get current
         $.ajax({
             crossDomain: true,
             method: "GET",
             contentType: "application/json; charset=UTF-8",
             cache: true,  
             url: "https://weather-api-cors.herokuapp.com/iot", 
             dataType: 'jsonp',
             headers: {
                 "accept": "application/json",
                 'Access-Control-Allow-Origin': '*',
                 'Access-Control-Allow-Credentials': 'true',
                 "Access-Control-Allow-Methods": "GET",
                 'Access-Control-Allow-Headers': '*',
                 'Access-Control-Request-Headers': 'x-requested-with'
             },
             success: function (data) {
                console.log(data);
             },
             error:function(er){
             }
         });

         $.ajax({
             method: 'get',
             url: "https://weather-api-cors.herokuapp.com/iot",
             // dataType: 'json',
             // cache:false,
             // cors: true ,
             contentType:'application/json; charset=utf-8',
             // secure: true,
             headers: {
               'Access-Control-Allow-Origin': '*',
               'Access-Control-Allow-Credentials': 'true',
               "Access-Control-Allow-Methods": "GET",
               'Access-Control-Allow-Headers': '*',
             },
             success: function (data){
               alert('success')
             },
             error:function(er){
              alert('somemistkae')
             }
           });
      
      
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.open( "GET", 'https://weather-api-cors.herokuapp.com/iot', false ); // false for synchronous request
        xmlHttp.send( null );
        alert( xmlHttp.responseText);
        
}