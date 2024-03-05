
@extends('layouts.app')

@section('content')


@if (Auth::check())


<div class="container" style="height: 100%; padding-top:5vh; padding-bottom:5vh">
    <div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card" style="background-color:#BCBCBCd8;">
                <div class="card-header" style="text-align:center;">MENU</div>
                <div class="card-body">
                    <div class="container-fluid h-100" style="text-align:center; justify-content: center;">
                        <div class="row h-100" style="text-align:center; justify-content: center;">

                            <div class="col-md-4" style="min-height: 50vh;">
                                <!-- 1 -->
                                <div class="row transparent-bg" style="background-color: black; height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <a href="{{ route('snake1') }}">
                                        <img src="images/snake1.png" alt="Clickable Image" style="width: 90%; height: 90%; cursor: pointer;" class="highlight-on-hover">
                                    </a>
                                </div>
                                <!-- 2 <div class="row transparent-bg" style="background-color: black; height: 50%; display: flex; justify-content: center; align-items: center;"><a href="{{ route('leaderboard') }}" class="btn button-89" style="width: auto;">Leaderboard</a></div>  -->
                                <!-- BLANK SPACE -->
                                <div class="row transparent-bg" style="background-color: black; height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>
                            </div>


                            <div class="col-md-4" style="min-height: 50vh;">
                                <!-- 3 -->
                                <div class="row transparent-bg" style="background-color: gray; height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <a href="{{ route('template-menu') }}">
                                        <img src="images/snake2.png" alt="Clickable Image" style="width: 90%; height: 90%; cursor: pointer;" class="highlight-on-hover">
                                    </a>
                                </div>
                                <!-- 4 -->
                                <div class="row transparent-bg" style="background-color: black; height: 50%; display: flex; justify-content: center; align-items: center;"><a href="{{ route('leaderboard') }}" class="btn button-89" style="width: auto;">Leaderboard</a></div>
                            </div>
                            

                            <div class="col-md-4" style="min-height: 50vh;">
                                <!-- 5 -->
                                <div class="row transparent-bg" style="background-color: gray; height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <a href="{{ route('template-triple') }}">
                                        <img src="images/snake3.png" alt="Clickable Image" style="width: 90%; height: 90%; cursor: pointer;" class="highlight-on-hover">
                                    </a>
                                </div>
                                <!-- 6 <div class="row transparent-bg" style="background-color: black; height: 50%; display: flex; justify-content: center; align-items: center;"><a href="{{ route('leaderboard') }}" class="btn button-89" style="width: auto;">Leaderboard</a></div>  -->
                                <!-- BLANK SPACE -->
                                <div class="row transparent-bg" style="background-color: black; height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<!-- 4x6 GRID
<div class="container-fluid h-100" style="text-align:center; justify-content: center;">
    <div class="row h-100" style="text-align:center; justify-content: center;">
        <div class="col-md-3" style="min-height: 75vh;">
            
            <div class="row transparent-bg" style="background-color: black; height: 16.66%; display: flex; justify-content: center; align-items: center;"><a href="{{ route('leaderboard') }}" class="btn button-89" style="width: auto;">Leaderboard</a></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%; display: flex; justify-content: center; align-items: center;"><a href="{{ route('snake1') }}" class="btn button-49">Snake 1</a></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
        </div>
        <div class="col-md-3" style="min-height: 100%;">
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
        </div>
        <div class="col-md-3" style="min-height: 100%;">
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
        </div>
        <div class="col-md-3" style="min-height: 100%;">
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: gray; height: 16.66%;"></div>
            <div class="row transparent-bg" style="background-color: black; height: 16.66%;"></div>
        </div>
    </div>
</div>
-->


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
<link href="{{ asset('css/menu.css') }}" rel="stylesheet">
@endsection