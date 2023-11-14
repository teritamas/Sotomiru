[![Deploy to Firebase Hosting/Function on merge](https://github.com/teritamas/key3-global-hackathon/actions/workflows/firebase-hosting-merge.yml/badge.svg?branch=main)](https://github.com/teritamas/key3-global-hackathon/actions/workflows/firebase-hosting-merge.yml)

# Sotomiru

- [デモページ](https://key3-global-hackathon.web.app/)

## Quick Start

### 1. 必要情報の取得

はじめに下記のサービスにアクセスし、利用に必要な情報を取得する。API キーやアカウントが存在しない場合は作成する。

| サービス名     | URL                               | 必要な情報                                                                                                                                                                                               |
| -------------- | --------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OpenAI         | https://beta.openai.com/          | API キー                                                                                                                                                                                                 |
| Google Cloud   | https://console.cloud.google.com/ | サービスアカウントキー, バケット名                                                                                                                                                                       |
| Wallet Connect | https://walletconnect.org/        | プロジェクトを新規作成する。その後プロジェクト ID を取得                                                                                                                                                 |
| ThirdWeb       | https://thirdweb.net/             | API キーを発行し、クライアント ID と API キーを取得。その後 ERC1155 のコントラクトをデプロイし、そのコントラクトアドレスを取得。上記のコントラクトをデプロイする時に利用したウォレットの秘密鍵を取得する |

#### 1-1. `.env`の作成

`.env.example`をコピーして、`.env`を作成する。その後、それぞれのサービスから取得した情報を`.env`に設定する。

```bash
# Generative AIの設定
OPENAI_API_KEY=${OpenAIのAPIキー}

# GCPの設定
GOOGLE_APPLICATION_CREDENTIALS=${GCPのサービスアカウントキーのパス}
FIRE_STORAGE_BUCKET=${fire storageのバケット名}

# Firebase Authenticationの設定
FIREBASE_API_KEY=${firebaseのAPIキー}
FIREBASE_AUTH_DOMAIN=${firebaseの認証ドメイン}
FIREBASE_PROJECT_ID=${firebaseのプロジェクトID}
FIREBASE_MESSAGING_SENDER_ID=${firebaseのメッセージング送信者ID}
FIREBASE_APP_ID=${firebaseのアプリID}
FIREBASE_MEASUREMENT_ID=${firebaseの測定ID}

# Wallet Connectの設定
WALLET_CONNECT_PROJECT_ID=${wallet connectのプロジェクトID}

# thirdwebの設定
THIRD_WEB_CLIENT_ID=${Third WebのAPIクライアントID}
THIRDWEB_API_KEY=${Third WebのAPIキー}
THIRDWEB_SIGNER_PRIVATEKEY=${上記のコントラクトをデプロイしたクライアントの秘密鍵}
ERC1155_CONTRACT_ADDRESS=${利用するコントラクト}
BINGO_TOKEN_ID=${ERC1155_CONTRACT_ADDRESSのうち、ビンゴトークンのID}

# Backend API Endpoint
CONTRACT_PROXY_API_ENDPOINT=${コントラクトプロキシのエンドポイント}
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

ThirdWeb の Proxy サーバと動画作成用のサーバを起動する。(初回はビルドに 30 分程度かかる)

````bash
docker compose up -d
```

#### 2-1. デプロイ環境の起動

デプロイ環境の起動は、下記のコマンドで行う。

```bash
npm run preview
````

## デプロイ

本アプリケーションは、Firebase Hosting と Function にデプロイされている。Github のリポジトリのシークレットに以下の環境変数を設定する。

| 環境変数名               | 説明                                               |
| ------------------------ | -------------------------------------------------- |
| FIREBASE_SERVICE_ACCOUNT | サービスアカウントを json を base64 に変換したもの |
| CONFIG_VALUES            | 以下                                               |

Firebase のコンソールからサービスアカウントを発行した場合、発行したサービスアカウントに以下の権限を追加で付与する。

- Cloud Functions Developer
- Firebase Hosting Admin
- Service Account User

CONFIG_VALUES には、アプリの起動に必要な環境変数を設定する。`.env`の内容から`GOOGLE_APPLICATION_CREDENTIALS`を除いた内容をを設定する。

設定が完了後、Github Actions により自動的に検証環境にデプロイされる。
