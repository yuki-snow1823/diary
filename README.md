## 名前

Diary

## プロジェクトの概要/目的

このプロジェクトは horiyu の友人とチーム開発をする目的で作成されました。
友人同士で使う日記アプリです。

## 開発環境の構築方法

`docker-compose up`でバックエンドのAPIを起動することができます。
その後、frontendのディレクトリで`yarn install && yarn start`を実行してください。

## 使用方法

工事中
最初に見るべきページや、重要な処理、ドキュメントの解説なども追記します。

## テスト方法

Github Actions で push した際に自動テストが実行されるようになっています。
ローカルでの実行方法は工事中です。

## インフラ構成図

```mermaid
flowchart TB
    subgraph DockerContainer
        Rails

    end
    DockerContainer<-->|GraphQL|React
    subgraph Heroku

			DockerContainer<-->MySQL
			subgraph HerokuAddOn
				MySQL
			end
    end
    subgraph Vercel

    React
    end

		style React fill:#D7E7AF,stroke:#000000,stroke-width:4px
		style Vercel fill:#A2D7D4,stroke:#000000,stroke-width:4px
		style Rails fill:#F5B2B2,stroke:#000000,stroke-width:4px
		style Heroku fill:#A59ACA,stroke:#000000,stroke-width:4px
		style DockerContainer fill:#9FD9F6,stroke:#000000,stroke-width:4px
		style HerokuAddOn fill:#CFA7CD,stroke:#000000,stroke-width:4px
		style MySQL fill:#A3BCE2,stroke:#000000,stroke-width:4px
```

## ActionController::RoutingError (No route matches [GET] "/ws"): のエラーが気になる場合

原因はまだわかっていないようです。以下のコマンドを実行してください。

`echo "WDS_SOCKET_PORT=0" >> frontend/.env`

## フロントエンド構成
アーキテクチャは**container presentational pattern**を利用：[参考記事](https://zenn.dev/buyselltech/articles/9460c75b7cd8d1)
- srcディレクトリ配下に機能ごとのディレクトリ&share（全体で利用できるもの）を配置
- 機能ごとのディクトリ配下
	- component: container, presentationalファイル
	- hooks: メソッドの集まり

ディレクトリ構成例
```
frontend/
	└ src/
		├ 機能ごとのディレクトリ（loginなど）
		│ 	├ component/
		│ 	│		├ container.tsx
		│ 	│		└ presentational.tsx
		│ 	└ hooks/
		├ ...
		└ share/：全体で利用できるもの
			├ button.tsx
			├ ...
```
