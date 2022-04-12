function DefinirMatriz(){
    var alt = document.getElementById("Alternativas").value;
    var obj = document.getElementById("Objetivos").value;
    if (alt===""){
        alert("Digite a Quantidade de Alternativas")
    }
    if (obj===""){
        alert("Digite a Quantidade de Objetivos")
    }
    obj=Number(obj)+1
    alt=Number(alt)+2

    document.getElementById("matrizprincipal").style.display="block"
    document.getElementById("ul_1").style.display="block"
    var tabela=document.getElementById("tabelaprincipal")
    var variavel=""
    for(var i=0; i<obj; i++) {
        variavel+="<tr>"
        for(var j=0; j<alt; j++){
            if (i==0 && j==0){
                variavel+="<td><div id='matriz"+i+j+"'style='width:100px; backgroundColor:black;'></div></td>"
            }else if(i==0 && j==alt-1){
                variavel+="<td><div id='matriz"+i+j+"'style='width:100px;'>Máx ou Mín</div></td>"
            }else if(j==alt-1){
                variavel+="<td><INPUT TYPE='RADIO' NAME='"+i+"'VALUE='máx'>máx<INPUT TYPE='RADIO' style='margin-left:4px;' NAME='"+i+"'VALUE='mín'>mín</td>"
            }else if(i==0){
                variavel+="<td><input id='matriz"+i+j+"' placeholder='Alternativa "+j+"' style='width:100px'; type='text'></td>"
            }else if(i>0 && j==0){
                variavel+="<td><input id='matriz"+i+j+"' placeholder='Objetivo "+i+"' style='width:100px'; type='text'></td>"         
            }else{
                variavel+="<td><input id='matriz"+i+j+"' style='width:100px'; type='text'></td>"
            }
        }
        variavel+="</tr>"
    }
    tabela.innerHTML+=variavel
    document.getElementById("dominancia").style.display="block"
    document.getElementById("Alternativas").style.display="none"
    document.getElementById("Objetivos").style.display="none"
    document.getElementById("1").style.display="none"
    document.getElementById("2").style.display="none"
    document.getElementById("ok").style.display="none"
}

