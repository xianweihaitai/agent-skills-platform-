// 应用状态
const state = {
    currentView: 'agents',
    agents: [
        { id: 1, name: '客服助手', description: '智能客服机器人，可以回答常见问题', updatedAt: '2024-01-15', icon: null },
        { id: 2, name: '代码助手', description: '帮助开发者编写和优化代码', updatedAt: '2024-01-16', icon: null }
    ],
    skills: [
        { id: 1, name: 'UI/UX设计智能', description: '50 styles, 21 palettes, 60 fonts', updatedAt: '2024-01-10' },
        { id: 2, name: '数据分析', description: '数据处理和可视化技能', updatedAt: '2024-01-12' }
    ],
    currentAgent: null,
    currentSkill: null
};

// 获取技能数据
function getSkillData(skillName) {
    const skillsMap = {
        'ui-ux': {
            name: 'ui-ux',
            icon: 'U',
            color: '#B8E986',
            desc: 'UI/UX design intelligence. 50 styles, 21 palettes...'
        },
        'webapp-testing': {
            name: 'webapp-testing',
            icon: 'W',
            color: '#FFB86C',
            desc: 'Toolkit for interacting with and testing local web applications...'
        }
    };
    return skillsMap[skillName] || {
        name: skillName,
        icon: skillName.charAt(0).toUpperCase(),
        color: '#6B8EFF',
        desc: ''
    };
}

// 获取MCP数据
function getMCPData(mcpName) {
    const mcpMap = {
        'MCP Server Example': {
            name: 'MCP Server Example',
            icon: 'M',
            color: '#6B8EFF',
            desc: 'Example MCP server for demonstration'
        },
        'Filesystem MCP': {
            name: 'Filesystem MCP',
            icon: 'F',
            color: '#8B5CF6',
            desc: 'MCP server for filesystem operations'
        }
    };
    return mcpMap[mcpName] || {
        name: mcpName,
        icon: mcpName.charAt(0).toUpperCase(),
        color: '#6B8EFF',
        desc: ''
    };
}

// 初始化应用
function init() {
    renderApp();
    setupEventListeners();
}

// 渲染应用
function renderApp() {
    const app = document.getElementById('app');
    
    if (state.currentAgent !== null) {
        app.innerHTML = renderAgentEditor();
    } else if (state.currentSkill !== null) {
        app.innerHTML = renderSkillEditor();
    } else {
        app.innerHTML = `
            ${renderNavbar()}
            <div class="container">
                ${state.currentView === 'agents' ? renderAgentsView() : renderSkillsView()}
            </div>
        `;
    }
    
    setupEventListeners();
}

