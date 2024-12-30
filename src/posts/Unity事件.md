---
title: Unity全局事件系统
slug: unity-event
pubDate: 2024-12-30
description: Unity全局事件系统的几种实现
tags: ["unity"]
---

Unity开发中，常用到一些与游戏进度有关的广播事件（例如：游戏开始时启用敌人生成器、启用玩家控制……），此时利用全局事件可以提升便利性。全局事件系统的实现方式在实践中遇到过多种，列举如下：

## 基于字典

```csharp
public enum Event
{
    // 参数int: 玩家ID
    UserLogin = 1,
    
    // ...
}

public static class EventSystem
{
    private static Dictionary<Event, Action<object>> _eventListeners = new();
    
    
    public static void AddListener(Event eventType, Action<object> listener)
    {
        if (_eventListeners.ContainsKey(eventType))
        {
            _eventListeners[eventType] += listener;
        }
        else
        {
            _eventListeners.Add(eventType, listener);
        }
    }

    public static void RemoveListener(Event eventType, Action<object> listener)
    {
        _eventListeners[eventType] -= listener;
    }
    
    public static void InvokeEvent(Event eventType, object parameter)
    {
        if (_eventListeners[eventType].TryGetValue(eventType, out Action<object> listener))
        {
            listener?.Invoke(parameter);
        }
    }
}
```

- 扩展方式：在`Event`枚举中添加新事件类型
- 变体：将`Action<object>`替换为泛型接口可实现泛型参数
- 优点：开发中添加新事件类型非常容易
- 缺点：难以看出每种事件类型所需的参数类型，依赖注释

## 基于全局event变量

```csharp
static class EventManager
{
    public static event Action<int> UserLogin;
    public static event Action<Args> EventRaised;
    // ...
}
```

- 变体：实现全局访问可用静态类或单例
- 优点：相比基于字典的方法，能够把事件类型与所需参数关联起来
- 缺点：事件增多时`EventManager`类膨胀

## 基于Scriptable Object

当前采用的方案。对于不同类事件分到不同信道，每个信道可作为Scriptable Object创建。

```csharp
public abstract class EventChannel<TEventArgs> : ScriptableObject
{
    public event Action<TEventArgs> Raised;

    
    public void Raise(TEventArgs eventArgs)
    {
        Raised?.Invoke(eventArgs);
    }
}

[CreateAssetMenu(fileName = "New Login Event", menuName = "Events/Login Event")]
public class LoginEventChannel : EventChannel<LoginEventChannel.Args>
{
    public struct Args
    {
        public int UserId;
    }
}
```

使用方法：

```csharp
public class UI : MonoBehaviour
{
    [SerializeField] private LoginEventChannel loginEvent;
    
    
    private void Start()
    {
        loginEvent.Raised += LoginEvent_Raised;
	}
    
    private void OnDestroy()
    {
        loginEvent.Raised -= LoginEvent_Raised;
    }
    
    private void LoginEvent_Raised(LoginEventChannel.Args args)
    {
        Debug.Log($"User ID: {args.UserId}");
    }
}
```

- 缺点：开发体验较繁琐，需要创建信道asset并赋值给每个监听者的面板

