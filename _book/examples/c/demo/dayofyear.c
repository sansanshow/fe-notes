#include<stdio.h>

// 闰年
int is_leap (year) {
    if ((year%4 == 0 && year%100 != 0) || (year%400 == 0)) {
        return 1;
    }
    return 0;
}

int day_of_year(int yaer, int month, int day) {
    int monthdays[13] = {31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31};
    int err_count = 0;
    int days = 0;
    // 1: 参数合法性验证
    if (yaer < 1)
    {
        ++err_count;
        printf("年份输入有误;\n");
    }
    
    if (month > 12 || month < 1)
    {
        ++err_count;
        printf("月份输入有误\n");
    }

    if (day > 31 || day < 1)
    {
        ++err_count;
        printf("日期输入有误\n");
    }
    if (err_count > 0) { return 0; }

    // 2: 闰年计算
    if (is_leap(yaer) > 0) 
    {
        monthdays[1] = 29;
    }

    // 3: 根据月份计算天数
    int i = 0;
    while (i < month - 1)
    {
        days += monthdays[i];
        ++i;
    }
    days += day;
    // 4: 返回值
    return days;

}

int main() {
    // 0: 定义参数
    int year = 0, month = 0, day = 0, days = 0;
    // 1: 输入各个数
    printf("--------------------\n");
    printf("请输入年月日\n");
    scanf("%d %d %d", &year, &month, &day);
    // 2: 调用函数 dayofyear 计算
    days = day_of_year(year, month, day);
    // 3: 输出值
    if (days > 0) {
        printf("%d年%d月%d日是%d年中的第%d天", year, month, day, year, days);
    }

}