---
title: Unity开发规范
slug: unity-style-guide
pubDate: 2024-07-03
description: UMa工作室拟采用的Unity游戏开发规范，版本v0.1.5
tags: ["gamedev", "unity"]
---

版本v0.1.5

## 项目文件夹

根目录：

- `Build` 各平台的打包文件
  - `Windows`
  - `macOS.app`
  - `WebGL`

Assets:

- `Animations` 动画(`.anim`)以及控制器(`.controller`)
- `Audio` 
  - `BGM` 背景音乐
  - `SE` 音效
- `Data` ScriptableObject数据文件
- `Fonts` 字体
- `Materials` 材质
- `Models` 3D模型
- `Prefabs` 预制体(Prefab)
- `Scenes` 场景
- `Scripts` 代码
- `Settings` 设置
  - `Localization` 本地化相关
- `Shaders`
- `Textures` 图片素材
  - `UI`

## 素材格式

- 图片：使用`.png`，尺寸为**4**的倍数
- 音乐音效：使用`.ogg`，响度归一化为 **-18** LUFS

## 命名

【**不提倡拼音命名**】美术等需要交接的素材优先使用**中文**，其次英文

例：`玩家1_身体.png`

## 编程规范

参考：

- [C# at Google Style Guide | styleguide](https://google.github.io/styleguide/csharp-style.html)
- [C# 编码约定 | Microsoft Learn](https://learn.microsoft.com/zh-cn/dotnet/csharp/fundamentals/coding-style/coding-conventions)

本文未提到的情况，以上述参考资料为准

### 命名

- 不提倡缩写，尽量写英文全称

- 临时变量和函数参数使用**驼峰**拼写法：首字母小写，中间单词首字母大写

  ```csharp
  private void Function(int count)
  {
      string message = "";
      count++;
  }
  ```

- `class` **类**名使用**Pascal**拼写法：首字母大写

  ```csharp
  public class Enemy : MonoBehaviour
  ```

- `public`变量和属性使用**Pascal**拼写法

  ```csharp
  public int Count;
  public float Speed { get; set; }
  ```

- `protected`和`private`变量使用**驼峰**拼写法和下划线 `_` 前缀

  ```csharp
  private GameObject _gameObject;
  ```

- `[SerializeField]`变量使用驼峰拼写法，且写在一行内

  ```csharp
  [SerializeField] private GameObject gameObject;
  ```

- `bool`变量以**动词**前缀：

  ```csharp
  public bool IsDead = true;
  public bool HasMoney { get; }
  private bool _isMoving = false;
  ```

- 事件命名使用动词：

  ```csharp
  public event Action OpeningDoor;
  public event Action DoorOpened;
  ```

- 来自`xx`的事件处理函数命名为 `XX_EventHappened()`

  ```csharp
  player = GetComponent<Player>();
  player.HpChanged += Player_HpChanged;
  
  private void Player_HpChanged()
  {
      //Handle the event
  }
  ```

### 布局

- 以下情况用**两个空行**分隔：

  - 变量定义和函数定义之间
  - 类/接口之间

- 注释符号和文字间有一个空格：

  ```csharp
  // 注释
  // Comment
  ```

- 基础布局顺序（从上到下）：

  1. `public`
  2. `[SerializeField]`
  3. `private`

- 类(class)内部布局顺序（从上到下）：

  1. 嵌套类、枚举`enum`
  2. 事件`event`
  3. 常量`readonly, const`
  4. 属性
  5. 字段
  6. Unity函数：`Awake, Start, Update`等
  7. 其他函数

- 当函数的参数太多时，换行并对齐：（两种方式）

  ```csharp
  // 1.第二行开始对齐
  void Function(int longArgumentName,
                int p1, int p2)
  {
      // Function
  }
  
  // 2.换行，统一缩进一个Tab(4空格)
  void Function(
      int longArgumentName,
      int p1, int p2)
  {
      // Function
  }
  ```

### 示例

- 考虑封装性，变量优先`private`，不提倡使用`public`字段
  - 需要在Unity中设置时，在`private`字段上使用`[SerializeField]`
  - 需要给其他类访问时，使用属性

```csharp
using System;
using UnityEngine;

public class Player : MonoBehaviour
{
    // 枚举
    public enum Type
    {
        Player,
        Enemy
    }
    
    // 事件
    public event Action HpChanged;
	
    // 常量
    private readonly int _maxHp = 5;
    
    // 属性
    public int Hp { get; private set; }
    public Type UnitType { get; }
    
    // 字段
    [SerializeField] private Enemy enemy;
    
    [SerializeField] private int startHp = 3;
	
    private Vector3 _position;
    private Animator _animator;
    
    
    // 函数部分: 空两行
    // Unity函数
    private void Awake()
    {
        // Awake中初始化自身的状态
        _position = transform.position;
        _animator = GetComponent<Animator>();
    }
    
    private void Start()
    {
        // Start中访问其他类
        
        // 订阅事件
        _enemy.Died += Enemy_Died;
    }
    
    private void Update() {}
    
    // 其他函数: public在前，private在后
    public void Attack()
    {
        Debug.Log("AAAAttack!");
    }
    
    public void TakeDamage(int damage)
    {
        Debug.Log($"Ahh! HP - {damage}")
    }
    
    private void Enemy_Died()
    {
        Debug.Log("好耶！");
    }
}
```
