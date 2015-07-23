window.onload = function() {
	console.log('popup');
	count();

	setInterval(function() {
		count(), 1000
	});
}


function count() {
    var DAY = ['Sun.', 'Mon.', 'Tue.', 'Wed.', 'Thu.', 'Fri.', 'Sat.'];

    var d = new Date();

    var month = ((d.getMonth() + 1) < 10) ? '0' + (d.getMonth() + 1) : (d.getMonth() + 1);
    var date = (d.getDate() < 10) ? '0' + d.getDate() : d.getDate();
    document.getElementById('date').innerHTML = d.getFullYear() + '-' + month + '-' + date + ' (' + DAY[d.getDay()] + ')';

    var hour = (d.getHours() < 10) ? '0' + d.getHours() : d.getHours();
    var minute = (d.getMinutes() < 10) ? '0' + d.getMinutes() : d.getMinutes();
    var secound = (d.getSeconds() < 10) ? '0' + d.getSeconds() : d.getSeconds();
    document.getElementById('time').innerHTML = hour + ':' + minute + ':' + secound;
}