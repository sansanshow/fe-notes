var func = window['func']
window['func'] = function() {
    if(func) {
        console.log('has func')
    }
    console.log('build func')
}
func()