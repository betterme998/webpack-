

const {resolve} = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

// 设置nodejs环境变量  这样就会以development环境 process(过程) env(环境)
// 不设置时 会以默认生产环境去运行
// process.env.NODE_ENV = 'development';
module.exports = {
    entry:'./src/js/index.js',
    output:{
        filename:'js/main.js',
        path:resolve(__dirname,'build')
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:[
                    miniCssExtractPlugin.loader,
                    'css-loader',
                    // webpack5版本的写法
                    'postcss-loader'
                    /*
                    css兼容性处理，使用一个库：postcss
                    如果postcss库想在webpack中使用 得使用一个东西--> postcss-loader 除了要使用（postcss-loader）外还要用
                    一个插件--> postcss-preset-env(这个插件能帮postcss识别某些环境，从而加载指定的配置，能够让兼容性做到精确
                    到某一个浏览器的版本 要下载 postcss-loader 和 postcss-preset-env)
                    */


                    // **********************************************************************************************************
                    // postcss-preset-env插件帮postcss找到package.json中的browserslist里面的配置，通过配置加载指定的css兼容性样式
                    // 所以要在package.json中加一个配置browserslist值为一个对象，对象里可写两个参数1."development"：[]   (开发环境配置)
                    // 和 2. "production":[]   （生产环境配置）
                    //如：
                    /*
                        "browserslist":{   //在package.json中添加配置

                            // 默认情况下会看生产环境，如果要看开发环境 得设置环境变量：（指nodejs中的环境变量）process.env.NODE_ENV = 'development'
                            "development":[  //第一个参数 开发环境 值为数组
                                "last 1 chrome version"，   //代表兼容最近的一个chrom版本
                                "last 1 firefox version"，  //代表兼容最近的一个firefox版本
                                "last 1 safari version"     //代表兼容最近的一个safari版本
                                //开发版本不用写太多
                            ],
                            "production":[  //第二个参数  生产环境 值为数组  可以写多些  默认是看生产环境的
                                ">0.2%",  //大于99.8%的浏览器
                                "not dead",  //不要已经死了的浏览器 如IE10 
                                "not op_mini all"  //不用op_mini的浏览器
                            ]
                        }


                        //可以去github搜索browserslist 来了解更多的参数 以及有详细的介绍
                    */ 
                //    ***************************************************************************************************




                    
                    
                        // 以下是老版本的写法
                    // ********************************************************************************************
                    //写配置 有两种写法
                    // 第一种 使用loader的默认配置 如 'css-loader'就是默认写法 不修改任何配置
                    // 'postcss-loader'
                    // 但需要修改loader配置 得用第二种写法：用对象的方式
                    // {
                        
                    //     loader:'postcss-loader',
                    //     // 在options里面修改 postcss-loader的配置
                    //     options:{
                    //         // 固定写法
                    //         ident:'postcss',
                    //         // 使用postcss的一些插件，插件的返回值得是一个数组
                    //         plugins:()=>[
                    //             // postcss的插件  postcss-preset-env
                    //             require('postcss-preset-env')()
                    //         ]
                    //     }
                    // }

                    // *******************************************************************************************
                   

                    // **********************************************************************************
                        // webpack5 在postcss里修改 postcss-loader的配置 module.exports={
                        // 要在与webpack.config.js同级目录下创建名为 postcss.config.js 修改postcss-loader里的配置 如下:
                        /*
                        module.exports ={
                            plugins:[
                                require('postcss-preset-env')();
                            ]
                        }
                        2.接下来就是往package.json添加一个browserslist配置如下:
                        "browserslist": {
                            "development": [ 
                            "last 1 chrome version",
                            "last 1 firefox version",
                            "last 1 safari version"
                            ],
                            "production": [
                            ">0.1%",
                            "not dead",
                            "not op_mini all"
                        ]
                        3.修改nodejs环境配置 这样就可以用development开发环境
                        process.env.NODE_ENV = 'development';
                    }
                         */ 


                    

                ]
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            template:'./src/index.html'
        }),
        new miniCssExtractPlugin({
            filename:'css/main.css'
        })
    ],
    mode:'development'
}