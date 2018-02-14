import '../sass/main.scss';
const div = document.querySelector('div'),
btn = document.querySelector('button');

btn.addEventListener('click', function () {
    div.className = 'loading';
    btn.disabled = true;
    setTimeout(function () {
        btn.disabled = false;
        div.className = 'loading jshide';
        }, 3000);
}, false);
console.log('Now Webpack is working correctly!')