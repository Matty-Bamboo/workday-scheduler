
document.querySelector(".saveBtn").innerHTML="💾 Save"

var eventsData
var today = moment();
var timeBlockEl = document.querySelector('.container');

$('#currentDay').text(today.format('LLLL')); 

var setHourColor = function() {
    var currentHour = today.hours();
    console.log(currentHour);
    $('.time-block').each(function () {
        var timeId = parseInt($(this).attr('id').split("hour-")[1]);      
        console.log(timeId);
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


function loadStoredData() {
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
        };
    }
}

function handleSaveClick(event) {
   var hourBlock = $(event.target).parent();
   var value = hourBlock.children("textarea").val();
   var hour = hourBlock.attr('id').split("-")[1];

   localStorage.setItem("calendarEvents", JSON.stringify(eventsData));
}

$(function() {
    loadStoredData();
    setHourColor();
});

$('.saveBtn').on('click', handleSaveClick);