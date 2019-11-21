next(null, {
    code: '0000',
    data: [
        {
            url: '/xxx',
            type: 'get',
            name: '查询xxx',
            routeName: 'route1', // 接口对应的路由
            opcode: 'XXX_GET' // 操作码，不变的
        },
        {
            url: '/xxx',
            type: 'post',
            name: '新增xxx',
            routeName: 'route1',
            opcode: 'XXX_POST'
        },
    ]
})