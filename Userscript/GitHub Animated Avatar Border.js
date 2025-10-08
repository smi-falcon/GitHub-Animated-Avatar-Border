// ==UserScript==
// @name         GitHub Animated Avatar Border
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  Добавляет анимированную рамку для аватарки на GitHub.
// @downloadURL  https://github.com/smi-falcon/GitHub-Animated-Avatar-Border/raw/main/Userscript/GitHub%20Animated%20Avatar%20Border.js
// @updateURL    https://github.com/smi-falcon/GitHub-Animated-Avatar-Border/raw/main/Userscript/GitHub%20Animated%20Avatar%20Border.js
// @homepageURL  https://github.com/smi-falcon/GitHub-Animated-Avatar-Border
// @supportURL   https://github.com/smi-falcon/GitHub-Animated-Avatar-Border/issues
// @author       Falcon (https://github.com/smi-falcon)
// @match        https://github.com/*
// @match        https://gist.github.com/*
// @icon         https://github.githubassets.com/favicons/favicon.svg
// @icon64       https://github.githubassets.com/favicons/favicon.png
// @license      MIT
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    const style = document.createElement('style');
    style.textContent = `
        @keyframes avatar-glow {
            0% {
                box-shadow: 0 0 5px #ff6b6b, 0 0 10px #ff6b6b, 0 0 15px #ff6b6b;
            }
            25% {
                box-shadow: 0 0 10px #4ecdc4, 0 0 20px #4ecdc4, 0 0 30px #4ecdc4;
            }
            50% {
                box-shadow: 0 0 15px #45b7d1, 0 0 30px #45b7d1, 0 0 45px #45b7d1;
            }
            75% {
                box-shadow: 0 0 10px #96ceb4, 0 0 20px #96ceb4, 0 0 30px #96ceb4;
            }
            100% {
                box-shadow: 0 0 5px #ff6b6b, 0 0 10px #ff6b6b, 0 0 15px #ff6b6b;
            }
        }

        .animated-avatar-border {
            animation: avatar-glow 3s ease-in-out infinite;
            border-radius: 50% !important;
            padding: 3px !important;
            background: linear-gradient(45deg, #ff6b6b, #4ecdc4, #45b7d1, #96ceb4) !important;
            background-size: 400% 400% !important;
            animation: avatar-glow 3s ease infinite, gradient-shift 4s ease infinite !important;
        }

        @keyframes gradient-shift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
    `;
    document.head.appendChild(style);

    function applyAnimatedBorder() {
        const avatarSelectors = [
            'img.avatar-user',
            'img.avatar',
            '[data-hovercard-type="user"] img',
            '.js-profile-editable-area img.avatar',
            'img[alt*="avatar"]',
            '.avatar img'
        ];

        const allAvatars = new Set();

        avatarSelectors.forEach(selector => {
            const avatars = document.querySelectorAll(selector);
            avatars.forEach(avatar => {
                if (avatar.tagName === 'IMG') {
                    allAvatars.add(avatar);
                }
            });
        });

        allAvatars.forEach(avatar => {
            if (!avatar.classList.contains('animated-border-applied')) {
                avatar.classList.add('animated-avatar-border');
                avatar.classList.add('animated-border-applied');

                const observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if (mutation.type === 'attributes' && mutation.attributeName === 'src') {
                            setTimeout(() => {
                                if (!avatar.classList.contains('animated-avatar-border')) {
                                    avatar.classList.add('animated-avatar-border');
                                }
                            }, 100);
                        }
                    });
                });

                observer.observe(avatar, { attributes: true, attributeFilter: ['src'] });
            }
        });
    }

    function delayedApply() {
        setTimeout(applyAnimatedBorder, 100);
    }

    window.addEventListener('load', applyAnimatedBorder);

    const observer = new MutationObserver(function(mutations) {
        let shouldApply = false;

        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                shouldApply = true;
            }
        });

        if (shouldApply) {
            delayedApply();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    applyAnimatedBorder();
    setTimeout(applyAnimatedBorder, 500);
    setTimeout(applyAnimatedBorder, 2000);
})();
