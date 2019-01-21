$(function () {
	// - - - - - - Cargar Expediente - - - - - -
	var form_expediente;
	$("#CarExpP").on("dragover", function(e) {
        e.preventDefault();
        e.stopPropagation();
        $("h1").text("Arrastra hasta aqui");
    });
    $("#CarExpP").on("drop", function(e) { e.preventDefault(); e.stopPropagation(); });
    // Arrastrando dentro
    $('.upload-area').on('dragenter', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("h1").text("Suelta");
    });
    // Arrastrando fuera
    $('.upload-area').on('dragover', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("h1").text("Suelta");
    });
    // Soltar
    $('.upload-area').on('drop', function (e) {
        e.stopPropagation();
        e.preventDefault();
        $("h1").text("¡Listo para subir!");
        $('.preview-area').html('');
        $('.preview-area').css('display','none');
		var file = e.originalEvent.dataTransfer.files;
        if (file.length) {
            preview(file);
        }
    });
    var preview = function(files) {
		form_expediente = new FormData();
        form_expediente.append(
            "csrfmiddlewaretoken", 
            $('input[name="csrfmiddlewaretoken"]').val()
        );
        form_expediente.append(
            "empleado_id", 
            $('input[name="empleado_id"]').val()
        );
		for(var i = 0, ii = files.length; i < ii; i++) {
			if (files[i].type.match(/image.*/) && typeof FileReader == 'function') {
				var reader = new FileReader();
				reader.onload = function(e) {
					var img = document.createElement('img');
					img.src = e.target.result;
					img.width = 200;
					$('.preview-area').append(img);
				}
				reader.readAsDataURL(files[i]);
                $('.preview-area').css('display','block');
            }
            form_expediente.append('document', files[i]);
		}
	};
    // Abrir input file al dar click
    $("#uploadfile").click(function(){
        $("#file-upload").click();
    });
    // Agregando archivos desde input file
    $("#file-upload").change(function(){
		event.preventDefault();
        if (this.files) {
            preview(this.files);
        }
        $('.preview-area').html('');
        $("h1").text("¡Listo para subir!");
        var form = $('#cargar_expediente')[0];
        form_expediente = new FormData(form);
    });
    // Enviando formulario
	$("#button-upload").click(function (event) {
        event.preventDefault();
        var empleado_id = $('input[name="empleado_id"]').val();
        if (form_expediente) {
            form_expediente.set(
                'empleado_id', 
                empleado_id
            );
            $.ajax({
                type: "POST",
                enctype: 'multipart/form-data',
                url: '/home/cargar_expediente/',
                data: form_expediente,
                processData: false,
                contentType: false,
                cache: false,
                timeout: 600000,
                success: function (response) {
                    alert(JSON.stringify(response));
                    if (response.status == "done") {
                        $('.target[data-empleado="' + empleado_id + '"] .e-status')
                        .addClass('true');
                        $('#cancelPE').click();
                    }
                    $("#button-upload").prop("disabled", false);
                },
                error: function (e) {
                    $("#button-upload").prop("disabled", false);
                }
            });
        } else {
            alert("Debes enviar archivos");
        }
        form_expediente = null;
        $('.preview-area').css('display','none');
        $('.preview-area').html('');
        $("h1").text("Arrastra archivos aquí o da click para seleccionarlos");
    });     
	$('#cancelPE').on('click', function () {
        form_expediente = null;
        $('.preview-area').css('display','none');
        $('.preview-area').html('');
        $("h1").text("Arrastra archivos aquí o da click para seleccionarlos");
	});
});