var inp = document.getElementById("result");
var bfIn = "";
var str_result = "";
var stt = 0 ; //status (positive or nagative number)
var priority = 0; 
var change_op = 0; //change operator 
var operator = ""; //old operator 
var new_op = ""; //new operator 
var ends = 0; 

var numArray = new Array();
var numArray_index = 0;
var signArray = new Array();
var signArray_index = 0;

function Clickbtn(btn) {
    if(ends) {
        inp.innerHTML = "";
        ends = 0;
    }
    if(bfIn == "" && str_result == "") {
        str_result = inp.innerHTML;
    }
    if(str_result == "0") {
        str_result = "";
    }

    var obj = btn.innerHTML;
    /******number-group*********/
    if(obj== "0"||obj=="1"||obj=="2"||obj=="3"||
        obj=="4"||obj=="5"||obj=="6"||obj=="7"||
        obj=="8"||obj=="9"||obj=="."||obj=="+/-") 
    {
        change_op = 0; 
        
        if(obj == "+/-") {
            if(stt){
                stt = 0;
                bfIn = bfIn.substring(1,bfIn.length);
            }
            else {
                stt = 1;
                bfIn = "-" + bfIn ;
            }
        }
        else {
            bfIn += obj;         
        }
        inp.innerHTML = str_result + bfIn;
    }  
    /******sign-group*********/
    if(obj == "+"||obj=="-"||obj=="x"||obj=="/")
    {
        if(change_op) {
            if(operator == "+" || operator=="-" && obj == "x" || obj =="/"){
                priority++
            }
            if(operator == "x" || operator=="/" && obj == "+" || obj =="-"){
                priority--
            }
            signArray[signArray_index -1] = obj;
            inp.innerHTML = inp.innerHTML.substring(0, inp.innerHTML.length-1) + obj; 
        }
        else {
            operator = obj;
            numArray[numArray_index++] = parseFloat(bfIn);
            signArray[signArray_index++] = obj;

            if(obj=="x"||obj=="/") {
                priority++;
            }
            
            inp.innerHTML = inp.innerHTML + obj;
        }
        change_op = true;
        str_result ="";
        bfIn = "";
        
    }
    
    /******erase-group*********/
    if(obj == "DEL" || obj == "AC")
    {
        if(obj == "AC") 
        {
            bfIn = "";
            str_result = "";
            inp.innerHTML = "0";
        }      
        if(obj == "DEL") 
        {
            if(bfIn.length > 1){
                bfIn = bfIn.substring(0,bfIn.length-1);
            }else{
                bfIn = "";
            }
            inp.innerHTML = str_result + bfIn;
        }
    }
    /**********value-group***********/
    if(obj=="=" || obj =="!")
    {
        ends = 1;
        if(bfIn != "") {          
            numArray[numArray_index] = parseFloat(bfIn);   
        }
        if(obj == "!") {
            Factorial(numArray[numArray_index]);
            console.log(numArray[numArray_index]);
        }
        if(obj == "=") {
            Calculate();
        }
        //Reset
        bfIn = "";
        str_result = ""; 
        numArray = new Array();
        numArray_index = 0;
        signArray = new Array();
        signArray_index = 0;
         
    }

}

function Calculate() {
    numArray_index--;
    while(priority > 0) {
        for(var index = 0; index <= numArray_index; numArray_index++){
            if(signArray[index] == "x" ||  signArray[index] == "/")
            {
                var num0 = numArray[index];
                var num1 = numArray[index+1];
                var result = 0;
                if(signArray[index] == "/") 
                {
                    if(num1==0) 
                    {
                        result = "Systax Error";
                        result.toString(result);
                        inp.innerHTML = result;
                    }
                    result = num0/num1;
                }
                if(signArray[index] == "x") 
                {
                    result = num0*num1;
                }
                numArray[index] = result;
                

                for(var new_index = index; new_index < numArray.length; new_index++){
                    numArray[new_index] = numArray[new_index+1];
                }
                numArray_index--;
                for(var new_index = index; new_index < numArray.length; new_index++){
                    numArray[new_index] = numArray[new_index+1];
                }
                signArray_index--;

                priority--;
            }
            break;
        }
    }

    numArray_index++;
    while(numArray_index > 0){
        var num0 = numArray[0];
        var num1 = numArray[1];
        var result = 0;
        if(signArray[0] == "+")
        {
            result = num0 + num1;
        }
        if(signArray[0] =="-") 
        {
            result = num0 - num1;
        }

        for(var new_index = 1; new_index < numArray.length; new_index++){
            numArray[new_index] = numArray[new_index+1];
        }
        numArray_index--;
        for(var new_index = 1; new_index < numArray.length; new_index++){
            numArray[new_index] = numArray[new_index+1];
        }
        signArray_index--;

        numArray[0] = result;
    }
    inp.innerHTML = result;
}

function Factorial(n) {
    var fac = 1;
    if(n == "1" || n == "0") {
        fac = 1;
    }
    else if(n > 0) {
        for (var i = 2; i <= n; i++) {
            fac *= i;
        }
    } 
    else if(n < 0) {
        fac= "Math Error";
        fac.toString(fac);
    }
    inp.innerHTML = fac;
}
