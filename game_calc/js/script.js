function insert(num){
    
    document.form.textview.value = document.form.textview.value+num
}

function equal(){
    
    var a = document.form.textview.value;
    
    if(a){
        document.form.textview.value = eval(a)
    }
}

function clean(){
    document.form.textview.value = "";
}

function back(){

    var a = document.form.textview.value;

    document.form.textview.value = a.substring(0, a.length-1)
}