// ==UserScript==
// @name         GitHub Animated Avatar Border
// @namespace    http://tampermonkey.net/
// @version      1.2
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

    let myUsername = null;

    function getMyUsername() {
        if (myUsername) return myUsername;

        const metaUser = document.querySelector('meta[name="user-login"]');
        if (metaUser) {
            myUsername = metaUser.getAttribute('content');
            return myUsername;
        }

        const userNav = document.querySelector('[data-feature-category="user_nav"]');
        if (userNav) {
            const links = userNav.querySelectorAll('a');
            for (let link of links) {
                const href = link.getAttribute('href');
                if (href && href.startsWith('/') && href !== '/') {
                    const match = href.match(/^\/([^\/?]+)/);
                    if (match && match[1]) {
                        myUsername = match[1];
                        return myUsername;
                    }
                }
            }
        }

        return null;
    }

    function isMyAvatar(avatar) {
        const username = getMyUsername();
        if (!username) return false;

        const currentUrl = window.location.pathname;
        const isMyProfile = currentUrl === `/${username}` || currentUrl.startsWith(`/${username}/`);

        if (isMyProfile) {
            const profileAvatars = document.querySelectorAll('.js-profile-editable-area img, .Layout-sidebar img.avatar, [itemprop="image"], .avatar.avatar-small, header img.avatar');
            for (let profileAvatar of profileAvatars) {
                if (profileAvatar === avatar) {
                    return true;
                }
            }

            if (avatar.closest('header') || avatar.closest('.Layout-header')) {
                return true;
            }

            if (avatar.closest('[data-test-selector="profile-avatar"]')) {
                return true;
            }

            return false;
        }

        const parentLink = avatar.closest('a');
        if (parentLink) {
            const href = parentLink.getAttribute('href');
            if (href && href.startsWith(`/${username}`)) {
                return true;
            }
        }

        const altText = avatar.getAttribute('alt') || '';
        if (altText.toLowerCase().includes(username.toLowerCase())) {
            return true;
        }

        const hovercardParent = avatar.closest('[data-hovercard-type="user"]');
        if (hovercardParent) {
            const hovercardUrl = hovercardParent.getAttribute('data-hovercard-url');
            if (hovercardUrl && hovercardUrl.includes(`/${username}`)) {
                return true;
            }
        }

        const repositoryHeader = avatar.closest('.Layout-header, .repohead, .gh-header');
        if (repositoryHeader && isMyProfile) {
            return true;
        }

        return false;
    }

    function applyAnimatedBorder() {
        const avatarSelectors = [
            'img.avatar',
            'img.avatar-user',
            '[data-hovercard-type="user"] img',
            'header img.avatar',
            '.Layout-header img.avatar',
            '.avatar.avatar-small',
            '[data-test-selector="profile-avatar"] img'
        ];

        avatarSelectors.forEach(selector => {
            const avatars = document.querySelectorAll(selector);
            avatars.forEach(avatar => {
                if (avatar.tagName === 'IMG' &&
                    !avatar.classList.contains('animated-border-applied') &&
                    isMyAvatar(avatar)) {

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
        });

        const currentUrl = window.location.pathname;
        if (currentUrl === '/settings/profile' || currentUrl === '/dashboard') {
            const headerAvatars = document.querySelectorAll('header img.avatar, .AppHeader img.avatar, [data-test-selector="user-avatar"]');
            headerAvatars.forEach(avatar => {
                if (avatar.tagName === 'IMG' && !avatar.classList.contains('animated-border-applied')) {
                    avatar.classList.add('animated-avatar-border');
                    avatar.classList.add('animated-border-applied');
                }
            });
        }
    }

    window.addEventListener('load', applyAnimatedBorder);

    const observer = new MutationObserver(function() {
        applyAnimatedBorder();
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });

    applyAnimatedBorder();
    setTimeout(applyAnimatedBorder, 1000);
    setTimeout(applyAnimatedBorder, 3000);
})();
