@extends('layouts.app')

@section('content')


@if (Auth::check())
<div class="container" style="height: 100%; width: 60vw; padding-top:5vh; padding-bottom:5vh">
    <div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card" style="background-color:#BCBCBCd8;">
                <div class="card-header" style="text-align:center;">MENU 3x2</div>
                <div class="card-body">
                    <div class="container-fluid h-100" style="text-align:center; justify-content: center;">
                        <div class="row h-100" style="text-align:center; justify-content: center;">

                            <div class="col-md-4" style="min-height: 50vh;">
                                <!-- 1 -->
                                <div class="row transparent-bg" style="height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>
                                <!-- 2 -->
                                <div class="row transparent-bg" style="height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>
                            </div>


                            <div class="col-md-4" style="min-height: 50vh;">
                                <!-- 3 -->
                                <div class="row transparent-bg" style="height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>
                                <!-- 4 -->
                                <div class="row transparent-bg" style="height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>
                            </div>
                            

                            <div class="col-md-4" style="min-height: 50vh;">
                                <!-- 5 -->
                                <div class="row transparent-bg" style="height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
                                    <img src="images/blank.png" alt="blank" style="width: 90%; height: 90%; visibility: hidden;">
                                </div>
                                <!-- 6 -->
                                <div class="row transparent-bg" style="height: 50%; display: flex; justify-content: center; align-items: center; padding-bottom:1vh;">
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