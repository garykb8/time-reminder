var opt;
var notificationId = '';

function init(details) {
    console.log('init');
    console.log(details.reason);
    var d = new Date();
    chrome.browserAction.setBadgeText({text: d.getHours().toString()});
    // chrome.browserAction.setBadgeText({text: d.getMinutes().toString()});
	// console.log(getNextHourTime());

    chrome.storage.sync.get({
        reminder: 60,
        hour: false
    }, function(items) {
        chrome.alarms.create('hour-reminder', {
            when: getNextHourTime(items)
        });
    });
}

function getNotificationId(id) {
    notificationId = id;
    console.log(notificationId);
}

function getNotificationOpt(message) {
    var opt = {
        type: 'basic',
        title: 'Time Reminder',
        message: message,
        iconUrl: 'icons/icon.png'
    };

    return opt
}

function setTimeReminder() {
    console.log('start reminder');
    var d = new Date();
    chrome.browserAction.setBadgeText({text: d.getHours().toString()});
    // chrome.browserAction.setBadgeText({text: d.getMinutes().toString()});

    var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    var minute = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
    var secound = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();

    opt = getNotificationOpt(hour + ':' + minute + ':' + secound)
    // console.log(notificationId);
    if (notificationId.length != 0) {
        // chrome.notifications.update(notificationId);
        chrome.notifications.clear(notificationId);
        // chrome.notifications.create(notificationId, opt);
    } else {
        chrome.notifications.create(opt, getNotificationId);
    }

    chrome.alarms.clear('hour-reminder');
    chrome.runtime.sendMessage({text: 'text'});
}

function getNextHourTime(storageValue) {
    console.log(storageValue);
    var d_now = new Date();

    if (storageValue.hour) {
        var d_next = new Date(d_now.getFullYear(), d_now.getMonth(), d_now.getDate(), d_now.getHours() + 1, 0, 0);
    } else {
        var d_next = new Date(d_now.getFullYear(), d_now.getMonth(), d_now.getDate(), d_now.getHours() , d_now.getMinutes() + storageValue.reminder, d_now.getSeconds());
    }

    var offset = d_next - d_now
    return d_now.getTime() + offset;
}

chrome.runtime.onInstalled.addListener(init);

chrome.notifications.onClosed.addListener(function(notificationId, byUser) {
	// console.log('tttt');
	if (!byUser) {
		chrome.notifications.create(notificationId, opt);
	}
})

chrome.alarms.create('hour-reminder', {
    delayInMinutes: 1
});

chrome.alarms.onAlarm.addListener(function(alarm) {
    console.log('alarm');
    if (alarm.name === 'hour-reminder') {
        console.log('alarm');
        setTimeReminder();
    }
})

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    chrome.storage.sync.get({
        reminder: 60,
        hour: false
    }, function(items) {
        chrome.alarms.create('hour-reminder', {
            when: getNextHourTime(items)
        });
    });
});