//Botao DOMINANCIA
function VerificarDominancia(){
    var alte = document.getElementById("Alternativas").value;
    var obje = document.getElementById("Objetivos").value;
    var obj=Number(obje)+1
    var alt=Number(alte)+1
    alternativas=[]
    objetivos=[]
    for (i=1; i<alt; i++){
        alternativas.push(document.getElementById("matriz0"+i).value)
    }
    for (i=1; i<obj; i++){
        objetivos.push(document.getElementById("matriz"+i+"0").value)
    }
    var cont
    var iguais
    var dominadas=[]
    for (k=1; k<alt; k++){
        for (j=1; j<alt; j++){
            cont=0
            iguais=0
            for (i=1; i<obj; i++){
                var soun = document.getElementsByName(i)
                for(var c=0; c<soun.length; c++) {
                    if(soun[c].checked) var selected = soun[c].value;
                }

                if (selected=="máx"){
                    if (Number(document.getElementById("matriz"+i+k).value)>=Number(document.getElementById("matriz"+i+j).value)){
                        cont=cont+1
                    }
                    if (Number(document.getElementById("matriz"+i+k).value)==Number(document.getElementById("matriz"+i+j).value)){
                        iguais=iguais+1
                    }
                }else{
                    if (Number(document.getElementById("matriz"+i+k).value)<=Number(document.getElementById("matriz"+i+j).value)){
                        cont=cont+1
                    }
                    if (Number(document.getElementById("matriz"+i+k).value)==Number(document.getElementById("matriz"+i+j).value)){
                        iguais=iguais+1
                    }
                }
            }
            if (cont==obj-1 && cont!=iguais){
                if (dominadas.length==0){
                    dominadas.push(j)
                } else{
                    contador=0
                    for (p=0;p<dominadas.length;p++){
                        if (dominadas[p]==j){
                            contador=contador +1
                        }
                    }
                    if (contador == 0){
                        dominadas.push(j)
                    }

                }
            }
        }

    }
    
    var Ndominadas=[]
    alternativas_ativas=document.getElementById("var_sobraram")
    var antigas=alternativas_ativas.textContent.split(",")
    alternativas_ativas.innerHTML=""
    
    for (t=1;t<alternativas.length+1;t++){
        cont=0
        for (r=0;r<dominadas.length;r++){
            if (t==dominadas[r]){
                cont=cont+1
            }
        }
        if (cont==0){
            Ndominadas.push(t)
        }
    }
    
    if (antigas[0]!=""){
        antigas=Ndominadas.concat(antigas)
        var Naodom=[]
        for (var i=0;i<antigas.length;i++){
            cont=0
            for (var j=0;j<antigas.length;j++){
                if (Number(antigas[i])==Number(antigas[j])){
                    cont=cont+1
                }
            }
            if (cont>1){
                cont2=0
                for (var k=0;k<Naodom.length;k++)
                    if (antigas[i]==antigas[k]){
                        cont2=cont2+1
                    }
                    if (cont2==0){
                        Naodom.push(antigas[i])
                    }
            }
        }
        Ndominadas=Naodom
    }

    for (var i=0; i<Ndominadas.length; i++){
        if (i==0){
            alternativas_ativas.innerHTML+=Ndominadas[i]
        }else{
            alternativas_ativas.innerHTML+=","+Ndominadas[i]
        }
        
    }

    if (Ndominadas.length==1){
        alert("Melhor Alternativa: "+alternativas[Number(Ndominadas[0])-1])
    }

    document.getElementById("tabelaprincipal").style.display="none"
    document.getElementById("ul_1").style.display="none"
    document.getElementById("ul_2").style.display="block"
    document.getElementById("dominancia").style.display="none"
    document.getElementById("comparar").style.display="block"

    var tabela=document.getElementById("tabelasecundaria")
    tabela.innerHTML=""
    var variavel=""
    for(var i=0; i<obj; i++) {
        variavel+="<tr>"
        for(var j=0; j<alt+1; j++){

            if (i==0 && j==0){
                variavel+="<td><div id='2matriz"+i+j+"'style='width:100px; backgroundColor:black;'></div></td>"
            }else if(i==0 && j==alt){
                variavel+="<td><div id='2matriz"+i+j+"'style='width:100px; height:28px;'>Máx ou Mín</div></td>"
            }else if(j==alt){
                var soun = document.getElementsByName(i)
                for(var c=0; c<soun.length; c++) {
                    if(soun[c].checked) var selected = soun[c].value;
                }
                variavel+="<td><div id='2matriz"+i+j+"'style='width:100px; height:28px;'>"+selected+"</div></td>"
            }else if(i==0){
                celula=document.getElementById("matriz"+i+j).value
                variavel+="<td><div id='2matriz"+i+j+"'style='width:100px; height:28px; border:1px solid;'>"+celula+"</div></td>"
            }else if(i>0 && j==0){
                celula=document.getElementById("matriz"+i+j).value
                variavel+="<td><div id='2matriz"+i+j+"'style='width:100px; height:28px; border:1px solid;'>"+celula+"</div></td>"
            }else{
                celula=document.getElementById("matriz"+i+j).value
                variavel+="<td><div id='2matriz"+i+j+"'style='width:100px; height:28px; border:1px solid;'>"+celula+"</div></td>"
            }
        }
        variavel+="</tr>"
    }
    tabela.innerHTML+=variavel
    //dominadas vai ser o total - Ndominadas
    for (t=1;t<alternativas.length+1;t++){
        cont=0
        for (r=0;r<Ndominadas.length;r++){
            if (t==Ndominadas[r]){
                cont=cont+1
            }
        }
        if (cont==0){
            dominadas.push(t)
        }
    }
    if (dominadas.length>0){
        for(var i=0; i<obj; i++) {
            for(var j=0; j<alt+1; j++){
                for(var k=0; k<dominadas.length; k++){
                    document.getElementById("2matriz"+i+dominadas[k]).style.backgroundColor="black"
                    document.getElementById("2matriz"+i+dominadas[k]).style.color="white"
                }
            }
        }
    }

    var tabelainput=document.getElementById("tabelaaux")
    tabelaaux.innerHTML=""
    var variavel="<tr><td style='width:50px; padding-left:2px;'>1</td><td style='width:50px; padding-left:7px;'>2</td></tr>"
    for(var i=1; i<obj; i++) {
        variavel+="<tr>"
        variavel+="<td><INPUT TYPE='RADIO' NAME='obj1' VALUE='"+i+"'></td><td><INPUT TYPE='RADIO' style='margin-left:4px;' NAME='obj2' VALUE='"+i+"'></td>"
        variavel+="</tr>"
    }
    tabelainput.innerHTML+=variavel

}

