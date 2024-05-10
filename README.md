# prefecture-population-visualizer

[![CI](https://github.com/3w36zj6/prefecture-population-visualizer/actions/workflows/ci.yaml/badge.svg?branch=main&event=push)](https://github.com/3w36zj6/prefecture-population-visualizer/actions/workflows/ci.yaml)
[![Deploy to GitHub Pages](https://github.com/3w36zj6/prefecture-population-visualizer/actions/workflows/cd.yaml/badge.svg?branch=main&event=push)](https://github.com/3w36zj6/prefecture-population-visualizer/actions/workflows/cd.yaml)

![prefecture-population-visualizer](https://github.com/3w36zj6/prefecture-population-visualizer/assets/52315048/aabfbd47-dd8b-492b-846f-949a4f108af0)

## Development

### Install tools required for development

[mise]: https://mise.jdx.dev/

`.tool-versions`に記載されているバージョンのNode.jsとBunをインストールします。[mise]を使用している場合は以下のコマンドでインストールできます。

```sh
mise install
```

### Install dependencies

本リポジトリではBunで依存関係を管理しています。以下のコマンドで依存関係をインストールします。

```sh
bun install --frozen-lockfile
```

### Register for RESAS API

[RESAS API]: https://opendata.resas-portal.go.jp/

本アプリでは[RESAS API]を使用しています。利用登録を行いAPIキーを取得してください。

### Start development server

以下のコマンドで開発用サーバーを起動します。環境変数`VITE_RESAS_API_KEY`またはURLパラメータ`resas_api_key`にRESAS APIのAPIキーを設定してください。

```sh
bun run dev
```

### Setup Git hooks

[lefthook]: https://github.com/evilmartians/lefthook

本リポジトリではGit hooksの管理に[Lefthook]を使用しています。以下のコマンドで`lefthook.yml`に定義されたGit hooksのセットアップを行います。

```sh
bun install lefthook
```

## Continuous Integration

本リポジトリではGitHub Actionsを使用して`.github/workflows/ci.yaml`に定義されたCIを行っています。Pull Requestを作成する際はローカル環境においても以下のコマンドが正常終了することを確認してください。

### Format

以下のコマンドでPrettierによるフォーマットを行います。

```sh
bun run format
```

以下のコマンドでPrettierによるフォーマットをチェックします。

```sh
bun run format:check
```

### Lint

以下のコマンドでESLintによるリントを行います。

```sh
bun run lint
```

以下のコマンドでESLintによる自動修正を行います。

```sh
bun run lint:fix
```

### Build

以下のコマンドでViteによるビルドを行います。

```sh
bun run build
```

### Unit test

以下のコマンドで[`bun test`](https://bun.sh/docs/cli/test)によるテストを行います。

```sh
bun run test
```

### Playwright

以下のコマンドでPlaywrightの依存関係をインストールします。

```sh
bun playwright install --with-deps
```

以下のコマンドでPlaywrightによるE2EテストとVRTテストを行います。実行前に開発用サーバーが5173ポートで起動している必要があります。

```sh
bun run test-playwright
```

### Storybook

以下のコマンドでStorybookを起動します。

```sh
bun run storybook
```

以下のコマンドでStorybookのテストを行います。実行前にStorybookが6006ポートで起動している必要があります。

```sh
bun run test-storybook
```

## Architecture

[ARCHITECTURE](./ARCHITECTURE.md)を参照してください。

## License

[MIT License](./LICENSE)の下で公開されています。
