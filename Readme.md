<h1>🎨 GitHub Animated Avatar Border</h1>

## 🎯 Описание: ##
**Пользовательский скрипт для добавления анимированной рамки аватара на GitHub.**

## 📝 Установка: ##

[![Tampermonkey](https://img.shields.io/badge/Tampermonkey-Get-green?style=for-the-badge&logo=tampermonkey)](https://www.tampermonkey.net/)
[![GitHub](https://img.shields.io/badge/GitHub-Script-orange?style=for-the-badge&logo=tampermonkey)](https://raw.githubusercontent.com/smi-falcon/GitHub-Animated-Avatar-Border/refs/heads/main/Userscript/GitHub%20Animated%20Avatar%20Border.js)

## 🛠️ Настройка: ##

**1. Изменение цвета анимации:**
- Замените цвета в ```@keyframes avatar-glow:```
```css 
box-shadow: 0 0 5px #ВАШ_ЦВЕТ, 0 0 10px #ВАШ_ЦВЕТ, 0 0 15px #ВАШ_ЦВЕТ;
```
**2. Более простая рамка (как в Steam):**
```css 
.animated-avatar-border {
    border: 2px solid #00ffff !important;
    box-shadow: 0 0 10px #00ffff, inset 0 0 10px #00ffff !important;
    animation: pulse 2s infinite !important;
}

@keyframes pulse {
    0% { opacity: 0.7; }
    50% { opacity: 1; }
    100% { opacity: 0.7; }
}
```
**3. Вращающаяся рамка:**
```css
.animated-avatar-border {
    border: 3px solid transparent !important;
    border-image: linear-gradient(45deg, #f00, #0f0, #00f, #f00) 1 !important;
    animation: rotate-border 2s linear infinite !important;
}

@keyframes rotate-border {
    from { border-image-source: linear-gradient(0deg, #f00, #0f0, #00f, #f00); }
    to { border-image-source: linear-gradient(360deg, #f00, #0f0, #00f, #f00); }
}
```

## 🛠️ Дополнительные варианты анимаций: ##

**Минималистичная pulsating рамка:**
```css
.animated-avatar-border {
    border: 2px solid #58a6ff !important;
    animation: gentle-pulse 3s ease-in-out infinite !important;
}

@keyframes gentle-pulse {
    0%, 100% { box-shadow: 0 0 5px #58a6ff; }
    50% { box-shadow: 0 0 20px #58a6ff; }
}
```
**Огненная тема:**
```css
@keyframes fire-glow {
    0% { box-shadow: 0 0 5px #ff4400, 0 0 10px #ff4400; }
    50% { box-shadow: 0 0 15px #ffaa00, 0 0 30px #ffaa00; }
    100% { box-shadow: 0 0 5px #ff4400, 0 0 10px #ff4400; }
}
```
**Ледяная тема:**
```css
@keyframes ice-glow {
    0% { box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
    50% { box-shadow: 0 0 15px #ffffff, 0 0 30px #00ffff; }
    100% { box-shadow: 0 0 5px #00ffff, 0 0 10px #00ffff; }
}
```

## 📚 Функциональность: ##

- Добавление анимированной рамки вокруг аватара пользователя.
- Поддержка различных стилей анимации.
- Автоматическое применение при загрузке страницы.
- Совместимость с темной и светлой темами GitHub.

## 📚 Технические особенности: ##

- Реализовано на чистом JavaScript и CSS
- Не требует дополнительных разрешений
- Оптимизированная производительность
- Поддержка динамического контента

## ✅ Совместимость: ##

- Google Chrome
- Microsoft Edge
- Mozilla Firefox
- Safari

## ⭐ Поддержка проекта: ##
Если вам понравился данный проект, поставьте ему звезду на GitHub.

## 📄 Лицензия: ##

[MIT License](https://github.com/smi-falcon/GitHub-Animated-Avatar-Border/blob/main/License.md)
