# Architecture

- `components/`: Reactコンポーネントを格納するディレクトリ
  - `atoms/`: 最小単位のコンポーネントのAtomを格納するディレクトリ
  - `molecules/`: Atomを組み合わせたドメイン知識を持たないコンポーネントを格納するディレクトリ
  - `organisms/`: Moleculeを組み合わせたドメイン知識を持つコンポーネントを格納するディレクトリ
- `core/`: ロジックを格納するディレクトリ
  - `interface/`: Controllerの実装を格納するディレクトリ
  - `application/`: Use Caseの実装を格納するディレクトリ
  - `domain/`: Domain Modelの定義を格納するディレクトリ
  - `infrastructure/`: Repositoryの実装を格納するディレクトリ
- `helpers/`: 汎用的な関数を格納するディレクトリ
- `App.tsx`: コンポーネントを組み合わせてページ全体を構築しているファイル
