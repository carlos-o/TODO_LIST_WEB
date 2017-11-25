var cont=0
var arrayObject=[]
var arrayObjectEdit=[]
var listcontent;
var contador=0
var splice;
var arrayCol=['col1','col2','col3']
var idDivList;
var band=1;
var size=0;
if(localStorage.getItem('token')==null || localStorage.getItem('token')==undefined){
    $(location).attr('href', 'index.html');
}
//recibe todos los notas creadas por el usuario
$.ajax({
  url:constants().todolists,
  method:'GET',
  headers: {"Authorization": 'token '+localStorage.getItem('token')},
  dataType:'JSON',
   success: function(data) {
     //console.log(data)
     for (var i = 0; i < data.length; i++) {
        listcontent=data[i].listcontent
        if(listcontent!=0){
            idDivList=elementBodyList(data[i].title,data[i].description,data[i].id,arrayCol[contador],data[i].modified)
            size=listcontent.length
            for (var j = 0; j < listcontent.length; j++) {
                //console.log(listcontent[j])
                //console.log(idDivList);
                checkElement(idDivList,listcontent[j].id,listcontent[j].description,listcontent[j].correct,listcontent[j].modified)

            }
            band=1
        }
        else{
          elementBody(data[i].title,data[i].description,data[i].id,arrayCol[contador],data[i].modified)
        }
        contador+=1
        if(contador==3){contador=0}
     }
   },
   error:function(res){
     console.log(res)
     if(res.status==500){
         alert('ERROR')
     }
   }
})
function elementBody(title,description,id,col,date){
  var firstDiv=document.createElement("div")
  var secondDiv = document.createElement("div")
  var thirdDiv = document.createElement("div")
  var elementSpan= document.createElement("SPAN")
  var elementP= document.createElement("p")
  var elementA=document.createElement("a")
  var elementI=document.createElement("I")
  var titleElement = document.createTextNode(capitalizeFirstLetter(title));
  var descriptionElement = document.createTextNode(capitalizeFirstLetter(description));
  var elementDelete = document.createTextNode("delete");
  var inputHidden = document.createElement('INPUT')
  firstDiv.setAttribute("class","card")
  secondDiv.setAttribute("id","card"+id)
  secondDiv.setAttribute("class","card-content tooltipped")
  secondDiv.setAttribute("onclick","modalElement('card"+id+"')")
  secondDiv.setAttribute("data-position","button")
  secondDiv.setAttribute("data-delay","50")
  secondDiv.setAttribute("data-tooltip","Click to edit note")
  elementSpan.setAttribute("class","card-title")
  elementSpan.setAttribute("style","font-weight:bold;")
  elementSpan.appendChild(titleElement)
  elementP.appendChild(descriptionElement)
  secondDiv.appendChild(elementSpan)
  secondDiv.appendChild(elementP)
  thirdDiv.setAttribute("class","card-action")
  elementA.setAttribute("class","btn-floating halfway-fab waves-effect waves-light blue tooltipped")
  elementA.setAttribute("style","bottom: -14px !important;right: -2px !important;")
  elementA.setAttribute("data-position","top")
  elementA.setAttribute("data-delay","50")
  elementA.setAttribute("data-tooltip","Remove note")
  elementA.setAttribute('onclick','deleteElement('+"'"+id+"'"+')')
  elementI.setAttribute("class","material-icons")
  inputHidden.setAttribute("type","hidden")
  inputHidden.setAttribute("value",date)
  inputHidden.setAttribute("id","iddate"+id)
  secondDiv.appendChild(inputHidden)
  elementI.appendChild(elementDelete)
  elementA.appendChild(elementI)
  thirdDiv.appendChild(elementA)
  firstDiv.appendChild(secondDiv)
  firstDiv.appendChild(thirdDiv)
  document.getElementById(col).appendChild(firstDiv)
}
function elementBodyList(title,description,id,col,date){
  var idDiv='checboxdisable'+id;
  var firstDiv =document.createElement("div")
  var secondDiv = document.createElement("div")
  var secondDiv_Div1 = document.createElement("div")
  var secondDiv_Div1Span = document.createElement("SPAN")
  var secondDiv_Div1SpanName = document.createTextNode(capitalizeFirstLetter(title));
  var secondDiv_Div1P = document.createElement("p")
  var secondDiv_Div1PName = document.createTextNode(capitalizeFirstLetter(description));
  var secondDiv_Div1Br = document.createElement("HR")
  var secondDiv_Div2 = document.createElement("div")
  var secondDiv_Div2Hidden = document.createElement("INPUT")
  // var secondDiv_Div2Br = document.createElement("BR")
  // var secondDiv_Div2Button = document.createElement("BUTTON")
  // var secondDiv_Div2ButtonName = document.createTextNode("Back");
  // var secondDiv_Div2Input = document.createElement("INPUT")
  var thirdDiv = document.createElement("div")
  var thirdDivFirstA = document.createElement("a")
  var thirdDivFirstAI = document.createElement("I")
  var thirdDivFirstAIName = document.createTextNode("edit");
  var thirdDivSecondA = document.createElement("a")
  var thirdDivSecondAI = document.createElement("I")
  var thirdDivSecondAIName = document.createTextNode("delete");
  firstDiv.setAttribute("class","card")
  secondDiv.setAttribute("class","card-content")
  secondDiv.setAttribute("id","cardList"+id)
  secondDiv_Div1.setAttribute("onclick","modalElementList('cardList"+id+"')")
  secondDiv_Div1.setAttribute("data-position","button")
  secondDiv_Div1.setAttribute("data-delay","50")
  secondDiv_Div1.setAttribute("data-tooltip","Click to edit note")
  secondDiv_Div1Span.setAttribute("class","card-title")
  secondDiv_Div1Span.setAttribute("style","font-weight:bold;")
  secondDiv_Div1Span.appendChild(secondDiv_Div1SpanName)
  secondDiv_Div1P.appendChild(secondDiv_Div1PName)
  secondDiv_Div1.appendChild(secondDiv_Div1Span)
  secondDiv_Div1.appendChild(secondDiv_Div1P)
  secondDiv_Div1.appendChild(secondDiv_Div1Br)
  secondDiv_Div2.setAttribute("id","checboxdisable"+id)
  secondDiv_Div2Hidden.setAttribute("type","hidden")
  secondDiv_Div2Hidden.setAttribute("id","hiddenlist"+id)
  secondDiv_Div2Hidden.setAttribute("value",date)
  // secondDiv_Div2Button.setAttribute('disabled','disabled')
  // secondDiv_Div2Button.setAttribute("type","button")
  // secondDiv_Div2Button.setAttribute("id","button"+id)
  // secondDiv_Div2Button.setAttribute("name","button"+id)
  // secondDiv_Div2Button.setAttribute("class","btn")
  // secondDiv_Div2Button.setAttribute("style","margin-right:20px;")
  // secondDiv_Div2Button.setAttribute("onclick","disabledContent('checboxdisable"+id+"')")
  // secondDiv_Div2Button.appendChild(secondDiv_Div2ButtonName)
  // secondDiv_Div2Input.setAttribute('disabled','disabled')
  // secondDiv_Div2Input.setAttribute("type","submit")
  // secondDiv_Div2Input.setAttribute("id","todolistbuttton"+id)
  // secondDiv_Div2Input.setAttribute("name","todolistbuttton"+id)
  // secondDiv_Div2Input.setAttribute("class","btn")
  // secondDiv_Div2Input.setAttribute("value","Edit")
  // secondDiv_Div2Input.setAttribute("onclick","editElementList('checboxdisable"+id+"')")
  secondDiv_Div1.appendChild(secondDiv_Div2Hidden)
  // secondDiv_Div2.appendChild(secondDiv_Div2Br)
  // secondDiv_Div2.appendChild(secondDiv_Div2Button)
  // secondDiv_Div2.appendChild(secondDiv_Div2Input)
  secondDiv.appendChild(secondDiv_Div1)
  secondDiv.appendChild(secondDiv_Div2)
  thirdDiv.setAttribute("class","card-action")
  thirdDivFirstA.setAttribute("class","btn-floating halfway-fab waves-effect waves-light red tooltipped")
  thirdDivFirstA.setAttribute("style","top: 5px;right: 45px;")
  thirdDivFirstA.setAttribute("data-position","left")
  thirdDivFirstA.setAttribute("data-delay","50")
  thirdDivFirstA.setAttribute("data-tooltip","Edit task")
  thirdDivFirstA.setAttribute("onclick","enabledContent('checboxdisable"+id+"')")
  thirdDivFirstAI.setAttribute("class","material-icons")
  thirdDivFirstAI.appendChild(thirdDivFirstAIName)
  thirdDivFirstA.appendChild(thirdDivFirstAI)
  thirdDivSecondA.setAttribute("class","btn-floating halfway-fab waves-effect waves-light blue tooltipped")
  thirdDivSecondA.setAttribute("style","bottom: -14px !important;right: -2px !important;")
  thirdDivSecondA.setAttribute("data-position","button")
  thirdDivSecondA.setAttribute("data-delay","50")
  thirdDivSecondA.setAttribute("data-tooltip","Remove note")
  thirdDivSecondA.setAttribute('onclick','deleteElement('+"'"+id+"'"+')')
  thirdDivSecondAI.setAttribute("class","material-icons")
  thirdDivSecondAI.appendChild(thirdDivSecondAIName)
  thirdDivSecondA.appendChild(thirdDivSecondAI)
  thirdDiv.appendChild(thirdDivFirstA)
  thirdDiv.appendChild(thirdDivSecondA)
  firstDiv.appendChild(secondDiv)
  firstDiv.appendChild(thirdDiv)
  document.getElementById(col).appendChild(firstDiv)
  return idDiv;
}
function checkElement(idDiv,idList,descriptionList,correctList,DateList){
  var id=idDiv.slice(13)
  var elementP= document.createElement('p')
  var elementPInput1= document.createElement('INPUT')
  var elementPInput2= document.createElement('INPUT')
  var elementPInput3= document.createElement('INPUT')
  var elementPLabel= document.createElement('LABEL')
  var elementPLabelName= document.createTextNode(capitalizeFirstLetter(descriptionList))
  var secondDiv_Div2Br = document.createElement("BR")
  var secondDiv_Div2Button = document.createElement("BUTTON")
  var secondDiv_Div2ButtonName = document.createTextNode("Back");
  var secondDiv_Div2Input = document.createElement("INPUT")
  elementPInput1.setAttribute("type","hidden")
  elementPInput1.setAttribute("id","idhiddenlist"+idList)
  elementPInput1.setAttribute("value",idList)
  // elementPInput2.setAttribute("type","text")
  // elementPInput2.setAttribute("id","datehiddenlist"+idList)
  // elementPInput2.setAttribute("value",DateList)
  elementPInput2.setAttribute("style","display:none;")
  elementPInput3.setAttribute('disabled','disabled')
  elementPInput3.setAttribute("id","box"+idList)
  elementPInput3.setAttribute("name","box"+idList)
  elementPInput3.setAttribute("type","checkbox")
  elementPInput3.setAttribute("class","filled-in")
  if(correctList ==true){
    elementPInput3.setAttribute('checked', 'checked');
  }
  elementPLabel.setAttribute("for","box"+idList)
  elementPLabel.setAttribute("style","color:#000000;")
  elementPLabel.appendChild(elementPLabelName)
  elementP.appendChild(elementPInput1)
  //elementP.appendChild(elementPInput2)
  elementP.appendChild(elementPInput3)
  elementP.appendChild(elementPLabel)
  document.getElementById(idDiv).appendChild(elementP)
  if(band==size){
    document.getElementById(idDiv).appendChild(secondDiv_Div2Br)
    secondDiv_Div2Button.setAttribute('disabled','disabled')
    secondDiv_Div2Button.setAttribute("type","button")
    secondDiv_Div2Button.setAttribute("id","button"+id)
    secondDiv_Div2Button.setAttribute("name","button"+id)
    secondDiv_Div2Button.setAttribute("class","btn")
    secondDiv_Div2Button.setAttribute("style","margin-right:20px;")
    secondDiv_Div2Button.setAttribute("onclick","disabledContent('"+idDiv+"')")//"disabledContent('checboxdisable"+id+"')")
    secondDiv_Div2Button.appendChild(secondDiv_Div2ButtonName)
    secondDiv_Div2Input.setAttribute('disabled','disabled')
    secondDiv_Div2Input.setAttribute("type","submit")
    secondDiv_Div2Input.setAttribute("id","todolistbuttton"+id)
    secondDiv_Div2Input.setAttribute("name","todolistbuttton"+id)
    secondDiv_Div2Input.setAttribute("class","btn")
    secondDiv_Div2Input.setAttribute("value","Edit")
    secondDiv_Div2Input.setAttribute("onclick","editElementList('"+idDiv+"')")
    document.getElementById(idDiv).appendChild(secondDiv_Div2Button)
    document.getElementById(idDiv).appendChild(secondDiv_Div2Input)
 }
 band+=1
}
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//deleten note
function deleteElement(idElement){
  var txt;
  var r = confirm("!You are  sure to delete this note?");
  if (r == true) {
      $.ajax({
        url:constants().todolist +'?pk='+ idElement,
        method:'DELETE',
        headers:{"Authorization": 'token '+localStorage.getItem('token')},
        dataType:'JSON',
        success:function(data){
            alert(data.response)
            location.reload()
        },
        error:function(res){
          if(res.status==404){
              alert(res.responseJSON.response)
          }
          if(res.status==500){
              alert('ERROR')
          }
        }
      })
  } else {
      txt = "You pressed Cancel!";
  }
}
$(document).ready(function() {
  $('#modal1').modal();
  $('#modal2').modal();
  $('#modal3').modal();
  $(".dropdown-button").dropdown();
  window.history.pushState(null, "", window.location.href);
        window.onpopstate = function() {
            window.history.pushState(null, "", window.location.href);
        };
});
//crea una nota del usuario
function validateElement(){
  jQuery.validator.setDefaults({
    debug: true,
    success: 'valid'
    });
    $('#todolist').validate({
      rules:{
        title:{
          required:true,
          minlength:6
        },
        description:{
          required:true,
          minlength:10
        }
      },
      messages:{
        title:{
          required:'The title cant be empty, write a title'
        },
        description:{
          required:'The note description cant be empty, write a description'
        }
      },
      submitHandler: function(){
        $.ajax({
          url:constants().todolist,
          method:'POST',
          headers: {"Authorization": 'token '+localStorage.getItem('token')},
          data:{
            title:$('#title').val(),
            description:$('#description').val()
          },
          dataType:'JSON',
          success : function(data){
            console.log(data)
            $("#todolist").remove()
            $("#inputfiled").show()
            alert('New element has been created')
            location.reload()
          },
          error: function(res) {
            console.log(res)
            if(res.status==500){
                alert('ERROR')
            }
          }
        })
      }
    })
}
function modalElement(card){
  var content;
  var parse = String(card)
  splice = parse
  content = document.getElementById(parse).children
  $('#modaltitle').val(content[0].textContent)
  $('#modaltextarea').val(content[1].textContent)
  $('#modaldate').text(content[2].value)
  $('#modal1').modal('open')
}
$('#editnote').click(function(){
  var idnote = splice.slice(4);
  editNote(idnote);
})
//edita una nota
function editNote(idNote) {
  jQuery.validator.setDefaults({
    debug: true,
    success: 'valid'
    });
  $('#normalForm').validate({
    rules:{
        modaltitle:{
          required:true,
          minlength:6
        },
        modaltextarea:{
          required:true,
          minlength:10
        }
    },
    messages:{
      modaltitle:{
        required:'The title cant be empty, write a title'
      },
      modaltextarea:{
        required:'The note description cant be empty, write a description'
      }
    },
  submitHandler:function(){
    $.ajax({
      url:constants().todolist+'?pk='+idNote,
      method:'PUT',
      headers: {"Authorization": 'token '+localStorage.getItem('token')},
      data:{
        title:$('#modaltitle').val(),
        description:$('#modaltextarea').val()
      },
      dataType:'JSON',
      success: function(data){
        console.log(data)
        alert("The note has been updated")
        location.reload()
      },
      error:function(res){
        console.log(res)
        if(res.status==500){
              alert('ERROR')
        }
        if(res.status==400){
            alert('ERROR')
        }
      }
    })
  }
  })
}
//edit note list
function editElementList(idElement){
  var content;
  var secondContent;
  var pk;
  var id;
  var description;
  var correct;
  content = document.getElementById(String(idElement)).children
  pk=idElement.slice(14);
  //console.log(pk)
  for (var i = 0; i < content.length; i++) {
      if(content[i].tagName=="P"){
        secondContent = content[i].children
        for (var j = 0; j < secondContent.length; j++) {
          if(secondContent[j].type=="hidden"){
            id=secondContent[j].value
          }
          if(secondContent[j].type=="checkbox"){
            if(secondContent[j].checked==false){
              correct="None"
            }else{
              correct="True"
            }
          }
          if (secondContent[j].tagName=='LABEL') {
            description=secondContent[j].textContent
          }
        }
        arrayObjectEdit.push({
          'id':id,
          'description':description,
          'correct':correct
        })
      }
  }
  //console.log(arrayObjectEdit);
  $.ajax({
    url:constants().todolist+'?pk='+pk,
    method:'PUT',
    // contentType: 'application/json',
    headers: {"Authorization": 'token '+localStorage.getItem('token')},
    data://JSON.stringify(arrayData),
    {
        title:{},
        description:{},
        listcontent:JSON.stringify(arrayObjectEdit)
    },
    dataType:'JSON',
    success: function(data){
      console.log(data)
      alert("The note has been updated")
      location.reload()
    },
    error:function(res){
      console.log(res);
      if(res.status==500){
          alert('ERROR')
      }
    }
  })
}
// $( "#todoelement" ).submit(function( event ) {
//   console.log( $( this ).serializeArray() );
//   event.preventDefault();
// });
function validateElementList() {
  var second=''
  var el = document.getElementById("myList").children;
  for (var i=0; i<el.length; i++) {
    second=el[i].children;
    //console.log(second)
    for (var j = 0; j < second.length-1; j++) {
        //console.log(second[j].children[0].checked)
        //console.log(second[j+1].value)
        if(second[j].children[0].checked)
        arrayObject.push({
          'description':String(second[j+1].value),
          'correct':'True'
        })
        else{
          arrayObject.push({
            'description':String(second[j+1].value),
            'correct':'None'
          })
        }
        break
    }
  }
  //crea una nota con lista
  jQuery.validator.setDefaults({
    debug: true,
    success: 'valid'
    });
  $('#todoelement').validate({
    rules:{
      titlelist:{
        required:true,
        minlength:6
      },
      descriptionlist:{
        required:true,
        minlength:10
      }
    },
    messages:{
      titlelist:{
        required:'The title cant be empty, write a title'
      },
      descriptionlist:{
        required:'The note description cant be empty, write a description'
      }
    },
    submitHandler:function(){
      $.ajax({
        url:constants().todolist,
        method:'POST',
        // contentType: 'application/json',
        headers: {"Authorization": 'token '+localStorage.getItem('token')},
        data://JSON.stringify(arrayData),
        {
            title:$('#titlelist').val(),
            description:$('#descriptionlist').val(),
            listcontent:JSON.stringify(arrayObject)
        },
        dataType:'JSON',
        success: function(data){
          console.log(data)
          $("#todoelement").remove()
          $("#inputfiled").show()
          alert('New element with task has been created')
          location.reload()
        },
        error:function(res){
          console.log(res);
          if(res.status==500){
              alert('ERROR')
          }
        }
      })
    }
  })
}
// jQuery.validator.setDefaults({
//   debug: true,
//   success: 'valid'
//   });
// $('#todoelement').validate({
//   rules:{
//     titlelist:{
//       required:true,
//       minlength:6
//     },
//     descriptionlist:{
//       required:true,
//       minlength:10
//     }
//   },
//   messages:{
//     titlelist:{
//       required:'The title cant be empty, write a title'
//     },
//     descriptionlist:{
//       required:'The note description cant be empty, write a description'
//     }
//   },
//   submitHandler:function(){
//     $.ajax({
//       url:constants().todolist,
//       method:'POST',
//       // contentType: 'application/json',
//       headers: {"Authorization": 'token '+localStorage.getItem('token')},
//       data://JSON.stringify(arrayData),
//       {
//           title:$('#titlelist').val(),
//           description:$('#descriptionlist').val(),
//           listcontent:JSON.stringify(arrayObject)
//       },
//       dataType:'JSON',
//       success: function(data){
//         console.log(data)
//       },
//       error:function(res){
//         console.log(res);
//       }
//     })
//   }
// })
function deleteInput(elemenId,listId){
   var ul = document.getElementById(listId)
   var li=document.getElementById(elemenId)
   ul.removeChild(li);
}
function deleteInputElement(elemenId,listId,idList){
   var ul = document.getElementById(listId)
   var li = document.getElementById(elemenId)
   var r = confirm("!You are  sure to delete this element of the note?");
   if(r==true){
       ul.removeChild(li);
       $.ajax({
         url:constants().listdetail+'?pk='+idList,
         method:'DELETE',
         headers:{"Authorization": 'token '+localStorage.getItem('token')},
         dataType:'JSON',
         success:function(data){
            alert(data.response)
            location.reload()
         },
         error:function(res){
           if(res.status==500){
               alert('ERROR')
           }
           if(res.status==400){
               alert('ERROR')
           }
           if(res.status==404){
               alert(res.responseJSON.response)
           }
         }
       })
     }else {
         txt = "You pressed Cancel!";
     }
}
function createElementLi(listId,elementId,idInput,idCheckbox,idDiv) {
    cont+=1
    var elementLi = document.createElement("LI");
    var elementIunput = document.createElement("INPUT");
    var elementbtn = document.createElement("a");
    var elementI = document.createElement("I");
    var elementDiv = document.createElement("div")
    var elementDivInput = document.createElement("INPUT")
    var elementDivLabel = document.createElement("LABEL")
    var borrar = document.createTextNode("delete");
    elementIunput.setAttribute("type", "text");
    elementIunput.setAttribute("name", idInput+cont);
    elementIunput.setAttribute('id', idInput+cont);
    elementIunput.setAttribute("placeholder", "Elemento de lista");
    elementIunput.setAttribute("style", "width: 65%;");
    elementIunput.setAttribute('onkeyup',"whichButton(event,'"+idDiv+cont+"')");
    elementI.setAttribute("class", "material-icons");
    elementI.appendChild(borrar)
    elementbtn.setAttribute('class', 'btn-floating waves-effect waves-ligh red tooltipped');
    elementbtn.setAttribute('onclick',"deleteInput('"+elementId+cont+"','"+listId+"')")
    elementbtn.setAttribute('style','bottom: 0px !important;left:0px;')
    elementbtn.setAttribute('id', 'delete'+cont);
    elementbtn.setAttribute('data-position','right')
    elementbtn.setAttribute('data-delay','50')
    elementbtn.setAttribute('data-tooltip','Remove task')
    elementbtn.appendChild(elementI)
    elementDiv.setAttribute('id', idDiv+cont)
    elementDiv.setAttribute('style','display:none;')
    elementDivInput.setAttribute('type','checkbox')
    elementDivInput.setAttribute('name',idCheckbox+cont)
    elementDivInput.setAttribute('id',idCheckbox+cont)
    elementDivInput.setAttribute('class','filled-in')
    elementDivInput.setAttribute('onclick',"completedTask('"+idCheckbox+cont+"','"+idInput+cont+"')")
    elementDivLabel.setAttribute('for',idCheckbox+cont)
    elementDivLabel.setAttribute('style','top:3vh;')
    elementDivLabel.setAttribute('class','tooltipped')
    elementDivLabel.setAttribute('data-position','left')
    elementDivLabel.setAttribute('data-delay','50')
    elementDivLabel.setAttribute('data-tooltip','Task completed')
    elementDiv.appendChild(elementDivInput)
    elementDiv.appendChild(elementDivLabel)
    elementLi.setAttribute('id', elementId+cont);
    elementLi.setAttribute('style', 'padding:0px;');
    elementLi.appendChild(elementDiv);
    elementLi.appendChild(elementIunput);
    elementLi.appendChild(elementbtn);
    document.getElementById(listId).appendChild(elementLi);
}
function transform(){
  var form;
  $("#inputfiled").hide()
  // $("#inputshow").show()
  form= '<form name="todolist" id="todolist" method="POST">'
  form+='<div id="inputshow">'
  form+='<div class="input-field">'
  form+='<input type="text" id="title" name="title" placeholder="Title" style="width: 80%;">'
  form+='</div>'
  form+='<div class="input-field">'
  form+='<textarea id="description" name="description" placeholder="Note description" style="width: 80%;" class="materialize-textarea"></textarea>'
  form+='</div>'
  form+='<div style="display: table;margin: 0 auto;bottom: 10px;position: relative;" >'
  form+='<button type="button" name="button" onclick="retornar()" class="btn" style="margin-right: 20px;">back</button>'
  form+='<input type="submit" class="btn" onclick="validateElement()" name="listbuttton" value="new">'
  form+='</div>'
  form+='</div>'
  form+='</form>'
  $(".boxinput").append(form)
  // $("#todolist").remove()

}
function retornar(){
  $("#todolist").remove()
  $("#inputfiled").show()
  // $("#inputshow").hide()
}
function transformList(){
  $("#inputfiled").hide()
  var elementForm = document.createElement("FORM")
  var elementFormDiv1 = document.createElement("div")
  var elementFormDiv2 = document.createElement("div")
  var elementFormDiv3 = document.createElement("div")
  var elementFormDiv1Input = document.createElement("INPUT")
  var elementFormDiv2Text = document.createElement("TEXTAREA")
  var elementFormDiv3Button = document.createElement("BUTTON")
  var elementFormDiv3ButtonName = document.createTextNode("back")
  var elementFormDiv3Input = document.createElement("INPUT")
  var elementFormA= document.createElement("a")
  var elementFormAI= document.createElement("I")
  var elementFormAIName = document.createTextNode("add")
  var elementFormUl = document.createElement("UL")
  var elementFormUlLi = document.createElement("LI")
  var elementFormUlLiDiv = document.createElement("div")
  var elementFormUlLiDivInput = document.createElement("INPUT")
  var elementFormUlLiDivLabel = document.createElement("LABEL")
  var elementFormUlLiInput = document.createElement("INPUT")
  var elementFormUlLiA = document.createElement("a")
  var elementFormUlLiAI = document.createElement("I")
  var elementFormUlLiAIName = document.createTextNode("delete")

  elementForm.setAttribute('id','todoelement')
  elementForm.setAttribute('method','POST')
  elementFormDiv1.setAttribute("class","input-field")
  elementFormDiv1Input.setAttribute("type","text")
  elementFormDiv1Input.setAttribute("id","titlelist")
  elementFormDiv1Input.setAttribute("name","titlelist")
  elementFormDiv1Input.setAttribute("placeholder","Title")
  elementFormDiv1Input.setAttribute("style","width:80%;")
  elementFormDiv1.appendChild(elementFormDiv1Input)
  elementFormDiv2.setAttribute("class","input-field")
  elementFormDiv2Text.setAttribute("id","descriptionlist")
  elementFormDiv2Text.setAttribute("name","descriptionlist")
  elementFormDiv2Text.setAttribute("placeholder","Note description")
  elementFormDiv2Text.setAttribute("style","width:80%;")
  elementFormDiv2Text.setAttribute("class","materialize-textarea")
  elementFormDiv2.appendChild(elementFormDiv2Text)
  elementFormDiv3.setAttribute("style","display: table;margin: 0 auto;bottom: 10px;position: relative;")
  elementFormDiv3Button.setAttribute("type","button")
  elementFormDiv3Button.setAttribute("name","button")
  elementFormDiv3Button.setAttribute("class","btn")
  elementFormDiv3Button.setAttribute("style","margin-right:20px;")
  elementFormDiv3Button.setAttribute('onclick','retornarList()')
  elementFormDiv3Button.appendChild(elementFormDiv3ButtonName)
  elementFormDiv3.appendChild(elementFormDiv3Button)
  elementFormDiv3Input.setAttribute("type","submit")
  elementFormDiv3Input.setAttribute("class","btn")
  elementFormDiv3Input.setAttribute("name","todolistbuttton")
  elementFormDiv3Input.setAttribute("value","New")
  elementFormDiv3Input.setAttribute('onclick','validateElementList()')
  elementFormDiv3.appendChild(elementFormDiv3Input)
  elementFormUl.setAttribute("id","myList")
  elementFormUl.setAttribute("class","myList")
  elementFormUlLi.setAttribute("id","delete")
  elementFormUlLiDiv.setAttribute("id","CheckBox")
  elementFormUlLiDiv.setAttribute("style","display:none;")
  elementFormUlLiDivInput.setAttribute("id","check")
  elementFormUlLiDivInput.setAttribute("name","check")
  elementFormUlLiDivInput.setAttribute("type","checkbox")
  elementFormUlLiDivInput.setAttribute("class","filled-in")
  elementFormUlLiDivInput.setAttribute('onclick',"completedTask('check','inputlist')")
  elementFormUlLiDivLabel.setAttribute("for","check")
  elementFormUlLiDivLabel.setAttribute("style","top:3vh;")
  elementFormUlLiDivLabel.setAttribute("class","tooltipped")
  elementFormUlLiDivLabel.setAttribute("data-position","left")
  elementFormUlLiDivLabel.setAttribute("data-delay","50")
  elementFormUlLiDivLabel.setAttribute("data-tooltip","Task completed")
  elementFormUlLiDiv.appendChild(elementFormUlLiDivInput)
  elementFormUlLiDiv.appendChild(elementFormUlLiDivLabel)
  elementFormUlLi.appendChild(elementFormUlLiDiv)
  elementFormUlLiInput.setAttribute("type","text")
  elementFormUlLiInput.setAttribute("name","inputlist")
  elementFormUlLiInput.setAttribute("id","inputlist")
  elementFormUlLiInput.setAttribute("placeholder","Description of task")
  elementFormUlLiInput.setAttribute("style","width:65%;")
  elementFormUlLiInput.setAttribute("onkeyup","whichButton(event,'CheckBox')")
  elementFormUlLi.appendChild(elementFormUlLiInput)
  elementFormUlLiA.setAttribute("class","btn-floating waves-effect waves-ligh red tooltipped")
  elementFormUlLiA.setAttribute("onclick","deleteInput('delete','myList')")
  elementFormUlLiA.setAttribute("style","bottom: 0px !important;")
  elementFormUlLiA.setAttribute("data-position","right")
  elementFormUlLiA.setAttribute("data-delay","50")
  elementFormUlLiA.setAttribute("data-tooltip","Remove task")
  elementFormUlLiAI.setAttribute("class","material-icons")
  elementFormUlLiAI.appendChild(elementFormUlLiAIName)
  elementFormUlLiA.appendChild(elementFormUlLiAI)
  elementFormUlLi.appendChild(elementFormUlLiA)
  elementFormUl.appendChild(elementFormUlLi)
  elementFormA.setAttribute("class","btn-floating btn-large waves-effect waves-light red tooltipped")
  elementFormA.setAttribute("onclick","createElementLi('myList','delete','inputlist','check','Checkbox')")
  elementFormA.setAttribute("style","top: 35px;right: 10px;")
  elementFormA.setAttribute("data-position","bottom")
  elementFormA.setAttribute("data-delay","50")
  elementFormA.setAttribute("data-tooltip","Add new task")
  elementFormAI.setAttribute("class","material-icons")
  elementFormAI.appendChild(elementFormAIName)
  elementFormA.appendChild(elementFormAI)
  elementForm.appendChild(elementFormDiv1)
  elementForm.appendChild(elementFormDiv2)
  elementForm.appendChild(elementFormUl)
  elementForm.appendChild(elementFormA)
  elementForm.appendChild(elementFormDiv3)
  document.getElementById("cuerpo").appendChild(elementForm)
}
function retornarList(){
  $('#todoelement').remove()
  $("#inputfiled").show()
  //$('#inputshowlist').hide()
}
