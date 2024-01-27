## 名前

Diary

## プロジェクトの概要/目的

このプロジェクトは horiyu の友人とチーム開発をする目的で作成されました。
友人同士で使う日記アプリです。

## 起動方法
```
chmod +x bin/bootstrap
bin/bootstrap
```

chmodは初回のみで大丈夫です。
Dockerの起動とフロントエンドのビルドを分けて作業したい人は、`cd frontend`をして`yarn start`を実行してください。


## 開発の手引きやアプリの説明
WIKIをご覧ください👍
https://github.com/yuki-snow1823/diary/wiki/

## テスト方法

Github Actions で push した際に自動テストが実行されるようになっています。
ローカルでは、バックエンドは` docker-compose run api bundle exec rspec s`でフロントエンドは`yarn run test`で実行できます。
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

## 画面幅
基本的に画面幅は`<Container maxWidth="sm">`を指定して、スマホで見たときに画面が見やすくなるようにしましょう。

## テストデータを増やしたい時
推奨機能の[EditCSV](https://1-notes.com/visual-studio-code-edit-csv/)をインストールして`/backend/db/seeds_csv`を編集してください。