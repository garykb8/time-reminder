function restoreOptions() {
    chrome.storage.sync.get({
        reminder: 60,
        hour: true
    }, function (items) {
        document.getElementById('reminder-list').value = items.reminder;
        if (items.hour) {
            document.getElementById('hour-reminder').checked = true;
            document.getElementById('reminder-list').disabled = true;
        }
    });
}

function saveOptions() {
    var reminderValue = document.getElementById('reminder-list').value;
    var hourReminder = document.getElementById('hour-reminder').checked;
    console.log(hourReminder);
    chrome.storage.sync.set({
        reminder: parseInt(reminderValue, 10),
        hour: hourReminder
    }, function() {
        console.log('save');
        chrome.runtime.sendMessage({text: 'text'});
    });
    if (!document.getElementById('message').classList.contains('animation')) {
        console.log(document.getElementById('message').classList.contains('animation'));
        document.getElementById('message').classList.add('animation');
    }
}

function eachHourCheckbox() {
    if (document.getElementById('hour-reminder').checked) {
        document.getElementById('reminder-list').disabled = true;
    } else {
        document.getElementById('reminder-list').disabled = false;
    }
}

function setAnimationEvent() {
    document.getElementById('message').addEventListener('animationend', function(event) {
        if (event.type === 'animationend') {
            document.getElementById('message').classList.remove('animation');
        }
    });
}

setAnimationEvent();

document.getElementById('hour-reminder').addEventListener('change', eachHourCheckbox)

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
