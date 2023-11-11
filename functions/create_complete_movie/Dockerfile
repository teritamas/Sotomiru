FROM python:3.11-slim as builder
WORKDIR /usr/src/app
RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry export -f requirements.txt > requirements.txt

FROM python:3.11-alpine

# フォントをインストール
RUN apk add --no-cache curl fontconfig &&\
  curl -O https://moji.or.jp/wp-content/ipafont/IPAexfont/IPAexfont00301.zip && \
  mkdir -p /usr/share/fonts/ipa && \
  mkdir -p /temp && \
  unzip IPAexfont00301.zip -d /temp && \
  cp /temp/IPAexfont00301/*.ttf /usr/share/fonts/ipa/ && \
  rm IPAexfont00301.zip && \
  rm -rf /temp && \
  fc-cache -fv

WORKDIR /opt/build

ENV OPENCV_VERSION=4.8.1
RUN set -ex \
  && echo "@edge http://dl-cdn.alpinelinux.org/alpine/edge/main" >> /etc/apk/repositories \
  && echo "@community http://dl-cdn.alpinelinux.org/alpine/edge/community" >> /etc/apk/repositories \
  && echo "@testing http://dl-cdn.alpinelinux.org/alpine/edge/testing" >> /etc/apk/repositories \
  && apk add -q --update --no-cache \
  build-base cmake \
  wget unzip \
  hdf5 hdf5-dev \
  openblas openblas-dev@community \
  libjpeg libjpeg-turbo-dev \
  libpng libpng-dev \
  ffmpeg ffmpeg-dev \
  openjpeg openjpeg-dev openjpeg-tools \
  python3-dev \
  linux-headers \
  && pip install -q numpy \
  && wget -q https://github.com/opencv/opencv/archive/${OPENCV_VERSION}.zip -O opencv.zip \
  && unzip -qq opencv.zip -d /opt && rm -rf opencv.zip \
  && cmake \
  -D CMAKE_BUILD_TYPE=RELEASE \
  -D CMAKE_INSTALL_PREFIX=/usr/local \
  -D OPENCV_ENABLE_NONFREE=OFF \
  -D WITH_FFMPEG=ON \
  -D WITH_JPEG=ON \
  -D WITH_PNG=ON \
  -D WITH_TIFF=OFF \
  -D WITH_WEBP=OFF \
  -D WITH_JASPER=OFF \
  -D WITH_EIGEN=OFF \
  -D WITH_TBB=OFF \
  -D WITH_LAPACK=OFF \
  -D WITH_PROTOBUF=OFF \
  -D WITH_V4L=OFF \
  -D WITH_GSTREAMER=OFF \
  -D WITH_GTK=OFF \
  -D WITH_QT=OFF \
  -D WITH_CUDA=OFF \
  -D WITH_VTK=OFF \
  -D WITH_OPENEXR=OFF \
  -D WITH_OPENCL=OFF \
  -D WITH_OPENNI=OFF \
  -D WITH_XINE=OFF \
  -D WITH_GDAL=OFF \
  -D WITH_IPP=OFF \
  -D BUILD_OPENCV_PYTHON3=ON \
  -D BUILD_OPENCV_PYTHON2=OFF \
  -D BUILD_OPENCV_JAVA=OFF \
  -D BUILD_TESTS=OFF \
  -D BUILD_IPP_IW=OFF \
  -D BUILD_PERF_TESTS=OFF \
  -D BUILD_EXAMPLES=OFF \
  -D BUILD_ANDROID_EXAMPLES=OFF \
  -D BUILD_DOCS=OFF \
  -D BUILD_ITT=OFF \
  -D INSTALL_PYTHON_EXAMPLES=OFF \
  -D INSTALL_C_EXAMPLES=OFF \
  -D INSTALL_TESTS=OFF \
  -D PYTHON3_EXECUTABLE=/usr/local/bin/python \
  -D PYTHON3_INCLUDE_DIR=/usr/local/include/python3.11/ \
  -D PYTHON3_LIBRARY=/usr/local/lib/libpython3.so \
  -D PYTHON_LIBRARY=/usr/local/lib/libpython3.so \
  -D PYTHON3_PACKAGES_PATH=/usr/local/lib/python3.11/site-packages/ \
  -D PYTHON3_NUMPY_INCLUDE_DIRS=/usr/local/lib/python3.11/site-packages/numpy/core/include/ \
  /opt/opencv-${OPENCV_VERSION} \
  && make -j$(nproc) \
  && make install \
  && rm -rf /opt/build/* \
  && rm -rf /opt/opencv-${OPENCV_VERSION} \
  && apk del -q --no-cache \
  build-base cmake \
  hdf5-dev \
  openblas-dev \
  libjpeg-turbo-dev \
  libpng-dev \
  openjpeg-dev \
  ffmpeg-dev \
  py3-numpy-dev \
  python3-dev \
  linux-headers

WORKDIR /app

# pythonライブラリをインストール
COPY --from=builder /usr/src/app/requirements.txt .

# g++をインストール
RUN apk add --no-cache gcc libffi-dev g++  &&\
  pip install --no-cache-dir --upgrade pip && \
  pip install -r requirements.txt --no-deps && \
  rm -rf ~/.cache/pip \
  && apk del -q --no-cache \
  gcc \
  libffi-dev \
  g++

COPY ./main.py /app/main.py
COPY ./create_complete_movie /app/create_complete_movie
COPY ./assets/ /app/assets

CMD ["python", "main.py"]