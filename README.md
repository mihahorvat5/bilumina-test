Setup:
git clone https://github.com/mihahorvat5/bilumina-test
git pull

composer install
CREATE .env FILE!
php artisan key:generate
php artisan migrate
npm install
npm run dev + php artisan serve

To access the website you have to register! (use wampserver or smth like this)