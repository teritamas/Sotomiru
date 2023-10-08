# Web3 Global Hackathon

- [デモページ](https://key3-global-hackathon.web.app/)

## Quick Start

### 1. 必要情報の取得

はじめに下記のサービスにアクセスし、利用に必要な情報を取得する。

| サービス名   | URL                               | 必要な情報                         |
| ------------ | --------------------------------- | ---------------------------------- |
| OpenAI       | https://beta.openai.com/          | API キー                           |
| Google Cloud | https://console.cloud.google.com/ | サービスアカウントキー, バケット名 |

#### 1-1. `.env`の作成

`.env.example`をコピーして、`.env`を作成する。その後、それぞれのサービスから取得した情報を`.env`に設定する。

```bash
# Generative AIの設定
OPENAI_API_KEY=${OpenAIのAPIキー}

# GCPの設定
GOOGLE_APPLICATION_CREDENTIALS=${GCPのサービスアカウントキーのパス}
```

### 2. サーバの起動

必要ライブラリをインストール。

```bash
npm install
```

開発用サーバを起動する。

```bash
npm run dev
```

#### 2-1. デプロイ環境の起動

デプロイ環境の起動は、下記のコマンドで行う。

```bash
npm run preview
```
