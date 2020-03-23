webpack构建优化

一、减少搜索范围
1、 减少loader处理的文件范围，可以通过inclued或exclude 限定命中范围
2、 优化resolve.modules配置， 指定webpack去哪个目录下搜索第三方模块
3、 优化resolve.mainFields配置， 指定第三方模块使用的入口文件
4、 优化resolve.alias配置， 配置别名 减少webpack的递归解析操作
5、 优化resolve.extentions, 配置默认后缀名 减少webpack的匹配操作
6、 优化module.noParse, 忽略对没有采用模块化的文件的递归解析 如jQuery
