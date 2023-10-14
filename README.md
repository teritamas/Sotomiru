# Web3 Global Hackathon

- [デモページ](https://key3-global-hackathon.web.app/)

## Quick Start

### 1. 必要情報の取得

はじめに下記のサービスにアクセスし、利用に必要な情報を取得する。API キーやアカウントが存在しない場合は作成する。

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
FIRE_STORAGE_BUCKET=${GCPのサービスアカウントキーのパス}
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

## デプロイ

本アプリケーションは、Firebase Hosting と Function にデプロイされている。Github のリポジトリのシークレットに以下の環境変数を設定する。

| 環境変数名               | 説明                                               |
| ------------------------ | -------------------------------------------------- |
| FIREBASE_SERVICE_ACCOUNT | サービスアカウントを json を Base64 に変換したもの |
| CONFIG_VALUES            | 以下                                               |

Firebase のコンソールからサービスアカウントを発行した場合、発行したサービスアカウントに以下の権限を追加で付与する。

- Cloud Functions Developer
- Firebase Hosting Admin

CONFIG_VALUES には、アプリの起動に必要な環境変数を、半角スペース区切りで設定する。

```
open_api_key=${OpenAPI のキー} fire_storage_bucket=${バケット名}
```

設定が完了後、Github Actions により自動的に検証環境にデプロイされる。
