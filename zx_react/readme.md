
dva重构说明 —— 2017-06-14

1、路由组件在 routes 目录下定义，在router.js文件中引入

2、css文件需要改成less文件，dva不支持sass和css后缀

3、图片文件统一放在 src/assets/images 目录下，img标签需要使用require引入图片，图片路径使用相对路径

4、reducer组件统一定义在 models 下面，参考项目 https://github.com/dvajs/dva-hackernews

5、后台接口组件已经写好，直接在 models 下面引入 services/service.js 文件进行接口调用

6、本地测试通过之后可以删除 App.jsx App.css Root.jsx 这三个文件

7、把react-router-dom 组件替换成 dva/router 组件

高考院校库系统说明 —— 2017-06-12

1、全局样式放在 app.css文件里面， 用 :global 定义

2、页面样式放在和页面组件 .jsx 文件同目录下面，统一放在 src/components 文件夹下面，根据页面的功能来命名

3、action常量都定义在 Action.js 文件里面，不单独使用另外的常量定义文件

4、reducer统一放在reducers文件里面

# <html lang="UTF-8" >
5、使用 rem 布局，index.html 我已经加了上面的代码，1rem=100px;

6、代码尽量要规范，功能要完善

7、redux异步解决方案目前用的是redux-thunk，有可能要替换成redux-saga或者redux-observable，所以你们调用后台接口
尽量使用BaseAction.js里面的getData方法，方便后期统一改接口

8、路由自己在app.jsx里面添加，按照以前的项目格式，页面参数统一用url paramters

9、npm包依赖需要的自己添加，但是我会检查的，另外如果两人同时修改了package.json文件，后面提交的人要负责解决冲突

git提交冲突问题：

1、提交之前先用pull更新，如果合并失败，自己负责解决冲突，完成合并，然后提交到git上面

2、决不能出现把别人的代码回滚的现象，否则当事故处理