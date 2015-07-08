$(function() {

    var taux = 299; // 1BTC = 299€
    var precision = {'euro': 2,
                     'bitcoin': 5};

    function arrondi(nb, preci) {
        var puissance = Math.pow(10, preci);
        nb_arrondi = Math.round(nb * puissance) / puissance;
        return nb_arrondi;
    }

    $('input').keydown(function(ev) {
        if(typeof(ev.key) != 'undefined' && !$.isNumeric(ev.key) && ev.key.length == 1 && ev.key != '.'){
            ev.preventDefault();
        } else {
            var piece = $('<div/>', {'class': 'coin '+$(this).attr('id')});
            piece.css('left', Math.round(Math.random() * ($(window).innerWidth() - 100)));
            $('body').append(piece);
            var vitesse = 800 + Math.round(Math.random() * 700);
            piece.animate({'top': $(window).innerHeight()}, vitesse, 'linear', function(){
                $(this).remove();
            });
        }
    });

    $('input').keyup(function(ev) {
        var cible = $('#'+$(this).data('conv'));
        var taux_modifie = $(this).attr('id') == 'euro' ? 1 / taux : taux;
        var conversion = $(this).val() * taux_modifie;
        var precision_arrondi = precision[cible.attr('id')];
        conversion = arrondi(conversion, precision_arrondi);
        cible.val(conversion);
    })

});