// 渲染导航栏
function renderNavbar() {
    return `
        <nav class="navbar">
            <div class="nav-logo">
                <svg width="110" height="24" viewBox="0 0 110 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M27.1728 20.1052C27.7227 20.0654 28.4988 19.9681 29.0133 19.7768C29.0891 19.7485 29.5327 19.5548 29.5884 19.553L29.6884 21.1592C29.2635 21.3775 27.8768 21.3768 27.4003 21.3375C27.2095 21.3219 27.2102 21.2946 27.2063 21.1666L27.1728 20.1052ZM20.9028 8.11723C20.3365 8.91525 20.9825 9.90224 21.8329 9.7665C22.7056 9.62714 22.9102 8.35344 22.2537 7.87474C21.8371 7.54793 21.232 7.6532 20.9028 8.11723ZM19.0815 1.7252C19.1965 1.3515 18.807 0.967344 18.4656 1.06468C18.2451 1.12755 18.1974 1.20727 18.0802 1.36364C17.9846 1.49113 17.8936 1.61681 17.798 1.74188C17.5062 2.1332 17.2144 2.52458 16.9226 2.9159C16.8513 3.01712 16.7074 3.1753 16.6625 3.31395C16.5107 3.78318 17.1453 4.38258 17.67 3.68726C17.9137 3.36445 19.0138 1.9452 19.0815 1.7252ZM11.4272 1.10791C11.0718 1.26806 10.9682 1.60499 11.2276 1.96955C11.6113 2.48179 11.9949 2.99397 12.3786 3.50616C12.5546 3.74143 12.7759 4.1246 13.2047 3.98354C13.3498 3.93578 13.4871 3.80988 13.533 3.65263C13.6481 3.25879 13.3711 3.05235 13.1363 2.72713C13.0406 2.59472 12.9399 2.47161 12.8412 2.33734C12.6561 2.08571 12.4746 1.83884 12.2635 1.57178C12.0883 1.35024 11.8408 0.921548 11.4272 1.10791ZM26.0063 9.29863C26.0524 8.75991 25.6326 8.28269 25.1351 8.23673C24.521 8.17994 24.1136 8.60726 24.0293 9.1521C23.8665 10.2041 25.0195 10.658 25.6971 10.0268C25.9354 9.80485 25.9786 9.62238 26.0063 9.29863ZM14.5633 0.676646C14.5632 1.42886 14.5632 2.18113 14.5631 2.93335C14.5649 3.71145 15.6402 3.65225 15.6361 2.93335C15.6361 2.16592 15.6359 1.3985 15.6359 0.631068C15.6367 -0.0687321 14.9602 -0.132146 14.685 0.176171C14.5586 0.317717 14.5642 0.453793 14.5633 0.676646ZM4.79686 17.9551C4.91181 17.2652 4.23401 17.0165 3.86977 17.3882C3.69336 17.5682 3.66422 17.8591 3.62621 18.1197C3.42115 19.5248 3.02377 21.8307 2.81734 23.2289C2.68282 24.0583 3.79381 24.3473 3.95475 23.3072C4.18485 21.8199 4.54904 19.4426 4.79686 17.9551ZM26.8129 18.9935C26.6721 18.6901 26.8286 17.4678 26.9128 17.1316C27.052 16.5758 27.2812 16.1823 27.7797 15.925C27.9829 15.8202 28.0188 15.9006 28.1297 16.0119C28.632 16.5162 28.8466 16.9424 29.0812 17.6339C29.133 17.7868 29.2966 18.2911 29.3025 18.4337C28.8549 18.7365 27.4169 19.0302 26.8129 18.9935ZM18.8346 19.7786C18.8574 19.2263 19.127 15.0419 19.2054 14.7516C19.2536 14.5731 19.4458 14.3436 19.6436 14.2805C19.7847 14.2355 20.0404 14.2698 20.2453 14.3059C21.2918 14.4903 26.3446 15.1246 26.7002 15.3109C26.6747 15.3814 26.3918 15.6063 26.2363 15.8584C26.0555 16.1514 25.8877 16.6029 25.7914 16.9616C25.7606 17.1032 25.7298 17.2449 25.699 17.3865C25.6173 18.053 25.341 19.3576 25.2067 20.0279C25.153 20.2959 25.0678 20.5818 25.0266 20.8716C24.9448 21.4464 24.6189 21.9795 23.981 21.904C23.4428 21.8403 22.7494 21.6764 22.2019 21.6108C21.9022 21.5592 21.6025 21.5076 21.3027 21.456C20.7746 21.3577 20.03 21.2787 19.5917 21.0895C19.0361 20.8496 18.8332 20.3584 18.8346 19.7786ZM4.19557 8.90556C4.1872 7.34368 5.44081 6.06002 7.09765 6.06675C9.21732 6.07534 10.554 8.23077 9.70837 10.1051C9.24488 11.1325 8.3034 11.7655 7.07484 11.7789C5.41855 11.7968 4.20405 10.4947 4.19557 8.90556ZM27.9224 8.56945C27.5542 8.79323 27.2926 9.1869 27.1666 9.67994C27.014 10.2768 27.0884 10.7645 27.336 11.2237C27.4078 11.357 27.3191 11.4129 27.2266 11.5172C26.5689 12.2587 25.7941 12.3326 24.861 12.1513C24.5756 12.0959 24.3123 12.0803 24.0408 12.0285C23.2797 11.8833 21.405 11.6385 20.9153 11.4711C20.1849 11.2214 19.7233 10.8148 19.7261 9.90854C19.7924 9.35192 19.8588 8.79526 19.9252 8.23864C20.1621 7.24743 20.2603 6.48165 21.4025 6.03687C21.8857 5.84871 22.5057 5.93177 23.0732 6.02872C24.0716 6.19921 25.3433 6.28227 26.2616 6.53177C27.2044 6.78789 27.9638 7.61534 27.9224 8.56945ZM25.6204 5.30124C25.6158 5.1297 25.703 4.90548 25.7605 4.73882C25.8413 4.5053 26.1989 4.62562 26.3477 4.18161C26.442 3.90038 26.4079 3.6448 26.2648 3.42753C25.6914 2.55669 24.2875 3.23346 24.6885 4.185C24.7461 4.32168 24.8389 4.37508 24.8766 4.45365C24.9193 4.54267 24.75 5.0832 24.7077 5.1656C24.5391 5.19099 23.9168 5.07132 23.7063 5.05425C22.6314 4.96709 21.8454 4.71508 20.8225 5.20133C19.4285 5.86403 19.0109 7.1786 18.7963 8.6872C18.7731 8.8503 18.7593 9.00777 18.7303 9.16332C18.6994 9.32922 18.7012 9.49227 18.6787 9.67458C18.597 10.3367 18.7641 10.9947 19.0749 11.441C20.0335 12.8177 21.6606 12.6718 22.0516 12.8718C22.0519 13.0829 21.9925 13.2142 21.9631 13.4083C21.4839 13.3768 20.8871 13.2204 20.4032 13.1593C19.9464 13.1016 19.4573 12.9508 19.0469 12.7669C18.6443 12.5866 18.3063 12.3626 18.0099 12.0514C17.2955 11.3011 17.4241 10.1984 17.3142 9.21147C17.2174 8.34266 17.2216 6.86739 16.897 6.12053C16.5015 5.21068 15.5833 4.81772 14.5755 4.96266C14.0767 5.03439 13.7518 5.30835 13.4817 5.62848C13.2012 5.96098 13.074 6.42721 13.0047 6.9076C12.9318 7.41289 12.8076 7.89153 12.7391 8.38982C12.6439 8.88882 12.5487 9.38782 12.4535 9.88687C12.3436 10.3246 12.2634 10.8726 12.0257 11.2162C11.5919 11.843 10.17 12.2103 9.46771 12.1673C9.72084 11.9559 9.89293 11.7867 10.0137 11.6534C10.3768 11.2526 10.6956 10.7133 10.8592 10.2033C11.5623 8.0118 10.395 5.6519 8.14996 5.02711C7.30096 4.79086 6.05435 4.91112 5.29524 5.29954C4.23363 5.84275 3.43034 7.00155 3.20116 8.16292C2.86295 9.87691 3.63239 11.4533 5.01527 12.3787C5.09417 12.4315 5.1815 12.4624 5.34211 12.5562C5.18588 12.6028 4.94079 12.6495 4.78456 12.696C2.79842 13.4054 1.65621 14.9062 1.10096 16.8968C0.976114 17.3784 0.851328 17.86 0.726487 18.3416C0.506005 19.5842 0.222802 21.8251 0.0170851 23.0476C-0.161072 24.1063 1.11009 24.4298 1.22962 23.111C1.34566 21.8308 1.83633 18.6471 2.16957 17.4495C2.25504 17.1424 2.3247 16.8018 2.44222 16.5084C3.64366 13.5086 6.00732 13.4456 9.05682 13.4239C10.4434 13.4141 11.9197 13.0748 12.7568 12.2663C13.2603 11.78 13.3913 11.4165 13.6039 10.6758C13.7869 10.0381 14.1311 8.35836 14.2129 7.63252C14.2493 7.30959 14.3444 6.93397 14.388 6.60284C14.4862 5.85467 15.6154 6.09607 15.6458 6.8989C15.6601 7.27649 15.6487 7.73625 15.6178 8.10744C15.5863 8.48513 15.579 8.86376 15.5378 9.23817C15.4561 9.98322 15.4061 10.6523 15.2434 11.3576C14.9416 12.6658 14.4377 13.7219 13.6136 14.5817C13.2658 14.9445 12.7923 15.3103 12.2652 15.6727C11.4582 16.2274 11.4597 16.2343 11.4701 17.2257L11.6478 23.3612C11.6601 23.7848 11.9789 24.0326 12.4004 23.9581C12.7843 23.8903 12.8375 23.5991 12.8273 23.2593C12.768 21.2967 12.6343 18.8639 12.5815 16.9C12.8974 16.7082 13.2233 16.4551 13.5162 16.2395C14.171 15.7575 14.6414 15.324 15.1522 14.6847C15.2848 14.5187 15.7825 13.6514 15.8174 13.6252C16.2789 14.8914 17.8256 15.7199 18.0986 15.9719C18.1092 16.0052 17.8255 19.0641 17.8081 19.3327C17.7213 20.067 17.8047 20.8356 18.2465 21.3656C18.7025 21.9126 18.87 21.9235 19.4399 22.1991L19.446 23.289C19.4495 23.7484 19.3556 24.0059 19.878 23.9999L25.249 23.9613C25.5815 23.9127 25.4567 23.3629 25.4812 23.0585C25.7214 22.9522 26.001 22.8713 26.2257 22.7107C26.3017 22.6563 26.3507 22.5751 26.4287 22.571L26.4389 23.5166C26.4421 23.8011 26.7638 23.9739 27.0127 23.9695C27.3336 23.9638 27.4928 23.7549 27.5022 23.4563L27.5343 22.4449L29.6518 22.3494L29.6859 23.4843C29.6981 23.8918 30.1654 24.0664 30.4962 23.9198C30.7933 23.7882 30.8053 23.4798 30.8074 23.1225C30.8096 22.7485 30.8096 22.1357 30.8029 21.7617C30.7781 20.382 30.6198 18.9953 30.2922 17.8C29.8061 16.0271 28.9458 14.5823 27.1549 14.2077C26.8508 14.144 26.5189 14.0781 26.2096 14.0399C25.8884 13.9878 25.5674 13.9358 25.2462 13.8837C25.2391 13.7809 25.3296 13.4153 25.3703 13.3505C25.4972 13.3086 25.7625 13.344 25.9023 13.3197C26.0676 13.2909 26.2018 13.2709 26.3665 13.2344C27.1593 13.0582 27.886 12.4821 28.3002 11.822C29.1827 11.7741 29.5159 11.2222 29.7237 10.4551C29.8744 9.89858 29.8328 9.23242 29.4328 8.80521C29.3043 8.70525 29.1757 8.60523 29.047 8.50521C29.0447 8.50095 28.9179 7.69724 28.669 7.22046C28.0516 6.03791 26.9593 5.54575 25.6204 5.30124Z" fill="black"/><path d="M106.182 19.849V4.00586H109.243V19.849H106.182Z" fill="black"/><path d="M96.9459 19.849L98.4762 4.00586H103.85L105.354 19.849H102.356L102.131 17.2925H100.223L100.025 19.849H96.9459ZM100.448 14.763H101.888L101.195 6.7064H101.051L100.448 14.763Z" fill="black"/><path d="M83.9469 19.849V4.00586H87.1335V11.0003L88.6818 6.34633H92.0215L89.9961 12.2155L92.5706 19.849H89.1409L87.1335 13.4848V19.849H83.9469Z" fill="black"/><path d="M78.896 19.9946C76.2314 19.9946 74.8992 18.6444 74.8992 15.9438V14.8726H78.1398V16.4569C78.1398 16.763 78.1998 17.003 78.3199 17.1771C78.4399 17.3511 78.6319 17.4381 78.896 17.4381C79.3641 17.4381 79.5981 17.087 79.5981 16.3849C79.5981 15.7968 79.4751 15.3587 79.229 15.0706C78.983 14.7766 78.6829 14.4945 78.3289 14.2245L76.6095 12.9012C76.0694 12.4811 75.6583 12.037 75.3763 11.5689C75.0942 11.1008 74.9532 10.4497 74.9532 9.61554C74.9532 8.84139 75.1362 8.20226 75.5023 7.69816C75.8744 7.19406 76.3635 6.81898 76.9696 6.57293C77.5817 6.32688 78.2418 6.20386 78.95 6.20386C81.5665 6.20386 82.8748 7.50912 82.8748 10.1196V10.3717H79.5441V9.85859C79.5441 9.58854 79.4961 9.32748 79.4001 9.07543C79.3101 8.82338 79.13 8.69736 78.86 8.69736C78.4039 8.69736 78.1758 8.93741 78.1758 9.4175C78.1758 9.9036 78.3679 10.2847 78.7519 10.5607L80.7503 12.019C81.3745 12.4691 81.8966 13.0032 82.3167 13.6213C82.7427 14.2395 82.9558 15.0616 82.9558 16.0878C82.9558 17.3601 82.5927 18.3293 81.8666 18.9954C81.1464 19.6616 80.1562 19.9946 78.896 19.9946Z" fill="black"/><path d="M69.975 19.9946C69.0148 19.9946 68.2496 19.8146 67.6795 19.4545C67.1094 19.0944 66.7013 18.5753 66.4553 17.8972C66.2092 17.2191 66.0862 16.4029 66.0862 15.4487V10.0206C66.0862 8.76637 66.4463 7.81818 67.1664 7.17605C67.8865 6.52792 68.8767 6.20386 70.137 6.20386C72.7295 6.20386 74.0258 7.47611 74.0258 10.0206V11.0018C74.0258 12.1901 74.0138 12.9882 73.9898 13.3963H69.3088V16.0068C69.3088 16.2469 69.3238 16.4839 69.3538 16.718C69.3838 16.946 69.4499 17.1351 69.5519 17.2851C69.6599 17.4351 69.8309 17.5101 70.065 17.5101C70.401 17.5101 70.6111 17.3661 70.6951 17.078C70.7791 16.784 70.8211 16.4029 70.8211 15.9348V14.6385H74.0258V15.4037C74.0258 16.4119 73.8997 17.2581 73.6477 17.9422C73.4016 18.6203 72.9816 19.1335 72.3874 19.4815C71.7993 19.8236 70.9952 19.9946 69.975 19.9946ZM69.2908 11.794H70.8211V9.97561C70.8211 9.48952 70.7611 9.14145 70.6411 8.9314C70.5211 8.71536 70.341 8.60734 70.101 8.60734C69.8429 8.60734 69.6419 8.70936 69.4979 8.9134C69.3598 9.11744 69.2908 9.47151 69.2908 9.97561V11.794Z" fill="black"/><path d="M57.1559 19.849V4.00586H61.5128C62.653 4.00586 63.5112 4.32392 64.0873 4.96005C64.6634 5.59018 64.9514 6.51436 64.9514 7.73261V15.1501C64.9514 16.6504 64.6874 17.8086 64.1593 18.6248C63.6372 19.441 62.719 19.849 61.4047 19.849H57.1559ZM60.3425 17.0495H60.8916C61.4738 17.0495 61.7648 16.7674 61.7648 16.2033V8.02967C61.7648 7.50156 61.6928 7.16249 61.5488 7.01246C61.4107 6.85643 61.1257 6.77842 60.6936 6.77842H60.3425V17.0495Z" fill="black"/><path d="M51.8629 19.9946C49.1743 19.9946 47.8301 18.5993 47.8301 15.8088V10.3897C47.8301 9.11744 48.1871 8.10324 48.9013 7.34709C49.6154 6.58493 50.6026 6.20386 51.8629 6.20386C53.1291 6.20386 54.1193 6.58493 54.8335 7.34709C55.5476 8.10324 55.9047 9.11744 55.9047 10.3897V15.8088C55.9047 18.5993 54.5574 19.9946 51.8629 19.9946ZM51.8629 17.5101C52.1329 17.5101 52.325 17.4141 52.439 17.2221C52.559 17.024 52.619 16.775 52.619 16.4749V9.87659C52.619 9.09044 52.367 8.69736 51.8629 8.69736C51.3588 8.69736 51.1067 9.09044 51.1067 9.87659V16.4749C51.1067 16.775 11.1637 17.024 51.2778 17.2221C51.3978 17.4141 51.5928 17.5101 51.8629 17.5101Z" fill="black"/><path d="M38.8087 19.8488V4.00562H42.0674L43.5257 11.5941V4.00562H46.5863V19.8488H43.4897L41.9053 11.9272V19.8488H38.8087Z" fill="black"/></svg>
            </div>
            <div class="nav-tabs">
                <div class="nav-tab ${state.currentView === 'agents' ? 'active' : ''}" data-view="agents">
                    Agent仓库
                </div>
                <div class="nav-tab ${state.currentView === 'skills' ? 'active' : ''}" data-view="skills">
                    Skills仓库
                </div>
            </div>
        </nav>
    `;
}

