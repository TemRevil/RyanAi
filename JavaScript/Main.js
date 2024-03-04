// Main Event
$(document).ready(function(){
    function sendMessage() {
        var message = $("#messageInput").val().trim();
        if (message !== "") {
            var userMessageDiv = '<div class="user-div"><div class="user-message">' + message + '</div></div>';
            $(".messages-box").append(userMessageDiv);
            $("#messageInput").val("");
            
            $(".messages-box").animate({ scrollTop: $(".messages-box")[0].scrollHeight }, 500);
        }
    }

    $("#sendButton").click(sendMessage);

    $("#messageInput").keypress(function(event) {
        if (event.which === 13) {
            sendMessage();
        }
    });

    function receiveMessage(message) {
        var ryanMessageDiv = '<div class="ryan-div"><div class="ryan-message">' + message + '</div></div>';
        $(".messages-box").append(ryanMessageDiv);
        
        $(".messages-box").animate({ scrollTop: $(".messages-box")[0].scrollHeight }, 500);
    }

    setTimeout(function(){
        var messageReceived = "Hello! This is a received message.";
        receiveMessage(messageReceived);
    }, 3000);

    $("#file").change(function(){
        var file = this.files[0];
        if (file) {
            if (!file.type.startsWith('image/')) {
                $(".r-alert").text("Only image files are allowed.");
                setTimeout(function() {
                    $(".r-alert").text("");
                }, 3000);
                return;
            }
            $(".r-alert").text("");
            var reader = new FileReader();
            reader.onload = function(e) {
                var imageSrc = e.target.result;
                var photoMessageDiv = '<div class="photo-img"><img src="' + imageSrc + '" alt="Uploaded Image"></div>';
                $(".messages-box").append(photoMessageDiv);
                
                $(".messages-box").animate({ scrollTop: $(".messages-box")[0].scrollHeight }, 500);
            };
            reader.readAsDataURL(file);
        }
    });

    $("#messageInput").on('input', function() {
        var arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]/;
        var message = $(this).val();
        if (arabicPattern.test(message)) {
            $(this).css('direction', 'rtl');
        } else {
            $(this).css('direction', 'ltr');
        }
    });
});
// ------------------------------------------------
// Back Down Event
$(document).ready(function(){
    $(".messages-box").scroll(function() {
        var scrollHeight = $(".messages-box")[0].scrollHeight;
        var visibleHeight = $(".messages-box").innerHeight();
        var scrollPosition = $(".messages-box").scrollTop();
        
        var estimatedLineHeight = 20;
        
        var totalHeightForTwoLines = estimatedLineHeight * 2;
        
        if (scrollPosition < totalHeightForTwoLines) {
            $(".back-to-bottom").css("display", "flex");
        } else {
            $(".back-to-bottom").css("display", "none");
        }
        
        if (scrollHeight - scrollPosition <= visibleHeight) {
            $(".back-to-bottom").css("display", "none");
        }
    });
    
    $(".back-to-bottom").click(function() {
        var scrollHeight = $(".messages-box")[0].scrollHeight;
        $(".messages-box").animate({ scrollTop: scrollHeight }, 500);
    });
});
// ------------------------------------------------
// API Event
