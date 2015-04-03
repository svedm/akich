$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            event.preventDefault(); // prevent default submit behaviour
            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }
            $.ajax({
                url: "https://mandrillapp.com/api/1.0/messages/send.json",
                type: "POST",
                data: {
                    key: 'LwGP0XIT5M-ouqe5CPrv8Q',
                    message: {
                        from_email: email,
                        to: [
                          {
                            email: 'akich@akich.ru',
                            type: 'to'
                          }
                        ],
                        autotext: 'true',
                        subject: 'Новое сообщение с akich.ru: ' + name + ' ' + phone ,
                        html: message
                    }
                    // name: name,
                    // phone: phone,
                    // email: email,
                    // message: message
                },
                cache: false,
                success: function(resp) {
                    // Success message
                    $('#success').html("<div class='alert alert-success alert-green'>");
                    $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-success')
                        .append("<strong>Ваше сообщение успешно отправлено. </strong>");
                    $('#success > .alert-success')
                        .append('</div>');

                    //clear all fields
                    $('#contactForm').trigger("reset");
                    console.log(resp);
                },
                error: function(resp) {
                    // Fail message
                    $('#success').html("<div class='alert alert-danger'>");
                    $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                        .append("</button>");
                    $('#success > .alert-danger').append("<strong>Извените, " + firstName + ", похоже почтовый сервер не отвечает. Попробуйте позже.");
                    $('#success > .alert-danger').append('</div>');
                    //clear all fields
                    $('#contactForm').trigger("reset");
                    console.log(resp);
                },
            })
        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});


/*When clicking on Full hide fail/success boxes */
$('#name').focus(function() {
    $('#success').html('');
});
