## 概要

フロントエンドをNext.js、バックエンドapiをlaravel11でアプリケーション開発する際のspa認証の実装方法

- spa認証はsanctumで行う

## 開発環境

- next 14.1.4
- react 18
- react-dom 18
- zustand 4.5.4
- axios 1.7.2

```text
/
├── public
├── src
│    ├── components
│    ├── hooks
│    ├── lib
│    ├── pages
│    │    ├── _app
│    │    ├── _document
│    │    ├── dashboard
│    │    ├── index
│    │    ├── layout
│    │    ├── login
│    │    └── register
│    ├── stores
│    ├── styles
│    ├── types
│    └── middleware.ts      
├── .env
├── next.config
├── package.json
└── ts.config.json

```

## laravel側の用意
- laravel breezeをインストールし、sanctumを有効にする為、routes/api.phpを作成する
- envでSANCTUM_STATEFUL_DOMAINS、FRONTEND_URL、SESSION_DOMAINを設定する
- config/cors.phpを作成し、env設定読み込みとsupports_credentialsをtrueにする
- config/sanctum.phpのstatefulにenv設定を読み込む

## next.js側の用意
- next.jsをインストール、登録・ログイン・ダッシュボード画面を作成する
- hooks/authに認証apiのカスタムフックを作成する
- lib/larafetchにaxiosインスタンス設定を作成する
- stores/authにユーザー認証の状態管理を作成する
- 認証チェックのmiddleware.tsを作成

## 流れ
- register、loginでlaravelにリクエスト送信
- sanctumからcsrfレスポンスが返り、ヘッダーに付与してlaravelに送信
- breezeで認証、nextでダッシュボードへリダイレクト、ミドルウェアでユーザー情報取得しstore保存
- logoutをリクエスト送信、breezeでログアウト処理、nextでloginへリダイレクト

## 注意点

- axiosだとwithCredentialsをtrueにする必要がある
- nuxtのfetchとは異なり自動でトークンはセットしてリクエストしてくれる
- middlewareで認証チェックをする場合サーバーサイドなのでカスタムフックのレスポンスはnullになる
- middleware内でfetchアダプターとヘッダーにクッキーセットをする事になる
- middleware内でストアは直接呼べないのでgetStateを使用して保存する事になる


