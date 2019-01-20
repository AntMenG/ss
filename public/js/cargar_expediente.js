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
		var file = e.originalEvent.dataTransfer.files;
		form_expediente = new FormData();
		form_expediente.append(
			"csrfmiddlewaretoken", 
            $('input[name="csrfmiddlewaretoken"]').val()
        );
		form_expediente.append(
			"empleado_id", 
            $('input[name="empleado_id"]').val()
        );
		for (var i = 0; i < file.length; i++) {
			form_expediente.append('document', file[i]);
		}
	});
    // Abrir input file al dar click
    $("#uploadfile").click(function(){
        $("#file-upload").click();
    });
    // Agregando archivos desde input file
    $("#file-upload").change(function(){
		event.preventDefault();
        $("h1").text("¡Listo para subir!");
        var form = $('#cargar_expediente')[0];
		form_expediente = new FormData(form);
    });
    // Enviando formulario
	$("#button-upload").click(function (event) {
        event.preventDefault();
        if (form_expediente) {
            form_expediente.set(
                'empleado_id', 
                $('input[name="empleado_id"]').val()
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
                success: function (data) {
                    alert(JSON.stringify(data));
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
        $("h1").text("Arrastra archivos aquí o da click para seleccionarlos");
    }); 
});