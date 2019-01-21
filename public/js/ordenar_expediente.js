$(function () {
	var drag_zone = $('.drag_zone');
    $('#ordenar-expediente').on('click', function () {
        var data = [], item = {}, len = 0;
        var token = $('#PubWrapper input[name="csrfmiddlewaretoken"]').val();
        drag_zone.each( function (index) {
            var tipo = $(this).attr('data-tipo');
            var img = $('> img', this);
            img.each( function (index) {
                var img_id = $(this).attr('id').split('i');
                var empleado_id = $(this).attr('data-empleado');
                if (tipo && img_id[1] && empleado_id) {
                    item = {
                        "tipo" : tipo,
                        "id" : img_id[1],
                        "empleado_id" : empleado_id
                    };
                    data.push(item);
                    len++;
                }
            });
        });
        if (data.length > 0) {
            _ordenar_expediente (data, token, len);
        }
    });
    function _ordenar_expediente (data, token, len) {
        $.post('/home/ordenar_expediente/', {
            "len" : len,
            "csrfmiddlewaretoken" : token,
            "data" : data
        }, function (response) {
            alert(response.text);
        });
    }
});