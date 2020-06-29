module.exports=()=>{
        var date = new Date();
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var day=date.getDate();
        var hours=date.getHours();
        var minutes=date.getMinutes();
        var timeStamp={year:year,month:month,day:day,hours:hours,minutes:minutes}
        return (timeStamp);
}