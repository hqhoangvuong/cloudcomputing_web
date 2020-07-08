
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
    setBackground();
})


function getCurrentWeather(){

        //Ajax get current
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
                console.log(data)
                document.getElementById("txtTempreture").innerHTML= Math.round(data.temperature * 100) / 100+ '° C - '+convertCtoF(data.temperature)+'° F'
                document.getElementById("txtHumidity").innerHTML='Độ ẩm: ' + Math.round(data.humidity * 100) / 100+' %'
                document.getElementById("txtTime").innerHTML='Cập nhật lúc: ' + timeConverter(data.time)
               
               
               //Chỉnh giờ tiếp
                getNextPredict(data.temperature,data.humidity)


                //Xét độ ẩm
                //set icon current
                if(parseFloat(data.humidity)>80){
                    document.getElementById("imgCurrent").src="../images/rainy.svg";
                }
                else if(parseFloat(data.humidity)>40){
                    document.getElementById("imgCurrent").src="../images/cloudy.svg";
                }
                else {
                    document.getElementById("imgCurrent").src="../images/day.svg";
                }           
            },
             error:function(er){
              alert('somemistkae')
             }
           })  
}

function convertCtoF(degree){
    degree=parseFloat(degree);
    var f;
    f= 1.8*degree+32;
    return Math.round(f * 100) / 100
}
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    // var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var hour = a.getHours()-7;
    var min = a.getMinutes();
    var sec = a.getSeconds();
    sec = sec < 10 ? '0'+sec : sec;
    // var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
    var time = hour + ':' + min + ':' + sec;
    return time;
}


function getNextPredict(temp,humid){
   
    $.ajax({
        method: 'get',
        url: 'https://weather-api-cors.herokuapp.com/iot/predict/?temp='+temp +'&hum='+humid,
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
            // console.log(data)
           document.getElementById('txtTempreratureNext').innerHTML ='Nhiệt độ: '+ Math.round(data.temperature * 100) / 100+ '° C - '+convertCtoF(data.temperature)+'° F'
           document.getElementById("txtHumidityNext").innerHTML ='Độ ẩm: ' + Math.round(data.humidity * 100) / 100+' %'
           

           //XET BACKGROUND
           if(parseFloat(data.humidity)>80){
            document.getElementById("imgPredict").src="../images/rainy.svg";
            }
            else if(parseFloat(data.humidity)>40){
                document.getElementById("imgPredict").src="../images/cloudy.svg";
            }
            else {
                document.getElementById("imgPredict").src="../images/day.svg";
            }    
        },
        error:function(er){
         alert('somemistkae')
        }
      })  
}

function setBackground(){
    var a = new Date();
    var hours = a.getHours();
    var minutes = a.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    // hours = hours % 12;
    // hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    // var strTime = hours + ':' + minutes + ' ' + ampm;
    if(hours>6 && hours<=18) {
        //Sang
        $('body').css('background-image', 'url(../images/bgday.jpg)');

    }else{
    }

}