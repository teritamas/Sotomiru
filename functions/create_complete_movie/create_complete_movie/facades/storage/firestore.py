from create_complete_movie.facades.storage import gcs

UPLOAD_DESTINATION_NAME = "bingoClearMovie"
DOWNLOAD_DESTINATION_NAME = "bingoCellImage"


def upload_bingo_clear_movie(
    source_file_name: str, destination_blob_name: str
) -> None:
    blob = gcs().blob(f"{UPLOAD_DESTINATION_NAME}/{destination_blob_name}")

    # 動画をアップロードする
    blob.upload_from_filename(source_file_name)

    # アクセス用のURLを取得する
    blob.make_public()
    print(f"アップロードしたファイルのURL: {blob.public_url}")
    return blob.public_url


def download_bingo_cell_image(
    destination_blob_name: str, save_path: str
) -> bytes:
    print(f"{DOWNLOAD_DESTINATION_NAME}/{destination_blob_name}")
    blob = gcs().blob(f"{DOWNLOAD_DESTINATION_NAME}/{destination_blob_name}")

    byte = blob.download_as_bytes()
    with open(save_path, "wb") as f:
        f.write(byte)
