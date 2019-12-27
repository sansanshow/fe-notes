var version = 'v5';
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/server-worker.js').then(reg => {
        console.log('service worker registed!');
        console.log('sw_version: ', localStorage.getItem('sw_version'), ', version: ', version);
        reg.update();
        if (localStorage.getItem('sw_version') !== version) {
            console.log('reg:--update')
            reg.update().then(function () {
                localStorage.setItem('sw_version', version)
            })
        }
    }).catch(err => {
        console.log('Opooos, something wrong happend!');
    })
}

window.onload = function() {
    document.body.append('PWA!')
}
