webpack构建优化

#减少搜索范围
##1、 减少loader处理的文件范围，可以通过inclued或exclude 限定命中范围
##2、 优化resolve.modules配置， 指定webpack去哪个目录下搜索第三方模块
##3、 优化resolve.mainFields配置， 指定第三方模块使用的入口文件
##4、 优化resolve.alias配置， 配置别名 减少webpack的递归解析操作
##5、 优化resolve.extentions, 配置默认后缀名 减少webpack的匹配操作
##6、 优化module.noParse, 忽略对没有采用模块化的文件的递归解析 如jQuery
#使用动态链接库，避免模块的多次打包， 缩短编译时间
#使用雪碧图，将页面小图标整理到一起
#使用happypack开启多线程处理loader，但是还不能并行处理vue-loader，缩短打包编译时间
#使用webpack-parallel-uglify-plugin开启多进程压缩文件， 但是现在在webpack4我还没有引入成功
#开热更新

#区分环境 webpack4 通过mode设置
#代码的压缩 使用uglifyjs-webpack-plugin插件 在mode为production时 没有效果 反而打包的时间更长了，
#使用mini-css-extract-plugin压缩并提取css
#接入CDN加速，将静态资源部署到CDN，提升页面加载速度
#开启tree shaking ，设置mode：production时 默认开启， 设置mode:development 还要加optimization: {usedExports: true},
#提取公共代码
#按需加载代码
#使用scope hoisting 在webpack4中mode：production时默认开启
