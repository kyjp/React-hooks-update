Experimental まだ本番環境で使うことがおすすめされていない

Canary Reactバージョンを固定して使うことをお勧めされている

Latest 安定したリリース

Canary
## useOptimistic
UIを楽観的に更新するためのフック
すぐにUIを更新するようなものに使う（apiの通信を待たずにUIの更新をする場合など）
非同期処理を開始する際に、処理成功後の状態をもうUIに反映する
※ただし、処理が失敗した場合は、その状態を元に戻す必要がある

```
const [optimisticState, addOptimistic] = useOptimistic(state, updateFn)
```

## useTransition
UIをブロックせずにstateを更新するためのもの
レンダリングに非常に重い(遅い)処理がある画面レンダリングを遅延して、レンダリングが完了してから表示するために利用する

1.startTransitionを使ってsetStateで値を更新
2.画面表示は変わらず(ペンディング状態)、裏側でレンダリングが実行される。(この間ユーザーは、画面操作が可能)
3.画面レンダリングが完了した時点で画面が切り替わる
この裏側でレンダリング中に別の状態更新が起こった場合は、裏側のレンダリングをReactがキャンセルしてくれる。
inputの状態更新にuseTransitionは推奨されていない

```
const {isPending, startTransition} = useTransition()
```

## Suspense
コンポーネントを「ローディング中なのでまだレンダリングできない」という状態にすることができる
```
<Suspense fallback={<div>サスペンドしたらこれが表示される</div>}>
  {/* ↓サスペンドしなかったらこれが表示される */}
  <MyComponent />
</Suspense>
```

## useDeferredValue
UIの一部の更新を遅延させるためのReactフック
- 最新の情報を取得中に古い情報を見せておく
- 今の情報が古いことをユーザーに伝える
- 頻度が高すぎるレンダリングを遅延させパフォーマンスを改善させる
```
const deferredQuery = useDeferredValue(query)
```

Canary
## useFormState　→　useActionState
サーバーコンポーネントをサポートするフレームワークを使用する必要がある
サーバー側で使うuseStateのようなもの
https://zenn.dev/zksytmkn/articles/cf2acb2faf7cd2
https://zenn.dev/cybozu_frontend/articles/think-about-pe

### RSC(React Server Component)
サーバーでプリレンダリングしていくコンポーネント、パフォーマンスが上がる

サーバーアクション
サーバーアクションはサーバー上で実行される非同期関数

```
'use server'
```
これ以下の記述はサーバー側で実行される

Canary
## useFormStatus
直近のフォーム送信に関するステータスを提供するフック

```
const { pending } = useFormStatus()
```
