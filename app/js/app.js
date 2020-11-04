window.addEventListener('load', function(){

    document.querySelectorAll('.animatedAppear').forEach(item => {
        animate(item);
    });

    document.querySelectorAll('.animatedAppearUp').forEach(item => {
        animate(item);
    });

    document.querySelectorAll(".toggler").forEach(function(togglerElement) {
        togglerElement.addEventListener("click", function(){
            this.classList.toggle("open");
            document.getElementById(this.dataset.content).classList.toggle("open");
        }, false);
    });

}, false);