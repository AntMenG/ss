$( function () {
    // Abrir Actions
    var tag_menu = $('#menu button');
    var actions = $('#actions');
    tag_menu.on('click', function () {
        tag_menu.attr('class','');
        $(this).attr('class','active');
        actions.addClass('actionsVisible');
    });
    //Cerrar Actions
    $('.closeA').on('click', function () {
        tag_menu.attr('class','');
        actions.removeClass('actionsVisible');
    });
});