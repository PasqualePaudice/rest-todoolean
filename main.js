$(document).ready(function(){

    // preparo il template handlebars

    var template_html= $('#template-quadrato').html();
    var function_quadrato =
    Handlebars.compile(template_html);

    stampaIstruzioni();

    $('button').click(function(){

        var valore = $('input').val();
        console.log(valore);
        $('input').val('');

        aggiungiIstruzione(valore);





    });

    $('.elenco').on('click','#delete', function(){

        var parent = $(this).parent().parent();
        var id_da_cancellare =parent.attr('data-id');


        $.ajax({
            'url':'http://157.230.17.132:3018/todos/' + id_da_cancellare,
            'method':'delete',
            success:function(data){


                stampaIstruzioni();

            },
            error:function(){
                alert('errore ');
            }

        });

    });


// ----------------- FUNZIONI -----------------

function stampaIstruzioni(){
    $.ajax({
        'url':'http://157.230.17.132:3018/todos',
        'methods':'GET',
        success:function(data) {

            $('.elenco').empty();
            var compilazione='';
            // ciclo le istruzione nell'elenco
            for (var i = 0; i < data.length; i++) {

                var istruzione_corrente = data[i] ;

                compilazione = {
                    'messaggio' : istruzione_corrente.text,
                    'id': istruzione_corrente.id
                };

                $('.elenco').append(function_quadrato(compilazione));

            };

        },
        error:function(){
            alert('errore ');
        }

    });

}

function aggiungiIstruzione(val){
$.ajax({
    'url':'http://157.230.17.132:3018/todos',
    'method':'post',
    'data':{
        'text': val
    },
    success:function(data){

        console.log(data);
        stampaIstruzioni();

    },
    error:function(){
        alert('errore ');
    }

});
}





});
