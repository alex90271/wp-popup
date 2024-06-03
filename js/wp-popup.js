
var $j = jQuery.noConflict();
var html = `<div class="wp_popup_modal" id="wp_popup_modal">
    <div class="wp_popup_modal-content"><span class="close" id="close1">×</span>
        <p class="popup-cta">Notice</p>
        <div class="popup-image" style="text-align: center;"><img style="height: 100%; margin-top: 15px; max-height: 300px;"
                src="http://plugindev.local/wp-content/themes/twentytwentyfour/assets/images/building-exterior.webp"
                alt="">
        </div>
        <div class="confirm-buttons">
            <div>
                <button class="btn btn-primary button"
                    onclick="redirect('${wp_popup_var.wp_popup_link}')">Visit</button><br>
            </div>
        </div>
        <p style="text-align: center;">${wp_popup_var.wp_popup_body}</p>
        <span class="close" id="close2">Close</span>
    </div>
</div>`;
$j(window).on('load', function () {

    const curDiv = document.getElementById("wp_popup_modal-parent");

    if (sessionStorage.getItem('popState') == "hidden") {
        curDiv.remove();
    } else {
        const newDiv = document.createElement("div");
        newDiv.innerHTML = html;
        document.body.insertBefore(newDiv, curDiv);

        var wp_popup_modal = document.getElementById("wp_popup_modal");
        var span = document.getElementById("close1");
        var span2 = document.getElementById("close2");

        span.onclick = function () {
            wp_popup_modal.remove();
            curDiv.remove();
            sessionStorage.setItem('popState', 'hidden');
        }

        span2.onclick = function () {
            wp_popup_modal.remove();
            curDiv.remove();
            sessionStorage.setItem('popState', 'hidden');
        }

        function redirect(url) {

            alert(`You will be redirected to ${url} in a moment`);
            window.location.replace(url);
        }
    }

});
