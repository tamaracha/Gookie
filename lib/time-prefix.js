function timePrefix() {
    /**
     * Time prefix for console.log
     * @return prefix in the form of ' [hh:mm:ss] '
     */
    var date = new Date();

    var hour = date.getHours();
    hour = (hour < 10 ? "0" : "") + hour;

    var min  = date.getMinutes();
    min = (min < 10 ? "0" : "") + min;

    var sec  = date.getSeconds();
    sec = (sec < 10 ? "0" : "") + sec;

    return ' [' + hour + ':' + min + ':' + sec + '] ';
}