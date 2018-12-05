```
window.onload=function(){
    try{
        localStorage.pages++
    }catch(e){
        localStorage.pages=1
    }
}
window.onunload=function() {
    localStorage.pages--;
    if(localStorage.pages==0) {
        localStorage.clear()
    }
}
```