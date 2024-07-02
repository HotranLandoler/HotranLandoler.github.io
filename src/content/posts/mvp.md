---
title: MVP变换矩阵
slug: mvp-matrix
pubDate: 2024-07-01
description: 关于渲染管线中MVP变换矩阵相关概念的学习
tags: ["computer-graphics"]
---

MVP变换把顶点从模型局部空间转到裁剪空间。

## Model

模型变换：模型局部坐标空间 -> 世界空间。

按顺序对每个模型顶点进行三类仿射变换：

1. 缩放
2. 旋转
3. 平移

## View

视图变换：世界空间 -> 相机空间。

**同时**对相机和模型顶点进行一系列变换，使得相机：

- 位于世界原点
- 朝向-z方向
- 头顶方向与+y对齐

此时模型与相机间的相对位置不变，模型顶点坐标已转换为相机空间坐标。

## Projection

投影变换：相机空间 -> 裁剪空间。

投影变换矩阵 = 正交投影矩阵 * 透视投影矩阵。

### 透视投影

把视锥体的远端缩小，变换为长方体。

假设相机到近平面**距离**（与实际z坐标相区分）`near`，到远平面距离`far`：

根据相似三角形，视锥体内任意一点`(x,y,z,1)`的投影坐标为`(near * x, near * y, ?, z)`，代入近平面和远平面上的点，解得透视投影矩阵：

```cpp
Eigen::Matrix4f perspective_projection;
perspective_projection << near, 0, 0, 0,
                          0, near, 0, 0,
                          0, 0, (far + near), -(far * near),
                          0, 0, 1, 0;
```

### 正交投影

给定相机视野`fov`、宽高比`aspectRatio`，假设相机看向近平面的中心点：

1. 把长方体平移到坐标原点
2. 缩放到长宽高各为2

得到正交投影矩阵：

```cpp
Eigen::Matrix4f orthographic_projection;
Eigen::Matrix4f translation;
Eigen::Matrix4f scale;

translation << 1, 0, 0, 0,
               0, 1, 0, 0,
               0, 0, 1, (far + near) / 2,
               0, 0, 0, 1;
							 
scale << 1 / (aspect_ratio * near * tan(fov / 2)), 0, 0, 0,
         0, 1 / (near * tan(fov / 2)), 0, 0,
         0, 0, 2 / (far - near), 0,
         0, 0, 0, 1;

orthographic_projection = scale * translation;
```

