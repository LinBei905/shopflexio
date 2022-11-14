- `_common.d.ts`：基础的类型定义。
- XxxQuery：表示 http 请求的 query。如：
  `GetPlatformQuery: {id: '123'}` 对应 http url: /platform?id=123
- XxxBody: 表示 http post 请求 body。
- Xxx?：表示可选，默认无。例如：`Display: {docsUrl?: string}`。表示 docsUrl 是可选字段，默认没有该字段。

## 默认规范

- status：由后端维护一个**统一的** 状态表。
  例如：status = -1 表示删除，对于所有 status 都表示删除。status 具体到指定数值。
- 保留一个 display 字段。用于前端展示，且可以在 adm.shopflex.io 提供编辑功能。

- 更新、创建返回更新、创建后的**完整**数据。
- 更新支持部分更新。
  例如：更新 flowBlock.name，返回更新完成后整个 flowBlock 的数据。

词汇表： 如果表达上没有歧义的话后续不会再改，沟通的时候也按词汇表沟通。

| 词汇        | 描述                            |
| ----------- | ------------------------------- |
| block       | 未实例化的 block                |
| flowBlock   | 已经实例化的 block              |
| operation   |                                 |
| config      | 配置项                          |
| inputs      | 根据配置填充后的表单记作 inputs |
| platform    | Shopify、Shopline、Shoplazza    |
| integration | Google sheet 等                 |

![](images/2022-08-07-12-18-44.png)
![](images/2022-08-07-12-19-00.png)