// 渲染Agent视图
function renderAgentsView() {
    return `
        <div class="page-header">
            <h1 class="page-title">Agent仓库</h1>
            <button class="btn-primary" onclick="normalCreateAgent()">创建智能体</button>
        </div>
        <div class="card-grid">
            ${state.agents.map(agent => `
                <div class="card" onclick="editAgent(${agent.id})" style="cursor: pointer;">
                    <div class="card-top">
                        <div class="card-icon-wrapper">
                            ${agent.icon ? 
                                `<img src="${agent.icon}" class="card-icon-image" alt="${agent.name}">` : 
                                `<div class="card-icon-default">${agent.name.charAt(0).toUpperCase()}</div>`
                            }
                        </div>
                        <div class="card-info">
                            <h3 class="card-title">${agent.name}</h3>
                            <div class="card-meta">编辑时间: ${agent.updatedAt}</div>
                        </div>
                    </div>
                    <p class="card-description">${agent.description}</p>
                    <div class="card-footer">
                        <div class="card-actions">
                            <button class="btn-delete" onclick="deleteAgent(${agent.id}); event.stopPropagation();" title="删除">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 渲染Skills视图
function renderSkillsView() {
    return `
        <div class="page-header">
            <h1 class="page-title">Skills仓库</h1>
            <button class="btn-primary" onclick="showSkillCreateOptions()">创建技能</button>
        </div>
        <div class="card-grid">
            ${state.skills.map(skill => `
                <div class="card" onclick="editSkill(${skill.id})" style="cursor: pointer;">
                    <div class="card-top">
                        <div class="card-icon-wrapper">
                            <div class="card-icon-default">${skill.name.charAt(0).toUpperCase()}</div>
                        </div>
                        <div class="card-info">
                            <h3 class="card-title">${skill.name}</h3>
                            <div class="card-meta">编辑时间: ${skill.updatedAt}</div>
                        </div>
                    </div>
                    <p class="card-description">${skill.description}</p>
                    <div class="card-footer">
                        <div class="card-actions">
                            <button class="btn-delete" onclick="deleteSkill(${skill.id}); event.stopPropagation();" title="删除">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="3 6 5 6 21 6"/>
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

// 渲染Agent编辑器
function renderAgentEditor() {
    const agent = state.agents.find(a => a.id === state.currentAgent) || { name: '新智能体', description: '' };
    
    return `
        <div class="editor-container">
            <div class="editor-top-bar">
                <button class="back-btn" onclick="backToList()">← 返回</button>
                <div class="editor-title-section">
                    <h2 class="editor-agent-name" id="displayAgentName">${agent.name}</h2>
                    <button class="btn-edit-name" onclick="showEditAgentModal()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
                <button class="btn-primary" onclick="saveAgent()">保存</button>
            </div>
            
            <div class="editor-body">
                <!-- 左侧：编排 -->
                <div class="editor-left">
                    <div class="editor-section-header">
                        <h3 class="section-header-title">人设与回复逻辑</h3>
                        <div class="prompt-actions">
                            <button class="icon-action-btn" onclick="showSmartGeneratePromptModal()" title="智能生成提示词">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                                    <path d="M2 17l10 5 10-5"/>
                                    <path d="M2 12l10 5 10-5"/>
                                </svg>
                            </button>
                            <button class="icon-action-btn" onclick="showSubmitPromptModal()" title="提交到提示词库">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/>
                                    <polyline points="17 21 17 13 7 13 7 21"/>
                                    <polyline points="7 3 7 8 15 8"/>
                                </svg>
                            </button>
                            <button class="icon-action-btn" onclick="showPromptLibraryModal()" title="提示词库">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="prompt-section">
                        <textarea class="prompt-textarea" id="promptTextarea" placeholder="输入系统提示词，对大模型进行指令和规则设定">${agent.prompt || ''}</textarea>
                    </div>
                </div>
                
                <!-- 中间：工具选择 -->
                <div class="editor-middle">
                    <div class="editor-section-header">
                        <h3 class="section-header-title">编排</h3>
                    </div>
                    
                    <div class="tools-container">
                        <div class="tool-category">
                            <div class="category-title">模型设置</div>
                            
                            <div class="tool-section">
                                <div class="tool-section-header-inline">
                                    <span>模型</span>
                                    <div class="custom-select" onclick="toggleModelDropdown()">
                                        <div class="select-selected" id="selectedModel">glm-4.7-anthropic</div>
                                        <div class="select-arrow">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <polyline points="6 9 12 15 18 9"/>
                                            </svg>
                                        </div>
                                        <div class="select-items" id="modelDropdown">
                                            <div class="select-item" onclick="selectModel(event, 'glm-4.7-anthropic')">glm-4.7-anthropic</div>
                                            <div class="select-item" onclick="selectModel(event, '豆包-1.5-Pro-32k')">豆包-1.5-Pro-32k</div>
                                            <div class="select-item" onclick="selectModel(event, 'gpt-4')">gpt-4</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tool-category">
                            <div class="category-title">技能</div>
                            
                            <div class="tool-section" id="skillsSection">
                                <div class="tool-section-header">
                                    <span>技能</span>
                                    <button class="add-btn" onclick="showAddSkillModal()">+</button>
                                </div>
                                ${agent.selectedSkills && agent.selectedSkills.length > 0 ? agent.selectedSkills.map(skill => {
                                    const skillData = getSkillData(skill);
                                    return `
                                    <div class="tool-item" onmouseenter="showDeleteBtn(this)" onmouseleave="hideDeleteBtn(this)">
                                        <div class="tool-item-icon" style="background: ${skillData.color}">${skillData.icon}</div>
                                        <div class="tool-item-content">
                                            <div class="tool-item-name">${skillData.name}</div>
                                            <div class="tool-item-desc">${skillData.desc}</div>
                                        </div>
                                        <button class="tool-item-delete" onclick="removeSkill(event)" title="移除">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    </div>
                                    `;
                                }).join('') : ''}
                            </div>
                        </div>
                        
                        <div class="tool-category">
                            <div class="category-title">工具</div>
                            
                            <div class="tool-section" id="mcpSection">
                                <div class="tool-section-header">
                                    <span>MCP</span>
                                    <button class="add-btn" onclick="showAddMCPModal()">+</button>
                                </div>
                                ${agent.selectedMCPs && agent.selectedMCPs.length > 0 ? agent.selectedMCPs.map(mcp => {
                                    const mcpData = getMCPData(mcp);
                                    return `
                                    <div class="tool-item" onmouseenter="showDeleteBtn(this)" onmouseleave="hideDeleteBtn(this)">
                                        <div class="tool-item-icon" style="background: ${mcpData.color}">${mcpData.icon}</div>
                                        <div class="tool-item-content">
                                            <div class="tool-item-name">${mcpData.name}</div>
                                            <div class="tool-item-desc">${mcpData.desc}</div>
                                        </div>
                                        <button class="tool-item-delete" onclick="removeSkill(event)" title="移除">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                                <line x1="18" y1="6" x2="6" y2="18"/>
                                                <line x1="6" y1="6" x2="18" y2="18"/>
                                            </svg>
                                        </button>
                                    </div>
                                    `;
                                }).join('') : ''}
                            </div>
                            
                            <div class="tool-section disabled">
                                <div class="tool-section-header">
                                    <span>MDP</span>
                                    <button class="add-btn" disabled>+</button>
                                </div>
                            </div>
                        </div>
                        
                        <div class="tool-category">
                            <div class="category-title">知识</div>
                            
                            <div class="tool-section">
                                <div class="tool-section-header">
                                    <span>知识库</span>
                                    <button class="add-btn" onclick="showAddKnowledgeModal()">+</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 右侧：预览与调试 -->
                <div class="editor-right">
                    <div class="editor-section-header">
                        <h3 class="section-header-title">预览与调试</h3>
                        <div class="preview-actions">
                            <button class="icon-action-btn" onclick="toggleDebugPanel()" title="调试详情">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
                                    <line x1="9" y1="3" x2="9" y2="21"/>
                                </svg>
                            </button>
                            <button class="icon-action-btn" onclick="clearChatHistory()" title="删除对话记录">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M3 6h18"/>
                                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                                    <path d="M19 6v12c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                                    <path d="M10 11v6"/>
                                    <path d="M14 11v6"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    
                    <div class="chat-preview" id="chatPreview">
                        <div class="chat-avatar">A</div>
                        <div class="chat-empty-state">
                            <p>直接输入问题，可通过对话来发送</p>
                        </div>
                    </div>
                    
                    <div class="chat-input-container">
                        <button class="btn-upload-file" onclick="triggerFileUpload()" title="上传文件">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/>
                            </svg>
                        </button>
                        <input type="file" id="chatFileUpload" style="display: none;" onchange="handleChatFileUpload(event)">
                        <input type="text" class="chat-input" id="chatInput" placeholder="继续对话..." onkeydown="handleChatKeydown(event)">
                        <button class="btn-send" onclick="sendMessage()">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <line x1="22" y1="2" x2="11" y2="13"/>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
                            </svg>
                        </button>
                    </div>
                </div>
                
                <!-- 调试详情栏 -->
                <div class="debug-panel" id="debugPanel">
                    <div class="debug-panel-header">
                        <h4>调试详情</h4>
                        <button class="close-btn" onclick="toggleDebugPanel()">&times;</button>
                    </div>
                    
                    <div class="debug-panel-content">
                        <div class="debug-section">
                            <div class="debug-info-row">
                                <span class="debug-label">耗时</span>
                                <span class="debug-value">5606 ms</span>
                            </div>
                            <div class="debug-info-row">
                                <span class="debug-label">Tokens</span>
                                <span class="debug-value">10042 Tokens</span>
                            </div>
                            <div class="debug-info-row">
                                <span class="debug-label">requestId</span>
                                <span class="debug-value debug-id">b346302c995343dfb4997c88e0324b93</span>
                                <button class="copy-btn" title="复制">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                        <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        
                        <div class="debug-section">
                            <h5 class="debug-section-title">调用组件</h5>
                            <div class="debug-item">
                                <div class="debug-item-icon">🤖</div>
                                <div class="debug-item-text">智能体电脑启动</div>
                            </div>
                            <div class="debug-item">
                                <div class="debug-item-icon">M</div>
                                <div class="debug-item-text">glm-4.7-anthropic</div>
                            </div>
                        </div>
                        
                        <div class="debug-section">
                            <h5 class="debug-section-title">节点详情</h5>
                            <div class="debug-detail-grid">
                                <div class="debug-detail-item">
                                    <span class="debug-detail-label">类型</span>
                                    <span class="debug-detail-value">--</span>
                                </div>
                                <div class="debug-detail-item">
                                    <span class="debug-detail-label">状态</span>
                                    <span class="debug-detail-value success">成功</span>
                                </div>
                                <div class="debug-detail-item">
                                    <span class="debug-detail-label">名称</span>
                                    <span class="debug-detail-value">智能体电脑启动</span>
                                </div>
                                <div class="debug-detail-item">
                                    <span class="debug-detail-label">耗时</span>
                                    <span class="debug-detail-value">2379ms</span>
                                </div>
                                <div class="debug-detail-item">
                                    <span class="debug-detail-label">发起时间</span>
                                    <span class="debug-detail-value">2026-01-20 17:19</span>
                                </div>
                                <div class="debug-detail-item">
                                    <span class="debug-detail-label">结束时间</span>
                                    <span class="debug-detail-value">2026-01-20 17:19</span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="debug-section">
                            <h5 class="debug-section-title">输入</h5>
                            <div class="debug-code-block">null</div>
                        </div>
                        
                        <div class="debug-section">
                            <h5 class="debug-section-title">输出</h5>
                            <div class="debug-code-block">null</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 编辑Agent模态框 -->
        <div id="editAgentModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 class="modal-title">更新智能体</h2>
                    <button class="close-btn" onclick="closeEditAgentModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">智能体名称 <span class="required">*</span></label>
                        <div class="input-with-counter">
                            <input type="text" class="form-input" id="editAgentName" value="${agent.name}" maxlength="50" oninput="updateCharCount('editAgentName', 'nameCharCount', 50)">
                            <span class="char-counter"><span id="nameCharCount">${agent.name.length}</span> / 50</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">智能体功能介绍</label>
                        <div class="textarea-with-counter">
                            <textarea class="form-textarea" id="editAgentDesc" placeholder="介绍智能体的功能，将会展示给智能体的用户" maxlength="10000" oninput="updateCharCount('editAgentDesc', 'descCharCount', 10000)">${agent.description || ''}</textarea>
                            <span class="char-counter"><span id="descCharCount">${(agent.description || '').length}</span> / 10000</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">图标</label>
                        <div class="agent-icon-preview">
                            <div class="icon-display" id="iconDisplay" onmouseenter="showIconEdit()" onmouseleave="hideIconEdit()">
                                ${agent.icon ? `<img src="${agent.icon}" class="icon-image" id="iconImage">` : 'A'}
                                <div class="icon-edit-overlay" id="iconEditOverlay">
                                    <button class="icon-edit-btn" onclick="triggerIconUpload()">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <input type="file" id="iconUpload" accept="image/*" style="display: none;" onchange="handleIconUpload(event)">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeEditAgentModal()">取消</button>
                    <button class="btn-primary" onclick="confirmEditAgent()">确定</button>
                </div>
            </div>
        </div>
        
        <!-- 提交到提示词库模态框 -->
        <div id="submitPromptModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 class="modal-title">创建提示词</h2>
                    <button class="close-btn" onclick="closeSubmitPromptModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">提示词名称 <span class="required">*</span></label>
                        <div class="input-with-counter">
                            <input type="text" class="form-input" id="promptName" placeholder="请输入提示词名称" maxlength="20" oninput="updateCharCount('promptName', 'promptNameCount', 20)">
                            <span class="char-counter"><span id="promptNameCount">0</span> / 20</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">提示词描述</label>
                        <div class="textarea-with-counter">
                            <textarea class="form-textarea" id="promptDesc" placeholder="请输入提示词简介" maxlength="50" oninput="updateCharCount('promptDesc', 'promptDescCount', 50)"></textarea>
                            <span class="char-counter"><span id="promptDescCount">0</span> / 50</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">提示词</label>
                        <textarea class="form-textarea" id="promptContent" readonly style="min-height: 300px;"></textarea>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeSubmitPromptModal()">取消</button>
                    <button class="btn-primary" onclick="submitPrompt()">确认</button>
                </div>
            </div>
        </div>
        
        <!-- 提示词库模态框 -->
        <div id="promptLibraryModal" class="modal">
            <div class="modal-content modal-xlarge">
                <div class="modal-header">
                    <h2 class="modal-title">提示词库</h2>
                    <button class="close-btn" onclick="closePromptLibraryModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input type="text" placeholder="搜索" class="search-input">
                    </div>
                    
                    <div class="prompt-library-content">
                        <div class="prompt-list">
                            <div class="prompt-list-item active" onclick="selectPromptTemplate(this, '通用结构')">
                                <div class="prompt-list-item-title">通用结构</div>
                                <div class="prompt-list-item-desc">适用于多种场景的提示词结构，可以根据具...</div>
                            </div>
                            <div class="prompt-list-item" onclick="selectPromptTemplate(this, '任务执行')">
                                <div class="prompt-list-item-title">任务执行</div>
                                <div class="prompt-list-item-desc">适用于有明确的工作步骤的任务执行场景，...</div>
                            </div>
                            <div class="prompt-list-item" onclick="selectPromptTemplate(this, '角色扮演')">
                                <div class="prompt-list-item-title">角色扮演</div>
                                <div class="prompt-list-item-desc">适用于聊天陪伴、互动娱乐场景、可帮助塑...</div>
                            </div>
                        </div>
                        <div class="prompt-preview">
                            <div class="prompt-preview-content" id="promptPreviewContent">
                                <p>你将扮演一个人物角色 <span style="color: #909399;">角色名称</span>，以下是关于这个角色的详细设定，请根据这些信息来构建你的回答。</p>
                                <p><strong>**人物基本信息：**</strong></p>
                                <p>- 你是：<span style="color: #909399;">角色的名称、身份等基本介绍</span></p>
                                <p>- 人称：第一人称</p>
                                <p>- 出身背景与上下文：<span style="color: #909399;">交代角色背景信息和上下文</span></p>
                                <p><strong>**性格特点：**</strong></p>
                                <p>- <span style="color: #909399;">性格特点描述</span></p>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closePromptLibraryModal()">取消</button>
                    <button class="btn-primary" onclick="insertPromptTemplate()">插入提示词</button>
                </div>
            </div>
        </div>
        
        <input type="hidden" id="agentName" value="${agent.name}">
        
        <!-- 添加技能模态框 -->
        <div id="addSkillModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 class="modal-title">添加</h2>
                    <button class="close-btn" onclick="closeAddSkillModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input type="text" placeholder="搜索" class="search-input">
                    </div>
                    
                    <div class="item-list-modal">
                        <div class="modal-list-item">
                            <div class="modal-item-icon">B</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">bilibili-auto-reply</div>
                                <div class="modal-item-desc">Automates replying to Bilibili video comments. Invoke when user provides a Bilibili video...</div>
                                <div class="modal-item-meta">发布于2028-01-19 14:01:41</div>
                            </div>
                            <button class="btn-add-item" onclick="addSkillToAgent('bilibili-auto-reply', 'Automates replying to Bilibili video comments', '#6B8EFF', event)">添加</button>
                        </div>
                        
                        <div class="modal-list-item">
                            <div class="modal-item-icon" style="background: #B8E986;">U</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">ui-ux</div>
                                <div class="modal-item-desc">UI/UX design intelligence. 50 styles, 21 palettes, 50 font pairings, 20 charts, 8 stacks (R...</div>
                                <div class="modal-item-meta">发布于2026-01-09 04:06:59</div>
                            </div>
                            <button class="btn-add-item added">已添加</button>
                        </div>
                        
                        <div class="modal-list-item">
                            <div class="modal-item-icon" style="background: #FFB86C;">W</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">webapp-testing</div>
                                <div class="modal-item-desc">Toolkit for interacting with and testing local web applications using Playwright. Supports...</div>
                                <div class="modal-item-meta">发布于2026-01-01 02:20:26</div>
                            </div>
                            <button class="btn-add-item" onclick="addSkillToAgent('webapp-testing', 'Toolkit for interacting with and testing local web applications', '#FFB86C', event)">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 添加知识库模态框 -->
        <div id="addKnowledgeModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 class="modal-title">添加</h2>
                    <button class="close-btn" onclick="closeAddKnowledgeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input type="text" placeholder="搜索" class="search-input">
                    </div>
                    
                    <div class="item-list-modal">
                        <div class="modal-list-item">
                            <div class="modal-item-icon" style="background: #A8D98E;">A</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">aaaa</div>
                                <div class="modal-item-meta">发布于2026-01-20 16:46:16</div>
                            </div>
                            <button class="btn-add-item" onclick="addKnowledgeToAgent('aaaa', '#A8D98E', event)">添加</button>
                        </div>
                        
                        <div class="modal-list-item">
                            <div class="modal-item-icon" style="background: #FFB86C;">K</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">知识库示例</div>
                                <div class="modal-item-meta">发布于2026-01-15 10:30:00</div>
                            </div>
                            <button class="btn-add-item" onclick="addKnowledgeToAgent('知识库示例', '#FFB86C', event)">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 添加MCP模态框 -->
        <div id="addMCPModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 class="modal-title">添加</h2>
                    <button class="close-btn" onclick="closeAddMCPModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="search-box">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="m21 21-4.35-4.35"/>
                        </svg>
                        <input type="text" placeholder="搜索" class="search-input">
                    </div>
                    
                    <div class="item-list-modal">
                        <div class="modal-list-item">
                            <div class="modal-item-icon">M</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">MCP Server Example</div>
                                <div class="modal-item-desc">Example MCP server for demonstration</div>
                                <div class="modal-item-meta">发布于2026-01-20 16:46:16</div>
                            </div>
                            <button class="btn-add-item" onclick="addMCPToAgent('MCP Server Example', 'Example MCP server for demonstration', '#6B8EFF', event)">添加</button>
                        </div>
                        
                        <div class="modal-list-item">
                            <div class="modal-item-icon" style="background: #8B5CF6;">F</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">Filesystem MCP</div>
                                <div class="modal-item-desc">MCP server for filesystem operations</div>
                                <div class="modal-item-meta">发布于2026-01-18 09:20:00</div>
                            </div>
                            <button class="btn-add-item" onclick="addMCPToAgent('Filesystem MCP', 'MCP server for filesystem operations', '#8B5CF6', event)">添加</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
}

// 显示编辑Agent模态框
function showEditAgentModal() {
    document.getElementById('editAgentModal').classList.add('active');
}

// 关闭编辑Agent模态框
function closeEditAgentModal() {
    document.getElementById('editAgentModal').classList.remove('active');
}

// 确认编辑Agent
function confirmEditAgent() {
    const name = document.getElementById('editAgentName').value.trim();
    const desc = document.getElementById('editAgentDesc').value.trim();
    
    if (!name) {
        showNotification('请输入智能体名称', 'error');
        return;
    }
    
    document.getElementById('displayAgentName').textContent = name;
    document.getElementById('agentName').value = name;
    
    if (state.currentAgent !== 0) {
        const agent = state.agents.find(a => a.id === state.currentAgent);
        if (agent) {
            agent.name = name;
            agent.description = desc;
            // 保存图标
            const iconImage = document.getElementById('iconImage');
            if (iconImage) {
                agent.icon = iconImage.src;
            }
        }
    }
    
    closeEditAgentModal();
    showNotification('智能体信息已更新', 'success');
}

// 显示通知
function showNotification(message, type = 'success') {
    // 移除已存在的通知
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // 显示动画
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);
    
    // 3秒后自动消失
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// 显示确认对话框
function showConfirmDialog(message, onConfirm) {
    // 移除已存在的确认框
    const existingDialog = document.querySelector('.confirm-dialog');
    if (existingDialog) {
        existingDialog.remove();
    }
    
    const dialog = document.createElement('div');
    dialog.className = 'modal active';
    dialog.innerHTML = `
        <div class="modal-content confirm-dialog">
            <div class="modal-header">
                <h2 class="modal-title">确认</h2>
            </div>
            <div class="modal-body">
                <p style="margin: 0; color: #606266; font-size: 14px;">${message}</p>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeConfirmDialog()">取消</button>
                <button class="btn-primary" onclick="confirmAction()">确定</button>
            </div>
        </div>
    `;
    document.body.appendChild(dialog);
    
    // 保存回调函数
    window.currentConfirmCallback = onConfirm;
}

function closeConfirmDialog() {
    const dialog = document.querySelector('.confirm-dialog');
    if (dialog) {
        dialog.closest('.modal').remove();
    }
    window.currentConfirmCallback = null;
}

function confirmAction() {
    if (window.currentConfirmCallback) {
        window.currentConfirmCallback();
    }
    closeConfirmDialog();
}

// 显示提交提示词模态框
function showSubmitPromptModal() {
    const promptContent = document.getElementById('promptTextarea').value;
    document.getElementById('promptContent').value = promptContent;
    document.getElementById('submitPromptModal').classList.add('active');
}

function closeSubmitPromptModal() {
    document.getElementById('submitPromptModal').classList.remove('active');
}

function submitPrompt() {
    const name = document.getElementById('promptName').value.trim();
    if (!name) {
        showNotification('请输入提示词名称', 'error');
        return;
    }
    
    closeSubmitPromptModal();
    showNotification('提示词已提交', 'success');
}

// 显示提示词库模态框
function showPromptLibraryModal() {
    document.getElementById('promptLibraryModal').classList.add('active');
}

function closePromptLibraryModal() {
    document.getElementById('promptLibraryModal').classList.remove('active');
}

function selectPromptTemplate(element, templateName) {
    // 移除其他选中状态
    document.querySelectorAll('.prompt-list-item').forEach(item => {
        item.classList.remove('active');
    });
    element.classList.add('active');
    
    // 这里可以根据不同模板显示不同内容
    // 暂时保持默认内容
}

function insertPromptTemplate() {
    const previewContent = document.getElementById('promptPreviewContent').innerText;
    document.getElementById('promptTextarea').value = previewContent;
    closePromptLibraryModal();
    showNotification('提示词已插入', 'success');
}

// 智能生成提示词
function showSmartGeneratePromptModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'smartGeneratePromptModal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2 class="modal-title">智能生成提示词</h2>
                <button class="close-btn" onclick="closeSmartGeneratePromptModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">智能体用途描述 <span class="required">*</span></label>
                    <div style="font-size: 12px; color: #909399; margin-bottom: 8px;">描述智能体的功能和用途，AI将根据描述生成专业的提示词</div>
                    <textarea class="form-textarea" id="smartPromptDescription" placeholder="例如：这是一个专业的UI/UX设计助手，能够帮助用户进行界面设计、提供设计建议、生成配色方案、分析用户体验问题..." style="min-height: 120px;" maxlength="1000"></textarea>
                    <div style="text-align: right; font-size: 12px; color: #909399; margin-top: 4px;">
                        <span id="smartPromptDescCount">0</span> / 1000
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">生成风格</label>
                    <div style="display: flex; gap: 12px; flex-wrap: wrap;">
                        <label class="radio-option">
                            <input type="radio" name="promptStyle" value="professional" checked>
                            <span>专业严谨</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="promptStyle" value="friendly">
                            <span>友好亲切</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="promptStyle" value="creative">
                            <span>创意活泼</span>
                        </label>
                        <label class="radio-option">
                            <input type="radio" name="promptStyle" value="concise">
                            <span>简洁高效</span>
                        </label>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeSmartGeneratePromptModal()">取消</button>
                <button class="btn-primary" onclick="confirmSmartGeneratePrompt()">生成提示词</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // 添加字符计数
    const descTextarea = document.getElementById('smartPromptDescription');
    if (descTextarea) {
        descTextarea.addEventListener('input', function() {
            document.getElementById('smartPromptDescCount').textContent = this.value.length;
        });
    }
}

function closeSmartGeneratePromptModal() {
    const modal = document.getElementById('smartGeneratePromptModal');
    if (modal) {
        modal.remove();
    }
}

function confirmSmartGeneratePrompt() {
    const description = document.getElementById('smartPromptDescription').value.trim();
    
    if (!description) {
        showNotification('请输入智能体用途描述', 'error');
        return;
    }
    
    // 获取选中的风格
    const style = document.querySelector('input[name="promptStyle"]:checked').value;
    
    // 根据风格生成不同的提示词
    let generatedPrompt = '';
    
    if (style === 'professional') {
        generatedPrompt = `# 角色定位
${description}

# 核心能力
作为专业的AI助手，我具备以下核心能力：
- 深入理解用户需求，提供精准的专业建议
- 基于行业最佳实践，给出可执行的解决方案
- 保持客观中立的态度，确保建议的专业性和准确性

# 工作原则
1. **专业性**：所有建议和输出都基于专业知识和行业标准
2. **准确性**：确保信息的准确性和可靠性，避免误导用户
3. **系统性**：采用结构化的方法分析问题，提供完整的解决方案
4. **持续优化**：根据用户反馈不断改进服务质量

# 交互规范
- 使用专业术语时提供必要的解释
- 回答结构清晰，逻辑严谨
- 提供具体的案例和数据支持
- 主动询问细节以确保理解准确`;
    } else if (style === 'friendly') {
        generatedPrompt = `# 我是谁
嗨！我是你的AI助手。${description}

# 我能帮你做什么
我会用最友好的方式帮助你：
- 耐心倾听你的需求，理解你想要什么
- 用简单易懂的语言解释复杂的概念
- 提供实用的建议，让你轻松上手
- 陪伴你一起解决问题，直到满意为止

# 我的工作方式
1. **友好沟通**：我会用轻松的语气和你交流，让你感到舒适
2. **耐心解答**：不管问题多简单，我都会认真回答
3. **积极鼓励**：我会给你正面的反馈，增强你的信心
4. **灵活应变**：根据你的反馈随时调整我的帮助方式

# 让我们开始吧
有任何问题都可以随时问我，我会尽力帮助你！`;
    } else if (style === 'creative') {
        generatedPrompt = `# 🎨 角色介绍
${description}

# ✨ 我的特长
我是一个充满创意的AI伙伴，擅长：
- 💡 用创新的角度看待问题
- 🎯 提供独特而实用的解决方案
- 🌈 让枯燥的任务变得有趣
- 🚀 激发你的灵感和创造力

# 🎪 工作风格
1. **打破常规**：不拘泥于传统方法，勇于尝试新思路
2. **趣味互动**：用生动的方式呈现信息，让学习变得有趣
3. **灵感激发**：通过头脑风暴帮你发现更多可能性
4. **快速迭代**：鼓励试错，在实践中不断优化

# 🎯 让我们一起创造
准备好开启一段充满创意的旅程了吗？让我们开始吧！`;
    } else if (style === 'concise') {
        generatedPrompt = `# 角色
${description}

# 能力
- 快速理解需求
- 提供精准答案
- 高效解决问题
- 直击核心要点

# 原则
1. 简洁明了，避免冗余
2. 直接给出可执行方案
3. 重点突出，条理清晰
4. 快速响应，高效沟通

# 输出规范
- 答案简洁有力
- 结构化呈现
- 关键信息优先
- 可快速扫读`;
    }
    
    // 将生成的提示词填入编辑器
    document.getElementById('promptTextarea').value = generatedPrompt;
    
    closeSmartGeneratePromptModal();
    showNotification('提示词已生成', 'success');
}

// 聊天调试功能
function sendMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const chatPreview = document.getElementById('chatPreview');
    
    // 移除空状态
    const emptyState = chatPreview.querySelector('.chat-empty-state');
    const avatar = chatPreview.querySelector('.chat-avatar');
    if (emptyState) emptyState.remove();
    if (avatar) avatar.remove();
    
    // 添加用户消息
    const userMessage = document.createElement('div');
    userMessage.className = 'chat-message user-message';
    userMessage.innerHTML = `
        <div class="message-avatar">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                <circle cx="12" cy="7" r="4"/>
            </svg>
        </div>
        <div class="message-content">${message}</div>
    `;
    chatPreview.appendChild(userMessage);
    
    // 清空输入框
    input.value = '';
    
    // 滚动到底部
    chatPreview.scrollTop = chatPreview.scrollHeight;
    
    // 模拟AI回复
    setTimeout(() => {
        const aiMessage = document.createElement('div');
        aiMessage.className = 'chat-message ai-message';
        aiMessage.innerHTML = `
            <div class="message-avatar ai-avatar">A</div>
            <div class="message-content">
                <div class="message-text">看起来你发了"${message}"，不过不太清楚你发这串数字是想表达什么意思呢。可以详细和我说说吗。</div>
                <div class="message-meta">
                    <span>1.2s | 53 Tokens</span>
                    <div class="message-actions">
                        <button class="message-action-btn" title="复制">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                            </svg>
                        </button>
                        <button class="message-action-btn" title="重新生成">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="23 4 23 10 17 10"/>
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
                            </svg>
                        </button>
                        <button class="message-action-btn" title="删除">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        `;
        chatPreview.appendChild(aiMessage);
        chatPreview.scrollTop = chatPreview.scrollHeight;
    }, 1000);
}

function handleChatKeydown(event) {
    if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
    }
}

function clearChatHistory() {
    const chatPreview = document.getElementById('chatPreview');
    chatPreview.innerHTML = `
        <div class="chat-avatar">A</div>
        <div class="chat-empty-state">
            <p>直接输入问题，可通过对话来发送</p>
        </div>
    `;
    showNotification('对话记录已清除', 'success');
}

function startDebug() {
    showNotification('开始调试...', 'info');
}

function triggerFileUpload() {
    document.getElementById('chatFileUpload').click();
}

function handleChatFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        showNotification(`文件 ${file.name} 已上传（演示）`, 'success');
    }
}

// 切换调试面板
function toggleDebugPanel() {
    const debugPanel = document.getElementById('debugPanel');
    debugPanel.classList.toggle('active');
}

// 显示图标编辑按钮
function showIconEdit() {
    const overlay = document.getElementById('iconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '1';
    }
}

// 隐藏图标编辑按钮
function hideIconEdit() {
    const overlay = document.getElementById('iconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
    }
}

// 触发图标上传
function triggerIconUpload() {
    document.getElementById('iconUpload').click();
}

// 处理图标上传
function handleIconUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showNotification('请上传图片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const iconDisplay = document.getElementById('iconDisplay');
            iconDisplay.innerHTML = `
                <img src="${e.target.result}" class="icon-image" id="iconImage">
                <div class="icon-edit-overlay" id="iconEditOverlay">
                    <button class="icon-edit-btn" onclick="triggerIconUpload()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }
}

// 更新字符计数
function updateCharCount(inputId, counterId, maxLength) {
    const input = document.getElementById(inputId);
    const counter = document.getElementById(counterId);
    const length = input.value.length;
    counter.textContent = length;
    
    if (length >= maxLength) {
        counter.style.color = '#F56C6C';
    } else {
        counter.style.color = '#909399';
    }
}

// 显示/隐藏技能删除按钮
function showDeleteBtn(element) {
    const deleteBtn = element.querySelector('.tool-item-delete');
    if (deleteBtn) {
        deleteBtn.style.opacity = '1';
    }
}

function hideDeleteBtn(element) {
    const deleteBtn = element.querySelector('.tool-item-delete');
    if (deleteBtn) {
        deleteBtn.style.opacity = '0';
    }
}

// 移除技能
function removeSkill(event) {
    event.stopPropagation();
    event.target.closest('.tool-item').remove();
    showNotification('删除成功', 'success');
}

// 显示添加技能模态框
function showAddSkillModal() {
    document.getElementById('addSkillModal').classList.add('active');
}

function closeAddSkillModal() {
    document.getElementById('addSkillModal').classList.remove('active');
}

// 显示添加知识库模态框
function showAddKnowledgeModal() {
    document.getElementById('addKnowledgeModal').classList.add('active');
}

function closeAddKnowledgeModal() {
    document.getElementById('addKnowledgeModal').classList.remove('active');
}

// 显示添加MCP模态框
function showAddMCPModal() {
    document.getElementById('addMCPModal').classList.add('active');
}

function closeAddMCPModal() {
    document.getElementById('addMCPModal').classList.remove('active');
}

// 自定义下拉框
function toggleModelDropdown() {
    const dropdown = document.getElementById('modelDropdown');
    dropdown.classList.toggle('show');
}

function selectModel(event, model) {
    event.stopPropagation();
    document.getElementById('selectedModel').textContent = model;
    document.getElementById('modelDropdown').classList.remove('show');
}

// 点击外部关闭下拉框
document.addEventListener('click', function(event) {
    const dropdown = document.getElementById('modelDropdown');
    if (dropdown && !event.target.closest('.custom-select')) {
        dropdown.classList.remove('show');
    }
    
    const createDropdown = document.getElementById('createAgentDropdown');
    if (createDropdown && !event.target.closest('.btn-primary') && !event.target.closest('#createAgentDropdown')) {
        createDropdown.classList.remove('show');
    }
});

// 添加技能到Agent
function addSkillToAgent(skillName, skillDesc, iconBg, event) {
    const button = event.target;
    
    // 更新按钮状态
    button.textContent = '已添加';
    button.classList.add('added');
    button.onclick = null;
    
    // 添加到编排栏
    const skillsContainer = document.querySelector('.tool-category:nth-child(2) .tool-section');
    const newSkill = document.createElement('div');
    newSkill.className = 'tool-item';
    newSkill.setAttribute('onmouseenter', 'showDeleteBtn(this)');
    newSkill.setAttribute('onmouseleave', 'hideDeleteBtn(this)');
    newSkill.innerHTML = `
        <div class="tool-item-icon" style="background: ${iconBg || '#6B8EFF'}">${skillName.charAt(0).toUpperCase()}</div>
        <div class="tool-item-content">
            <div class="tool-item-name">${skillName}</div>
            <div class="tool-item-desc">${skillDesc || ''}</div>
        </div>
        <button class="tool-item-delete" onclick="removeSkill(event)" title="移除">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    skillsContainer.appendChild(newSkill);
    
    showNotification('添加成功', 'success');
}

// 添加知识库到Agent
function addKnowledgeToAgent(knowledgeName, iconBg, event) {
    const button = event.target;
    
    // 更新按钮状态
    button.textContent = '已添加';
    button.classList.add('added');
    button.onclick = null;
    
    // 添加到编排栏
    const knowledgeContainer = document.querySelector('.tool-category:nth-child(4) .tool-section');
    const newKnowledge = document.createElement('div');
    newKnowledge.className = 'tool-item';
    newKnowledge.setAttribute('onmouseenter', 'showDeleteBtn(this)');
    newKnowledge.setAttribute('onmouseleave', 'hideDeleteBtn(this)');
    newKnowledge.innerHTML = `
        <div class="tool-item-icon" style="background: ${iconBg || '#A8D98E'}">${knowledgeName.charAt(0).toUpperCase()}</div>
        <div class="tool-item-content">
            <div class="tool-item-name">${knowledgeName}</div>
        </div>
        <button class="tool-item-delete" onclick="removeSkill(event)" title="移除">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    knowledgeContainer.appendChild(newKnowledge);
    
    showNotification('添加成功', 'success');
}

// 添加MCP到Agent
function addMCPToAgent(mcpName, mcpDesc, iconBg, event) {
    const button = event.target;
    
    // 更新按钮状态
    button.textContent = '已添加';
    button.classList.add('added');
    button.onclick = null;
    
    // 添加到编排栏
    const mcpContainer = document.querySelector('.tool-category:nth-child(3) .tool-section');
    const newMCP = document.createElement('div');
    newMCP.className = 'tool-item';
    newMCP.setAttribute('onmouseenter', 'showDeleteBtn(this)');
    newMCP.setAttribute('onmouseleave', 'hideDeleteBtn(this)');
    newMCP.innerHTML = `
        <div class="tool-item-icon" style="background: ${iconBg || '#6B8EFF'}">${mcpName.charAt(0).toUpperCase()}</div>
        <div class="tool-item-content">
            <div class="tool-item-name">${mcpName}</div>
            <div class="tool-item-desc">${mcpDesc || ''}</div>
        </div>
        <button class="tool-item-delete" onclick="removeSkill(event)" title="移除">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
        </button>
    `;
    mcpContainer.appendChild(newMCP);
    
    showNotification('添加成功', 'success');
}

// 渲染Skill编辑器
function renderSkillEditor() {
    const skill = state.skills.find(s => s.id === state.currentSkill) || { name: '新技能', description: '', icon: null };
    
    return `
        <div class="skill-editor">
            <div class="editor-top-bar">
                <button class="back-btn" onclick="backToList()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; margin-right: 4px;">
                        <line x1="19" y1="12" x2="5" y2="12"/>
                        <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    返回
                </button>
                <div class="editor-title-section">
                    <div class="skill-icon-small">
                        ${skill.icon ? `<img src="${skill.icon}" style="width: 100%; height: 100%; object-fit: cover; border-radius: 8px;">` : skill.name.charAt(0).toUpperCase()}
                    </div>
                    <h2 class="editor-agent-name" id="displaySkillName">${skill.name}</h2>
                    <button class="btn-edit-name" onclick="showEditSkillModal()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
                <button class="btn-primary" onclick="saveSkill()">保存</button>
            </div>
            
            <div class="skill-editor-body">
                <div class="skill-editor-sidebar">
                    <div class="sidebar-header">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 16px; height: 16px; margin-right: 8px;">
                            <path d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/>
                        </svg>
                        <span>文件</span>
                    </div>
                    <div class="file-tree">
                        <div class="file-item active" onclick="selectSkillFile('SKILL.md')">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; margin-right: 6px;">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            SKILL.md
                        </div>
                        <div class="file-item folder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; margin-right: 6px;">
                                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                            </svg>
                            assets/
                        </div>
                        <div class="file-item folder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; margin-right: 6px;">
                                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                            </svg>
                            references/
                        </div>
                        <div class="file-item folder">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; margin-right: 6px;">
                                <path d="M22 19a2 2 0 01-2 2H4a2 2 0 01-2-2V5a2 2 0 012-2h5l2 3h9a2 2 0 012 2z"/>
                            </svg>
                            scripts/
                        </div>
                    </div>
                </div>
                
                <div class="code-editor-main">
                    <div class="editor-file-tabs">
                        <div class="file-tab active">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 14px; height: 14px; margin-right: 6px;">
                                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                <polyline points="14 2 14 8 20 8"/>
                            </svg>
                            SKILL.md
                        </div>
                    </div>
                    
                    <div class="code-editor-container">
                        <div class="line-numbers" id="lineNumbers"></div>
                        <textarea class="code-area" id="skillCode" oninput="updateLineNumbers()" onscroll="syncScroll()">---
name: ${skill.name}
description: ${skill.description || ''}
license:
---

# Processing Guide

## Overview

</textarea>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 编辑技能模态框 -->
        <div id="editSkillModal" class="modal">
            <div class="modal-content modal-large">
                <div class="modal-header">
                    <h2 class="modal-title">更新技能</h2>
                    <button class="close-btn" onclick="closeEditSkillModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <div class="form-group">
                        <label class="form-label">技能名称 <span class="required">*</span></label>
                        <div class="input-with-counter">
                            <input type="text" class="form-input" id="editSkillName" value="${skill.name}" maxlength="50" oninput="updateCharCount('editSkillName', 'skillNameCharCount', 50)">
                            <span class="char-counter"><span id="skillNameCharCount">${skill.name.length}</span> / 50</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">技能描述</label>
                        <div class="textarea-with-counter">
                            <textarea class="form-textarea" id="editSkillDesc" placeholder="介绍技能的功能" maxlength="10000" oninput="updateCharCount('editSkillDesc', 'skillDescCharCount', 10000)">${skill.description || ''}</textarea>
                            <span class="char-counter"><span id="skillDescCharCount">${(skill.description || '').length}</span> / 10000</span>
                        </div>
                    </div>
                    
                    <div class="form-group">
                        <label class="form-label">图标</label>
                        <div class="agent-icon-preview">
                            <div class="icon-display" id="skillIconDisplay" onmouseenter="showSkillIconEdit()" onmouseleave="hideSkillIconEdit()">
                                ${skill.icon ? `<img src="${skill.icon}" class="icon-image" id="skillIconImage">` : skill.name.charAt(0).toUpperCase()}
                                <div class="icon-edit-overlay" id="skillIconEditOverlay">
                                    <button class="icon-edit-btn" onclick="triggerSkillIconUpload()">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            <input type="file" id="skillIconUpload" accept="image/*" style="display: none;" onchange="handleSkillIconUpload(event)">
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn-secondary" onclick="closeEditSkillModal()">取消</button>
                    <button class="btn-primary" onclick="confirmEditSkill()">确定</button>
                </div>
            </div>
        </div>
        
        <input type="hidden" id="skillName" value="${skill.name}">
        <input type="hidden" id="skillId" value="${skill.id}">
    `;
}

function showEditSkillModal() {
    document.getElementById('editSkillModal').classList.add('active');
}

function closeEditSkillModal() {
    document.getElementById('editSkillModal').classList.remove('active');
}

function confirmEditSkill() {
    const name = document.getElementById('editSkillName').value.trim();
    const desc = document.getElementById('editSkillDesc').value.trim();
    
    if (!name) {
        showNotification('请输入技能名称', 'error');
        return;
    }
    
    document.getElementById('displaySkillName').textContent = name;
    document.getElementById('skillName').value = name;
    
    if (state.currentSkill !== 0) {
        const skill = state.skills.find(s => s.id === state.currentSkill);
        if (skill) {
            skill.name = name;
            skill.description = desc;
            // 保存图标
            const iconImage = document.getElementById('skillIconImage');
            if (iconImage) {
                skill.icon = iconImage.src;
            }
        }
    }
    
    closeEditSkillModal();
    showNotification('技能信息已更新', 'success');
}

function showSkillIconEdit() {
    const overlay = document.getElementById('skillIconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '1';
    }
}

function hideSkillIconEdit() {
    const overlay = document.getElementById('skillIconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
    }
}

function triggerSkillIconUpload() {
    document.getElementById('skillIconUpload').click();
}

function handleSkillIconUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showNotification('请上传图片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const iconDisplay = document.getElementById('skillIconDisplay');
            iconDisplay.innerHTML = `
                <img src="${e.target.result}" class="icon-image" id="skillIconImage">
                <div class="icon-edit-overlay" id="skillIconEditOverlay">
                    <button class="icon-edit-btn" onclick="triggerSkillIconUpload()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function selectSkillFile(filename) {
    document.querySelectorAll('.file-item').forEach(item => {
        item.classList.remove('active');
    });
    event.target.closest('.file-item').classList.add('active');
}

function updateLineNumbers() {
    const textarea = document.getElementById('skillCode');
    const lineNumbers = document.getElementById('lineNumbers');
    if (!textarea || !lineNumbers) return;
    
    const lines = textarea.value.split('\n').length;
    let lineNumbersHtml = '';
    for (let i = 1; i <= lines; i++) {
        lineNumbersHtml += `<div>${i}</div>`;
    }
    lineNumbers.innerHTML = lineNumbersHtml;
}

function syncScroll() {
    const textarea = document.getElementById('skillCode');
    const lineNumbers = document.getElementById('lineNumbers');
    if (!textarea || !lineNumbers) return;
    
    lineNumbers.scrollTop = textarea.scrollTop;
}

// 初始化行号
setTimeout(() => {
    if (document.getElementById('skillCode')) {
        updateLineNumbers();
    }
}, 100);

// 事件监听
function setupEventListeners() {
    // 导航切换
    document.querySelectorAll('.nav-tab').forEach(tab => {
        tab.addEventListener('click', (e) => {
            state.currentView = e.target.dataset.view;
            renderApp();
        });
    });
}

// Agent操作
function toggleCreateAgentDropdown() {
    const dropdown = document.getElementById('createAgentDropdown');
    dropdown.classList.toggle('show');
}

function quickCreateAgent() {
    const dropdown = document.getElementById('createAgentDropdown');
    dropdown.classList.remove('show');
    showQuickCreateModal();
}

function normalCreateAgent() {
    showNormalCreateModal();
}

function showNormalCreateModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'normalCreateModal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2 class="modal-title">创建智能体</h2>
                <button class="close-btn" onclick="closeNormalCreateModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group">
                    <label class="form-label">智能体名称 <span class="required">*</span></label>
                    <div class="input-with-counter">
                        <input type="text" class="form-input" id="newAgentName" maxlength="50" oninput="updateCharCount('newAgentName', 'newNameCharCount', 50)">
                        <span class="char-counter"><span id="newNameCharCount">0</span> / 50</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">智能体功能介绍</label>
                    <div class="textarea-with-counter">
                        <textarea class="form-textarea" id="newAgentDesc" placeholder="介绍智能体的功能，将会展示给智能体的用户" maxlength="10000" oninput="updateCharCount('newAgentDesc', 'newDescCharCount', 10000)"></textarea>
                        <span class="char-counter"><span id="newDescCharCount">0</span> / 10000</span>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">图标</label>
                    <div class="agent-icon-preview">
                        <div class="icon-display" id="newIconDisplay" onmouseenter="showNewIconEdit()" onmouseleave="hideNewIconEdit()">
                            A
                            <div class="icon-edit-overlay" id="newIconEditOverlay">
                                <button class="icon-edit-btn" onclick="triggerNewIconUpload()">
                                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                        <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                        <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <input type="file" id="newIconUpload" accept="image/*" style="display: none;" onchange="handleNewIconUpload(event)">
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeNormalCreateModal()">取消</button>
                <button class="btn-primary" onclick="confirmNormalCreate()">确定</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
}

function closeNormalCreateModal() {
    const modal = document.getElementById('normalCreateModal');
    if (modal) {
        modal.remove();
    }
}

function confirmNormalCreate() {
    const name = document.getElementById('newAgentName').value.trim();
    const desc = document.getElementById('newAgentDesc').value.trim();
    
    if (!name) {
        showNotification('请输入智能体名称', 'error');
        return;
    }
    
    const newAgent = {
        id: Date.now(),
        name,
        description: desc || '新创建的智能体',
        updatedAt: new Date().toISOString().split('T')[0],
        icon: null
    };
    
    const iconImage = document.getElementById('newIconImage');
    if (iconImage) {
        newAgent.icon = iconImage.src;
    }
    
    state.agents.push(newAgent);
    closeNormalCreateModal();
    state.currentAgent = newAgent.id;
    renderApp();
}

function showNewIconEdit() {
    const overlay = document.getElementById('newIconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '1';
    }
}

function hideNewIconEdit() {
    const overlay = document.getElementById('newIconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
    }
}

function triggerNewIconUpload() {
    document.getElementById('newIconUpload').click();
}

function handleNewIconUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showNotification('请上传图片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const iconDisplay = document.getElementById('newIconDisplay');
            iconDisplay.innerHTML = `
                <img src="${e.target.result}" class="icon-image" id="newIconImage">
                <div class="icon-edit-overlay" id="newIconEditOverlay">
                    <button class="icon-edit-btn" onclick="triggerNewIconUpload()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function showQuickCreateModal() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'quickCreateModal';
    modal.innerHTML = `
        <div class="modal-content modal-xlarge">
            <div class="modal-header">
                <h2 class="modal-title">极速创建智能体</h2>
                <button class="close-btn" onclick="closeQuickCreateModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="form-group" style="margin-bottom: 32px;">
                    <label class="form-label" style="font-size: 15px; font-weight: 600; color: #303133;">智能体用途描述 <span class="required">*</span></label>
                    <div style="font-size: 12px; color: #909399; margin-bottom: 8px;">描述智能体的功能和用途，将用于生成提示词和智能体名称</div>
                    <textarea class="form-textarea" id="quickAgentDesc" placeholder="例如：这是一个专业的UI/UX设计助手，能够帮助用户进行界面设计、提供设计建议、生成配色方案等" style="min-height: 100px;" maxlength="500"></textarea>
                    <div style="text-align: right; font-size: 12px; color: #909399; margin-top: 4px;">
                        <span id="quickDescCount">0</span> / 500
                    </div>
                </div>
                
                <div class="quick-create-divider"></div>
                
                <div class="form-group">
                    <label class="form-label">选择技能 <span class="required">*</span></label>
                    <div class="item-list-modal" style="max-height: 180px;">
                        <div class="modal-list-item" onclick="toggleQuickSelect(this, 'skill', 'ui-ux')">
                            <div class="modal-item-icon" style="background: #B8E986;">U</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">ui-ux</div>
                                <div class="modal-item-desc">UI/UX design intelligence. 50 styles, 21 palettes...</div>
                            </div>
                            <div class="quick-select-checkbox">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </div>
                        </div>
                        <div class="modal-list-item" onclick="toggleQuickSelect(this, 'skill', 'webapp-testing')">
                            <div class="modal-item-icon" style="background: #FFB86C;">W</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">webapp-testing</div>
                                <div class="modal-item-desc">Toolkit for interacting with and testing local web applications...</div>
                            </div>
                            <div class="quick-select-checkbox">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">选择MCP</label>
                    <div class="item-list-modal" style="max-height: 180px;">
                        <div class="modal-list-item" onclick="toggleQuickSelect(this, 'mcp', 'MCP Server Example')">
                            <div class="modal-item-icon">M</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">MCP Server Example</div>
                                <div class="modal-item-desc">Example MCP server for demonstration</div>
                            </div>
                            <div class="quick-select-checkbox">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </div>
                        </div>
                        <div class="modal-list-item" onclick="toggleQuickSelect(this, 'mcp', 'Filesystem MCP')">
                            <div class="modal-item-icon" style="background: #8B5CF6;">F</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">Filesystem MCP</div>
                                <div class="modal-item-desc">MCP server for filesystem operations</div>
                            </div>
                            <div class="quick-select-checkbox">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <polyline points="20 6 9 17 4 12"/>
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label class="form-label">选择MDP（暂未开放）</label>
                    <div class="item-list-modal" style="max-height: 100px; opacity: 0.5; pointer-events: none;">
                        <div class="modal-list-item">
                            <div class="modal-item-icon" style="background: #909399;">M</div>
                            <div class="modal-item-content">
                                <div class="modal-item-name">MDP功能暂未开放</div>
                                <div class="modal-item-desc">敬请期待</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeQuickCreateModal()">取消</button>
                <button class="btn-primary" onclick="confirmQuickCreate()">去创建</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    // 初始化选择状态
    window.quickCreateSelections = {
        skills: [],
        mcps: []
    };
    
    // 添加字符计数
    const descTextarea = document.getElementById('quickAgentDesc');
    if (descTextarea) {
        descTextarea.addEventListener('input', function() {
            document.getElementById('quickDescCount').textContent = this.value.length;
        });
    }
}

function closeQuickCreateModal() {
    const modal = document.getElementById('quickCreateModal');
    if (modal) {
        modal.remove();
    }
    window.quickCreateSelections = null;
}

function toggleQuickSelect(element, type, name) {
    element.classList.toggle('selected');
    
    if (type === 'skill') {
        const index = window.quickCreateSelections.skills.indexOf(name);
        if (index > -1) {
            window.quickCreateSelections.skills.splice(index, 1);
        } else {
            window.quickCreateSelections.skills.push(name);
        }
    } else if (type === 'mcp') {
        const index = window.quickCreateSelections.mcps.indexOf(name);
        if (index > -1) {
            window.quickCreateSelections.mcps.splice(index, 1);
        } else {
            window.quickCreateSelections.mcps.push(name);
        }
    }
}

function confirmQuickCreate() {
    const description = document.getElementById('quickAgentDesc').value.trim();
    const selections = window.quickCreateSelections;
    
    if (!description) {
        showNotification('请输入智能体用途描述', 'error');
        return;
    }
    
    if (selections.skills.length === 0) {
        showNotification('请至少选择一个技能', 'error');
        return;
    }
    
    // 自动生成智能体名称（基于描述的前几个字或关键词）
    let generatedName = '智能助手';
    if (description.length > 0) {
        // 尝试提取描述中的关键词作为名称
        const keywords = ['设计', '开发', '测试', '分析', '客服', '助手', '专家', '顾问'];
        for (const keyword of keywords) {
            if (description.includes(keyword)) {
                generatedName = keyword + '助手';
                break;
            }
        }
        // 如果没有匹配到关键词，使用描述的前8个字
        if (generatedName === '智能助手' && description.length >= 4) {
            generatedName = description.substring(0, Math.min(8, description.length));
            if (!generatedName.includes('助手') && !generatedName.includes('智能体')) {
                generatedName += '助手';
            }
        }
    }
    
    // 根据描述生成提示词
    let generatedPrompt = `# 角色定位\n${description}\n\n`;
    
    generatedPrompt += `# 能力配置\n`;
    if (selections.skills.length > 0) {
        generatedPrompt += `\n## 技能\n你具备以下技能：\n`;
        selections.skills.forEach(skill => {
            const skillData = getSkillData(skill);
            generatedPrompt += `- ${skillData.name}: ${skillData.desc}\n`;
        });
    }
    
    if (selections.mcps.length > 0) {
        generatedPrompt += `\n## 工具\n你可以使用以下工具：\n`;
        selections.mcps.forEach(mcp => {
            const mcpData = getMCPData(mcp);
            generatedPrompt += `- ${mcpData.name}: ${mcpData.desc}\n`;
        });
    }
    
    generatedPrompt += `\n# 工作原则\n`;
    generatedPrompt += `1. 充分理解用户需求，提供专业、准确的帮助\n`;
    generatedPrompt += `2. 灵活运用你的技能和工具来解决问题\n`;
    generatedPrompt += `3. 保持友好、耐心的态度，确保用户获得良好的体验\n`;
    generatedPrompt += `4. 当遇到不确定的情况时，主动向用户确认需求\n`;
    
    const newAgent = {
        id: Date.now(),
        name: generatedName,
        description: description,
        updatedAt: new Date().toISOString().split('T')[0],
        icon: null,
        quickCreate: true,
        selectedSkills: [...selections.skills],
        selectedMCPs: [...selections.mcps],
        prompt: generatedPrompt
    };
    
    state.agents.push(newAgent);
    closeQuickCreateModal();
    state.currentAgent = newAgent.id;
    
    // 保存选择以便在渲染时使用
    state.quickCreateData = {
        skills: [...selections.skills],
        mcps: [...selections.mcps]
    };
    
    renderApp();
}

function createAgent() {
    state.currentAgent = 0; // 0表示新建
    renderApp();
}

function editAgent(id) {
    state.currentAgent = id;
    renderApp();
}

function deleteAgent(id) {
    showConfirmDialog('确定要删除这个智能体吗？', () => {
        state.agents = state.agents.filter(a => a.id !== id);
        renderApp();
        showNotification('删除成功', 'success');
    });
}

function saveAgent() {
    const name = document.getElementById('agentName').value;
    if (!name) {
        showNotification('请输入智能体名称', 'error');
        return;
    }
    
    if (state.currentAgent === 0) {
        state.agents.push({
            id: Date.now(),
            name,
            description: '新创建的智能体',
            updatedAt: new Date().toISOString().split('T')[0]
        });
    } else {
        const agent = state.agents.find(a => a.id === state.currentAgent);
        if (agent) {
            agent.name = name;
            agent.updatedAt = new Date().toISOString().split('T')[0];
        }
    }
    
    showNotification('保存成功', 'success');
    backToList();
}

// Skill操作
function showSkillCreateOptions() {
    const modal = document.createElement('div');
    modal.className = 'modal active';
    modal.id = 'skillCreateModal';
    modal.innerHTML = `
        <div class="modal-content modal-large">
            <div class="modal-header">
                <h2 class="modal-title">创建技能</h2>
                <button class="close-btn" onclick="closeSkillCreateModal()">&times;</button>
            </div>
            <div class="modal-body">
                <div class="skill-create-options">
                    <div class="skill-option-item" data-option="import" onclick="selectSkillOption('import')">
                        <div class="skill-option-radio"></div>
                        <div class="skill-option-content">
                            <div class="skill-option-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                    <polyline points="7 10 12 15 17 10"/>
                                    <line x1="12" y1="15" x2="12" y2="3"/>
                                </svg>
                            </div>
                            <div>
                                <div class="skill-option-title">导入技能</div>
                                <div class="skill-option-desc">上传ZIP文件导入现有技能</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-option-item" data-option="nl" onclick="selectSkillOption('nl')">
                        <div class="skill-option-radio"></div>
                        <div class="skill-option-content">
                            <div class="skill-option-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                                </svg>
                            </div>
                            <div>
                                <div class="skill-option-title">自然语言创建</div>
                                <div class="skill-option-desc">通过对话描述创建技能</div>
                            </div>
                        </div>
                    </div>
                    
                    <div class="skill-option-item" data-option="blank" onclick="selectSkillOption('blank')">
                        <div class="skill-option-radio"></div>
                        <div class="skill-option-content">
                            <div class="skill-option-icon">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                                    <polyline points="14 2 14 8 20 8"/>
                                    <line x1="12" y1="18" x2="12" y2="12"/>
                                    <line x1="9" y1="15" x2="15" y2="15"/>
                                </svg>
                            </div>
                            <div>
                                <div class="skill-option-title">从空白创建</div>
                                <div class="skill-option-desc">从零开始编写技能代码</div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div id="skillOptionContent" style="margin-top: 24px; display: none;">
                    <!-- 动态内容区域 -->
                </div>
            </div>
            <div class="modal-footer">
                <button class="btn-secondary" onclick="closeSkillCreateModal()">取消</button>
                <button class="btn-primary" onclick="confirmSkillCreate()">去创建</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    window.selectedSkillOption = null;
}

function closeSkillCreateModal() {
    const modal = document.getElementById('skillCreateModal');
    if (modal) {
        modal.remove();
    }
    window.selectedSkillOption = null;
}

function selectSkillOption(option) {
    // 移除所有选中状态
    document.querySelectorAll('.skill-option-item').forEach(item => {
        item.classList.remove('selected');
    });
    
    // 选中当前项
    const selectedItem = document.querySelector(`[data-option="${option}"]`);
    selectedItem.classList.add('selected');
    
    window.selectedSkillOption = option;
    
    // 显示对应的内容
    const contentArea = document.getElementById('skillOptionContent');
    contentArea.style.display = 'block';
    
    if (option === 'import') {
        contentArea.innerHTML = `
            <div class="form-group">
                <label class="form-label">上传ZIP文件</label>
                <div class="file-upload-area" onclick="triggerSkillFileUpload()">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width: 48px; height: 48px; color: #909399; margin-bottom: 12px;">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                        <polyline points="17 8 12 3 7 8"/>
                        <line x1="12" y1="3" x2="12" y2="15"/>
                    </svg>
                    <div style="font-size: 14px; color: #606266; margin-bottom: 4px;">点击上传或拖拽文件到此处</div>
                    <div style="font-size: 12px; color: #909399;">支持 .zip 格式文件</div>
                    <input type="file" id="skillFileUpload" accept=".zip" style="display: none;" onchange="handleSkillFileUpload(event)">
                </div>
                <div id="uploadedFileName" style="margin-top: 12px; font-size: 13px; color: #606266;"></div>
            </div>
        `;
    } else if (option === 'nl') {
        contentArea.innerHTML = `
            <div class="form-group">
                <label class="form-label">描述技能功能</label>
                <textarea class="form-textarea" id="skillNLDescription" placeholder="请详细描述技能的功能、用途和预期行为，例如：这是一个用于生成UI设计建议的技能，能够根据用户需求提供配色方案、布局建议和设计规范..." style="min-height: 150px;"></textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">选择MCP（可选）</label>
                <div class="item-list-modal" style="max-height: 180px;">
                    <div class="modal-list-item" onclick="toggleSkillNLSelect(this, 'mcp', 'MCP Server Example')">
                        <div class="modal-item-icon">M</div>
                        <div class="modal-item-content">
                            <div class="modal-item-name">MCP Server Example</div>
                            <div class="modal-item-desc">Example MCP server for demonstration</div>
                        </div>
                        <div class="quick-select-checkbox">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                    </div>
                    <div class="modal-list-item" onclick="toggleSkillNLSelect(this, 'mcp', 'Filesystem MCP')">
                        <div class="modal-item-icon" style="background: #8B5CF6;">F</div>
                        <div class="modal-item-content">
                            <div class="modal-item-name">Filesystem MCP</div>
                            <div class="modal-item-desc">MCP server for filesystem operations</div>
                        </div>
                        <div class="quick-select-checkbox">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label class="form-label">选择MDP（可选）</label>
                <div class="item-list-modal" style="max-height: 180px;">
                    <div class="modal-list-item" onclick="toggleSkillNLSelect(this, 'mdp', 'MDP Example')">
                        <div class="modal-item-icon" style="background: #FF6B9D;">M</div>
                        <div class="modal-item-content">
                            <div class="modal-item-name">MDP Example</div>
                            <div class="modal-item-desc">Example MDP for demonstration</div>
                        </div>
                        <div class="quick-select-checkbox">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="20 6 9 17 4 12"/>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // 初始化选择状态
        if (!window.skillNLSelections) {
            window.skillNLSelections = {
                mcps: [],
                mdps: []
            };
        }
    } else if (option === 'blank') {
        contentArea.innerHTML = `
            <div class="form-group">
                <label class="form-label">技能名称 <span class="required">*</span></label>
                <input type="text" class="form-input" id="blankSkillName" placeholder="请输入技能名称" maxlength="50">
            </div>
            
            <div class="form-group">
                <label class="form-label">技能描述</label>
                <textarea class="form-textarea" id="blankSkillDesc" placeholder="介绍技能的功能和用途" style="min-height: 100px;" maxlength="500"></textarea>
            </div>
            
            <div class="form-group">
                <label class="form-label">图标</label>
                <div class="agent-icon-preview">
                    <div class="icon-display" id="blankSkillIconDisplay" onmouseenter="showBlankSkillIconEdit()" onmouseleave="hideBlankSkillIconEdit()">
                        S
                        <div class="icon-edit-overlay" id="blankSkillIconEditOverlay">
                            <button class="icon-edit-btn" onclick="triggerBlankSkillIconUpload()">
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                                    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                </svg>
                            </button>
                        </div>
                    </div>
                    <input type="file" id="blankSkillIconUpload" accept="image/*" style="display: none;" onchange="handleBlankSkillIconUpload(event)">
                </div>
            </div>
        `;
    }
}

function showBlankSkillIconEdit() {
    const overlay = document.getElementById('blankSkillIconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '1';
    }
}

function hideBlankSkillIconEdit() {
    const overlay = document.getElementById('blankSkillIconEditOverlay');
    if (overlay) {
        overlay.style.opacity = '0';
    }
}

function triggerBlankSkillIconUpload() {
    document.getElementById('blankSkillIconUpload').click();
}

function handleBlankSkillIconUpload(event) {
    const file = event.target.files[0];
    if (file) {
        if (!file.type.startsWith('image/')) {
            showNotification('请上传图片文件', 'error');
            return;
        }
        
        const reader = new FileReader();
        reader.onload = function(e) {
            const iconDisplay = document.getElementById('blankSkillIconDisplay');
            iconDisplay.innerHTML = `
                <img src="${e.target.result}" class="icon-image" id="blankSkillIconImage">
                <div class="icon-edit-overlay" id="blankSkillIconEditOverlay">
                    <button class="icon-edit-btn" onclick="triggerBlankSkillIconUpload()">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                    </button>
                </div>
            `;
        };
        reader.readAsDataURL(file);
    }
}

function toggleSkillNLSelect(element, type, name) {
    element.classList.toggle('selected');
    
    if (!window.skillNLSelections) {
        window.skillNLSelections = {
            mcps: [],
            mdps: []
        };
    }
    
    if (type === 'mcp') {
        const index = window.skillNLSelections.mcps.indexOf(name);
        if (index > -1) {
            window.skillNLSelections.mcps.splice(index, 1);
        } else {
            window.skillNLSelections.mcps.push(name);
        }
    } else if (type === 'mdp') {
        const index = window.skillNLSelections.mdps.indexOf(name);
        if (index > -1) {
            window.skillNLSelections.mdps.splice(index, 1);
        } else {
            window.skillNLSelections.mdps.push(name);
        }
    }
}

function triggerSkillFileUpload() {
    document.getElementById('skillFileUpload').click();
}

function handleSkillFileUpload(event) {
    const file = event.target.files[0];
    if (file) {
        document.getElementById('uploadedFileName').textContent = `已选择: ${file.name}`;
    }
}

function confirmSkillCreate() {
    if (!window.selectedSkillOption) {
        showNotification('请选择创建方式', 'error');
        return;
    }
    
    if (window.selectedSkillOption === 'import') {
        const fileInput = document.getElementById('skillFileUpload');
        if (!fileInput || !fileInput.files[0]) {
            showNotification('请上传ZIP文件', 'error');
            return;
        }
        showNotification(`已选择文件: ${fileInput.files[0].name}（演示模式）`, 'info');
        closeSkillCreateModal();
    } else if (window.selectedSkillOption === 'nl') {
        const description = document.getElementById('skillNLDescription').value.trim();
        if (!description) {
            showNotification('请描述技能功能', 'error');
            return;
        }
        showNotification('自然语言创建功能（演示）', 'info');
        closeSkillCreateModal();
    } else if (window.selectedSkillOption === 'blank') {
        const name = document.getElementById('blankSkillName').value.trim();
        const description = document.getElementById('blankSkillDesc').value.trim();
        
        if (!name) {
            showNotification('请输入技能名称', 'error');
            return;
        }
        
        // 获取图标
        let icon = null;
        const iconImage = document.getElementById('blankSkillIconImage');
        if (iconImage) {
            icon = iconImage.src;
        }
        
        // 创建新技能
        const newSkill = {
            id: Date.now(),
            name: name,
            description: description || '新创建的技能',
            updatedAt: new Date().toISOString().split('T')[0],
            icon: icon
        };
        
        state.skills.push(newSkill);
        closeSkillCreateModal();
        state.currentSkill = newSkill.id;
        renderApp();
    }
}

function closeModal() {
    const modal = document.getElementById('skillModal');
    if (modal) {
        modal.classList.remove('active');
    }
}

function importSkill() {
    closeModal();
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.zip';
    input.onchange = (e) => {
        const file = e.target.files[0];
        if (file) {
            showNotification(`已选择文件: ${file.name}（演示模式，不会真正导入）`, 'info');
        }
    };
    input.click();
}

function createSkillNL() {
    closeModal();
    showNotification('自然语言创建功能（演示）', 'info');
}

function createSkillBlank() {
    closeModal();
    state.currentSkill = 0;
    renderApp();
}

function editSkill(id) {
    state.currentSkill = id;
    renderApp();
}

function deleteSkill(id) {
    showConfirmDialog('确定要删除这个技能吗？', () => {
        state.skills = state.skills.filter(s => s.id !== id);
        renderApp();
        showNotification('删除成功', 'success');
    });
}

function saveSkill() {
    const code = document.getElementById('skillCode').value;
    const name = document.getElementById('skillName').value;
    
    if (state.currentSkill === 0) {
        state.skills.push({
            id: Date.now(),
            name: name || '新技能',
            description: '新创建的技能',
            updatedAt: new Date().toISOString().split('T')[0]
        });
    } else {
        const skill = state.skills.find(s => s.id === state.currentSkill);
        if (skill) {
            skill.name = name;
            skill.updatedAt = new Date().toISOString().split('T')[0];
        }
    }
    
    showNotification('保存成功', 'success');
    backToList();
}

// 通用操作
function backToList() {
    state.currentAgent = null;
    state.currentSkill = null;
    renderApp();
}

// 启动应用
init();
