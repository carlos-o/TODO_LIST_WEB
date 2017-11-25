$(document).ready(function() {
  // $('.modal').modal();
  $('#modal1').modal();
  // $('.modal-trigger').leanModal();
  $('#modal2').modal();
})
//ajax login
jQuery.validator.setDefaults({
  debug: true,
  success: 'valid'
  });

$(document).ready(function() {
  $('#loginForm').validate({
      rules: {
        // simple rule, converted to {required:true}
        password: {
          required:true
        },
        // compound rule
        email: {
          required: true,
          email: true
        }
      },
      messages:{
        password:{
          required: 'Please enter your password'
        },
        email:{
          required: 'Please enter your email',
          email: 'Please enter a correct email'
        }

      },
      submitHandler: function(form){
        $.ajax({
          url: constants().login,
          method: 'POST',
          data: {
            email: $('#email').val(),
            password: $('#password').val()
          },
          dataType: 'JSON',
          success: function(data) {
            //console.log(data);
            if (data.token) {
              localStorage.setItem('token',data.token);
              localStorage.setItem('id_user',data.pk);
              localStorage.setItem('email',data.email);
              $(location).attr('href', 'home.html');
            }else{
              alert("the email "+data.email+" not exist")
            }

          },
          error: function(res) {
            //console.log(res);
            if(res.status==404){
              alert(res.responseJSON.response)
            }
            if(res.status==401){
              alert('the password your entered is incorrect')
            }
            if(res.status==500){
              alert('ERROR')
            }
          }
        });
      }
    });

});
//ajax recover password
jQuery.validator.setDefaults({
  debug: true,
  success: 'valid'
});
$('#recoverForm').validate({
    rules: {
    emailrecover: {
      required:true,
      email: true
    }
  },
  messages:{
    emailrecover:{
      required: 'Please enter your email',
      email: 'Please enter a correct email'
    }
  },
  submitHandler: function(form) {
    $.ajax({
      //url:'http://127.0.0.1:8000/api/recoverchange/',
      url:constants().recoverchange,
      method: 'POST',
      data:{
        email:$('#emailrecover').val()
      },
      dataType:'JSON',
      success: function(data){
        //console.log(data);
        alert(data.response)
        $('#modal1').modal('close');
        switch (data.code) {
          case '200':
            alert(data.response)
          break;

          case '404':
            alert('The email dont have registration in the system')
          break;
        }
      },
      error: function(res) {
        //console.log(res);
        if(res.status==404){
          alert('The email dont have registration in the system')
        }
        if(res.status==500){
          alert('ERROR')
        }
      }
    });
    }
})
//ajax register
jQuery.validator.setDefaults({
  debug: true,
  success: 'valid'
});
$('#registerForm').validate({
  rules:{
    username:{
      required:true,
      minlength: 6
    },
    emailregister:{
      required:true,
      email:true
    },
    firstname:{
      required:true,
      minlength: 3
    },
    lastname:{
      required:true,
      minlength: 3
    },
    passwordregister:{
      required:true,
      minlength: 8
    },
    confirmpassword:{
      required:true,
      minlength: 8,
      equalTo: "#passwordregister"
    }
  },
  messages:{
    username:{
      required: 'Please enter any username'
    },
    emailregister:{
      required: 'Please enter your email',
      email: 'Please enter a correct email'
    },
    firstname:{
      required: 'Please enter your name'
    },
    lastname:{
      required: 'Please enter yout last name'
    },
    passwordregister:{
      required: 'Please enter your password'
    },
    confirmpassword:{
      required: 'Please repit the password'
    },
  },
  submitHandler: function(form) {
    $.ajax({
      url:constants().register,
      method:'POST',
      data:{
        username:$('#username').val(),
        email:$('#emailregister').val(),
        first_name:$('#firstname').val(),
        last_name:$('#lastname').val(),
        password:$('#passwordregister').val()
      },
      dataType:'JSON',
      success: function(data){
        //console.log(data)
        alert("Congratulations "+data.username+" "+data.response)
        $('#modal2').modal('close');
      },
      error: function(res) {
        ///console.log(res)
        if(res.status==400){
          alert('The user '+res.responseJSON.username+" "+res.responseJSON.response)
        }
        if(res.status==500){
            alert('ERROR')
        }
      }
    });
  }
});
