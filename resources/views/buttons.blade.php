


@extends('layouts.app')

@section('content')


@if (Auth::check())

<div class="container" style="height: 100%; width: 60vw; padding-top:5vh; padding-bottom:5vh">
<div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card">
                <div class="card-header">Playing As: {{ Auth::user()->name }}</div>
                <div class="card-body">

                    <a href="{{ route('login') }}" class="btn button-85">85</a><br/><br/>
                    <a href="{{ route('login') }}" class="btn button-89">89</a><br/><br/>
                    <button class="button-64" role="button" onclick="window.location.href='{{ route('login') }}'"><span class="text">64</span></button><br/><br/>
                    <a href="{{ route('login') }}" class="btn button-57"><span class="text">57</span><span>:D</span></a><br/><br/>
                    <a href="{{ route('login') }}" class="btn button-1">1</a><br/><br/>
                    <a href="{{ route('login') }}" class="btn button-49">49</a><br/><br/>
                    <a href="{{ route('login') }}" class="btn button-2">2</a><br/><br/><br/><br/>

    


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

