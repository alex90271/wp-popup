<?php
/*
Plugin Name: WP-Popup
Description: Displays a super simple popup
Author: Alex Alder
Version: 0.6.3.2024
License: MIT
License URI: https://opensource.org/license/mit/
*/

function wp_popup_admin_page()
{
  $body_content = get_option('wp_popup_body', $default = false);
  $link_name = get_option('wp_popup_link', $default = false);

  ?>
  <div class="wrap">
    <form action="admin-post.php" name='wp_popup_form' , method="post">
      <p>Body</p>
        <input type="hidden" name="action" value="update_wp_popup" />
        <textarea type="text" name="wp_popup_body" value="<?php echo $body_content ?>"><?php echo $body_content ?></textarea>
      <p> Link</p>
        <input type="hidden" name="action" value="update_wp_popup" />
        <input type="text" name="wp_popup_link" value="<?php echo $link_name ?>" />
      <?php
      submit_button()
        ?>
    </form>
  </div>
  <?php
}
function wp_popup_admin_menu()
{
  add_menu_page('Popup Settings', 'Popup', 'manage_options', 'wp-popup-admin-page', 'wp_popup_admin_page', 'dashicons-calendar-alt', 6);
}

function wp_popup_do_update()
{
  update_option('wp_popup_link', $_POST['wp_popup_link']);
  wp_redirect('admin.php?page=wp-popup-admin-page');
  update_option('wp_popup_body', $_POST['wp_popup_body']);
  wp_redirect('admin.php?page=wp-popup-admin-page');
}

function inject_custom_html() {
  ?> 
  <div id="wp_popup_modal-parent"> . </div>
  <?php
}

function activate_wp_popup()
{

  add_action('after_body_open_tag','inject_custom_html');
  do_action('after_body_open_tag');

  wp_enqueue_style('wp_popup-css', plugin_dir_url(__FILE__) . 'css/style.css');
  wp_enqueue_script('wp_popup', plugin_dir_url(__FILE__) . 'js/wp-popup.js', array('jquery'));
  /* Add database options */

  add_option('wp_popup_link', $value = '#', $autoload = 'yes');
  add_option('wp_popup_body', $value = 'blank', $autoload = 'yes');
  $wp_popup_param = array(
    'wp_popup_body' => get_option('wp_popup_body'),
    'wp_popup_link' => get_option('wp_popup_link'),
  );
  wp_localize_script('wp_popup', 'wp_popup_var', $wp_popup_param);
}

add_action('admin_post_update_wp_popup', 'wp_popup_do_update');
add_action('wp_enqueue_scripts', 'activate_wp_popup');
add_action('admin_menu', 'wp_popup_admin_menu');


?>