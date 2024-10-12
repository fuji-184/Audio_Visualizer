use axum::{
  http::{header, StatusCode, Uri},
  response::{IntoResponse, Response},
  routing::{get, Router},
  extract::Path,
};
use rust_embed::RustEmbed;
use mime_guess;
use tower_http::cors::{CorsLayer, Any};

#[derive(RustEmbed)]
#[folder = "assets/"]
struct AudioAssets;

#[tokio::main]
async fn main() {
    // Configure CORS
    let cors = CorsLayer::new()
        .allow_origin(Any)
        .allow_methods(Any)
        .allow_headers(vec![header::CONTENT_TYPE, header::RANGE]);

    let app = Router::new()
        .route("/audio/:file_name", get(stream_audio))
        .layer(cors);

    // Rest of your main function remains the same
    let listener = tokio::net::TcpListener::bind("127.0.0.1:3000")
        .await
        .unwrap();
    println!("listening on {}", listener.local_addr().unwrap());
    axum::serve(listener, app).await.unwrap();
}

// Your existing stream_audio function, with added CORS headers
async fn stream_audio(Path(file_name): Path<String>) -> impl IntoResponse {
    if !path_is_valid(&file_name) {
        return (StatusCode::BAD_REQUEST, "Invalid file path").into_response();
    }

    match AudioAssets::get(&file_name) {
        Some(content) => {
            let mime = mime_guess::from_path(&file_name).first_or_octet_stream();
            
            (
                [
                    (header::CONTENT_TYPE, mime.as_ref()),
                    (header::ACCEPT_RANGES, "bytes"),
                ],
                content.data,
            ).into_response()
        }
        None => (StatusCode::NOT_FOUND, "Audio file not found").into_response(),
    }
}