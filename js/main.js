document.addEventListener("DOMContentLoaded", function() {
    let meta = document.querySelector('meta[name="viewport"]');
    if (meta) {
        meta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
    }
    document.body.style.opacity = "1";
});