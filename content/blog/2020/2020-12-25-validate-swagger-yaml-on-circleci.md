---
title: CircleCIで Swagger yaml ファイルのバリデーションをする
date: 2020-12-25
---

## 背景

RESTful APIのAPIドキュメントとしてSwaggerを利用している人も多いと思います。 yamlファイルとSwagger UIを利用している場合、ついついエラーに気づかず進めてしまうことが多々ありました。
先日開発チームの同僚が年末大掃除として溜まりに溜まったエラーを一気に修正してくれましたが、何かしらの対策をしないと知らずにエラーをまた埋め込んでしまう...
そこで再発防止策としてCI上で Swagger の yaml ファイルをバリデーションし文法エラーを自動的に検知するようにしました。

## 環境
- CircleCI version 2.1
- Open API version 3

## 方針

[APIDevTools/swagger-cli](https://github.com/APIDevTools/swagger-cli)を使って Swagger yamlファイルをバリデーションします。 
swagger-cli は名前の通り Swagger 定義をバリデーションするツールで `validate` コマンドを渡すことで簡単にチェックできます。

**正常な場合**

```shell script
$ swagger-cli validate petstore.yml
petstore.yml is valid
```

**異常な場合**

```shell script
$ swagger-cli validate petstore.yml
Swagger schema validation failed.
  Additional properties not allowed: tag at #/paths//pets/get
  
JSON_OBJECT_VALIDATION_FAILED
```

これをCI上で実行すればOK！

## 導入

1. yarn run で実行できるように package.json の　scripts 定義をする

```json
{
  "scripts": {
    "validate:swagger-yml": "swagger-cli validate"
  },
  "devDependencies": {
    "@apidevtools/swagger-cli": "^4.0.4"
  }
}
```

2. `.circleci/config.yml` に以下を定義する

設定ファイル全体を以下に定義していますが必要なのは `swagger_yaml_validate` のジョブの箇所です。それ以外はお好みに調整してください。

```yaml
version: 2.1
executors:
  default:
    docker:
      - image: circleci/node:10.18.0-buster
commands:
  build:
    steps:
      - checkout
  yarn_install:
    steps:
      - restore_cache:
          name: Restore Yarn Package Cache
          keys:
            - yarn-packages-{{ checksum "yarn.lock" }}
      - run:
          name: Install Dependencies
          command: yarn install --immutable
      - save_cache:
          name: Save Yarn Package Cache
          key: yarn-packages-{{ checksum "yarn.lock" }}
          paths:
            - ~/.cache/yarn
jobs:
  swagger_yaml_validate:
    executor:
      name: default
    steps:
      - build
      - yarn_install
      - run:
          name: Run validate swagger yaml file
          command: yarn run validate:swagger-yml your_schema.yml
workflows:
  version: 2
  build_and_test:
    jobs:
      - swagger_yaml_validate
```

あとは CircleCI 上で実行するだけです。わざと Swagger yaml 内で文法ミスを起こしてコミットし、CI上でエラーが起きれば成功です。

## まとめ
ついつい見逃しがちな小さなエラーも年単位で貯まると修正するのも大変です。最初から発生しないようにしておけば負債にならずに済みます。
導入自体は簡単なのでもし同じような悩みを抱えている場合は試してみてください。

## 参考
- [CircleCI 2\.1 Reference – CircleCI 2\.1 Reference](https://circleci.com/docs/reference-2-1/#circleci-2-1-reference)[CircleCI 2\.1 Reference – CircleCI 2\.1 Reference](https://circleci.com/docs/reference-2-1/#circleci-2-1-reference)
- [APIDevTools/swagger\-cli: Swagger 2\.0 and OpenAPI 3\.0 command\-line tool](https://github.com/APIDevTools/swagger-cli)
