#!/bin/bash

# 构建项目
echo "正在构建项目..."
npm run build

# 提示用户上传到腾讯云Page
echo "构建完成！"
echo "请将 dist 目录下的文件上传到腾讯云 Page"
echo "或者使用腾讯云命令行工具进行部署"
echo ""
echo "dist 目录内容："
ls -la dist/