var app = {
    isLoading: true,
    visibleCards: {},
    games: [],
    spinner: document.querySelector('.loader')
};

app.getGames = function (force) {
    var url = 'http://mycollectionsapi.paulorobertoelias.com.br/api/Games';
    var request = new XMLHttpRequest();
    request.onreadystatechange = function () {
        if (request.readyState === XMLHttpRequest.DONE) {
            if (request.status === 200) {
                app.games = request.response;
                // localStorage.setItem("games", app.games);
            }
        }
    };
    request.open('GET', url, false);
    request.send();

    app.renderizeGames();
    app.spinner.setAttribute('hidden', true);

};

app.renderizeGames = function () {
    var items = [];
    var games = JSON.parse(app.games);
    for (var index in games) {
        var game = games[index];

        items.push(
            "<span id='" + index + "' class='game'>" +
            "<img class='cover' src='" + game.cover + "' alt='logo' data-game='" + game.name + "' data-toggle='modal' data-target='#myModal' /img>" +
            "</span>"
        );
    }

    var wrapper = document.createElement("div");
    wrapper.setAttribute('class', 'container-fluid');
    wrapper.innerHTML = items.join("");

    var main = document.querySelector('div.main_div');
    main.appendChild(wrapper);

};

window.onload = function () {
    app.getGames(false);
    $('#myModal').on('show.bs.modal', function (event) {
        var modal = $(this)
        var button = $(event.relatedTarget)
        var recipient = button.data('game')
        modal.find('.modal-title').text(recipient)
    });
}
