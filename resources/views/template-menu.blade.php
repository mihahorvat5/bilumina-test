@extends('layouts.app')

@section('content')


@if (Auth::check())
<div class="container" style="height: 100%; width: 60vw; padding-top:5vh; padding-bottom:5vh">
<div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card">
                <div class="card-header">MENU</div>
                <div class="card-body">
                    <!-- 1 -->
                </div>
            </div>
        </div>
    </div>
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
<link href="{{ asset('css/buttons.css') }}" rel="stylesheet">
@endsection