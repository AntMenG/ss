$( function () {
    // Abrir Actions
    var actions = $('#actions');
    var tag_menu = $('#menu button');
    tag_menu.on('click', function () {
        var a_panel = '#actions-space > section';
		var data_panel = $(this).attr('data-panel');
		var panel = $(a_panel + data_panel);
		var title = '';
        tag_menu.attr('class','');
		$(this).attr('class','active');
		$('#pContent').attr('class','blur');
        actions.addClass('actionsVisible');
        $(a_panel).css('display','none');
		panel.css('display','block');
		for (var i = 0; i < $(this).text().length; i++) {
			title += $(this).text()[i] + '<br>';
		}
		$('#actions #title').html(title);
    });
    //Cerrar Actions
    $('.closeA').on('click', function () {
		closeA();
	});
	$(document).on('keyup',function (e) {
		if (e.keyCode == 27) { closeA(); }
	});
	function closeA() {
		tag_menu.attr('class','');
        actions.removeClass('actionsVisible');
		$('#pContent').attr('class','');
	}
});