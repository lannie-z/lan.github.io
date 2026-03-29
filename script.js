// 像素风格个人网站交互脚本

document.addEventListener('DOMContentLoaded', function() {
    // 移动端菜单切换
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.style.display = navMenu.style.display === 'flex' ? 'none' : 'flex';

            // 如果是移动端，调整菜单样式
            if (window.innerWidth <= 768) {
                if (navMenu.style.display === 'flex') {
                    navMenu.style.flexDirection = 'column';
                    navMenu.style.position = 'absolute';
                    navMenu.style.top = '100%';
                    navMenu.style.left = '0';
                    navMenu.style.width = '100%';
                    navMenu.style.backgroundColor = 'var(--pixel-light)';
                    navMenu.style.borderTop = 'var(--border-width) solid var(--pixel-border)';
                    navMenu.style.borderBottom = 'var(--border-width) solid var(--pixel-border)';
                    navMenu.style.padding = 'var(--spacing-md)';
                    navMenu.style.gap = 'var(--spacing-md)';
                    navMenu.style.zIndex = '1000';
                }
            }
        });
    }

    // 窗口大小改变时重置菜单
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'row';
            navMenu.style.position = 'static';
            navMenu.style.backgroundColor = 'transparent';
            navMenu.style.border = 'none';
            navMenu.style.padding = '0';
        } else {
            navMenu.style.display = 'none';
        }
    });

    // 返回顶部按钮
    const backToTopBtn = document.querySelector('.back-to-top');

    if (backToTopBtn) {
        // 滚动显示/隐藏按钮
        window.addEventListener('scroll', function() {
            if (window.pageYOffset > 300) {
                backToTopBtn.style.display = 'flex';
            } else {
                backToTopBtn.style.display = 'none';
            }
        });

        // 点击返回顶部
        backToTopBtn.addEventListener('click', function() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 美食日记过滤功能
    const filterButtons = document.querySelectorAll('.filter-btn');
    const foodCards = document.querySelectorAll('.food-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 移除所有按钮的active类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 给当前点击的按钮添加active类
            this.classList.add('active');

            const filterValue = this.textContent.trim();

            // 过滤卡片
            foodCards.forEach(card => {
                if (filterValue === '全部') {
                    card.style.display = 'block';
                } else {
                    const tags = card.querySelectorAll('.pixel-tag');
                    let hasTag = false;

                    tags.forEach(tag => {
                        if (tag.textContent.includes(filterValue)) {
                            hasTag = true;
                        }
                    });

                    if (hasTag) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                }

                // 添加显示动画
                if (card.style.display === 'block') {
                    card.style.animation = 'fadeIn 0.5s ease';
                }
            });
        });
    });

    // 导航链接点击效果
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // 如果是移动端，点击后关闭菜单
            if (window.innerWidth <= 768) {
                navMenu.style.display = 'none';
            }

            // 移除所有链接的active状态
            navLinks.forEach(l => l.classList.remove('active'));
            // 添加当前链接的active状态
            this.classList.add('active');
        });
    });

    // 像素按钮点击效果增强
    const pixelButtons = document.querySelectorAll('.pixel-button');

    pixelButtons.forEach(button => {
        button.addEventListener('mousedown', function() {
            this.style.transform = 'translate(4px, 4px)';
            this.style.boxShadow = '0px 0px 0px var(--pixel-border)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'translate(2px, 2px)';
            this.style.boxShadow = '2px 2px 0px var(--pixel-border)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translate(0, 0)';
            this.style.boxShadow = '4px 4px 0px var(--pixel-border)';
        });
    });

    // 卡片悬停效果
    const cards = document.querySelectorAll('.hobby-card, .food-card, .social-card');

    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.zIndex = '10';
        });

        card.addEventListener('mouseleave', function() {
            this.style.zIndex = '1';
        });
    });

    // 滚动时激活对应导航链接
    const sections = document.querySelectorAll('section');

    function highlightNavLink() {
        let scrollPos = window.pageYOffset + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavLink);

    // 添加CSS动画
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }

        .hobby-card, .food-card, .social-card {
            animation: fadeIn 0.8s ease;
        }

        .hobby-card:nth-child(2) { animation-delay: 0.1s; }
        .hobby-card:nth-child(3) { animation-delay: 0.2s; }
        .hobby-card:nth-child(4) { animation-delay: 0.3s; }
        .hobby-card:nth-child(5) { animation-delay: 0.4s; }
        .hobby-card:nth-child(6) { animation-delay: 0.5s; }

        .food-card:nth-child(2) { animation-delay: 0.1s; }
        .food-card:nth-child(3) { animation-delay: 0.2s; }
        .food-card:nth-child(4) { animation-delay: 0.3s; }

        .social-card:nth-child(2) { animation-delay: 0.1s; }
        .social-card:nth-child(3) { animation-delay: 0.2s; }
        .social-card:nth-child(4) { animation-delay: 0.3s; }
        .social-card:nth-child(5) { animation-delay: 0.4s; }
        .social-card:nth-child(6) { animation-delay: 0.5s; }
    `;
    document.head.appendChild(style);

    // 初始化：检查窗口大小设置菜单状态
    if (window.innerWidth <= 768) {
        navMenu.style.display = 'none';
    }

    console.log('像素网站加载完成！欢迎来到像素世界！');
});