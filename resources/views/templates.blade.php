@extends('layouts.app')

@section('content')


@if (Auth::check())
<div class="container" style="height: 100%; padding-top:5vh; padding-bottom:5vh; width:60vw;">
<div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card">
                <div class="card-header">TEMPLATES</div>
                <div class="card-body">
                    
                <a class="nav-link" href="{{ route('login') }}">{{ __('login') }}</a>
                <a class="nav-link" href="{{ route('register') }}">{{ __('register') }}</a>
                <a class="nav-link" href="{{ route('template-menu') }}">{{ __('template-menu') }}</a>
                <a class="nav-link" href="{{ route('template-triple') }}">{{ __('template-triple') }}</a>
                <a class="nav-link" href="{{ route('template-hexa') }}">{{ __('template-hexa') }}</a>
                <a class="nav-link" href="{{ route('buttons') }}">{{ __('buttons') }}</a>



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