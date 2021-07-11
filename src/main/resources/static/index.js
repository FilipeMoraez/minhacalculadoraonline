var ope = null;
var free = true;
var path = window.location.pathname.substring(4,window.location.pathname.length);

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

    $('.btn').click(function(e){
       workspace();
    });

    $('#cacheAgora').click(function(e){
        cache();
    })
    $('.workspace').keydown(function(e) {
       onEnter(e.originalEvent.key);
    })

    if(window.location.href.indexOf("/my/")>=0){
        $('.workspace').val(path);
        $('.txt-bemvindo').html('Bem vindo a área de trabalho, ' + path + ' seu historico será mantido');
    }else{
        $('.txt-bemvindo').remove();
    }

    cache();

}

$(".workspace").on({
  keydown: function(e) {
    if (e.which === 32)
      return false;
  },
  change: function() {
    this.value = this.value.replace(/\s/g, "");
  }
});


function onEnter(digito){
        if(digito == 'Enter'){
            workspace();
        }
        if(digito == " "){
            return;
        }
}
function workspace(){
    var location = $('.workspace').val();
    if(location != ''){
            window.location.href = window.location.origin + '/my/' + location ;
    }
}
function digit(e){
    var digito = e.originalEvent.key;
    if(isNumber(digito) || digito == 0){
        number(digito);
    }if(digito == '*' || digito == 'x' ||digito == 'X'){
        operation("X");
    }if(digito == "/"){
        operation("÷");
    }if(digito == "+" || digito == "-" || digito == "-"){
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
    clean();
}
function number(e){
    if(free){
        escreveTela(e);
        atualizaTela();
    }
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
    if(free && $('#historico div').html() != undefined){
        var privalor = $('#historico div').last().html().replace(ope, '');
        var segvalor = $("#tela").val();
        $("#historico").append("<div class='resultline'>"+ $('.op').html() + $("#tela").val() + "</div>");

        calcula(privalor, segvalor, ope);


     }
}


function calcula(privalor, segvalor, operacao){
    if(operacao != null){
      var base = window.location.origin + '/calc/';

          if(operacao == "X")
                base += 'multiply';
          else if(operacao == '-')
                base += 'subtract';
          else if(operacao == '+')
                base += 'sum';
          else if(operacao == '/' || operacao == '÷')
                base += 'divide';

          $.ajax({
                      type:'POST',
                      url:base,
                      headers :{'Content-Type':'application/json'},
                      data: JSON.stringify({'first': privalor, 'second': segvalor }),
                      success : function(e){
                            atualizaTela();
                            $('#tela').val(e.result);
                            $("#historico").append("<div class='result'>"+ e.result + "</div>");
                            ope = null;
                            $('.op').html("");
                            cache();
                      }
                 });
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
function cache(){
      var path = window.location.pathname.substring(4,window.location.pathname.length);
      var base = window.location.origin + '/cache/'+path;
      var historico = $('#historico').html().trim();
      if(historico == ''){
            historico = '-';
      }
      free = false;
       $.ajax({
            type:'POST',
            url:base,
            data:historico,
            success:function(e){
                if(e == "-="){
                    free = true;
                    return;
                };
                atualizaTela();
                var resposta = e;
                resposta = resposta.replace("=-", "");

                while(resposta.indexOf("%3C")>=0) resposta = resposta.replace("%3C", "<")
                while(resposta.indexOf("%3E")>=0) resposta = resposta.replace("%3E", ">");
                while(resposta.indexOf("%2F")>=0) resposta = resposta.replace("%2F", "/")

                while(resposta.indexOf("%C3%B7")>=0) resposta = resposta.replace("%C3%B7", "÷")

                while(resposta.indexOf("%22")>=0) resposta = resposta.replace("%22", "\"");
                while(resposta.indexOf("div+")>=0) resposta = resposta.replace("div+", "div ");
                while(resposta.indexOf("%3D")>=0) resposta = resposta.replace("%3D", "=");


                $('#historico').html(resposta);
                $('#tela').val($('.result').last().html());

                free = true;
                atualizaTela();
                atualizaTela();

            }, error: function (error) {
                  free = true;
                  console.log(error);
            }
      });
}

function clean(){
      var path = window.location.pathname.substring(4,window.location.pathname.length);
      var base = window.location.origin + '/remove/'+path;

       $.ajax({
            type:'POST',
            url:base,
            success:function(e){
            }, error: function (error) {
                  console.log(error);
            }
      });
}




init();