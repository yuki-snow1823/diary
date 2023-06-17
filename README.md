## 名前
Diary

## プロジェクトの概要/目的
このプロジェクトはhoriyuの友人とチーム開発をする目的で作成されました。
友人同士で使う日記アプリです。

## 開発環境の構築方法
`docker-compose up`で起動できるようになっています。

初回起動時のみ、別のターミナルも起動して下記のコマンドを実行してください。
`docker-compose exec api rails db:create`
`docker-compose exec api rails db:migrate`


## 使用方法
工事中
最初に見るべきページや、重要な処理、ドキュメントの解説なども追記します。

## テスト方法
Github Actionsでpushした際に自動テストが実行されるようになっています。
ローカルでの実行方法は工事中です。

## インフラ構成図

```mermaid
flowchart TB
    subgraph DockerContainer
        Rails

    end
    DockerContainer<-->|GraphQL|React
    subgraph Heroku
		
			DockerContainer<-->Postgres
			subgraph HerokuAddOn
				Postgres
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
		style Postgres fill:#A3BCE2,stroke:#000000,stroke-width:4px
```