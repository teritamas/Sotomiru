FROM python:3.10-slim as builder
WORKDIR /usr/src/app
RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry export -f requirements.txt > requirements.txt

FROM tiangolo/uvicorn-gunicorn-fastapi:python3.10

ENV VERSION=4.7.0
RUN apt-get update && apt-get install -y \
  libgl1-mesa-dev \
  fonts-ipaexfont-gothic \
  wget \
  git \
  unzip \
  apt-transport-https \
  software-properties-common \
  ca-certificates \
  build-essential \
  cmake \
  libtbb-dev \
  libatlas-base-dev \
  libgtk2.0-dev \
  libavcodec-dev \
  libavformat-dev \
  libswscale-dev \
  libxine2-dev \
  libv4l-dev \
  libtheora-dev \
  libvorbis-dev \
  libxvidcore-dev \
  libopencore-amrnb-dev \
  libopencore-amrwb-dev \
  x264 \
  libtesseract-dev \
  libgdiplus \
  && apt-get -y clean \
  && rm -rf /var/lib/apt/lists/*

# Install Open CV - Warning, this takes absolutely forever
RUN mkdir -p ~/opencv cd ~/opencv && \
  wget https://github.com/opencv/opencv/archive/${VERSION}.zip && \
  unzip ${VERSION}.zip && \
  rm ${VERSION}.zip && \
  mv opencv-${VERSION} OpenCV && \
  cd OpenCV && \
  mkdir build && \ 
  cd build && \
  cmake \
  -D OPENCV_EXTRA_MODULES_PATH=/app/opencv_contrib/modules \
  -D CMAKE_BUILD_TYPE=RELEASE \
  -D BUILD_SHARED_LIBS=OFF \
  -D ENABLE_CXX11=ON \
  -D BUILD_EXAMPLES=OFF \
  -D BUILD_DOCS=OFF \
  -D BUILD_PERF_TESTS=OFF \
  -D BUILD_TESTS=OFF \
  -D BUILD_JAVA=OFF \
  -D BUILD_opencv_app=OFF \
  -D BUILD_opencv_barcode=OFF \
  -D BUILD_opencv_java_bindings_generator=OFF \
  -D BUILD_opencv_js_bindings_generator=OFF \
  -D BUILD_opencv_ts=OFF \
  -D BUILD_opencv_js=OFF \
  -D BUILD_opencv_bioinspired=OFF \
  -D BUILD_opencv_ccalib=OFF \
  -D BUILD_opencv_datasets=OFF \
  -D BUILD_opencv_dnn_objdetect=OFF \
  -D BUILD_opencv_dpm=OFF \
  -D BUILD_opencv_fuzzy=OFF \
  -D BUILD_opencv_gapi=OFF \
  -D BUILD_opencv_intensity_transform=OFF \
  -D BUILD_opencv_mcc=OFF \
  -D BUILD_opencv_objc_bindings_generator=OFF \
  -D BUILD_opencv_rapid=OFF \
  -D BUILD_opencv_reg=OFF \
  -D BUILD_opencv_stereo=OFF \
  -D BUILD_opencv_structured_light=OFF \
  -D BUILD_opencv_surface_matching=OFF \
  -D BUILD_opencv_videostab=OFF \
  -D BUILD_opencv_wechat_qrcode=ON \
  -D WITH_GSTREAMER=OFF \
  -D WITH_ADE=OFF \
  -D OPENCV_ENABLE_NONFREE=ON \
  .. && \
  make -j4 && \
  make install && \ 
  ldconfig

# pythonライブラリをインストール
COPY --from=builder /usr/src/app/requirements.txt .

RUN pip install --upgrade pip &&\
  pip install -r requirements.txt --no-deps &&\
  rm -rf ~/.cache/pip

WORKDIR /app
COPY ./main.py /app/main.py
COPY ./create_complete_movie /app/create_complete_movie
COPY ./assets/ /app/assets

CMD ["python", "main.py"]