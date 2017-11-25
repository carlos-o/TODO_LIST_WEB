function logoutSystem() {
  $.ajax({
    url:constants().logout,
    method:'POST',
    data:{
      token:localStorage.getItem('token')
    },
    dataType: 'JSON',
    success: function(data){
      localStorage.removeItem('token');
      localStorage.removeItem('id_user');
      localStorage.removeItem('email');
      $(location).attr('href','index.html')
    },
    error: function(res){
      //console.log(res)
      alert('ERROR')
    }
  })
}
