fetch('/assets/images/athena-chronicles-logo.svg')
    .then(function(response) {
        return response.text();
    })
    .then(function(svgCode) {
        document.getElementById('logo-slot').innerHTML = svgCode;
    });