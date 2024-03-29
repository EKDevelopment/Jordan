// Wait for Cordova to load
//
document.addEventListener("deviceready", onDeviceReady, false);


// Cordova is ready
//
function onDeviceReady() {
    // Empty
   
}

// process the confirmation dialog result
function onConfirm(buttonIndex) {
    alert('You selected button ' + buttonIndex);
}


function sendData()
{
    alertMessage = document.getElementById('StreetAddress').value + ", " + document.getElementById('City').value + " " + document.getElementById('State').value + ", " + document.getElementById('Zip').value
    navigator.notification.confirm(alertMessage, sendPost, 'Show Address', 'Cancel,Send');
}

/*function sendPost(buttonIndex)
{
    //cancel button so do nothing
    if (buttonIndex == 1)
    {
        
    }
    else
    {
        alert('Sending the data');
    }
    
}*/



function sendPost(buttonIndex) {
    //cancel button so do nothing
    if (buttonIndex == 1)
    {
        
    }
    else
    {
 
    var latitude = 0;
    var longitude = 0;
    //postData = '{"StreetName":"152 Greenwood Ln", "City":"Waltham", "State":"MA", "PostalCode":"02451", "Country":"US"}';
    postData = '{"StreetName":"' + document.getElementById('StreetAddress').value + '", "City":"' + document.getElementById('City').value  + '", "State":"' + document.getElementById('State').value  + '", "PostalCode":"' + document.getElementById('Zip').value  + '", "Country":"US"}';
        //$("#details").append('<li id="DataReceived" name="head" >Sent: ' + postData + '</li>' );
    $.ajax({
           type: "POST",
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           url:    "http://gis.routrix.com:801/Routrix/GISServices/gis/geocode",
           data: postData,
           success: function(msg) {

           for(var i in msg.addresses)
           {
              address = msg.addresses[i];
 
              for (var key in address)
           {
               //$("#details").append('<li> ' + key +':' + address[key] + '</li>' );
               if (key = "latitude")
               {
                  latitude = address[key];
               }
               if (key = "longitude")
               {
                  longitude = address[key];
                }
           
           }

           }
           
           //$('#details').listview('refresh');
          
           var myLocation = new google.maps.LatLng(latitude, longitude);
           //$("#details").append('<li id="Jordan" name="head" >HERE</li>' );
           //alert(myLocation);
           var map  = new google.maps.Map(document.getElementById('map_canvas'), {
                                      mapTypeId: google.maps.MapTypeId.ROADMAP,
                                      center: myLocation,
                                      zoom: 15
                                      });
        
           var marker = new google.maps.Marker({
                                               position: myLocation,
                                               map: map,
                                               title:"The location"
                                               });
          return false;
    
           },
           error: function(msg) {
           $("#details").append('<li id="Jordan" name="head" >FAIL</li>' );           }
           });
    }
}

