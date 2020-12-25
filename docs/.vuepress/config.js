module.exports = {
    title: '个人文档总结',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            {
                text:'数据库相关',
                ariaLabel: 'DataBase Menu',
                items: [
                    {text: 'mysql相关操作', link: '/file/mysql相关操作'},
                    { text: 'Oracle相关操作', link: '/file/Oracle 数据库相关操作' },
                ]
            },
          { text: 'NC运维相关', link: '/file/NC运维相关' },

        ],
        sidebar: 'auto'
      },
    sidebarDepth: 2

  }
