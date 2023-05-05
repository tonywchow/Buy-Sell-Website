$(document).ready(function() {
  $('.favourite').click(function() {
    const button = $(this);
    const productId = $(this).data('product-id');
    $.ajax({
      type: 'POST',
      url: '/add-delete-favourites',
      data: { productId: productId },
      success: (response) => { //change button style
        if (response === 'added') {
          button.html('<i class="fas fa-heart"></i> Favourited');
        } else if (response === 'removed') {
          button.html('<i class="far fa-heart"></i>');
        }
      },
      error: function(error) {
        console.error(error);
      }
    });
  });
});
