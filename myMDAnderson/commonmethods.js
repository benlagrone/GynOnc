function getDate(){
    var currentTime = new Date();
    var month = addZero(currentTime.getMonth() + 1);
    var day = addZero(currentTime.getDate());
    var year = currentTime.getFullYear();
    return(month + "/" + day + "/" + year);
}
function addZero(num)
{
    (String(num).length < 2) ? num = String("0" + num) :  num = String(num);
    return num;        
}