
var $j = jQuery.noConflict();
var html = `<div class="wp_popup_modal" id="wp_popup_modal">
    <div class="wp_popup_modal-content"><span class="close" id="close1">×</span>
        <h2 class="popup-cta">Notice</h2>
        <p style="text-align: center;">${wp_popup_var.wp_popup_body}</p>
        <div class="confirm-buttons">
            <div>
                <button class="btn btn-primary button"
                    onclick="redirect('${wp_popup_var.wp_popup_link}')">Visit</button><br>
            </div>
        </div>
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
