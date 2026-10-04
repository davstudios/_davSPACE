mod space;

use space::{cancel_space_scan,reveal_path,scan_space,SpaceState};
use tauri::Manager;

#[cfg_attr(mobile,tauri::mobile_entry_point)]
pub fn run(){
    tauri::Builder::default()
        .setup(|app|{
            #[cfg(target_os="windows")]
            {
                if let Some(window)=app.get_webview_window("main"){window.set_icon(tauri::include_image!("./icons/icon.ico"))?;}
            }
            Ok(())
        })
        .manage(SpaceState::default())
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![scan_space,cancel_space_scan,reveal_path])
        .run(tauri::generate_context!())
        .expect("error while running _davSPACE");
}


