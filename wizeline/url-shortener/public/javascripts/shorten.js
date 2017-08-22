$('.btn-shorten').on('click', function(){

  //POST data to API and print shortenedURL
  $.ajax({
    url: '/api/shorten',
    type: 'POST',
    dataType: 'JSON',
    data: {url: $('#url-field').val(), date:Date.now()},
    success: function(data){
        var resultHTML = '<a class="result" href="' + data.shortUrl + '">'
            + 'localhost:3000/api/url/'+data.shortUrl + '</a>';
        $('#link').html(resultHTML);
        $('#link').hide().fadeIn('slow');

    }
  });
});

$(document).ready(function(){
  //GET ALL FROM API and print them all
  $.getJSON( "http://localhost:3000/api/urls", function( data ) {
    var items = [];
    console.log('This is the json: '+JSON.stringify(data));
    $.each( data, function( key, value ) {
      items.push( "<li id='" + key + "'>"+
      "<br>Link Original: "+value.original +
      "<br>Link Cortado: http://localhost:3000/"+value.shortened +
      "<br>Creado el: "+value.created_at+ "</li><br><br>" );
    });

    $( "<ul/>", {
      "class": "my-new-list",
      html: items.join( "" )
    }).appendTo( "body" );
  });
});
