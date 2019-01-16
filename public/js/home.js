$( function () {
	// Abrir Actions
	var pubExp = false;
    var actions = $('#actions');
    var tag_menu = $('#menu button');
    tag_menu.on('click', function () {
		var data_id = $(this).attr('id');
		if (data_id != 'PubExp' || pubExp) {
			showPanel(this);
		}
	});
	function showPanel(th) {
        var a_panel = '#actions-space > section';
		var data_panel = $(th).attr('data-panel');
		var panel = $(a_panel + data_panel);
		var title = '', text = '';
        tag_menu.attr('class','');
		$(th).attr('class','active');
		$('#pContent').attr('class','blur');
        actions.addClass('actionsVisible');
        $(a_panel).css('display','none');
		panel.css('display','block');
		text = $(th).attr('data-text');
		for (var i = 0; i < text.length; i++) {
			title += text[i] + '<br>';
		}
		$('#actions #title').html(title);
	}
    // Cerrar Actions
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
	// Abrir Publicar Expedientes
	$("#BusExpP").on('click', '.carDatos', function () {
		pubExp = true;
		showPanel($('#PubExp'));
	});
	$('#cancelPE').on('click', function () {
		pubExp = false;
		showPanel($('#BusExp'));
	});

});