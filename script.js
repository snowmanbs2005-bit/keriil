"use strict";

document.addEventListener("DOMContentLoaded", function () {

    (function clock() {
        var el = document.getElementById("clock");
        if (!el) return;
        function tick() {
            var d = new Date();
            var h = String(d.getHours()).padStart(2, "0");
            var m = String(d.getMinutes()).padStart(2, "0");
            var s = String(d.getSeconds()).padStart(2, "0");
            el.textContent = h + ":" + m + ":" + s;
        }
        tick();
        setInterval(tick, 1000);
    })();


    (function slider() {
        var track = document.getElementById("sliderTrack");
        if (!track) return;
        var slides = track.children;
        var total = slides.length;
        var current = 0;
        var autoTimer = null;
        var dotsBox = document.getElementById("dots");

        for (var i = 0; i < total; i++) {
            var dot = document.createElement("button");
            dot.className = "dot";
            dot.setAttribute("aria-label", "Слайд " + (i + 1));
            (function (idx) {
                dot.addEventListener("click", function () { goTo(idx); });
            })(i);
            dotsBox.appendChild(dot);
        }
        var dots = dotsBox.children;

        function render() {
            track.style.transform = "translateX(-" + current * 100 + "%)";
            for (var j = 0; j < dots.length; j++) {
                dots[j].classList.toggle("is-active", j === current);
            }
        }
        function goTo(idx) { current = (idx + total) % total; render(); }
        function next() { goTo(current + 1); }
        function prev() { goTo(current - 1); }

        function play() {
            if (autoTimer) return;
            autoTimer = setInterval(next, 2500);
        }
        function stop() {
            clearInterval(autoTimer);
            autoTimer = null;
        }

        document.getElementById("nextBtn").addEventListener("click", function () { next(); });
        document.getElementById("prevBtn").addEventListener("click", function () { prev(); });
        document.getElementById("playBtn").addEventListener("click", play);
        document.getElementById("stopBtn").addEventListener("click", stop);

        render();
        play();
    })();


    (function zoomOnHover() {
        var imgs = document.querySelectorAll(".zoom-img");
        imgs.forEach(function (img) {
            img.addEventListener("mouseenter", function () {
                img.style.transform = "scale(1.18)";
            });
            img.addEventListener("mouseleave", function () {
                img.style.transform = "scale(1)";
            });
        });
    })();


    (function menuHighlight() {
        var links = document.querySelectorAll(".nav__link");
        links.forEach(function (link) {
            link.addEventListener("mouseover", function () {
                link.classList.add("is-hover");
            });
            link.addEventListener("mouseout", function () {
                link.classList.remove("is-hover");
            });
        });

        var burger = document.getElementById("burger");
        var nav = document.querySelector(".nav");
        if (burger && nav) {
            burger.addEventListener("click", function () {
                nav.classList.toggle("is-open");
            });
            nav.addEventListener("click", function (e) {
                if (e.target.classList.contains("nav__link")) nav.classList.remove("is-open");
            });
        }
    })();


    (function formValidation() {
        var form = document.getElementById("feedbackForm");
        if (!form) return;

        function setError(id, msg) {
            var input = document.getElementById(id);
            var err = document.getElementById("err-" + id);
            if (err) err.textContent = msg;
            if (input) input.classList.toggle("is-invalid", !!msg);
            return !msg;
        }

        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var ok = true;

            var name = document.getElementById("name").value.trim();
            ok = setError("name", name.length < 2 ? "Введите имя (минимум 2 символа)" : "") && ok;

            var phone = document.getElementById("phone").value.trim();
            var phoneRe = /^[\+]?[\d\s\-\(\)]{10,}$/;
            ok = setError("phone", !phoneRe.test(phone) ? "Введите корректный номер телефона" : "") && ok;

            var email = document.getElementById("email").value.trim();
            var emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            ok = setError("email", !emailRe.test(email) ? "Введите корректный e-mail" : "") && ok;

            var agree = document.getElementById("agree").checked;
            ok = setError("agree", !agree ? "Необходимо согласие на обработку данных" : "") && ok;

            if (ok) {
                document.getElementById("formSuccess").classList.add("is-visible");
                form.reset();
                setTimeout(function () {
                    document.getElementById("formSuccess").classList.remove("is-visible");
                }, 5000);
            }
        });

        ["name", "phone", "email"].forEach(function (id) {
            document.getElementById(id).addEventListener("input", function () {
                setError(id, "");
            });
        });
    })();


    (function countdown() {
        var box = document.getElementById("countdown");
        if (!box) return;

        var target = new Date();
        target.setDate(target.getDate() + 14);
        target.setHours(23, 59, 59, 0);

        function update() {
            var diff = target - new Date();
            if (diff < 0) diff = 0;
            var days = Math.floor(diff / 86400000);
            var hours = Math.floor((diff % 86400000) / 3600000);
            var mins = Math.floor((diff % 3600000) / 60000);
            var secs = Math.floor((diff % 60000) / 1000);

            document.getElementById("cd-days").textContent = String(days).padStart(2, "0");
            document.getElementById("cd-hours").textContent = String(hours).padStart(2, "0");
            document.getElementById("cd-min").textContent = String(mins).padStart(2, "0");
            document.getElementById("cd-sec").textContent = String(secs).padStart(2, "0");
        }
        update();
        setInterval(update, 1000);
    })();

});
