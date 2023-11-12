import os
import shutil
from create_complete_movie.facades.firestore.bingo_card import (
    fetch_bingo_cell,
    fetch_clear_and_no_video_bingo_cards,
)
from create_complete_movie.facades.storage.firestore import (
    download_bingo_cell_image,
)

from create_complete_movie.services.create_movie_service import create_movie
from create_complete_movie.services.nft_service import mint_and_transfer_nft

URL_PREFIX = (
    "https://firebasestorage.googleapis.com/v0/b"
    "/key3-global-hackathon.appspot.com"
    "/o/bingoCellImage%2F"
)
URL_SUFFIX = "?alt=media"
FOLDER_NAME = "_temp/bingoCellImage"


def main():
    bingo_card_ids = fetch_clear_and_no_video_bingo_cards()
    print(f"処理対象のビンゴカードID: {bingo_card_ids}")

    for bingo_card_id in bingo_card_ids:
        __create_and_upload(bingo_card_id)


def __create_and_upload(bingo_card_id):
    bingo_cells = fetch_bingo_cell(bingo_card_id)
    # フォルダを削除する
    if os.path.exists(FOLDER_NAME):
        shutil.rmtree(FOLDER_NAME)
    os.makedirs(FOLDER_NAME, exist_ok=True)

    print("ファイルをダウンロードします")
    # 全ての画像をダウンロードする
    for bingo_cell in bingo_cells:
        if bingo_cell.imageUrl is None:
            continue

        # ダウンロードする
        image_name = f'{bingo_cell.imageUrl.replace(URL_PREFIX, "").replace(URL_SUFFIX, "")}'
        download_bingo_cell_image(
            image_name, f"{FOLDER_NAME}/{bingo_cell.id}.png"
        )

    print("動画を作成します")
    # video_path = create_movie(FOLDER_NAME, bingo_cells)
    # video_path = "_temp/bingoCellImage/video.mp4"

    print("動画をアップロードします")
    # public_url = upload_bingo_clear_movie(video_path, f"{bingo_card_id}.mp4")
    public_url = "https://storage.googleapis.com/key3-global-hackathon.appspot.com/bingoClearMovie/8d1a9a97-8e79-4c94-b7c6-4cbe9a0f03c2.mp4"
    # add_bingo_clear_movie(bingo_card_id, public_url)

    # アップロード後動画をNFT化する
    print("動画をNFT化します")
    mint_and_transfer_nft(bingo_card_id, public_url)


if __name__ == "__main__":
    main()
