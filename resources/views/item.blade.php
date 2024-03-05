@extends('layouts.app')

@section('content')

@if (Auth::check())

<link href="{{ asset('css/home.css') }}" rel="stylesheet">
<link href="{{ asset('css/buttons.css') }}" rel="stylesheet">


<div class="container-fluid h-200" style="text-align:center; justify-content: center; padding-bottom:5vh; padding-top:5vh;">


</div>


@else

<div class="container" style="margin-top: 5vh;">
    <div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card">
                <div class="card-header">Not Logged In!</div>
                <div class="card-body">
                    <p>Please login to access our website.</p>
                </div>   
            </div>
        </div>
    </div>
</div>

@endif

@endsection



<div id="basketPopup" class="popup" style="display: none;">
    <!-- Popup content -->
    <div class="popup-content" id="basketContent">
        <p>Test</p>
        <button>Test Button</button>
    </div>
</div>

<script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
<script src="{{ asset('js/basket.js') }}"></script>
<script src="{{ asset('js/item.js') }}"></script>
