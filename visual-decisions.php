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
        'menu_icon' => 'dashicons-share',
        'supports' => array( 'title' ),
    ));
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
    wp_nonce_field( 'vd_save_diagram', 'vd_diagram_nonce' );
    echo '<textarea name="vd_tree_data" style="display:none;">' . esc_textarea( $data ) . '</textarea>';
    echo '<div id="vd-editor" style="margin-top:10px;"></div>';
    echo '<p>Use the editor above to arrange your diagram.</p>';
}

function vd_save_diagram_meta( $post_id ) {
    if ( ! isset( $_POST['vd_diagram_nonce'] ) || ! wp_verify_nonce( $_POST['vd_diagram_nonce'], 'vd_save_diagram' ) ) {
        return;
    }

    if ( isset( $_POST['vd_tree_data'] ) ) {
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

    return '<div class="vd-diagram" data-diagram="' . esc_attr( $data ) . '"></div>';
}
add_shortcode( 'vd_diagram', 'vd_diagram_shortcode' );

// Enqueue D3 and editor scripts for admin
function vd_admin_scripts( $hook ) {
    global $post;
    if ( isset( $post ) && $post->post_type === 'vd_diagram' ) {
        wp_enqueue_script( 'd3', 'https://d3js.org/d3.v7.min.js' );
        wp_enqueue_script( 'vd-editor', plugins_url( 'js/vd-editor.js', __FILE__ ), array( 'd3', 'jquery' ), '0.1', true );
    }
}
add_action( 'admin_enqueue_scripts', 'vd_admin_scripts' );

// Enqueue D3 and renderer for frontend
function vd_frontend_scripts() {
    wp_enqueue_script( 'd3', 'https://d3js.org/d3.v7.min.js' );
    wp_enqueue_script( 'vd-frontend', plugins_url( 'js/vd-frontend.js', __FILE__ ), array( 'd3' ), '0.1', true );
}
add_action( 'wp_enqueue_scripts', 'vd_frontend_scripts' );
