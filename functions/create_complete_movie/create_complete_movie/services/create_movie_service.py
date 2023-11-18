from create_complete_movie.models.bingo_card import BingoCardCell
import cv2
from create_complete_movie.services.movie_builder import BingoCompleteMovie


def create_movie(
    dir_path,
    bingo_card_name: str,
    bingo_cells: list[BingoCardCell],
):
    """ビンゴカードのクリア動画を作成する

    Args:
        dir_path (_type_): _description_
        bingo_cells (list[BingoCardCell]): _description_
        output_dim (tuple, optional): _description_. Defaults to (768, 1024).

    Returns:
        _type_: _description_
    """
    movie = BingoCompleteMovie(dir_path)
    movie.start_frame(bingo_card_name)

    target_bingo_cells = [
        bingo_cell for bingo_cell in bingo_cells if bingo_cell.imageUrl
    ]

    # 時系列順に並び替える
    target_bingo_cells.sort(key=lambda x: x.answered_at)

    for bingo_cell in target_bingo_cells:
        if not bingo_cell.imageUrl:
            continue
        photo_name = f"{dir_path}/{bingo_cell.id}.png"
        try:
            movie.build_with_text(cv2.imread(photo_name), bingo_cell, 4)
        except Exception as e:
            print(f"画像の生成でエラーが発生しました。ファイル名: {photo_name} ,{e}")

    movie.end_frame()
    movie.save()
    return movie.get_path()