//Botao COMPARAR    
function Comparar(){
    document.getElementById("tabelaalteracao").style.display="block"
    //linha da tabela para fazer as mudanças
    var princ = document.getElementsByName("obj1")
    for(var i=0; i<princ.length; i++) {
        if(princ[i].checked) var princ_s = princ[i].value;
    } 

    var aux = document.getElementsByName("obj2")
    for(var i=0; i<aux.length; i++) {
        if(aux[i].checked) var aux_s = aux[i].value;
    }    
    document.getElementById("comparar").style.display="none"
    
    //colunas das alternativas que sobraram
    var colunas=document.getElementById("var_sobraram").textContent.split(",")

    var tabelaaux=document.getElementById("tabelaalteracao")
    tabelaaux.innerHTML=""
    var variavel=""

    for(var i=0; i<3; i++) {
        variavel+="<tr>"
        if (i==0){
            k=0
        }else if (i==1){
            k=princ_s
        }else{
            k=aux_s
        }
        for(var j=0; j<(colunas.length+2); j++){
            //primeira coluna
            if (j==0){
                l=0
                if (i==0){
                    variavel+="<td><div id='3matriz"+i+j+"'style='width:100px; backgroundColor:black;'></div></td>"
                }else{
                    celula=document.getElementById("2matriz"+k+l).textContent
                    variavel+="<td><div id='3matriz"+i+j+"'style='width:100px; height:28px; border:1px solid;'>"+celula+"</div></td>"
                }
            //última coluna
            }else if(j==colunas.length+1){
                l=Number(document.getElementById("Alternativas").value)+1
                if(i==0){
                    variavel+="<td><div id='3matriz"+i+j+"'style='width:100px;'>Máx ou Mín</div></td>"
                }else{
                    celula=document.getElementById("2matriz"+k+l).textContent
                    variavel+="<td><div id='3matriz"+i+j+"'style='width:100px; height:28px; border:1px solid;'>"+celula+"</div></td>"
                }
            //demais colunas
            }else{
                l=colunas[j-1]
                if(i==0){
                    celula=document.getElementById("2matriz"+k+l).textContent
                    variavel+="<td><div id='3matriz"+i+j+"'style='width:100px; height:28px; border:1px solid;'>"+celula+"</div></td>"
                }else{
                    celula=document.getElementById("2matriz"+k+l).textContent
                    variavel+="<td><input id='3matriz"+i+j+"' style='width:100px' value='"+celula+"'; type='text'></td>"
                }
            }
        }variavel+="</tr>"
        
    }
    tabelaaux.innerHTML+=variavel
    document.getElementById("analisado").style.display="block"

}

function Analisado(){
    var alt = document.getElementById("Alternativas").value;
    alt=Number(alt)+2
    var princ = document.getElementsByName("obj1")
    for(var i=0; i<princ.length; i++) {
        if(princ[i].checked) var princ_s = princ[i].value;
    } 
    var aux = document.getElementsByName("obj2")
    for(var i=0; i<aux.length; i++) {
        if(aux[i].checked) var aux_s = aux[i].value;
    }    
    //duas linhas: primeira linha da tabelainput = linha princ_s
    //segunda linha da tabeladiv = linha aux_s
    var colunas=document.getElementById("var_sobraram").textContent.split(",")
    var comparacao=document.getElementById("3matriz11").textContent
    var cont
    for (var i=2;i<colunas.length+1;i++){
        if (comparacao!=document.getElementById("3matriz1"+i).textContent){
            cont=cont+1
        }
    }

    if (cont==0){
        alert("O objetivo principal precisa ser igual para todas as alternativas")
        //tenho que mudar aqui
    } else if (cont==0){

    }else{
        var alterar
        var alteradora
        for (var i=0;i<3;i++){
            if (i==0){
                k=i
            }else if(i==1){
                k=princ_s
            }else{
                k=aux_s
            }
            for (var j=0;j<(colunas.length+1);j++){
                if (j==0){
                    l=0
                } else{
                    l=colunas[j-1]
                }
                if (i==0 || j==0){
                    alterar=document.getElementById("matriz"+k+l)
                    alteradora=document.getElementById("3matriz"+i+j)
                    alterar.value=alteradora.textContent
                }else{
                    alterar=document.getElementById("matriz"+k+l)
                    alteradora=document.getElementById("3matriz"+i+j)
                    alterar.value=alteradora.value  
                }
            }
        }
        document.getElementById("tabelaalteracao").style.display="none"
        document.getElementById("analisado").style.display="none"
        VerificarDominancia()
    }
    for (var j=0; j<alt; j++){
        document.getElementById("2matriz"+princ_s+j).style.backgroundColor="black"
        document.getElementById("2matriz"+princ_s+j).style.color="white"
    }
}
