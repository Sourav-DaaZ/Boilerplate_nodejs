module.exports=(noOfDigit)=>{
        var i,var1=9,var2=1;
        for(i=0;i<noOfDigit-1;i++){
            var1=var1*10;
            var2=var2*10;
        }
        var randn=Math.floor(Math.random()*var1)+var2;
        return (randn);
    
}