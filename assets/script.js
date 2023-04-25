// save emoji on saveBtn
document.querySelector(".saveBtn").innerHTML="💾 Save"

//var hour
var eventsData
var today = moment();

// set textarea color based on time of day
var setHourColor = function() {
  var currentHour = today.hours();
  //console.log(currentHour);
  $('.time-block').each(function () {
    var timeId = parseInt($(this).attr('id').split("hour-")[1]);      
    //console.log(timeId);
    if (timeId < currentHour) {
     $(this).addClass('past');
    } 
    else if (timeId === currentHour) {
      $(this).removeClass('past');
      $(this).removeClass('future');
      $(this).addClass('present');
    }
    else {
      $(this).removeClass('past');
      $(this).removeClass('present');
      $(this).addClass('future');
    }
  });
}

// set date & time 
$('#currentDay').text(today.format('LLLL')); 

// retrieve items in local storage
function loadStoredData () {
  eventsData = JSON.parse(localStorage.getItem("calendarEvents"));
  if (!eventsData) {
      eventsData = {
          hour9: "",
          hour10: "",
          hour11: "",
          hour12: "",
          hour13: "",
          hour14: "",
          hour15: "",
          hour16: "",
          hour17: "",
          hour18: "",
      };
  }
    for (let i = 9; i < 18; i++) {
      //$("#hour-" + i + " textarea").val(eventsData["hour" + i]);
      $(`#hour-${i} textarea`).val(eventsData[`hour${i}`]);
    }
}

function handleSaveClick(event) {
//console.log("click");
var hourBlock = $(event.target).parent();
//var value = hourBlock.children("textarea").val();
let value = $(event.target).sibling("textarea").val();
//console.log(`value: ${value}`);
var hour = hourBlock.attr('id').split("-")[1];

eventsData["hour" + hour] = value;

localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
}

$('.saveBtn').on('click', handleSaveClick);


$(function() {
  loadStoredData();
  setHourColor();
});
