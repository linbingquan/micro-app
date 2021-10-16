# 应用数据通讯

```js
import microApp from '@/micro-app/index.js'

function dataListener (data) {
  console.log('来自子应用my-app的数据', data)
}

/**
 * 绑定监听函数
 * appName: 应用名称
 * dataListener: 绑定函数
 * autoTrigger: 在初次绑定监听函数时有缓存数据，是否需要主动触发一次，默认为false
 */
microApp.addDataListener(appName: string, dataListener: Function, autoTrigger?: boolean)

// 解绑监听my-app子应用的函数
microApp.removeDataListener(appName: string, dataListener: Function)

// 清空所有监听appName子应用的函数
microApp.clearDataListener(appName: string)
```

## 手动发送数据

```js
microApp.setData('my-app', {type: '新的数据'}) // 发送数据给子应用 my-app
```

## 手动获取数据

```js
microApp.getData(appName) // 返回子应用发送的data数据
```