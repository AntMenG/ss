$(function () {
	// Abrir Actions
	var close;
	var pubExp = false;
	var hisExp = false;
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
		tag_menu.attr('class', '');
		$(th).attr('class', 'active');
		$('#pContent').attr('class', 'blur');
		actions.addClass('actionsVisible');
		$(a_panel).css('display', 'none');
		panel.css('display', 'block');
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
	$(document).on('keyup', function (e) {
		if (e.keyCode == 27) {
			switch (close) {
				case '#preview':
					$(close).css('display', 'none');
					close = null;
					break;
				default:
					closeA();
					break;
			}
		}
	});
	function closeA() {
		tag_menu.attr('class', '');
		actions.removeClass('actionsVisible');
		$('#pContent').attr('class', '');
	}
	// - - - - - - Abrir Publicar Expedientes - - - - - -
	$("#BusExpP").on('click', '.carDatos', function () {
		var id = $(this).attr('data-id');
		var token = $('input[name="csrfmiddlewaretoken"]').val();
		pubExp = true;
		$.post('/home/selecciona_empleado/', {
			id: id,
			'csrfmiddlewaretoken': token
		}, function (response) {
			var id = response.id,
				nombre = response.nombre,
				apellidos = response.apellidos,
				item_name = $('#cabecera #item-name'),
				item_photo = $('#cabecera #item-photo img');
			item_name.text(nombre + ' ' + apellidos);
			item_photo.attr('src','/media/photo/' + id + '.jpg');
			$('input[name="empleado_id"]').val(id);
			showPanel($('#PubExp'));
		});
	});
	$('#cancelPE').on('click', function () {
		pubExp = false;
		$('#BusExp').click();
	});
	$("#morePE").on('click', function () {
		$('#cabecera').css({
			'overflow': 'inherit',
			'min-height': '60px'
		});
	});
	// - - - - - - Evento de movimiento - - - - - -
	var drag = '';
	var drag_zone = $('.drag_zone');
	drag_zone.on('dragover', function (e) {
		e.preventDefault();
	});
	drag_zone.on('dragstart', 'img', function () {
		drag = $(this);
	});
	drag_zone.on('drop', function (e) {
		e.preventDefault();
		if ($(this).prop("tagName") != 'IMG') {
			$(this).append(drag);
		} else {
			$(this).parent().append(drag);
		}
	});
	drag_zone.on('dblclick', 'img', function () {
		close = '#preview';
		$('#preview').html('');
		var img = $(document.createElement('img'));
		img.attr('src', $(this).attr('src'));
		$('#preview').append(img);
		$('#preview').css('display', 'flex');
	});
	$('#preview').on('click', function (e) {
		if ($(e.target).prop("tagName") != 'IMG') {
			$('#preview').css('display', 'none');
		}
	});
	$('#preview').on('click', 'img', function () {
		var img = $(this);
		if (img.hasClass('zoom')) {
			img.removeClass('zoom');
		} else {
			img.addClass('zoom');
		}
	});
	$('.help button').on('click', function () {
		$(this).parent().css('display', 'none');
	});

	// Abrir Historial de Expedientes
	/*
	Cancela la funcionalidad de "cancelar subida de expediente"
	El historil no necesita ser cancelado. Al historial se podrá acceder siempre
	$("#HisExpP").on('click', function () {
		hisExp = true;
		showPanel($('#HisExp'));
	});
	$('#cancelPE').on('click', function () {
		hisExp = false;
		showPanel($('#HisExp'));
	});
	*/
});