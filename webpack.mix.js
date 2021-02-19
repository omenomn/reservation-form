let mix = require('laravel-mix');

mix.js('src/js/app.js', 'public/js').vue()  //<= originally mix.ts
   .sass('src/sass/app.scss', 'public/css')
