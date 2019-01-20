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
		var action = $(this).text();
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
			var ignore = ['id','nombre','apellidos']
			$('#item-info').html('');
			for (var key in response) {
				if (
					key === ignore[0] || 
					key === ignore[1] || 
					key === ignore[2]
				) {	} else {
					var section = $(document.createElement('section'));
					var h5 = $(document.createElement('h5'));
					var span = $(document.createElement('span'));
					h5.text(key.toUpperCase());
					span.text(response[key]);
					section.append(h5);
					section.append(span);
					$('#item-info').append(section);
				}
			}
			if (action == "ORDENAR EXPEDIENTE") {
				buscar_expediente(id, token);
			}
			$('input[name="empleado_id"]').val(id);
			showPanel($('#PubExp'));
		});
	});
	// Buscamos en la base de datos el expediente
	function buscar_expediente (id, token) {
		$('#OrdExpP #PubWrapper .drag_zone').html('');
		$.post('/home/buscar_expediente/', {
			id: id,
			'csrfmiddlewaretoken': token
		}, function (response) {
			if (response.status == 'done') {
				var expedientes = response.data;
				for (var i = 0; i < expedientes.length; i++) {
					var img = $(document.createElement('img'));
					img.attr({
						'id' : 'i' + expedientes[i]['id'],
						'src' : '/media/' + expedientes[i]['document'],
						'data-empleado' : expedientes[i]['empleado_id']
					});
					$('#OrdExpP #PubWrapper .drag_zone[data-tipo="' + 
						expedientes[i]['tipo'] + 
					'"]').append(img);
				}
			} else {

			}
			$('#OrdExpP .help span').text(response.text);
		});
	}
	$('#cancelPE').on('click', function () {
		pubExp = false;
		$('#BusExp').click();
	});
	$("#morePE").on('click', function () {
		if ($(this).hasClass('active')) {
			$(this).removeClass('active');
			$('#cabecera').removeClass('active');
		} else {
			$(this).addClass('active');
			$('#cabecera').addClass('active');
		}
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
	$('.preview-area').on('dblclick', 'img', function () {
		close = '#preview';
		$('#preview').html('');
		var img = $(document.createElement('img'));
		img.attr('src', $(this).attr('src'));
		$('#preview').append(img);
		$('#preview').css('display', 'flex');
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