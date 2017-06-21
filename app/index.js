import 'whatwg-fetch';
$('#signup').validate({
  success(label) {
    label.addClass('valid').text('✓');
  },
  error(e) {
  // do nothing, but register this function
  },
  onsubmit: false,
  rules: {
    phone: {
      required: true,
      phoneUS: true
    }
  }
});

$('body').on('keyup', 'form', (e) => {
  if (e.which == 13) {
    if ($('#next').is(':visible') && $('fieldset.current').find('input, textarea').valid()) {
      e.preventDefault();
      nextSection();

      return false;
    }
  }
});


$('#next').on('click', (e) => {
  console.log(e.target);
  nextSection();
});

$('form').on('submit', (e) => {
  if ($('#next').is(':visible') || $('fieldset.current').index() < 3) {
    e.preventDefault();
  }
});

function goToSection(i) {
  $(`fieldset:gt(${i})`).removeClass('current').addClass('next');
  $(`fieldset:lt(${i})`).removeClass('current');
  $('li').eq(i).addClass('current').siblings().removeClass('current');
  setTimeout(() => {
    $('fieldset').eq(i).removeClass('next').addClass('current active');
    if ($('fieldset.current').index() == 3) {
      $('#next').hide();
      $('input[type=submit]').show();
    } else {
      $('#next').show();
      $('input[type=submit]').hide();
    }
  }, 80);
}

function nextSection() {
  const i = $('fieldset.current').index();
  if (i < 3) {
    $('li').eq(i + 1).addClass('active');
    goToSection(i + 1);
  }
}

$('li').on('click', function (e) {
  const i = $(this).index();
  if ($(this).hasClass('active')) {
    goToSection(i);
  } else {
    alert('Please complete previous sections first.');
  }
});


jQuery.validator.addMethod('phoneUS', function (phone_number, element) {
  phone_number = phone_number.replace(/\s+/g, '');

  return this.optional(element) || phone_number.length > 9 &&
    phone_number.match(/^(1-?)?(\([2-9]\d{2}\)|[2-9]\d{2})-?[2-9]\d{2}-?\d{4}$/);
}, 'Please specify a valid phone number');
