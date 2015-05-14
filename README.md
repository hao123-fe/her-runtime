# her-runtime
her的运行时，包括后端smarty插件和前端js框架

##系统架构

首先，我们来看一下her系统架构图

![her系统架构图](http://s0.hao123img.com/res/her/iframework.png)


her主要包括2个部分：编译系统、运行时

###编译系统

编译系统主要工作是对模板(tpl)、JS、文件编译，编译包含了资源分析、模板编译、资源打包等过程，最终会生成一个map文件、供运行时的资源管理用。

编译工具分别是基于FIS的扩展和基于GULP的扩展，可以根据自己团队的需求选择一种合适的编译工具。

###运行时
运行时包括2个部分，前端和后端：

后端运行时是通过PHP+Smarty插件实现的，包括控制器的选择、页面输出控制，通过编译工具输出的map文件做资源管理。

前端运行时是JS实现的，包括对Pagelet的渲染控制、AMD模块管理，静态资源加载等功能。

## 设计思想

###传统页面	

![页面](http://s0.hao123img.com/res/her/htmlsmall.png)	

代码如下：

```
 <html>
    <head><link href="{页面样式}" /></head>
    <body>
        <div>HTML内容</div>
        <div>HTML内容</div>
        <div>HTML内容</div>
        <script src="{页面功能Js}"></script>
    </body>
</html>
```
传统页面的输出方式大家都很熟悉，无需赘述

###使用Pagelet标记区块

![页面](http://s0.hao123img.com/res/her/htmlsmall.png)	

代码如下：

```
<html>
    <head><link href="{框架样式}" /></head>
    <body>
         {pagelet}
			HTML内容
			<script runat="server">
			//区块的功能
			</script>
	     {/pagelet}
         {pagelet}HTML内容{/pagelet}
         {pagelet}HTML内容{/pagelet}
     </body>
</html>
```
我们用{pagelet}标签去替代div标签，它实际上是一个smarty插件，我们可以看看它最终输出成html的结果：

```
 <html>
    <head><link href="{框架样式}" /></head>
    <body>
        <div id="__elm_0_1"></div>
        <div id="__elm_0_2"></div>
        <div id="__elm_0_3"></div>
        <script src="{框架Js}"></script>
        <code id="__cnt_0_1" style="display:none"><!-- HTML片段 --></code>
        <script>
           Bigpipe.onPageletArrive({
              "id":"__elm_0_1",//Pagelet ID
              "container_id":"__cnt_0_1",//片段内容ID
              "css":[],//依赖样式
              "js":[],//依赖脚本
              "callback":{"load":["__cb_0_1"]}//回调函数名
           });
        </script>
    </body>
</html>
```
页面会首先把{Pagelet}区块输出成一个空的div占位，同时会输出code标签，内容就是对应Pagelet的html片段，接下来再通过Bigpipe.onPageletArrive的方式输出这个Pagelet。

### 优势

自动分析Pagelet依赖的资源(CSS、JS)，细粒度的控制页面输出， 配合上Bigrender，极大的优化页面的首屏时间和资源总下载时间

