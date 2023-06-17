## 名前

Diary

## プロジェクトの概要/目的

このプロジェクトは horiyu の友人とチーム開発をする目的で作成されました。
友人同士で使う日記アプリです。

## 開発環境の構築方法

`docker-compose up`で起動できるようになっています。

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

### ActionController::RoutingError (No route matches [GET] "/ws"): のエラーが気になる場合

原因はまだわかっていないようです。以下のコマンドを実行してください。

`echo "WDS_SOCKET_PORT=0" >> frontend/.env`

