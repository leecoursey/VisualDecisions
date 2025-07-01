<?php
/*
Plugin Name: Visual Decisions
Description: Create visual decision trees with diagram editor and shortcode support.
Version: 0.1.0
Author: Auto Generated
*/

// Register custom post type for diagrams
function vd_register_post_type() {
    $labels = array(
        'name' => 'Visual Decisions',
        'singular_name' => 'Visual Decision',
        'add_new' => 'Add New',
        'add_new_item' => 'Add New Diagram',
        'edit_item' => 'Edit Diagram',
        'new_item' => 'New Diagram',
        'view_item' => 'View Diagram',
        'search_items' => 'Search Diagrams',
    );

    register_post_type( 'vd_diagram', array(
        'labels' => $labels,
        'public' => false,
        'show_ui' => true,
        'show_in_menu' => true,
        'supports' => array( 'title' ),
    ) );
}
add_action( 'init', 'vd_register_post_type' );

// Add meta box for diagram JSON
function vd_add_diagram_metabox() {
    add_meta_box(
        'vd_diagram_data',
        'Diagram Data',
        'vd_diagram_metabox_html',
        'vd_diagram',
        'normal',
        'default'
    );
}
add_action( 'add_meta_boxes', 'vd_add_diagram_metabox' );

function vd_diagram_metabox_html( $post ) {
    $data = get_post_meta( $post->ID, '_vd_tree_data', true );
    echo '<textarea name="vd_tree_data" style="width:100%;height:200px;">' . esc_textarea( $data ) . '</textarea>';
    echo '<div id="vd-editor" style="margin-top:10px;"></div>';
    echo '<p>Use the editor above to arrange your diagram.</p>';
}

function vd_save_diagram_meta( $post_id ) {
    if ( array_key_exists( 'vd_tree_data', $_POST ) ) {
        update_post_meta( $post_id, '_vd_tree_data', wp_unslash( $_POST['vd_tree_data'] ) );
    }
}
add_action( 'save_post_vd_diagram', 'vd_save_diagram_meta' );

// Shortcode to display a diagram
function vd_diagram_shortcode( $atts ) {
    $atts = shortcode_atts( array( 'id' => 0 ), $atts );
    $id = intval( $atts['id'] );
    if ( ! $id ) {
        return '';
    }
    $data = get_post_meta( $id, '_vd_tree_data', true );
    if ( ! $data ) {
        return '';
    }
    // Placeholder container for frontend script
    return '<div class="vd-diagram" data-diagram="' . esc_attr( $data ) . '"></div>';
}
add_shortcode( 'vd_diagram', 'vd_diagram_shortcode' );

// Enqueue GoJS and custom scripts in admin
function vd_admin_scripts( $hook ) {
    if ( 'vd_diagram' !== get_post_type() ) {
        return;
    }
    wp_enqueue_script( 'gojs', plugins_url( 'js/go.js', __FILE__ ) );
    wp_enqueue_script( 'vd-editor', plugins_url( 'js/vd-editor.js', __FILE__ ), array( 'gojs', 'jquery' ), '0.1', true );
}
add_action( 'admin_enqueue_scripts', 'vd_admin_scripts' );

// Enqueue GoJS and frontend renderer
function vd_frontend_scripts() {
    wp_enqueue_script( 'gojs', plugins_url( 'js/go.js', __FILE__ ) );
    wp_enqueue_script( 'vd-frontend', plugins_url( 'js/vd-frontend.js', __FILE__ ), array( 'gojs' ), '0.1', true );
}
add_action( 'wp_enqueue_scripts', 'vd_frontend_scripts' );
