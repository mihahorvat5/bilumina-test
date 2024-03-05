@extends('layouts.app')

@section('content')

@if (Auth::check())


<link href="{{ asset('css/home.css') }}" rel="stylesheet">
<script src="{{ asset('js/items.js') }}"></script>


<div class="container-fluid h-100" style="text-align:center; justify-content: center; padding-bottom:5vh; padding-top:5vh;">

</div>



@else
<div class="container" style="margin-top: 5vh;">
    <div class="row justify-content-center">
        <div class="col-md-8" style="width:100%">
            <div class="card">
                <div class="card-header">Niste Prijavljeni!</div>
                <div class="card-body">
                    <p>Za dostop do vsebine se prosim prijavite.</p>
                </div>   
            </div>
        </div>
    </div>
</div>


@endif
@endsection