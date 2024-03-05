<div id="app">
    <nav class="navbar navbar-expand-md navbar-light shadow-sm" style="background-color: #D0BFFF;">
        <div class="col-md-6" style="text-align:left; padding-left:5vw;">
            <a class="navbar-brand button-86" href="{{ url('/') }}">
                Domov
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="{{ __('Toggle navigation') }}">
                <span class="navbar-toggler-icon"></span>
            </button>
        </div>


        <div class="col-md-6" style="text-align:right; padding-right:5vw;">
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <!-- LEVI -->
                <ul class="navbar-nav me-auto"></ul>
                <!-- DESNI -->
                <ul class="navbar-nav ms-auto">
                    <div class="col-md-auto" style="cursor: pointer;" id="basketIcon">
                    <span class="basket-icon" style="margin-left: 5px;">
                        <img src="{{ asset('images/basket.png') }}" alt="Basket Icon" style="height: 7vh;">
                    </span>
                    </div>
                    <!-- auth -->
                    @guest
                        @if (Route::has('login'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('login') }}">{{ __('Prijava') }}</a>
                            </li>
                        @endif
                        @if (Route::has('register'))
                            <li class="nav-item">
                                <a class="nav-link" href="{{ route('register') }}">{{ __('Registracija') }}</a>
                            </li>
                        @endif
                    @else
                        <li class="nav-item dropdown">
                            <a id="navbarDropdown" class="nav-link dropdown-toggle" style="min-width:4vw; text-align:center" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" v-pre>
                                {{ Auth::user()->name }}
                            </a>
                            <div class="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                                <a class="dropdown-item" href="{{ route('logout') }}"
                                    onclick="event.preventDefault();
                                    document.getElementById('logout-form').submit();">
                                    {{ __('Odjava') }}
                                </a>
                                <form id="logout-form" action="{{ route('logout') }}" method="POST" class="d-none">
                                    @csrf
                                </form>
                            </div>
                        </li>
                    @endguest
                </ul>
            </div>
        </div>
    </nav>
</div>


<style>
    #basketPopup {
        position: fixed;
        top: 0;
        right: 0;
        z-index: 1000;
        background-color: white;
        border: 2px solid #AACBF7;
        border-radius: 8px; /* oglati robovi */
        padding: 10px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); /* shadow */
        margin-top: 10vh;
        margin-right:5vw;
    }

    .popup-content {
        /* Optionally add additional styling for the popup content */
    }
</style>


<div id="app">

</div>


<div id="basketPopup" class="popup" style="display: none;">
    <div class="popup-content" id="basketContent">
        <p>Test</p>
        <button>Test Button</button>
    </div>
</div>
<link rel="stylesheet" href="{{ asset('css/basket.css') }}">
<script src="{{ asset('js/basket.js') }}"></script>