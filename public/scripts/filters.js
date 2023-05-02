$(document).ready(function() {
  $('#filter-form').on('submit', function(e) {
    e.preventDefault(); // prevent the form from submitting normally

    // get the form data
    const formData = $(this).serialize();

    // make an AJAX call to the server with the form data
    $.ajax({
      type: 'GET',
      url: '/filter',
      data: formData,
      success: function(data) {
        // update the product list with the response data
        $('#product-list').html(data);
      },
      error: function() {
        alert('Error fetching data');
      }
    });
  });
});

