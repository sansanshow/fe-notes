#include<stdio.h>

float calc(float x, float y, int type) {
    if (type == 1)
    {
        return x + y;
    } else if (type == 2)
    {
        return x - y;
    } else if (type == 3)
    {
        return x * y;
    } else if (type == 4)
    {
        return x / y;
    } else
    {
        printf("参数有误\n");
        return 0.0;
    }
}

int main() {
    int input = -1;
    float x = 0;
    float y = 0;
    float result = 0;
    printf("请选择要进行的运算:\n");
    printf("1: +; 2: -; 3: x; 4: ÷\n");
    printf("0: exit\n");
    scanf("%d", &input);
    if (input >= 0 && input <= 4) {
        if (input == 0) {
            printf("type exit\n");
            return 0;
        }
        printf("请输入第一个操作数：\n");
        scanf("%f", &x);
        printf("请输入第二个操作数：\n");
        scanf("%f", &y);
        result = calc(x, y, input);
        printf("计算结果为：\n");
        printf("%f\n", result);
    } else {
      printf("输入有误\n");  
    }
    
    return 0;
}