<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // Desired number of users to create
        $numUsers = 20;

        // Loop to create users
        for ($i = 0; $i < $numUsers; $i++) {
            // Generate random name and email
            $name = $this->generateRandomString();
            $email = $name . '@gmail.com';

            // Create user
            User::create([
                'name' => $name,
                'email' => $email,
                'password' => Hash::make('password'), // You can change 'password' to any default password you want
            ]);
        }

        $this->command->info("Users created successfully!");
    }

    // Function to generate random strings for name and email
    private function generateRandomString($length = 8) {
        return substr(str_shuffle(str_repeat($x='abcdefghijklmnopqrstuvwxyz', ceil($length/strlen($x)) )),1,$length);
    }
}

