var ope = null;

function init(){
    $('#ac').click(function(e){
        ac(e);
    });

    $('#limpa').click(function(e){
        limpa(e);       
     });

    $('.numbers').click(function(e){
        number(e.target.value);
    })

    $('.operation').click(function(e){
        operation(e.target.value);
    })

    $('.equal').click(function(e){
        equal(e);
    })

    $( "body" ).keydown(function(e) {
        digit(e);
    });
    $('.point').click(function(e){
        point();
    })

}
function digit(e){
    var digito = e.originalEvent.key;
    if(isNumber(digito) || digito == 0){
        number(digito);
    }if(digito == '*' || digito == 'x' ||digito == 'X'){
        operation("X");
    }if(digito == "+" || digito == "-" || digito == "-" || digito == "/"){
        operation(digito);
    }if(digito == 'Backspace'){
        var texto = $('#tela').val();
        $('#tela').val(texto.substring(0,texto.length-1));
        if($('#tela').val()=="")$('#tela').val(0);
    }if(digito == "Enter"){
        equal(digito);
    }if(digito == ','){
        point();
    }
}

function point(){
    $('#tela').val(parseFloat($('#tela').val()).toFixed(1));
}
function operation(operacao){
    var valor =$("#tela").val();
    if(ope != null && ope != operacao){
        ope = operacao;
        $('.op').html(operacao);
    }if (isValid(ope) && isValid(valor)){
        equal(operacao);
        processOperation(operacao);
    }else{
        processOperation(operacao);
    }
}

function ac(e){
    $('.op').html("");
    $("#tela").val("0");
    op = null;
    ope = null;
}
function limpa(e){
    $('.op').html("");
    $("#tela").val("0");
    $('#historico').html("");
    op = null;
    ope=null;
}
function number(e){
    escreveTela(e);
    atualizaTela();
}
function processOperation(operacao){
    if(ope != null) return;

    atualizaTela();

    var atual = $('#tela').val();
    if(atual == 0 || atual == ""){
        return;
    }

    $('.op').html(operacao);

    if(ope != null) $('.equal').click();

    ope = operacao;

     $("#historico").append("<div>" + $("#tela").val() + "</div>");
     $("#tela").val("");

    atualizaTela();
}

function equal(e){
    var privalor = $('#historico div').last().html().replace(ope, '');
    var segvalor = $("#tela").val();
    $("#historico").append("<div>" + $("#tela").val() + "</div>");

    var resultado = calcula(privalor, segvalor, ope);

    atualizaTela();
    $('#tela').val(resultado);
     ope = null;
     $('.op').html("");
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
    }else if(escrito.indexOf('.0')>0 && texto != '0'){
        $("#tela").val(escrito.substr(0, escrito.length-1)+texto);
    }else{
        $("#tela").val(escrito + texto);
    }
    atualizaTela();
}


function atualizaTela(){
    var objDiv = document.getElementById("historico");
    objDiv.scrollTop = objDiv.scrollHeight;
}
function isValid(e){
    return e != null && e != 0 & e != '';
}


function isNumber(value) {
   try{
        var result = value/value;
        return result == 1;
   }catch(e){
       return false;
   }
}

init();