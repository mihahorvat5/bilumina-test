<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css">

<footer class="footer text-light fixed-bottom" style="background-color: #D0BFFF; width: 100%; min-height: 3vh; font-size: 1.8vh; z-index: 1000;">
    <div class="container" style="width:100vw; display: flex; align-items: center; background-color: #D0BFFF;">
        <div class="row" style="color:black; width: 100%;">
            <div class="col-4" style="text-align:left;">Marec 2024</div>
            <div class="col-4 text-center" style="text-align:right">Bilumina - delavnica</div>
            <div class="col-4 text-right" style="text-align:right">


            <p style="cursor: pointer; margin: 0; padding: 0;" onclick="openModal()">Socials</p>



            </div>
        </div>
    </div>
</footer>




                <!-- POPUP -->
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true" style="font-family: 'Comic Sans MS', cursive, sans-serif; color: white; background-color:black; text-align:center;">
                    <div class="modal-dialog modal-xl" style="min-width: 65vw; overflow-y: auto; margin-top: 10vh; margin-bottom: 3vh;">
                        <div class="modal-content"style="font-family: 'Comic Sans MS', cursive, sans-serif; color: white; background-color:black">
                            <div class="modal-header justify-content-center text-center">
                                <h5 class="modal-title mx-auto" id="exampleModalLabel">Socials</h5> <!-- Center the title -->
                            </div>

                            <div class="modal-body text-center"> <!-- Center body content -->
    <div class="social-icons row justify-content-center">
        <div class="col-4" style="text-align:right;">
            <a href="https://m.facebook.com/BiLumina/" target="_blank" rel="noopener noreferrer"><i class="fab fa-facebook-f" style="font-size: 7.5em;"></i></a>
        </div>
        <div class="col-4">
            <a href="https://www.bilumina.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-instagram" style="font-size: 7.5em;"></i></a>
        </div>
        <div class="col-4" style="text-align:left;">
            <a href="https://www.bilumina.com/" target="_blank" rel="noopener noreferrer"><i class="fab fa-twitter" style="font-size: 7.5em;"></i></a>
        </div>
        <div class="col-12 mt-3">
            <a href="https://www.bilumina.com/" target="_blank" rel="noopener noreferrer"><i class="fas fa-globe" style="font-size: 7.5em;"></i></a>
        </div>
    </div>
</div>

                            <div class="modal-footer justify-content-center">
                            </div>
                        </div>
                    </div>
                    <button type="button" class="btn button-1" data-bs-dismiss="modal">Zapri</button>
                </div>

                <script>
                    function openModal() {
                        $('#exampleModal').modal('show');
                    }
                </script>
<link rel="stylesheet" href="{{ asset('css/buttons.css') }}">