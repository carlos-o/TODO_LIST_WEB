jQuery.validator.setDefaults({
  debug: true,
  success: 'valid'
  });
$(document).ready(function() {
    $('#changeform').validate({
      rules:{
        oldpasswordchange:{
          required:true,
          minlength: 8
        },
        newpasswordchange:{
          required:true,
          minlength: 8
        }
      },
      messages:{
        oldpasswordchange:{
          required: 'Please enter your old password'
        },
        newpasswordchange:{
          required: 'Please enter your new password'
        }
      },
      submitHandler: function(){
        $.ajax({
          url:constants().recoverchange,
          method:'PUT',
          data:{
            email:localStorage.getItem('email'),
            password_old:$('#oldpasswordchange').val(),
            password_new:$('#newpasswordchange').val()
          },
          dataType:'JSON',
          success: function(data){
            alert(data.response)
            $('#modal3').modal('close');
            localStorage.removeItem('token');
            localStorage.removeItem('id_user');
            localStorage.removeItem('email');
            setTimeout(hrefIndex, 1000)
          },
          error: function(res){
            alert(res.responseJSON.response)
          }
        });
      }
    });
  });
function hrefIndex(){
  $(location).attr('href', 'index.html');
}
