import os
from create_complete_movie.models.bingo_card import BingoCardCell
import cv2
from PIL import Image, ImageDraw, ImageFont
import numpy as np
from datetime import datetime

FONT_NAME = "./assets/font/KiwiMaru-Regular.ttf"


class BingoCompleteMovie:
    def __init__(
        self,
        dir_path: str,
        src_movie_path: str = "./assets/src.mov",
        frame=24,
        fade_frame_ratio: float = 0.5,  # フェードイン、フェードアウトのフレーム数の比率
    ):
        # self.resolution = (1920, 1080)  # (height, width)
        self.resolution = (990, 540)  # (height, width)
        self.frame = frame

        # 動画の書き込み設定
        self.video_path = f"{dir_path}/video.mp4"
        self.outfh = cv2.VideoWriter(
            self.video_path,
            cv2.VideoWriter_fourcc(*"avc1"),
            self.frame,
            (self.resolution[1], self.resolution[0]),
        )
        self.background_image = self.__fix_ratio(
            self.resolution,
            cv2.imread("./assets/background.jpg"),
            background_color=[255, 255, 255],
        )

        # フェードイン処理で共通で利用する設定
        self.fade_frame_count = int(
            (self.frame * fade_frame_ratio) / 2
        )  # 表示時間の30%をフェードイン、フェードアウトに利用する
        self.mask = np.full(
            (self.resolution[0], self.resolution[1], 3), 255, dtype="uint8"
        )  # フェードする時に利用するマスク

        # 背景動画
        # ファイルが存在すするか確認する
        if not os.path.exists(src_movie_path):
            raise FileNotFoundError(f"{src_movie_path}が見つかりません。")
        self.org = cv2.VideoCapture(src_movie_path, cv2.CAP_FFMPEG)
        # 動画を読み込めたことを確認する
        if not self.org.isOpened():
            raise FileNotFoundError(f"{src_movie_path}にエラーが発生しました。")

    def get_path(self):
        return self.video_path

    def save(self):
        self.outfh.release()

    def __get_frame(self):
        end_flag, flame = self.org.read()
        # edn_flagがFalseの時は、最初のフレームに戻す
        if end_flag:
            return flame
        else:
            print("動画の最後まで到達したので、最初のフレームに戻します。")
            self.org.set(cv2.CAP_PROP_POS_FRAMES, 0)
            end_flag, flame = self.org.read()
            return flame

    def start_frame(self, bingo_card_name: str, bingo_image_path: str):
        # 開始動画を読み込んでself.outfhに書き込む
        # start_movie = cv2.VideoCapture("./assets/movie_start.mp4")
        # while True:
        #     end_flag, flame = start_movie.read()
        #     if end_flag:
        #         resize_frame = self.__fix_ratio(
        #             self.resolution,
        #             flame,
        #             background_color=[255, 255, 255],
        #         )
        #         self.outfh.write(resize_frame)
        #     else:
        #         break

        # bingoCardNameを挿入
        bingo_card_name_image = cv2.imread("./assets/theme.jpg")
        bingo_card_name_image = cv2.resize(
            bingo_card_name_image, (self.resolution[1], self.resolution[0])
        )
        thumbnail_image = cv2.imread(bingo_image_path)
        thumbnail_image = self.__fix_ratio(
            self.resolution,
            thumbnail_image,
            background_color=[255, 255, 255],
        )
        total_frame = self.frame * 2
        for i in range(total_frame):
            bingo_card_name_image = self.__insert_text(
                bingo_card_name_image,
                bingo_card_name,
                (
                    int(0.197 * self.resolution[1]),
                    int(0.80 * self.resolution[0]),
                ),
                font_size=32,
            )
            # bingo_card_name_imageにthumbnail_imageを重ねる
            bingo_card_name_image = self.__overlay_image(
                thumbnail_image, bingo_card_name_image, target="black"
            )

            self.outfh.write(bingo_card_name_image)

    def end_frame(self, seconds: int = 3):
        total_frame = self.frame * seconds
        movie_end_image = cv2.imread("./assets/movie_end.jpg")
        movie_end_image = cv2.resize(
            movie_end_image, (self.resolution[1], self.resolution[0])
        )
        for i in range(total_frame):
            # TODO: フェードインしたい
            self.outfh.write(movie_end_image)

    def build_with_text(
        self, img, bingo_cell: BingoCardCell, seconds: int = 2
    ):
        total_frame = self.frame * seconds

        for i in range(total_frame):
            bingo_cell_image = self.__create_bingo_cell_image(
                img, total_frame, i
            )

            # コンテンツのテンプレートにビンゴセルに投稿した画像を挿入する
            background_image_padding = (
                int(0.165 * self.resolution[0]),
                int(0.106 * self.resolution[1]),
            )
            bingo_cell_content_image = self.background_image.copy()
            bingo_cell_content_image[
                background_image_padding[0] : background_image_padding[0]
                + bingo_cell_image.shape[0],
                background_image_padding[1] : background_image_padding[1]
                + bingo_cell_image.shape[1],
            ] = bingo_cell_image

            # 日付を挿入
            dt = datetime.fromtimestamp(bingo_cell.answered_at.timestamp())
            created_at_comment = f"{dt.strftime('%Y/%m/%d %H時%M分')}"
            bingo_cell_content_image = self.__insert_text(
                bingo_cell_content_image,
                created_at_comment,
                (
                    int(0.668 * self.resolution[1]),
                    int(0.102 * self.resolution[0]),
                ),
                font_size=12,
            )
            # お題を挿入
            bingo_cell_content_image = self.__insert_text(
                bingo_cell_content_image,
                f"{bingo_cell.name}",
                (
                    int(0.226 * self.resolution[1]),
                    int(0.12 * self.resolution[0]),
                ),
                font_size=24,
            )
            # コメントを挿入
            bingo_cell_content_image = self.__insert_text(
                bingo_cell_content_image,
                f"{bingo_cell.comments}",
                (
                    int(0.24 * self.resolution[1]),
                    int(0.760 * self.resolution[0]),
                ),
                font_size=20,
                indent_text_count=16,
                max_indent=2,
            )

            # bingo_cell_content_imageにimgを重ねる
            r_img = cv2.resize(
                img,
                (
                    int(bingo_cell_content_image.shape[1]),
                    int(bingo_cell_content_image.shape[0]),
                ),
            )
            # imgの透過部分を透過させる
            r_img = self.__overlay_image(
                r_img,
                bingo_cell_content_image,
                target="black",
                ignore_bbox=[
                    background_image_padding[0],
                    background_image_padding[0] + bingo_cell_image.shape[0],
                    background_image_padding[1],
                    background_image_padding[1] + bingo_cell_image.shape[1],
                ],
            )

            # driving_car_imageに
            driving_car_image = self.__get_driving_car_image(img)
            # 背景動画を重ねる
            final_image = self.__overlay_image(r_img, driving_car_image)

            self.outfh.write(final_image)

    def __get_driving_car_image(self, img):
        driving_car_image = self.__get_frame()
        driving_car_image = self.__fix_ratio(
            self.resolution,
            driving_car_image,
            background_color=[255, 255, 255],
        )

        # 画像の下25%を切り取り、切り取った部分を元画像の上に重ねる
        crop_rate = 0.25
        driving_car_image_cropped = driving_car_image[
            int((1 - crop_rate) * self.resolution[0]) : self.resolution[0], :
        ]
        driving_car_image_base = driving_car_image[
            : int((1 - crop_rate) * self.resolution[0]), :
        ]
        driving_car_image = np.vstack(
            (driving_car_image_cropped, driving_car_image_base)
        )

        return driving_car_image

    def __overlay_image(
        self, front_image, background_image, target="white", ignore_bbox=None
    ):
        if target == "white":
            mask = np.all(
                background_image[:, :, :3] > [250, 250, 250], axis=-1
            )
        elif target == "black":
            # background_imageの黒色部分を透過させる
            mask = np.all(background_image[:, :, :3] < [5, 5, 5], axis=-1)

        background_image = cv2.cvtColor(background_image, cv2.COLOR_BGR2BGRA)

        if ignore_bbox:
            # 指定した範囲内は対象としない
            mask[
                ignore_bbox[0] : ignore_bbox[1],
                ignore_bbox[2] : ignore_bbox[3],
            ] = False

        background_image[mask, 3] = 0

        # front_imageにdriving_car_imageを重ねる
        front_image = cv2.cvtColor(front_image, cv2.COLOR_BGR2BGRA)
        final_image = np.where(
            background_image[:, :, 3:] != 0,
            background_image,
            front_image,
        )
        final_image = cv2.cvtColor(final_image, cv2.COLOR_BGRA2BGR)
        return final_image

    def __create_bingo_cell_image(self, img, total_frame, i):
        """ビンゴセルの画像を作成し、フェードイン、フェードアウトのエフェクトを追加する

        Args:
            img (_type_): _description_
            total_frame (_type_): _description_
            i (_type_): _description_

        Returns:
            _type_: _description_
        """

        # background_imageのサイズに合わせて、画像の比率を固定する
        bingo_cell_image = self.__fix_ratio(
            (int(self.resolution[0] * 0.59), int(self.resolution[1] * 0.79)),
            img,
            background_color=[255, 255, 255],
        )

        # 現在のフレームがフェードイン、フェードアウトの範囲内の時
        bingo_cell_image = self.__add_fade(bingo_cell_image, total_frame, i)

        return bingo_cell_image

    def __add_fade(self, bingo_cell_image, total_frame, i):
        """フェードイン、フェードアウトのエフェクトを追加する

        Args:
            total_frame (_type_): _description_
            fade_frame (_type_): _description_
            mask (_type_): _description_
            i (_type_): _description_

        Returns:
            _type_: _description_
        """

        # maskを入力画像と同じサイズにする
        _mask = cv2.resize(
            self.mask,
            (bingo_cell_image.shape[1], bingo_cell_image.shape[0]),
        )

        if i < self.fade_frame_count:
            alpha = i / self.fade_frame_count
            bingo_cell_image = cv2.addWeighted(
                bingo_cell_image, alpha, _mask, 1 - alpha, 0
            )
        elif i > total_frame - self.fade_frame_count:
            alpha = 1 - (i + 1) / self.fade_frame_count
            bingo_cell_image = cv2.addWeighted(
                bingo_cell_image, alpha, _mask, 1 - alpha, 0
            )

        return bingo_cell_image

    def __fix_ratio(self, output_dim, img, background_color=[0, 0, 0]):
        """画像の比率を固定して、paddingを追加する

        Args:
            output_dim (_type_): 出力する画像のサイズ
            img (_type_): 入力画像

        Returns:
            _type_: _description_
        """
        h, w = img.shape[:2]
        ash = output_dim[0] / h
        asw = output_dim[1] / w
        if asw <= ash:
            sizes = (int(w * asw), int(h * asw))
        else:
            sizes = (int(w * ash), int(h * ash))
        resized_img = cv2.resize(img, sizes, interpolation=cv2.INTER_AREA)

        diff_height = (output_dim[0] - sizes[1]) / 2
        diff_top = int(diff_height)  # 上は切り捨て
        diff_bottom = (
            int(diff_height) + 1 if diff_height % 1 != 0 else int(diff_height)
        )  # 下は切り上げ

        diff_width = (output_dim[1] - sizes[0]) / 2
        diff_left = int(diff_width)
        diff_right = (
            int(diff_width) + 1 if diff_width % 1 != 0 else int(diff_width)
        )
        padded_image = cv2.copyMakeBorder(
            resized_img,
            diff_top,
            diff_bottom,
            diff_left,
            diff_right,
            borderType=cv2.BORDER_CONSTANT,
            value=background_color,
        )
        return padded_image

    def __insert_text(
        self,
        padded_image,
        text: str,
        text_position: tuple = (10, 660),
        font_size=24,
        indent_text_count=100,
        max_indent=3,
    ):
        """テキストを挿入する

        Args:
            padded_image (_type_): _description_
            text (_type_): _description_

        Returns:
            _type_: _description_
        """

        image_pil = Image.fromarray(
            cv2.cvtColor(padded_image, cv2.COLOR_BGR2RGB)
        )

        # フォントを読み込む
        font = ImageFont.truetype(FONT_NAME, font_size)

        # 描画するオブジェクトを作成
        draw = ImageDraw.Draw(image_pil)

        # textの文字数がindent_text_count文字以上の時は、改行する
        if len(text) > indent_text_count:
            text = "\n".join(
                [
                    text[i : i + indent_text_count]
                    for i in range(0, len(text), indent_text_count)
                    if i < max_indent * indent_text_count
                ]
            )
            if len(text) > indent_text_count * max_indent:
                text = f"{text[:-3]}..."
        # テキストを描画,フォントの色は#7d7d7d
        draw.text(
            text_position,
            text,
            font=font,
            fill=(125, 125, 125),
        )

        # OpenCV形式に変換
        padded_image = cv2.cvtColor(np.array(image_pil), cv2.COLOR_RGB2BGR)
        return padded_image
