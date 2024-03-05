<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.bunny.net">
    <link href="https://fonts.bunny.net/css?family=Nunito" rel="stylesheet">
    <link href="{{ asset('css/button1.css') }}" rel="stylesheet">
    
    
    <!-- Scripts -->
    @vite(['resources/sass/app.scss', 'resources/js/app.js'])

    <!-- GLOBALNO ZARADI DEDOVANJA!!!!
<style>
    body {
            background-image: url("{{ asset('images/nitrome1.png') }}");
            background-size: cover;
            background-repeat: no-repeat;
        }
</style>
 -->

 <style>
    body {
        font-family: 'Comic Sans MS', cursive, sans-serif;
        color: black;
        position: relative;
        min-height: 100vh; /* Ensure the body fills the entire viewport height */
        margin-bottom: 0px; /* Adjust this value to match the height of your footer */
        background-image: url('{{ asset('images/background8.png') }}');
        background-size: cover;
        }
.footer {
    position: absolute;
    width: 100vw;
    height: 2vh; 
    margin-bottom: 0px;/* Adjust this value to set the height of your footer */
}
 </style>
    
</head>
<body>
    @include('layouts.header')
    @yield('content')
    @include('layouts.footer')
</body>
</html>
