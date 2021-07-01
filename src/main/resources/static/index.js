var ope = null;


function init(){
    
    $("#tela").val("0");
    $('#ac').click(function(e){
        $('.op').html("");
        $("#tela").val("0");
        op = null;
        ope=null;


    });
    $('#limpa').click(function(e){
                       $('.op').html("");
                       $("#tela").val("0");
                       $('#historico').html("");
                       op = null;
                       ope=null;
     });

    $('.numbers').click(function(e){
          escreveTela(e.target.value);
          scrollTela();
    })

    $('.operation').click(function(e){

        if(ope != null){
            return;
        }

        scrollTela();

        var atual = $('#tela').val();
        if(atual == 0 || atual == ""){
            return;
        }

        $('.op').html(e.target.value);

        var operacao = e.target.value;


        if(ope != null){
               $('.equal').click();
        }

        ope = operacao;

         $("#historico").append("<div>" + $("#tela").val() + "</div>");
         $("#tela").val("");


        scrollTela();
    })

    $('.equal').click(function(e){
           var privalor = $('#historico div').last().html().replace(ope, '');
           var segvalor = $("#tela").val();
           $("#historico").append("<div>" + $("#tela").val() + "</div>");

           var resultado = calcula(privalor, segvalor, ope);


           scrollTela();
           $('#tela').val(resultado);
            ope = null;
            $('.op').html("");
    })

}
function calcula(privalor, segvalor, operacao){
      if(operacao == "X"){
           return parseFloat(privalor) * parseFloat(segvalor);
      }
      if(operacao == '-'){
           return parseFloat(privalor) - parseFloat(segvalor);
      }
      if(operacao == '+'){
            return parseFloat(privalor) + parseFloat(segvalor);
      }
      if(operacao == '/'){
            return parseFloat(privalor) / parseFloat(segvalor);
      }
}


function escreveTela(texto){
    var escrito = $("#tela").val();
    if(escrito == 0){
        $("#tela").val(texto);
    }else{
        $("#tela").val(escrito + texto);
    }
    scrollTela();
}




function scrollTela(){
    var objDiv = document.getElementById("historico");
    objDiv.scrollTop = objDiv.scrollHeight;
}






init();