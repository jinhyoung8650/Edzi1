$(document).ready(function(){
    $(document).on('click', '#write', function(){
        if(sessionStorage.getItem('id')==null){
            event.preventDefault();
            alert('로그인 시 이용가능합니다.');
        }
    });
});